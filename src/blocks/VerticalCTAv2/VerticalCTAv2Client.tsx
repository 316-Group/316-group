'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'

export interface VerticalCTAv2Props {
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
    buttonTextColor?: string | null
    iconCircleBg?: string | null
    iconColor?: string | null
    buttonAlignment?: 'left' | 'center' | 'right' | null
    buttonFontSize?: string | null
    buttonFontWeight?: string | null
  } | null

  dividerGroup?: {
    enableDivider?: boolean | null
    dividerColor?: string | null
    dividerMarginTop?: string | null
  } | null

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
function resolveHref(linkObj?: VerticalCTAv2Props['buttonGroup'] extends { buttonLink?: infer L } ? L : any): string {
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

export const VerticalCTAv2Client: React.FC<VerticalCTAv2Props> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-8',
  paddingBottom = 'pb-8',
  headingGroup,
  descriptionGroup,
  buttonGroup,
  dividerGroup,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState<boolean>(false)

  useEffect(() => {
    const el = containerRef.current
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
  const headingText = headingGroup?.heading ?? 'Technology that moves businesses forward'
  const headingColor = headingGroup?.headingColor || 'text-gray-950'
  const headingSize = headingGroup?.headingFontSize || 'text-3xl md:text-4xl lg:text-5xl'
  const headingWeight = headingGroup?.headingFontWeight || 'font-bold'
  const headingAlign = headingGroup?.headingAlignment || 'left'

  // Description config
  const descText =
    descriptionGroup?.description ??
    "316 Group's Digital Advisory service helps businesses navigate the complexities of the digital economy. Whether you're scaling a startup, transforming your operations, or exploring new revenue streams by leveraging technology and AI, our experts provide the insights and direction to turn your vision into reality."
  const descColor = descriptionGroup?.descriptionColor || 'text-gray-800'
  const descSize = descriptionGroup?.descriptionFontSize || 'text-base md:text-lg'
  const descWeight = descriptionGroup?.descriptionFontWeight || 'font-normal'
  const descAlign = descriptionGroup?.descriptionAlignment || 'left'

  // Button config
  const showBtn = buttonGroup?.enableButton !== false
  const btnText = buttonGroup?.buttonText || 'Explore our digital advisory solutions'
  const btnHref = resolveHref(buttonGroup?.buttonLink)
  const isNewTab = Boolean(buttonGroup?.buttonLink?.newTab)
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-gray-950'
  const btnSize = buttonGroup?.buttonFontSize || 'text-lg md:text-xl lg:text-2xl'
  const btnWeight = buttonGroup?.buttonFontWeight || 'font-bold'
  const btnAlign = buttonGroup?.buttonAlignment || 'left'
  const iconCircleBg = buttonGroup?.iconCircleBg || 'bg-[#1D4ED8]'
  const iconCol = buttonGroup?.iconColor || 'text-white'

  // Divider config
  const showDivider = dividerGroup?.enableDivider !== false
  const dividerColor = dividerGroup?.dividerColor || 'border-gray-200 dark:border-gray-800'
  const dividerMarginTop = dividerGroup?.dividerMarginTop || 'mt-8 md:mt-10'

  return (
    <div
      ref={containerRef}
      className={cn(
        'w-full flex flex-col relative',
        sectionBgColor || 'bg-transparent',
        paddingTop || 'pt-8',
        paddingBottom || 'pb-8',
        className,
      )}
    >
      {/* 1. Main Heading */}
      {headingText && (
        <h2
          className={cn(
            'w-full tracking-tight leading-[1.15] transition-all',
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

      {/* 2. Description Text */}
      {descText && (
        <p
          className={cn(
            'w-full mt-4 md:mt-6 leading-relaxed max-w-4xl transition-all',
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

      {/* 3. Button / Link (Border-Free Text + Attached Circle Icon Badge) */}
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
              'group/vcta2 inline-flex items-center gap-3.5 transition-all duration-300 select-none py-1',
            )}
          >
            {/* Plain Button Text */}
            <span
              className={cn(
                'tracking-tight transition-all duration-300 group-hover/vcta2:opacity-80',
                btnTextCol,
                btnSize,
                btnWeight,
              )}
            >
              {btnText}
            </span>

            {/* Attached Circle Arrow Badge */}
            <span
              className={cn(
                'w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all duration-300',
                'group-hover/vcta2:scale-105 group-hover/vcta2:shadow-md',
                iconCircleBg,
              )}
            >
              <ArrowUpRight
                className={cn(
                  'w-5 h-5 transition-transform duration-300 group-hover/vcta2:translate-x-0.5 group-hover/vcta2:-translate-y-0.5',
                  iconCol,
                )}
              />
            </span>
          </Link>
        </div>
      )}

      {/* 4. Bottom Divider Line (HR) */}
      {showDivider && (
        <hr
          className={cn(
            'w-full border-t transition-all',
            dividerColor,
            dividerMarginTop,
            isInView
              ? 'opacity-100 duration-1000 ease-out delay-600'
              : 'opacity-0 duration-500 delay-0',
          )}
        />
      )}
    </div>
  )
}
