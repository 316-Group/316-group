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

            const cardUid = `ec-${eventDoc.id || Math.random().toString(36).slice(2, 8)}`

            return (
              <Link
                key={eventDoc.id}
                href={eventUrl}
                className={cn(
                  'group relative overflow-hidden rounded-[3px] border transition-colors duration-300 no-underline w-full block',
                  cardSettings.cardBgColor || 'bg-[#f6f7f9]',
                  cardSettings.cardBorderColor || 'border-[#c3c9d2]',
                  'hover:bg-[#f4f4fd] hover:border-[#b2b4ef]',
                  'p-6 sm:p-8 lg:p-10',
                )}
              >
                {/* ── Scoped Hover Gradient Stop Colors ── */}
                <style>{`
                  .ec-cream-${cardUid} { stop-color: #FFECB1; transition: stop-color 0.6s ease-out; }
                  .group:hover .ec-cream-${cardUid} { stop-color: #FFDD76; transition: stop-color 1s ease-out; }

                  .ec-green-${cardUid} { stop-color: #A8F0D3; transition: stop-color 0.6s ease-out; }
                  .group:hover .ec-green-${cardUid} { stop-color: #69DDAF; transition: stop-color 0.9s ease-out 100ms; }

                  .ec-blue-${cardUid} { stop-color: #CDE0FD; transition: stop-color 0.6s ease-out; }
                  .group:hover .ec-blue-${cardUid} { stop-color: #83B2F9; transition: stop-color 0.8s ease-out 150ms; }

                  .ec-purple-${cardUid} { stop-color: #F4F4FD; transition: stop-color 0.6s ease-out; }
                  .group:hover .ec-purple-${cardUid} { stop-color: #B2B4EF; transition: stop-color 0.7s ease-out 200ms; }
                `}</style>

                {/* ── Layer 1: Slanted Yellow / Cream (Bottom) ── */}
                <svg
                  className="absolute -top-[20%] -left-[10%] h-[140%] w-auto pointer-events-none invisible sm:visible blur-[1.5px] -translate-x-full group-hover:translate-x-20 transition-transform ease-out group-hover:ease-[cubic-bezier(0.22,1.08,0.36,1)] duration-1400 delay-300 group-hover:duration-1200 group-hover:delay-0"
                  viewBox="0 0 205 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad-cream-${cardUid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="205" y2="100">
                      <stop offset="0%" stopColor="#FFECB1" />
                      <stop offset="100%" className={`ec-cream-${cardUid}`} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 181,0 33,100 0,100" fill={`url(#grad-cream-${cardUid})`} opacity="0.5" />
                  <polygon points="181,0 196,0 48,100 33,100" fill={`url(#grad-cream-${cardUid})`} opacity="0.5" />
                </svg>

                {/* ── Layer 2: Slanted Mint / Green ── */}
                <svg
                  className="absolute -top-[20%] -left-[10%] h-[140%] w-auto pointer-events-none invisible sm:visible blur-[1.5px] -translate-x-full group-hover:translate-x-20 transition-transform ease-out group-hover:ease-[cubic-bezier(0.22,1.02,0.36,1)] duration-1000 delay-200 group-hover:duration-1100 group-hover:delay-100"
                  viewBox="0 0 205 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad-green-${cardUid}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="205" y2="100">
                      <stop offset="0%" stopColor="#A8F0D3" />
                      <stop offset="100%" className={`ec-green-${cardUid}`} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 181,0 33,100 0,100" fill={`url(#grad-green-${cardUid})`} opacity="0.5" />
                  <polygon points="181,0 196,0 48,100 33,100" fill={`url(#grad-green-${cardUid})`} opacity="0.5" />
                </svg>

                {/* ── Layer 3: Slanted Sky / Blue ── */}
                <svg
                  className="absolute -top-[20%] -left-[10%] h-[140%] w-auto pointer-events-none invisible sm:visible -translate-x-full group-hover:translate-x-20 transition-transform ease-out group-hover:ease-[cubic-bezier(0.22,1.02,0.36,1)] duration-800 group-hover:duration-900 group-hover:delay-200"
                  viewBox="0 0 205 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad-blue-${cardUid}`} gradientUnits="userSpaceOnUse" x1="205" y1="0" x2="0" y2="100">
                      <stop offset="0%" stopColor="#CDE0FD" />
                      <stop offset="100%" className={`ec-blue-${cardUid}`} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 181,0 33,100 0,100" fill={`url(#grad-blue-${cardUid})`} opacity="0.85" />
                  <polygon points="181,0 196,0 48,100 33,100" fill={`url(#grad-blue-${cardUid})`} opacity="0.85" />
                </svg>

                {/* ── Layer 4: Slanted Lavender / Purple (Top Card) ── */}
                <svg
                  className="absolute -top-[20%] -left-[10%] h-[140%] w-auto pointer-events-none invisible sm:visible -translate-x-full group-hover:translate-x-0 transition-transform ease-out group-hover:ease-[cubic-bezier(0.22,1.02,0.36,1)] duration-1200 group-hover:duration-800 group-hover:delay-300"
                  viewBox="0 0 205 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id={`grad-purple-${cardUid}`} gradientUnits="userSpaceOnUse" x1="205" y1="0" x2="0" y2="100">
                      <stop offset="0%" stopColor="#F4F4FD" />
                      <stop offset="100%" className={`ec-purple-${cardUid}`} />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 181,0 33,100 0,100" fill={`url(#grad-purple-${cardUid})`} />
                  <polygon points="181,0 196,0 48,100 33,100" fill={`url(#grad-purple-${cardUid})`} />
                </svg>

                {/* ── Foreground Content Grid (Sitting safely above SVGs) ── */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
                  {/* Column 1: EVENT */}
                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] md:text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5 block">
                        {subHeading}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-950 tracking-tight leading-snug transition-colors duration-300 group-hover:text-[#0256FF]">
                        {heading}
                      </h3>
                    </div>

                    <div className="mt-4 md:mt-6 text-[#0256FF] font-semibold text-sm md:text-base inline-flex items-center gap-1.5 transition-all w-fit">
                      <span>Request a meeting</span>
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                        →
                      </span>
                    </div>
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
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
