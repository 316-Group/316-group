import type { CollectionAfterReadHook, CollectionBeforeChangeHook } from 'payload'
import { defaultEventRecapLayout } from '../defaults/recapLayout'

/**
 * Ensures that whenever an Event document is loaded (including in Payload CMS Admin),
 * recapConfig.recapLayout is ALWAYS pre-populated with the 5 default recap sections.
 */
export const ensureRecapLayoutAfterRead: CollectionAfterReadHook = ({ doc }) => {
  if (doc) {
    if (!doc.recapConfig) {
      doc.recapConfig = {
        isPublished: false,
        recapLayout: defaultEventRecapLayout,
      }
    } else if (
      !Array.isArray(doc.recapConfig.recapLayout) ||
      doc.recapConfig.recapLayout.length === 0
    ) {
      doc.recapConfig.recapLayout = defaultEventRecapLayout
    }
  }
  return doc
}

/**
 * Ensures that on create or update, recapConfig.recapLayout is persisted to MongoDB
 * with defaultEventRecapLayout if empty or unconfigured.
 */
export const ensureRecapLayoutBeforeChange: CollectionBeforeChangeHook = ({ data }) => {
  if (data) {
    if (!data.recapConfig) {
      data.recapConfig = {
        isPublished: false,
        recapLayout: defaultEventRecapLayout,
      }
    } else if (
      !Array.isArray(data.recapConfig.recapLayout) ||
      data.recapConfig.recapLayout.length === 0
    ) {
      data.recapConfig.recapLayout = defaultEventRecapLayout
    }
  }
  return data
}
