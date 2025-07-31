-- Users tabel voor Staalplatform
-- Voer dit uit in de Supabase SQL Editor

-- Maak de users tabel aan
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Bedrijfsgegevens
  company_name VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  house_number VARCHAR(20) NOT NULL,
  addition VARCHAR(50),
  postal_code VARCHAR(10) NOT NULL,
  city VARCHAR(100) NOT NULL,
  
  -- Contactgegevens
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  
  -- Account gegevens
  password_hash VARCHAR(255) NOT NULL,
  
  -- Metadata
  user_type VARCHAR(20) DEFAULT 'buyer' CHECK (user_type IN ('buyer', 'supplier')),
  user_role VARCHAR(20) DEFAULT 'user' CHECK (user_role IN ('superadmin', 'admin', 'user')),
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maak een index op email voor snelle lookups
CREATE INDEX idx_users_email ON users(email);

-- Maak een index op user_type voor filtering
CREATE INDEX idx_users_user_type ON users(user_type);

-- Maak een index op user_role voor filtering
CREATE INDEX idx_users_user_role ON users(user_role);

-- Maak een index op created_at voor sortering
CREATE INDEX idx_users_created_at ON users(created_at);

-- Trigger om updated_at automatisch bij te werken
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) inschakelen
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS policies
-- Gebruikers kunnen alleen hun eigen gegevens zien/bewerken
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Nieuwe gebruikers kunnen zichzelf aanmaken
CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin kan alle gebruikers zien (optioneel)
-- CREATE POLICY "Admin can view all users" ON users
--     FOR SELECT USING (auth.role() = 'admin');

-- Comments voor documentatie
COMMENT ON TABLE users IS 'Gebruikers tabel voor Staalplatform - afnemers en leveranciers';
COMMENT ON COLUMN users.user_type IS 'Type gebruiker: buyer (afnemer) of supplier (leverancier)';
COMMENT ON COLUMN users.user_role IS 'Rol van gebruiker: superadmin, admin, of user';
COMMENT ON COLUMN users.is_active IS 'Of het account actief is';
COMMENT ON COLUMN users.email_verified IS 'Of het emailadres geverifieerd is'; 