import {loadEnv} from 'vite'

import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'
import sanity from '@sanity/astro'
import alpinejs from '@astrojs/alpinejs'

const {PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET} = loadEnv(
  import.meta.env.MODE,
  process.cwd(),
  '',
)
import {defineConfig} from 'astro/config'

// Different environments use different variables
const projectId = PUBLIC_SANITY_PROJECT_ID
const dataset = PUBLIC_SANITY_DATASET

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2024-12-08',
    }),
    alpinejs({entrypoint: '/src/utils/alpine'}),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
