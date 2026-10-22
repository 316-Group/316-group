'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface EventAgendaOverviewProps {
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

  rightColumn?: {
    topDivider?: {
      showTopDivider?: boolean | null
      borderColor?: string | null
      borderWidth?: string | null
      marginBottom?: string | null
      marginBottomMobile?: string | null
    } | null

    items?: Array<{
      id?: string | null
      numberText?: string | null
      numberColor?: string | null
      numberFontSize?: string | null
      numberFontSizeMobile?: string | null
      numberFontWeight?: string | null
      numberFontWeightMobile?: string | null
      category?: string | null
      categoryColor?: string | null
      categoryFontSize?: string | null
      categoryFontSizeMobile?: string | null
      categoryFontWeight?: string | null
      categoryFontWeightMobile?: string | null
      categoryMarginBottom?: string | null
      categoryMarginBottomMobile?: string | null
      heading?: string | null
      headingColor?: string | null
      headingFontSize?: string | null
      headingFontSizeMobile?: string | null
      headingFontWeight?: string | null
      headingFontWeightMobile?: string | null
      headingMarginBottom?: string | null
      headingMarginBottomMobile?: string | null
      description?: string | null
      descriptionColor?: string | null
      descriptionFontSize?: string | null
      descriptionFontSizeMobile?: string | null
      descriptionFontWeight?: string | null
      descriptionFontWeightMobile?: string | null
      descriptionMarginBottom?: string | null
      descriptionMarginBottomMobile?: string | null
      showArrow?: boolean | null
      arrowColor?: string | null
      showDivider?: boolean | null
      dividerColor?: string | null
      dividerWidth?: string | null
    }> | null
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

export const EventAgendaOverviewBlock: React.FC<EventAgendaOverviewProps> = (props) => {
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

  // Left Column Content
  const kicker = leftColumn?.kickerGroup
  const heading = leftColumn?.headingGroup
  const description = leftColumn?.descriptionGroup
  const cta = leftColumn?.ctaButton
  const disclaimer = leftColumn?.disclaimerGroup

  // Left Typography Resolvers
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

  // Top Divider on Right Column
  const topDivider = rightColumn?.topDivider
  const items = rightColumn?.items || []

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor || 'bg-white', className)}
    >
      <div
        className={cn('w-full', paddingTop || 'pt-20 md:pt-28', paddingBottom || 'pb-20 md:pb-28')}
        style={horizontalPaddingStyle}
      >
        <div className={cn('w-full', horizontalPaddingClass)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* ─── LEFT COLUMN: CONTEXT & STICKY ACTION ─── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              {/* Kicker / Subheading */}
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
                    heading.marginBottom || 'mb-6 md:mb-8',
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
                    description.marginBottom || 'mb-8 md:mb-10',
                    description.marginBottomMobile && `max-md:${description.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(description.description) }}
                />
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

            {/* ─── RIGHT COLUMN: NUMBERED AGENDA ITEMS ─── */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Top Divider */}
              {topDivider?.showTopDivider !== false && (
                <hr
                  className={cn(
                    'w-full border-0',
                    topDivider?.borderWidth || 'border-t',
                    topDivider?.borderColor || 'border-slate-200',
                    topDivider?.marginBottom || 'mb-6 md:mb-8',
                    topDivider?.marginBottomMobile && `max-md:${topDivider.marginBottomMobile}`,
                  )}
                />
              )}

              {/* Items List */}
              <div className="flex flex-col">
                {items.map((item, index) => {
                  const numberStr =
                    item.numberText && item.numberText.trim()
                      ? item.numberText
                      : String(index + 1).padStart(2, '0')

                  const numberTypo = resolveTypography(
                    item.numberFontSize || 'text-base md:text-lg',
                    item.numberFontSizeMobile,
                    item.numberFontWeight || 'font-semibold',
                    item.numberFontWeightMobile,
                  )

                  const categoryTypo = resolveTypography(
                    item.categoryFontSize || 'text-xs md:text-sm',
                    item.categoryFontSizeMobile,
                    item.categoryFontWeight || 'font-semibold',
                    item.categoryFontWeightMobile,
                  )

                  const itemHeadingTypo = resolveTypography(
                    item.headingFontSize || 'text-xl md:text-2xl',
                    item.headingFontSizeMobile,
                    item.headingFontWeight || 'font-bold',
                    item.headingFontWeightMobile,
                  )

                  const itemDescTypo = resolveTypography(
                    item.descriptionFontSize || 'text-sm md:text-base',
                    item.descriptionFontSizeMobile,
                    item.descriptionFontWeight || 'font-normal',
                    item.descriptionFontWeightMobile,
                  )

                  return (
                    <div key={item.id || index} className="flex flex-col group">
                      <div className="grid grid-cols-[auto_1fr_auto] gap-4 sm:gap-6 lg:gap-8 items-start py-6 sm:py-8">
                        {/* 1. Left Number */}
                        <span
                          className={cn(
                            'select-none flex-shrink-0 tabular-nums min-w-[28px] sm:min-w-[36px]',
                            numberTypo.combined,
                            item.numberColor || 'text-slate-400',
                          )}
                        >
                          {numberStr}
                        </span>

                        {/* 2. Middle Content Stack */}
                        <div className="flex flex-col pr-2 sm:pr-4">
                          {/* Category Tag */}
                          {item.category && (
                            <div
                              className={cn(
                                'uppercase tracking-wider',
                                categoryTypo.combined,
                                item.categoryColor || 'text-slate-500',
                                item.categoryMarginBottom || 'mb-2 md:mb-3',
                                item.categoryMarginBottomMobile &&
                                  `max-md:${item.categoryMarginBottomMobile}`,
                              )}
                            >
                              {item.category}
                            </div>
                          )}

                          {/* Heading */}
                          {item.heading && (
                            <h3
                              className={cn(
                                'leading-snug tracking-tight transition-colors duration-200',
                                itemHeadingTypo.combined,
                                item.headingColor || 'text-black',
                                item.headingMarginBottom || 'mb-3 md:mb-4',
                                item.headingMarginBottomMobile &&
                                  `max-md:${item.headingMarginBottomMobile}`,
                              )}
                              dangerouslySetInnerHTML={{
                                __html: formatInlineHtml(item.heading),
                              }}
                            />
                          )}

                          {/* Description */}
                          {item.description && (
                            <div
                              className={cn(
                                'leading-relaxed',
                                itemDescTypo.combined,
                                item.descriptionColor || 'text-slate-600',
                                item.descriptionMarginBottom || 'mb-2',
                                item.descriptionMarginBottomMobile &&
                                  `max-md:${item.descriptionMarginBottomMobile}`,
                              )}
                              dangerouslySetInnerHTML={{
                                __html: formatInlineHtml(item.description),
                              }}
                            />
                          )}
                        </div>

                        {/* 3. Right Top Arrow */}
                        <div className="flex-shrink-0 pt-1">
                          {item.showArrow !== false && (
                            <ArrowUpRight
                              className={cn(
                                'w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                                item.arrowColor || 'text-slate-400',
                              )}
                            />
                          )}
                        </div>
                      </div>

                      {/* Bottom Item Divider */}
                      {item.showDivider !== false && (
                        <hr
                          className={cn(
                            'w-full border-0',
                            item.dividerWidth || 'border-t',
                            item.dividerColor || 'border-slate-200',
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
