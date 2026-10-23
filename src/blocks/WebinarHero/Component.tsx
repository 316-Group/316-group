'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

// Country flag badges
function FlagBadge({ flag }: { flag?: string | null }) {
  if (!flag || flag === 'none') return null

  if (flag === 'uk') {
    return (
      <svg
        className="w-4 h-4 rounded-full overflow-hidden border border-white shadow-xs shrink-0"
        viewBox="0 0 60 30"
      >
        <clipPath id="uk-flag">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="uk-diag">
          <path d="M0,0 L60,30 M60,0 L0,30" />
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#uk-diag)" />
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
        {/* Simplified Masai Shield */}
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
  id?: string
  name?: string
  role?: string
  image?: any
  flag?: string
}

export interface WebinarHeroProps {
  // Left Column Content
  leftCol?: {
    kickerText?: string
    heading?: string
    description?: string
    dateText?: string
    locationText?: string
    button1Text?: string
    button1Link?: string
    button2Text?: string
    button2Link?: string
  }
  // Fallbacks for flattened or top-level props
  kickerText?: string
  heading?: string
  headingText?: string
  description?: string
  descriptionText?: string
  dateText?: string
  locationText?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string

  // Right Column Content
  cardCol?: {
    cardIcon?: any
    cardSubText?: string
    cardHeading?: string
    speakers?: SpeakerItem[]
    featuredCardImage?: any
  }
  cardIcon?: any
  cardSubText?: string
  cardHeading?: string
  cardHeadingText?: string
  speakers?: SpeakerItem[]
  featuredCardImage?: any

  // Left Column Styles
  kickerStyles?: {
    squareColor?: string
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  headingStyles?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  descriptionStyles?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  metadataStyles?: {
    dateTextColor?: string
    dividerColor?: string
    locationTextColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  buttonsStyles?: {
    button1BgColor?: string
    button1TextColor?: string
    button1IconColor?: string
    button2TextColor?: string
  }

  // Right Column Styles
  cardStyles?: {
    subTextColor?: string
    subTextFontSizeDesktop?: string
    subTextFontSizeMobile?: string
    subTextMarginBottomDesktop?: string
    subTextMarginBottomMobile?: string
    headingTextColor?: string
    headingFontSizeDesktop?: string
    headingFontSizeMobile?: string
    headingFontWeightDesktop?: string
    headingFontWeightMobile?: string
    headingMarginBottomDesktop?: string
    headingMarginBottomMobile?: string
  }
  speakerStyles?: {
    imageMarginBottomDesktop?: string
    imageMarginBottomMobile?: string
    nameTextColor?: string
    nameFontSizeDesktop?: string
    nameFontSizeMobile?: string
    nameFontWeightDesktop?: string
    nameFontWeightMobile?: string
    nameMarginBottomDesktop?: string
    nameMarginBottomMobile?: string
    roleTextColor?: string
    roleFontSizeDesktop?: string
    roleFontSizeMobile?: string
    roleFontWeightDesktop?: string
    roleFontWeightMobile?: string
  }

  // Section Layout & Spacing
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  cardInnerPadding?: {
    cardPaddingTop?: string
    cardPaddingBottom?: string
    cardPaddingLeft?: string
    cardPaddingRight?: string
  }
  cardPaddingTop?: string
  cardPaddingBottom?: string
  cardPaddingLeft?: string
  cardPaddingRight?: string

  className?: string
}

export const WebinarHeroBlock: React.FC<WebinarHeroProps> = (props) => {
  const {
    leftCol = {},
    cardCol = {},
    kickerStyles = {},
    headingStyles = {},
    descriptionStyles = {},
    metadataStyles = {},
    buttonsStyles = {},
    cardStyles = {},
    speakerStyles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-[#0000FF]',
    paddingTop = 'pt-16 md:pt-20',
    paddingBottom = 'pb-16 md:pb-24',
    paddingLeft,
    paddingRight,
    cardInnerPadding = {},
    className,
  } = props

  // Data resolution with fallbacks
  const kicker = leftCol?.kickerText ?? props.kickerText ?? '316 GROUP AT ESMO 2026'
  const mainHeading =
    leftCol?.heading ??
    props.heading ??
    props.headingText ??
    'Translating oncology\ninnovation into real-world\nimpact'
  const desc =
    leftCol?.description ??
    props.description ??
    props.descriptionText ??
    "A shared ambition. A meaningful conversation. Join 316 Group in Madrid to explore what's next for healthcare."
  const dateStr = leftCol?.dateText ?? props.dateText ?? '23 October 2026, 10:30am BST'
  const locationStr = leftCol?.locationText ?? props.locationText ?? 'Online Webinar'

  const btn1Text = leftCol?.button1Text ?? props.button1Text ?? 'Register'
  const btn1Link = leftCol?.button1Link ?? props.button1Link ?? '#register'
  const btn2Text = leftCol?.button2Text ?? props.button2Text ?? 'See what you will gain!'
  const btn2Link = leftCol?.button2Link ?? props.button2Link ?? '#gain'

  const cardSubText = cardCol?.cardSubText ?? props.cardSubText ?? '316group'
  const cardHeadingText =
    cardCol?.cardHeading ??
    props.cardHeading ??
    props.cardHeadingText ??
    'We back disruptive\nproducts and founders in retail'
  const cardIconMedia = cardCol?.cardIcon ?? props.cardIcon
  const featuredImageMedia = cardCol?.featuredCardImage ?? props.featuredCardImage

  // Default speakers if none provided
  const speakersList =
    cardCol?.speakers && cardCol.speakers.length > 0
      ? cardCol.speakers
      : props.speakers && props.speakers.length > 0
        ? props.speakers
        : [
            {
              name: 'John Flanery',
              role: 'Senior Sales Manager',
              flag: 'uk',
            },
            {
              name: 'John Flanery',
              role: 'Senior Sales Manager',
              flag: 'ke',
            },
            {
              name: 'John Flanery',
              role: 'Senior Software Engineer',
              flag: 'uk',
            },
          ]

  const isMatchHeader = matchHeaderPillWidth !== false

  // Card padding
  const cPadTop = cardInnerPadding?.cardPaddingTop ?? props.cardPaddingTop ?? 'pt-6 md:pt-8'
  const cPadBottom = cardInnerPadding?.cardPaddingBottom ?? props.cardPaddingBottom ?? 'pb-6 md:pb-8'
  const cPadLeft = cardInnerPadding?.cardPaddingLeft ?? props.cardPaddingLeft ?? 'pl-6 md:pl-8'
  const cPadRight = cardInnerPadding?.cardPaddingRight ?? props.cardPaddingRight ?? 'pr-6 md:pr-8'

  return (
    <section
      className={cn(
        'w-full relative overflow-hidden min-h-[calc(100vh-80px)] flex flex-col justify-center text-white',
        sectionBgColor || 'bg-[#0000FF]',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ═══════════════════════════════════════════════════════════════════
              LEFT COLUMN: Header Copy, Description, Metadata & CTAs
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* 1. Subheader / Kicker Tag */}
            {kicker && (
              <div
                className={cn(
                  'flex items-center gap-2.5 uppercase tracking-wider',
                  kickerStyles.marginBottomMobile || 'mb-4',
                  `md:${kickerStyles.marginBottomDesktop || 'mb-5'}`,
                )}
              >
                <span
                  className={cn(
                    'w-2.5 h-2.5 rounded-[2px] shrink-0',
                    kickerStyles.squareColor || 'bg-[#00F0FF]',
                  )}
                />
                <span
                  className={cn(
                    kickerStyles.textColor || 'text-white',
                    kickerStyles.fontSizeMobile || 'text-xs',
                    `md:${kickerStyles.fontSizeDesktop || 'text-xs md:text-sm'}`,
                    kickerStyles.fontWeightMobile || 'font-semibold',
                    `md:${kickerStyles.fontWeightDesktop || 'font-semibold'}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(kicker) }}
                />
              </div>
            )}

            {/* 2. Main Heading */}
            {mainHeading && (
              <h1
                className={cn(
                  'tracking-tight leading-[1.12]',
                  headingStyles.textColor || 'text-white',
                  headingStyles.fontSizeMobile || 'text-3xl',
                  `md:${headingStyles.fontSizeDesktop || 'text-4xl sm:text-5xl lg:text-6xl'}`,
                  headingStyles.fontWeightMobile || 'font-bold',
                  `md:${headingStyles.fontWeightDesktop || 'font-bold'}`,
                  headingStyles.marginBottomMobile || 'mb-4',
                  `md:${headingStyles.marginBottomDesktop || 'mb-6 md:mb-8'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(mainHeading) }}
              />
            )}

            {/* 3. Description */}
            {desc && (
              <div
                className={cn(
                  'leading-relaxed max-w-xl',
                  descriptionStyles.textColor || 'text-white/90',
                  descriptionStyles.fontSizeMobile || 'text-sm md:text-base',
                  `md:${descriptionStyles.fontSizeDesktop || 'text-base md:text-lg'}`,
                  descriptionStyles.fontWeightMobile || 'font-normal',
                  `md:${descriptionStyles.fontWeightDesktop || 'font-normal'}`,
                  descriptionStyles.marginBottomMobile || 'mb-5',
                  `md:${descriptionStyles.marginBottomDesktop || 'mb-6 md:mb-8'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(desc) }}
              />
            )}

            {/* 4. Date & Location Row */}
            {(dateStr || locationStr) && (
              <div
                className={cn(
                  'flex items-center gap-3 sm:gap-4 flex-wrap',
                  metadataStyles.marginBottomMobile || 'mb-6',
                  `md:${metadataStyles.marginBottomDesktop || 'mb-8 md:mb-10'}`,
                )}
              >
                {dateStr && (
                  <span
                    className={cn(
                      metadataStyles.dateTextColor || 'text-white',
                      metadataStyles.fontSizeMobile || 'text-xs sm:text-sm',
                      `md:${metadataStyles.fontSizeDesktop || 'text-sm md:text-base'}`,
                      metadataStyles.fontWeightMobile || 'font-medium',
                      `md:${metadataStyles.fontWeightDesktop || 'font-medium'}`,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(dateStr) }}
                  />
                )}
                {dateStr && locationStr && (
                  <span
                    className={cn(
                      'w-px h-3.5 sm:h-4 shrink-0',
                      metadataStyles.dividerColor || 'bg-white/40',
                    )}
                  />
                )}
                {locationStr && (
                  <span
                    className={cn(
                      metadataStyles.locationTextColor || 'text-white',
                      metadataStyles.fontSizeMobile || 'text-xs sm:text-sm',
                      `md:${metadataStyles.fontSizeDesktop || 'text-sm md:text-base'}`,
                      metadataStyles.fontWeightMobile || 'font-medium',
                      `md:${metadataStyles.fontWeightDesktop || 'font-medium'}`,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(locationStr) }}
                  />
                )}
              </div>
            )}

            {/* 5. Action Buttons */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-1">
              {btn1Text && (
                <Link
                  href={btn1Link || '#'}
                  className={cn(
                    'px-6 py-3 rounded-full font-semibold text-sm sm:text-base inline-flex items-center gap-2 transition-all shadow-md hover:opacity-95',
                    buttonsStyles.button1BgColor || 'bg-white',
                    buttonsStyles.button1TextColor || 'text-[#0256FF]',
                  )}
                >
                  <span>{btn1Text}</span>
                  <ArrowUpRight
                    className={cn(
                      'w-4 h-4 shrink-0',
                      buttonsStyles.button1IconColor || 'text-[#0256FF]',
                    )}
                  />
                </Link>
              )}

              {btn2Text && (
                <Link
                  href={btn2Link || '#'}
                  className={cn(
                    'px-2 py-3 font-medium text-sm sm:text-base inline-flex items-center gap-1.5 hover:underline transition-colors bg-transparent border-0',
                    buttonsStyles.button2TextColor || 'text-white',
                  )}
                >
                  <span>{btn2Text}</span>
                </Link>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Dual-Section Showcase Card (Content + Image)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full bg-[#181B24] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch">
                {/* ── Left Part: Brand, Heading, Speakers (Order 2 on mobile, 1 on desktop) ── */}
                <div
                  className={cn(
                    'w-full md:w-[62%] flex flex-col justify-between order-2 md:order-1',
                    cPadTop,
                    cPadBottom,
                    cPadLeft,
                    cPadRight,
                  )}
                >
                  <div>
                    {/* Top Brand / Subhead */}
                    <div
                      className={cn(
                        'flex items-center gap-2.5',
                        cardStyles.subTextMarginBottomMobile || 'mb-4',
                        `md:${cardStyles.subTextMarginBottomDesktop || 'mb-6 md:mb-8'}`,
                      )}
                    >
                      {cardIconMedia && typeof cardIconMedia === 'object' ? (
                        <Media
                          resource={cardIconMedia}
                          className="w-7 h-7 rounded-full overflow-hidden shrink-0"
                          imgClassName="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="w-7 h-7 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          3
                        </span>
                      )}
                      <span
                        className={cn(
                          'tracking-tight font-semibold',
                          cardStyles.subTextColor || 'text-white',
                          cardStyles.subTextFontSizeMobile || 'text-xs sm:text-sm',
                          `md:${cardStyles.subTextFontSizeDesktop || 'text-sm md:text-base'}`,
                        )}
                      >
                        {cardSubText}
                      </span>
                    </div>

                    {/* Card Heading */}
                    {cardHeadingText && (
                      <h3
                        className={cn(
                          'tracking-tight leading-snug',
                          cardStyles.headingTextColor || 'text-white',
                          cardStyles.headingFontSizeMobile || 'text-xl sm:text-2xl',
                          `md:${cardStyles.headingFontSizeDesktop || 'text-2xl sm:text-3xl lg:text-3xl'}`,
                          cardStyles.headingFontWeightMobile || 'font-bold',
                          `md:${cardStyles.headingFontWeightDesktop || 'font-bold'}`,
                          cardStyles.headingMarginBottomMobile || 'mb-6',
                          `md:${cardStyles.headingMarginBottomDesktop || 'mb-8 md:mb-10'}`,
                        )}
                        dangerouslySetInnerHTML={{ __html: formatInlineHtml(cardHeadingText) }}
                      />
                    )}
                  </div>

                  {/* Speakers / Highlight Grid (3 Items) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-2">
                    {speakersList.map((speaker, idx) => (
                      <div key={speaker.id || idx} className="flex flex-col">
                        {/* Avatar with Country Flag Badge Overlay */}
                        <div
                          className={cn(
                            'relative w-12 h-12 sm:w-14 sm:h-14',
                            speakerStyles.imageMarginBottomMobile || 'mb-2',
                            `md:${speakerStyles.imageMarginBottomDesktop || 'mb-3'}`,
                          )}
                        >
                          {speaker.image && typeof speaker.image === 'object' ? (
                            <Media
                              resource={speaker.image}
                              className="w-full h-full rounded-xl overflow-hidden object-cover border border-white/10"
                              imgClassName="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center text-white/80 font-semibold text-xs overflow-hidden">
                              {/* Representative portrait silhouette or monogram */}
                              <svg
                                className="w-8 h-8 text-slate-400"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                          )}
                          {/* Flag Overlay */}
                          <div className="absolute -bottom-1 -right-1">
                            <FlagBadge flag={speaker.flag || (idx === 1 ? 'ke' : 'uk')} />
                          </div>
                        </div>

                        {/* Speaker Name */}
                        <div
                          className={cn(
                            'truncate',
                            speakerStyles.nameTextColor || 'text-white',
                            speakerStyles.nameFontSizeMobile || 'text-xs sm:text-sm',
                            `md:${speakerStyles.nameFontSizeDesktop || 'text-sm md:text-base'}`,
                            speakerStyles.nameFontWeightMobile || 'font-semibold',
                            `md:${speakerStyles.nameFontWeightDesktop || 'font-semibold'}`,
                            speakerStyles.nameMarginBottomMobile || 'mb-0.5',
                            `md:${speakerStyles.nameMarginBottomDesktop || 'mb-1'}`,
                          )}
                        >
                          {speaker.name || 'John Flanery'}
                        </div>

                        {/* Speaker Role */}
                        <div
                          className={cn(
                            'line-clamp-2 leading-tight',
                            speakerStyles.roleTextColor || 'text-slate-400',
                            speakerStyles.roleFontSizeMobile || 'text-[11px] sm:text-xs',
                            `md:${speakerStyles.roleFontSizeDesktop || 'text-xs md:text-sm'}`,
                            speakerStyles.roleFontWeightMobile || 'font-normal',
                            `md:${speakerStyles.roleFontWeightDesktop || 'font-normal'}`,
                          )}
                        >
                          {speaker.role || (idx === 2 ? 'Senior Software Engineer' : 'Senior Sales Manager')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right Part: Featured Lifestyle Image (Order 1 on mobile, 2 on desktop) ── */}
                <div className="w-full md:w-[38%] min-h-[220px] sm:min-h-[260px] md:min-h-full relative overflow-hidden order-1 md:order-2 bg-slate-800">
                  {featuredImageMedia && typeof featuredImageMedia === 'object' ? (
                    <Media
                      resource={featuredImageMedia}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                    />
                  ) : (
                    /* High-fidelity fallback representing the lifestyle photography in mockup */
                    <div className="w-full h-full min-h-[240px] md:min-h-full relative flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center text-white/70">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center mb-3 text-white">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-white/90">Card Lifestyle Photo</span>
                        <span className="text-[10px] text-white/50 mt-1 max-w-[140px]">
                          Upload a photo in the card media field
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
