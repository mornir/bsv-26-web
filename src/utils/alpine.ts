import type { Alpine } from 'alpinejs'
import focus from '@alpinejs/focus'
import persist from '@alpinejs/persist'
import collapse from '@alpinejs/collapse'
import tippy from 'tippy.js'
import intersect from '@alpinejs/intersect'

export default (Alpine: Alpine) => {
  Alpine.plugin(focus)
  Alpine.plugin(persist)
  Alpine.plugin(collapse)
  Alpine.plugin(intersect)

  Alpine.directive('tooltip', (el) => {
    tippy(el, { content: el.dataset.message })
  })

  Alpine.store('toolbar', {
    exp: 'show',
  })
}
