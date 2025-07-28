import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
import nl from './locales/nl.json'
import en from './locales/en.json'
import de from './locales/de.json'

const resources = {
  nl: {
    translation: nl
  },
  en: {
    translation: en
  },
  de: {
    translation: de
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'nl', // default language
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    debug: process.env.NODE_ENV === 'development',
  })

export default i18n 