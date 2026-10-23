import type { CollectionAfterReadHook, CollectionBeforeChangeHook } from 'payload'
import { defaultWebinarRecapLayout } from '../defaults/webinarRecapLayout'

/**
 * Ensures that whenever a Webinar document is loaded (including in Payload CMS Admin),
 * recapConfig.recapLayout is ALWAYS pre-populated with the full 4 default recap sections:
 * 1. webinarRecapAbout (Overview & Key Takeaways)
 * 2. webinarRecapAccess (On-Demand Recording Access & Registration Form)
 * 3. webinarMore (More Webinars That May Interest You)
 * 4. webinarCTA (Ready to Grow Call to Action)
 */
export const ensureWebinarRecapLayoutAfterRead: CollectionAfterReadHook = ({ doc }) => {
  if (doc) {
    if (!doc.recapConfig) {
      doc.recapConfig = {
        isPublished: false,
        recapLayout: defaultWebinarRecapLayout,
      }
    } else if (
      !Array.isArray(doc.recapConfig.recapLayout) ||
      doc.recapConfig.recapLayout.length === 0
    ) {
      doc.recapConfig.recapLayout = defaultWebinarRecapLayout
    } else {
      const hasRecapAbout = doc.recapConfig.recapLayout.some(
        (b: any) => b?.blockType === 'webinarRecapAbout',
      )
      if (!hasRecapAbout && defaultWebinarRecapLayout[0]) {
        doc.recapConfig.recapLayout = [defaultWebinarRecapLayout[0], ...doc.recapConfig.recapLayout]
      }

      const hasRecapAccess = doc.recapConfig.recapLayout.some(
        (b: any) => b?.blockType === 'webinarRecapAccess',
      )
      if (!hasRecapAccess && defaultWebinarRecapLayout[1]) {
        doc.recapConfig.recapLayout = [...doc.recapConfig.recapLayout, defaultWebinarRecapLayout[1]]
      }

      const hasRecapMore = doc.recapConfig.recapLayout.some(
        (b: any) => b?.blockType === 'webinarMore',
      )
      if (!hasRecapMore && defaultWebinarRecapLayout[2]) {
        doc.recapConfig.recapLayout = [...doc.recapConfig.recapLayout, defaultWebinarRecapLayout[2]]
      }

      const hasRecapCTA = doc.recapConfig.recapLayout.some(
        (b: any) => b?.blockType === 'webinarCTA',
      )
      if (!hasRecapCTA && defaultWebinarRecapLayout[3]) {
        doc.recapConfig.recapLayout = [...doc.recapConfig.recapLayout, defaultWebinarRecapLayout[3]]
      }
    }
  }
  return doc
}

/**
 * Ensures that on create or update, recapConfig.recapLayout is persisted to MongoDB
 * with defaultWebinarRecapLayout if empty or unconfigured.
 */
export const ensureWebinarRecapLayoutBeforeChange: CollectionBeforeChangeHook = ({ data }) => {
  if (data) {
    if (!data.recapConfig) {
      data.recapConfig = {
        isPublished: false,
        recapLayout: defaultWebinarRecapLayout,
      }
    } else if (
      !Array.isArray(data.recapConfig.recapLayout) ||
      data.recapConfig.recapLayout.length === 0
    ) {
      data.recapConfig.recapLayout = defaultWebinarRecapLayout
    }
  }
  return data
}
