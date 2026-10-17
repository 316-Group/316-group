'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export interface GridColItemLink {
  type?: 'custom' | 'reference' | null
  url?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo?: string | null
    value?: any
  } | null
}

export interface GridColFeatureItem {
  id?: string | null
  text: string
  textColor?: string | null
  fontSize?: string | null
  fontWeight?: string | null
  itemLink?: GridColItemLink | null
}

export interface GridColProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null
  reverseLayout?: boolean | null

  // Top Badge
  badgeGroup?: {
    enableBadge?: boolean | null
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontWeight?: string | null
    badgeAlignment?: 'left' | 'center' | 'right' | null
  } | null

  // Top Main Heading
  mainHeadingGroup?: {
    headingText?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingAlignment?: 'left' | 'center' | 'right' | null
    headingTag?: 'h1' | 'h2' | 'h3' | 'div' | null
  } | null

  // Content Column
  contentColumn?: {
    kickerGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontWeight?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    headingGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontWeight?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    descriptionGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontWeight?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    featuresSection?: {
      title?: string | null
      titleColor?: string | null
      titleFontSize?: string | null
      titleFontWeight?: string | null
      titleAlignment?: 'left' | 'center' | 'right' | null
      items?: GridColFeatureItem[] | null
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
      link?: GridColItemLink | null
    } | null
  } | null

  // Image Column
  imageColumn?: {
    image?: MediaType | string | null
    imageRounded?: string | null
    imageHeight?: string | null
    imageFit?: 'cover' | 'contain' | null
  } | null

  className?: string
}

/**
 * Normalizes inline styles, converting <style="color:red"> to <span style="color:red">
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

// Resolve link helper
function resolveHref(linkObj?: GridColItemLink | null): string {
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

export const GridColBlock: React.FC<GridColProps> = ({
  sectionBgColor = 'bg-white',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  reverseLayout = false,
  badgeGroup,
  mainHeadingGroup,
  contentColumn,
  imageColumn,
  className,
}) => {
  const [isInView, setIsInView] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  // Alignment mappings
  const alignWrapperClasses = {
    left: 'flex justify-start text-left',
    center: 'flex justify-center text-center',
    right: 'flex justify-end text-right',
  }

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  // ─── Top Badge ─────────────────────────────────────────────────────────────
  const showBadge = badgeGroup?.enableBadge !== false && Boolean(badgeGroup?.badgeText)
  const badgeText = badgeGroup?.badgeText || 'Financial Technology'
  const badgeBg = badgeGroup?.badgeBgColor || 'bg-[#EFF1F8]'
  const badgeTextCol = badgeGroup?.badgeTextColor || 'text-[#3F5AC9]'
  const badgeSize = badgeGroup?.badgeFontSize || 'text-sm'
  const badgeWeight = badgeGroup?.badgeFontWeight || 'font-medium'
  const badgeAlign = badgeGroup?.badgeAlignment || 'left'

  // ─── Top Main Heading ──────────────────────────────────────────────────────
  const headingText =
    mainHeadingGroup?.headingText ?? 'More <strong>connected ways</strong> to manage and move money.'
  const headingColor = mainHeadingGroup?.headingColor || 'text-gray-900'
  const headingSize = mainHeadingGroup?.headingFontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const headingWeight = mainHeadingGroup?.headingFontWeight || 'font-normal'
  const headingAlign = mainHeadingGroup?.headingAlignment || 'left'
  const HeadingTag = (mainHeadingGroup?.headingTag as keyof React.JSX.IntrinsicElements) || 'h2'

  // ─── Content Column ────────────────────────────────────────────────────────
  const kicker = contentColumn?.kickerGroup
  const kickerText = kicker?.text
  const kickerColor = kicker?.color || 'text-gray-900'
  const kickerSize = kicker?.fontSize || 'text-base md:text-lg'
  const kickerWeight = kicker?.fontWeight || 'font-normal'
  const kickerAlign = kicker?.alignment || 'left'

  const colHeading = contentColumn?.headingGroup
  const colHeadingText = colHeading?.text || 'One account for the world'
  const colHeadingColor = colHeading?.color || 'text-gray-900'
  const colHeadingSize = colHeading?.fontSize || 'text-3xl md:text-4xl lg:text-5xl'
  const colHeadingWeight = colHeading?.fontWeight || 'font-bold'
  const colHeadingAlign = colHeading?.alignment || 'left'

  const desc = contentColumn?.descriptionGroup
  const descText = desc?.text
  const descColor = desc?.color || 'text-gray-700'
  const descSize = desc?.fontSize || 'text-base md:text-lg'
  const descWeight = desc?.fontWeight || 'font-normal'
  const descAlign = desc?.alignment || 'left'

  // Features list
  const features = contentColumn?.featuresSection
  const featuresTitle = features?.title || "What's inside"
  const featuresTitleColor = features?.titleColor || 'text-gray-900'
  const featuresTitleSize = features?.titleFontSize || 'text-lg md:text-xl'
  const featuresTitleWeight = features?.titleFontWeight || 'font-semibold'
  const featuresTitleAlign = features?.titleAlignment || 'left'
  const featureItems = features?.items ?? []

  // Button
  const btn = contentColumn?.buttonGroup
  const showBtn = btn?.showButton !== false && Boolean(btn?.text)
  const btnText = btn?.text || 'Learn more'
  const btnTextCol = btn?.textColor || 'text-gray-900'
  const btnSize = btn?.fontSize || 'text-lg'
  const btnWeight = btn?.fontWeight || 'font-semibold'
  const btnAlign = btn?.alignment || 'left'
  const iconBg = btn?.iconBgColor || 'bg-blue-custom'
  const iconCol = btn?.iconColor || 'text-white'
  const btnHref = resolveHref(btn?.link)
  const btnNewTab = btn?.link?.newTab

  // ─── Image Column ──────────────────────────────────────────────────────────
  const image = imageColumn?.image
  const imageRounded = imageColumn?.imageRounded || 'rounded-[36px]'
  const imageHeight = imageColumn?.imageHeight || 'h-[500px] md:h-[620px] lg:h-[700px]'
  const imageFit = imageColumn?.imageFit === 'contain' ? 'object-contain' : 'object-cover'

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        sectionBgColor || 'bg-white',
        paddingTop || 'pt-16',
        paddingBottom || 'pb-16',
        className,
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        {/* ─── Top Badge ─────────────────────────────────────────────────────── */}
        {showBadge && (
          <div className={cn('w-full mb-6', alignWrapperClasses[badgeAlign])}>
            <span
              className={cn(
                'inline-flex items-center justify-center px-6 py-2 rounded-full tracking-wide transition-all shadow-sm',
                badgeBg,
                badgeTextCol,
                badgeSize,
                badgeWeight,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(badgeText) }}
            />
          </div>
        )}

        {/* ─── Top Main Heading ──────────────────────────────────────────────── */}
        {headingText && (
          <div className={cn('w-full mb-12 md:mb-16 lg:mb-20', textAlignClasses[headingAlign])}>
            <HeadingTag
              className={cn(
                'tracking-tight leading-[1.08] max-w-5xl transition-colors',
                headingSize,
                headingColor,
                headingWeight,
                headingAlign === 'center' && 'mx-auto',
                headingAlign === 'right' && 'ml-auto',
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
            />
          </div>
        )}

        {/* ─── 2-Column Grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Content Column */}
          <div
            className={cn(
              'lg:col-span-6 flex flex-col justify-center',
              reverseLayout ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {/* Small Kicker */}
            {kickerText && (
              <p
                className={cn(
                  'mb-2 transition-colors',
                  kickerSize,
                  kickerColor,
                  kickerWeight,
                  textAlignClasses[kickerAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(kickerText) }}
              />
            )}

            {/* Column Big Heading */}
            {colHeadingText && (
              <h3
                className={cn(
                  'mb-5 tracking-tight leading-[1.14] transition-colors',
                  colHeadingSize,
                  colHeadingColor,
                  colHeadingWeight,
                  textAlignClasses[colHeadingAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(colHeadingText) }}
              />
            )}

            {/* Description Paragraph */}
            {descText && (
              <div
                className={cn(
                  'mb-8 leading-relaxed max-w-xl transition-colors',
                  descSize,
                  descColor,
                  descWeight,
                  textAlignClasses[descAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
              />
            )}

            {/* What's Inside Feature Section */}
            {(featuresTitle || featureItems.length > 0) && (
              <div className="w-full mb-8">
                {featuresTitle && (
                  <h4
                    className={cn(
                      'mb-4 transition-colors',
                      featuresTitleSize,
                      featuresTitleColor,
                      featuresTitleWeight,
                      textAlignClasses[featuresTitleAlign],
                    )}
                  >
                    {featuresTitle}
                  </h4>
                )}

                {/* Items with HR Lines */}
                {featureItems.length > 0 && (
                  <div className="flex flex-col w-full">
                    {featureItems.map((item, idx) => {
                      const itemHref = resolveHref(item.itemLink)
                      const isLink = itemHref !== '#'
                      const isNewTab = item.itemLink?.newTab

                      const itemContent = (
                        <div className="py-3.5 flex items-center justify-between group cursor-pointer transition-colors">
                          <span
                            className={cn(
                              'transition-colors duration-200 group-hover:text-blue-600',
                              item.fontSize || 'text-base md:text-lg',
                              item.textColor || 'text-gray-900',
                              item.fontWeight || 'font-normal',
                            )}
                          >
                            {item.text}
                          </span>
                        </div>
                      )

                      return (
                        <div key={item.id || idx} className="w-full">
                          {isLink ? (
                            <Link
                              href={itemHref}
                              target={isNewTab ? '_blank' : undefined}
                              rel={isNewTab ? 'noopener noreferrer' : undefined}
                              className="block"
                            >
                              {itemContent}
                            </Link>
                          ) : (
                            itemContent
                          )}
                          <hr className="border-slate-200 w-full" />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Action Button: "Learn more" + circle icon (NO border / background on button) */}
            {showBtn && (
              <div className={cn('w-full pt-2 flex', alignWrapperClasses[btnAlign])}>
                <Link
                  href={btnHref}
                  target={btnNewTab ? '_blank' : undefined}
                  rel={btnNewTab ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-3.5 group cursor-pointer transition-all"
                >
                  <span
                    className={cn(
                      'tracking-normal transition-colors duration-200 group-hover:text-blue-600',
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
                      'transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                      iconBg,
                    )}
                  >
                    <ArrowUpRight className={cn('w-5 h-5 transition-colors', iconCol)} />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Image Column */}
          <div
            className={cn(
              'lg:col-span-6 w-full flex justify-center',
              reverseLayout ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <div
              className={cn(
                'relative w-full overflow-hidden shadow-2xl transition-all duration-500',
                imageRounded,
                imageHeight,
              )}
            >
              {image && typeof image === 'object' && (
                <Media
                  resource={image}
                  fill
                  imgClassName={cn('w-full h-full transform transition-transform duration-700 hover:scale-105', imageFit)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const GridColComponent = GridColBlock
