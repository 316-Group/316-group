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
      showDisclaimer?: boolean | null
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

    showNumbers?: boolean | null
    showCategory?: boolean | null
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

  buttonStyles?: {
    bgColor?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
    marginBottom?: string | null
    marginBottomMobile?: string | null
  } | null

  disclaimerStyles?: {
    textColor?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null

  agendaRowStyles?: {
    showTopDivider?: boolean | null
    topDividerColor?: string | null
    topDividerWidth?: string | null
    topDividerMarginBottom?: string | null
    topDividerMarginBottomMobile?: string | null
    showNumbers?: boolean | null
    showCategory?: boolean | null
    showArrow?: boolean | null
    showDivider?: boolean | null
    numberColor?: string | null
    numberFontSize?: string | null
    numberFontSizeMobile?: string | null
    numberFontWeight?: string | null
    numberFontWeightMobile?: string | null
    categoryColor?: string | null
    categoryFontSize?: string | null
    categoryFontSizeMobile?: string | null
    categoryFontWeight?: string | null
    categoryFontWeightMobile?: string | null
    categoryMarginBottom?: string | null
    categoryMarginBottomMobile?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    headingMarginBottom?: string | null
    headingMarginBottomMobile?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
    descriptionMarginBottom?: string | null
    descriptionMarginBottomMobile?: string | null
    arrowColor?: string | null
    dividerColor?: string | null
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
    kickerStyles,
    headingStyles,
    descriptionStyles,
    buttonStyles,
    disclaimerStyles,
    agendaRowStyles,
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

  // Left Typography Resolvers with Fallback Cascades
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

  const descTypo = resolveTypography(
    descriptionStyles?.descriptionFontSize || description?.descriptionFontSize || 'text-base md:text-lg',
    descriptionStyles?.descriptionFontSizeMobile || description?.descriptionFontSizeMobile,
    descriptionStyles?.descriptionFontWeight || description?.descriptionFontWeight || 'font-normal',
    descriptionStyles?.descriptionFontWeightMobile || description?.descriptionFontWeightMobile,
  )

  const ctaTypo = resolveTypography(
    buttonStyles?.fontSize || cta?.fontSize || 'text-sm md:text-base',
    buttonStyles?.fontSizeMobile || cta?.fontSizeMobile,
    buttonStyles?.fontWeight || cta?.fontWeight || 'font-semibold',
    buttonStyles?.fontWeightMobile || cta?.fontWeightMobile,
  )

  const disclaimerTypo = resolveTypography(
    disclaimerStyles?.fontSize || disclaimer?.fontSize || 'text-xs md:text-sm',
    disclaimerStyles?.fontSizeMobile || disclaimer?.fontSizeMobile,
    disclaimerStyles?.fontWeight || disclaimer?.fontWeight || 'font-normal',
    disclaimerStyles?.fontWeightMobile || disclaimer?.fontWeightMobile,
  )

  // Top Divider on Right Column
  const topDivider = rightColumn?.topDivider
  const showTopDivider = agendaRowStyles?.showTopDivider ?? (topDivider?.showTopDivider !== false)
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
                    headingStyles?.marginBottom || heading.marginBottom || 'mb-6 md:mb-8',
                    (headingStyles?.marginBottomMobile || heading.marginBottomMobile) &&
                      `max-md:${headingStyles?.marginBottomMobile || heading.marginBottomMobile}`,
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
                    descriptionStyles?.descriptionColor || description.descriptionColor || 'text-slate-600',
                    descriptionStyles?.marginBottom || description.marginBottom || 'mb-8 md:mb-10',
                    (descriptionStyles?.marginBottomMobile || description.marginBottomMobile) &&
                      `max-md:${descriptionStyles?.marginBottomMobile || description.marginBottomMobile}`,
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(description.description) }}
                />
              )}

              {/* Action Button (CTA) */}
              {cta?.showButton !== false && cta?.text && (
                <div
                  className={cn(
                    'inline-block',
                    buttonStyles?.marginBottom || cta.marginBottom || 'mb-3 md:mb-4',
                    (buttonStyles?.marginBottomMobile || cta.marginBottomMobile) &&
                      `max-md:${buttonStyles?.marginBottomMobile || cta.marginBottomMobile}`,
                  )}
                >
                  <Link
                    href={resolveHref(cta.link)}
                    className={cn(
                      'inline-flex items-center gap-2 px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]',
                      buttonStyles?.bgColor || cta.bgColor || 'bg-[#0256FF]',
                      buttonStyles?.textColor || cta.textColor || 'text-white',
                      ctaTypo.combined,
                    )}
                  >
                    <span>{cta.text}</span>
                    {cta.showArrow !== false && (
                      <ArrowUpRight
                        className={cn('w-4 h-4 flex-shrink-0', buttonStyles?.textColor || cta.arrowColor || 'text-white')}
                      />
                    )}
                  </Link>
                </div>
              )}

              {/* Disclaimer */}
              {disclaimer?.showDisclaimer !== false && disclaimer?.text && (
                <p
                  className={cn(
                    'block leading-relaxed',
                    disclaimerTypo.combined,
                    disclaimerStyles?.textColor || disclaimer.textColor || 'text-slate-400',
                  )}
                >
                  {disclaimer.text}
                </p>
              )}
            </div>

            {/* ─── RIGHT COLUMN: NUMBERED AGENDA ITEMS ─── */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Top Divider */}
              {showTopDivider && (
                <hr
                  className={cn(
                    'w-full border-0',
                    agendaRowStyles?.topDividerWidth || topDivider?.borderWidth || 'border-t',
                    agendaRowStyles?.topDividerColor || topDivider?.borderColor || 'border-slate-200',
                    agendaRowStyles?.topDividerMarginBottom || topDivider?.marginBottom || 'mb-6 md:mb-8',
                    (agendaRowStyles?.topDividerMarginBottomMobile || topDivider?.marginBottomMobile) &&
                      `max-md:${agendaRowStyles?.topDividerMarginBottomMobile || topDivider?.marginBottomMobile}`,
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
                    agendaRowStyles?.numberFontSize || item.numberFontSize || 'text-base md:text-lg',
                    agendaRowStyles?.numberFontSizeMobile || item.numberFontSizeMobile,
                    agendaRowStyles?.numberFontWeight || item.numberFontWeight || 'font-semibold',
                    agendaRowStyles?.numberFontWeightMobile || item.numberFontWeightMobile,
                  )

                  const categoryTypo = resolveTypography(
                    agendaRowStyles?.categoryFontSize || item.categoryFontSize || 'text-xs md:text-sm',
                    agendaRowStyles?.categoryFontSizeMobile || item.categoryFontSizeMobile,
                    agendaRowStyles?.categoryFontWeight || item.categoryFontWeight || 'font-semibold',
                    agendaRowStyles?.categoryFontWeightMobile || item.categoryFontWeightMobile,
                  )

                  const itemHeadingTypo = resolveTypography(
                    agendaRowStyles?.headingFontSize || item.headingFontSize || 'text-xl md:text-2xl',
                    agendaRowStyles?.headingFontSizeMobile || item.headingFontSizeMobile,
                    agendaRowStyles?.headingFontWeight || item.headingFontWeight || 'font-bold',
                    agendaRowStyles?.headingFontWeightMobile || item.headingFontWeightMobile,
                  )

                  const itemDescTypo = resolveTypography(
                    agendaRowStyles?.descriptionFontSize || item.descriptionFontSize || 'text-sm md:text-base',
                    agendaRowStyles?.descriptionFontSizeMobile || item.descriptionFontSizeMobile,
                    agendaRowStyles?.descriptionFontWeight || item.descriptionFontWeight || 'font-normal',
                    agendaRowStyles?.descriptionFontWeightMobile || item.descriptionFontWeightMobile,
                  )

                  const showNumbers = agendaRowStyles?.showNumbers ?? (rightColumn?.showNumbers !== false)
                  const showCategory = agendaRowStyles?.showCategory ?? (rightColumn?.showCategory !== false)
                  const showArrow = agendaRowStyles?.showArrow ?? (item.showArrow !== false)
                  const showDivider = agendaRowStyles?.showDivider ?? (item.showDivider !== false)

                  return (
                    <div key={item.id || index} className="flex flex-col group">
                      <div
                        className={cn(
                          'grid gap-4 sm:gap-6 lg:gap-8 items-start py-6 sm:py-8',
                          showNumbers && showArrow && 'grid-cols-[auto_1fr_auto]',
                          showNumbers && !showArrow && 'grid-cols-[auto_1fr]',
                          !showNumbers && showArrow && 'grid-cols-[1fr_auto]',
                          !showNumbers && !showArrow && 'grid-cols-1',
                        )}
                      >
                        {/* 1. Left Number */}
                        {showNumbers && (
                          <span
                            className={cn(
                              'select-none flex-shrink-0 tabular-nums min-w-[28px] sm:min-w-[36px]',
                              numberTypo.combined,
                              agendaRowStyles?.numberColor || item.numberColor || 'text-slate-400',
                            )}
                          >
                            {numberStr}
                          </span>
                        )}

                        {/* 2. Middle Content Stack */}
                        <div className="flex flex-col pr-2 sm:pr-4">
                          {/* Category Tag */}
                          {showCategory && item.category && (
                            <div
                              className={cn(
                                'uppercase tracking-wider',
                                categoryTypo.combined,
                                agendaRowStyles?.categoryColor || item.categoryColor || 'text-slate-500',
                                agendaRowStyles?.categoryMarginBottom || item.categoryMarginBottom || 'mb-2 md:mb-3',
                                (agendaRowStyles?.categoryMarginBottomMobile || item.categoryMarginBottomMobile) &&
                                  `max-md:${agendaRowStyles?.categoryMarginBottomMobile || item.categoryMarginBottomMobile}`,
                              )}
                            >
                              {item.category}
                            </div>
                          )}

                          {/* Item Heading */}
                          {item.heading && (
                            <h3
                              className={cn(
                                'leading-snug tracking-tight transition-colors duration-200 group-hover:text-[#0256FF]',
                                itemHeadingTypo.combined,
                                agendaRowStyles?.headingColor || item.headingColor || 'text-black',
                                agendaRowStyles?.headingMarginBottom || item.headingMarginBottom || 'mb-3 md:mb-4',
                                (agendaRowStyles?.headingMarginBottomMobile || item.headingMarginBottomMobile) &&
                                  `max-md:${agendaRowStyles?.headingMarginBottomMobile || item.headingMarginBottomMobile}`,
                              )}
                              dangerouslySetInnerHTML={{ __html: formatInlineHtml(item.heading) }}
                            />
                          )}

                          {/* Item Description */}
                          {item.description && (
                            <div
                              className={cn(
                                'leading-relaxed',
                                itemDescTypo.combined,
                                agendaRowStyles?.descriptionColor || item.descriptionColor || 'text-slate-600',
                                agendaRowStyles?.descriptionMarginBottom || item.descriptionMarginBottom || 'mb-2',
                                (agendaRowStyles?.descriptionMarginBottomMobile || item.descriptionMarginBottomMobile) &&
                                  `max-md:${agendaRowStyles?.descriptionMarginBottomMobile || item.descriptionMarginBottomMobile}`,
                              )}
                              dangerouslySetInnerHTML={{ __html: formatInlineHtml(item.description) }}
                            />
                          )}
                        </div>

                        {/* 3. Right Arrow (↗) */}
                        {showArrow && (
                          <div className="flex-shrink-0 pt-1">
                            <span
                              className={cn(
                                'inline-flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 text-slate-400 group-hover:border-[#0256FF] group-hover:text-[#0256FF] group-hover:bg-blue-50/50 transition-all duration-200',
                                agendaRowStyles?.arrowColor || item.arrowColor,
                              )}
                            >
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Item Divider */}
                      {showDivider && (
                        <hr
                          className={cn(
                            'w-full border-0 border-t',
                            agendaRowStyles?.dividerColor || item.dividerColor || 'border-slate-200',
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
