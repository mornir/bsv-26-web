import { ui, defaultLocale } from './ui'

export function useTranslations(lang: keyof typeof ui | undefined) {
  if (!lang) lang = defaultLocale
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key]
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
