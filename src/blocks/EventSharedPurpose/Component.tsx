'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventSharedPurposeProps {
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

  // Left Column Image & Callout Badge
  imageColumn?: {
    image?: MediaType | string | null
    imageFit?: 'cover' | 'contain' | null
    imageRounded?: 'rounded-none' | 'rounded-xl' | 'rounded-2xl' | null
    showCalloutBadge?: boolean | null
    calloutText?: string | null
    calloutBgColor?: string | null
    calloutTextColor?: string | null
    showDotGrid?: boolean | null
    dotGridColor?: string | null
  } | null

  // Right Column Content Stack
  contentStack?: {
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

    buttonGroup?: {
      showButton?: boolean | null
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      link?: any
    } | null
  } | null

  className?: string
}

function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n\n/g, '</p><p class="mt-4">')
    .replace(/\n/g, '<br />')
}

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

export const EventSharedPurposeBlock: React.FC<EventSharedPurposeProps> = ({
  matchHeaderPillWidth = true,
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXDesktopCustom,
  paddingXMobile = '16px',
  paddingXMobileCustom,

  sectionBgColor = 'bg-white',
  paddingTop = 'pt-20 md:pt-28',
  paddingBottom = 'pb-20 md:pb-28',

  imageColumn,
  contentStack,
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

  // ── 2. Left Column: Image & Badge Data ─────────────────────────────────────
  const featureImage = imageColumn?.image
  const imageFit = imageColumn?.imageFit || 'cover'
  const imageRounded = imageColumn?.imageRounded || 'rounded-none'
  const showCalloutBadge = imageColumn?.showCalloutBadge !== false
  const calloutText = imageColumn?.calloutText || 'Progress starts with connection.'
  const calloutBgColor = imageColumn?.calloutBgColor || 'bg-[#00D2FF]'
  const calloutTextColor = imageColumn?.calloutTextColor || 'text-[#002B49]'
  const showDotGrid = imageColumn?.showDotGrid !== false
  const dotGridColor = imageColumn?.dotGridColor || 'bg-[#0000FF]'

  // ── 3. Right Column: Content Stack ─────────────────────────────────────────
  // Kicker
  const kicker = contentStack?.kickerGroup
  const showKicker = kicker?.showKicker !== false && Boolean(kicker?.text)
  const squareColor = kicker?.squareColor || 'bg-[#0000FF]'
  const squareSize = kicker?.squareSize || 'w-2.5 h-2.5'
  const kickerTextColor = kicker?.textColor || 'text-[#0000FF]'
  const kickerTypography = resolveTypography(
    kicker?.fontSize,
    kicker?.fontSizeMobile,
    kicker?.fontWeight,
    kicker?.fontWeightMobile,
    'text-xs md:text-sm',
    'font-semibold',
  )
  const kickerMargin = cn(kicker?.marginBottom || 'mb-4 md:mb-5', kicker?.marginBottomMobile)

  // Heading
  const headingGroup = contentStack?.headingGroup
  const headingText = headingGroup?.heading || 'Better healthcare is a team effort.'
  const headingColor = headingGroup?.headingColor || 'text-gray-950'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-3xl sm:text-4xl lg:text-5xl',
    'font-bold',
  )
  const headingMargin = cn(
    headingGroup?.marginBottom || 'mb-6 md:mb-8',
    headingGroup?.marginBottomMobile,
  )

  // Description
  const descGroup = contentStack?.descriptionGroup
  const descText =
    descGroup?.description ||
    'ESMO brings the oncology community together to exchange ideas and look ahead. It’s a chance to connect different perspectives around a common goal: better care for people.\n\nAt 316 Group, we believe meaningful progress begins with listening. We’re inviting conversations with healthcare, research and life-sciences teams about the challenges that matter to them.'
  const descColor = descGroup?.descriptionColor || 'text-gray-600'
  const descTypography = resolveTypography(
    descGroup?.descriptionFontSize,
    descGroup?.descriptionFontSizeMobile,
    descGroup?.descriptionFontWeight,
    descGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descMargin = cn(descGroup?.marginBottom || 'mb-8 md:mb-10', descGroup?.marginBottomMobile)

  // Button
  const btnGroup = contentStack?.buttonGroup
  const showButton = btnGroup?.showButton !== false && Boolean(btnGroup?.text)
  const btnText = btnGroup?.text || 'Bring your perspective to the conversation'
  const btnTextColor = btnGroup?.textColor || 'text-[#0256FF]'
  const btnTypography = resolveTypography(
    btnGroup?.fontSize,
    btnGroup?.fontSizeMobile,
    btnGroup?.fontWeight,
    btnGroup?.fontWeightMobile,
    'text-sm md:text-base',
    'font-semibold',
  )
  const btnHref = resolveHref(btnGroup?.link)

  return (
    <section
      className={cn('relative w-full overflow-hidden', sectionBgColor, paddingTop, paddingBottom, className)}
      style={customHorizontalPaddingStyle}
    >
      <div className={containerPaddingClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ── Left Column: Featured Image with Overlapping Cyan Callout ── */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full">
              {featureImage && typeof featureImage === 'object' ? (
                <div className={cn('relative w-full overflow-hidden border-0 shadow-none', imageRounded)}>
                  <Media
                    resource={featureImage}
                    imgClassName={cn(
                      'w-full h-auto max-h-[560px] object-cover transition-transform duration-700 hover:scale-[1.01]',
                      imageFit === 'contain' ? 'object-contain' : 'object-cover',
                    )}
                  />
                </div>
              ) : (
                /* Fallback clean container if no media uploaded yet */
                <div
                  className={cn(
                    'relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center text-gray-400 border-0 shadow-none',
                    imageRounded,
                  )}
                >
                  <span className="text-sm font-medium">Upload Event Image</span>
                </div>
              )}

              {/* Overlapping Callout Badge (Cyan Floating Box) */}
              {showCalloutBadge && calloutText && (
                <div
                  className={cn(
                    'relative mt-4 sm:mt-0 sm:absolute sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-6 lg:-bottom-8 lg:-right-8 z-10',
                    'flex items-center justify-between gap-6 px-6 py-5 sm:px-8 sm:py-6 shadow-xl',
                    calloutBgColor,
                    'max-w-md w-auto',
                  )}
                >
                  <p className={cn('text-base sm:text-lg md:text-xl font-bold leading-snug', calloutTextColor)}>
                    {calloutText}
                  </p>

                  {/* 3x3 Dot Grid Graphic */}
                  {showDotGrid && (
                    <div className="grid grid-cols-3 gap-1.5 shrink-0" aria-hidden="true">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <span key={i} className={cn('w-1.5 h-1.5 rounded-[1px]', dotGridColor)} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: Content Stack ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* 1. Subheading Kicker */}
            {showKicker && (
              <div className={cn('flex items-center gap-2.5', kickerMargin)}>
                <span className={cn('shrink-0 rounded-[2px]', squareSize, squareColor)} />
                <span className={cn('uppercase tracking-wider', kickerTextColor, kickerTypography.combined)}>
                  {kicker?.text}
                </span>
              </div>
            )}

            {/* 2. Main Heading */}
            {headingText && (
              <h2
                className={cn('tracking-tight', headingColor, headingTypography.combined, headingMargin)}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}

            {/* 3. Description Text */}
            {descText && (
              <div className={cn('leading-relaxed', descColor, descTypography.combined, descMargin)}>
                <p dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }} />
              </div>
            )}

            {/* 4. Action Text Link */}
            {showButton && (
              <div className="pt-2">
                <Link
                  href={btnHref}
                  className={cn(
                    'inline-flex items-center gap-2 transition-all duration-200 group hover:opacity-80',
                    btnTextColor,
                    btnTypography.combined,
                  )}
                >
                  <span>{btnText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
