import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'
import type { Page } from '../../../payload-types'

export const checkSlugOnPublish: CollectionBeforeChangeHook<Page> = async ({
  data,
  req,
  originalDoc,
}) => {
  // Only enforce uniqueness when publishing
  const isPublishing = data?._status === 'published'

  if (isPublishing && data?.slug) {
    const targetSlug = String(data.slug).trim().toLowerCase()
    const currentId = originalDoc?.id || (data as any)?.id

    const existing = await req.payload.find({
      collection: 'pages',
      where: {
        and: [
          {
            slug: {
              equals: targetSlug,
            },
          },
          ...(currentId
            ? [
                {
                  id: {
                    not_equals: currentId,
                  },
                },
              ]
            : []),
        ],
      },
      limit: 1,
      depth: 0,
      req, // Transaction safety
    })

    if (existing.totalDocs > 0) {
      if (targetSlug === 'home') {
        throw new APIError('home already exist', 400)
      } else {
        throw new APIError(`A page with the slug "${targetSlug}" already exists.`, 400)
      }
    }
  }

  return data
}

