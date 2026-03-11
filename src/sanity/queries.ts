import { defineQuery } from 'groq'
import { parsePortableText, articleProjection } from './fragments'
import client from './client'

export async function getTitles() {
  const getTitlesQuery = defineQuery(`
  *[_type == "title"] 
  {..., desc {${parsePortableText}}} | order(number asc)`)
  return client.fetch(getTitlesQuery)
}

export async function getAppendices() {
  const getAppendicesQuery = defineQuery(`
  *[_type == "appendix"] | order(number asc)`)
  return client.fetch(getAppendicesQuery)
}

export async function getArticles() {
  const getArticlesQuery = defineQuery(`
  *[_type == "article"]
  ${articleProjection}
  | order(number asc)`)

  return client.fetch(getArticlesQuery)
}

export async function getFeatures() {
  const getFeaturesQuery = defineQuery(`*[_type == "feature"]`)
  return client.fetch(getFeaturesQuery)
}

export async function getArticlesFromTitle(titleSlug: string) {
  const getArticlesFromTitleQuery = defineQuery(`{
  "articles": *[_type == "article" && title->slug.current == $titleSlug]
  ${articleProjection}
  | order(number asc),
  "title": *[_type == "title" && slug.current == $titleSlug][0]}`)
  return client.fetch(getArticlesFromTitleQuery, {
    titleSlug,
  })
}

// TODO: remove
export async function getArticle(slug: string) {
  const getArticleQuery = defineQuery(`

    *[_type == "article" && defined(slug.current) && slug.current == $slug][0]
    ${articleProjection}
    `)

  return client.fetch(getArticleQuery, { slug })
}

export async function getNav() {
  const getNavQuery = defineQuery(`*[_type == "title"] {
  name, number,
  "articles":   *[_type=='article' && references(^._id)]{name, number, chapter->, section->},
  "chapters": *[_type=='chapter' && references(^._id)]{ name, number, "sections": *[_type=='section' && references(^._id)]{ name }} | order(number asc),
  "sections": *[_type=='section' && references(^._id) && !defined(^.chapters)]{name, number}
} | order(number asc)`)

  return client.fetch(getNavQuery)
}

export async function getIndex() {
  const getIndexQuery = defineQuery(`{
  "articles": *[_type == "article"]{name, number, "slug": slug.current, "titleNum": title->number, "chapterNum": chapter->number, "sectionNum": section->number} | order(number asc),
  "titles": *[_type == "title"]{name, number, "slug": slug.current} | order(number asc),
  "chapters": *[_type == "chapter"]{name, number, "titleNum": title->number} | order(number asc),
  "sections": *[_type == "section"]{name, number, "titleNum": title->number, "chapterNum": chapter->number} | order(number asc),
}`)

  return client.fetch(getIndexQuery)
}
