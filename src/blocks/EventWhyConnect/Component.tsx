'use client'

import React from 'react'
import {
  MessageSquare,
  Network,
  ArrowUpRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Globe,
  Ticket,
} from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventWhyConnectItem {
  iconType?:
    | 'messageSquare'
    | 'network'
    | 'arrowUpRight'
    | 'calendar'
    | 'mapPin'
    | 'clock'
    | 'users'
    | 'globe'
    | 'ticket'
    | 'customMedia'
    | 'none'
    | null
  customIconMedia?: MediaType | string | null
  iconColor?: string | null
  iconSize?: string | null
  numberText?: string | null
  numberColor?: string | null
  numberFontSize?: string | null
  numberFontWeight?: string | null
  headerMarginBottom?: string | null
  hrColor?: string | null
  hrMarginBottom?: string | null
  heading?: string | null
  headingColor?: string | null
  headingFontSize?: string | null
  headingFontWeight?: string | null
  headingMarginBottom?: string | null
  description?: string | null
  descriptionColor?: string | null
  descriptionFontSize?: string | null
  descriptionFontWeight?: string | null
}

export interface EventWhyConnectProps {
  // Layout & Alignment
  matchHeaderPillWidth?: boolean | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null

  // Section Background & Vertical Paddings
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Top 2-Column Header Grid
  topGrid?: {
    kickerGroup?: {
      showKicker?: boolean | null
      squareColor?: string | null
      squareSize?: string | null
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    headingGroup?: {
      heading?: string | null
      headingColor?: string | null
      headingFontSize?: string | null
      headingFontSizeMobile?: string | null
      headingFontWeight?: string | null
      headingFontWeightMobile?: string | null
    } | null

    descriptionGroup?: {
      description?: string | null
      descriptionColor?: string | null
      descriptionFontSize?: string | null
      descriptionFontSizeMobile?: string | null
      descriptionFontWeight?: string | null
      descriptionFontWeightMobile?: string | null
    } | null

    gridBottomSpacing?: string | null
  } | null

  // Feature Items (Max 3)
  items?: EventWhyConnectItem[] | null

  className?: string
}

function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

const iconComponentMap = {
  messageSquare: MessageSquare,
  network: Network,
  arrowUpRight: ArrowUpRight,
  calendar: Calendar,
  mapPin: MapPin,
  clock: Clock,
  users: Users,
  globe: Globe,
  ticket: Ticket,
}

export const EventWhyConnectBlock: React.FC<EventWhyConnectProps> = ({
  matchHeaderPillWidth = true,
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXDesktopCustom,
  paddingXMobile = '16px',
  paddingXMobileCustom,

  sectionBgColor = 'bg-[#0000FF]',
  paddingTop = 'pt-20 md:pt-28',
  paddingBottom = 'pb-24 md:pb-32',

  topGrid,
  items,
  className,
}) => {
  // ── 1. Horizontal Padding Resolution ───────────────────────────────────────
  const isMatchHeader = matchHeaderPillWidth !== false

  const desktopPad =
    paddingXDesktop === 'custom' ? paddingXDesktopCustom || '48px' : paddingXDesktop || '48px'
  const mobilePad =
    paddingXMobile === 'custom' ? paddingXMobileCustom || '16px' : paddingXMobile || '16px'

  const customHorizontalPaddingStyle: React.CSSProperties =
    !isMatchHeader && paddingMode === 'custom'
      ? ({
          '--pad-desktop': desktopPad,
          '--pad-mobile': mobilePad,
        } as React.CSSProperties)
      : {}

  const containerPaddingClass = isMatchHeader
    ? 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'
    : paddingMode === 'none'
      ? 'w-full px-0'
      : paddingMode === 'custom'
        ? 'w-full px-[var(--pad-mobile)] md:px-[var(--pad-desktop)]'
        : 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'

  // ── 2. Top Grid Resolution ─────────────────────────────────────────────────
  const kicker = topGrid?.kickerGroup
  const showKicker = kicker?.showKicker !== false && Boolean(kicker?.text)
  const squareColor = kicker?.squareColor || 'bg-white'
  const squareSize = kicker?.squareSize || 'w-2.5 h-2.5'
  const kickerTextColor = kicker?.textColor || 'text-white'
  const kickerTypography = resolveTypography(
    kicker?.fontSize,
    kicker?.fontSizeMobile,
    kicker?.fontWeight,
    kicker?.fontWeightMobile,
    'text-xs md:text-sm',
    'font-semibold',
  )
  const kickerMargin = cn(kicker?.marginBottom || 'mb-4', kicker?.marginBottomMobile)

  const headingGroup = topGrid?.headingGroup
  const headingText = headingGroup?.heading || 'Different perspectives.\nMore possibilities.'
  const headingColor = headingGroup?.headingColor || 'text-white'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-3xl sm:text-4xl lg:text-5xl',
    'font-bold',
  )

  const descGroup = topGrid?.descriptionGroup
  const descText =
    descGroup?.description ||
    'Make space in a busy congress week for a focused exchange about your priorities — and where we might go together.'
  const descColor = descGroup?.descriptionColor || 'text-white/90'
  const descTypography = resolveTypography(
    descGroup?.descriptionFontSize,
    descGroup?.descriptionFontSizeMobile,
    descGroup?.descriptionFontWeight,
    descGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg lg:text-xl',
    'font-normal',
  )

  const gridBottomSpacing = topGrid?.gridBottomSpacing || 'mb-12 md:mb-16'

  // ── 3. Feature Items Resolution ────────────────────────────────────────────
  const featureItems =
    items && items.length > 0
      ? items
      : [
          {
            iconType: 'messageSquare' as const,
            numberText: '01',
            heading: 'Exchange ideas',
            description:
              'Share the questions shaping your work and hear a fresh perspective on healthcare’s evolving needs.',
          },
          {
            iconType: 'network' as const,
            numberText: '02',
            heading: 'Find common ground',
            description:
              'Explore where people, data and technology can come together to support more connected care.',
          },
          {
            iconType: 'arrowUpRight' as const,
            numberText: '03',
            heading: 'Explore what’s next',
            description:
              'Discuss a challenge, consider a collaboration and identify a practical next step beyond the congress.',
          },
        ]

  return (
    <section
      className={cn('relative w-full overflow-hidden', sectionBgColor, paddingTop, paddingBottom, className)}
      style={customHorizontalPaddingStyle}
    >
      <div className={containerPaddingClass}>
        {/* ── Top 2-Column Header Grid ── */}
        <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start', gridBottomSpacing)}>
          {/* Left Column: Kicker + Heading */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {showKicker && (
              <div className={cn('flex items-center gap-2.5', kickerMargin)}>
                <span className={cn('shrink-0 rounded-[2px]', squareSize, squareColor)} />
                <span className={cn('uppercase tracking-wider', kickerTextColor, kickerTypography.combined)}>
                  {kicker?.text}
                </span>
              </div>
            )}

            {headingText && (
              <h2
                className={cn('tracking-tight', headingColor, headingTypography.combined)}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}
          </div>

          {/* Right Column: Description */}
          <div className="lg:col-span-5 flex flex-col justify-center lg:pt-2">
            {descText && (
              <p
                className={cn('leading-relaxed', descColor, descTypography.combined)}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
              />
            )}
          </div>
        </div>

        {/* ── Feature Items Row (Max 3 Items) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featureItems.map((item, idx) => {
            const IconComponent =
              item.iconType && item.iconType in iconComponentMap
                ? iconComponentMap[item.iconType as keyof typeof iconComponentMap]
                : MessageSquare

            const isCustomMedia = item.iconType === 'customMedia' && item.customIconMedia
            const iconSize = item.iconSize || 'w-6 h-6'
            const iconColor = item.iconColor || 'text-white'

            const numberText = item.numberText ?? `0${idx + 1}`
            const numberColor = item.numberColor || 'text-white/80'
            const numberTypography = item.numberFontSize || 'text-sm md:text-base font-medium'

            const headerMargin = item.headerMarginBottom || 'mb-4 md:mb-5'
            const hrColor = item.hrColor || 'border-white/30'
            const hrMargin = item.hrMarginBottom || 'mb-6 md:mb-8'

            const headingTextItem = item.heading || ''
            const headingColorItem = item.headingColor || 'text-white'
            const headingFontSizeItem = item.headingFontSize || 'text-xl md:text-2xl'
            const headingFontWeightItem = item.headingFontWeight || 'font-bold'
            const headingMarginItem = item.headingMarginBottom || 'mb-3 md:mb-4'

            const descTextItem = item.description || ''
            const descColorItem = item.descriptionColor || 'text-white/80'
            const descFontSizeItem = item.descriptionFontSize || 'text-sm md:text-base'
            const descFontWeightItem = item.descriptionFontWeight || 'font-normal'

            return (
              <div key={idx} className="flex flex-col">
                {/* Header Row: Icon on Left, Number on Right */}
                <div className={cn('flex items-center justify-between w-full', headerMargin)}>
                  {/* Icon */}
                  <div className="shrink-0 flex items-center justify-center">
                    {item.iconType !== 'none' && (
                      <>
                        {isCustomMedia && item.customIconMedia && typeof item.customIconMedia === 'object' ? (
                          <div className={cn('relative overflow-hidden', iconSize)}>
                            <Media
                              resource={item.customIconMedia}
                              fill
                              imgClassName="object-contain w-full h-full"
                            />
                          </div>
                        ) : (
                          <IconComponent className={cn(iconSize, iconColor)} />
                        )}
                      </>
                    )}
                  </div>

                  {/* Indicator Number */}
                  {numberText && (
                    <span className={cn('font-mono tracking-wider', numberColor, numberTypography)}>
                      {numberText}
                    </span>
                  )}
                </div>

                {/* Horizontal Divider Line */}
                <div className={cn('w-full border-t', hrColor, hrMargin)} />

                {/* Heading */}
                {headingTextItem && (
                  <h3
                    className={cn(
                      'tracking-tight leading-snug',
                      headingColorItem,
                      headingFontSizeItem,
                      headingFontWeightItem,
                      headingMarginItem,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingTextItem) }}
                  />
                )}

                {/* Description */}
                {descTextItem && (
                  <p
                    className={cn(
                      'leading-relaxed',
                      descColorItem,
                      descFontSizeItem,
                      descFontWeightItem,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(descTextItem) }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
