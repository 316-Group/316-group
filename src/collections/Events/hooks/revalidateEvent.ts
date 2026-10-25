import type { CollectionAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateEvent: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc?._status === 'published' && doc?.slug) {
    const path = `/events/${doc.slug}`
    payload.logger.info(`Revalidating event at path: ${path}`)
    try {
      revalidatePath(path)
    } catch (err) {
      payload.logger.error(`Error revalidating event at path ${path}: ${err}`)
    }
  }

  if (previousDoc?._status === 'published' && doc?._status !== 'published' && previousDoc?.slug) {
    const oldPath = `/events/${previousDoc.slug}`
    payload.logger.info(`Revalidating old event at path: ${oldPath}`)
    try {
      revalidatePath(oldPath)
    } catch (err) {
      payload.logger.error(`Error revalidating old event at path ${oldPath}: ${err}`)
    }
  }

  return doc
}
