'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface SubCardItem {
  id?: string | null
  title?: string | null
  titleColor?: string | null
  titleFontSize?: string | null
  titleFontSizeMobile?: string | null
  titleFontWeight?: string | null
  titleFontWeightMobile?: string | null
  titleAlignment?: 'left' | 'center' | 'right' | null
  spacingBottom?: string | null
  spacingBottomCustom?: string | null
  description?: string | null
  descriptionColor?: string | null
  descriptionFontSize?: string | null
  descriptionFontSizeMobile?: string | null
  descriptionFontWeight?: string | null
  descriptionFontWeightMobile?: string | null
  descriptionAlignment?: 'left' | 'center' | 'right' | null
}

export interface CardItem {
  id?: string | null
  image?: MediaType | string | null
  overlayStyle?: 'vignette' | 'subtle' | 'medium' | 'heavy' | 'none' | null
  activeBlur?: 'blur-none' | 'blur-[2px]' | 'blur-[4px]' | 'blur-[8px]' | null

  kickerGroup?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null

  headingGroup?: {
    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    collapsedFontSize?: string | null
    collapsedFontSizeMobile?: string | null
  } | null

  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
  } | null

  subCardsGroup?: {
    enableSubCards?: boolean | null
    subCardsBgColor?: string | null
    subCardsRounded?: string | null
    subCardsBorder?: string | null
    items?: SubCardItem[] | null
  } | null

  buttonGroup?: {
    showButton?: boolean | null
    buttonText?: string | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    buttonFontSize?: string | null
    buttonFontSizeMobile?: string | null
    buttonFontWeight?: string | null
    buttonFontWeightMobile?: string | null
    iconBgColor?: string | null
    iconColor?: string | null
    buttonLink?: {
      type?: 'custom' | 'reference' | null
      url?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo?: string | null
        value?: any
      } | null
    } | null
  } | null
}

export interface ClickExpandProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding Controls
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  cardHeight?: string | null
  scrollBehavior?: 'sticky' | 'wheel' | 'clickOnly' | null
  showIndicators?: boolean | null
  cards?: CardItem[] | null
  className?: string
  isEmbedded?: boolean
}

/**
 * Normalizes inline styles, e.g. <style="color:red"> or <span style="...">
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const ClickExpandClient: React.FC<ClickExpandProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  cardHeight = 'h-[580px] md:h-[680px] lg:h-[720px]',
  scrollBehavior = 'sticky',
  showIndicators = true,
  cards = [],
  className,
  isEmbedded = false,
}) => {
  const uid = React.useId().replace(/:/g, '')
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const activeIndexRef = useRef<number>(0)
  const [sectionInView, setSectionInView] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const lastWheelTime = useRef<number>(0)

  // Keep activeIndexRef immediately synchronized for wheel and touch event handlers
  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  // Resolve configurable spacing between sub-card heading and description
  const resolveSubCardSpacing = (val?: string | null, custom?: string | null): string => {
    if (val === 'custom') {
      if (!custom) return '10px'
      return custom.endsWith('px') || custom.endsWith('rem') || custom.endsWith('em')
        ? custom
        : `${custom}px`
    }
    return val || '10px'
  }

  const items = cards && Array.isArray(cards) && cards.length > 0 ? cards : []
  const count = items.length

  // ─── Layout & Padding Resolution ───────────────────────────────────────────
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

  const padClassName =
    paddingMode === 'custom' || paddingMode === 'none' ? `clickexpand-pad-${uid}` : ''

  // Slide-up entrance animation observer
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Resolve link destination
  const getHref = (linkObj?: CardItem['buttonGroup'] extends { buttonLink?: infer L } ? L : any) => {
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

  // ─── Multi-Pass Smooth Alignment: Guarantees Active Card is Never Cut Off ──
  const scrollCardIntoView = useCallback((index: number) => {
    const align = () => {
      const cardEl = cardRefs.current[index]
      const trackEl = trackRef.current
      if (!cardEl || !trackEl) return

      const scrollTarget = cardEl.offsetLeft - trackEl.offsetLeft

      trackEl.scrollTo({
        left: Math.max(0, scrollTarget),
        behavior: 'smooth',
      })
    }

    // 1. Immediate pass
    align()

    // 2. Multi-pass sync while CSS width transition (700ms) animates
    const t1 = setTimeout(align, 80)
    const t2 = setTimeout(align, 200)
    const t3 = setTimeout(align, 400)
    const t4 = setTimeout(align, 650)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  // When active index changes, auto-scroll and align the track
  useEffect(() => {
    const cleanup = scrollCardIntoView(activeIndex)
    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  }, [activeIndex, scrollCardIntoView])

  // ─── Helper: Viewport Centering & Measurement ──────────────────────────────
  const getSectionCenterInfo = useCallback((targetElement: HTMLElement) => {
    const rect = targetElement.getBoundingClientRect()
    const windowH = window.innerHeight
    // Center of the section in viewport coordinates
    const sectionCenterY = rect.top + rect.height / 2
    // Center of viewport
    const viewportCenterY = windowH / 2
    // Distance from center: > 0 means section is lower than screen center, < 0 means higher
    const diff = sectionCenterY - viewportCenterY
    // Tolerance zone: within 16% of viewport height (clamped between 60px and 120px)
    const tolerance = Math.min(120, Math.max(60, windowH * 0.16))
    const isCentered = Math.abs(diff) <= tolerance

    return { isCentered, diff, rect, windowH }
  }, [])

  // ─── Centered Viewport Scroll Lock & Sequential Card Expansion (Desktop) ───
  useEffect(() => {
    if (count <= 1 || scrollBehavior === 'clickOnly') return

    const handleWindowWheel = (e: WheelEvent) => {
      // Ignore tiny micro-scroll jitters
      if (Math.abs(e.deltaY) < 6) return

      const targetElement = sectionRef.current || wrapperRef.current
      if (!targetElement) return

      const { isCentered, diff, rect, windowH } = getSectionCenterInfo(targetElement)
      const currentIdx = activeIndexRef.current
      const now = Date.now()

      // Section is considered actively engaged if it is centered in the viewport,
      // OR if the user is in the middle of card steps (0 < currentIdx < count - 1)
      // and the section still occupies the screen.
      const isMidSequence = currentIdx > 0 && currentIdx < count - 1
      const isEngaged =
        isCentered ||
        (isMidSequence && rect.top <= windowH * 0.75 && rect.bottom >= windowH * 0.25)

      if (!isEngaged) return

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (currentIdx < count - 1) {
          // INTERCEPT: Stop page scroll and step to next card
          e.preventDefault()

          if (now - lastWheelTime.current >= 380) {
            lastWheelTime.current = now
            if (Math.abs(diff) > 6) {
              window.scrollBy({ top: diff, behavior: 'smooth' })
            }
            const nextIdx = currentIdx + 1
            activeIndexRef.current = nextIdx
            setActiveIndex(nextIdx)
          }
        }
        // When currentIdx === count - 1:
        // Do NOT preventDefault! The page scrolls down past the section naturally.
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (currentIdx > 0) {
          // INTERCEPT: Stop page scroll and step to previous card
          e.preventDefault()

          if (now - lastWheelTime.current >= 380) {
            lastWheelTime.current = now
            if (Math.abs(diff) > 6) {
              window.scrollBy({ top: diff, behavior: 'smooth' })
            }
            const prevIdx = currentIdx - 1
            activeIndexRef.current = prevIdx
            setActiveIndex(prevIdx)
          }
        }
        // When currentIdx === 0:
        // Do NOT preventDefault! The page scrolls up past the section naturally.
      }
    }

    window.addEventListener('wheel', handleWindowWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWindowWheel)
  }, [count, scrollBehavior, getSectionCenterInfo])

  // ─── Touch Stepping for Mobile (Centered Viewport Lock) ─────────────────────
  useEffect(() => {
    if (count <= 1 || scrollBehavior === 'clickOnly') return

    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY
        touchStartX = e.touches[0].clientX
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const targetElement = sectionRef.current || wrapperRef.current
      if (!targetElement) return

      const touchY = e.touches[0].clientY
      const touchX = e.touches[0].clientX
      const diffY = touchStartY - touchY // > 0 means swipe UP (scrolling DOWN), < 0 means swipe DOWN (scrolling UP)
      const diffX = touchStartX - touchX

      // Ignore pure horizontal track dragging gestures
      if (Math.abs(diffX) > Math.abs(diffY) * 1.5) return
      // Ignore tiny jitter
      if (Math.abs(diffY) < 15) return

      const { isCentered, diff, rect, windowH } = getSectionCenterInfo(targetElement)
      const currentIdx = activeIndexRef.current
      const isMidSequence = currentIdx > 0 && currentIdx < count - 1
      const isEngaged =
        isCentered ||
        (isMidSequence && rect.top <= windowH * 0.75 && rect.bottom >= windowH * 0.25)

      if (!isEngaged) return

      const now = Date.now()

      if (diffY > 0) {
        // Swiping UP (scrolling DOWN)
        if (currentIdx < count - 1) {
          if (e.cancelable) e.preventDefault()
          if (now - lastWheelTime.current >= 380) {
            lastWheelTime.current = now
            touchStartY = touchY
            if (Math.abs(diff) > 6) {
              window.scrollBy({ top: diff, behavior: 'smooth' })
            }
            const nextIdx = currentIdx + 1
            activeIndexRef.current = nextIdx
            setActiveIndex(nextIdx)
          }
        }
      } else if (diffY < 0) {
        // Swiping DOWN (scrolling UP)
        if (currentIdx > 0) {
          if (e.cancelable) e.preventDefault()
          if (now - lastWheelTime.current >= 380) {
            lastWheelTime.current = now
            touchStartY = touchY
            if (Math.abs(diff) > 6) {
              window.scrollBy({ top: diff, behavior: 'smooth' })
            }
            const prevIdx = currentIdx - 1
            activeIndexRef.current = prevIdx
            setActiveIndex(prevIdx)
          }
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [count, scrollBehavior, getSectionCenterInfo])

  // Direct click on any card
  const handleCardClick = (index: number) => {
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(count - 1, activeIndexRef.current + 1)
      activeIndexRef.current = next
      setActiveIndex(next)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = Math.max(0, activeIndexRef.current - 1)
      activeIndexRef.current = prev
      setActiveIndex(prev)
    }
  }

  if (count === 0) {
    return null
  }

  // Overlay styles map
  const overlayMap = {
    vignette: 'bg-gradient-to-t from-black/85 via-black/40 to-black/35',
    subtle: 'bg-black/30',
    medium: 'bg-black/50',
    heavy: 'bg-black/70',
    none: 'bg-transparent',
  }

  // Alignment classes for sub-card texts
  const alignmentTextClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const trackContent = (
    <div
      ref={trackRef}
      className="flex items-stretch gap-4 md:gap-5 lg:gap-6 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 px-1 scroll-smooth w-full"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {items.map((card, idx) => {
        const isActive = idx === activeIndex
        const overlay = overlayMap[card.overlayStyle || 'vignette']
        const activeBlurClass = card.activeBlur || 'blur-[2px]'

        // ─── Kicker config ─────────────────────────────────────────────
        const kickerText = card.kickerGroup?.text || 'Fintech & Payments'
        const kickerColor = card.kickerGroup?.color || 'text-[#52B5D8]'
        const kickerTypography = resolveTypography(
          card.kickerGroup?.fontSize,
          card.kickerGroup?.fontSizeMobile || 'text-[10px]',
          card.kickerGroup?.fontWeight,
          card.kickerGroup?.fontWeightMobile,
          'text-base md:text-lg',
          'font-semibold',
        )

        // ─── Heading config ────────────────────────────────────────────
        const headingText =
          card.headingGroup?.heading || 'Making everyday finance more connected.'
        const headingColor = card.headingGroup?.headingColor || 'text-white'
        const headingTypography = resolveTypography(
          card.headingGroup?.headingFontSize,
          card.headingGroup?.headingFontSizeMobile || 'text-lg sm:text-xl',
          card.headingGroup?.headingFontWeight,
          card.headingGroup?.headingFontWeightMobile,
          'text-3xl sm:text-4xl md:text-5xl',
          'font-bold',
        )
        const collapsedTypography = resolveTypography(
          card.headingGroup?.collapsedFontSize,
          card.headingGroup?.collapsedFontSizeMobile || 'text-xs',
          card.headingGroup?.headingFontWeight,
          card.headingGroup?.headingFontWeightMobile,
          'text-xl md:text-2xl',
          'font-bold',
        )

        // ─── Description config ────────────────────────────────────────
        const descText = card.descriptionGroup?.description
        const descColor = card.descriptionGroup?.descriptionColor || 'text-white/90'
        const descTypography = resolveTypography(
          card.descriptionGroup?.descriptionFontSize,
          card.descriptionGroup?.descriptionFontSizeMobile || 'text-[11px]',
          card.descriptionGroup?.descriptionFontWeight,
          card.descriptionGroup?.descriptionFontWeightMobile,
          'text-base md:text-lg',
          'font-normal',
        )

        // ─── Sub-Cards config (Up to 3) ─────────────────────────────────
        const subCardsConfig = card.subCardsGroup
        const showSubCards = subCardsConfig?.enableSubCards !== false
        const subCardsBg = subCardsConfig?.subCardsBgColor || 'bg-white/15 backdrop-blur-md'
        const subCardsRounded = subCardsConfig?.subCardsRounded || 'rounded-2xl'
        const subCardsBorder = subCardsConfig?.subCardsBorder || 'border border-white/20'
        const subCardsItems = subCardsConfig?.items || [
          {
            title: 'Multi-currency\nwallets',
            description: 'Hold and manage supported currency balances.',
          },
          {
            title: 'Send\n& receive',
            description: 'Transfers, requests, bill splitting and remittance.',
          },
          {
            title: 'Everyday\nmoney tools',
            description: 'Virtual cards, statements and account experiences.',
          },
        ]

        // ─── Button config ─────────────────────────────────────────────
        const showButton = card.buttonGroup?.showButton !== false
        const buttonText = card.buttonGroup?.buttonText || 'Learn more'
        const buttonBg = card.buttonGroup?.buttonBgColor || 'bg-white/20'
        const buttonTextCol = card.buttonGroup?.buttonTextColor || 'text-white'
        const buttonTypography = resolveTypography(
          card.buttonGroup?.buttonFontSize,
          card.buttonGroup?.buttonFontSizeMobile || 'text-xs',
          card.buttonGroup?.buttonFontWeight,
          card.buttonGroup?.buttonFontWeightMobile,
          'text-base',
          'font-medium',
        )
        const iconBg = card.buttonGroup?.iconBgColor || 'bg-white'
        const iconCol = card.buttonGroup?.iconColor || 'text-slate-900'
        const buttonHref = getHref(card.buttonGroup?.buttonLink)
        const isNewTab = card.buttonGroup?.buttonLink?.newTab

        return (
          <div
            key={idx}
            ref={(el) => {
              cardRefs.current[idx] = el
            }}
            onClick={() => handleCardClick(idx)}
            className={cn(
              'relative rounded-[28px] md:rounded-[36px] overflow-hidden cursor-pointer group shrink-0',
              'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D]',
              'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
              cardHeight || 'h-[580px] md:h-[680px] lg:h-[720px]',
              // Active card expands fully (60%), inactive cards collapse (13%)
              isActive
                ? 'w-[74vw] sm:w-[540px] md:w-[620px] lg:flex-[0_0_60%] lg:w-[60%]'
                : 'w-[22vw] min-w-[78px] sm:w-[150px] md:w-[170px] lg:flex-[0_0_13%] lg:w-[13%] hover:brightness-105',
            )}
          >
            {/* Background Image with Active Blur effect */}
            {card.image && typeof card.image === 'object' && (
              <Media
                resource={card.image}
                fill
                imgClassName={cn(
                  'object-cover w-full h-full transition-all duration-700 ease-out',
                  isActive
                    ? cn('scale-105', activeBlurClass)
                    : 'scale-100 blur-none group-hover:scale-105',
                )}
              />
            )}

            {/* Vignette Overlay (applied when image is present) */}
            <div
              className={cn(
                'absolute inset-0 pointer-events-none transition-opacity duration-700',
                card.image ? overlay : 'bg-transparent',
                !isActive && 'bg-gradient-to-t from-black/90 via-black/40 to-transparent',
              )}
            />

            {/* ─── ACTIVE CARD CONTENT ─── */}
            <div
              className={cn(
                'relative z-10 h-full w-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
                'transition-all duration-500 ease-out',
                isActive
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none absolute inset-0',
              )}
            >
              <div
                className={cn(
                  'min-h-full flex flex-col justify-center my-auto',
                  'gap-2 sm:gap-6 md:gap-7',
                  'py-4 sm:py-10 md:py-14 lg:py-16 px-3.5 sm:px-8 md:px-12 lg:px-14 xl:px-16',
                )}
              >
                {/* Top Group: Kicker + Heading + Description */}
                <div className="flex flex-col">
                  {/* Small Kicker */}
                  {kickerText && (
                    <span
                      className={cn(
                        'block mb-0.5 sm:mb-2 md:mb-3 tracking-normal transition-all duration-700',
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                        kickerTypography.combined,
                        kickerColor,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(kickerText) }}
                    />
                  )}

                  {/* Main Heading */}
                  <h3
                    className={cn(
                      'tracking-tight leading-[1.14] transition-all duration-700 delay-100',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                      headingTypography.combined,
                      headingColor,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                  />

                  {/* Description */}
                  {descText && (
                    <div
                      className={cn(
                        'mt-1 sm:mt-3 md:mt-4 leading-relaxed max-w-2xl transition-all duration-700 delay-200',
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                        descTypography.combined,
                        descColor,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                    />
                  )}
                </div>

                {/* Sub-Cards Row (Up to 3 cards) */}
                {showSubCards && subCardsItems.length > 0 && (
                  <div
                    className={cn(
                      'grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full transition-all duration-700 delay-300',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
                    )}
                  >
                    {subCardsItems.slice(0, 3).map((subCard, subIdx) => {
                      const title = subCard.title || 'Feature'
                      const titleColor = subCard.titleColor || 'text-white'
                      const titleTypography = resolveTypography(
                        subCard.titleFontSize,
                        subCard.titleFontSizeMobile || 'text-xs',
                        subCard.titleFontWeight,
                        subCard.titleFontWeightMobile || (subCard.titleFontWeight ? undefined : 'font-bold'),
                        'text-lg md:text-xl',
                        'font-bold',
                      )
                      const titleAlign = subCard.titleAlignment || 'left'

                      const subDesc = subCard.description
                      const descColor = subCard.descriptionColor || 'text-white/80'
                      const subDescTypography = resolveTypography(
                        subCard.descriptionFontSize,
                        subCard.descriptionFontSizeMobile || 'text-[10px]',
                        subCard.descriptionFontWeight,
                        subCard.descriptionFontWeightMobile,
                        'text-xs md:text-sm',
                        'font-normal',
                      )
                      const descAlign = subCard.descriptionAlignment || 'left'

                      const spacing = resolveSubCardSpacing(
                        subCard.spacingBottom,
                        subCard.spacingBottomCustom,
                      )

                      return (
                        <div
                          key={subIdx}
                          className={cn(
                            'p-2.5 sm:p-5 md:p-6 flex flex-col justify-start transition-transform duration-300 hover:scale-[1.02] max-sm:rounded-xl max-sm:gap-1.5',
                            subCardsBg,
                            subCardsRounded,
                            subCardsBorder,
                          )}
                        >
                          <h4
                            className={cn(
                              'whitespace-pre-line leading-tight tracking-tight',
                              titleTypography.combined,
                              titleColor,
                              alignmentTextClasses[titleAlign],
                            )}
                            dangerouslySetInnerHTML={{ __html: formatInlineHtml(title) }}
                          />

                          {/* Configurable Spacing between Heading and Description */}
                          <div style={{ height: spacing }} className="max-sm:!h-1" aria-hidden="true" />

                          {subDesc && (
                            <p
                              className={cn(
                                'leading-relaxed max-sm:leading-tight',
                                subDescTypography.combined,
                                descColor,
                                alignmentTextClasses[descAlign],
                              )}
                              dangerouslySetInnerHTML={{ __html: formatInlineHtml(subDesc) }}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Bottom Action Button: transparent background & border */}
                {showButton && (
                  <div
                    className={cn(
                      'pt-1 transition-all duration-700 delay-400',
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
                    )}
                  >
                    <Link
                      href={buttonHref}
                      target={isNewTab ? '_blank' : undefined}
                      rel={isNewTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 sm:gap-3 py-0.5 sm:py-1.5 px-0 bg-transparent border-0 border-transparent shadow-none transition-all duration-300 hover:opacity-85 active:scale-95 group/btn"
                    >
                      <span className={cn('tracking-normal transition-colors', buttonTextCol, buttonTypography.combined)}>
                        {buttonText}
                      </span>
                      <span
                        className={cn(
                          'w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                          iconBg,
                        )}
                      >
                        <ArrowUpRight className={cn('w-3 h-3 sm:w-4 sm:h-4', iconCol)} />
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* ─── INACTIVE COLLAPSED PREVIEW ─── */}
            <div
              className={cn(
                'absolute inset-0 z-20 flex flex-col justify-end p-3 sm:p-5 md:p-6 transition-all duration-500 ease-out',
                !isActive
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none',
              )}
            >
              <h3
                className={cn(
                  'leading-tight tracking-tight drop-shadow-md line-clamp-3 transition-colors',
                  collapsedTypography.combined,
                  headingColor,
                )}
                dangerouslySetInnerHTML={{
                  __html: formatInlineHtml(kickerText || headingText),
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )

  const indicatorsContent = showIndicators !== false && count > 1 && (
    <div className="mt-4 md:mt-6 flex items-center gap-2 pl-2">
      {items.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => handleCardClick(i)}
          className={cn(
            'h-1.5 transition-all duration-300 rounded-full focus:outline-none cursor-pointer',
            i === activeIndex
              ? 'w-7 sm:w-8 bg-slate-900 dark:bg-white'
              : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400',
          )}
        />
      ))}
    </div>
  )

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full transition-colors duration-300', sectionBgColor, className)}
    >
      {/* Dynamic Custom Horizontal Padding Overrides */}
      {(paddingMode === 'custom' || paddingMode === 'none') && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad} !important;
            padding-right: ${resolvedMobilePad} !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @media (min-width: 1024px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad} !important;
              padding-right: ${resolvedDesktopPad} !important;
            }
          }
        `}</style>
      )}

      <section
        ref={sectionRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Expandable Cards Section"
        className={cn(
          'w-full outline-none select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200',
          sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
          paddingTop,
          paddingBottom,
        )}
      >
        <div
          className={cn(
            'w-full flex flex-col overflow-hidden',
            paddingMode === 'default' && 'max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12',
            padClassName,
          )}
        >
          {trackContent}
          {indicatorsContent}
        </div>
      </section>
    </div>
  )
}
