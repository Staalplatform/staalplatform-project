import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importeer alle vertalingen
import nl from './locales/nl.json';
import en from './locales/en.json';
import de from './locales/de.json';

const resources = {
  nl: {
    translation: nl,
  },
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'nl',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React doet al XSS protection
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 