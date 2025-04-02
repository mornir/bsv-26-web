import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";


export async function getArticles(): Promise<Article[]> {
  return await sanityClient.fetch(
    groq`*[_type == "article"] | order(number asc)`
  );
}

export declare const internalGroqTypeReferenceTo: unique symbol

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
  number?: number
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
  section?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'section'
  }
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
  number?: number
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
  number?: number
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
  number?: number
  name?: LocaleString
}

export type LocaleString = {
  _type: 'localeString'
  de?: string
  fr?: string
  it?: string
}