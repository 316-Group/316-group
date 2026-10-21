'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface CardItem {
  id?: string | null
  slotNumber?: string | null
  image?: MediaType | string | null
  altText?: string | null
  cardBgColor?: string | null
}

export interface AnimationSettings {
  speedPreset?: 'default' | 'fast' | 'slow' | 'ultraSlow' | 'custom' | null
  fadedOpacity?: string | null
  fadeDuration?: number | null
  visibleDelayMin?: number | null
  visibleDelayMax?: number | null
  hiddenDelayMin?: number | null
  hiddenDelayMax?: number | null
  initialStaggerMax?: number | null
}

export interface AnimatedIconsGridProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding Controls
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

  headingGroup?: {
    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    headingAlignment?: 'left' | 'center' | 'right' | null
  } | null

  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
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
    buttonFontSizeMobile?: string | null
    buttonFontWeight?: string | null
    buttonFontWeightMobile?: string | null
  } | null

  animationSettings?: AnimationSettings | null

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
const TOTAL_SLOTS = 24

export const AnimatedIconsGridClient: React.FC<AnimatedIconsGridProps> = ({
  sectionBgColor = 'bg-[#F4F6FB]',
  paddingTop = 'pt-20',
  paddingBottom = 'pb-20',
  paddingMode = 'default',
  paddingSide = 'both',
  paddingXDesktop,
  paddingXDesktopCustom,
  paddingXMobile,
  paddingXMobileCustom,
  paddingLeftDesktop,
  paddingLeftDesktopCustom,
  paddingLeftMobile,
  paddingLeftMobileCustom,
  paddingRightDesktop,
  paddingRightDesktopCustom,
  paddingRightMobile,
  paddingRightMobileCustom,
  headingGroup,
  descriptionGroup,
  buttonGroup,
  animationSettings,
  cards,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)

  // Map individual fade-out state for all 24 slots (21 on desktop, 24 on mobile)
  const [fadedOutSlots, setFadedOutSlots] = useState<boolean[]>(() =>
    Array(TOTAL_SLOTS).fill(false),
  )

  // ─── Animation Timing Resolution ───────────────────────────────────────────
  const anim = animationSettings
  const speedPreset = anim?.speedPreset ?? 'default'

  let transitionDuration = 3500
  let visibleMin = 6000
  let visibleMax = 12000
  let hiddenMin = 2500
  let hiddenMax = 4500
  let initialStagger = 8000

  if (speedPreset === 'fast') {
    transitionDuration = 1500
    visibleMin = 2000
    visibleMax = 4000
    hiddenMin = 1000
    hiddenMax = 2000
    initialStagger = 3000
  } else if (speedPreset === 'slow') {
    transitionDuration = 5000
    visibleMin = 10000
    visibleMax = 16000
    hiddenMin = 4000
    hiddenMax = 7000
    initialStagger = 10000
  } else if (speedPreset === 'ultraSlow') {
    transitionDuration = 7000
    visibleMin = 15000
    visibleMax = 25000
    hiddenMin = 6000
    hiddenMax = 10000
    initialStagger = 14000
  } else if (speedPreset === 'custom') {
    transitionDuration =
      typeof anim?.fadeDuration === 'number' && anim.fadeDuration > 0
        ? anim.fadeDuration
        : 3500
    visibleMin =
      typeof anim?.visibleDelayMin === 'number' && anim.visibleDelayMin > 0
        ? anim.visibleDelayMin
        : 6000
    visibleMax =
      typeof anim?.visibleDelayMax === 'number' && anim.visibleDelayMax > 0
        ? anim.visibleDelayMax
        : 12000
    hiddenMin =
      typeof anim?.hiddenDelayMin === 'number' && anim.hiddenDelayMin > 0
        ? anim.hiddenDelayMin
        : 2500
    hiddenMax =
      typeof anim?.hiddenDelayMax === 'number' && anim.hiddenDelayMax > 0
        ? anim.hiddenDelayMax
        : 4500
    initialStagger =
      typeof anim?.initialStaggerMax === 'number' && anim.initialStaggerMax > 0
        ? anim.initialStaggerMax
        : 8000
  }

  // Ensure max >= min
  if (visibleMax < visibleMin) visibleMax = visibleMin
  if (hiddenMax < hiddenMin) hiddenMax = hiddenMin

  // Target opacity for faded card (default 0.35)
  const targetFadedOpacity =
    anim?.fadedOpacity !== undefined && anim?.fadedOpacity !== null && anim.fadedOpacity !== ''
      ? parseFloat(anim.fadedOpacity)
      : 0.35

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
    if (!isInView) {
      setFadedOutSlots(Array(TOTAL_SLOTS).fill(false))
      return
    }

    const timers: NodeJS.Timeout[] = []
    const visibleSpread = Math.max(0, visibleMax - visibleMin)
    const hiddenSpread = Math.max(0, hiddenMax - hiddenMin)

    // Launch an independent animation loop for each card slot (1..24)
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      let isFaded = false

      const runStep = () => {
        isFaded = !isFaded
        setFadedOutSlots((prev) => {
          const next = [...prev]
          next[i] = isFaded
          return next
        })

        // When fading OUT (opacity -> targetFadedOpacity):
        // transitionDuration + hiddenMin..hiddenMax
        // When fading IN (opacity -> 1):
        // transitionDuration + visibleMin..visibleMax
        const nextDelay = isFaded
          ? transitionDuration + hiddenMin + Math.random() * hiddenSpread
          : transitionDuration + visibleMin + Math.random() * visibleSpread

        const timer = setTimeout(runStep, nextDelay)
        timers.push(timer)
      }

      // Initial stagger so cards desynchronize naturally
      const staggerSpread = Math.max(500, initialStagger - 1000)
      const initialTimer = setTimeout(runStep, 1000 + Math.random() * staggerSpread)
      timers.push(initialTimer)
    }

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [isInView, transitionDuration, visibleMin, visibleMax, hiddenMin, hiddenMax, initialStagger])

  // Normalized cards array mapped directly to discrete slots (up to 24 slots)
  const slotMap = useMemo(() => {
    const rawList = Array.isArray(cards) ? cards : []
    const mapped: (CardItem | null)[] = Array(TOTAL_SLOTS).fill(null)
    const unassigned: CardItem[] = []

    // Pass 1: Place cards with an explicit slotNumber (1..24)
    for (const card of rawList) {
      if (!card) continue
      const slotNum = card.slotNumber ? parseInt(card.slotNumber, 10) : NaN
      if (!isNaN(slotNum) && slotNum >= 1 && slotNum <= TOTAL_SLOTS) {
        mapped[slotNum - 1] = card
      } else {
        unassigned.push(card)
      }
    }

    // Pass 2: Place unassigned or 'auto' cards into remaining empty slots
    let emptyIdx = 0
    for (const card of unassigned) {
      while (emptyIdx < TOTAL_SLOTS && mapped[emptyIdx] !== null) {
        emptyIdx++
      }
      if (emptyIdx < TOTAL_SLOTS) {
        mapped[emptyIdx] = card
        emptyIdx++
      }
    }

    return mapped
  }, [cards])

  // Slots distribution:
  // Left Wing (8 cards: rows 0..3, cols 0..1): indices 0..7 (Slots 1..8)
  // Top Center (5 cards: row 0, cols 2..6): indices 8..12 (Slots 9..13)
  // Right Wing (8 cards: rows 0..3, cols 7..8): indices 13..20 (Slots 14..21)
  const leftWingCards = useMemo(() => {
    return slotMap.slice(0, 8)
  }, [slotMap])

  const topCenterCards = useMemo(() => {
    return slotMap.slice(8, 13)
  }, [slotMap])

  const rightWingCards = useMemo(() => {
    return slotMap.slice(13, 21)
  }, [slotMap])

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
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-4xl md:text-5xl lg:text-6xl',
    'font-bold',
  )
  const headingAlign = headingGroup?.headingAlignment || 'center'

  // Description config
  const descText =
    descriptionGroup?.description ??
    "Fintech Connect ships with pre-built connectors to the world's leading banking, payments, compliance, and crypto infrastructure providers."
  const descColor = descriptionGroup?.descriptionColor || 'text-gray-700'
  const descTypography = resolveTypography(
    descriptionGroup?.descriptionFontSize,
    descriptionGroup?.descriptionFontSizeMobile,
    descriptionGroup?.descriptionFontWeight,
    descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descAlign = descriptionGroup?.descriptionAlignment || 'center'

  // Button config
  const showBtn = buttonGroup?.enableButton !== false
  const btnText = buttonGroup?.buttonText || 'Explore FintecConnect'
  const btnHref = resolveHref(buttonGroup?.buttonLink)
  const isNewTab = Boolean(buttonGroup?.buttonLink?.newTab)
  const btnBg = buttonGroup?.buttonBgColor || 'bg-[#1D4ED8]'
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-white'
  const btnTypography = resolveTypography(
    buttonGroup?.buttonFontSize,
    buttonGroup?.buttonFontSizeMobile,
    buttonGroup?.buttonFontWeight,
    buttonGroup?.buttonFontWeightMobile,
    'text-sm md:text-base',
    'font-semibold',
  )
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
          'relative rounded-xl sm:rounded-2xl md:rounded-[1.25rem] flex items-center justify-center p-1.5 sm:p-2.5 md:p-3 aspect-square',
          'border border-white/70 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] backdrop-blur-sm',
          customBg,
          extraClasses,
        )}
        style={{
          opacity: isFaded ? targetFadedOpacity : 1,
          transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), background-color ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          willChange: 'opacity, transform',
        }}
      >
        {card?.image && typeof card.image === 'object' && (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center',
              isFaded ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
            )}
            style={{
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: 'opacity, transform',
            }}
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
              'max-w-full max-h-full object-contain rounded-full',
              isFaded ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
            )}
            style={{
              transition: `opacity ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              willChange: 'opacity, transform',
            }}
            loading="lazy"
          />
        )}
      </div>
    )
  }

  // ─── Layout & Padding Resolution ───────────────────────────────────────────
  const padUid = `aig-pad-${uid}`

  const resolvePadVal = (
    sel?: string | null,
    custom?: string | null,
    fallback = '0px',
  ) => {
    if (sel === 'custom') return custom || fallback
    return sel || fallback
  }

  let resolvedDesktopPadLeft = '0px'
  let resolvedDesktopPadRight = '0px'
  let resolvedMobilePadLeft = '0px'
  let resolvedMobilePadRight = '0px'

  if (paddingMode === 'none') {
    resolvedDesktopPadLeft = '0px'
    resolvedDesktopPadRight = '0px'
    resolvedMobilePadLeft = '0px'
    resolvedMobilePadRight = '0px'
  } else if (paddingMode === 'custom') {
    if (paddingSide === 'left') {
      resolvedDesktopPadLeft = resolvePadVal(paddingLeftDesktop, paddingLeftDesktopCustom, '48px')
      resolvedMobilePadLeft = resolvePadVal(paddingLeftMobile, paddingLeftMobileCustom, '16px')
      resolvedDesktopPadRight = '0px'
      resolvedMobilePadRight = '0px'
    } else if (paddingSide === 'right') {
      resolvedDesktopPadLeft = '0px'
      resolvedMobilePadLeft = '0px'
      resolvedDesktopPadRight = resolvePadVal(paddingRightDesktop, paddingRightDesktopCustom, '48px')
      resolvedMobilePadRight = resolvePadVal(paddingRightMobile, paddingRightMobileCustom, '16px')
    } else if (paddingSide === 'split') {
      resolvedDesktopPadLeft = resolvePadVal(paddingLeftDesktop, paddingLeftDesktopCustom, '48px')
      resolvedDesktopPadRight = resolvePadVal(paddingRightDesktop, paddingRightDesktopCustom, '48px')
      resolvedMobilePadLeft = resolvePadVal(paddingLeftMobile, paddingLeftMobileCustom, '16px')
      resolvedMobilePadRight = resolvePadVal(paddingRightMobile, paddingRightMobileCustom, '16px')
    } else {
      // 'both' (default)
      const dVal = resolvePadVal(paddingXDesktop, paddingXDesktopCustom, '48px')
      const mVal = resolvePadVal(paddingXMobile, paddingXMobileCustom, '16px')
      resolvedDesktopPadLeft = dVal
      resolvedDesktopPadRight = dVal
      resolvedMobilePadLeft = mVal
      resolvedMobilePadRight = mVal
    }
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
      {(paddingMode === 'custom' || paddingMode === 'none') && (
        <style>{`
          .${padUid} {
            padding-left: ${resolvedMobilePadLeft} !important;
            padding-right: ${resolvedMobilePadRight} !important;
          }
          @media (min-width: 1024px) {
            .${padUid} {
              padding-left: ${resolvedDesktopPadLeft} !important;
              padding-right: ${resolvedDesktopPadRight} !important;
            }
          }
        `}</style>
      )}
      <div
        className={cn(
          'w-full relative',
          (!paddingMode || paddingMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-[1720px]',
          paddingMode === 'none' && cn('w-full max-w-none px-0', padUid),
          paddingMode === 'custom' && cn('w-full max-w-none', padUid),
        )}
      >
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
                  headingTypography.combined,
                  headingColor,
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
                  descTypography.combined,
                  descColor,
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
                  <span className={cn('tracking-normal', btnTextCol, btnTypography.combined)}>
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

        {/* ─── MOBILE & TABLET VIEW (6 Columns × 4 Rows = 24 Cards + Centered Overlay) ─── */}
        <div className="block lg:hidden relative w-full overflow-hidden">
          {/* Layer 1: Continuous 6 Columns × 4 Rows Grid (Z-0) */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full relative z-0">
            {slotMap.slice(0, 24).map((card, i) =>
              renderCard(card, i, 'w-full aspect-square'),
            )}
          </div>

          {/* Layer 2: Floating Centered Content Overlay (Z-10) */}
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-center px-2 sm:px-6 pointer-events-none">
            <div className="flex flex-col items-center justify-center max-w-[320px] sm:max-w-md mx-auto">
              {/* Heading */}
              {headingText && (
                <h2
                  className={cn(
                    'w-full tracking-tight leading-[1.12] transition-all',
                    headingGroup?.headingFontSizeMobile || 'text-xl sm:text-2xl md:text-3xl',
                    headingGroup?.headingFontWeightMobile || headingTypography.weightClass,
                    headingColor,
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
                    'w-full mt-2 sm:mt-2.5 leading-relaxed transition-all',
                    descriptionGroup?.descriptionFontSizeMobile || 'text-xs sm:text-sm',
                    descriptionGroup?.descriptionFontWeightMobile || descTypography.weightClass,
                    descColor,
                    textAlignClasses[descAlign],
                    isInView
                      ? 'opacity-100 translate-y-0 duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300'
                      : 'opacity-0 translate-y-8 duration-700 ease-in delay-150',
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                />
              )}

              {/* CTA Button */}
              {showBtn && (
                <div
                  className={cn(
                    'w-full mt-3 sm:mt-4 flex transition-all pointer-events-auto',
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
                      'group/btn inline-flex items-center gap-2 pl-4 pr-2 py-1.5 sm:pl-5 sm:pr-2.5 sm:py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
                      btnBg,
                    )}
                  >
                    <span
                      className={cn(
                        'tracking-normal',
                        buttonGroup?.buttonFontSizeMobile || 'text-xs sm:text-sm',
                        buttonGroup?.buttonFontWeightMobile || btnTypography.weightClass,
                        btnTextCol,
                      )}
                    >
                      {btnText}
                    </span>
                    <span
                      className={cn(
                        'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                        iconCircleBg,
                      )}
                    >
                      <ArrowUpRight className={cn('w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors', iconCol)} />
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
