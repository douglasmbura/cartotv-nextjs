import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import pt from './locales/pt.json'
import ar from './locales/ar.json'
import de from './locales/de.json'
import hi from './locales/hi.json'
import zh from './locales/zh.json'
import sw from './locales/sw.json'
import id from './locales/id.json'
import ru from './locales/ru.json'

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', dir: 'ltr' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
] as const

export type LanguageCode = typeof languages[number]['code']
export const defaultLanguage: LanguageCode = 'en'

export const resources = {
  en: { translation: en }, es: { translation: es }, fr: { translation: fr },
  pt: { translation: pt }, ar: { translation: ar }, de: { translation: de },
  hi: { translation: hi }, zh: { translation: zh }, sw: { translation: sw },
  id: { translation: id }, ru: { translation: ru },
}

// Only init once
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: defaultLanguage,
      supportedLngs: languages.map(l => l.code),
      interpolation: { escapeValue: false },
      lng: defaultLanguage,
    })
}

export default i18n
