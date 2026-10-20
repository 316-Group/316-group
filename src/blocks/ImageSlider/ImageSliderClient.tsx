'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface ImageSliderCardItem {
  id?: string | null
  image?: MediaType | string | null

  titleGroup?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null

  titleSpacingBottom?: string | null
  titleSpacingBottomCustom?: string | null

  descriptionGroup?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null

  buttonGroup?: {
    showButton?: boolean | null
    text?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
    iconBgColor?: string | null
    iconColor?: string | null
    link?: {
      type?: 'reference' | 'custom' | null
      newTab?: boolean | null
      reference?: {
        relationTo?: string | null
        value?: any
      } | null
      url?: string | null
    } | null
  } | null
}

export interface SliderSettings {
  showArrows?: boolean | null
  showIndicators?: boolean | null
  autoSlide?: boolean | null
  autoSlideInterval?: number | null
  slidesToScroll?: '1' | '2' | '3' | null
}

export interface ImageSliderProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding Mode
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingSide?: 'both' | 'left' | 'right' | 'split' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null
  paddingLeftDesktop?: string | null
  paddingLeftDesktopCustom?: string | null
  paddingRightDesktop?: string | null
  paddingRightDesktopCustom?: string | null
  paddingLeftMobile?: string | null
  paddingLeftMobileCustom?: string | null
  paddingRightMobile?: string | null
  paddingRightMobileCustom?: string | null

  // Slider Settings
  enableSlider?: boolean | null
  sliderSettings?: SliderSettings | null

  cards?: ImageSliderCardItem[] | null
  className?: string
}

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const ImageSliderClient: React.FC<ImageSliderProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-8',
  paddingBottom = 'pb-16',
  paddingMode = 'default',
  paddingSide = 'both',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  paddingLeftDesktop,
  paddingLeftDesktopCustom,
  paddingRightDesktop,
  paddingRightDesktopCustom,
  paddingLeftMobile,
  paddingLeftMobileCustom,
  paddingRightMobile,
  paddingRightMobileCustom,
  enableSlider = true,
  sliderSettings,
  cards,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [, setSwiperInstance] = useState<SwiperType | null>(null)

  const items = Array.isArray(cards) ? cards : []
  if (items.length === 0) {
    return null
  }

  // ─── Layout & Spacing Resolution ───────────────────────────────────────────
  const resolvePadVal = (sel?: string | null, custom?: string | null, fallback = '0px') => {
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

  const padClassName =
    paddingMode === 'custom' || paddingMode === 'none' ? `imageslider-pad-${uid}` : ''

  // ─── Slider Settings Resolution ────────────────────────────────────────────
  const showArrows = sliderSettings?.showArrows !== false
  const showIndicators = sliderSettings?.showIndicators !== false
  const isAutoSlide = Boolean(sliderSettings?.autoSlide)
  const autoDelay = sliderSettings?.autoSlideInterval || 4000
  const desktopScroll = parseInt(sliderSettings?.slidesToScroll || '1', 10)

  // Alignment classes
  const textAlignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  const alignWrapperClasses: Record<string, string> = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  // ─── Single Card Renderer ──────────────────────────────────────────────────
  const renderCard = (card: ImageSliderCardItem, index: number) => {
    const image = card.image

    // Title
    const titleText = card.titleGroup?.text?.trim()
    const hasTitle = Boolean(titleText)
    const titleColor = card.titleGroup?.color || 'text-white'
    const titleSize = card.titleGroup?.fontSize || 'text-2xl md:text-3xl'
    const titleWeight = card.titleGroup?.fontWeight || 'font-semibold'
    const titleAlign = card.titleGroup?.alignment || 'left'

    // Spacing bottom between title & description
    const spacingSelect = card.titleSpacingBottom || '12px'
    const resolvedTitleSpacing =
      spacingSelect === 'custom'
        ? card.titleSpacingBottomCustom || '12px'
        : spacingSelect

    // Description
    const descText = card.descriptionGroup?.text?.trim()
    const hasDesc = Boolean(descText)
    const descColor = card.descriptionGroup?.color || 'text-white/80'
    const descSize = card.descriptionGroup?.fontSize || 'text-sm md:text-base'
    const descWeight = card.descriptionGroup?.fontWeight || 'font-normal'
    const descAlign = card.descriptionGroup?.alignment || 'left'

    // Action Button
    const btn = card.buttonGroup
    const showBtn = btn?.showButton !== false && Boolean(btn?.text?.trim())
    const btnText = btn?.text?.trim() || 'Learn more'
    const btnTextCol = btn?.textColor || 'text-white'
    const btnSize = btn?.fontSize || 'text-base'
    const btnWeight = btn?.fontWeight || 'font-semibold'
    const btnAlign = btn?.alignment || 'left'
    const iconBg = btn?.iconBgColor || 'bg-white'
    const iconCol = btn?.iconColor || 'text-gray-900'

    let btnHref = '#'
    const rawLink = btn?.link
    if (rawLink) {
      if (rawLink.type === 'custom' && rawLink.url) {
        btnHref = rawLink.url
      } else if (rawLink.type === 'reference' && rawLink.reference?.value) {
        const val = rawLink.reference.value
        const slug = typeof val === 'object' && val !== null ? val.slug : val
        btnHref = slug === 'home' ? '/' : `/${slug}`
      }
    }
    const btnNewTab = rawLink?.newTab

    return (
      <div
        key={card.id || index}
        className={cn(
          'group relative w-full h-[460px] md:h-[500px] lg:h-[520px] rounded-[32px] overflow-hidden flex flex-col justify-end p-7 md:p-8',
          'transition-all duration-500 shadow-md hover:shadow-xl bg-slate-900',
        )}
      >
        {/* Background Uploaded Image */}
        {image && typeof image === 'object' && (
          <Media
            resource={image}
            fill
            imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
            priority={false}
            loading="lazy"
          />
        )}

        {/* Multi-Stop Gradient Overlay for text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Bottom Content Area */}
        <div className="relative z-10 w-full flex flex-col transition-all duration-500 ease-out">
          {/* Title */}
          {hasTitle && (
            <h3
              className={cn(
                'tracking-tight leading-tight transition-colors',
                titleColor,
                titleSize,
                titleWeight,
                textAlignClasses[titleAlign],
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(titleText) }}
            />
          )}

          {/* Spacing between Title and Description */}
          {hasTitle && hasDesc && (
            <div style={{ height: resolvedTitleSpacing }} aria-hidden="true" />
          )}

          {/* Description */}
          {hasDesc && (
            <div
              className={cn(
                'leading-relaxed transition-colors',
                descColor,
                descSize,
                descWeight,
                textAlignClasses[descAlign],
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
            />
          )}

          {/* Hover Action Button: Slides up slowly from bottom into view below description */}
          {showBtn && (
            <div
              className={cn(
                'w-full pt-4 flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                'opacity-0 translate-y-6 max-h-0 overflow-hidden pointer-events-none',
                'group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-24 group-hover:pointer-events-auto',
                alignWrapperClasses[btnAlign],
              )}
            >
              <Link
                href={btnHref}
                target={btnNewTab ? '_blank' : undefined}
                rel={btnNewTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-3.5 cursor-pointer select-none transition-all group/btn"
              >
                <span
                  className={cn(
                    'tracking-normal transition-colors duration-200 group-hover/btn:opacity-90',
                    btnTextCol,
                    btnSize,
                    btnWeight,
                  )}
                >
                  {btnText}
                </span>
                <span
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                    'transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                    iconBg,
                  )}
                >
                  <ArrowUpRight className={cn('w-5 h-5 transition-colors', iconCol)} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor, className)}
    >
      {/* Dynamic Custom Horizontal Padding Overrides */}
      {(paddingMode === 'custom' || paddingMode === 'none') && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePadLeft} !important;
            padding-right: ${resolvedMobilePadRight} !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @media (min-width: 1024px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPadLeft} !important;
              padding-right: ${resolvedDesktopPadRight} !important;
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          'w-full',
          paddingTop,
          paddingBottom,
          paddingMode === 'default' && 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
          padClassName,
        )}
      >
        {enableSlider ? (
          /* ─── SLIDER CAROUSEL MODE ────────────────────────────────────────── */
          <div className="w-full flex flex-col">
            {/* Top Navigation Arrows: Positioned at Top-Right End */}
            {showArrows && (
              <div className="w-full flex justify-end items-center gap-3 mb-6">
                <button
                  ref={prevRef}
                  type="button"
                  className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Swiper: Desktop shows 3 cards and 4th partially cut off (3.3), Mobile shows 1 card */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              onSwiper={setSwiperInstance}
              onBeforeInit={(swiper) => {
                // @ts-expect-error navigation
                swiper.params.navigation.prevEl = prevRef.current
                // @ts-expect-error navigation
                swiper.params.navigation.nextEl = nextRef.current
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              spaceBetween={20}
              slidesPerView={1}
              slidesPerGroup={1}
              loop={items.length > 3}
              autoplay={
                isAutoSlide
                  ? {
                      delay: autoDelay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              pagination={
                showIndicators
                  ? {
                      clickable: true,
                    }
                  : false
              }
              breakpoints={{
                640: {
                  slidesPerView: 1.25,
                  slidesPerGroup: 1,
                  spaceBetween: 22,
                },
                768: {
                  slidesPerView: 2.15,
                  slidesPerGroup: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2.5,
                  slidesPerGroup: 1,
                  spaceBetween: 26,
                },
                1280: {
                  slidesPerView: 3.3, // Desktop: 3 cards showing + 4th cut off
                  slidesPerGroup: desktopScroll,
                  spaceBetween: 28,
                },
              }}
              className={cn(
                'w-full !overflow-visible',
                showIndicators && '!pb-12',
                '[&_.swiper-pagination-bullet]:!w-2.5 [&_.swiper-pagination-bullet]:!h-2.5 [&_.swiper-pagination-bullet]:!bg-gray-400 [&_.swiper-pagination-bullet]:!opacity-40 [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-blue-600 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination]:!bottom-2',
              )}
            >
              {items.map((card, index) => (
                <SwiperSlide key={card.id || index} className="!h-auto flex">
                  {renderCard(card, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          /* ─── STATIC / HORIZONTAL SCROLL MODE (When Slider is OFF) ───────── */
          <div className="w-full overflow-x-auto scrollbar-none flex gap-6 pb-6 pt-2">
            {items.map((card, index) => (
              <div
                key={card.id || index}
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[calc((100%-56px)/3.3)]"
              >
                {renderCard(card, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
