import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

// Country flag badges matching WebinarHero
function FlagBadge({ flag }: { flag?: string | null }) {
  if (!flag || flag === 'none') return null

  if (flag === 'uk') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 30"
      >
        <clipPath id="uk-flag-wm">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="uk-diag-wm">
          <path d="M0,0 L60,30 M60,0 L0,30" />
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag-wm)" />
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

export interface SpeakerItem {
  name?: string
  role?: string
  photo?: any
  flag?: string
}

export interface WebinarMoreItem {
  kickerText?: string
  heading?: string
  dateText?: string
  registerLink?: string
  cardSubText?: string
  cardHeading?: string
  speakers?: SpeakerItem[]
}

export interface WebinarMoreProps {
  sectionTitle?: string
  emptyStateText?: string
  maxWebinars?: number
  fallbackItems?: WebinarMoreItem[]
  titleStyles?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  hrStyles?: {
    lineColor?: string
    lineHeight?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  cardStyles?: {
    cardBgColor?: string
    subTextColor?: string
    headingColor?: string
    headingFontSizeDesktop?: string
    headingFontSizeMobile?: string
    headingFontWeightDesktop?: string
    headingFontWeightMobile?: string
    speakerNameColor?: string
    speakerRoleColor?: string
  }
  detailStyles?: {
    squareColor?: string
    kickerColor?: string
    headingColor?: string
    headingFontSizeDesktop?: string
    headingFontSizeMobile?: string
    headingFontWeightDesktop?: string
    headingFontWeightMobile?: string
    calendarIconColor?: string
    dateColor?: string
    dividerColor?: string
    registerTextColor?: string
    itemGap?: string
  }
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  className?: string
}

export const WebinarMoreBlock: React.FC<WebinarMoreProps> = async (props) => {
  const {
    sectionTitle = 'More Webinars that may interest you',
    emptyStateText = 'No upcoming webinars yet.',
    maxWebinars = 2,
    fallbackItems = [],
    titleStyles = {},
    hrStyles = {},
    cardStyles = {},
    detailStyles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-white',
    paddingTop = 'pt-16 md:pt-24',
    paddingBottom = 'pb-16 md:pb-24',
    paddingLeft,
    paddingRight,
    className,
  } = props

  const isMatchHeader = matchHeaderPillWidth !== false

  // 1. Query upcoming active webinars from Payload Local API
  let fetchedItems: WebinarMoreItem[] = []
  try {
    const payload = await getPayload({ config: configPromise })
    const now = new Date().toISOString()

    const res = await payload.find({
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
      limit: maxWebinars || 2,
      depth: 2,
    })

    if (res?.docs?.length) {
      fetchedItems = res.docs.map((doc: any) => {
        // Find hero block from layout if available
        const heroBlock = Array.isArray(doc.layout)
          ? doc.layout.find((b: any) => b?.blockType === 'webinarHero')
          : null

        const kickerText =
          heroBlock?.leftCol?.kickerText ||
          heroBlock?.kickerText ||
          'AI'

        const heading =
          heroBlock?.leftCol?.heading ||
          heroBlock?.heading ||
          doc.title ||
          'Webinar Title'

        let dateText = heroBlock?.leftCol?.dateText || heroBlock?.dateText
        if (!dateText && doc.schedule?.startDate) {
          try {
            const d = new Date(doc.schedule.startDate)
            dateText = d.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })
          } catch {
            dateText = 'Coming Soon'
          }
        }

        const registerLink =
          heroBlock?.leftCol?.button1Link ||
          heroBlock?.button1Link ||
          `/webinars/${doc.slug || ''}`

        const cardSubText =
          heroBlock?.cardCol?.cardSubText ||
          heroBlock?.cardSubText ||
          '316group'

        const cardHeading =
          heroBlock?.cardCol?.cardHeading ||
          heroBlock?.cardHeading ||
          'We back disruptive\nproducts and founders in\nretail'

        const rawSpeakers =
          heroBlock?.cardCol?.speakers ||
          heroBlock?.speakers ||
          []

        const speakers: SpeakerItem[] = (Array.isArray(rawSpeakers) ? rawSpeakers : [])
          .slice(0, 2)
          .map((s: any) => ({
            name: s.name || 'John Flanery',
            role: s.role || 'Senior Software Engineer',
            photo: s.image || s.photo,
            flag: s.flag || 'uk',
          }))

        return {
          kickerText,
          heading,
          dateText: dateText || 'Monday 20th Nov. at 10:30',
          registerLink,
          cardSubText,
          cardHeading,
          speakers: speakers.length > 0 ? speakers : [
            { name: 'John Flanery', role: 'Senior Software Engineer', flag: 'uk' },
            { name: 'John Flanery', role: 'Senior Sales Manager', flag: 'ke' },
          ],
        }
      })
    }
  } catch (err) {
    console.error('Error fetching webinars in WebinarMore block:', err)
  }

  // 2. Fallback resolution: If fewer than maxWebinars found in DB, backfill with fallbackItems
  const itemsToRender: WebinarMoreItem[] = [...fetchedItems]
  if (itemsToRender.length < (maxWebinars || 2) && Array.isArray(fallbackItems) && fallbackItems.length > 0) {
    for (const fallback of fallbackItems) {
      if (itemsToRender.length >= (maxWebinars || 2)) break
      itemsToRender.push(fallback)
    }
  }

  return (
    <section
      className={cn(
        'w-full relative',
        sectionBgColor || 'bg-white',
        paddingTop,
        paddingBottom,
        className,
      )}
    >
      <div
        className={cn(
          'w-full mx-auto',
          isMatchHeader
            ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8'
            : cn(paddingLeft || 'px-6', paddingRight),
        )}
      >
        {/* ── 1. Top Section Title ───────────────────────────────────────── */}
        {sectionTitle && (
          <h2
            className={cn(
              titleStyles.textColor || 'text-gray-950',
              titleStyles.fontSizeMobile || 'text-2xl',
              `md:${titleStyles.fontSizeDesktop || 'text-2xl md:text-3xl lg:text-4xl'}`,
              titleStyles.fontWeightMobile || 'font-semibold',
              `md:${titleStyles.fontWeightDesktop || 'font-semibold'}`,
              titleStyles.marginBottomMobile || 'mb-4',
              `md:${titleStyles.marginBottomDesktop || 'mb-4 md:mb-6'}`,
              'tracking-tight leading-tight',
            )}
          >
            {sectionTitle}
          </h2>
        )}

        {/* ── 2. Full-Width Horizontal Rule Divider ─────────────────────── */}
        <div
          className={cn(
            'w-full',
            hrStyles.lineColor || 'bg-slate-300',
            hrStyles.lineHeight || 'h-px',
            hrStyles.marginBottomMobile || 'mb-8',
            `md:${hrStyles.marginBottomDesktop || 'mb-10 md:mb-14'}`,
          )}
        />

        {/* ── 3. Webinar Rows List ──────────────────────────────────────── */}
        {itemsToRender.length === 0 ? (
          <div className="w-full py-12 text-center text-gray-500 bg-slate-50/70 rounded-xl border border-dashed border-slate-200">
            {emptyStateText || 'No upcoming webinars yet.'}
          </div>
        ) : (
          <div className={cn('flex flex-col', detailStyles.itemGap || 'gap-12 md:gap-16')}>
            {itemsToRender.map((item, idx) => {
              const speakers = Array.isArray(item.speakers) && item.speakers.length > 0
                ? item.speakers
                : [
                    { name: 'John Flanery', role: 'Senior Software Engineer', flag: 'uk' },
                    { name: 'John Flanery', role: 'Senior Sales Manager', flag: 'ke' },
                  ]

              return (
                <div
                  key={idx}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* ── Left Column: Dark Hero-Style Card (lg:col-span-6 / 7) ── */}
                  <div className="lg:col-span-7 xl:col-span-6">
                    <div
                      className={cn(
                        'w-full rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[260px] sm:min-h-[290px]',
                        cardStyles.cardBgColor || 'bg-[#1C202C]',
                      )}
                    >
                      {/* Subtle global connectivity background map graphic */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

                      {/* Top Brand Subtext & Logo */}
                      <div className="relative z-10 flex items-center gap-2 mb-6 sm:mb-8">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          3
                        </div>
                        <span
                          className={cn(
                            'text-sm font-semibold tracking-tight',
                            cardStyles.subTextColor || 'text-white',
                          )}
                        >
                          {item.cardSubText || '316group'}
                        </span>
                      </div>

                      {/* Card Content Row: Heading (Left) + 2 Speakers (Right) */}
                      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                        {/* Heading */}
                        <div className="sm:col-span-6">
                          <h3
                            className={cn(
                              cardStyles.headingColor || 'text-white',
                              cardStyles.headingFontSizeMobile || 'text-lg sm:text-xl',
                              `md:${cardStyles.headingFontSizeDesktop || 'text-xl sm:text-2xl'}`,
                              cardStyles.headingFontWeightMobile || 'font-bold',
                              `md:${cardStyles.headingFontWeightDesktop || 'font-bold'}`,
                              'tracking-tight leading-snug',
                            )}
                            dangerouslySetInnerHTML={{
                              __html: formatInlineHtml(
                                item.cardHeading ||
                                  'We back disruptive\nproducts and founders in\nretail',
                              ),
                            }}
                          />
                        </div>

                        {/* Two Speakers Vertical Stack */}
                        <div className="sm:col-span-6 flex flex-col gap-4">
                          {speakers.slice(0, 2).map((spk, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-3">
                              {/* Speaker Avatar + Flag Overlay */}
                              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0">
                                {spk.photo && typeof spk.photo === 'object' ? (
                                  <Media
                                    resource={spk.photo}
                                    className="w-full h-full rounded-full overflow-hidden object-cover border border-white/20"
                                    imgClassName="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-full bg-slate-700/80 border border-white/20 flex items-center justify-center text-white font-semibold text-sm">
                                    {spk.name
                                      ? spk.name
                                          .split(' ')
                                          .map((n) => n[0])
                                          .join('')
                                          .slice(0, 2)
                                      : 'JF'}
                                  </div>
                                )}
                                <div className="absolute -bottom-0.5 -right-0.5 shadow-sm">
                                  <FlagBadge flag={spk.flag || (sIdx === 0 ? 'uk' : 'ke')} />
                                </div>
                              </div>

                              {/* Speaker Name & Role */}
                              <div className="flex flex-col min-w-0">
                                <span
                                  className={cn(
                                    'text-sm font-semibold truncate',
                                    cardStyles.speakerNameColor || 'text-white',
                                  )}
                                >
                                  {spk.name || 'John Flanery'}
                                </span>
                                <span
                                  className={cn(
                                    'text-xs truncate leading-tight',
                                    cardStyles.speakerRoleColor || 'text-slate-400',
                                  )}
                                >
                                  {spk.role || 'Senior Software Engineer'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Right Column: Webinar Details & CTA (lg:col-span-6 / 5) ── */}
                  <div className="lg:col-span-5 xl:col-span-6 flex flex-col justify-center">
                    {/* Category Kicker with Blue Square */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={cn(
                          'w-2.5 h-2.5 rounded-[1px] shrink-0',
                          detailStyles.squareColor || 'bg-[#0056FF]',
                        )}
                      />
                      <span
                        className={cn(
                          'uppercase text-xs md:text-sm font-semibold tracking-wider',
                          detailStyles.kickerColor || 'text-[#0056FF]',
                        )}
                      >
                        {item.kickerText || 'AI'}
                      </span>
                    </div>

                    {/* Webinar Title / Heading */}
                    <h3
                      className={cn(
                        detailStyles.headingColor || 'text-gray-950',
                        detailStyles.headingFontSizeMobile || 'text-xl sm:text-2xl',
                        `md:${detailStyles.headingFontSizeDesktop || 'text-2xl sm:text-3xl lg:text-4xl'}`,
                        detailStyles.headingFontWeightMobile || 'font-bold',
                        `md:${detailStyles.headingFontWeightDesktop || 'font-bold'}`,
                        'tracking-tight leading-[1.14] mb-4 md:mb-5',
                      )}
                    >
                      {item.heading || 'Cut through the AI hype and reclaim strategic time'}
                    </h3>

                    {/* Date & Time Row */}
                    <div className="flex items-center gap-2 mb-4 md:mb-5">
                      <Calendar
                        className={cn(
                          'w-4 h-4 shrink-0',
                          detailStyles.calendarIconColor || 'text-[#0056FF]',
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm md:text-base font-normal',
                          detailStyles.dateColor || 'text-gray-700',
                        )}
                      >
                        {item.dateText || 'Monday 20th Nov. at 10:30'}
                      </span>
                    </div>

                    {/* Thin Horizontal Divider */}
                    <div
                      className={cn(
                        'w-full h-px mb-4 md:mb-5',
                        detailStyles.dividerColor || 'bg-slate-200',
                      )}
                    />

                    {/* Register Today ↗ Link */}
                    <Link
                      href={item.registerLink || '#register'}
                      className={cn(
                        'font-semibold text-sm sm:text-base inline-flex items-center gap-1.5 transition-all w-fit hover:underline group',
                        detailStyles.registerTextColor || 'text-[#0056FF]',
                      )}
                    >
                      <span>Register Today</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default WebinarMoreBlock
