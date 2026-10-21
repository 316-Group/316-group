'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { resolveTypography } from '@/utilities/resolveTypography'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface FeatureCardItem {
  id?: string | null
  cardBgColor?: string | null

  iconGroup?: {
    icon?: MediaType | string | null
    iconCardBgColor?: string | null
    iconAlignment?: 'left' | 'center' | 'right' | null
  } | null

  subtitleGroup?: {
    subtitle?: string | null
    subtitleColor?: string | null
    subtitleFontSize?: string | null
    subtitleFontSizeMobile?: string | null
    subtitleFontWeight?: string | null
    subtitleFontWeightMobile?: string | null
    subtitleAlignment?: 'left' | 'center' | 'right' | null
  } | null

  headingGroup?: {
    heading: string
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
}

export interface SliderSettings {
  slidesToShowDesktop?: '1' | '2' | '3' | '4' | 'custom' | null
  slidesToShowDesktopCustom?: number | null
  slidesToShowMobile?: '1' | '1.2' | '1.5' | '2' | 'custom' | null
  slidesToShowMobileCustom?: number | null
  slidesToScrollDesktop?: '1' | '2' | '3' | '4' | null
  slidesToScrollMobile?: '1' | '2' | null
  autoSlide?: boolean | null
  autoSlideInterval?: number | null
  slideDirection?: 'ltr' | 'rtl' | null
  showArrows?: boolean | null
  showIndicators?: boolean | null
}

export interface FeatureCardsProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  // Slider
  enableSlider?: boolean | null
  sliderSettings?: SliderSettings | null

  cards?: FeatureCardItem[] | null
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

export const FeatureCardsClient: React.FC<FeatureCardsProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  enableSlider = false,
  sliderSettings,
  cards,
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [isInView, setIsInView] = useState<boolean>(false)
  const uid = React.useId().replace(/:/g, '')

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

  const items = Array.isArray(cards) ? cards : []

  if (items.length === 0) {
    return null
  }

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

  const padClassName =
    paddingMode === 'custom' || paddingMode === 'none' ? `featurecards-pad-${uid}` : ''

  // ─── Slider Configuration Resolution ───────────────────────────────────────
  const desktopSlides =
    sliderSettings?.slidesToShowDesktop === 'custom'
      ? sliderSettings?.slidesToShowDesktopCustom || 4
      : parseFloat(sliderSettings?.slidesToShowDesktop || '4')

  const mobileSlides =
    sliderSettings?.slidesToShowMobile === 'custom'
      ? sliderSettings?.slidesToShowMobileCustom || 1
      : parseFloat(sliderSettings?.slidesToShowMobile || '1')

  const desktopScroll = parseInt(sliderSettings?.slidesToScrollDesktop || '1', 10)
  const mobileScroll = parseInt(sliderSettings?.slidesToScrollMobile || '1', 10)

  const isAutoSlide = Boolean(sliderSettings?.autoSlide)
  const autoDelay = sliderSettings?.autoSlideInterval || 4000
  const isRtl = sliderSettings?.slideDirection === 'rtl'

  const showArrows = sliderSettings?.showArrows !== false
  const showIndicators = sliderSettings?.showIndicators !== false

  // Alignment helpers
  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  const iconAlignWrapperClasses = {
    left: 'flex justify-start',
    center: 'flex justify-center',
    right: 'flex justify-end',
  }

  // Stagger delay mapping for 3 cards per row
  const delayClasses = ['delay-[150ms]', 'delay-[300ms]', 'delay-[450ms]']

  // ─── Single Card Item Renderer ─────────────────────────────────────────────
  const renderCard = (card: FeatureCardItem, index: number) => {
    const cardBg = card.cardBgColor || 'bg-white'
    const iconBadgeBg = card.iconGroup?.iconCardBgColor || 'bg-[#EFF2FE]'
    const iconAlign = card.iconGroup?.iconAlignment || 'left'

    const subtitleText = card.subtitleGroup?.subtitle || ''
    const subtitleColor = card.subtitleGroup?.subtitleColor || 'text-gray-950'
    const subtitleTypography = resolveTypography(
      card.subtitleGroup?.subtitleFontSize,
      card.subtitleGroup?.subtitleFontSizeMobile,
      card.subtitleGroup?.subtitleFontWeight,
      card.subtitleGroup?.subtitleFontWeightMobile,
      'text-base',
      'font-normal',
    )
    const subtitleAlign = card.subtitleGroup?.subtitleAlignment || 'left'

    const headingText = card.headingGroup?.heading || ''
    const headingColor = card.headingGroup?.headingColor || 'text-gray-950'
    const headingTypography = resolveTypography(
      card.headingGroup?.headingFontSize,
      card.headingGroup?.headingFontSizeMobile,
      card.headingGroup?.headingFontWeight,
      card.headingGroup?.headingFontWeightMobile,
      'text-2xl md:text-[1.65rem]',
      'font-bold',
    )
    const headingAlign = card.headingGroup?.headingAlignment || 'left'

    const descText = card.descriptionGroup?.description || ''
    const descColor = card.descriptionGroup?.descriptionColor || 'text-gray-600'
    const descTypography = resolveTypography(
      card.descriptionGroup?.descriptionFontSize,
      card.descriptionGroup?.descriptionFontSizeMobile,
      card.descriptionGroup?.descriptionFontWeight,
      card.descriptionGroup?.descriptionFontWeightMobile,
      'text-sm md:text-base',
      'font-normal',
    )
    const descAlign = card.descriptionGroup?.descriptionAlignment || 'left'

    const staggerDelay = delayClasses[index % 3]

    return (
      <div
        key={card.id || index}
        className={cn(
          'w-full h-full rounded-[28px] p-7 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-start',
          'border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]',
          'transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          cardBg,
          !enableSlider && staggerDelay,
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        )}
      >
        {/* ─── Icon Area ──────────────────────────────────────────────── */}
        {card.iconGroup && (
          <div className={cn('w-full mb-6 md:mb-8', iconAlignWrapperClasses[iconAlign])}>
            <div
              className={cn(
                'w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center p-3 shrink-0 shadow-sm transition-transform duration-300 hover:scale-105',
                iconBadgeBg,
              )}
            >
              {card.iconGroup.icon && typeof card.iconGroup.icon === 'object' && (
                <Media
                  resource={card.iconGroup.icon}
                  imgClassName="w-full h-full object-contain"
                  priority={false}
                  loading="lazy"
                />
              )}
              {card.iconGroup.icon && typeof card.iconGroup.icon === 'string' && (
                <img
                  src={card.iconGroup.icon}
                  alt={headingText || 'Feature Icon'}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}

        {/* ─── Subtitle / Pre-Heading (e.g. "Future proof") ────────────── */}
        {subtitleText && (
          <div
            className={cn(
              'leading-snug transition-colors mb-2 md:mb-2.5',
              subtitleTypography.combined,
              subtitleColor,
              textAlignClasses[subtitleAlign],
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(subtitleText) }}
          />
        )}

        {/* ─── Heading ────────────────────────────────────────────────── */}
        {headingText && (
          <h3
            className={cn(
              'tracking-tight leading-snug transition-colors mb-3 md:mb-4',
              headingTypography.combined,
              headingColor,
              textAlignClasses[headingAlign],
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
          />
        )}

        {/* ─── Description ────────────────────────────────────────────── */}
        {descText && (
          <div
            className={cn(
              'leading-relaxed transition-colors',
              descTypography.combined,
              descColor,
              textAlignClasses[descAlign],
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
          />
        )}
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
        {/* ─── SLIDER MODE ────────────────────────────────────────────────────── */}
        {enableSlider ? (
          <div className="w-full relative">
            {/* Navigation Arrows positioned at top-right end */}
            {showArrows && items.length > 1 && (
              <div className="w-full flex justify-end items-center gap-3 mb-6">
                <button
                  ref={prevRef}
                  onClick={() => swiperInstance?.slidePrev()}
                  className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  ref={nextRef}
                  onClick={() => swiperInstance?.slideNext()}
                  className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Swiper Carousel */}
            <Swiper
              dir={isRtl ? 'rtl' : 'ltr'}
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
              slidesPerView={mobileSlides}
              slidesPerGroup={mobileScroll}
              loop={items.length > desktopSlides}
              autoplay={
                isAutoSlide
                  ? {
                      delay: autoDelay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                      reverseDirection: isRtl,
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
                  slidesPerView: Math.min(2, desktopSlides),
                  slidesPerGroup: Math.min(2, desktopScroll),
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: Math.min(3, desktopSlides),
                  slidesPerGroup: Math.min(3, desktopScroll),
                  spaceBetween: 28,
                },
                1280: {
                  slidesPerView: desktopSlides,
                  slidesPerGroup: desktopScroll,
                  spaceBetween: 32,
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
          /* ─── STATIC GRID MODE (Default) ─────────────────────────────────── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {items.map((card, index) => renderCard(card, index))}
          </div>
        )}
      </div>
    </section>
  )
}
