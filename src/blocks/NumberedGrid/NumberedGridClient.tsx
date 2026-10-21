'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'

export interface NumberedGridItem {
  id?: string | null
  number?: string | null
  customNumberColor?: string | null
  subHeading?: string | null
  description?: string | null
}

export interface NumberedGridProps {
  // Section Spacing & Background
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

  // Global Item Styling
  styling?: {
    numberColor?: string | null
    numberFontSize?: string | null
    numberFontWeight?: string | null
    numberMarginBottom?: string | null

    subHeadingColor?: string | null
    subHeadingFontSize?: string | null
    subHeadingFontWeight?: string | null
    subHeadingMarginBottom?: string | null

    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
  } | null

  // Items
  items?: NumberedGridItem[] | null

  className?: string
}

/**
 * Normalizes user-entered inline styles, converting <style="color:red"> to <span style="color:red">
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const NumberedGridClient: React.FC<NumberedGridProps> = ({
  sectionBgColor = 'bg-white',
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
  styling,
  items,
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))

  // ─── Scroll-Triggered Entrance Animation Observer ─────────────────────────
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
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

  const padUid = `numgrid-pad-${uid}`

  // ─── Global Styling Defaults ──────────────────────────────────────────────
  const globalNumberColor = styling?.numberColor || 'text-[#0256FF]'
  const globalNumberSize = styling?.numberFontSize || 'text-5xl md:text-6xl lg:text-7xl'
  const globalNumberWeight = styling?.numberFontWeight || 'font-bold'
  const globalNumberMb = styling?.numberMarginBottom || 'mb-3 md:mb-4'

  const globalSubHeadingColor = styling?.subHeadingColor || 'text-gray-950'
  const globalSubHeadingSize = styling?.subHeadingFontSize || 'text-xl md:text-2xl'
  const globalSubHeadingWeight = styling?.subHeadingFontWeight || 'font-bold'
  const globalSubHeadingMb = styling?.subHeadingMarginBottom || 'mb-3 md:mb-4'

  const globalDescColor = styling?.descriptionColor || 'text-gray-600'
  const globalDescSize = styling?.descriptionFontSize || 'text-sm md:text-base'
  const globalDescWeight = styling?.descriptionFontWeight || 'font-normal'

  const gridItems = Array.isArray(items) ? items : []

  if (gridItems.length === 0) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full h-full flex-1 flex flex-col justify-between relative transition-colors duration-200',
        sectionBgColor === 'bg-transparent' ? 'bg-transparent' : (sectionBgColor || 'bg-white'),
        isPtClass && resolvedPt,
        isPbClass && resolvedPb,
        className,
      )}
      style={{
        ...(!isPtClass ? { paddingTop: resolvedPt } : {}),
        ...(!isPbClass ? { paddingBottom: resolvedPb } : {}),
      }}
    >
      {/* Scoped Custom Horizontal Padding Style */}
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
        {/* ─── 3-COLUMN NUMBERED GRID ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-12 lg:gap-y-16 items-start w-full">
          {gridItems.map((item, index) => {
            const numberText = item.number?.trim() || ''
            const subHeadingText = item.subHeading?.trim() || ''
            const descText = item.description?.trim() || ''

            // Skip item if all fields are empty
            if (!numberText && !subHeadingText && !descText) {
              return null
            }

            const itemNumberColor = item.customNumberColor || globalNumberColor

            return (
              <div
                key={item.id || index}
                className={cn(
                  'flex flex-col items-start w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
                )}
                style={{
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                {/* Large Display Number / Heading */}
                {numberText && (
                  <span
                    className={cn(
                      'leading-none tracking-tight block transition-colors',
                      itemNumberColor,
                      globalNumberSize,
                      globalNumberWeight,
                      globalNumberMb,
                    )}
                  >
                    {numberText}
                  </span>
                )}

                {/* Sub-Heading / Title */}
                {subHeadingText && (
                  <h3
                    className={cn(
                      'tracking-tight leading-snug transition-colors',
                      globalSubHeadingColor,
                      globalSubHeadingSize,
                      globalSubHeadingWeight,
                      globalSubHeadingMb,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(subHeadingText) }}
                  />
                )}

                {/* Description Paragraph */}
                {descText && (
                  <p
                    className={cn(
                      'leading-relaxed transition-colors',
                      globalDescColor,
                      globalDescSize,
                      globalDescWeight,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
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
