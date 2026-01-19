import myConfiguredSanityClient from './client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const builder = createImageUrlBuilder(myConfiguredSanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
