import React from 'react'
import type { Page } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { WebinarHeroClient } from './WebinarHeroClient'

export const WebinarHero: React.FC<Page['hero']> = async (props) => {
  let activeWebinar: any = null

  const isManual = (props as any)?.webinarHeroDataSource === 'manual'

  if (!isManual) {
    try {
      const payload = await getPayload({ config: configPromise })
      const nowIso = new Date().toISOString()

      // Query latest published webinar whose schedule has not ended yet
      const result = await payload.find({
        collection: 'webinars',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              'schedule.endDate': {
                greater_than: nowIso,
              },
            },
          ],
        },
        sort: '-schedule.startDate',
        limit: 1,
        depth: 2,
      })

      if (result.docs && result.docs.length > 0) {
        activeWebinar = result.docs[0]
      }
    } catch (err) {
      console.error('[WebinarHero] Error querying active webinar:', err)
    }
  }

  return <WebinarHeroClient heroProps={props} activeWebinar={activeWebinar} />
}
