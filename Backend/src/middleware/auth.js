import getSupabase from '../config/database.js';

// Auth middleware om gebruiker te verifiëren
export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Geen geldige autorisatie header'
      });
    }

    const token = authHeader.substring(7); // Verwijder 'Bearer ' prefix
    
    // Voor nu gebruiken we een simpele token validatie
    // Later kunnen we JWT implementeren
    // Voor nu gaan we ervan uit dat de token het user ID is
    
    // Haal gebruiker op uit database
    const { data: user, error } = await getSupabase()
      .from('users')
      .select('id, email, first_name, last_name, company_name, user_type')
      .eq('id', token)
      .single();

    if (error || !user) {
      return res.status(401).json({
        error: 'Ongeldige token'
      });
    }

    // Voeg gebruiker toe aan request object
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      error: 'Interne server fout'
    });
  }
};

// Middleware om te controleren of gebruiker een afnemer is
export const requireBuyer = (req, res, next) => {
  if (req.user?.user_type !== 'buyer') {
    return res.status(403).json({
      error: 'Toegang geweigerd. Alleen afnemers kunnen deze actie uitvoeren.'
    });
  }
  next();
};

// Middleware om te controleren of gebruiker een leverancier is
export const requireSupplier = (req, res, next) => {
  if (req.user?.user_type !== 'supplier') {
    return res.status(403).json({
      error: 'Toegang geweigerd. Alleen leveranciers kunnen deze actie uitvoeren.'
    });
  }
  next();
}; 