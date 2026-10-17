'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export interface CardItem {
  id?: string | null
  image?: MediaType | string | null
  altText?: string | null
  cardBgColor?: string | null
}

export interface AnimatedIconsGridProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  headingGroup?: {
    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingAlignment?: 'left' | 'center' | 'right' | null
  } | null

  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
    descriptionAlignment?: 'left' | 'center' | 'right' | null
  } | null

  buttonGroup?: {
    enableButton?: boolean | null
    buttonText?: string | null
    buttonLink?: {
      type?: 'custom' | 'reference' | null
      url?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo?: string | null
        value?: any
      } | null
    } | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    iconCircleBg?: string | null
    iconColor?: string | null
    buttonAlignment?: 'left' | 'center' | 'right' | null
    buttonFontSize?: string | null
    buttonFontWeight?: string | null
  } | null

  cards?: CardItem[] | null
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

// Resolve link helper
function resolveHref(linkObj?: AnimatedIconsGridProps['buttonGroup'] extends { buttonLink?: infer L } ? L : any): string {
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

const TOTAL_DESKTOP_SLOTS = 21

export const AnimatedIconsGridClient: React.FC<AnimatedIconsGridProps> = ({
  sectionBgColor = 'bg-[#F4F6FB]',
  paddingTop = 'pt-20',
  paddingBottom = 'pb-20',
  headingGroup,
  descriptionGroup,
  buttonGroup,
  cards,
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)

  // Map individual fade-out state for all 21 slots
  const [fadedOutSlots, setFadedOutSlots] = useState<boolean[]>(() =>
    Array(TOTAL_DESKTOP_SLOTS).fill(false),
  )

  // Viewport intersection observer for scroll-in & scroll-out detection
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Randomized Asynchronous Fade-In / Fade-Out Engine
  useEffect(() => {
    if (!isInView) return

    const timers: NodeJS.Timeout[] = []

    // Launch an independent animation loop for each card slot
    for (let i = 0; i < TOTAL_DESKTOP_SLOTS; i++) {
      const runCycle = () => {
        // Random timeout between 2500ms and 6500ms
        const nextDelay = 2500 + Math.random() * 4000

        const timer = setTimeout(() => {
          setFadedOutSlots((prev) => {
            const next = [...prev]
            // Toggle slot fade state
            next[i] = !next[i]
            return next
          })
          runCycle()
        }, nextDelay)

        timers.push(timer)
      }

      // Initial stagger so cards don't all start at the same time
      const initialStagger = Math.random() * 3000
      const initialTimer = setTimeout(() => {
        runCycle()
      }, initialStagger)

      timers.push(initialTimer)
    }

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [isInView])

  // Normalized cards array
  const rawCards = useMemo(() => (Array.isArray(cards) ? cards : []), [cards])

  // Slots distribution:
  // Left Wing (8 cards: rows 0..3, cols 0..1): indices 0..7
  // Top Center (5 cards: row 0, cols 2..6): indices 8..12
  // Right Wing (8 cards: rows 0..3, cols 7..8): indices 13..20
  const leftWingCards = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => rawCards[i] || null)
  }, [rawCards])

  const topCenterCards = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => rawCards[8 + i] || null)
  }, [rawCards])

  const rightWingCards = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => rawCards[13 + i] || null)
  }, [rawCards])

  // Alignment helpers
  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  const btnAlignClasses = {
    left: 'justify-start',
    center: 'justify-center mx-auto',
    right: 'justify-end ml-auto',
  }

  // Heading config
  const headingText = headingGroup?.heading ?? 'Access <style="color:#0256FF">50+ Connectors</style>'
  const headingColor = headingGroup?.headingColor || 'text-gray-950'
  const headingSize = headingGroup?.headingFontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const headingWeight = headingGroup?.headingFontWeight || 'font-bold'
  const headingAlign = headingGroup?.headingAlignment || 'center'

  // Description config
  const descText =
    descriptionGroup?.description ??
    "Fintech Connect ships with pre-built connectors to the world's leading banking, payments, compliance, and crypto infrastructure providers."
  const descColor = descriptionGroup?.descriptionColor || 'text-gray-700'
  const descSize = descriptionGroup?.descriptionFontSize || 'text-base md:text-lg'
  const descWeight = descriptionGroup?.descriptionFontWeight || 'font-normal'
  const descAlign = descriptionGroup?.descriptionAlignment || 'center'

  // Button config
  const showBtn = buttonGroup?.enableButton !== false
  const btnText = buttonGroup?.buttonText || 'Explore FintecConnect'
  const btnHref = resolveHref(buttonGroup?.buttonLink)
  const isNewTab = Boolean(buttonGroup?.buttonLink?.newTab)
  const btnBg = buttonGroup?.buttonBgColor || 'bg-[#1D4ED8]'
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-white'
  const btnSize = buttonGroup?.buttonFontSize || 'text-sm md:text-base'
  const btnWeight = buttonGroup?.buttonFontWeight || 'font-semibold'
  const btnAlign = buttonGroup?.buttonAlignment || 'center'
  const iconCircleBg = buttonGroup?.iconCircleBg || 'bg-white'
  const iconCol = buttonGroup?.iconColor || 'text-[#1D4ED8]'

  // Helper to render an individual animated card
  const renderCard = (card: CardItem | null, slotIndex: number, extraClasses?: string) => {
    const isFaded = fadedOutSlots[slotIndex] ?? false
    const customBg = card?.cardBgColor || 'bg-white/85 dark:bg-slate-900/60'

    return (
      <div
        key={slotIndex}
        className={cn(
          'relative rounded-2xl md:rounded-[1.25rem] flex items-center justify-center p-2.5 sm:p-3 aspect-square',
          'border border-white/70 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm',
          'transition-all duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
          customBg,
          isFaded ? 'opacity-25' : 'opacity-100',
          extraClasses,
        )}
      >
        {card?.image && typeof card.image === 'object' && (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center transition-all duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
              isFaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
            )}
          >
            <Media
              resource={card.image}
              imgClassName="max-w-full max-h-full object-contain rounded-full"
              priority={false}
              loading="lazy"
            />
          </div>
        )}
        {card?.image && typeof card.image === 'string' && (
          <img
            src={card.image}
            alt={card.altText || 'Connector Logo'}
            className={cn(
              'max-w-full max-h-full object-contain rounded-full transition-all duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
              isFaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
            )}
            loading="lazy"
          />
        )}
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full relative overflow-hidden select-none',
        sectionBgColor || 'bg-[#F4F6FB]',
        paddingTop || 'pt-20',
        paddingBottom || 'pb-20',
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1720px] relative">
        {/* ─── DESKTOP VIEW (9 Columns × 4 Rows) ─────────────────────────────── */}
        <div className="hidden lg:grid grid-cols-9 gap-4 xl:gap-5 items-stretch relative min-h-[580px] xl:min-h-[640px]">
          {/* Top Row Center (5 Cards: T1..T5, cols 3..7 of Row 1) */}
          <div className="col-start-3 col-span-5 grid grid-cols-5 gap-4 xl:gap-5 h-fit z-0">
            {topCenterCards.map((card, i) => renderCard(card, 8 + i))}
          </div>

          {/* Left Wing (8 Cards: 4 rows × 2 cols, col-start-1 col-span-2 row-start-1 row-span-4) */}
          <div className="col-start-1 col-span-2 row-start-1 row-span-4 grid grid-cols-2 grid-rows-4 gap-4 xl:gap-5 z-0">
            {leftWingCards.map((card, i) => renderCard(card, i))}
          </div>

          {/* Right Wing (8 Cards: 4 rows × 2 cols, col-start-8 col-span-2 row-start-1 row-span-4) */}
          <div className="col-start-8 col-span-2 row-start-1 row-span-4 grid grid-cols-2 grid-rows-4 gap-4 xl:gap-5 z-0">
            {rightWingCards.map((card, i) => renderCard(card, 13 + i))}
          </div>

          {/* Center Stage Content (col-start-3 col-span-5 row-start-2 row-span-3) */}
          <div className="col-start-3 col-span-5 row-start-2 row-span-3 flex flex-col justify-center items-center px-4 xl:px-8 text-center z-10 my-auto py-6">
            {/* Heading */}
            {headingText && (
              <h2
                className={cn(
                  'w-full tracking-tight leading-[1.12] transition-all',
                  headingSize,
                  headingColor,
                  headingWeight,
                  textAlignClasses[headingAlign],
                  isInView
                    ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150'
                    : 'opacity-0 translate-y-8 duration-700 ease-in delay-300',
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}

            {/* Description */}
            {descText && (
              <p
                className={cn(
                  'w-full mt-4 md:mt-6 leading-relaxed max-w-2xl transition-all',
                  descSize,
                  descColor,
                  descWeight,
                  textAlignClasses[descAlign],
                  isInView
                    ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300'
                    : 'opacity-0 translate-y-8 duration-700 ease-in delay-150',
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
              />
            )}

            {/* Button / CTA */}
            {showBtn && (
              <div
                className={cn(
                  'w-full mt-8 md:mt-10 flex transition-all',
                  btnAlignClasses[btnAlign],
                  isInView
                    ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-450'
                    : 'opacity-0 translate-y-8 duration-700 ease-in delay-0',
                )}
              >
                <Link
                  href={btnHref}
                  target={isNewTab ? '_blank' : undefined}
                  rel={isNewTab ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'group/btn inline-flex items-center gap-3.5 pl-7 pr-3 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                    btnBg,
                  )}
                >
                  <span className={cn('tracking-normal', btnTextCol, btnSize, btnWeight)}>
                    {btnText}
                  </span>
                  <span
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                      iconCircleBg,
                    )}
                  >
                    <ArrowUpRight className={cn('w-4 h-4 transition-colors', iconCol)} />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ─── MOBILE & TABLET VIEW (Responsive Surround: 5 Top, 4 Left, 4 Right) ─ */}
        <div className="block lg:hidden flex flex-col gap-6 items-center">
          {/* Top row: 5 cards */}
          <div className="w-full grid grid-cols-5 gap-2.5 sm:gap-3 max-w-lg mx-auto">
            {topCenterCards.map((card, i) =>
              renderCard(card, 8 + i, 'w-full max-w-[72px] mx-auto'),
            )}
          </div>

          {/* Middle zone: Left 4 cards + Center Content + Right 4 cards */}
          <div className="w-full flex items-center justify-between gap-3 sm:gap-6">
            {/* Left Wing (4 stacked cards) */}
            <div className="flex flex-col gap-2.5 sm:gap-3 shrink-0">
              {leftWingCards.slice(0, 4).map((card, i) =>
                renderCard(card, i, 'w-14 h-14 sm:w-16 sm:h-16'),
              )}
            </div>

            {/* Center Content */}
            <div className="flex flex-1 flex-col items-center justify-center text-center px-2 py-4">
              {headingText && (
                <h2
                  className={cn(
                    'w-full tracking-tight leading-tight transition-all',
                    'text-2xl sm:text-3xl md:text-4xl',
                    headingColor,
                    headingWeight,
                    textAlignClasses[headingAlign],
                    isInView
                      ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150'
                      : 'opacity-0 translate-y-8 duration-700 ease-in delay-300',
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                />
              )}

              {descText && (
                <p
                  className={cn(
                    'w-full mt-3 leading-relaxed transition-all text-xs sm:text-sm md:text-base',
                    descColor,
                    descWeight,
                    textAlignClasses[descAlign],
                    isInView
                      ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300'
                      : 'opacity-0 translate-y-8 duration-700 ease-in delay-150',
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                />
              )}

              {showBtn && (
                <div
                  className={cn(
                    'w-full mt-5 flex transition-all',
                    btnAlignClasses[btnAlign],
                    isInView
                      ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-450'
                      : 'opacity-0 translate-y-8 duration-700 ease-in delay-0',
                  )}
                >
                  <Link
                    href={btnHref}
                    target={isNewTab ? '_blank' : undefined}
                    rel={isNewTab ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'group/btn inline-flex items-center gap-2.5 pl-5 pr-2 py-2 rounded-full shadow-md transition-all',
                      btnBg,
                    )}
                  >
                    <span className={cn('tracking-normal text-xs sm:text-sm', btnTextCol, btnWeight)}>
                      {btnText}
                    </span>
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                        iconCircleBg,
                      )}
                    >
                      <ArrowUpRight className={cn('w-3.5 h-3.5', iconCol)} />
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Wing (4 stacked cards) */}
            <div className="flex flex-col gap-2.5 sm:gap-3 shrink-0">
              {rightWingCards.slice(0, 4).map((card, i) =>
                renderCard(card, 13 + i, 'w-14 h-14 sm:w-16 sm:h-16'),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
