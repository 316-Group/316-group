'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

// Country flag badges for speakers
function FlagBadge({ flag }: { flag?: string | null }) {
  if (!flag || flag === 'none') return null

  if (flag === 'uk') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 30"
      >
        <clipPath id="uk-flag-fw">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="uk-diag-fw">
          <path d="M0,0 L60,30 M60,0 L0,30" />
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag-fw)" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    )
  }

  if (flag === 'ke') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 40"
      >
        <rect width="60" height="12" fill="#000000" />
        <rect y="12" width="60" height="2" fill="#FFFFFF" />
        <rect y="14" width="60" height="12" fill="#BB0000" />
        <rect y="26" width="60" height="2" fill="#FFFFFF" />
        <rect y="28" width="60" height="12" fill="#006600" />
        <ellipse cx="30" cy="20" rx="4" ry="9" fill="#BB0000" stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    )
  }

  if (flag === 'us') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 32"
      >
        <rect width="60" height="32" fill="#B22234" />
        <rect y="4" width="60" height="4" fill="#FFFFFF" />
        <rect y="12" width="60" height="4" fill="#FFFFFF" />
        <rect y="20" width="60" height="4" fill="#FFFFFF" />
        <rect y="28" width="60" height="4" fill="#FFFFFF" />
        <rect width="24" height="16" fill="#3C3B6E" />
      </svg>
    )
  }

  if (flag === 'eu') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 40"
      >
        <rect width="60" height="40" fill="#003399" />
        <circle cx="30" cy="20" r="10" fill="none" stroke="#FFCC00" strokeWidth="2" strokeDasharray="2,3" />
      </svg>
    )
  }

  return (
    <span className="w-4 h-4 rounded-full bg-slate-300 border border-white text-[9px] flex items-center justify-center font-bold text-slate-800 shrink-0">
      {flag.toUpperCase()}
    </span>
  )
}

// World Map Dotted Pattern Component for Card Background
function WorldMapDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
      <svg className="w-full h-full object-cover" viewBox="0 0 800 400" fill="none">
        <pattern id="dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#94A3B8" />
        </pattern>
        <rect width="800" height="400" fill="url(#dot-grid)" />
      </svg>
    </div>
  )
}

export interface FeaturedWebinarClientProps {
  webinars: any[]
  dateRangeStr?: string | null
  headerRow?: any
  divider?: any
  description?: any
  filterSettings?: any
  className?: string
}

export const FeaturedWebinarClient: React.FC<FeaturedWebinarClientProps> = ({
  webinars = [],
  dateRangeStr,
  headerRow = {},
  divider = {},
  description = {},
  filterSettings = {},
  className,
}) => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>(
    filterSettings?.defaultSort === 'asc' ? 'asc' : 'desc',
  )
  const [currentPage, setCurrentPage] = useState<number>(1)
  const limit = Math.max(1, filterSettings?.limit || 3)

  // Sort active webinars by startDate
  const sortedWebinars = useMemo(() => {
    return [...webinars].sort((a, b) => {
      const timeA = a.schedule?.startDate ? new Date(a.schedule.startDate).getTime() : 0
      const timeB = b.schedule?.startDate ? new Date(b.schedule.startDate).getTime() : 0
      return sortOrder === 'asc' ? timeA - timeB : timeB - timeA
    })
  }, [webinars, sortOrder])

  // Pagination calculation
  const totalPages = Math.ceil(sortedWebinars.length / limit) || 1
  const paginatedWebinars = useMemo(() => {
    const startIndex = (currentPage - 1) * limit
    return sortedWebinars.slice(startIndex, startIndex + limit)
  }, [sortedWebinars, currentPage, limit])

  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    setCurrentPage(1)
  }

  return (
    <div className={cn('w-full flex flex-col', className)}>
      {/* ─── 1. Header Row (Title & Dynamic Date Range) ────────────────────── */}
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
          {headerRow.title || 'Featured webinars'}
        </h2>

        {dateRangeStr && (
          <span
            className={cn(
              headerRow.dateRangeColor || 'text-gray-600',
              headerRow.dateRangeFontSize || 'text-sm md:text-base',
              'font-normal select-none',
            )}
          >
            {dateRangeStr}
          </span>
        )}
      </div>

      {/* ─── 2. Divider Line ────────────────────────────────────────────────── */}
      <div
        className={cn(
          'border-t',
          divider.width || 'w-full',
          divider.color || 'border-gray-300',
          divider.marginBottomMobile || 'mb-3',
          `md:${divider.marginBottomDesktop || 'mb-4'}`,
        )}
      />

      {/* ─── 3. Subheader Row (Description & Sort Filter) ───────────────────── */}
      <div
        className={cn(
          'w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4',
          description.marginBottomMobile || 'mb-6',
          `md:${description.marginBottomDesktop || 'mb-8 md:mb-10'}`,
        )}
      >
        {/* Left: Description Text */}
        <p
          className={cn(
            description.textColor || 'text-gray-500',
            description.fontSizeMobile || 'text-xs',
            `md:${description.fontSizeDesktop || 'text-xs md:text-sm'}`,
            description.fontWeightMobile || 'font-normal',
            `md:${description.fontWeightDesktop || 'font-normal'}`,
            'leading-relaxed max-w-3xl m-0',
          )}
        >
          {description.text ||
            'Illustrative event schedule · All upcoming and past listings are examples, not confirmed 316 Group commitments or attendance.'}
        </p>

        {/* Right: Filters Toggle Button */}
        <button
          type="button"
          onClick={toggleSort}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-colors self-start sm:self-center shrink-0 cursor-pointer shadow-2xs"
          title={`Currently sorted ${sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}. Click to toggle.`}
        >
          <span>Filters</span>
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[10px] text-gray-400 uppercase font-semibold ml-0.5">
            {sortOrder}
          </span>
        </button>
      </div>

      {/* ─── 4. Dynamic Webinar Cards Listing ───────────────────────────────── */}
      {paginatedWebinars.length === 0 ? (
        <div className="w-full py-12 text-center text-gray-500 bg-gray-50/50 rounded-lg border border-dashed border-gray-200">
          {filterSettings?.emptyStateText ||
            'No active webinars are currently scheduled. Check back soon.'}
        </div>
      ) : (
        <div className="flex flex-col gap-10 md:gap-14">
          {paginatedWebinars.map((webinarDoc: any, idx: number) => {
            // Find webinar hero block from layout if available
            const heroBlock = webinarDoc.layout?.find(
              (b: any) => b.blockType === 'webinarHero',
            )

            const subHead =
              heroBlock?.leftCol?.kickerText ||
              (heroBlock as any)?.kickerText ||
              'A SHARED PURPOSE'
            const heading =
              heroBlock?.leftCol?.heading ||
              (heroBlock as any)?.heading ||
              webinarDoc.title ||
              'Better healthcare is a team effort.'
            const descriptionSummary =
              heroBlock?.leftCol?.description ||
              (heroBlock as any)?.description ||
              webinarDoc.meta?.description ||
              "ESMO brings the oncology community together to exchange ideas and look ahead. It's a chance to connect different perspectives around a common goal: better care for people."
            const rawDate =
              heroBlock?.leftCol?.dateText ||
              (heroBlock as any)?.dateText ||
              (webinarDoc.schedule?.startDate
                ? new Date(webinarDoc.schedule.startDate).toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Monday 20th Nov, at 10:30')

            const registerUrl =
              heroBlock?.leftCol?.button1Link ||
              (heroBlock as any)?.button1Link ||
              `/webinars/${webinarDoc.slug}#register`
            const webinarUrl = `/webinars/${webinarDoc.slug}`

            // Card content extraction from hero right-column card
            const cardCol = heroBlock?.cardCol || {}
            const cardBrandText = cardCol.cardSubText || '316group'
            const cardHeadline =
              cardCol.cardHeading ||
              'We back disruptive products and founders in retail'
            const speakers = Array.isArray(cardCol.speakers) && cardCol.speakers.length > 0
              ? cardCol.speakers
              : [
                  { name: 'John Flanery', role: 'Senior Sales Manager', flag: 'uk' },
                  { name: 'John Flanery', role: 'Senior Sales Manager', flag: 'ke' },
                  { name: 'John Flanery', role: 'Senior Software Engineer', flag: 'uk' },
                ]
            const featuredCardImage =
              cardCol.featuredCardImage ||
              cardCol.featuredImageMedia ||
              heroBlock?.featuredImageMedia ||
              null

            // Card 1 on Page 1: Hero Featured Layout (Dual-section with lifestyle photo)
            const isTopHeroCard = currentPage === 1 && idx === 0

            if (isTopHeroCard) {
              return (
                <div
                  key={webinarDoc.id || idx}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Left Column: Dual-Section Showcase Card */}
                  <div className="lg:col-span-7 xl:col-span-6">
                    <div className="w-full bg-[#181B24] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                      <div className="flex flex-col md:flex-row items-stretch">
                        {/* Left Part: Brand, Heading, 3 Speakers */}
                        <div className="w-full md:w-[62%] flex flex-col justify-between p-6 sm:p-7 md:p-8 order-2 md:order-1 text-white">
                          <div>
                            {/* Brand Row */}
                            <div className="flex items-center gap-2.5 mb-5 md:mb-7">
                              <span className="w-7 h-7 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                3
                              </span>
                              <span className="tracking-tight font-semibold text-sm md:text-base text-white">
                                {cardBrandText}
                              </span>
                            </div>

                            {/* Card Heading */}
                            <h3
                              className="tracking-tight leading-snug font-bold text-white text-lg sm:text-xl md:text-xl lg:text-2xl mb-5 md:mb-7"
                              dangerouslySetInnerHTML={{
                                __html: formatInlineHtml(cardHeadline),
                              }}
                            />
                          </div>

                          {/* 3 Speakers Row with avatars, country flags, name, role */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 border-t border-white/10">
                            {speakers.slice(0, 3).map((spk: any, sIdx: number) => (
                              <div key={sIdx} className="flex flex-col">
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 mb-2">
                                  {spk.image && typeof spk.image === 'object' ? (
                                    <Media
                                      resource={spk.image}
                                      className="w-full h-full rounded-xl overflow-hidden object-cover border border-white/10"
                                      imgClassName="w-full h-full object-cover rounded-xl"
                                    />
                                  ) : (
                                    <div className="w-full h-full rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center text-white/80 font-semibold text-xs overflow-hidden">
                                      {spk.name
                                        ? spk.name
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')
                                            .slice(0, 2)
                                        : 'JF'}
                                    </div>
                                  )}
                                  <div className="absolute -bottom-1 -right-1">
                                    <FlagBadge
                                      flag={spk.flag || (sIdx === 1 ? 'ke' : 'uk')}
                                    />
                                  </div>
                                </div>
                                <span className="truncate text-white text-xs font-semibold mb-0.5">
                                  {spk.name || 'John Flanery'}
                                </span>
                                <span className="line-clamp-2 leading-tight text-slate-400 text-[10px] font-normal">
                                  {spk.role ||
                                    (sIdx === 2
                                      ? 'Senior Software Engineer'
                                      : 'Senior Sales Manager')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Part: Lifestyle Photo */}
                        <div className="w-full md:w-[38%] min-h-[220px] sm:min-h-[260px] md:min-h-full relative overflow-hidden order-1 md:order-2 bg-slate-800">
                          {featuredCardImage && typeof featuredCardImage === 'object' ? (
                            <Media
                              resource={featuredCardImage}
                              className="w-full h-full object-cover"
                              imgClassName="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full min-h-[220px] md:min-h-full relative flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
                              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center text-white/70">
                                <span className="text-xs font-medium text-white/90">
                                  Featured Media
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Webinar Details & Action Buttons */}
                  <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
                    {/* Subhead with Blue Square */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2.5 h-2.5 bg-[#0000FF] shrink-0" />
                      <span className="uppercase text-xs md:text-sm font-semibold tracking-wider text-[#0000FF]">
                        {subHead}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15] mb-4">
                      {heading}
                    </h3>

                    {/* Description Summary */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
                      {descriptionSummary}
                    </p>

                    {/* Action Row: Register Today ↗ & View webinar */}
                    <div className="flex items-center gap-6 flex-wrap pt-1">
                      <Link
                        href={registerUrl}
                        className="text-[#0256FF] font-semibold text-base sm:text-lg inline-flex items-center gap-2 hover:gap-3 transition-all group"
                      >
                        <span>Register Today</span>
                        <ArrowUpRight className="w-5 h-5 text-[#0256FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>

                      <Link
                        href={webinarUrl}
                        className="text-gray-600 font-medium text-sm sm:text-base hover:text-gray-950 underline underline-offset-4 transition-colors"
                      >
                        View webinar
                      </Link>
                    </div>
                  </div>
                </div>
              )
            }

            // Cards 2 & 3: Subsequent Active Webinar Layout (World Map + Vertical Speakers)
            return (
              <div
                key={webinarDoc.id || idx}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Left Column: Showcase Card with World Map */}
                <div className="lg:col-span-7 xl:col-span-6">
                  <div className="w-full bg-[#181B24] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[290px]">
                    <WorldMapDots />

                    {/* Top Brand Subtext & Logo */}
                    <div className="relative z-10 flex items-center gap-2.5 mb-6 sm:mb-8">
                      <span className="w-7 h-7 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        3
                      </span>
                      <span className="text-sm md:text-base font-semibold tracking-tight text-white">
                        {cardBrandText}
                      </span>
                    </div>

                    {/* Card Content Row: Headline (Left) + 2 Speakers (Right) */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                      {/* Left: Card Headline */}
                      <div className="sm:col-span-6">
                        <h3
                          className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug"
                          dangerouslySetInnerHTML={{
                            __html: formatInlineHtml(cardHeadline),
                          }}
                        />
                      </div>

                      {/* Right: 2 Speakers Vertical Stack */}
                      <div className="sm:col-span-6 flex flex-col gap-4">
                        {speakers.slice(0, 2).map((spk: any, sIdx: number) => (
                          <div key={sIdx} className="flex items-center gap-3">
                            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0">
                              {spk.image && typeof spk.image === 'object' ? (
                                <Media
                                  resource={spk.image}
                                  className="w-full h-full rounded-xl overflow-hidden object-cover border border-white/20"
                                  imgClassName="w-full h-full object-cover rounded-xl"
                                />
                              ) : (
                                <div className="w-full h-full rounded-xl bg-slate-700/80 border border-white/20 flex items-center justify-center text-white font-semibold text-sm">
                                  {spk.name
                                    ? spk.name
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')
                                        .slice(0, 2)
                                    : 'JF'}
                                </div>
                              )}
                              <div className="absolute -bottom-1 -right-1 shadow-sm">
                                <FlagBadge
                                  flag={spk.flag || (sIdx === 0 ? 'uk' : 'ke')}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-semibold truncate text-white">
                                {spk.name || 'John Flanery'}
                              </span>
                              <span className="text-xs truncate leading-tight text-slate-400">
                                {spk.role ||
                                  (sIdx === 0
                                    ? 'Senior Software Engineer'
                                    : 'Senior Sales Manager')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Webinar Details */}
                <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
                  {/* Category Kicker with Blue Square */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2.5 h-2.5 bg-[#0000FF] shrink-0" />
                    <span className="uppercase text-xs md:text-sm font-semibold tracking-wider text-[#0000FF]">
                      {subHead}
                    </span>
                  </div>

                  {/* Webinar Title / Heading */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15] mb-4">
                    {heading}
                  </h3>

                  {/* Date & Time Row */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 shrink-0 text-[#0000FF]" />
                    <span className="text-sm md:text-base font-normal text-gray-700">
                      {rawDate}
                    </span>
                  </div>

                  {/* Thin Divider Line */}
                  <div className="w-full h-px bg-gray-200 my-4 sm:my-5" />

                  {/* Action Row: Register Today ↗ & View webinar */}
                  <div className="flex items-center gap-6 flex-wrap">
                    <Link
                      href={registerUrl}
                      className="text-[#0256FF] font-semibold text-base sm:text-lg inline-flex items-center gap-2 hover:gap-3 transition-all group"
                    >
                      <span>Register Today</span>
                      <ArrowUpRight className="w-5 h-5 text-[#0256FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    <Link
                      href={webinarUrl}
                      className="text-gray-600 font-medium text-sm sm:text-base hover:text-gray-950 underline underline-offset-4 transition-colors"
                    >
                      View webinar
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── 5. Pagination Controls ─────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="w-full flex items-center justify-center gap-3 pt-10 mt-6 border-t border-gray-100">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs md:text-sm font-medium text-gray-700 px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default FeaturedWebinarClient
