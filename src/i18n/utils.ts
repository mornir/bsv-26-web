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
  name: LocaleString
  [key: string]: unknown
}

export function formatTitle(heading: heading, lang: string): string {
  const { name, number } = heading

  if (lang === 'fr') {
    return `Titre ${number}: ${name.fr}`
  }

  return `${number}. Titel: ${name.de}`
}

function formatChapter(heading: heading, lang: string): string {
  const { name, number } = heading

  if (lang === 'fr') {
    return `Chapitre ${number}: ${name.fr}`
  }

  return `${number}. Kapitel: ${name.de}`
}

function formatSection(heading: heading, lang: string): string {
  const { name, number } = heading

  if (lang === 'fr') {
    return `Section ${number}: ${name.fr}`
  }

  return `${number}. Abschnitt: ${name.de}`
}

export function formatRef(
  article: GetArticleQueryResult,
  lang: string
): string {
  // NOT NEEDED
  if (!article) return 'ERROR'

  const reference = [formatTitle(article.title, lang)]

  if (article.chapter?.number) {
    reference.push(formatChapter(article.chapter, lang))
  }

  if (article.section?.number) {
    reference.push(formatSection(article.section, lang))
  }

  return reference.join(', ')
}
