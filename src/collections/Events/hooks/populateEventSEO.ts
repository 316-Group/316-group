import type { CollectionBeforeChangeHook } from 'payload'

export const populateEventSEO: CollectionBeforeChangeHook = async ({ data }) => {
  if (!data) return data

  const layout = data?.layout
  let heroHeading = ''
  let heroDescription = ''
  let heroImage: any = null

  if (Array.isArray(layout)) {
    const heroBlock = layout.find((block: any) => block?.blockType === 'eventHero')
    if (heroBlock) {
      const heading = heroBlock?.headingGroup?.heading || heroBlock?.leftColumn?.headingGroup?.heading
      if (heading) {
        heroHeading = String(heading)
          .replace(/<[^>]*>?/gm, '')
          .replace(/\n+/g, ' ')
          .trim()
      }
      const description = heroBlock?.descriptionGroup?.description || heroBlock?.leftColumn?.descriptionGroup?.description
      if (description) {
        heroDescription = String(description)
          .replace(/<[^>]*>?/gm, '')
          .replace(/\n+/g, ' ')
          .trim()
      }
      const image = heroBlock?.imageColumn?.image || heroBlock?.rightColumn?.featuredMedia
      if (image) {
        heroImage = image
      }
    }
  }

  if (!data.meta) {
    data.meta = {}
  }

  // 1. Fallback for SEO Title
  if (!data.meta.title) {
    if (heroHeading) {
      data.meta.title = `${heroHeading} | 316 Group`
    } else if (data?.title) {
      data.meta.title = `${data.title} | 316 Group`
    } else {
      data.meta.title = 'Event | 316 Group'
    }
  }

  // 2. Fallback for SEO Description
  if (!data.meta.description && heroDescription) {
    data.meta.description = heroDescription
  }

  // 3. Fallback for SEO Image
  if (!data.meta.image && heroImage) {
    data.meta.image = heroImage
  }

  return data
}
