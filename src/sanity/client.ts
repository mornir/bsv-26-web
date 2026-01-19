import { createClient } from '@sanity/client'

export default createClient({
  projectId: 'lc9446ox',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-01-18',
})
