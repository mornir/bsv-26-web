import type { Alpine } from 'alpinejs'

export default (Alpine: Alpine) => {
  Alpine.store('toolbar', {
    languages: ['de'],
    exp: 'show',
  })
}