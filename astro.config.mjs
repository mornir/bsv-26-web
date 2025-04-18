import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'
import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'

import {defineConfig} from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://bsv.terminofeu.ch',
  integrations: [alpinejs({entrypoint: '/src/utils/alpine'}), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
})
