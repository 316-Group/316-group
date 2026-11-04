import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

    payload.logger.info(`Revalidating page at path: ${path}`)

    try {
      revalidatePath(path)
      if (doc.slug === 'home') {
        revalidatePath('/')
        revalidatePath('/home')
      }
    } catch (err) {
      payload.logger.error(`Error revalidating page at path ${path}: ${err}`)
    }
  }

  // If the page slug changed, revalidate the previous slug path
  if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`
    payload.logger.info(`Revalidating changed page old path: ${oldPath}`)
    try {
      revalidatePath(oldPath)
      if (previousDoc.slug === 'home') {
        revalidatePath('/')
        revalidatePath('/home')
      }
    } catch (err) {
      payload.logger.error(`Error revalidating old page path ${oldPath}: ${err}`)
    }
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

    payload.logger.info(`Revalidating unpublished page at path: ${oldPath}`)

    try {
      revalidatePath(oldPath)
      if (previousDoc.slug === 'home') {
        revalidatePath('/')
        revalidatePath('/home')
      }
    } catch (err) {
      payload.logger.error(`Error revalidating old page at path ${oldPath}: ${err}`)
    }
  }

  return doc
}
