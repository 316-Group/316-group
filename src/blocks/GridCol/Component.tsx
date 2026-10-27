'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

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
  fontSizeMobile?: string | null
  fontWeight?: string | null
  fontWeightMobile?: string | null
  itemLink?: GridColItemLink | null
}

export interface GridColProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null
  reverseLayout?: boolean | null

  // Layout & Spacing Controls
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  columnGap?: string | null
  columnGapCustom?: string | null

  // Top Badge
  badgeGroup?: {
    enableBadge?: boolean | null
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontSizeMobile?: string | null
    badgeFontWeight?: string | null
    badgeFontWeightMobile?: string | null
    badgeAlignment?: 'left' | 'center' | 'right' | null
  } | null

  // Top Main Heading
  mainHeadingGroup?: {
    headingText?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    headingAlignment?: 'left' | 'center' | 'right' | null
    headingTag?: 'h1' | 'h2' | 'h3' | 'div' | null
  } | null

  // Content Column
  contentColumn?: {
    kickerGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    headingGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    descriptionGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
      alignment?: 'left' | 'center' | 'right' | null
    } | null

    featuresSection?: {
      title?: string | null
      titleColor?: string | null
      titleFontSize?: string | null
      titleFontSizeMobile?: string | null
      titleFontWeight?: string | null
      titleFontWeightMobile?: string | null
      titleAlignment?: 'left' | 'center' | 'right' | null
      items?: GridColFeatureItem[] | null
    } | null

    buttonGroup?: {
      showButton?: boolean | null
      text?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontSizeMobile?: string | null
      fontWeight?: string | null
      fontWeightMobile?: string | null
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
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  columnGap = 'default',
  columnGapCustom,
  badgeGroup,
  mainHeadingGroup,
  contentColumn,
  imageColumn,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')
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

  // ─── Layout & Spacing Resolution ───────────────────────────────────────────
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
    paddingMode === 'custom' || paddingMode === 'none' ? `gridcol-pad-${uid}` : ''

  const isDefaultGap = !columnGap || columnGap === 'default'
  const resolvedGap =
    columnGap === 'custom'
      ? columnGapCustom || '40px'
      : columnGap || 'default'

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
  const badgeTypography = resolveTypography(
    badgeGroup?.badgeFontSize,
    badgeGroup?.badgeFontSizeMobile,
    badgeGroup?.badgeFontWeight,
    badgeGroup?.badgeFontWeightMobile,
    'text-sm',
    'font-medium',
  )
  const badgeAlign = badgeGroup?.badgeAlignment || 'left'

  // ─── Top Main Heading ──────────────────────────────────────────────────────
  const headingText =
    mainHeadingGroup?.headingText ?? 'More <strong>connected ways</strong> to manage and move money.'
  const headingColor = mainHeadingGroup?.headingColor || 'text-gray-900'
  const headingTypography = resolveTypography(
    mainHeadingGroup?.headingFontSize,
    mainHeadingGroup?.headingFontSizeMobile,
    mainHeadingGroup?.headingFontWeight,
    mainHeadingGroup?.headingFontWeightMobile,
    'text-4xl md:text-5xl lg:text-6xl',
    'font-normal',
  )
  const headingAlign = mainHeadingGroup?.headingAlignment || 'left'
  const HeadingTag = (mainHeadingGroup?.headingTag as keyof React.JSX.IntrinsicElements) || 'h2'

  // ─── Content Column ────────────────────────────────────────────────────────
  const kicker = contentColumn?.kickerGroup
  const kickerText = kicker?.text
  const kickerColor = kicker?.color || 'text-gray-900'
  const kickerTypography = resolveTypography(
    kicker?.fontSize,
    kicker?.fontSizeMobile,
    kicker?.fontWeight,
    kicker?.fontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const kickerAlign = kicker?.alignment || 'left'

  const colHeading = contentColumn?.headingGroup
  const colHeadingText = colHeading?.text || 'One account for the world'
  const colHeadingColor = colHeading?.color || 'text-gray-900'
  const colHeadingTypography = resolveTypography(
    colHeading?.fontSize,
    colHeading?.fontSizeMobile,
    colHeading?.fontWeight,
    colHeading?.fontWeightMobile,
    'text-3xl md:text-4xl lg:text-5xl',
    'font-bold',
  )
  const colHeadingAlign = colHeading?.alignment || 'left'

  const desc = contentColumn?.descriptionGroup
  const descText = desc?.text
  const descColor = desc?.color || 'text-gray-700'
  const descTypography = resolveTypography(
    desc?.fontSize,
    desc?.fontSizeMobile,
    desc?.fontWeight,
    desc?.fontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descAlign = desc?.alignment || 'left'

  // Features list
  const features = contentColumn?.featuresSection
  const featuresTitle = features?.title || "What's inside"
  const featuresTitleColor = features?.titleColor || 'text-gray-900'
  const featuresTitleTypography = resolveTypography(
    features?.titleFontSize,
    features?.titleFontSizeMobile,
    features?.titleFontWeight,
    features?.titleFontWeightMobile,
    'text-lg md:text-xl',
    'font-semibold',
  )
  const featuresTitleAlign = features?.titleAlignment || 'left'
  const featureItems = features?.items ?? []

  // Button
  const btn = contentColumn?.buttonGroup
  const showBtn = btn?.showButton !== false && Boolean(btn?.text)
  const btnText = btn?.text || 'Learn more'
  const btnTextCol = btn?.textColor || 'text-gray-900'
  const btnTypography = resolveTypography(
    btn?.fontSize,
    btn?.fontSizeMobile,
    btn?.fontWeight,
    btn?.fontWeightMobile,
    'text-lg',
    'font-semibold',
  )
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
        {/* ─── Top Badge ─────────────────────────────────────────────────────── */}
        {showBadge && (
          <div className={cn('w-full mb-6', alignWrapperClasses[badgeAlign])}>
            <span
              className={cn(
                'inline-flex items-center justify-center px-6 py-2 rounded-full tracking-wide transition-all shadow-sm',
                badgeBg,
                badgeTextCol,
                badgeTypography.combined,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(badgeText) }}
            />
          </div>
        )}

        {/* ─── Top Main Heading ──────────────────────────────────────────────── */}
        {headingText && (
          <div className={cn('w-full mb-8 sm:mb-10 lg:mb-20', textAlignClasses[headingAlign])}>
            <HeadingTag
              className={cn(
                'tracking-tight leading-[1.08] max-w-5xl transition-colors',
                headingTypography.combined,
                headingColor,
                headingAlign === 'center' && 'mx-auto',
                headingAlign === 'right' && 'ml-auto',
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
            />
          </div>
        )}

        {/* ─── MOBILE ONLY: Feature Image directly below Top Main Heading (Scaled Down) ─── */}
        {image && typeof image === 'object' && (
          <div className="flex lg:hidden w-full mb-8 sm:mb-10 justify-center">
            <div
              className={cn(
                'relative w-full max-w-md sm:max-w-lg overflow-hidden shadow-xl transition-all duration-500 min-h-[360px] sm:min-h-[440px] aspect-[4/3] sm:aspect-[1/1]',
                imageRounded,
              )}
            >
              <Media
                resource={image}
                fill
                imgClassName={cn('w-full h-full transform transition-transform duration-700 hover:scale-105', imageFit)}
              />
            </div>
          </div>
        )}

        {/* ─── 2-Column Grid ─────────────────────────────────────────────────── */}
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-12 items-center',
            isDefaultGap && 'gap-10 lg:gap-14 xl:gap-20',
            !isDefaultGap && 'gap-y-10 lg:gap-y-0',
          )}
          style={
            !isDefaultGap
              ? {
                  columnGap: resolvedGap,
                  ...(resolvedGap === '0px' ? { rowGap: '0px' } : {}),
                }
              : undefined
          }
        >
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
                  kickerTypography.combined,
                  kickerColor,
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
                  colHeadingTypography.combined,
                  colHeadingColor,
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
                  descTypography.combined,
                  descColor,
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
                      featuresTitleTypography.combined,
                      featuresTitleColor,
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
                      const itemTypography = resolveTypography(
                        item.fontSize,
                        item.fontSizeMobile,
                        item.fontWeight,
                        item.fontWeightMobile,
                        'text-base md:text-lg',
                        'font-normal',
                      )

                      const itemContent = (
                        <div className="py-3.5 flex items-center justify-between group cursor-pointer transition-colors">
                          <span
                            className={cn(
                              'transition-colors duration-200 group-hover:text-blue-600',
                              itemTypography.combined,
                              item.textColor || 'text-gray-900',
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
                      btnTypography.combined,
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

          {/* Image Column: Desktop only (on mobile it appears scaled down directly below Top Main Heading) */}
          <div
            className={cn(
              'hidden lg:flex lg:col-span-6 w-full justify-center',
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
