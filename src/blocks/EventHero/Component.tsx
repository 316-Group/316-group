'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  ArrowDown,
  Calendar,
  MapPin,
  MessageSquare,
  Clock,
  Users,
  Globe,
  Ticket,
} from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventHeroFooterItem {
  iconType?:
    | 'calendar'
    | 'mapPin'
    | 'messageSquare'
    | 'clock'
    | 'users'
    | 'globe'
    | 'ticket'
    | 'customMedia'
    | 'none'
    | null
  subheading?: string | null
  heading?: string | null
  customIconMedia?: MediaType | string | null
}

export interface EventHeroProps {
  // Layout & Alignment
  matchHeaderPillWidth?: boolean | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null

  // Vertical Paddings
  paddingTop?: string | null
  bodyPaddingBottom?: string | null
  footerPaddingTop?: string | null
  footerPaddingBottom?: string | null

  // Backgrounds
  backgroundType?: 'color' | 'media' | null
  bodyBgColor?: string | null
  bodyBgMedia?: MediaType | string | null
  bodyBgOverlay?: 'vignette' | 'subtle' | 'medium' | 'heavy' | 'none' | null
  footerBgColor?: string | null

  // Left Column Content
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
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  metadataGroup?: {
    dateText?: string | null
    dividerColor?: string | null
    locationText?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  buttonsGroup?: {
    button1?: {
      text?: string | null
      bgColor?: string | null
      textColor?: string | null
      iconColor?: string | null
      borderRadius?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      link?: any
    } | null
    button2?: {
      text?: string | null
      textColor?: string | null
      iconColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      link?: any
    } | null
  } | null

  // Right Column Image
  imageColumn?: {
    image?: MediaType | string | null
    imageFit?: 'cover' | 'contain' | null
    imageRounded?: string | null
    gridBottomSpacing?: string | null
  } | null

  // Footer Metadata Bar
  footerBar?: {
    iconColor?: string | null
    iconSize?: string | null
    iconTextGap?: string | null
    subheadingHeadingGap?: string | null

    subheadingColor?: string | null
    subheadingFontSize?: string | null
    subheadingFontSizeMobile?: string | null
    subheadingFontWeight?: string | null

    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null

    items?: EventHeroFooterItem[] | null
  } | null

  // Element Styling Groups (Tab 2)
  kickerStyles?: {
    showKicker?: boolean | null
    squareColor?: string | null
    squareSize?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  headingStyles?: {
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  descriptionStyles?: {
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  metadataStyles?: {
    textColor?: string | null
    dividerColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  buttonStyles?: {
    button1BgColor?: string | null
    button1TextColor?: string | null
    button1IconColor?: string | null
    button1BorderRadius?: string | null
    button1FontSize?: string | null
    button1FontWeight?: string | null
    button2TextColor?: string | null
    button2IconColor?: string | null
    button2FontSize?: string | null
    button2FontWeight?: string | null
  } | null

  imageStyles?: {
    imageFit?: 'cover' | 'contain' | null
    imageRounded?: string | null
    gridBottomSpacing?: string | null
  } | null

  footerStyles?: {
    iconColor?: string | null
    iconSize?: string | null
    iconTextGap?: string | null
    subheadingHeadingGap?: string | null
    subheadingColor?: string | null
    subheadingFontSize?: string | null
    subheadingFontWeight?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
  } | null

  className?: string
}

/**
 * Normalizes inline styles, e.g. <span style="color:red"> or <style="color:red">
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

// Helper to resolve link destination
function resolveHref(linkObj?: any): string {
  if (!linkObj) return '#'
  if (linkObj.type === 'custom') return linkObj.url || '#'
  if (linkObj.type === 'reference' && linkObj.reference?.value) {
    const val = linkObj.reference.value
    if (typeof val === 'object' && val.slug) {
      const rel = linkObj.reference.relationTo
      if (rel === 'pages') return `/${val.slug}`
      return `/${rel}/${val.slug}`
    }
  }
  return '#'
}

const iconComponentMap = {
  calendar: Calendar,
  mapPin: MapPin,
  messageSquare: MessageSquare,
  clock: Clock,
  users: Users,
  globe: Globe,
  ticket: Ticket,
}

const overlayStyleMap = {
  vignette: 'bg-gradient-to-t from-black/85 via-black/40 to-black/30',
  subtle: 'bg-black/30',
  medium: 'bg-black/50',
  heavy: 'bg-black/75',
  none: 'bg-transparent',
}

export const EventHeroBlock: React.FC<EventHeroProps> = ({
  matchHeaderPillWidth = true,
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXDesktopCustom,
  paddingXMobile = '16px',
  paddingXMobileCustom,

  paddingTop = 'pt-16',
  bodyPaddingBottom = 'pb-16',
  footerPaddingTop = 'pt-6',
  footerPaddingBottom = 'pb-6',

  backgroundType = 'color',
  bodyBgColor = 'bg-[#0000FF]',
  bodyBgMedia,
  bodyBgOverlay = 'medium',
  footerBgColor = 'bg-[#F4F6F9]',

  kickerGroup,
  headingGroup,
  descriptionGroup,
  metadataGroup,
  buttonsGroup,
  imageColumn,
  footerBar,

  kickerStyles,
  headingStyles,
  descriptionStyles,
  metadataStyles,
  buttonStyles,
  imageStyles,
  footerStyles,

  className,
}) => {
  const uid = React.useId().replace(/:/g, '')

  // ─── Header Width Matching vs Manual Horizontal Padding ───────────────────
  const isMatchHeader = matchHeaderPillWidth !== false

  const resolvePadVal = (
    sel?: string | null,
    custom?: string | null,
    fallback = '0px',
  ) => {
    if (sel === 'custom') return custom || fallback
    return sel || fallback
  }

  const resolvedDesktopPad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? resolvePadVal(paddingXDesktop, paddingXDesktopCustom, '48px')
        : '48px'

  const resolvedMobilePad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? resolvePadVal(paddingXMobile, paddingXMobileCustom, '16px')
        : '16px'

  const padClassName = !isMatchHeader && paddingMode === 'custom' ? `eventhero-pad-${uid}` : ''

  const containerClasses = cn(
    isMatchHeader
      ? 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'
      : paddingMode === 'default'
        ? 'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl'
        : paddingMode === 'none'
          ? 'w-full px-0'
          : cn('w-full', padClassName),
  )

  // ─── Left Column Typography & Content ─────────────────────────────────────
  const showKicker = kickerStyles?.showKicker ?? kickerGroup?.showKicker !== false
  const kickerText = kickerGroup?.text || ''
  const kickerSquareColor = kickerStyles?.squareColor || kickerGroup?.squareColor || 'bg-[#00D2FF]'
  const kickerSquareSize = kickerStyles?.squareSize || kickerGroup?.squareSize || 'w-2.5 h-2.5'
  const kickerTextColor = kickerStyles?.textColor || kickerGroup?.textColor || 'text-white'
  const kickerTypography = resolveTypography(
    kickerStyles?.fontSize || kickerGroup?.fontSize,
    kickerStyles?.fontSizeMobile || kickerGroup?.fontSizeMobile,
    kickerStyles?.fontWeight || kickerGroup?.fontWeight,
    kickerStyles?.fontWeightMobile || kickerGroup?.fontWeightMobile,
    'text-xs md:text-sm',
    'font-semibold',
  )
  const kickerMb = kickerStyles?.marginBottom || kickerGroup?.marginBottom || 'mb-4'

  const headingText = headingGroup?.heading || ''
  const headingTextColor = headingStyles?.headingColor || headingGroup?.headingColor || 'text-white'
  const headingTypography = resolveTypography(
    headingStyles?.headingFontSize || headingGroup?.headingFontSize,
    headingStyles?.headingFontSizeMobile || headingGroup?.headingFontSizeMobile,
    headingStyles?.headingFontWeight || headingGroup?.headingFontWeight,
    headingStyles?.headingFontWeightMobile || headingGroup?.headingFontWeightMobile,
    'text-4xl sm:text-5xl lg:text-6xl',
    'font-bold',
  )
  const headingMb = headingStyles?.marginBottom || headingGroup?.marginBottom || 'mb-6 md:mb-8'

  const descText = descriptionGroup?.description || ''
  const descTextColor = descriptionStyles?.descriptionColor || descriptionGroup?.descriptionColor || 'text-white/90'
  const descTypography = resolveTypography(
    descriptionStyles?.descriptionFontSize || descriptionGroup?.descriptionFontSize,
    descriptionStyles?.descriptionFontSizeMobile || descriptionGroup?.descriptionFontSizeMobile,
    descriptionStyles?.descriptionFontWeight || descriptionGroup?.descriptionFontWeight,
    descriptionStyles?.descriptionFontWeightMobile || descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg lg:text-xl',
    'font-normal',
  )
  const descMb = descriptionStyles?.marginBottom || descriptionGroup?.marginBottom || 'mb-8 md:mb-10'

  // Metadata
  const dateText = metadataGroup?.dateText || ''
  const locationText = metadataGroup?.locationText || ''
  const dividerColor = metadataStyles?.dividerColor || metadataGroup?.dividerColor || 'bg-white/40'
  const metaTextColor = metadataStyles?.textColor || metadataGroup?.textColor || 'text-white'
  const metaTypography = resolveTypography(
    metadataStyles?.fontSize || metadataGroup?.fontSize,
    metadataStyles?.fontSizeMobile || metadataGroup?.fontSizeMobile,
    metadataStyles?.fontWeight || metadataGroup?.fontWeight,
    metadataStyles?.fontWeightMobile || metadataGroup?.fontWeightMobile,
    'text-sm md:text-base',
    'font-medium',
  )
  const metaMb = metadataStyles?.marginBottom || metadataGroup?.marginBottom || 'mb-8 md:mb-10'

  // Buttons
  const btn1 = buttonsGroup?.button1
  const btn1Text = btn1?.text
  const btn1Href = resolveHref(btn1?.link)
  const btn1NewTab = btn1?.link?.newTab
  const btn1Bg = buttonStyles?.button1BgColor || btn1?.bgColor || 'bg-white'
  const btn1TextColor = buttonStyles?.button1TextColor || btn1?.textColor || 'text-[#0256FF]'
  const btn1IconColor = buttonStyles?.button1IconColor || btn1?.iconColor || 'text-[#0256FF]'
  const btn1Radius = buttonStyles?.button1BorderRadius || btn1?.borderRadius || 'rounded-lg'
  const btn1Typography = resolveTypography(
    buttonStyles?.button1FontSize || btn1?.fontSize,
    btn1?.fontSizeMobile,
    buttonStyles?.button1FontWeight || btn1?.fontWeight,
    btn1?.fontWeightMobile,
    'text-sm md:text-base',
    'font-semibold',
  )

  const btn2 = buttonsGroup?.button2
  const btn2Text = btn2?.text
  const btn2Href = resolveHref(btn2?.link)
  const btn2NewTab = btn2?.link?.newTab
  const btn2TextColor = buttonStyles?.button2TextColor || btn2?.textColor || 'text-white'
  const btn2IconColor = buttonStyles?.button2IconColor || btn2?.iconColor || 'text-white'
  const btn2Typography = resolveTypography(
    buttonStyles?.button2FontSize || btn2?.fontSize,
    btn2?.fontSizeMobile,
    buttonStyles?.button2FontWeight || btn2?.fontWeight,
    btn2?.fontWeightMobile,
    'text-sm md:text-base',
    'font-medium',
  )

  const hasButtons = Boolean(btn1Text || btn2Text)

  // ─── Right Column Image ───────────────────────────────────────────────────
  const featureImage = imageColumn?.image
  const imageFit = imageStyles?.imageFit || imageColumn?.imageFit || 'cover'
  const imageRounded = imageStyles?.imageRounded || imageColumn?.imageRounded || 'rounded-none'
  const gridBottomSpacing = imageStyles?.gridBottomSpacing || imageColumn?.gridBottomSpacing || 'mb-0'

  // ─── Footer Items ─────────────────────────────────────────────────────────
  const footerItems = footerBar?.items && Array.isArray(footerBar.items) ? footerBar.items : []
  const footerIconColor = footerStyles?.iconColor || footerBar?.iconColor || 'text-[#0256FF]'
  const footerIconSize = footerStyles?.iconSize || footerBar?.iconSize || 'w-6 h-6'
  const footerIconTextGap = footerStyles?.iconTextGap || footerBar?.iconTextGap || 'gap-3 md:gap-4'
  const footerSubheadingHeadingGap = footerStyles?.subheadingHeadingGap || footerBar?.subheadingHeadingGap || 'gap-0.5'

  const footerSubheadingColor = footerStyles?.subheadingColor || footerBar?.subheadingColor || 'text-gray-500'
  const footerSubheadingTypography = resolveTypography(
    footerStyles?.subheadingFontSize || footerBar?.subheadingFontSize,
    footerBar?.subheadingFontSizeMobile,
    footerStyles?.subheadingFontWeight || footerBar?.subheadingFontWeight,
    undefined,
    'text-[11px] md:text-xs',
    'font-medium',
  )

  const footerHeadingColor = footerStyles?.headingColor || footerBar?.headingColor || 'text-gray-950'
  const footerHeadingTypography = resolveTypography(
    footerStyles?.headingFontSize || footerBar?.headingFontSize,
    footerBar?.headingFontSizeMobile,
    footerStyles?.headingFontWeight || footerBar?.headingFontWeight,
    undefined,
    'text-base md:text-lg',
    'font-semibold',
  )

  return (
    <div className={cn('w-full relative flex flex-col', className)}>
      {/* Dynamic Custom Horizontal Padding Overrides */}
      {padClassName && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad} !important;
            padding-right: ${resolvedMobilePad} !important;
          }
          @media (min-width: 1024px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad} !important;
              padding-right: ${resolvedDesktopPad} !important;
            }
          }
        `}</style>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════
          BAND 1: HERO BODY (Vibrant Royal Blue / Image Background)
          ══════════════════════════════════════════════════════════════════════════ */}
      <section
        className={cn(
          'w-full relative select-none transition-colors duration-300',
          paddingTop,
          bodyPaddingBottom,
          backgroundType === 'color' && (bodyBgColor || 'bg-[#0000FF]'),
        )}
      >
        {/* Background Image with Overlay */}
        {backgroundType === 'media' && bodyBgMedia && typeof bodyBgMedia === 'object' && (
          <>
            <Media
              resource={bodyBgMedia}
              fill
              imgClassName="object-cover w-full h-full"
              priority
            />
            <div
              className={cn(
                'absolute inset-0 pointer-events-none',
                overlayStyleMap[bodyBgOverlay || 'medium'],
              )}
            />
          </>
        )}

        {/* Content Container (Header-synchronized or padded) */}
        <div className={cn('relative z-10', containerClasses)}>
          <div
            className={cn(
              'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center',
              gridBottomSpacing,
            )}
          >
            {/* ── Left Column: Text & CTA Stack ─────────────────────────────── */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
              {/* Kicker / Subheading Tag */}
              {showKicker && (kickerText || kickerSquareColor) && (
                <div className={cn('flex items-center gap-2.5', kickerMb)}>
                  {kickerSquareColor && (
                    <div
                      className={cn(
                        kickerSquareColor.startsWith('bg-')
                          ? kickerSquareColor
                          : `bg-[${kickerSquareColor}]`,
                        kickerSquareSize,
                        'shrink-0 rounded-[2px]',
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {kickerText && (
                    <span
                      className={cn(
                        'uppercase tracking-wider transition-colors',
                        kickerTextColor,
                        kickerTypography.combined,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(kickerText) }}
                    />
                  )}
                </div>
              )}

              {/* Main Heading (Supports Inline HTML like <span style="color:#00D2FF">) */}
              {headingText && (
                <h1
                  className={cn(
                    'tracking-tight leading-[1.08] transition-colors [&_strong]:font-bold',
                    headingTextColor,
                    headingTypography.combined,
                    headingMb,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                />
              )}

              {/* Description */}
              {descText && (
                <p
                  className={cn(
                    'leading-relaxed transition-colors max-w-2xl',
                    descTextColor,
                    descTypography.combined,
                    descMb,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                />
              )}

              {/* Date & Location Metadata Row */}
              {(dateText || locationText) && (
                <div className={cn('flex flex-wrap items-center gap-4', metaMb)}>
                  {dateText && (
                    <span
                      className={cn(metaTextColor, metaTypography.combined)}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(dateText) }}
                    />
                  )}
                  {dateText && locationText && (
                    <span
                      className={cn(
                        dividerColor.startsWith('bg-')
                          ? dividerColor
                          : `bg-[${dividerColor}]`,
                        'w-[1.5px] h-4 self-center opacity-60',
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {locationText && (
                    <span
                      className={cn(metaTextColor, metaTypography.combined)}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(locationText) }}
                    />
                  )}
                </div>
              )}

              {/* Action Buttons Row (Auto-collapsing if empty) */}
              {hasButtons && (
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                  {/* Primary Button (Solid White Pill by default) */}
                  {btn1Text && (
                    <Link
                      href={btn1Href}
                      target={btn1NewTab ? '_blank' : undefined}
                      rel={btn1NewTab ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'inline-flex items-center gap-2.5 px-6 py-3.5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                        btn1Bg,
                        btn1Radius,
                      )}
                    >
                      <span className={cn('tracking-normal', btn1TextColor, btn1Typography.combined)}>
                        {btn1Text}
                      </span>
                      <ArrowUpRight
                        className={cn('w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5', btn1IconColor)}
                      />
                    </Link>
                  )}

                  {/* Secondary Button (Transparent with Down Arrow by default) */}
                  {btn2Text && (
                    <Link
                      href={btn2Href}
                      target={btn2NewTab ? '_blank' : undefined}
                      rel={btn2NewTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 px-3 py-3.5 bg-transparent border-0 shadow-none transition-all duration-300 hover:opacity-85 active:scale-95 group"
                    >
                      <span className={cn('tracking-normal', btn2TextColor, btn2Typography.combined)}>
                        {btn2Text}
                      </span>
                      <ArrowDown
                        className={cn('w-4 h-4 shrink-0 transition-transform group-hover:translate-y-0.5', btn2IconColor)}
                      />
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* ── Right Column: Featured Event Image (No Border, No Shadow) ─── */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
              {featureImage && typeof featureImage === 'object' && (
                <div className={cn('relative w-full overflow-hidden border-0 shadow-none', imageRounded)}>
                  <Media
                    resource={featureImage}
                    imgClassName={cn(
                      'w-full h-auto max-h-[560px] object-cover transition-transform duration-700 hover:scale-[1.02]',
                      imageFit === 'contain' ? 'object-contain' : 'object-cover',
                    )}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════════
          BAND 2: HERO FOOTER METADATA BAR (Light Gray / Off-White, Max 3 Items)
          ══════════════════════════════════════════════════════════════════════════ */}
      {footerItems.length > 0 && (
        <section
          className={cn(
            'w-full relative border-t border-black/5 transition-colors duration-300',
            footerBgColor || 'bg-[#F4F6F9]',
            footerPaddingTop,
            footerPaddingBottom,
          )}
        >
          <div className={containerClasses}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 items-center justify-between w-full">
              {footerItems.slice(0, 3).map((item, idx) => {
                const iconKey = item.iconType && item.iconType in iconComponentMap
                  ? (item.iconType as keyof typeof iconComponentMap)
                  : 'calendar'
                const IconComponent = iconComponentMap[iconKey] || Calendar
                const isCustomMedia = item.iconType === 'customMedia' && item.customIconMedia

                return (
                  <div
                    key={idx}
                    className={cn('flex items-center text-left', footerIconTextGap)}
                  >
                    {/* Icon Element */}
                    {item.iconType !== 'none' && (
                      <div className="shrink-0 flex items-center justify-center">
                        {isCustomMedia && item.customIconMedia && typeof item.customIconMedia === 'object' ? (
                          <div className={cn('relative overflow-hidden', footerIconSize)}>
                            <Media
                              resource={item.customIconMedia}
                              fill
                              imgClassName="object-contain w-full h-full"
                            />
                          </div>
                        ) : (
                          <IconComponent className={cn(footerIconSize, footerIconColor)} />
                        )}
                      </div>
                    )}

                    {/* Subheading & Heading Stack */}
                    <div className={cn('flex flex-col justify-center min-w-0', footerSubheadingHeadingGap)}>
                      {item.subheading && (
                        <span
                          className={cn(
                            'uppercase tracking-wider truncate',
                            footerSubheadingColor,
                            footerSubheadingTypography.combined,
                          )}
                          dangerouslySetInnerHTML={{ __html: formatInlineHtml(item.subheading) }}
                        />
                      )}
                      {item.heading && (
                        <span
                          className={cn(
                            'truncate leading-tight',
                            footerHeadingColor,
                            footerHeadingTypography.combined,
                          )}
                          dangerouslySetInnerHTML={{ __html: formatInlineHtml(item.heading) }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export const EventHeroComponent = EventHeroBlock
