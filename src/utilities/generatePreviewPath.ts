import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  posts: '/posts',
  brands: '/brands',
  'case-studies': '/case-studies',
  'ebooks-and-guides': '/ebooks-and-guides',
  events: '/events',
  webinars: '/webinars',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const safeSlug = slug || (collection === 'events' || collection === 'webinars' ? 'preview' : '')
  const path = `${collectionPrefixMap[collection]}/${safeSlug}`

  const params = {
    slug: safeSlug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
