'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export interface OfficeItem {
  id?: string | null
  image?: MediaType | string | null
  label?: string | null
  labelColor?: string | null
  labelFontSize?: string | null
  labelFontWeight?: string | null
}

export interface StatItem {
  id?: string | null
  statValue?: string | null
  statLabel?: string | null
}

export interface LinkFieldProps {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: string | { slug?: string }
  } | null
  url?: string | null
}

export interface WhoWeAreProps {
  // Section Spacing & Background
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingTopCustom?: string | null
  paddingBottom?: string | null
  paddingBottomCustom?: string | null

  // Horizontal Padding
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingSide?: 'both' | 'left' | 'right' | 'split' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null

  // Left Column
  leftColumn?: {
    badgeGroup?: {
      showBadge?: boolean | null
      badgeText?: string | null
      badgeBgColor?: string | null
      badgeTextColor?: string | null
      badgeFontSize?: string | null
      badgeFontWeight?: string | null
      badgeMarginBottom?: string | null
    } | null

    subHeading?: string | null
    subHeadingColor?: string | null
    subHeadingFontSize?: string | null
    subHeadingFontWeight?: string | null
    subHeadingMarginBottom?: string | null

    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingMarginBottom?: string | null

    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null

    spacingBelowDescription?: string | null
    spacingBelowDescriptionCustom?: string | null

    bottomContentMode?: 'buttons' | 'offices' | 'none' | null

    buttonsGroup?: {
      enableButton1?: boolean | null
      button1Text?: string | null
      button1Link?: LinkFieldProps | null
      button1BgColor?: string | null
      button1TextColor?: string | null
      button1FontSize?: string | null
      button1FontWeight?: string | null

      enableButton2?: boolean | null
      button2Text?: string | null
      button2Link?: LinkFieldProps | null
      button2TextColor?: string | null
      button2FontSize?: string | null
      button2FontWeight?: string | null
      button2IconBgColor?: string | null
      button2IconColor?: string | null
    } | null

    officesGroup?: {
      officesHeading?: string | null
      officesHeadingColor?: string | null
      officesHeadingFontSize?: string | null
      officesHeadingFontWeight?: string | null
      officesHeadingMarginBottom?: string | null
      officeItems?: OfficeItem[] | null
    } | null
  } | null

  // Right Column
  rightColumn?: {
    subHeading?: string | null
    subHeadingColor?: string | null
    subHeadingFontSize?: string | null
    subHeadingFontWeight?: string | null
    subHeadingMarginBottom?: string | null

    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
    descriptionMarginBottom?: string | null

    image?: MediaType | string | null
    imageRadius?: string | null
    imageFit?: 'object-cover' | 'object-contain' | null
  } | null

  // Divider / HR Line
  dividerSettings?: {
    enableDivider?: boolean | null
    dividerLayout?: 'full' | 'split' | null
    dividerColor?: string | null
    dividerSpacingTop?: string | null
    dividerSpacingBottom?: string | null
  } | null

  // Stat Items
  statsGroup?: {
    enableStats?: boolean | null
    stats?: StatItem[] | null
    statValueColor?: string | null
    statValueFontSize?: string | null
    statValueFontWeight?: string | null
    statLabelColor?: string | null
    statLabelFontSize?: string | null
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

export const WhoWeAreClient: React.FC<WhoWeAreProps> = ({
  sectionBgColor = 'bg-[#0256FF]',
  paddingTop = 'pt-20',
  paddingTopCustom,
  paddingBottom = 'pb-20',
  paddingBottomCustom,
  paddingMode = 'default',
  paddingSide = 'both',
  paddingXDesktop = '48px',
  paddingXDesktopCustom,
  paddingXMobile = '16px',
  paddingXMobileCustom,
  leftColumn,
  rightColumn,
  dividerSettings,
  statsGroup,
  className,
}) => {
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))

  // ─── Resolve Custom Spacing ───────────────────────────────────────────────
  const resolvedPt =
    paddingTop === 'custom' && paddingTopCustom ? paddingTopCustom : paddingTop || 'pt-20'
  const isPtClass = resolvedPt.startsWith('pt-')

  const resolvedPb =
    paddingBottom === 'custom' && paddingBottomCustom
      ? paddingBottomCustom
      : paddingBottom || 'pb-20'
  const isPbClass = resolvedPb.startsWith('pb-')

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

  const padUid = `whoweare-pad-${uid}`

  // ─── Link URL Resolver ─────────────────────────────────────────────────────
  const resolveHref = (linkObj?: LinkFieldProps | null): string | null => {
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

  // ─── Left Column Data ──────────────────────────────────────────────────────
  const badge = leftColumn?.badgeGroup
  const showBadge = Boolean(badge?.showBadge !== false && badge?.badgeText?.trim())
  const badgeText = badge?.badgeText?.trim() || ''
  const badgeBg = badge?.badgeBgColor || 'bg-white/10'
  const badgeTextColor = badge?.badgeTextColor || 'text-white'
  const badgeFontSize = badge?.badgeFontSize || 'text-xs md:text-sm'
  const badgeFontWeight = badge?.badgeFontWeight || 'font-medium'
  const badgeMb = badge?.badgeMarginBottom || 'mb-4 md:mb-6'

  const subHeading = leftColumn?.subHeading?.trim() || ''
  const subHeadingColor = leftColumn?.subHeadingColor || 'text-white'
  const subHeadingSize = leftColumn?.subHeadingFontSize || 'text-3xl md:text-4xl lg:text-5xl'
  const subHeadingWeight = leftColumn?.subHeadingFontWeight || 'font-bold'
  const subHeadingMb = leftColumn?.subHeadingMarginBottom || 'mb-1 md:mb-2'

  const heading = leftColumn?.heading?.trim() || ''
  const headingColor = leftColumn?.headingColor || 'text-white'
  const headingSize = leftColumn?.headingFontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const headingWeight = leftColumn?.headingFontWeight || 'font-extrabold'
  const headingMb = leftColumn?.headingMarginBottom || 'mb-6 md:mb-8'

  const description = leftColumn?.description?.trim() || ''
  const descColor = leftColumn?.descriptionColor || 'text-white/80'
  const descSize = leftColumn?.descriptionFontSize || 'text-base md:text-lg'
  const descWeight = leftColumn?.descriptionFontWeight || 'font-normal'

  const spacingBelowDesc =
    leftColumn?.spacingBelowDescription === 'custom' && leftColumn?.spacingBelowDescriptionCustom
      ? leftColumn.spacingBelowDescriptionCustom
      : leftColumn?.spacingBelowDescription || 'mb-10 md:mb-12'
  const isSpacingBelowDescClass = spacingBelowDesc.startsWith('mb-')

  const bottomMode = leftColumn?.bottomContentMode || 'buttons'

  // Mode A: Buttons
  const buttonsGroup = leftColumn?.buttonsGroup
  const enableBtn1 = buttonsGroup?.enableButton1 !== false
  const btn1Text = buttonsGroup?.button1Text?.trim() || ''
  const hasBtn1 = enableBtn1 && Boolean(btn1Text)
  const btn1Href = resolveHref(buttonsGroup?.button1Link)
  const isBtn1NewTab = Boolean(buttonsGroup?.button1Link?.newTab)
  const btn1Bg = buttonsGroup?.button1BgColor || 'bg-white'
  const btn1TextCol = buttonsGroup?.button1TextColor || 'text-[#0256FF]'
  const btn1Size = buttonsGroup?.button1FontSize || 'text-sm md:text-base'
  const btn1Weight = buttonsGroup?.button1FontWeight || 'font-semibold'

  const enableBtn2 = buttonsGroup?.enableButton2 !== false
  const btn2Text = buttonsGroup?.button2Text?.trim() || ''
  const hasBtn2 = enableBtn2 && Boolean(btn2Text)
  const btn2Href = resolveHref(buttonsGroup?.button2Link)
  const isBtn2NewTab = Boolean(buttonsGroup?.button2Link?.newTab)
  const btn2TextCol = buttonsGroup?.button2TextColor || 'text-white'
  const btn2Size = buttonsGroup?.button2FontSize || 'text-sm md:text-base'
  const btn2Weight = buttonsGroup?.button2FontWeight || 'font-semibold'
  const btn2IconBg = buttonsGroup?.button2IconBgColor || 'bg-white'
  const btn2IconCol = buttonsGroup?.button2IconColor || 'text-[#0256FF]'

  // Mode B: Offices
  const officesGroup = leftColumn?.officesGroup
  const officesHeading = officesGroup?.officesHeading?.trim() || ''
  const officesHeadingCol = officesGroup?.officesHeadingColor || 'text-[#0256FF]'
  const officesHeadingSize = officesGroup?.officesHeadingFontSize || 'text-base md:text-lg'
  const officesHeadingWeight = officesGroup?.officesHeadingFontWeight || 'font-bold'
  const officesHeadingMb = officesGroup?.officesHeadingMarginBottom || 'mb-4'
  const officeItems = Array.isArray(officesGroup?.officeItems) ? officesGroup.officeItems : []

  // ─── Right Column Data ─────────────────────────────────────────────────────
  const rightSubHeading = rightColumn?.subHeading?.trim() || ''
  const rightSubHeadingCol = rightColumn?.subHeadingColor || 'text-white'
  const rightSubHeadingSize = rightColumn?.subHeadingFontSize || 'text-lg md:text-xl'
  const rightSubHeadingWeight = rightColumn?.subHeadingFontWeight || 'font-semibold'
  const rightSubHeadingMb = rightColumn?.subHeadingMarginBottom || 'mb-2 md:mb-3'

  const rightDescription = rightColumn?.description?.trim() || ''
  const rightDescCol = rightColumn?.descriptionColor || 'text-white'
  const rightDescSize = rightColumn?.descriptionFontSize || 'text-base md:text-lg'
  const rightDescWeight = rightColumn?.descriptionFontWeight || 'font-normal'
  const rightDescMb = rightColumn?.descriptionMarginBottom || 'mb-6 md:mb-8'

  const rightImage = rightColumn?.image
  const rightImageRadius = rightColumn?.imageRadius || 'rounded-2xl'
  const rightImageFit = rightColumn?.imageFit || 'object-cover'

  // ─── Divider Data ──────────────────────────────────────────────────────────
  const enableDivider = Boolean(dividerSettings?.enableDivider ?? true)
  const dividerLayout = dividerSettings?.dividerLayout || 'full'
  const dividerColor = dividerSettings?.dividerColor || 'border-white/20'
  const dividerMt = dividerSettings?.dividerSpacingTop || 'mt-12 md:mt-16'
  const dividerMb = dividerSettings?.dividerSpacingBottom || 'mb-12 md:mb-16'

  // ─── Stats Data ────────────────────────────────────────────────────────────
  const enableStats = Boolean(statsGroup?.enableStats)
  const statItems = Array.isArray(statsGroup?.stats) ? statsGroup.stats : []
  const statValCol = statsGroup?.statValueColor || 'text-gray-950'
  const statValSize = statsGroup?.statValueFontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const statValWeight = statsGroup?.statValueFontWeight || 'font-bold'
  const statLblCol = statsGroup?.statLabelColor || 'text-gray-700'
  const statLblSize = statsGroup?.statLabelFontSize || 'text-sm md:text-base'

  return (
    <section
      className={cn(
        'w-full relative transition-colors duration-200',
        sectionBgColor || 'bg-[#0256FF]',
        isPtClass && resolvedPt,
        isPbClass && resolvedPb,
        className,
      )}
      style={{
        ...(!isPtClass ? { paddingTop: resolvedPt } : {}),
        ...(!isPbClass ? { paddingBottom: resolvedPb } : {}),
      }}
    >
      {/* Scoped Custom Horizontal Padding Style */}
      {paddingMode === 'custom' && (
        <style>{`
          @media (max-width: 767px) {
            .${padUid} {
              ${
                paddingSide === 'left'
                  ? `padding-left: ${resolvedMobilePad} !important;`
                  : paddingSide === 'right'
                    ? `padding-right: ${resolvedMobilePad} !important;`
                    : `padding-left: ${resolvedMobilePad} !important; padding-right: ${resolvedMobilePad} !important;`
              }
            }
          }
          @media (min-width: 768px) {
            .${padUid} {
              ${
                paddingSide === 'left'
                  ? `padding-left: ${resolvedDesktopPad} !important;`
                  : paddingSide === 'right'
                    ? `padding-right: ${resolvedDesktopPad} !important;`
                    : `padding-left: ${resolvedDesktopPad} !important; padding-right: ${resolvedDesktopPad} !important;`
              }
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          (!paddingMode || paddingMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl',
          paddingMode === 'none' && 'w-full max-w-none px-0',
          paddingMode === 'custom' && cn('w-full max-w-none', padUid),
        )}
      >
        {/* ─── 2-COLUMN MAIN CONTENT GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start w-full">
          {/* ── Left Column ── */}
          <div className="flex flex-col items-start w-full">
            {/* Pill Badge */}
            {showBadge && (
              <div className={cn('inline-flex', badgeMb)}>
                <span
                  className={cn(
                    'inline-flex items-center px-4 py-1.5 rounded-full backdrop-blur-sm transition-all',
                    badgeBg,
                    badgeTextColor,
                    badgeFontSize,
                    badgeFontWeight,
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Sub-Heading ("We are") */}
            {subHeading && (
              <p
                className={cn(
                  'tracking-tight leading-snug transition-colors',
                  subHeadingSize,
                  subHeadingColor,
                  subHeadingWeight,
                  subHeadingMb,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(subHeading) }}
              />
            )}

            {/* Main Heading ("316 Group") */}
            {heading && (
              <h2
                className={cn(
                  'tracking-tight leading-[1.08] transition-colors',
                  headingSize,
                  headingColor,
                  headingWeight,
                  headingMb,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(heading) }}
              />
            )}

            {/* Description */}
            {description && (
              <div
                className={cn(
                  'leading-relaxed transition-colors max-w-xl',
                  descSize,
                  descColor,
                  descWeight,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(description) }}
              />
            )}

            {/* Configurable Spacing below Description */}
            <div
              className={cn('w-full', isSpacingBelowDescClass && spacingBelowDesc)}
              style={!isSpacingBelowDescClass ? { marginBottom: spacingBelowDesc } : undefined}
              aria-hidden="true"
            />

            {/* ── Bottom Section: Mode A (Buttons) vs Mode B (Offices) vs Mode C (None) ── */}
            {bottomMode === 'buttons' && (hasBtn1 || hasBtn2) && (
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full">
                {/* Button 1: Filled Pill */}
                {hasBtn1 &&
                  (btn1Href ? (
                    <Link
                      href={btn1Href}
                      target={isBtn1NewTab ? '_blank' : undefined}
                      rel={isBtn1NewTab ? 'noopener noreferrer' : undefined}
                      className={cn(
                        'inline-flex items-center justify-center px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center',
                        btn1Bg,
                        btn1TextCol,
                        btn1Size,
                        btn1Weight,
                      )}
                    >
                      {btn1Text}
                    </Link>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={cn(
                        'inline-flex items-center justify-center px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center',
                        btn1Bg,
                        btn1TextCol,
                        btn1Size,
                        btn1Weight,
                      )}
                    >
                      {btn1Text}
                    </a>
                  ))}

                {/* Button 2: Ghost with Vector Arrow */}
                {hasBtn2 &&
                  (btn2Href ? (
                    <Link
                      href={btn2Href}
                      target={isBtn2NewTab ? '_blank' : undefined}
                      rel={isBtn2NewTab ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-3 py-2 px-1 bg-transparent border-0 shadow-none transition-all duration-300 hover:opacity-85 active:scale-95 group/btn cursor-pointer"
                    >
                      <span className={cn('transition-colors', btn2TextCol, btn2Size, btn2Weight)}>
                        {btn2Text}
                      </span>
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                          btn2IconBg,
                        )}
                      >
                        <ArrowUpRight className={cn('w-4 h-4', btn2IconCol)} />
                      </span>
                    </Link>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-3 py-2 px-1 bg-transparent border-0 shadow-none transition-all duration-300 hover:opacity-85 active:scale-95 group/btn cursor-pointer"
                    >
                      <span className={cn('transition-colors', btn2TextCol, btn2Size, btn2Weight)}>
                        {btn2Text}
                      </span>
                      <span
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                          btn2IconBg,
                        )}
                      >
                        <ArrowUpRight className={cn('w-4 h-4', btn2IconCol)} />
                      </span>
                    </a>
                  ))}
              </div>
            )}

            {bottomMode === 'offices' && (officesHeading || officeItems.length > 0) && (
              <div className="flex flex-col items-start w-full">
                {officesHeading && (
                  <h4
                    className={cn(
                      'tracking-tight leading-snug transition-colors',
                      officesHeadingSize,
                      officesHeadingCol,
                      officesHeadingWeight,
                      officesHeadingMb,
                    )}
                    dangerouslySetInnerHTML={{ __html: formatInlineHtml(officesHeading) }}
                  />
                )}

                {officeItems.length > 0 && (
                  <div className="grid grid-cols-3 gap-6 sm:gap-8 items-start pt-1">
                    {officeItems.map((item, idx) => {
                      const itemImg = item.image
                      const itemLabel = item.label?.trim() || ''
                      const itemCol = item.labelColor || 'text-gray-950'
                      const itemSize = item.labelFontSize || 'text-xs md:text-sm'
                      const itemWeight = item.labelFontWeight || 'font-semibold'

                      return (
                        <div key={item.id || idx} className="flex flex-col items-start gap-2">
                          {itemImg && (
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10">
                              {typeof itemImg === 'object' ? (
                                <Media
                                  resource={itemImg}
                                  imgClassName="w-full h-full object-cover"
                                  priority={false}
                                  loading="lazy"
                                />
                              ) : (
                                <img
                                  src={itemImg}
                                  alt={itemLabel || 'Office'}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          )}
                          {itemLabel && (
                            <span className={cn('leading-tight transition-colors', itemCol, itemSize, itemWeight)}>
                              {itemLabel}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Right Column ── */}
          <div className="flex flex-col items-start w-full">
            {/* Right Sub-Heading (Optional) */}
            {rightSubHeading && (
              <p
                className={cn(
                  'tracking-tight leading-snug transition-colors',
                  rightSubHeadingSize,
                  rightSubHeadingCol,
                  rightSubHeadingWeight,
                  rightSubHeadingMb,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(rightSubHeading) }}
              />
            )}

            {/* Right Description */}
            {rightDescription && (
              <div
                className={cn(
                  'leading-relaxed transition-colors max-w-xl',
                  rightDescSize,
                  rightDescCol,
                  rightDescWeight,
                  rightDescMb,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(rightDescription) }}
              />
            )}

            {/* Right Uploaded Media / Graphic */}
            {rightImage && (
              <div
                className={cn(
                  'w-full overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.01]',
                  rightImageRadius,
                )}
              >
                {typeof rightImage === 'object' ? (
                  <Media
                    resource={rightImage}
                    imgClassName={cn('w-full h-auto max-h-[460px]', rightImageFit)}
                    priority={false}
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={rightImage}
                    alt="Who we are visual"
                    className={cn('w-full h-auto max-h-[460px]', rightImageFit)}
                    loading="lazy"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── DIVIDER / HR LINE ─────────────────────────────────────────────── */}
        {enableDivider && (
          <div className={cn('w-full', dividerMt, dividerMb)}>
            {dividerLayout === 'split' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 w-full">
                <hr className={cn('border-t transition-colors', dividerColor)} />
                <hr className={cn('border-t transition-colors', dividerColor)} />
              </div>
            ) : (
              <hr className={cn('border-t w-full transition-colors', dividerColor)} />
            )}
          </div>
        )}

        {/* ─── STAT ITEMS SECTION (Below Divider) ───────────────────────────── */}
        {enableStats && statItems.length > 0 && (
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-between gap-x-6 sm:gap-x-8 md:gap-x-0 gap-y-8 w-full pt-2">
            {statItems.map((item, i) => (
              <div key={item.id || i} className="flex flex-col gap-2">
                {item.statValue && (
                  <span className={cn('leading-none transition-colors', statValSize, statValCol, statValWeight)}>
                    {item.statValue}
                  </span>
                )}
                {item.statLabel && (
                  <span className={cn('leading-relaxed transition-colors', statLblSize, statLblCol)}>
                    {item.statLabel}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
