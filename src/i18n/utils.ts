import { ui, defaultLang, languages } from './ui'
import type { LocaleString } from '@/sanity/sanity.types'

// TODO: keep if Astro.currentLocale turns out to be buggy
/* export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as keyof typeof ui
  return defaultLang
}
 */

export function useTranslations(lang: keyof typeof ui | undefined) {
  if (!lang) lang = 'de'
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export function staticLocalePaths() {
  return Object.keys(languages).map((lang) => {
    return { params: { lang } }
  })
}

type heading = {
  number: number
  name: LocaleString
  [key: string]: unknown
}

export function formatHeading(heading: heading, lang: langKeys): string {
  const { name, number } = heading

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
