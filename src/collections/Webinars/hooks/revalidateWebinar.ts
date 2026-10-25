import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateWebinar: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc?._status === 'published' && doc?.slug) {
    const path = `/webinars/${doc.slug}`
    payload.logger.info(`Revalidating webinar at path: ${path}`)
    try {
      revalidatePath(path)
    } catch (err) {
      payload.logger.error(`Error revalidating webinar at path ${path}: ${err}`)
    }
  }

  if (previousDoc?._status === 'published' && doc?._status !== 'published' && previousDoc?.slug) {
    const oldPath = `/webinars/${previousDoc.slug}`
    payload.logger.info(`Revalidating old webinar at path: ${oldPath}`)
    try {
      revalidatePath(oldPath)
    } catch (err) {
      payload.logger.error(`Error revalidating old webinar at path ${oldPath}: ${err}`)
    }
  }

  return doc
}
