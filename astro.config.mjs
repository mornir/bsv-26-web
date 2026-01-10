import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import sitemap from '@astrojs/sitemap'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import { defaultLocale, locales } from './src/i18n/utils'
import pagefind from 'astro-pagefind'

// https://astro.build/config
export default defineConfig({
  site: 'https://bsv.terminofeu.ch',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
    alpinejs({ entrypoint: '/src/utils/alpine' }),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
