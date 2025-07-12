import { ui, defaultLang, languages } from './ui'
import type { LocaleString } from '@/sanity/sanity.types'

// TODO: review this function
export function getLangFromUrl(url: URL) {
  const lang = url.pathname.split('/')[1]
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}

// TODO: currently unused
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export const staticPaths = Object.keys(languages).map((lang) => {
  return { params: { lang } }
})

export function getLocaleTitle(
  { name, number }: { name: LocaleString; number: number },
  lang: langKeys
): string {
  if (lang === 'de') {
    return `${number}. Titel: ${name.de}`
  }

  if (lang === 'fr') {
    return `Titre ${number}: ${name.fr}`
  }

  // Optionally handle other languages or fallback
  return `${number}: ${name[lang] ?? ''}`
}

export type langKeys = keyof typeof languages
