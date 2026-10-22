'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventMeetingFormatsProps {
  sectionBgColor?: string | null
  reverseColumns?: boolean | null

  leftColumn?: {
    image?: MediaType | string | null
    imageFit?: 'cover' | 'contain' | null
    minHeight?: string | null
    badge?: {
      showBadge?: boolean | null
      badgeBgColor?: string | null
      dotColor?: string | null
    } | null
  } | null

  rightColumn?: {
    paddingTop?: string | null
    paddingBottom?: string | null

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

    points?: Array<{
      id?: string | null
      label?: string | null
      boxBgColor?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    }> | null

    ctaButton?: {
      showButton?: boolean | null
      text?: string | null
      showArrow?: boolean | null
      arrowColor?: string | null
      link?: any
      bgColor?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    disclaimerGroup?: {
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
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

export const EventMeetingFormatsBlock: React.FC<EventMeetingFormatsProps> = (props) => {
  const {
    sectionBgColor = 'bg-white',
    reverseColumns = false,
    leftColumn,
    rightColumn,
    className,
  } = props

  // Image & Badge
  const image = leftColumn?.image
  const imageFit = leftColumn?.imageFit || 'cover'
  const minHeight = leftColumn?.minHeight || 'min-h-[540px] lg:min-h-[640px]'
  const badge = leftColumn?.badge

  // Right Column Stack
  const kicker = rightColumn?.kickerGroup
  const heading = rightColumn?.headingGroup
  const description = rightColumn?.descriptionGroup
  const points = rightColumn?.points || []
  const cta = rightColumn?.ctaButton
  const disclaimer = rightColumn?.disclaimerGroup

  // Typography
  const kickerTypo = resolveTypography(
    kicker?.fontSize || 'text-xs md:text-sm',
    kicker?.fontSizeMobile,
    kicker?.fontWeight || 'font-semibold',
    kicker?.fontWeightMobile,
  )

  const headingTypo = resolveTypography(
    heading?.headingFontSize || 'text-3xl md:text-4xl lg:text-5xl',
    heading?.headingFontSizeMobile,
    heading?.headingFontWeight || 'font-bold',
    heading?.headingFontWeightMobile,
  )

  const descTypo = resolveTypography(
    description?.descriptionFontSize || 'text-base md:text-lg',
    description?.descriptionFontSizeMobile,
    description?.descriptionFontWeight || 'font-normal',
    description?.descriptionFontWeightMobile,
  )

  const ctaTypo = resolveTypography(
    cta?.fontSize || 'text-sm md:text-base',
    cta?.fontSizeMobile,
    cta?.fontWeight || 'font-semibold',
    cta?.fontWeightMobile,
  )

  const disclaimerTypo = resolveTypography(
    disclaimer?.fontSize || 'text-xs md:text-sm',
    disclaimer?.fontSizeMobile,
    disclaimer?.fontWeight || 'font-normal',
    disclaimer?.fontWeightMobile,
  )

  return (
    <section
      className={cn('w-full relative overflow-hidden transition-colors duration-300', sectionBgColor || 'bg-white', className)}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* ─── LEFT COLUMN: FULL-BLEED IMAGE WITH CYAN ACCENT BADGE ─── */}
          <div
            className={cn(
              'lg:col-span-6 relative w-full overflow-hidden flex flex-col justify-stretch',
              reverseColumns ? 'lg:order-2' : 'lg:order-1',
              minHeight,
            )}
          >
            {image && typeof image === 'object' ? (
              <Media
                resource={image}
                className="w-full h-full"
                imgClassName={cn('w-full h-full object-cover', imageFit === 'contain' ? 'object-contain' : 'object-cover')}
                priority
              />
            ) : (
              <div className="w-full h-full min-h-[400px] lg:min-h-full bg-slate-200 flex items-center justify-center text-slate-400">
                <span>Meeting Photo</span>
              </div>
            )}

            {/* Cyan Accent Badge (3x3 Dots) */}
            {badge?.showBadge !== false && (
              <div
                className={cn(
                  'absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-10 p-4 sm:p-5 flex items-center justify-center shadow-lg',
                  badge?.badgeBgColor || 'bg-[#00D2FF]',
                )}
              >
                {/* 3x3 Dot Grid */}
                <div className="grid grid-cols-3 gap-1.5 w-7 h-7 sm:w-8 sm:h-8">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        badge?.dotColor || 'bg-[#0256FF]',
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: PADDED CONTENT STACK ─── */}
          <div
            className={cn(
              'lg:col-span-6 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24',
              reverseColumns ? 'lg:order-1' : 'lg:order-2',
              rightColumn?.paddingTop || 'pt-16 md:pt-24',
              rightColumn?.paddingBottom || 'pb-16 md:pb-24',
            )}
          >
            <div className="max-w-xl flex flex-col">
              {/* Subheading (Kicker) */}
              {kicker?.showKicker !== false && kicker?.text && (
                <div
                  className={cn(
                    'flex items-center gap-2.5',
                    kicker.marginBottom || 'mb-4 md:mb-6',
                    kicker.marginBottomMobile && `max-md:${kicker.marginBottomMobile}`,
                  )}
                >
                  <span
                    className={cn(
                      'inline-block flex-shrink-0',
                      kicker.squareSize || 'w-2.5 h-2.5',
                      kicker.boxBgColor || 'bg-[#0256FF]',
                    )}
                  />
                  <span
                    className={cn(
                      'uppercase tracking-wider',
                      kickerTypo.combined,
                      kicker.textColor || 'text-[#0256FF]',
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
                    heading.headingColor || 'text-black',
                    heading.marginBottom || 'mb-4 md:mb-6',
                    heading.marginBottomMobile && `max-md:${heading.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(heading.heading) }}
                />
              )}

              {/* Description */}
              {description?.description && (
                <div
                  className={cn(
                    'leading-relaxed',
                    descTypo.combined,
                    description.descriptionColor || 'text-slate-600',
                    description.marginBottom || 'mb-6 md:mb-8',
                    description.marginBottomMobile && `max-md:${description.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(description.description) }}
                />
              )}

              {/* Format Bullet Points */}
              {points.length > 0 && (
                <div className="flex flex-col gap-3 mb-8 md:mb-10">
                  {points.map((point, index) => {
                    const pointTypo = resolveTypography(
                      point.fontSize || 'text-sm md:text-base',
                      point.fontSizeMobile,
                      point.fontWeight || 'font-medium',
                      point.fontWeightMobile,
                    )

                    return (
                      <div
                        key={point.id || index}
                        className={cn(
                          'flex items-center gap-3',
                          point.marginBottom || 'mb-1',
                          point.marginBottomMobile && `max-md:${point.marginBottomMobile}`,
                        )}
                      >
                        <span
                          className={cn(
                            'w-2 h-2 sm:w-2.5 sm:h-2.5 flex-shrink-0',
                            point.boxBgColor || 'bg-[#0256FF]',
                          )}
                        />
                        <span
                          className={cn(
                            pointTypo.combined,
                            point.textColor || 'text-slate-900',
                          )}
                        >
                          {point.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Action Button (CTA) */}
              {cta?.showButton !== false && cta?.text && (
                <div
                  className={cn(
                    'inline-block',
                    cta.marginBottom || 'mb-3 md:mb-4',
                    cta.marginBottomMobile && `max-md:${cta.marginBottomMobile}`,
                  )}
                >
                  <Link
                    href={resolveHref(cta.link)}
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]',
                      cta.bgColor || 'bg-[#0256FF]',
                      cta.textColor || 'text-white',
                      ctaTypo.combined,
                    )}
                  >
                    <span>{cta.text}</span>
                    {cta.showArrow !== false && (
                      <ArrowUpRight
                        className={cn('w-4 h-4 flex-shrink-0', cta.arrowColor || 'text-white')}
                      />
                    )}
                  </Link>
                </div>
              )}

              {/* Disclaimer */}
              {disclaimer?.text && (
                <p
                  className={cn(
                    'block leading-relaxed',
                    disclaimerTypo.combined,
                    disclaimer.textColor || 'text-slate-400',
                  )}
                >
                  {disclaimer.text}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
