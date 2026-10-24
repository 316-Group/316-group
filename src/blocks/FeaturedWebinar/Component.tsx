import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FeaturedWebinarClient } from './FeaturedWebinarClient'

interface FeaturedWebinarProps {
  headerRow?: any
  divider?: any
  description?: any
  filterSettings?: any
  className?: string
  isColumn?: boolean
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const FeaturedWebinarBlock: React.FC<FeaturedWebinarProps> = async (props) => {
  const {
    headerRow = {},
    divider = {},
    description = {},
    filterSettings = {},
    className,
  } = props

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  // Query active, published webinars that have not concluded
  const webinarsQuery = await payload.find({
    collection: 'webinars',
    where: {
      and: [
        { _status: { equals: 'published' } },
        {
          or: [
            { 'schedule.endDate': { greater_than_equal: now } },
            {
              and: [
                { 'schedule.endDate': { exists: false } },
                { 'schedule.startDate': { greater_than_equal: now } },
              ],
            },
          ],
        },
      ],
    },
    sort: 'schedule.startDate',
    depth: 2,
    limit: 100,
  })

  const activeWebinars = webinarsQuery.docs || []

  // Dynamic Date Range Calculation (Top Right)
  let dateRangeStr: string | null = null
  if (activeWebinars.length > 0) {
    const datesWithStart = activeWebinars
      .map((w: any) => w.schedule?.startDate)
      .filter(Boolean)
      .map((d: string) => new Date(d))
      .filter((d: Date) => !isNaN(d.getTime()))

    const datesWithEnd = activeWebinars
      .map((w: any) => w.schedule?.endDate || w.schedule?.startDate)
      .filter(Boolean)
      .map((d: string) => new Date(d))
      .filter((d: Date) => !isNaN(d.getTime()))

    if (datesWithStart.length > 0 && datesWithEnd.length > 0) {
      const minStart = new Date(Math.min(...datesWithStart.map((d: Date) => d.getTime())))
      const maxEnd = new Date(Math.max(...datesWithEnd.map((d: Date) => d.getTime())))

      const minMonth = MONTH_NAMES[minStart.getMonth()]
      const minYear = minStart.getFullYear()
      const maxMonth = MONTH_NAMES[maxEnd.getMonth()]
      const maxYear = maxEnd.getFullYear()

      if (minMonth === maxMonth && minYear === maxYear) {
        dateRangeStr = `${minMonth} ${minYear}`
      } else {
        dateRangeStr = `${minMonth} ${minYear} — ${maxMonth} ${maxYear}`
      }
    }
  }

  return (
    <FeaturedWebinarClient
      webinars={activeWebinars}
      dateRangeStr={dateRangeStr}
      headerRow={headerRow}
      divider={divider}
      description={description}
      filterSettings={filterSettings}
      className={className}
    />
  )
}

export default FeaturedWebinarBlock
