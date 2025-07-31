import express from 'express';
import { hashPassword, isValidEmail, isValidPhone, isValidPostalCode } from '../utils/auth.js';
import getSupabase from '../config/database.js';
import { sendWelcomeEmail, sendVerificationEmail } from '../utils/email.js';
import crypto from 'crypto';

const router = express.Router();

// Registratie endpoint
router.post('/register', async (req, res) => {
  try {
    const {
      user_type,
      company_name,
      street,
      house_number,
      addition,
      postal_code,
      city,
      first_name,
      last_name,
      phone,
      email,
      password,
      confirmPassword
    } = req.body;

    // Validatie
    if (!company_name || !street || !house_number || !postal_code || !city || 
        !first_name || !last_name || !phone || !email || !password) {
      return res.status(400).json({
        error: 'Alle verplichte velden moeten worden ingevuld'
      });
    }

    // Wachtwoord verificatie
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: 'Wachtwoorden komen niet overeen'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Wachtwoord moet minimaal 8 karakters lang zijn'
      });
    }

    // Email validatie
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Ongeldig emailadres'
      });
    }

    // Telefoonnummer validatie
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        error: 'Ongeldig telefoonnummer (gebruik Nederlands formaat)'
      });
    }

    // Postcode validatie
    if (!isValidPostalCode(postal_code)) {
      return res.status(400).json({
        error: 'Ongeldige postcode (gebruik Nederlands formaat: 1234 AB)'
      });
    }

    // Check of email al bestaat
    const { data: existingUser, error: checkError } = await getSupabase()
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      return res.status(500).json({
        error: 'Fout bij controleren van emailadres'
      });
    }

    if (existingUser) {
      return res.status(400).json({
        error: 'Emailadres is al in gebruik'
      });
    }

    // Wachtwoord hashen
    const password_hash = await hashPassword(password);

    // Verificatie token genereren
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Gebruiker aanmaken in Supabase
    const { data: newUser, error: insertError } = await getSupabase()
      .from('users')
      .insert([
        {
          user_type: user_type || 'buyer',
          company_name,
          street,
          house_number,
          addition: addition || null,
          postal_code,
          city,
          first_name,
          last_name,
          phone,
          email,
          password_hash,
          user_role: 'user',
          is_active: true,
          email_verified: false,
          verification_token: verificationToken
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return res.status(500).json({
        error: 'Fout bij aanmaken van account'
      });
    }

    // Welkomst email en verificatie email versturen (niet-blocking)
    try {
      // Welkomst email
      await sendWelcomeEmail(req.app.locals.resend, {
        email: newUser.email,
        first_name: newUser.first_name,
        company_name: newUser.company_name,
        user_type: newUser.user_type
      });

      // Verificatie email
      await sendVerificationEmail(req.app.locals.resend, {
        email: newUser.email,
        first_name: newUser.first_name,
        company_name: newUser.company_name,
        user_type: newUser.user_type
      }, verificationToken);
    } catch (emailError) {
      console.error('📧 Email sending failed:', emailError);
      // Email fout mag de registratie niet stoppen
    }

    // Succesvolle registratie
    res.status(201).json({
      message: 'Account succesvol aangemaakt',
      user: {
        id: newUser.id,
        email: newUser.email,
        company_name: newUser.company_name,
        user_type: newUser.user_type,
        first_name: newUser.first_name,
        last_name: newUser.last_name
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
});

// Email verificatie endpoint
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Zoek gebruiker met deze verificatie token
    const { data: user, error: findError } = await getSupabase()
      .from('users')
      .select('id, email, email_verified')
      .eq('verification_token', token)
      .single();

    if (findError || !user) {
      return res.status(400).json({
        error: 'Ongeldige of verlopen verificatie link'
      });
    }

    if (user.email_verified) {
      return res.status(400).json({
        error: 'Email is al geverifieerd'
      });
    }

    // Markeer email als geverifieerd en verwijder token
    const { error: updateError } = await getSupabase()
      .from('users')
      .update({
        email_verified: true,
        verification_token: null
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Verification update error:', updateError);
      return res.status(500).json({
        error: 'Fout bij verifiëren van email'
      });
    }

    res.json({
      message: 'Email succesvol geverifieerd! U kunt nu inloggen.'
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
});

export default router; 