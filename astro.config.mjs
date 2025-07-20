import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  site: 'https://bsv.terminofeu.ch',
  trailingSlash: 'always',
  integrations: [alpinejs({ entrypoint: '/src/utils/alpine' }), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    locales: ['de', 'fr'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  // Allow access to Netlify Preview Server
  server: {
    allowedHosts: ['devserver-main--terminofeu-bsv.netlify.app'],
  },
})
