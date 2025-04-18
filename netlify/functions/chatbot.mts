import type { Context } from "@netlify/functions";
import { createClient } from '@sanity/client'
import OpenAI from 'openai';
import { toHTML } from '@portabletext/to-html'

export type Records = Record[]

export interface Record {
  score: number
  value: RecordValue
}

export interface RecordValue {
  documentId: string
  type: string
}

const config = {
  projectId: 'lc9446ox',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-02-06',
}

export default async (req: Request, context: Context) => {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log(prompt);

    const openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const sanityClient = createClient(config);

    const response = await fetch(
      `https://${config.projectId}.api.sanity.io/vX/embeddings-index/query/${config.dataset}/bsv-de`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify({
          query: prompt,
          maxResults: 3,
        }),
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data from Sanity' }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const records: Records = await response.json();

    if (!records || !records.length) {
      return new Response(
        JSON.stringify({ error: 'Ich konnte keine Ergbenisse finden.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(records)

    const relevantRecords = records.filter(rec => rec.score > 0.75)

    if (!relevantRecords.length) {
      return new Response(
        JSON.stringify({ error: 'Ich konnte keine relevante Ergbenisse finden.' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const docIds = records.map((d: any) => d.value.documentId);

    const query = `*[_id in $docIds] {_type,
    number,
    name {de},
    title-> { name {de}},
    law { de },
    exp { de },
    }`;

    const documents = await sanityClient.fetch(query, { docIds });

    if (!documents || !documents.length) {
      return new Response(
        JSON.stringify({ error: 'No documents found in Sanity' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const cleanDocuments = documents.map((document: any) => {
      return {
        artikelnummer: document.number,
        titel: document.name.de,
        gesetzestext: toHTML(document.law.de),
        erläuterung: toHTML(document.exp.de),
      };
    });

    const reply = await openAIClient.responses.create({
      model: 'gpt-4o',
      instructions: `Du bist ein hilfreicher Assistent, der nur auf der Grundlage dieser Dokumente antwortet: ${JSON.stringify(cleanDocuments)}. Bitte die verwendeten Artikel angeben.`,
      input: `${prompt}`,
    });

    console.log(reply.output_text);


    return new Response(JSON.stringify({ reply: reply.output_text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'An internal server error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};



