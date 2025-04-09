import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import sanity from '@sanity/astro'
import alpinejs from '@astrojs/alpinejs'

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'lc9446ox',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2024-12-08',
    }),
    alpinejs({ entrypoint: '/src/utils/alpine' }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
