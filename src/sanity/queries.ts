import { defineQuery } from 'groq'
import { parsePortableText } from './fragments'
import client from './client'

export async function getTitles() {
  const getTitlesQuery = defineQuery(`
  *[_type == "title"] 
  {..., desc {${parsePortableText}}} | order(number asc)`)
  return client.fetch(getTitlesQuery)
}

export async function getArticles() {
  const getArticlesQuery = defineQuery(`
  *[_type == "article"]
  {..., 
  title->, 
  chapter->, 
  section->,
  law {${parsePortableText}}} 
  | order(number asc)`)

  return client.fetch(getArticlesQuery)
}

export async function getFeatures() {
  const getFeaturesQuery = defineQuery(`*[_type == "feature"]`)
  return client.fetch(getFeaturesQuery)
}

// TODO: also fetch detail about title
export async function getArticlesFromTitle(titleNumber: number) {
  const getArticlesFromTitleQuery = defineQuery(`*[
    _type == "article" 
    && title->number == $titleNumber]
    `)
  return client.fetch(getArticlesFromTitleQuery, {
    titleNumber,
  })
}

export async function getArticle(number: number) {
  const getArticleQuery = defineQuery(`

    *[_type == "article" && number == $number][0]
    { ..., law {${parsePortableText}}, exp {${parsePortableText}}, title->, chapter ->, section ->}
    `)

  return client.fetch(getArticleQuery, { number })
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
