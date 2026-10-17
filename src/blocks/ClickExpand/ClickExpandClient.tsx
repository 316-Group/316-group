'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export interface CardItem {
  image?: MediaType | string | null
  overlayStyle?: 'vignette' | 'subtle' | 'medium' | 'heavy' | 'none' | null
  headingGroup?: {
    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    collapsedFontSize?: string | null
  } | null
  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
  } | null
  buttonGroup?: {
    showButton?: boolean | null
    buttonText?: string | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    buttonFontSize?: string | null
    buttonFontWeight?: string | null
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
  sectionBgColor = 'bg-white',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  cardHeight = 'h-[520px] md:h-[620px] lg:h-[660px]',
  scrollBehavior = 'sticky',
  showIndicators = true,
  cards = [],
  className,
  isEmbedded = false,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const isScrollingProgrammatically = useRef<boolean>(false)
  const lastWheelTime = useRef<number>(0)

  const items = cards && Array.isArray(cards) && cards.length > 0 ? cards : []
  const count = items.length

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

  // Smoothly scroll the cards track to keep the active card visible
  const scrollCardIntoView = useCallback((index: number) => {
    const cardEl = cardRefs.current[index]
    const trackEl = trackRef.current
    if (!cardEl || !trackEl) return

    const cardRect = cardEl.getBoundingClientRect()
    const trackRect = trackEl.getBoundingClientRect()

    // Determine target scroll position to center the active card or reveal upcoming items
    const scrollTarget =
      cardEl.offsetLeft -
      (trackEl.clientWidth / 2 - cardEl.clientWidth / 2) +
      trackEl.scrollLeft

    trackEl.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: 'smooth',
    })
  }, [])

  // When active index changes, gently auto-scroll the track
  useEffect(() => {
    scrollCardIntoView(activeIndex)
  }, [activeIndex, scrollCardIntoView])

  // Handle Sticky Scroll Progress
  useEffect(() => {
    if (scrollBehavior !== 'sticky' || count <= 1 || isEmbedded) return

    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const totalScrollableDistance = wrapper.offsetHeight - window.innerHeight

      if (totalScrollableDistance <= 0) return

      // When the top of wrapper reaches top of viewport (rect.top <= 0)
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const scrolled = -rect.top
        const progress = Math.min(1, Math.max(0, scrolled / totalScrollableDistance))
        const targetIndex = Math.min(count - 1, Math.floor(progress * count))

        if (targetIndex !== activeIndex) {
          setActiveIndex(targetIndex)
        }
      } else if (rect.top > 0) {
        if (activeIndex !== 0) setActiveIndex(0)
      } else if (rect.bottom < window.innerHeight) {
        if (activeIndex !== count - 1) setActiveIndex(count - 1)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollBehavior, count, activeIndex, isEmbedded])

  // Handle direct click on a card
  const handleCardClick = (index: number) => {
    setActiveIndex(index)

    // In sticky mode, also gently sync window scroll position so wheel continues seamlessly
    if (scrollBehavior === 'sticky' && count > 1 && !isEmbedded) {
      const wrapper = wrapperRef.current
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect()
        const totalScrollableDistance = wrapper.offsetHeight - window.innerHeight
        if (totalScrollableDistance > 0) {
          isScrollingProgrammatically.current = true
          const targetY =
            window.scrollY +
            rect.top +
            (index / (count - 1 || 1)) * totalScrollableDistance

          window.scrollTo({
            top: targetY,
            behavior: 'smooth',
          })

          setTimeout(() => {
            isScrollingProgrammatically.current = false
          }, 600)
        }
      }
    }
  }

  // Handle mouse wheel when scrollBehavior is 'wheel' or when embedded
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollBehavior === 'clickOnly' || count <= 1) return
    if (scrollBehavior !== 'wheel' && !isEmbedded) return

    const now = Date.now()
    if (now - lastWheelTime.current < 450) return // debounce wheel events

    if (e.deltaY > 25) {
      // Scroll down -> next card
      if (activeIndex < count - 1) {
        e.preventDefault()
        lastWheelTime.current = now
        setActiveIndex((prev) => prev + 1)
      }
    } else if (e.deltaY < -25) {
      // Scroll up -> previous card
      if (activeIndex > 0) {
        e.preventDefault()
        lastWheelTime.current = now
        setActiveIndex((prev) => prev - 1)
      }
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => Math.min(count - 1, prev + 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => Math.max(0, prev - 1))
    }
  }

  if (count === 0) {
    return null
  }

  // Overlay styles map
  const overlayMap = {
    vignette: 'bg-gradient-to-t from-black/85 via-black/40 to-black/30',
    subtle: 'bg-black/30',
    medium: 'bg-black/50',
    heavy: 'bg-black/70',
    none: 'bg-transparent',
  }

  // Wrapper height when sticky scroll is enabled
  const isStickyMode = scrollBehavior === 'sticky' && count > 1 && !isEmbedded
  const stickyWrapperHeight = isStickyMode
    ? `${100 + (count - 1) * 75}vh`
    : 'auto'

  return (
    <div
      ref={wrapperRef}
      style={{ minHeight: isStickyMode ? stickyWrapperHeight : undefined }}
      className={cn('relative w-full', sectionBgColor || 'bg-white', className)}
    >
      <section
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Expandable Cards Section"
        className={cn(
          'w-full outline-none select-none transition-colors duration-200',
          isStickyMode ? 'sticky top-0 h-screen flex flex-col justify-center' : '',
          !isStickyMode && (paddingTop || 'pt-16'),
          !isStickyMode && (paddingBottom || 'pb-16'),
        )}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col">
          {/* ─── Cards Track ────────────────────────────────────────────────────── */}
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 md:gap-6 overflow-x-auto scrollbar-none py-2 px-1 scroll-smooth w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {items.map((card, idx) => {
              const isActive = idx === activeIndex
              const overlay = overlayMap[card.overlayStyle || 'vignette']

              // Heading config
              const headingText = card.headingGroup?.heading || 'Card Heading'
              const headingColor = card.headingGroup?.headingColor || 'text-white'
              const headingSize =
                card.headingGroup?.headingFontSize || 'text-3xl md:text-4xl lg:text-5xl'
              const headingWeight = card.headingGroup?.headingFontWeight || 'font-bold'
              const collapsedSize =
                card.headingGroup?.collapsedFontSize || 'text-xl md:text-2xl'

              // Description config
              const descText = card.descriptionGroup?.description
              const descColor = card.descriptionGroup?.descriptionColor || 'text-white/90'
              const descSize = card.descriptionGroup?.descriptionFontSize || 'text-base md:text-lg'
              const descWeight = card.descriptionGroup?.descriptionFontWeight || 'font-normal'

              // Button config
              const showButton = card.buttonGroup?.showButton !== false
              const buttonText = card.buttonGroup?.buttonText || 'Learn more'
              const buttonBg = card.buttonGroup?.buttonBgColor || 'bg-white/20'
              const buttonTextCol = card.buttonGroup?.buttonTextColor || 'text-white'
              const buttonSize = card.buttonGroup?.buttonFontSize || 'text-base'
              const buttonWeight = card.buttonGroup?.buttonFontWeight || 'font-medium'
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
                    'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]',
                    cardHeight || 'h-[520px] md:h-[620px] lg:h-[660px]',
                    // Flex / width based on active state
                    isActive
                      ? 'w-[85vw] sm:w-[500px] md:w-[620px] lg:w-[680px] xl:w-[760px] md:flex-[3.5] shadow-2xl'
                      : 'w-[140px] sm:w-[170px] md:w-[200px] lg:w-[220px] md:flex-[1] shadow-md hover:brightness-105',
                  )}
                >
                  {/* Background Image */}
                  {card.image && typeof card.image === 'object' && (
                    <Media
                      resource={card.image}
                      fill
                      imgClassName={cn(
                        'object-cover w-full h-full transition-transform duration-700 ease-out',
                        isActive ? 'scale-100' : 'scale-105 group-hover:scale-110',
                      )}
                    />
                  )}

                  {/* Gradient / Dark Vignette Overlay */}
                  <div
                    className={cn(
                      'absolute inset-0 pointer-events-none transition-opacity duration-700',
                      overlay,
                      // Darker gradient on inactive card for bottom title legibility
                      !isActive && 'bg-gradient-to-t from-black/90 via-black/40 to-black/20',
                    )}
                  />

                  {/* ─── ACTIVE CARD CONTENT ─────────────────────────────────── */}
                  <div
                    className={cn(
                      'relative z-10 h-full flex flex-col justify-between',
                      'p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14',
                      'transition-all duration-500 ease-out',
                      isActive
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none absolute inset-0',
                    )}
                  >
                    {/* Top Content: Heading & Description */}
                    <div className="flex flex-col">
                      <h3
                        className={cn(
                          'tracking-tight leading-[1.18] transition-colors',
                          headingSize,
                          headingColor,
                          headingWeight,
                        )}
                        dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                      />

                      {descText && (
                        <div
                          className={cn(
                            'mt-4 md:mt-6 leading-relaxed max-w-xl transition-all duration-500 delay-100',
                            descSize,
                            descColor,
                            descWeight,
                          )}
                          dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                        />
                      )}
                    </div>

                    {/* Bottom Content: Pill Action Button */}
                    {showButton && (
                      <div className="mt-8 pt-4 flex items-center">
                        <Link
                          href={buttonHref}
                          target={isNewTab ? '_blank' : undefined}
                          rel={isNewTab ? 'noopener noreferrer' : undefined}
                          onClick={(e) => {
                            // If user clicks the button on the active card, allow navigation;
                            // stop propagation so card click handler doesn't interfere
                            e.stopPropagation()
                          }}
                          className={cn(
                            'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full backdrop-blur-md',
                            'shadow-lg border border-white/20 transition-all duration-300',
                            'hover:scale-[1.03] active:scale-[0.98] group/btn',
                            buttonBg,
                          )}
                        >
                          <span className={cn('tracking-normal', buttonTextCol, buttonSize, buttonWeight)}>
                            {buttonText}
                          </span>
                          <span
                            className={cn(
                              'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                              iconBg,
                            )}
                          >
                            <ArrowUpRight className={cn('w-4 h-4 md:w-5 md:h-5 transition-colors', iconCol)} />
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* ─── INACTIVE CARD CONTENT (Title at bottom) ─────────────── */}
                  <div
                    className={cn(
                      'absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-5 md:p-6 pb-6 md:pb-8',
                      'transition-all duration-500 ease-out flex flex-col justify-end',
                      !isActive
                        ? 'opacity-100 pointer-events-none translate-y-0'
                        : 'opacity-0 pointer-events-none translate-y-4',
                    )}
                  >
                    <div
                      className={cn(
                        'leading-tight tracking-tight drop-shadow-md line-clamp-3 transition-colors',
                        collapsedSize,
                        headingColor,
                        headingWeight,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* ─── Bottom Position Indicators ───────────────────────────────────── */}
          {showIndicators !== false && count > 1 && (
            <div className="mt-6 md:mt-8 flex items-center gap-2 pl-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => handleCardClick(i)}
                  className={cn(
                    'h-1.5 transition-all duration-300 rounded-full focus:outline-none',
                    i === activeIndex
                      ? 'w-7 sm:w-8 bg-slate-900 dark:bg-white'
                      : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400',
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
