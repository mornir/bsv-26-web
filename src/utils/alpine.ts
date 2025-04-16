import type { Alpine } from 'alpinejs'
import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'

export default (Alpine: Alpine) => {
  Alpine.plugin(focus)
  Alpine.plugin(persist)

  Alpine.store('toolbar', {
    languages: ['de'],
    exp: 'show',
  })
}