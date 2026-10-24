import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PastWebinarClient } from './PastWebinarClient'

interface PastWebinarProps {
  headerRow?: any
  divider?: any
  description?: any
  filterSettings?: any
  className?: string
  isColumn?: boolean
}

export const PastWebinarBlock: React.FC<PastWebinarProps> = async (props) => {
  const {
    headerRow = {},
    divider = {},
    description = {},
    filterSettings = {},
    className,
  } = props

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  // Query concluded webinars (endDate in the past)
  const webinarsQuery = await payload.find({
    collection: 'webinars',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { 'schedule.endDate': { less_than: now } },
      ],
    },
    sort: '-schedule.endDate',
    depth: 2,
    limit: 100,
  })

  const pastWebinars = webinarsQuery.docs || []

  return (
    <PastWebinarClient
      webinars={pastWebinars}
      headerRow={headerRow}
      divider={divider}
      description={description}
      filterSettings={filterSettings}
      className={className}
    />
  )
}

export default PastWebinarBlock
