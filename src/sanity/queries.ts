import { defineQuery } from 'groq'
import { parsePortableText, articleProjection } from './fragments'
import client from './client'

// TODO: Add Anhänge
export async function getUnits() {
  const getUnitsQuery = defineQuery(`
  *[_type == 'title'] | order(number asc) {
  number,
  "title": name.de,
  "chapters": *[_type=='chapter' && references(^._id)] | order(number asc) { name, number }
}`)
  return client.fetch(getUnitsQuery)
}

export async function getTitles() {
  const getTitlesQuery = defineQuery(`
  *[_type == "title"] | order(number asc)
  {..., desc {${parsePortableText}},
    "chapters": *[_type=='chapter' && references(^._id)] | order(number asc) { name, number },
    "sections": *[_type == "section" && references(^._id) && !defined(chapter)] | order(number asc) { number, name, "articles": *[_type == "article" && references(^._id)] | order(number asc) ${articleProjection} },
    "articles": *[_type == 'article' && references(^._id) && !defined(chapter)] | order(number asc)
    ${articleProjection}
  } `)
  return client.fetch(getTitlesQuery)
}

export async function getChapters() {
  const getChaptersQuery = defineQuery(`
  *[_type == "chapter"] | order(number asc) {
  number,
  name,
  title-> { "slug": slug.current },
  "sections": *[_type == "section" && references(^._id)] | order(number asc) { number, name, "articles": *[_type == "article" && references(^._id)] | order(number asc) ${articleProjection} },
  "articles": *[_type == 'article' && references(^._id)] | order(number asc) ${articleProjection}
}
 `)
  return client.fetch(getChaptersQuery)
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

export async function getUsersGroups() {
  const getUsersGroupsQuery = defineQuery(`
  *[_type == "usersGroup"] | order(designation asc)`)
  return client.fetch(getUsersGroupsQuery)
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

export async function getTocNav() {
  const getTocNavQuery = defineQuery(`*[_type == "title"] | order(number asc) {
  number,
  name,
  "chapters": *[_type == "chapter" && references(^._id)] { name, number }
}`)

  return client.fetch(getTocNavQuery)
}
