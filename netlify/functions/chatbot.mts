import type { Context } from "@netlify/functions";
/* import { chatWithSanity } from './utils/sanityChatbot'; */
import { createClient } from '@sanity/client'
const toMarkdown = require('@sanity/block-content-to-markdown')
import OpenAI from 'openai';

const userQuery = "Ab welcher Gebäudehöhe kann das präskriptive Nachweisverfahren nicht mehr angewendet werden?"


export default async (req: Request, context: Context) => {

  const { prompt } = await req.json();

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(prompt)

  const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const sanityClient = createClient({
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: '2025-02-06',
    token: process.env.SANITY_API_TOKEN
  })

  const query = `*[_id in $docIds] {_type,
  number,
  name {de},
  title-> { name {de}},
  law { de },
  exp { de },
   }`;

  const response = await fetch(
    `https://${process.env.PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/vX/embeddings-index/query/${process.env.PUBLIC_SANITY_DATASET}/${process.env.SANITY_INDEX_NAME}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: prompt,
        maxResults: 3
      })
    })

  if (!response.ok) {
    return new Response('An error occured')
  }

  const records = await response.json()

  if (!records || !records.length) {
    return new Response('No data found')
  }

  const docIds = records.map((d: any) => d.value.documentId)

  const documents = await sanityClient.fetch(query, { docIds });

  const cleanDocuments = documents.map((document: any) => {
    return {
      titel: document.name.de,
      gesetzestext: toMarkdown(document.law.de),
      erläuterung: toMarkdown(document.exp.de)
    }
  })

  const reply = await openAIClient.responses.create({
    model: 'gpt-4o',
    instructions: `Du bist ein hilfreicher Assistent, der auf der Grundlage dieser Dokumente antwortet: ${JSON.stringify(cleanDocuments)}`,
    input: `${prompt}`,
  });

  return new Response(JSON.stringify({ reply: reply.output_text }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}



