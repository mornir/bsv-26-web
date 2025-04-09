import type { Context } from "@netlify/functions";
import { chatWithSanity } from './utils/sanityChatbot';

export default async (req: Request, context: Context) => {
  return new Response(`hello project id ${process.env.PUBLIC_SANITY_PROJECT_ID}`)
}