import { ui, defaultLang, languages } from './ui'
import type { LocaleString } from '@/sanity/sanity.types'

export function useTranslations(lang: keyof typeof ui | undefined) {
  if (!lang) lang = 'de'
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
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
