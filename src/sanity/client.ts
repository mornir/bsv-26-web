import { createClient } from '@sanity/client'

const projectId =
  import.meta.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>'
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production'

export default createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2026-01-18',
})
