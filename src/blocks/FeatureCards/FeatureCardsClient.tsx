'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

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
    subtitleFontWeight?: string | null
    subtitleAlignment?: 'left' | 'center' | 'right' | null
  } | null

  headingGroup?: {
    heading: string
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
}

export interface FeatureCardsProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null
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
  cards,
  className,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        {/* ─── 3-Column Responsive Grid ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {items.map((card, index) => {
            const cardBg = card.cardBgColor || 'bg-white'
            const iconBadgeBg = card.iconGroup?.iconCardBgColor || 'bg-[#EFF2FE]'
            const iconAlign = card.iconGroup?.iconAlignment || 'left'

            const subtitleText = card.subtitleGroup?.subtitle || ''
            const subtitleColor = card.subtitleGroup?.subtitleColor || 'text-gray-950'
            const subtitleSize = card.subtitleGroup?.subtitleFontSize || 'text-base'
            const subtitleWeight = card.subtitleGroup?.subtitleFontWeight || 'font-normal'
            const subtitleAlign = card.subtitleGroup?.subtitleAlignment || 'left'

            const headingText = card.headingGroup?.heading || ''
            const headingColor = card.headingGroup?.headingColor || 'text-gray-950'
            const headingSize = card.headingGroup?.headingFontSize || 'text-2xl md:text-[1.65rem]'
            const headingWeight = card.headingGroup?.headingFontWeight || 'font-bold'
            const headingAlign = card.headingGroup?.headingAlignment || 'left'

            const descText = card.descriptionGroup?.description || ''
            const descColor = card.descriptionGroup?.descriptionColor || 'text-gray-600'
            const descSize = card.descriptionGroup?.descriptionFontSize || 'text-sm md:text-base'
            const descWeight = card.descriptionGroup?.descriptionFontWeight || 'font-normal'
            const descAlign = card.descriptionGroup?.descriptionAlignment || 'left'

            const staggerDelay = delayClasses[index % 3]

            return (
              <div
                key={card.id || index}
                className={cn(
                  'rounded-[28px] p-7 sm:p-8 md:p-9 lg:p-10 flex flex-col justify-start',
                  'border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]',
                  'transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  cardBg,
                  staggerDelay,
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
                      subtitleSize,
                      subtitleColor,
                      subtitleWeight,
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
                      headingSize,
                      headingColor,
                      headingWeight,
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
                      descSize,
                      descColor,
                      descWeight,
                      textAlignClasses[descAlign],
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
