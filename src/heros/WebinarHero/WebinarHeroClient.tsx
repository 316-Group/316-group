'use client'

import React, { useEffect, useId } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'
import { defaultWebinarHeroData, WebinarHeroSpeaker } from './defaults'

/**
 * Parses spacing inputs (e.g. pt-24, pb-16, 96px, 4rem, or 30) into valid CSS measurement strings.
 */
function parseSpacingToCss(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback
  const str = String(value).trim().replace(/\s+/g, '')
  if (!str) return fallback

  if (/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax)$/i.test(str)) {
    return str
  }

  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return `${str}px`
  }

  const arbitraryMatch = str.match(/(?:pt|pb|pl|pr|py|px|p)-\[([^\]]+)\]/i)
  if (arbitraryMatch && arbitraryMatch[1]) {
    return arbitraryMatch[1]
  }

  const twMatch = str.match(/(?:pt|pb|pl|pr|py|px|p)-([0-9]+(?:\.[0-9]+)?|px)/i)
  if (twMatch && twMatch[1]) {
    const scale = twMatch[1].toLowerCase()
    if (scale === 'px') return '1px'
    const num = parseFloat(scale)
    if (num === 0) return '0px'
    return `${num * 0.25}rem`
  }

  return fallback
}

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

interface WebinarHeroClientProps {
  heroProps: any
  activeWebinar?: any
}

export const WebinarHeroClient: React.FC<WebinarHeroClientProps> = ({
  heroProps,
  activeWebinar,
}) => {
  const { setHeaderTheme, setHeroOverlay } = useHeaderTheme()
  const rawId = useId()
  const sectionClass = `wh-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`

  useEffect(() => {
    setHeaderTheme('light')
    setHeroOverlay(false)

    return () => {
      setHeroOverlay(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 1. Extract active webinar block data if available
  const activeHeroBlock = React.useMemo(() => {
    if (!activeWebinar) return null
    if (Array.isArray(activeWebinar.layout)) {
      return activeWebinar.layout.find((b: any) => b?.blockType === 'webinarHero') || null
    }
    return null
  }, [activeWebinar])

  const isManualMode = heroProps?.webinarHeroDataSource === 'manual'

  // 2. Resolve content fields with precedence:
  // manual page hero overrides > active webinar hero block > active webinar root fields > defaultWebinarHeroData
  const kickerText =
    (isManualMode || heroProps?.webinarHeroKickerText
      ? heroProps?.webinarHeroKickerText
      : activeHeroBlock?.leftCol?.kickerText ||
        activeHeroBlock?.kickerText ||
        defaultWebinarHeroData.kickerText) || defaultWebinarHeroData.kickerText

  const headingText =
    (isManualMode || heroProps?.webinarHeroHeading
      ? heroProps?.webinarHeroHeading
      : activeHeroBlock?.leftCol?.heading ||
        activeHeroBlock?.heading ||
        activeWebinar?.title ||
        defaultWebinarHeroData.heading) || defaultWebinarHeroData.heading

  const descriptionText =
    (isManualMode || heroProps?.webinarHeroDescription
      ? heroProps?.webinarHeroDescription
      : activeHeroBlock?.leftCol?.description ||
        activeHeroBlock?.description ||
        activeWebinar?.meta?.description ||
        defaultWebinarHeroData.description) || defaultWebinarHeroData.description

  const dateText =
    (isManualMode || heroProps?.webinarHeroDateText
      ? heroProps?.webinarHeroDateText
      : activeHeroBlock?.leftCol?.dateText ||
        activeHeroBlock?.dateText ||
        (activeWebinar?.schedule?.startDate
          ? new Date(activeWebinar.schedule.startDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          : defaultWebinarHeroData.dateText)) || defaultWebinarHeroData.dateText

  const locationText =
    (isManualMode || heroProps?.webinarHeroLocationText
      ? heroProps?.webinarHeroLocationText
      : activeHeroBlock?.leftCol?.locationText ||
        activeHeroBlock?.locationText ||
        defaultWebinarHeroData.locationText) || defaultWebinarHeroData.locationText

  // Button 1 links to active webinar if present
  const defaultBtn1Link = activeWebinar?.slug ? `/webinars/${activeWebinar.slug}` : defaultWebinarHeroData.button1Link
  const button1Text =
    heroProps?.webinarHeroButton1Text ||
    activeHeroBlock?.leftCol?.button1Text ||
    defaultWebinarHeroData.button1Text
  const button1Link =
    heroProps?.webinarHeroButton1Link ||
    activeHeroBlock?.leftCol?.button1Link ||
    defaultBtn1Link

  const button2Text =
    heroProps?.webinarHeroButton2Text ||
    activeHeroBlock?.leftCol?.button2Text ||
    defaultWebinarHeroData.button2Text
  const button2Link =
    heroProps?.webinarHeroButton2Link ||
    activeHeroBlock?.leftCol?.button2Link ||
    defaultWebinarHeroData.button2Link

  // Right column card content
  const cardSubText =
    heroProps?.webinarHeroCardSubText ||
    activeHeroBlock?.cardCol?.cardSubText ||
    defaultWebinarHeroData.cardSubText

  const cardHeading =
    heroProps?.webinarHeroCardHeading ||
    activeHeroBlock?.cardCol?.cardHeading ||
    defaultWebinarHeroData.cardHeading

  const rawSpeakers =
    activeHeroBlock?.cardCol?.speakers ||
    heroProps?.webinarHeroSpeakers ||
    defaultWebinarHeroData.speakers

  const speakers: WebinarHeroSpeaker[] = Array.isArray(rawSpeakers) && rawSpeakers.length > 0
    ? rawSpeakers
    : defaultWebinarHeroData.speakers

  const cardFeaturedImage =
    heroProps?.webinarHeroCardImage ||
    activeHeroBlock?.featuredImageMedia ||
    activeHeroBlock?.cardCol?.featuredImageMedia ||
    null

  // 3. Section layout and paddings
  const isMatchHeader = heroProps?.webinarHeroMatchHeaderPillWidth !== false

  const ptMobile = parseSpacingToCss(heroProps?.webinarHeroPaddingTopMobile, '5rem') // 80px
  const ptDesktop = parseSpacingToCss(heroProps?.webinarHeroPaddingTopDesktop, '6rem') // 96px
  const pbMobile = parseSpacingToCss(heroProps?.webinarHeroPaddingBottomMobile, '5rem')
  const pbDesktop = parseSpacingToCss(heroProps?.webinarHeroPaddingBottomDesktop, '6rem')
  const plMobile = parseSpacingToCss(heroProps?.webinarHeroPaddingLeftMobile, '1rem')
  const plDesktop = parseSpacingToCss(heroProps?.webinarHeroPaddingLeftDesktop, '3rem')
  const prMobile = parseSpacingToCss(heroProps?.webinarHeroPaddingRightMobile, '1rem')
  const prDesktop = parseSpacingToCss(heroProps?.webinarHeroPaddingRightDesktop, '3rem')

  // Background styling
  const bgColor = heroProps?.webinarHeroBgColor || 'bg-[#0000FF]'
  const isTailwindBg = typeof bgColor === 'string' && bgColor.trim().startsWith('bg-')
  const isDirectCssBg =
    typeof bgColor === 'string' &&
    (/^(#|rgb|hsl)/i.test(bgColor.trim()) || (!isTailwindBg && bgColor.trim().length > 0))

  const bgClass = isTailwindBg ? bgColor.trim() : !isDirectCssBg ? 'bg-[#0000FF]' : ''
  const bgStyle: React.CSSProperties = isDirectCssBg ? { backgroundColor: bgColor.trim() } : {}

  const bgImage = heroProps?.webinarHeroBgImage
  const bgOverlay = heroProps?.webinarHeroBgOverlay || 'none'

  const overlayOpacityMap: Record<string, string> = {
    none: 'bg-transparent',
    subtle: 'bg-black/20',
    medium: 'bg-black/40',
    vignette: 'bg-gradient-to-t from-black/60 via-transparent to-black/30',
  }

  return (
    <section
      className={cn(sectionClass, 'w-full relative overflow-hidden', bgClass)}
      style={
        {
          '--wh-pt-m': ptMobile,
          '--wh-pt-d': ptDesktop,
          '--wh-pb-m': pbMobile,
          '--wh-pb-d': pbDesktop,
          ...(!isMatchHeader
            ? {
                '--wh-pl-m': plMobile,
                '--wh-pl-d': plDesktop,
                '--wh-pr-m': prMobile,
                '--wh-pr-d': prDesktop,
              }
            : {}),
          ...bgStyle,
        } as React.CSSProperties
      }
    >
      <style>{`
        .${sectionClass} {
          padding-top: var(--wh-pt-m);
          padding-bottom: var(--wh-pb-m);
        }
        .${sectionClass}-inner {
          padding-left: var(--wh-pl-m);
          padding-right: var(--wh-pr-m);
        }
        @media (min-width: 768px) {
          .${sectionClass} {
            padding-top: var(--wh-pt-d);
            padding-bottom: var(--wh-pb-d);
          }
          .${sectionClass}-inner {
            padding-left: var(--wh-pl-d);
            padding-right: var(--wh-pr-d);
          }
        }
      `}</style>

      {/* Optional Background Image */}
      {bgImage && typeof bgImage === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media resource={bgImage} fill imgClassName="w-full h-full object-cover" priority />
          {bgOverlay !== 'none' && (
            <div className={cn('absolute inset-0 pointer-events-none', overlayOpacityMap[bgOverlay])} />
          )}
        </div>
      )}

      {/* Content Container (Header Pill Synchronized or Custom Padding) */}
      <div
        className={cn(
          'w-full mx-auto relative z-10',
          isMatchHeader
            ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8'
            : cn('w-full', `${sectionClass}-inner`),
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* ═══════════════════════════════════════════════════════════════════
              LEFT COLUMN: Kicker, Heading, Description, Metadata, CTAs
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-white">
            {/* 1. Kicker Badge */}
            {kickerText && (
              <div className="flex items-center gap-2.5 mb-4 md:mb-5">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00F0FF] shrink-0" aria-hidden="true" />
                <span className="uppercase tracking-wider text-xs md:text-sm font-semibold text-white">
                  {kickerText}
                </span>
              </div>
            )}

            {/* 2. Main Heading (with tight leading and multi-line wrapping fix) */}
            {headingText && (
              <h1
                className={cn(
                  'tracking-tight font-bold text-white',
                  'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
                  'leading-[1.1] md:leading-[1.1]',
                  '[&_*]:leading-[1.1]',
                  '[&_p]:!leading-[1.1] [&_h1]:!leading-[1.1]',
                  '[&_p]:!m-0 [&_h1]:!m-0',
                  'mb-6 md:mb-8',
                  '[word-spacing:normal] [white-space:normal] break-words',
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}

            {/* 3. Description */}
            {descriptionText && (
              <div
                className="leading-relaxed text-white/90 text-base md:text-lg max-w-xl mb-6 md:mb-8 [word-spacing:normal] [white-space:normal] break-words"
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descriptionText) }}
              />
            )}

            {/* 4. Date & Location Row */}
            {(dateText || locationText) && (
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap mb-8 md:mb-10 text-white font-medium text-sm md:text-base">
                {dateText && (
                  <span dangerouslySetInnerHTML={{ __html: formatInlineHtml(dateText) }} />
                )}
                {dateText && locationText && (
                  <span className="w-px h-4 bg-white/40 shrink-0" aria-hidden="true" />
                )}
                {locationText && (
                  <span dangerouslySetInnerHTML={{ __html: formatInlineHtml(locationText) }} />
                )}
              </div>
            )}

            {/* 5. CTA Actions */}
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap pt-1">
              {button1Text && (
                <Link
                  href={button1Link || '#'}
                  className="px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base inline-flex items-center gap-2 transition-all shadow-md hover:opacity-95 bg-white text-[#0256FF]"
                >
                  <span>{button1Text}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-[#0256FF]" />
                </Link>
              )}

              {button2Text && (
                <Link
                  href={button2Link || '#'}
                  className="px-2 py-3 font-medium text-sm sm:text-base inline-flex items-center gap-1.5 hover:underline transition-colors text-white bg-transparent border-0"
                >
                  <span>{button2Text}</span>
                </Link>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT COLUMN: Showcase Card (Mockup UI)
              ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center">
            <div className="w-full bg-[#181B24] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row items-stretch">
                {/* ── Left Part of Card: Brand, Heading, Speakers ── */}
                <div className="w-full md:w-[62%] flex flex-col justify-between p-6 sm:p-7 md:p-8 order-2 md:order-1 text-white">
                  <div>
                    {/* Brand Row */}
                    <div className="flex items-center gap-2.5 mb-6 md:mb-8">
                      <span className="w-7 h-7 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        3
                      </span>
                      <span className="tracking-tight font-semibold text-sm md:text-base text-white">
                        {cardSubText}
                      </span>
                    </div>

                    {/* Card Heading */}
                    {cardHeading && (
                      <h3
                        className="tracking-tight leading-snug font-bold text-white text-xl sm:text-2xl md:text-2xl lg:text-[1.65rem] mb-6 md:mb-8"
                        dangerouslySetInnerHTML={{ __html: formatInlineHtml(cardHeading) }}
                      />
                    )}
                  </div>

                  {/* Speakers Row (3 avatars with country badges) */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 pt-2">
                    {speakers.slice(0, 3).map((speaker, idx) => (
                      <div key={speaker.id || idx} className="flex flex-col">
                        {/* Avatar + Flag Badge */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2 md:mb-3">
                          {speaker.image && typeof speaker.image === 'object' ? (
                            <Media
                              resource={speaker.image}
                              className="w-full h-full rounded-xl overflow-hidden object-cover border border-white/10"
                              imgClassName="w-full h-full object-cover rounded-xl"
                            />
                          ) : (
                            <div className="w-full h-full rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 border border-white/10 flex items-center justify-center text-white/80 font-semibold text-xs overflow-hidden">
                              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1">
                            <FlagBadge flag={speaker.flag || (idx === 1 ? 'ke' : 'uk')} />
                          </div>
                        </div>

                        {/* Speaker Name */}
                        <div className="truncate text-white text-xs sm:text-sm font-semibold mb-0.5 md:mb-1">
                          {speaker.name || 'John Flanery'}
                        </div>

                        {/* Speaker Role */}
                        <div className="line-clamp-2 leading-tight text-slate-400 text-[11px] sm:text-xs font-normal">
                          {speaker.role || (idx === 2 ? 'Senior Software Engineer' : 'Senior Sales Manager')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Right Part of Card: Featured Lifestyle Photo ── */}
                <div className="w-full md:w-[38%] min-h-[220px] sm:min-h-[260px] md:min-h-full relative overflow-hidden order-1 md:order-2 bg-slate-800">
                  {cardFeaturedImage && typeof cardFeaturedImage === 'object' ? (
                    <Media
                      resource={cardFeaturedImage}
                      className="w-full h-full object-cover"
                      imgClassName="w-full h-full object-cover"
                    />
                  ) : (
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
                        <span className="text-xs font-medium text-white/90">Featured Media</span>
                        <span className="text-[10px] text-white/50 mt-1 max-w-[140px]">
                          Mockup Lifestyle Photo
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
