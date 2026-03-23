import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import sitemap from '@astrojs/sitemap'
import { i18n, filterSitemapByDefaultLocale } from 'astro-i18n-aut/integration'
import { defaultLocale, locales } from './src/i18n/ui'
import pagefind from 'astro-pagefind'

// https://astro.build/config
export default defineConfig({
  site: 'https://bsv.terminofeu.ch',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Public Sans',
      cssVariable: '--font-public-sans',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
    },
  ],
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
    optimizeDeps: {
      include: [
        'alpinejs',
        '@alpinejs/focus',
        '@alpinejs/persist',
        '@alpinejs/collapse',
        'tippy.js',
      ],
    },
  },
  devToolbar: {
    enabled: false,
  },
})
