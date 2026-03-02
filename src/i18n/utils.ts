import messages from './messages'
import type { GetArticleQueryResult, LocaleString } from '@/types/sanity.types'

export const defaultLocale = 'de'
export const locales = {
  de: 'de-CH',
  fr: 'fr-CH',
  /*   it: 'it-CH', */
} as const

export function useTranslations(lang: keyof typeof messages | undefined) {
  if (!lang) lang = defaultLocale
  return function t(key: keyof (typeof messages)[typeof defaultLocale]) {
    return messages[lang][key] || messages[defaultLocale][key]
  }
}

type heading = {
  number: number
  type: 'title' | 'chapter' | 'section'
}

export function formatHeading(
  { number, type }: heading,
  lang: LangKeys
): string {
  const t = useTranslations(lang)

  const heading = t(`heading.${type}`)

  if (lang === 'fr') {
    return `${heading} ${number}`
  }

  return `${number}. ${heading}`
}
