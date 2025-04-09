import { createClient } from '@sanity/client'
const toMarkdown = require('@sanity/block-content-to-markdown')
import OpenAI from 'openai';


/* const userQuery1 = "An wen richten sich die neuen Brandschutzvorschriften?"

const userQuery2 = "Was sind die Grenzen des präskriptiven Nachweisverfahren?"

const userQuery = "Ab welcher Gebäudehöhe kann das präskriptive Nachweisverfahren nicht mehr angewendet werden?" */

export async function chatWithSanity(userQuery: string): Promise<string> {

  const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: true,
    apiVersion: '2025-02-06',
    token: process.env.SANITY_API_TOKEN
  })

  const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async function searchSanity(query: String) {
    const response = await fetch(
      `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/vX/embeddings-index/query/${process.env.SANITY_DATASET}/${process.env.SANITY_INDEX_NAME}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify({
          query: query,
          maxResults: 3
        }),
      }
    );

    const data = await response.json()
    return data.map((d: any) => d.value.documentId)
  }

  async function fetchDocumentsByIds(ids: String) {
    if (!ids.length) return [];
    const query = `*[_id in $ids] {_type,
  number,
  name {de},
  title-> { name {de}},
  law { de },
  exp { de },
   }`;

    const documents = await sanityClient.fetch(query, { ids });

    const docs = documents.map((document: any) => {
      return {
        titel: document.name.de,
        gesetzestext: toMarkdown(document.law.de),
        erläuterung: toMarkdown(document.exp.de)
      }
    })

    return docs
  }

  const docIds = await searchSanity(userQuery)

  const documents = await fetchDocumentsByIds(docIds)

  const response = await openAIClient.responses.create({
    model: 'gpt-4o',
    instructions: `Du bist ein hilfreicher Assistent, der auf der Grundlage dieser Dokumente antwortet: ${JSON.stringify(documents)}`,
    input: `${userQuery}`,
  });

  return response.output_text

}