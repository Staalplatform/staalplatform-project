import bcrypt from 'bcryptjs';

// Wachtwoord hashen
export const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Wachtwoord verifiëren
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Email validatie
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Telefoonnummer validatie (Nederlandse formaten)
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+31|0)[1-9][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/[\s\-]/g, ''));
};

// Postcode validatie (Nederlandse format)
export const isValidPostalCode = (postalCode) => {
  const postalRegex = /^[1-9][0-9]{3}\s?[A-Z]{2}$/i;
  return postalRegex.test(postalCode);
}; 