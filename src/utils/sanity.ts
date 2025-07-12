import { createClient } from '@sanity/client'
import { defineQuery } from 'groq'

const client = createClient({
  projectId: 'lc9446ox',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-02-06',
})

export async function getTitles() {
  const getTitlesQuery = defineQuery(`*[_type == "title"] | order(number asc)`)
  return client.fetch(getTitlesQuery)
}

export async function getArticles() {
  const getArticlesQuery = defineQuery(
    `*[_type == "article"]{..., title->, chapter->, section->} | order(number asc)`,
  )

  return client.fetch(getArticlesQuery)
}

export async function getFeatures() {
  const getFeaturesQuery = defineQuery(`*[_type == "feature"]`)
  return client.fetch(getFeaturesQuery)
}

export async function getArticlesFromTitle(titleNumber: number) {
  const getArticlesFromTitleQuery = defineQuery(
    `*[_type == "article" && title->number == $titleNumber]`,
  )
  return client.fetch(getArticlesFromTitleQuery, {
    titleNumber,
  })
}

export async function getArticle(number: number) {
  const getArticleQuery = defineQuery(
    `*[_type == "article" && number == $number]{ ..., title->, chapter ->, section ->} | order(number asc)[0]`,
  )

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
