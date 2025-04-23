import { createClient } from '@sanity/client'
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import { defineQuery } from 'groq'

const client = createClient({
  projectId: 'lc9446ox',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-02-06',
})

export async function getArticlesLinks(): Promise<Article[]> {
  const getArticlesLinksQuery = defineQuery(`*[_type == "article"]{name, number, title->, chapter->, section->} | order(number asc)`)

  return client.fetch(getArticlesLinksQuery)
}


export async function getArticles(): Promise<Article[]> {
  const getArticlesQuery = defineQuery(`*[_type == "article"]{..., title->, chapter->, section->} | order(number asc)`)

  return client.fetch(getArticlesQuery)
}

export async function getArticle(number: number): Promise<Article> {
  const getArticleQuery = defineQuery(`*[_type == "article" && number == $number]{ ..., title->, chapter ->, section ->} | order(number asc)[0]`)

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

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>
    text?: string
    _type: 'span'
    _key: string
  }>
  style?: 'normal'
  listItem?: 'number' | 'bullet'
  markDefs?: Array<{
    href?: string
    _type: 'link'
    _key: string
  }>
  level?: number
  _type: 'block'
  _key: string
}>

export type Article = {
  _id: string
  _type: 'article'
  _createdAt: string
  _updatedAt: string
  _rev: string
  number: number
  title: Title,
  chapter?: Chapter,
  section?: Section,
  name: LocaleString
  law: LocaleBlockContent
  exp?: LocaleBlockContent
}

export type LocaleBlockContent = {
  _type: 'localeBlockContent'
  de?: BlockContent
  fr?: BlockContent
  it?: BlockContent
}

export type Section = {
  _id: string
  _type: 'section'
  _createdAt: string
  _updatedAt: string
  _rev: string
  number: number
  title?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'title'
  }
  chapter?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'chapter'
  }
  name?: LocaleString
}

export type Chapter = {
  _id: string
  _type: 'chapter'
  _createdAt: string
  _updatedAt: string
  _rev: string
  number: number
  title?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'title'
  }
  name?: LocaleString
}

export type Title = {
  _id: string
  _type: 'title'
  _createdAt: string
  _updatedAt: string
  _rev: string
  number: number
  name: LocaleString
}

export type LocaleString = {
  _type: 'localeString'
  de: string
  fr?: string
  it?: string
}

export declare const internalGroqTypeReferenceTo: unique symbol