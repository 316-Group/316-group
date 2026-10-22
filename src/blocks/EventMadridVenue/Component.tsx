'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventMadridVenueProps {
  matchHeaderPillWidth?: boolean | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null

  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  leftColumn?: {
    kickerGroup?: {
      showKicker?: boolean | null
      boxBgColor?: string | null
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

    venueLocation?: {
      iconType?: 'mapPin' | 'upload' | null
      customIcon?: MediaType | string | null
      iconColor?: string | null
      venueName?: string | null
      venueColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    secondaryDescription?: {
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    ctaLink?: {
      showLink?: boolean | null
      text?: string | null
      showArrow?: boolean | null
      link?: any
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
    } | null
  } | null

  rightColumn?: {
    image?: MediaType | string | null
    imageFit?: 'cover' | 'contain' | null
    imageRounded?: 'rounded-none' | 'rounded-lg' | 'rounded-2xl' | null
  } | null

  // Tab 2 Individual Styling Groups
  kickerStyles?: {
    boxBgColor?: string | null
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

  venueLocationStyles?: {
    iconColor?: string | null
    venueColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  secondaryDescriptionStyles?: {
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  linkStyles?: {
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null

  imageStyles?: {
    imageFit?: 'cover' | 'contain' | null
    imageRounded?: 'rounded-none' | 'rounded-lg' | 'rounded-2xl' | null
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
  if (linkObj.type === 'custom' && linkObj.url) return linkObj.url
  if (linkObj.type === 'reference' && linkObj.reference?.value) {
    const val = linkObj.reference.value
    const slug = typeof val === 'object' ? val.slug : val
    const relationTo = linkObj.reference.relationTo
    if (relationTo === 'events') return `/events/${slug}`
    if (relationTo === 'pages') return `/${slug === 'home' ? '' : slug}`
    if (relationTo === 'posts') return `/posts/${slug}`
    return `/${slug}`
  }
  return linkObj.url || '#'
}

export const EventMadridVenueBlock: React.FC<EventMadridVenueProps> = (props) => {
  const {
    matchHeaderPillWidth = true,
    paddingMode = 'default',
    paddingXDesktop = '48px',
    paddingXDesktopCustom,
    paddingXMobile = '16px',
    paddingXMobileCustom,
    sectionBgColor = 'bg-white',
    paddingTop = 'pt-20 md:pt-28',
    paddingBottom = 'pb-20 md:pb-28',
    leftColumn,
    rightColumn,
    kickerStyles,
    headingStyles,
    descriptionStyles,
    venueLocationStyles,
    secondaryDescriptionStyles,
    linkStyles,
    imageStyles,
    className,
  } = props

  // Horizontal Padding Calculation
  let horizontalPaddingStyle: React.CSSProperties = {}
  let horizontalPaddingClass = ''

  if (matchHeaderPillWidth) {
    horizontalPaddingClass = 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'
  } else if (paddingMode === 'none') {
    horizontalPaddingClass = 'w-full px-0'
  } else if (paddingMode === 'custom') {
    const dVal =
      paddingXDesktop === 'custom' && paddingXDesktopCustom ? paddingXDesktopCustom : paddingXDesktop || '48px'
    const mVal =
      paddingXMobile === 'custom' && paddingXMobileCustom ? paddingXMobileCustom : paddingXMobile || '16px'

    horizontalPaddingStyle = {
      paddingLeft: `var(--section-pl, ${dVal})`,
      paddingRight: `var(--section-pr, ${dVal})`,
    }
  } else {
    horizontalPaddingClass = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
  }

  // Left Column Stack
  const kicker = leftColumn?.kickerGroup
  const heading = leftColumn?.headingGroup
  const primaryDesc = leftColumn?.descriptionGroup
  const venueLocation = leftColumn?.venueLocation
  const secondaryDesc = leftColumn?.secondaryDescription
  const ctaLink = leftColumn?.ctaLink

  // Right Column Image with Fallback Cascades
  const image = rightColumn?.image
  const imageFit = imageStyles?.imageFit || rightColumn?.imageFit || 'cover'
  const imageRounded = imageStyles?.imageRounded || rightColumn?.imageRounded || 'rounded-none'

  // Typography with Fallback Cascades
  const kickerTypo = resolveTypography(
    kickerStyles?.fontSize || kicker?.fontSize || 'text-xs md:text-sm',
    kickerStyles?.fontSizeMobile || kicker?.fontSizeMobile,
    kickerStyles?.fontWeight || kicker?.fontWeight || 'font-semibold',
    kickerStyles?.fontWeightMobile || kicker?.fontWeightMobile,
  )

  const headingTypo = resolveTypography(
    headingStyles?.headingFontSize || heading?.headingFontSize || 'text-3xl md:text-4xl lg:text-5xl',
    headingStyles?.headingFontSizeMobile || heading?.headingFontSizeMobile,
    headingStyles?.headingFontWeight || heading?.headingFontWeight || 'font-bold',
    headingStyles?.headingFontWeightMobile || heading?.headingFontWeightMobile,
  )

  const primaryDescTypo = resolveTypography(
    descriptionStyles?.descriptionFontSize || primaryDesc?.descriptionFontSize || 'text-base md:text-lg',
    descriptionStyles?.descriptionFontSizeMobile || primaryDesc?.descriptionFontSizeMobile,
    descriptionStyles?.descriptionFontWeight || primaryDesc?.descriptionFontWeight || 'font-normal',
    descriptionStyles?.descriptionFontWeightMobile || primaryDesc?.descriptionFontWeightMobile,
  )

  const venueTypo = resolveTypography(
    venueLocationStyles?.fontSize || venueLocation?.fontSize || 'text-lg md:text-xl',
    venueLocationStyles?.fontSizeMobile || venueLocation?.fontSizeMobile,
    venueLocationStyles?.fontWeight || venueLocation?.fontWeight || 'font-bold',
    venueLocationStyles?.fontWeightMobile || venueLocation?.fontWeightMobile,
  )

  const secondaryDescTypo = resolveTypography(
    secondaryDescriptionStyles?.fontSize || secondaryDesc?.fontSize || 'text-sm md:text-base',
    secondaryDescriptionStyles?.fontSizeMobile || secondaryDesc?.fontSizeMobile,
    secondaryDescriptionStyles?.fontWeight || secondaryDesc?.fontWeight || 'font-normal',
    secondaryDescriptionStyles?.fontWeightMobile || secondaryDesc?.fontWeightMobile,
  )

  const ctaTypo = resolveTypography(
    linkStyles?.fontSize || ctaLink?.fontSize || 'text-sm md:text-base',
    linkStyles?.fontSizeMobile || ctaLink?.fontSizeMobile,
    linkStyles?.fontWeight || ctaLink?.fontWeight || 'font-semibold',
    linkStyles?.fontWeightMobile || ctaLink?.fontWeightMobile,
  )

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor || 'bg-white', className)}
    >
      <div
        className={cn('w-full', paddingTop || 'pt-20 md:pt-28', paddingBottom || 'pb-20 md:pb-28')}
        style={horizontalPaddingStyle}
      >
        <div className={cn('w-full', horizontalPaddingClass)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* ─── LEFT COLUMN: VENUE DETAILS & ACTION ─── */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Subheading (Kicker) */}
              {kicker?.showKicker !== false && kicker?.text && (
                <div
                  className={cn(
                    'flex items-center gap-2.5',
                    kickerStyles?.marginBottom || kicker.marginBottom || 'mb-4 md:mb-6',
                    (kickerStyles?.marginBottomMobile || kicker.marginBottomMobile) &&
                      `max-md:${kickerStyles?.marginBottomMobile || kicker.marginBottomMobile}`,
                  )}
                >
                  <span
                    className={cn(
                      'inline-block flex-shrink-0',
                      kickerStyles?.squareSize || kicker.squareSize || 'w-2.5 h-2.5',
                      kickerStyles?.boxBgColor || kicker.boxBgColor || 'bg-[#0256FF]',
                    )}
                  />
                  <span
                    className={cn(
                      'uppercase tracking-wider',
                      kickerTypo.combined,
                      kickerStyles?.textColor || kicker.textColor || 'text-[#0256FF]',
                    )}
                  >
                    {kicker.text}
                  </span>
                </div>
              )}

              {/* Heading */}
              {heading?.heading && (
                <h2
                  className={cn(
                    'leading-[1.15] tracking-tight',
                    headingTypo.combined,
                    headingStyles?.headingColor || heading.headingColor || 'text-black',
                    headingStyles?.marginBottom || heading.marginBottom || 'mb-4 md:mb-6',
                    (headingStyles?.marginBottomMobile || heading.marginBottomMobile) &&
                      `max-md:${headingStyles?.marginBottomMobile || heading.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(heading.heading) }}
                />
              )}

              {/* Primary Description */}
              {primaryDesc?.description && (
                <div
                  className={cn(
                    'leading-relaxed',
                    primaryDescTypo.combined,
                    descriptionStyles?.descriptionColor || primaryDesc.descriptionColor || 'text-slate-600',
                    descriptionStyles?.marginBottom || primaryDesc.marginBottom || 'mb-6 md:mb-8',
                    (descriptionStyles?.marginBottomMobile || primaryDesc.marginBottomMobile) &&
                      `max-md:${descriptionStyles?.marginBottomMobile || primaryDesc.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(primaryDesc.description) }}
                />
              )}

              {/* Venue Location Row (Vector Icon & Name) */}
              {venueLocation?.venueName && (
                <div
                  className={cn(
                    'flex items-center gap-3',
                    venueLocationStyles?.marginBottom || venueLocation.marginBottom || 'mb-2 md:mb-3',
                    (venueLocationStyles?.marginBottomMobile || venueLocation.marginBottomMobile) &&
                      `max-md:${venueLocationStyles?.marginBottomMobile || venueLocation.marginBottomMobile}`,
                  )}
                >
                  {venueLocation.iconType === 'upload' && venueLocation.customIcon ? (
                    <div className="w-5 h-5 flex-shrink-0">
                      <Media
                        resource={venueLocation.customIcon}
                        className="w-5 h-5"
                        imgClassName="w-5 h-5 object-contain"
                      />
                    </div>
                  ) : (
                    <MapPin
                      className={cn(
                        'w-5 h-5 flex-shrink-0',
                        venueLocationStyles?.iconColor || venueLocation.iconColor || 'text-[#0256FF]',
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      venueTypo.combined,
                      venueLocationStyles?.venueColor || venueLocation.venueColor || 'text-black',
                    )}
                  >
                    {venueLocation.venueName}
                  </span>
                </div>
              )}

              {/* Secondary Description / Meeting Note */}
              {secondaryDesc?.text && (
                <div
                  className={cn(
                    'leading-relaxed',
                    secondaryDescTypo.combined,
                    secondaryDescriptionStyles?.textColor || secondaryDesc.textColor || 'text-slate-600',
                    secondaryDescriptionStyles?.marginBottom || secondaryDesc.marginBottom || 'mb-6 md:mb-8',
                    (secondaryDescriptionStyles?.marginBottomMobile || secondaryDesc.marginBottomMobile) &&
                      `max-md:${secondaryDescriptionStyles?.marginBottomMobile || secondaryDesc.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(secondaryDesc.text) }}
                />
              )}

              {/* Transparent Link CTA (No Border, No Background) */}
              {ctaLink?.showLink !== false && ctaLink?.text && (
                <div className="inline-block">
                  <Link
                    href={resolveHref(ctaLink.link)}
                    className={cn(
                      'inline-flex items-center gap-1.5 transition-all duration-200 group hover:opacity-80 active:opacity-95',
                      linkStyles?.textColor || ctaLink.textColor || 'text-[#0256FF]',
                      ctaTypo.combined,
                    )}
                  >
                    <span className="underline-offset-4 group-hover:underline">{ctaLink.text}</span>
                    {ctaLink.showArrow !== false && (
                      <ArrowUpRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </Link>
                </div>
              )}
            </div>

            {/* ─── RIGHT COLUMN: VENUE IMAGE ─── */}
            <div className="lg:col-span-6 w-full flex justify-center">
              <div className={cn('w-full relative overflow-hidden', imageRounded || 'rounded-none')}>
                {image && typeof image === 'object' ? (
                  <Media
                    resource={image}
                    className="w-full h-full"
                    imgClassName={cn(
                      'w-full h-auto max-h-[540px] border-0 shadow-none',
                      imageRounded || 'rounded-none',
                      imageFit === 'contain' ? 'object-contain' : 'object-cover',
                    )}
                  />
                ) : (
                  <div className="w-full h-[400px] lg:h-[480px] bg-slate-100 flex items-center justify-center text-slate-400">
                    <span>The Westin Palace, Madrid Facade</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
