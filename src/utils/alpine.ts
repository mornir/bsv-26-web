import type { Alpine } from 'alpinejs'
import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import tippy from 'tippy.js'

export default (Alpine: Alpine) => {
  Alpine.plugin(focus)
  Alpine.plugin(persist)

  Alpine.directive('tooltip', (el) => {
    tippy(el, { content: el.dataset.message })
  })

  Alpine.store('toolbar', {
    exp: 'show',
  })
}
