'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface TimelineAccordionItem {
  id?: string | null
  yearOrText?: string | null
  yearTextColor?: string | null
  yearFontSize?: string | null
  yearFontWeight?: string | null
  yearFontSizeMobile?: string | null
  yearFontWeightMobile?: string | null

  title?: string | null
  titleTextColor?: string | null
  titleFontSize?: string | null
  titleFontWeight?: string | null
  titleFontSizeMobile?: string | null
  titleFontWeightMobile?: string | null

  description?: any | null
  descriptionTextColor?: string | null
  descriptionFontSize?: string | null
  descriptionFontWeight?: string | null
  descriptionFontSizeMobile?: string | null
  descriptionFontWeightMobile?: string | null

  endYearOrText?: string | null
  endYearTextColor?: string | null
  endYearFontSize?: string | null
  endYearFontWeight?: string | null
  endYearFontSizeMobile?: string | null
  endYearFontWeightMobile?: string | null
  connectorLineColor?: string | null

  hrLineColor?: string | null
  hrActiveColor?: string | null
  hrBorderWidth?: string | null
}

export interface TimelineAccordionProps {
  // Spacing & Background
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingTopCustom?: string | null
  paddingBottom?: string | null
  paddingBottomCustom?: string | null

  // Horizontal Padding
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingSide?: 'both' | 'left' | 'right' | 'split' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null
  paddingLeftDesktop?: string | null
  paddingLeftDesktopCustom?: string | null
  paddingLeftMobile?: string | null
  paddingLeftMobileCustom?: string | null
  paddingRightDesktop?: string | null
  paddingRightDesktopCustom?: string | null
  paddingRightMobile?: string | null
  paddingRightMobileCustom?: string | null

  // Left Column
  leftColumn?: {
    badgeGroup?: {
      showBadge?: boolean | null
      badgeText?: string | null
      badgeBgColor?: string | null
      badgeTextColor?: string | null
      badgeFontSize?: string | null
      badgeFontWeight?: string | null
      badgeFontSizeMobile?: string | null
      badgeFontWeightMobile?: string | null
      badgeMarginBottom?: string | null
    } | null

    headingGroup?: {
      heading?: any | null
      headingColor?: string | null
      headingMarginBottom?: string | null
      headingFontSize?: string | null
      headingFontWeight?: string | null
      headingFontSizeMobile?: string | null
      headingFontWeightMobile?: string | null
    } | null

    descriptionGroup?: {
      description?: any | null
      descriptionColor?: string | null
      descriptionMarginBottom?: string | null
      descriptionFontSize?: string | null
      descriptionFontWeight?: string | null
      descriptionFontSizeMobile?: string | null
      descriptionFontWeightMobile?: string | null
    } | null
  } | null

  // Timeline Settings
  timelineSettings?: {
    timelineLineColor?: string | null
    timelineDotColor?: string | null
  } | null

  // Accordion Items
  items?: TimelineAccordionItem[] | null

  className?: string
}

const renderContent = (content: any, className: string) => {
  if (!content) return null
  if (typeof content === 'string') {
    const trimmed = content.trim()
    if (!trimmed) return null
    return <div className={className} dangerouslySetInnerHTML={{ __html: trimmed }} />
  }
  if (typeof content === 'object' && content?.root) {
    return (
      <RichText
        content={content}
        enableGutter={false}
        enableProse={false}
        className={className}
      />
    )
  }
  return null
}

export const TimelineAccordionClient: React.FC<TimelineAccordionProps> = ({
  sectionBgColor = 'bg-[#F7F8F4]',
  paddingTop = 'pt-20',
  paddingTopCustom,
  paddingBottom = 'pb-20',
  paddingBottomCustom,
  paddingMode = 'default',
  paddingSide = 'both',
  paddingXDesktop = '48px',
  paddingXDesktopCustom,
  paddingXMobile = '16px',
  paddingXMobileCustom,
  leftColumn,
  timelineSettings,
  items,
  className,
}) => {
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))
  const [activeIndex, setActiveIndex] = useState<number | null>(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // ─── Scroll-triggered Entrance Animation ──────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ─── Resolve Custom Spacing ───────────────────────────────────────────────
  const resolvedPt =
    paddingTop === 'custom' && paddingTopCustom ? paddingTopCustom : (paddingTop ?? 'pt-0')
  const isPtClass = resolvedPt.startsWith('pt-')

  const resolvedPb =
    paddingBottom === 'custom' && paddingBottomCustom
      ? paddingBottomCustom
      : (paddingBottom ?? 'pb-0')
  const isPbClass = resolvedPb.startsWith('pb-')

  // ─── Horizontal Padding Resolution ─────────────────────────────────────────
  const resolvedDesktopPad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? paddingXDesktop === 'custom'
          ? paddingXDesktopCustom || '48px'
          : paddingXDesktop || '48px'
        : undefined

  const resolvedMobilePad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? paddingXMobile === 'custom'
          ? paddingXMobileCustom || '16px'
          : paddingXMobile || '16px'
        : undefined

  const padUid = `timeline-pad-${uid}`

  // ─── Left Column Data ──────────────────────────────────────────────────────
  const badge = leftColumn?.badgeGroup
  const showBadge = Boolean(badge?.showBadge !== false && badge?.badgeText?.trim())
  const badgeText = badge?.badgeText?.trim() || ''
  const badgeBg = badge?.badgeBgColor || 'bg-[#EFF1F8]'
  const badgeTextColor = badge?.badgeTextColor || 'text-[#0256FF]'
  const badgeTypography = resolveTypography(
    badge?.badgeFontSize,
    badge?.badgeFontSizeMobile,
    badge?.badgeFontWeight,
    badge?.badgeFontWeightMobile,
    'text-xs md:text-sm',
    'font-semibold',
  )
  const badgeMb = badge?.badgeMarginBottom || 'mb-8 md:mb-12'

  const heading = leftColumn?.headingGroup?.heading
  const headingColor = leftColumn?.headingGroup?.headingColor || 'text-slate-900'
  const headingTypography = resolveTypography(
    leftColumn?.headingGroup?.headingFontSize,
    leftColumn?.headingGroup?.headingFontSizeMobile,
    leftColumn?.headingGroup?.headingFontWeight,
    leftColumn?.headingGroup?.headingFontWeightMobile,
    'text-3xl md:text-4xl lg:text-5xl',
    'font-bold',
  )
  const headingMb = leftColumn?.headingGroup?.headingMarginBottom || 'mb-6 md:mb-8'

  const description = leftColumn?.descriptionGroup?.description
  const descriptionColor = leftColumn?.descriptionGroup?.descriptionColor || 'text-slate-600'
  const descriptionTypography = resolveTypography(
    leftColumn?.descriptionGroup?.descriptionFontSize,
    leftColumn?.descriptionGroup?.descriptionFontSizeMobile,
    leftColumn?.descriptionGroup?.descriptionFontWeight,
    leftColumn?.descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descriptionMb = leftColumn?.descriptionGroup?.descriptionMarginBottom || 'mb-0'

  // ─── Timeline Settings ────────────────────────────────────────────────────
  const timelineLineColor = timelineSettings?.timelineLineColor || 'bg-[#0256FF]'
  const timelineDotColor = timelineSettings?.timelineDotColor || 'bg-[#0256FF]'

  const accordionItems = items && Array.isArray(items) ? items : []

  const toggleItem = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx))
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-300',
        sectionBgColor,
        isPtClass && resolvedPt,
        isPbClass && resolvedPb,
        className,
      )}
      style={{
        ...(!isPtClass ? { paddingTop: resolvedPt } : {}),
        ...(!isPbClass ? { paddingBottom: resolvedPb } : {}),
      }}
    >
      {/* Dynamic Scoped Inline Styles for Custom Padding */}
      {paddingMode === 'custom' && (
        <style>{`
          @media (max-width: 767px) {
            .${padUid} {
              ${
                paddingSide === 'left'
                  ? `padding-left: ${resolvedMobilePad} !important;`
                  : paddingSide === 'right'
                    ? `padding-right: ${resolvedMobilePad} !important;`
                    : `padding-left: ${resolvedMobilePad} !important; padding-right: ${resolvedMobilePad} !important;`
              }
            }
          }
          @media (min-width: 768px) {
            .${padUid} {
              ${
                paddingSide === 'left'
                  ? `padding-left: ${resolvedDesktopPad} !important;`
                  : paddingSide === 'right'
                    ? `padding-right: ${resolvedDesktopPad} !important;`
                    : `padding-left: ${resolvedDesktopPad} !important; padding-right: ${resolvedDesktopPad} !important;`
              }
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          'w-full flex-1 flex flex-col justify-between',
          (!paddingMode || paddingMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl',
          paddingMode === 'none' && 'w-full max-w-none px-0',
          paddingMode === 'custom' && cn('w-full max-w-none', padUid),
        )}
      >
        {/* ─── 2-COLUMN MAIN CONTENT GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
          {/* ── Left Column: Editorial & Context (5 cols) ── */}
          <div
            className={cn(
              'lg:col-span-5 flex flex-col items-start w-full transition-all duration-1000 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            {/* Pill Badge */}
            {showBadge && (
              <div className={cn('inline-flex', badgeMb)}>
                <span
                  className={cn(
                    'inline-flex items-center px-5 py-2 rounded-full backdrop-blur-sm transition-all',
                    badgeBg,
                    badgeTextColor,
                    badgeTypography.combined,
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Main Heading */}
            {heading && (
              <div
                className={cn(
                  'w-full tracking-tight leading-[1.12] transition-colors',
                  headingTypography.combined,
                  headingColor,
                  headingMb,
                )}
              >
                {renderContent(heading, headingTypography.combined)}
              </div>
            )}

            {/* Description Body */}
            {description && (
              <div
                className={cn(
                  'w-full leading-relaxed transition-colors',
                  descriptionTypography.combined,
                  descriptionColor,
                  descriptionMb,
                )}
              >
                {renderContent(description, descriptionTypography.combined)}
              </div>
            )}
          </div>

          {/* ── Right Column: Timeline Accordion (7 cols) ── */}
          <div
            className={cn(
              'lg:col-span-7 relative w-full transition-all duration-1000 ease-out delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
            )}
          >
            {accordionItems.length > 0 && (
              <div className="relative pl-8 sm:pl-10">
                {/* Accordion Items List */}
                <div className="flex flex-col space-y-6">
                  {accordionItems.map((item, index) => {
                    const isActive = activeIndex === index
                    const isLast = index === accordionItems.length - 1
                    const showTitle = isActive || isLast

                    const yearText = item.yearOrText?.trim() || ''
                    const yearColor = item.yearTextColor || 'text-[#0256FF]'
                    const yearTypo = resolveTypography(
                      item.yearFontSize,
                      item.yearFontSizeMobile,
                      item.yearFontWeight,
                      item.yearFontWeightMobile,
                      'text-xl md:text-2xl',
                      'font-bold',
                    )

                    const titleText = item.title?.trim() || ''
                    const titleColor = item.titleTextColor || 'text-slate-900'
                    const titleTypo = resolveTypography(
                      item.titleFontSize,
                      item.titleFontSizeMobile,
                      item.titleFontWeight,
                      item.titleFontWeightMobile,
                      'text-xl md:text-2xl',
                      'font-bold',
                    )

                    const descColor = item.descriptionTextColor || 'text-slate-600'
                    const descTypo = resolveTypography(
                      item.descriptionFontSize,
                      item.descriptionFontSizeMobile,
                      item.descriptionFontWeight,
                      item.descriptionFontWeightMobile,
                      'text-sm md:text-base',
                      'font-normal',
                    )

                    const endYear = item.endYearOrText?.trim() || ''
                    const endYearColor = item.endYearTextColor || 'text-[#0256FF]'
                    const endYearTypo = resolveTypography(
                      item.endYearFontSize,
                      item.endYearFontSizeMobile,
                      item.endYearFontWeight,
                      item.endYearFontWeightMobile,
                      'text-xl md:text-2xl',
                      'font-bold',
                    )
                    const connectorLineColor = item.connectorLineColor || 'bg-[#0256FF]'

                    const hrColor = isActive
                      ? item.hrActiveColor || 'border-[#0256FF]'
                      : item.hrLineColor || 'border-slate-200'
                    const hrWidth = item.hrBorderWidth || 'border-t'

                    return (
                      <div
                        key={item.id || index}
                        className={cn(
                          'relative w-full group transition-all duration-700 ease-out',
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                        )}
                        style={{ transitionDelay: `${index * 120 + 300}ms` }}
                      >
                        {/* Connecting Line to Next Item (starts at circle center, ends at next circle center) */}
                        {!isLast && (
                          <div
                            className="absolute left-0 -ml-8 sm:-ml-10 w-8 sm:w-10 flex justify-center top-[22px] md:top-[24px] bottom-[-46px] md:bottom-[-48px] pointer-events-none z-0"
                            aria-hidden="true"
                          >
                            <div className={cn('w-[2px] h-full transition-colors', timelineLineColor)} />
                          </div>
                        )}

                        {/* Timeline Bullet Node - centered to line on all screens, uniform & static as in mockup */}
                        <div
                          className="absolute left-0 -ml-8 sm:-ml-10 w-8 sm:w-10 flex items-center justify-center top-0 h-[44px] md:h-[48px] pointer-events-none z-10"
                          aria-hidden="true"
                        >
                          <div
                            className={cn(
                              'w-4 h-4 rounded-full transition-colors',
                              timelineDotColor,
                            )}
                          />
                        </div>

                        {/* Interactive Accordion Header */}
                        <button
                          type="button"
                          onClick={() => toggleItem(index)}
                          className="w-full flex items-center justify-between text-left py-2 h-11 md:h-12 group focus:outline-none"
                          aria-expanded={isActive}
                        >
                          <div className="flex items-center space-x-4 sm:space-x-8 flex-1 pr-4 min-w-0">
                            {/* Year / Start Text */}
                            {yearText && (
                              <span
                                className={cn(
                                  'whitespace-nowrap transition-colors select-none flex-shrink-0',
                                  yearTypo.combined,
                                  yearColor,
                                )}
                              >
                                {yearText}
                              </span>
                            )}

                            {/* Title (Shows when Active, OR if this is the Last Item!) */}
                            {titleText && (
                              <span
                                className={cn(
                                  'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] whitespace-nowrap overflow-hidden',
                                  isActive || isLast
                                    ? 'opacity-100 translate-x-0 max-w-[40rem] delay-150'
                                    : 'opacity-0 -translate-x-3 max-w-0 delay-0 pointer-events-none',
                                  titleTypo.combined,
                                  titleColor,
                                )}
                              >
                                {titleText}
                              </span>
                            )}
                          </div>

                          {/* Plus / Minus Indicator Button */}
                          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full">
                            <div
                              className={cn(
                                'transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                                isActive ? 'rotate-180' : 'rotate-0',
                              )}
                            >
                              {isActive ? (
                                <Minus className="w-6 h-6 text-[#0256FF] transition-colors duration-300" />
                              ) : (
                                <Plus className="w-6 h-6 text-[#0256FF] transition-colors duration-300 group-hover:scale-110" />
                              )}
                            </div>
                          </div>
                        </button>

                        {/* Expandable Active Body (Slide-Up with good delay on open, Slide-Down with smooth transition on close) */}
                        <div
                          className={cn(
                            'grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                            isActive
                              ? 'grid-rows-[1fr] opacity-100 delay-150'
                              : 'grid-rows-[0fr] opacity-0 delay-0 pointer-events-none',
                          )}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={cn(
                                'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] pt-3 pb-6',
                                isActive
                                  ? 'translate-y-0 opacity-100 delay-300'
                                  : 'translate-y-6 opacity-0 delay-0',
                              )}
                            >
                              {/* Mode A: When endYearOrText is present (linked with vertical line as in end-year.png) */}
                              {endYear ? (
                                <div className="flex items-start space-x-6 sm:space-x-8 pt-1">
                                  {/* Left Sub-column: Connector Line & End Year */}
                                  <div className="flex flex-col items-center flex-shrink-0 min-w-[3rem] sm:min-w-[4rem]">
                                    {/* Vertical Connector Line */}
                                    <div
                                      className={cn(
                                        'w-[2px] h-8 sm:h-10 my-1 rounded-full transition-colors',
                                        connectorLineColor,
                                      )}
                                      aria-hidden="true"
                                    />
                                    {/* End Year Text */}
                                    <span
                                      className={cn(
                                        'whitespace-nowrap transition-colors select-none',
                                        endYearTypo.combined,
                                        endYearColor,
                                      )}
                                    >
                                      {endYear}
                                    </span>
                                  </div>

                                  {/* Right Sub-column: Description placed beside the end year */}
                                  {item.description && (
                                    <div
                                      className={cn(
                                        'flex-1 leading-relaxed transition-colors pt-2',
                                        descTypo.combined,
                                        descColor,
                                      )}
                                    >
                                      {renderContent(item.description, descTypo.combined)}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                /* Mode B: Standard Description (no endYear) */
                                item.description && (
                                  <div className="pl-0 sm:pl-16 md:pl-20 pt-1">
                                    <div
                                      className={cn(
                                        'leading-relaxed transition-colors',
                                        descTypo.combined,
                                        descColor,
                                      )}
                                    >
                                      {renderContent(item.description, descTypo.combined)}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Divider Line Below Item */}
                        <div
                          className={cn(
                            'w-full mt-4 transition-colors duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                            hrColor,
                            hrWidth,
                          )}
                          aria-hidden="true"
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default TimelineAccordionClient
