import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import sitemap from '@astrojs/sitemap'

const defaultLocale = 'de'
const locales = {
  de: 'de-CH', // the `defaultLocale` value must present in `locales` keys
  fr: 'fr-CH',
  it: 'it-CH',
}

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
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Allow access to Netlify Preview Server
  server: {
    allowedHosts: ['devserver-main--terminofeu-bsv.netlify.app'],
  },
})
