'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Play,
  Pause,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/utilities/cn'

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface SliderSettings {
  autoScroll?: boolean | null
  scrollInterval?: number | null
  showArrows?: boolean | null
  showIndicators?: boolean | null
  pauseOnHover?: boolean | null
  arrowsColor?: string | null
  arrowsBgColor?: string | null
  arrowsBorderColor?: string | null
  indicatorsActiveColor?: string | null
  indicatorsInactiveColor?: string | null
}

export interface HeaderGroupProps {
  enableHeader?: boolean | null
  heading?: string | null
  headingColor?: string | null
  headingFontSize?: string | null
  headingFontWeight?: string | null
  headingAlignment?: 'left' | 'center' | 'right' | null
  description?: string | null
  descriptionColor?: string | null
  descriptionFontSize?: string | null
  descriptionFontWeight?: string | null
  enableButton?: boolean | null
  buttonText?: string | null
  buttonLink?: {
    type?: 'reference' | 'custom' | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: string | { slug?: string }
    } | null
    url?: string | null
  } | null
  buttonBgColor?: string | null
  buttonTextColor?: string | null
  buttonFontSize?: string | null
  buttonFontWeight?: string | null
  buttonAlignmentDesktop?: 'left' | 'center' | 'right' | null
  buttonAlignmentMobile?: 'left' | 'center' | 'right' | null
  headerSpacingBottom?: string | null
}

export interface FeatureCardsV2Props {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  // 2-Column Header Group
  headerGroup?: HeaderGroupProps | null

  // Slider
  enableSlider?: boolean | null
  sliderSettings?: SliderSettings | null

  // Cards
  cards?: any[] | null

  className?: string
}

// ─── HELPER: Parse inline <style="..."> tags ─────────────────────────────────
function formatInlineHtml(text?: string | null): string {
  if (!text) return ''
  return text.replace(
    /<style="([^"]*)">(.*?)<\/style>/g,
    '<span style="$1">$2</span>',
  )
}

// ─── CLIENT COMPONENT ────────────────────────────────────────────────────────
export const FeatureCardsV2Client: React.FC<FeatureCardsV2Props> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  headerGroup,
  enableSlider = false,
  sliderSettings,
  cards,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  // Intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const items = cards || []
  const autoScroll = sliderSettings?.autoScroll ?? false
  const interval = (sliderSettings?.scrollInterval || 4) * 1000
  const pauseOnHover = sliderSettings?.pauseOnHover ?? true

  // Auto scroll logic
  useEffect(() => {
    if (!enableSlider || !autoScroll || !isPlaying || isPaused || items.length <= 1) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
      return
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [enableSlider, autoScroll, isPlaying, isPaused, items.length, interval])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  // Padding resolution
  const resolvedDesktopPad =
    paddingXDesktop === 'custom'
      ? paddingXDesktopCustom
        ? `${paddingXDesktopCustom}px`
        : '0px'
      : paddingXDesktop || '48px'

  const resolvedMobilePad =
    paddingXMobile === 'custom'
      ? paddingXMobileCustom
        ? `${paddingXMobileCustom}px`
        : '0px'
      : paddingXMobile || '16px'

  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))
  const padClassName =
    paddingMode === 'custom' || paddingMode === 'none' ? `featurecardsv2-pad-${uid}` : ''

  // Text alignment helper
  const textAlignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const contentAlignClasses: Record<string, string> = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  }

  const justifyClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const headerAlignClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center mx-auto',
    right: 'items-end text-right ml-auto',
  }

  const btnDesktopAlignClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const btnMobileAlignClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  // ─── Header Resolution ─────────────────────────────────────────────────────
  const showHeader = Boolean(headerGroup?.enableHeader ?? true)
  const headingText = headerGroup?.heading !== undefined ? headerGroup.heading?.trim() : 'Why 316 group'
  const hasHeading = Boolean(headingText)
  const headingColor = headerGroup?.headingColor || 'text-gray-950'
  const headingSize = headerGroup?.headingFontSize || 'text-3xl md:text-4xl lg:text-5xl'
  const headingWeight = headerGroup?.headingFontWeight || 'font-bold'
  const headingAlign = headerGroup?.headingAlignment || 'left'

  const descText = headerGroup?.description !== undefined
    ? headerGroup.description?.trim()
    : 'We empower businesses with technology, strategic expertise, and future-ready solutions'
  const hasDesc = Boolean(descText)
  const descColor = headerGroup?.descriptionColor || 'text-gray-600'
  const descSize = headerGroup?.descriptionFontSize || 'text-base md:text-lg'
  const descWeight = headerGroup?.descriptionFontWeight || 'font-normal'

  const buttonText = headerGroup?.buttonText !== undefined ? headerGroup.buttonText?.trim() : 'Book a session'
  const hasButton = headerGroup?.enableButton !== false && Boolean(buttonText)
  const btnBg = headerGroup?.buttonBgColor || 'bg-[#1D4ED8]'
  const btnTextCol = headerGroup?.buttonTextColor || 'text-white'
  const btnSize = headerGroup?.buttonFontSize || 'text-sm md:text-base'
  const btnWeight = headerGroup?.buttonFontWeight || 'font-semibold'
  const btnAlignDesktop = headerGroup?.buttonAlignmentDesktop || 'right'
  const btnAlignMobile = headerGroup?.buttonAlignmentMobile || 'left'
  const headerSpacing = headerGroup?.headerSpacingBottom || 'mb-10 md:mb-14'

  const resolveHeaderHref = (linkObj?: HeaderGroupProps['buttonLink']): string | null => {
    if (!linkObj) return null
    if (linkObj.type === 'custom' && linkObj.url) return linkObj.url
    if (linkObj.type === 'reference' && linkObj.reference?.value) {
      const val = linkObj.reference.value
      if (typeof val === 'object' && val.slug) {
        const rel = linkObj.reference.relationTo
        if (rel === 'pages') return val.slug === 'home' ? '/' : `/${val.slug}`
        return `/${rel}/${val.slug}`
      } else if (typeof val === 'string') {
        return `/${val}`
      }
    }
    return null
  }

  const btnHref = resolveHeaderHref(headerGroup?.buttonLink)
  const isNewTab = Boolean(headerGroup?.buttonLink?.newTab)

  const renderButton = () => {
    if (!hasButton) return null

    const btnClasses = cn(
      'inline-flex items-center justify-center px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center',
      btnBg,
      btnTextCol,
      btnSize,
      btnWeight,
    )

    if (btnHref) {
      return (
        <Link
          href={btnHref}
          target={isNewTab ? '_blank' : undefined}
          rel={isNewTab ? 'noopener noreferrer' : undefined}
          className={btnClasses}
        >
          {buttonText}
        </Link>
      )
    }

    return (
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className={btnClasses}
      >
        {buttonText}
      </a>
    )
  }

  // Stagger delay mapping for 3 cards per row
  const delayClasses = ['delay-[150ms]', 'delay-[300ms]', 'delay-[450ms]']

  const renderCard = (card: any, index: number) => {
    const cardBgColor = card.cardBgColor || 'bg-white'
    const cardBorderColor = card.cardBorderColor || 'border-gray-100'
    const cardBorderRadius = card.cardBorderRadius || 'rounded-2xl'
    const cardPadding = card.cardPadding || 'p-6 md:p-8'
    const contentAlign = card.contentAlignment || 'left'
    const cardMinHeight = card.cardMinHeight || 'min-h-[380px]'

    // Image
    const showImage = Boolean(card.showImage && card.image)
    const imageSize = card.imageSize || 'w-14 h-14'
    const imageRadius = card.imageRadius || 'rounded-xl'
    const imageSpacing = card.imageSpacingBottom || 'mb-6'

    // Kicker
    const kickerText = card.kickerText?.trim()
    const kickerColor = card.kickerColor || 'text-blue-600'
    const kickerSize = card.kickerFontSize || 'text-xs md:text-sm'
    const kickerWeight = card.kickerFontWeight || 'font-semibold'
    const kickerSpacing = card.kickerSpacingBottom || 'mb-2'

    // Heading
    const headingCardText = card.heading?.trim()
    const headingCardColor = card.headingColor || 'text-gray-950'
    const headingCardSize = card.headingFontSize || 'text-xl md:text-2xl'
    const headingCardWeight = card.headingFontWeight || 'font-bold'
    const headingCardSpacing = card.headingSpacingBottom || 'mb-4'

    // Description
    const cardDescText = card.description?.trim()
    const cardDescColor = card.descriptionColor || 'text-gray-600'
    const cardDescSize = card.descriptionFontSize || 'text-sm md:text-base'
    const cardDescWeight = card.descriptionFontWeight || 'font-normal'

    // Link resolution
    let cardHref: string | null = null
    let cardIsNewTab = false
    if (card.link) {
      if (card.link.type === 'custom' && card.link.url) {
        cardHref = card.link.url
      } else if (card.link.type === 'reference' && card.link.reference?.value) {
        const val = card.link.reference.value
        if (typeof val === 'object' && val.slug) {
          const rel = card.link.reference.relationTo
          if (rel === 'pages') {
            cardHref = val.slug === 'home' ? '/' : `/${val.slug}`
          } else {
            cardHref = `/${rel}/${val.slug}`
          }
        } else if (typeof val === 'string') {
          cardHref = `/${val}`
        }
      }
      cardIsNewTab = Boolean(card.link.newTab)
    }

    const staggerClass = delayClasses[index % 3]

    return (
      <div
        key={card.id || index}
        className={cn(
          'group relative flex flex-col justify-between overflow-hidden border transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl',
          cardBgColor,
          cardBorderColor,
          cardBorderRadius,
          cardPadding,
          cardMinHeight,
          // Entrance Animation
          'opacity-0 translate-y-8',
          inView && 'opacity-100 translate-y-0',
          staggerClass,
        )}
      >
        {/* Full Card Clickable overlay if link provided */}
        {cardHref && (
          <Link
            href={cardHref}
            target={cardIsNewTab ? '_blank' : undefined}
            rel={cardIsNewTab ? 'noopener noreferrer' : undefined}
            className="absolute inset-0 z-20"
            aria-label={headingCardText || kickerText || 'Card Link'}
          />
        )}

        <div
          className={cn(
            'flex flex-col w-full h-full justify-between',
            contentAlignClasses[contentAlign],
          )}
        >
          {/* Top Section: Image / Icon + Kicker */}
          <div className={cn('flex flex-col w-full', contentAlignClasses[contentAlign])}>
            {/* Image / Icon */}
            {showImage && (
              <div
                className={cn(
                  'relative overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105',
                  imageSize,
                  imageRadius,
                  imageSpacing,
                  justifyClasses[contentAlign],
                )}
              >
                {typeof card.image === 'object' && (
                  <Media
                    resource={card.image as MediaType}
                    fill
                    imgClassName="object-contain w-full h-full"
                  />
                )}
              </div>
            )}

            {/* Kicker */}
            {kickerText && (
              <div
                className={cn(
                  'tracking-wide uppercase transition-colors',
                  kickerSize,
                  kickerColor,
                  kickerWeight,
                  kickerSpacing,
                  textAlignClasses[contentAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(kickerText) }}
              />
            )}
          </div>

          {/* Bottom Section: Heading + Description */}
          <div className={cn('flex flex-col w-full mt-auto', contentAlignClasses[contentAlign])}>
            {/* Heading */}
            {headingCardText && (
              <h3
                className={cn(
                  'leading-snug tracking-tight transition-colors',
                  headingCardSize,
                  headingCardColor,
                  headingCardWeight,
                  headingCardSpacing,
                  textAlignClasses[contentAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingCardText) }}
              />
            )}

            {/* Description */}
            {cardDescText && (
              <div
                className={cn(
                  'leading-relaxed transition-colors',
                  cardDescSize,
                  cardDescColor,
                  cardDescWeight,
                  textAlignClasses[contentAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(cardDescText) }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full relative transition-colors duration-200',
        sectionBgColor || 'bg-transparent',
        paddingTop || 'pt-16',
        paddingBottom || 'pb-16',
        className,
      )}
    >
      {padClassName && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad || '0px'};
            padding-right: ${resolvedMobilePad || '0px'};
          }
          @media (min-width: 768px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad || '0px'};
              padding-right: ${resolvedDesktopPad || '0px'};
            }
          }
        `}</style>
      )}
      <div
        className={cn(
          (!paddingMode || paddingMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl',
          paddingMode === 'none' && 'w-full max-w-none px-0',
          paddingMode === 'custom' && cn('w-full max-w-none', padClassName),
        )}
      >
        {/* ─── OPTIONAL 2-COLUMN HEADER SECTION ──────────────────────────────── */}
        {showHeader && (
          <div
            className={cn(
              'w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6',
              headerSpacing,
            )}
          >
            {/* Left Column: Heading + Description */}
            <div
              className={cn(
                'w-full lg:col-span-8 flex flex-col',
                headerAlignClasses[headingAlign],
              )}
            >
              {hasHeading && (
                <h2
                  className={cn(
                    'tracking-tight leading-[1.12] transition-colors',
                    headingSize,
                    headingColor,
                    headingWeight,
                    textAlignClasses[headingAlign],
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
                />
              )}
              {hasDesc && (
                <p
                  className={cn(
                    'mt-3 md:mt-4 leading-relaxed max-w-2xl transition-colors',
                    descSize,
                    descColor,
                    descWeight,
                    textAlignClasses[headingAlign],
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
                />
              )}
            </div>

            {/* Desktop Right Column: Button (hidden on mobile) */}
            {hasButton && (
              <div
                className={cn(
                  'hidden lg:flex lg:col-span-4 w-full items-center',
                  btnDesktopAlignClasses[btnAlignDesktop],
                )}
              >
                {renderButton()}
              </div>
            )}
          </div>
        )}

        {/* ─── SLIDER MODE ────────────────────────────────────────────────────── */}
        {enableSlider ? (
          <div className="w-full relative">
            <div
              ref={sliderRef}
              onMouseEnter={() => pauseOnHover && setIsPaused(true)}
              onMouseLeave={() => pauseOnHover && setIsPaused(false)}
              className="relative overflow-hidden w-full"
            >
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {items.map((card, index) => (
                  <div key={card.id || index} className="w-full shrink-0 px-2 sm:px-3 md:px-4">
                    {renderCard(card, index)}
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Controls */}
            {items.length > 1 && (
              <div className="mt-8 flex items-center justify-between">
                {/* Indicators / Dots */}
                {sliderSettings?.showIndicators !== false && (
                  <div className="flex items-center gap-2">
                    {items.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => setCurrentIndex(dotIdx)}
                        className={cn(
                          'h-2.5 rounded-full transition-all duration-300',
                          currentIndex === dotIdx
                            ? cn(
                                'w-8',
                                sliderSettings?.indicatorsActiveColor || 'bg-blue-600',
                              )
                            : cn(
                                'w-2.5',
                                sliderSettings?.indicatorsInactiveColor || 'bg-gray-300',
                              ),
                        )}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Arrow Controls */}
                {sliderSettings?.showArrows !== false && (
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-95',
                        sliderSettings?.arrowsBgColor || 'bg-white',
                        sliderSettings?.arrowsColor || 'text-gray-900',
                        sliderSettings?.arrowsBorderColor || 'border-gray-200',
                      )}
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 active:scale-95',
                        sliderSettings?.arrowsBgColor || 'bg-white',
                        sliderSettings?.arrowsColor || 'text-gray-900',
                        sliderSettings?.arrowsBorderColor || 'border-gray-200',
                      )}
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ─── GRID MODE ─────────────────────────────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {items.map((card, index) => renderCard(card, index))}
          </div>
        )}

        {/* ─── MOBILE BOTTOM ACTION BUTTON (Below Cards) ────────────────────── */}
        {showHeader && hasButton && (
          <div
            className={cn(
              'flex lg:hidden mt-8 sm:mt-10 w-full items-center',
              btnMobileAlignClasses[btnAlignMobile],
            )}
          >
            {renderButton()}
          </div>
        )}
      </div>
    </section>
  )
}
