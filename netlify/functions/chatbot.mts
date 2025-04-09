import type { Context } from "@netlify/functions";
import { createClient } from '@sanity/client'

/* import { chatWithSanity } from './utils/sanityChatbot'; */

export default async (req: Request, context: Context) => {
  return new Response(`hello project id ${process.env.PUBLIC_SANITY_PROJECT_ID}`)
}