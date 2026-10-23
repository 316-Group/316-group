import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/cn'

interface EventUpcomingProps {
  headerRow?: {
    title?: string
    titleColor?: string
    titleFontSizeDesktop?: string
    titleFontSizeMobile?: string
    titleFontWeightDesktop?: string
    titleFontWeightMobile?: string
    dateRangeColor?: string
    dateRangeFontSize?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  divider?: {
    width?: string
    color?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  description?: {
    text?: string
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  columnHeaders?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  cardSettings?: {
    cardBgColor?: string
    cardBorderColor?: string
    cardGap?: string
  }
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

function formatDates(startDateStr?: string | null, endDateStr?: string | null) {
  if (!startDateStr) {
    return { top: 'TBD', bottom: '' }
  }

  const start = new Date(startDateStr)
  const end = endDateStr ? new Date(endDateStr) : null

  if (!end || isNaN(end.getTime())) {
    return {
      top: `${start.getDate()} ${MONTH_NAMES[start.getMonth()]}`,
      bottom: `${start.getFullYear()}`,
    }
  }

  const startDay = start.getDate()
  const endDay = end.getDate()
  const startMonth = MONTH_NAMES[start.getMonth()]
  const endMonth = MONTH_NAMES[end.getMonth()]
  const endYear = end.getFullYear()

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return {
      top: startDay === endDay ? `${startDay} ${startMonth}` : `${startDay}–${endDay} ${startMonth}`,
      bottom: `${endYear}`,
    }
  }

  return {
    top: `${startDay} ${startMonth} – ${endDay} ${endMonth}`,
    bottom: `${endYear}`,
  }
}

function parseLocation(locationText?: string | null) {
  if (!locationText || !locationText.trim()) {
    return { top: 'Online', bottom: '' }
  }

  const parts = locationText.split(',')
  const top = parts[0].trim()
  const bottom = parts.slice(1).join(',').trim()

  return { top, bottom }
}

export const EventUpcomingBlock: React.FC<EventUpcomingProps> = async (props) => {
  const {
    headerRow = {},
    divider = {},
    description = {},
    columnHeaders = {},
    cardSettings = {},
    className,
  } = props

  const payload = await getPayload({ config: configPromise })
  const now = new Date().toISOString()

  // Query active, published events that have not concluded
  const eventsQuery = await payload.find({
    collection: 'events',
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
    depth: 1,
    limit: 100,
  })

  const activeEvents = eventsQuery.docs || []

  // Dynamic Date Range Calculation (Top Right)
  let dateRangeStr: string | null = null
  if (activeEvents.length > 0) {
    const datesWithStart = activeEvents
      .map((e: any) => e.schedule?.startDate)
      .filter(Boolean)
      .map((d: string) => new Date(d))
      .filter((d: Date) => !isNaN(d.getTime()))

    const datesWithEnd = activeEvents
      .map((e: any) => e.schedule?.endDate || e.schedule?.startDate)
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
    <div className={cn('w-full flex flex-col', className)}>
      {/* ─── Header Row ──────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-2',
          headerRow.marginBottomMobile || 'mb-4',
          `md:${headerRow.marginBottomDesktop || 'mb-6'}`,
        )}
      >
        <h2
          className={cn(
            headerRow.titleColor || 'text-gray-950',
            headerRow.titleFontSizeMobile || 'text-2xl',
            `md:${headerRow.titleFontSizeDesktop || 'text-3xl md:text-4xl'}`,
            headerRow.titleFontWeightMobile || 'font-semibold',
            `md:${headerRow.titleFontWeightDesktop || 'font-semibold'}`,
            'tracking-tight',
          )}
        >
          {headerRow.title || 'Upcoming events'}
        </h2>

        {dateRangeStr && (
          <span
            className={cn(
              headerRow.dateRangeColor || 'text-gray-600',
              headerRow.dateRangeFontSize || 'text-sm md:text-base',
              'font-normal',
            )}
          >
            {dateRangeStr}
          </span>
        )}
      </div>

      {/* ─── Divider Line ────────────────────────────────────────────────────── */}
      <div
        className={cn(
          'border-t',
          divider.width || 'w-full',
          divider.color || 'border-gray-300',
          divider.marginBottomMobile || 'mb-3',
          `md:${divider.marginBottomDesktop || 'mb-4'}`,
        )}
      />

      {/* ─── Description Text ────────────────────────────────────────────────── */}
      {description.text && (
        <p
          className={cn(
            description.textColor || 'text-gray-500',
            description.fontSizeMobile || 'text-xs',
            `md:${description.fontSizeDesktop || 'text-xs md:text-sm'}`,
            description.fontWeightMobile || 'font-normal',
            `md:${description.fontWeightDesktop || 'font-normal'}`,
            description.marginBottomMobile || 'mb-6',
            `md:${description.marginBottomDesktop || 'mb-8'}`,
            'leading-relaxed',
          )}
        >
          {description.text}
        </p>
      )}

      {/* ─── Table Column Headers ────────────────────────────────────────────── */}
      <div
        className={cn(
          'hidden lg:grid grid-cols-12 gap-6 pb-2 select-none tracking-wider uppercase',
          columnHeaders.textColor || 'text-gray-500',
          columnHeaders.fontSizeMobile || 'text-[11px]',
          `md:${columnHeaders.fontSizeDesktop || 'text-xs'}`,
          columnHeaders.fontWeightMobile || 'font-medium',
          `md:${columnHeaders.fontWeightDesktop || 'font-medium'}`,
          columnHeaders.marginBottomMobile || 'mb-3',
          `md:${columnHeaders.marginBottomDesktop || 'mb-4'}`,
        )}
      >
        <div className="lg:col-span-4">EVENT</div>
        <div className="lg:col-span-4">ABOUT THE EVENT</div>
        <div className="lg:col-span-2">DATES</div>
        <div className="lg:col-span-2">LOCATION</div>
      </div>

      {/* ─── Event Cards List ────────────────────────────────────────────────── */}
      <div className={cn('flex flex-col', cardSettings.cardGap || 'gap-4')}>
        {activeEvents.length === 0 ? (
          <div className="w-full py-12 text-center text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
            No upcoming events are currently scheduled. Check back soon.
          </div>
        ) : (
          activeEvents.map((eventDoc: any) => {
            // Find event hero block from layout if available
            const heroBlock = eventDoc.layout?.find(
              (b: any) => b.blockType === 'eventHero',
            )

            const subHeading =
              heroBlock?.kickerGroup?.text ||
              (heroBlock as any)?.kickerStyles?.text ||
              'EVENT'
            const heading =
              heroBlock?.headingGroup?.heading ||
              eventDoc.title ||
              'Untitled Event'
            const aboutText =
              heroBlock?.descriptionGroup?.description ||
              heroBlock?.kickerGroup?.description ||
              ''
            const locationRaw =
              heroBlock?.metadataGroup?.locationText ||
              (heroBlock as any)?.location ||
              ''

            const { top: dateTop, bottom: dateBottom } = formatDates(
              eventDoc.schedule?.startDate,
              eventDoc.schedule?.endDate,
            )

            const { top: locCity, bottom: locCountry } = parseLocation(locationRaw)

            const eventUrl = `/events/${eventDoc.slug}`

            return (
              <div
                key={eventDoc.id}
                className={cn(
                  'w-full p-6 md:p-8 rounded-none border transition-all duration-200',
                  cardSettings.cardBgColor || 'bg-white',
                  cardSettings.cardBorderColor || 'border-gray-200/80',
                  'hover:border-gray-300 hover:shadow-sm',
                )}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Column 1: EVENT */}
                  <div className="lg:col-span-4 flex flex-col">
                    <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5">
                      {subHeading}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-950 tracking-tight leading-snug">
                      {heading}
                    </h3>

                    <Link
                      href={eventUrl}
                      className="mt-4 md:mt-6 text-[#0256FF] font-semibold text-sm md:text-base inline-flex items-center gap-1.5 hover:gap-2.5 transition-all group w-fit"
                    >
                      <span>Request a meeting</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>

                  {/* Column 2: ABOUT THE EVENT */}
                  <div className="lg:col-span-4 text-slate-600 text-sm md:text-base leading-relaxed pt-1">
                    {aboutText}
                  </div>

                  {/* Column 3: DATES */}
                  <div className="lg:col-span-2 flex flex-col pt-1">
                    <span className="text-base font-semibold text-gray-950">
                      {dateTop}
                    </span>
                    {dateBottom && (
                      <span className="text-sm text-slate-500 mt-0.5">
                        {dateBottom}
                      </span>
                    )}
                  </div>

                  {/* Column 4: LOCATION */}
                  <div className="lg:col-span-2 flex flex-col pt-1">
                    <span className="text-base font-semibold text-gray-950">
                      {locCity}
                    </span>
                    {locCountry && (
                      <span className="text-sm text-slate-500 mt-0.5">
                        {locCountry}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
