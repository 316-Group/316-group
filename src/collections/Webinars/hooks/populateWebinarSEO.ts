import type { CollectionBeforeChangeHook } from 'payload'

export const populateWebinarSEO: CollectionBeforeChangeHook = async ({ data }) => {
  if (!data) return data

  const layout = data?.layout
  let heroHeading = ''
  let heroDescription = ''
  let heroDate = ''
  let heroLocation = ''
  let heroImage: any = null

  if (Array.isArray(layout)) {
    const heroBlock = layout.find((block: any) => block?.blockType === 'webinarHero')
    if (heroBlock) {
      // Left Column Content Extraction
      const leftCol = heroBlock?.leftCol || {}
      if (leftCol.heading) {
        heroHeading = String(leftCol.heading)
          .replace(/<[^>]*>?/gm, '')
          .replace(/\n+/g, ' ')
          .trim()
      }
      if (leftCol.description) {
        heroDescription = String(leftCol.description)
          .replace(/<[^>]*>?/gm, '')
          .replace(/\n+/g, ' ')
          .trim()
      }
      if (leftCol.dateText) {
        heroDate = String(leftCol.dateText).trim()
      }
      if (leftCol.locationText) {
        heroLocation = String(leftCol.locationText).trim()
      }

      // Media Extraction: Right card featured photo, speaker photo, or custom bg
      const cardCol = heroBlock?.cardCol || {}
      if (cardCol.featuredCardImage) {
        heroImage = cardCol.featuredCardImage
      } else if (Array.isArray(cardCol.speakers) && cardCol.speakers[0]?.image) {
        heroImage = cardCol.speakers[0].image
      } else if (heroBlock?.bgImage) {
        heroImage = heroBlock.bgImage
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
      data.meta.title = 'Webinar | 316 Group'
    }
  }

  // 2. Fallback for SEO Description (rich context including date and location)
  if (!data.meta.description) {
    const parts: string[] = []
    if (heroDescription) parts.push(heroDescription)
    if (heroDate) parts.push(`Date: ${heroDate}`)
    if (heroLocation) parts.push(`Format: ${heroLocation}`)

    if (parts.length > 0) {
      data.meta.description = parts.join(' • ')
    }
  }

  // 3. Fallback for SEO Image
  if (!data.meta.image && heroImage) {
    data.meta.image = heroImage
  }

  return data
}
