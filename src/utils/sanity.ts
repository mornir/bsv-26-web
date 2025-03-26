import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getArticles(): Promise<Article[]> {
  return await sanityClient.fetch(
    groq`*[_type == "article"] | order(_createdAt desc)`
  );
}


export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}

export type BlockContent = Array<
  | {
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: 'span'
      _key: string
    }>
    style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'
    listItem?: 'number' | 'bullet'
    markDefs?: Array<{
      href?: string
      _type: 'link'
      _key: string
    }>
    level?: number
    _type: 'block'
    _key: string
  }
>

export type Article = {
  _id: string
  _type: 'article'
  _createdAt: string
  _updatedAt: string
  _rev: string
  number?: number
  content: {
    deTitle: string
    frTitle: string
    itTitle?: string
    deLaw: BlockContent
    frLaw: BlockContent
    itLaw?: BlockContent
    deExplanation?: BlockContent
    frExplanation?: BlockContent
    itExplanation?: BlockContent
  }
}