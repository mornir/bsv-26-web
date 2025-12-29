import messages from './messages'
import type { LocaleString } from '@/sanity/sanity.types'

export const defaultLocale = 'de'
export const locales = {
  de: 'de-CH',
  fr: 'fr-CH',
  /*   it: 'it-CH', */
}

export type langKeys = keyof typeof locales

export function useTranslations(lang: keyof typeof messages | undefined) {
  if (!lang) lang = defaultLocale
  return function t(key: keyof (typeof messages)[typeof defaultLocale]) {
    return messages[lang][key] || messages[defaultLocale][key]
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
