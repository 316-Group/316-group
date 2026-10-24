import type { CollectionAfterReadHook, CollectionBeforeChangeHook } from 'payload'
import { defaultWebinarTemplateLayout } from '../defaults/webinarTemplateLayout'

/**
 * Ensures that whenever a Webinar document is loaded (including in Payload CMS Admin),
 * layout is pre-populated with the default webinar template sections (WebinarHero, WebinarAbout, WebinarMore).
 */
export const ensureWebinarLayoutAfterRead: CollectionAfterReadHook = ({ doc }) => {
  if (doc) {
    if (!Array.isArray(doc.layout) || doc.layout.length === 0) {
      doc.layout = defaultWebinarTemplateLayout
    }
  }
  return doc
}

/**
 * Ensures that on create or update, missing default webinar sections are preserved
 */
export const ensureWebinarLayoutBeforeChange: CollectionBeforeChangeHook = ({ data }) => {
  if (data) {
    if (!Array.isArray(data.layout) || data.layout.length === 0) {
      data.layout = defaultWebinarTemplateLayout
    }
  }
  return data
}
