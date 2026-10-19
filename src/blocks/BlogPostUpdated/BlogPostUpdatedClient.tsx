'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Post } from '@/payload-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface SliderSettings {
  showArrows?: boolean | null
  autoSlide?: boolean | null
  autoSlideInterval?: number | null
  slideDirection?: 'ltr' | 'rtl' | null
  slidesToScroll?: '1' | '2' | '3' | null
  showIndicators?: boolean | null
  indicatorsAlignment?: 'left' | 'center' | 'right' | null
}

export interface CardStyling {
  imageSpacingBottom?: string | null
  imageSpacingBottomCustom?: string | null

  categoryGroup?: {
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null

  titleGroup?: {
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null

  descriptionGroup?: {
    maxCharacters?: number | null
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
  } | null

  buttonGroup?: {
    text?: string | null
    textColor?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'left' | 'center' | 'right' | null
    iconBgColor?: string | null
    iconColor?: string | null
  } | null
}

export interface BlogPostUpdatedProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding Mode
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  // Slider
  enableSlider?: boolean | null
  sliderSettings?: SliderSettings | null

  // Card Styling & Spacing
  cardStyling?: CardStyling | null

  // Fetched Posts Docs
  posts?: Post[] | null
  className?: string
}

export const BlogPostUpdatedClient: React.FC<BlogPostUpdatedProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-8',
  paddingBottom = 'pb-16',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  enableSlider = true,
  sliderSettings,
  cardStyling,
  posts,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const [, setSwiperInstance] = useState<SwiperType | null>(null)

  const items = Array.isArray(posts) ? posts : []
  if (items.length === 0) {
    return null
  }

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
    paddingMode === 'custom' || paddingMode === 'none' ? `blogpost-pad-${uid}` : ''

  // ─── Slider Configuration ──────────────────────────────────────────────────
  const showArrows = sliderSettings?.showArrows !== false
  const showIndicators = sliderSettings?.showIndicators !== false
  const isAutoSlide = Boolean(sliderSettings?.autoSlide)
  const autoDelay = sliderSettings?.autoSlideInterval || 4000
  const isRtl = sliderSettings?.slideDirection === 'rtl'
  const desktopScroll = parseInt(sliderSettings?.slidesToScroll || '1', 10)
  const indicatorsAlign = sliderSettings?.indicatorsAlignment || 'left'

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

  // ─── Spacing Resolutions ───────────────────────────────────────────────────
  const resolveSpacing = (selectVal?: string | null, customVal?: string | null, fallback = '16px') => {
    if (selectVal === 'custom') return customVal || fallback
    return selectVal || fallback
  }

  const imageSpacing = resolveSpacing(
    cardStyling?.imageSpacingBottom,
    cardStyling?.imageSpacingBottomCustom,
    '20px',
  )

  const categorySpacing = resolveSpacing(
    cardStyling?.categoryGroup?.spacingBottom,
    cardStyling?.categoryGroup?.spacingBottomCustom,
    '12px',
  )

  const titleSpacing = resolveSpacing(
    cardStyling?.titleGroup?.spacingBottom,
    cardStyling?.titleGroup?.spacingBottomCustom,
    '14px',
  )

  const descSpacing = resolveSpacing(
    cardStyling?.descriptionGroup?.spacingBottom,
    cardStyling?.descriptionGroup?.spacingBottomCustom,
    '16px',
  )

  // ─── Typography & Color Resolutions ────────────────────────────────────────
  const categoryColor = cardStyling?.categoryGroup?.color || 'text-gray-900'
  const categorySize = cardStyling?.categoryGroup?.fontSize || 'text-sm md:text-base'
  const categoryWeight = cardStyling?.categoryGroup?.fontWeight || 'font-normal'
  const categoryAlign = cardStyling?.categoryGroup?.alignment || 'left'

  const titleColor = cardStyling?.titleGroup?.color || 'text-gray-950'
  const titleSize = cardStyling?.titleGroup?.fontSize || 'text-2xl md:text-3xl'
  const titleWeight = cardStyling?.titleGroup?.fontWeight || 'font-semibold'
  const titleAlign = cardStyling?.titleGroup?.alignment || 'left'

  const maxChars = cardStyling?.descriptionGroup?.maxCharacters ?? 160
  const descColor = cardStyling?.descriptionGroup?.color || 'text-gray-600'
  const descSize = cardStyling?.descriptionGroup?.fontSize || 'text-sm md:text-base'
  const descWeight = cardStyling?.descriptionGroup?.fontWeight || 'font-normal'
  const descAlign = cardStyling?.descriptionGroup?.alignment || 'left'

  const btnText = cardStyling?.buttonGroup?.text?.trim() || 'Learn more'
  const btnTextCol = cardStyling?.buttonGroup?.textColor || 'text-gray-950'
  const btnSize = cardStyling?.buttonGroup?.fontSize || 'text-base'
  const btnWeight = cardStyling?.buttonGroup?.fontWeight || 'font-semibold'
  const btnAlign = cardStyling?.buttonGroup?.alignment || 'left'
  const iconBg = cardStyling?.buttonGroup?.iconBgColor || 'bg-blue-custom'
  const iconCol = cardStyling?.buttonGroup?.iconColor || 'text-white'

  // ─── Single Post Card Renderer ─────────────────────────────────────────────
  const renderCard = (post: Post, index: number) => {
    // 1. Post Image
    const postImage = post.hero?.image || (post.meta as any)?.image

    // 2. Category extraction
    let categoryTitle = 'Announcement'
    if (Array.isArray(post.categories) && post.categories.length > 0) {
      const firstCat = post.categories[0]
      if (typeof firstCat === 'object' && firstCat !== null && (firstCat as any).title) {
        categoryTitle = (firstCat as any).title
      }
    }

    // 3. Description with truncation
    const rawDesc = post.hero?.description || (post.meta as any)?.description || ''
    const truncatedDesc =
      rawDesc.length > maxChars && maxChars > 0
        ? `${rawDesc.slice(0, maxChars).trim()}...`
        : rawDesc

    const postHref = `/posts/${post.slug}`

    return (
      <div
        key={post.id || index}
        className="group relative w-full h-full flex flex-col justify-between cursor-pointer select-none"
      >
        <Link href={postHref} className="w-full flex flex-col">
          {/* Top Post Image with Rounded Borders */}
          <div className="relative w-full aspect-[16/10] rounded-[24px] md:rounded-[28px] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm">
            {postImage && typeof postImage === 'object' ? (
              <Media
                resource={postImage}
                fill
                imgClassName="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                priority={false}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900" />
            )}
          </div>

          {/* Spacing below Image */}
          <div style={{ height: imageSpacing }} aria-hidden="true" />

          {/* Announcement / Category */}
          <span
            className={cn(
              'block transition-colors',
              categoryColor,
              categorySize,
              categoryWeight,
              textAlignClasses[categoryAlign],
            )}
          >
            {categoryTitle}
          </span>

          {/* Spacing below Category */}
          <div style={{ height: categorySpacing }} aria-hidden="true" />

          {/* Post Title */}
          <h3
            className={cn(
              'tracking-tight leading-snug transition-colors line-clamp-2',
              titleColor,
              titleSize,
              titleWeight,
              textAlignClasses[titleAlign],
            )}
          >
            {post.title}
          </h3>

          {/* Spacing below Title */}
          <div style={{ height: titleSpacing }} aria-hidden="true" />

          {/* Description */}
          {truncatedDesc && (
            <p
              className={cn(
                'leading-relaxed transition-colors',
                descColor,
                descSize,
                descWeight,
                textAlignClasses[descAlign],
              )}
            >
              {truncatedDesc}
            </p>
          )}

          {/* Spacing below Description */}
          <div style={{ height: descSpacing }} aria-hidden="true" />
        </Link>

        {/* Hover Action Button: Smoothly slides up from bottom into view below description */}
        <div
          className={cn(
            'w-full flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            'opacity-0 translate-y-4 max-h-0 overflow-hidden pointer-events-none',
            'group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-20 group-hover:pointer-events-auto',
            alignWrapperClasses[btnAlign],
          )}
        >
          <Link
            href={postHref}
            className="inline-flex items-center gap-3.5 group/btn cursor-pointer select-none transition-all"
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
                'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                'transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                iconBg,
              )}
            >
              <ArrowUpRight className={cn('w-4 h-4 transition-colors', iconCol)} />
            </span>
          </Link>
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
                  aria-label="Previous posts"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  ref={nextRef}
                  type="button"
                  className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all shadow-sm hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  aria-label="Next posts"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Swiper Carousel: 3 posts full on desktop, 4th partially cut off (3.3), 1 on mobile */}
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
              slidesPerView={1}
              slidesPerGroup={1}
              loop={items.length > 3}
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
                  slidesPerView: 3.3, // Desktop: 3 posts full + 4th cut off
                  slidesPerGroup: desktopScroll,
                  spaceBetween: 28,
                },
              }}
              className={cn(
                'w-full !overflow-visible',
                showIndicators && '!pb-12',
                '[&_.swiper-pagination-bullet]:!w-2.5 [&_.swiper-pagination-bullet]:!h-2.5 [&_.swiper-pagination-bullet]:!bg-gray-400 [&_.swiper-pagination-bullet]:!opacity-40 [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!rounded-full [&_.swiper-pagination-bullet-active]:!bg-blue-600 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination]:!bottom-2',
                indicatorsAlign === 'center' && '[&_.swiper-pagination]:!text-center',
                indicatorsAlign === 'right' && '[&_.swiper-pagination]:!text-right [&_.swiper-pagination]:!pr-2',
                indicatorsAlign === 'left' && '[&_.swiper-pagination]:!text-left [&_.swiper-pagination]:!pl-2',
              )}
            >
              {items.map((post, index) => (
                <SwiperSlide key={post.id || index} className="!h-auto flex">
                  {renderCard(post, index)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          /* ─── STATIC / HORIZONTAL SCROLL MODE (When Slider is OFF) ───────── */
          <div className="w-full overflow-x-auto scrollbar-none flex gap-6 pb-6 pt-2">
            {items.map((post, index) => (
              <div
                key={post.id || index}
                className="shrink-0 w-[85vw] sm:w-[380px] lg:w-[calc((100%-56px)/3.3)]"
              >
                {renderCard(post, index)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
