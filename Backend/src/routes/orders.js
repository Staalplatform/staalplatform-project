import express from 'express';
import getSupabase from '../config/database.js';
import { createClient } from '@supabase/supabase-js';
import { authenticateUser, requireBuyer } from '../middleware/auth.js';

const router = express.Router();

// Supabase client voor storage
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Order aanmaken
router.post('/create', authenticateUser, requireBuyer, async (req, res) => {
  try {
    const {
      dossiernummer,
      gewenste_leverdatum,
      contactpersoon,
      telefoonnummer,
      certificering_behoefte
    } = req.body;

    const userId = req.user?.id; // Dit moeten we later toevoegen via auth middleware
    const companyName = req.user?.company_name;

    // Validatie
    if (!dossiernummer) {
      return res.status(400).json({
        error: 'Dossiernummer is verplicht'
      });
    }

    if (!userId) {
      return res.status(401).json({
        error: 'Gebruiker niet geauthenticeerd'
      });
    }

    // Check of dossiernummer al bestaat
    const { data: existingOrder, error: checkError } = await getSupabase()
      .from('orders')
      .select('id')
      .eq('dossiernummer', dossiernummer)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return res.status(500).json({
        error: 'Fout bij controleren van dossiernummer'
      });
    }

    if (existingOrder) {
      return res.status(400).json({
        error: 'Dossiernummer bestaat al'
      });
    }

    // Order aanmaken
    const { data: newOrder, error: insertError } = await getSupabase()
      .from('orders')
      .insert([
        {
          dossiernummer,
          user_id: userId,
          company_name: companyName,
          gewenste_leverdatum: gewenste_leverdatum || null,
          contactpersoon,
          telefoonnummer: telefoonnummer || null,
          certificering_behoefte: certificering_behoefte || null,
          status: 'order_aanmaken'
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({
        error: 'Fout bij aanmaken van order'
      });
    }

    res.status(201).json({
      message: 'Order succesvol aangemaakt',
      order: newOrder
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
});

// File upload
router.post('/:orderId/upload', authenticateUser, requireBuyer, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { fileType } = req.body;
    const userId = req.user?.id;

    // Validatie
    if (!fileType || !['tekeningen', '3d_bestanden', 'stuklijsten', 'conservering'].includes(fileType)) {
      return res.status(400).json({
        error: 'Ongeldig bestandstype'
      });
    }

    if (!req.files || !req.files.file) {
      return res.status(400).json({
        error: 'Geen bestand geüpload'
      });
    }

    const file = req.files.file;

    // Bestandstype validatie
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({
        error: 'Alleen JPEG, JPG en PNG bestanden zijn toegestaan'
      });
    }

    // Bestandsgrootte validatie (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return res.status(400).json({
        error: 'Bestand is te groot. Maximum grootte is 10MB'
      });
    }

    // Check of order bestaat en gebruiker toegang heeft
    const { data: order, error: orderError } = await getSupabase()
      .from('orders')
      .select('id, user_id')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return res.status(404).json({
        error: 'Order niet gevonden'
      });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({
        error: 'Geen toegang tot deze order'
      });
    }

    // Bestand uploaden naar Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = `orders/${orderId}/${fileType}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('order-files')
      .upload(filePath, file.data, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return res.status(500).json({
        error: 'Fout bij uploaden van bestand'
      });
    }

    // File record aanmaken in database
    const { data: fileRecord, error: fileError } = await getSupabase()
      .from('order_files')
      .insert([
        {
          order_id: orderId,
          file_type: fileType,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.mimetype
        }
      ])
      .select()
      .single();

    if (fileError) {
      console.error('File record error:', fileError);
      // Bestand verwijderen uit storage als database insert faalt
      await supabase.storage.from('order-files').remove([filePath]);
      return res.status(500).json({
        error: 'Fout bij opslaan van bestand informatie'
      });
    }

    res.status(201).json({
      message: 'Bestand succesvol geüpload',
      file: fileRecord
    });

  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
});

// Order ophalen met bestanden
router.get('/:orderId', authenticateUser, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user?.id;

    // Order ophalen
    const { data: order, error: orderError } = await getSupabase()
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return res.status(404).json({
        error: 'Order niet gevonden'
      });
    }

    if (order.user_id !== userId) {
      return res.status(403).json({
        error: 'Geen toegang tot deze order'
      });
    }

    // Bestanden ophalen
    const { data: files, error: filesError } = await getSupabase()
      .from('order_files')
      .select('*')
      .eq('order_id', orderId)
      .order('uploaded_at', { ascending: false });

    if (filesError) {
      console.error('Files fetch error:', filesError);
      return res.status(500).json({
        error: 'Fout bij ophalen van bestanden'
      });
    }

    res.json({
      order,
      files
    });

  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
});

// DELETE /:orderId/files/:fileId - Delete a specific file
router.delete('/:orderId/files/:fileId', authenticateUser, requireBuyer, async (req, res) => {
  try {
    const { orderId, fileId } = req.params;
    const userId = req.user?.id;

    // Check if order exists and belongs to user
    const { data: order, error: orderError } = await getSupabase()
      .from('orders')
      .select('id')
      .eq('id', orderId)
      .eq('user_id', userId)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ error: 'Order niet gevonden' });
    }

    // Get file info from database
    const { data: file, error: fileError } = await getSupabase()
      .from('order_files')
      .select('*')
      .eq('id', fileId)
      .eq('order_id', orderId)
      .single();

    if (fileError || !file) {
      return res.status(404).json({ error: 'Bestand niet gevonden' });
    }

    // Delete file from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('order-files')
      .remove([file.file_path]);

    if (storageError) {
      console.error('Storage delete error:', storageError);
      return res.status(500).json({ error: 'Fout bij verwijderen van bestand uit storage' });
    }

    // Delete file record from database
    const { error: deleteError } = await getSupabase()
      .from('order_files')
      .delete()
      .eq('id', fileId);

    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return res.status(500).json({ error: 'Fout bij verwijderen van bestand uit database' });
    }

    res.json({ message: 'Bestand succesvol verwijderd' });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ error: 'Interne server fout' });
  }
});

export default router; 