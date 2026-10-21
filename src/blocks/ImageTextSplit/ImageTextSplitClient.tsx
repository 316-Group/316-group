'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Media as MediaType } from '@/payload-types'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface LinkFieldProps {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: string
    value: string | { slug?: string }
  } | null
  url?: string | null
}

export interface ImageTextSplitProps {
  // Spacing & Background
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingTopCustom?: string | null
  paddingBottom?: string | null
  paddingBottomCustom?: string | null

  // Outer Card
  cardBgColor?: string | null
  cardBorderRadius?: string | null

  // Left Column: Image
  leftImageGroup?: {
    image?: MediaType | string | null
    imageAlt?: string | null
    mobileImageHeight?: string | null
  } | null

  // Right Column: Padding
  rightColumnPadding?: {
    paddingTopDesktop?: string | null
    paddingTopDesktopCustom?: string | null
    paddingBottomDesktop?: string | null
    paddingBottomDesktopCustom?: string | null
    paddingLeftDesktop?: string | null
    paddingLeftDesktopCustom?: string | null
    paddingRightDesktop?: string | null
    paddingRightDesktopCustom?: string | null
    paddingTopMobile?: string | null
    paddingBottomMobile?: string | null
    paddingLeftMobile?: string | null
    paddingRightMobile?: string | null
  } | null

  // Right Column: Badge
  badgeGroup?: {
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontWeight?: string | null
    badgeFontSizeMobile?: string | null
    badgeFontWeightMobile?: string | null
    badgeMarginBottom?: string | null
  } | null

  // Right Column: Heading
  headingGroup?: {
    heading?: any | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeightMobile?: string | null
    headingMarginBottom?: string | null
  } | null

  // Right Column: Description
  descriptionGroup?: {
    description?: any | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeightMobile?: string | null
    descriptionMarginBottom?: string | null
  } | null

  // Right Column: Button
  buttonGroup?: {
    buttonText?: string | null
    buttonLink?: {
      link?: LinkFieldProps | null
    } | LinkFieldProps | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    buttonFontSize?: string | null
    buttonFontWeight?: string | null
    buttonFontSizeMobile?: string | null
    buttonFontWeightMobile?: string | null
    iconCircleBgColor?: string | null
    iconArrowColor?: string | null
  } | null

  className?: string
}

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/<br\s*\/?>/gi, '<br />')
}

const renderContent = (content: any, className: string) => {
  if (!content) return null
  if (typeof content === 'string') {
    const trimmed = content.trim()
    if (!trimmed) return null
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: formatInlineHtml(trimmed) }}
      />
    )
  }
  if (typeof content === 'object' && content?.root) {
    return (
      <RichText
        content={content}
        enableGutter={false}
        enableProse={false}
        className={className}
      />
    )
  }
  return null
}

export const ImageTextSplitClient: React.FC<ImageTextSplitProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-16',
  paddingTopCustom,
  paddingBottom = 'pb-16',
  paddingBottomCustom,
  cardBgColor = 'bg-[#F8FAFC]',
  cardBorderRadius = 'rounded-[32px]',
  leftImageGroup,
  rightColumnPadding,
  badgeGroup,
  headingGroup,
  descriptionGroup,
  buttonGroup,
  className,
}) => {
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))

  // ─── Section Padding ───────────────────────────────────────────────────────
  const resolvedPt =
    paddingTop === 'custom' && paddingTopCustom ? paddingTopCustom : (paddingTop ?? 'pt-0')
  const isPtClass = resolvedPt.startsWith('pt-')

  const resolvedPb =
    paddingBottom === 'custom' && paddingBottomCustom
      ? paddingBottomCustom
      : (paddingBottom ?? 'pb-0')
  const isPbClass = resolvedPb.startsWith('pb-')

  // ─── Right Column Custom Padding Resolution ────────────────────────────────
  const rPad = rightColumnPadding
  const padTopDesktop =
    rPad?.paddingTopDesktop === 'custom' && rPad?.paddingTopDesktopCustom
      ? rPad.paddingTopDesktopCustom
      : rPad?.paddingTopDesktop || 'pt-16'
  const padBottomDesktop =
    rPad?.paddingBottomDesktop === 'custom' && rPad?.paddingBottomDesktopCustom
      ? rPad.paddingBottomDesktopCustom
      : rPad?.paddingBottomDesktop || 'pb-16'
  const padLeftDesktop =
    rPad?.paddingLeftDesktop === 'custom' && rPad?.paddingLeftDesktopCustom
      ? rPad.paddingLeftDesktopCustom
      : rPad?.paddingLeftDesktop || 'pl-12'
  const padRightDesktop =
    rPad?.paddingRightDesktop === 'custom' && rPad?.paddingRightDesktopCustom
      ? rPad.paddingRightDesktopCustom
      : rPad?.paddingRightDesktop || 'pr-16'

  const padTopMobile = rPad?.paddingTopMobile || 'pt-8'
  const padBottomMobile = rPad?.paddingBottomMobile || 'pb-8'
  const padLeftMobile = rPad?.paddingLeftMobile || 'pl-6'
  const padRightMobile = rPad?.paddingRightMobile || 'pr-6'

  const isPadTopCustom = !padTopDesktop.startsWith('pt-')
  const isPadBottomCustom = !padBottomDesktop.startsWith('pb-')
  const isPadLeftCustom = !padLeftDesktop.startsWith('pl-')
  const isPadRightCustom = !padRightDesktop.startsWith('pr-')
  const hasCustomDesktopPadding =
    isPadTopCustom || isPadBottomCustom || isPadLeftCustom || isPadRightCustom

  const padUid = `split-pad-${uid}`

  // ─── Left Column: Image ───────────────────────────────────────────────────
  const image = leftImageGroup?.image
  const imageAlt = leftImageGroup?.imageAlt || ''
  const mobileHeightClass = leftImageGroup?.mobileImageHeight || 'h-72 sm:h-96'

  // ─── Right Column: Badge ──────────────────────────────────────────────────
  const badgeText = badgeGroup?.badgeText?.trim() || ''
  const showBadge = Boolean(badgeText)
  const badgeBg = badgeGroup?.badgeBgColor || 'bg-[#F0F5FF]'
  const badgeTextColor = badgeGroup?.badgeTextColor || 'text-[#0256FF]'
  const badgeTypography = resolveTypography(
    badgeGroup?.badgeFontSize,
    badgeGroup?.badgeFontSizeMobile,
    badgeGroup?.badgeFontWeight,
    badgeGroup?.badgeFontWeightMobile,
    'text-xs md:text-sm',
    'font-medium',
  )
  const badgeMb = badgeGroup?.badgeMarginBottom || 'mb-8 md:mb-10'

  // ─── Right Column: Heading ────────────────────────────────────────────────
  const heading = headingGroup?.heading
  const headingColor = headingGroup?.headingColor || 'text-slate-950'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-3xl sm:text-4xl md:text-5xl lg:text-[54px]',
    'font-bold',
  )
  const headingMb = headingGroup?.headingMarginBottom || 'mb-6'

  // ─── Right Column: Description ────────────────────────────────────────────
  const description = descriptionGroup?.description
  const descriptionColor = descriptionGroup?.descriptionColor || 'text-slate-600'
  const descriptionTypography = resolveTypography(
    descriptionGroup?.descriptionFontSize,
    descriptionGroup?.descriptionFontSizeMobile,
    descriptionGroup?.descriptionFontWeight,
    descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descMb = descriptionGroup?.descriptionMarginBottom || 'mb-8 md:mb-10'

  // ─── Right Column: Button ─────────────────────────────────────────────────
  const btnText = buttonGroup?.buttonText?.trim() || ''
  const btnBg = buttonGroup?.buttonBgColor || 'bg-[#0256FF]'
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-white'
  const iconCircleBg = buttonGroup?.iconCircleBgColor || 'bg-white'
  const iconArrowCol = buttonGroup?.iconArrowColor || 'text-[#0256FF]'
  const btnTypography = resolveTypography(
    buttonGroup?.buttonFontSize,
    buttonGroup?.buttonFontSizeMobile,
    buttonGroup?.buttonFontWeight,
    buttonGroup?.buttonFontWeightMobile,
    'text-sm md:text-base',
    'font-semibold',
  )

  // Resolve link data safely
  const rawLink = buttonGroup?.buttonLink
  const linkObj: LinkFieldProps | undefined =
    rawLink && 'link' in rawLink && rawLink.link ? rawLink.link : (rawLink as LinkFieldProps | undefined)

  let href = '#'
  let isLinked = false
  if (linkObj?.type === 'custom' && linkObj?.url?.trim()) {
    href = linkObj.url.trim()
    isLinked = true
  } else if (linkObj?.type === 'reference' && linkObj?.reference) {
    const ref = linkObj.reference
    const relation = typeof ref === 'object' ? ref?.relationTo : undefined
    const slug =
      typeof ref === 'object' && typeof ref?.value === 'object' ? ref?.value?.slug : undefined
    if (slug) {
      href = relation === 'pages' ? `/${slug === 'home' ? '' : slug}` : `/${relation}/${slug}`
      isLinked = true
    }
  }

  const newTabProps = linkObj?.newTab
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-300',
        sectionBgColor,
        isPtClass && resolvedPt,
        isPbClass && resolvedPb,
        className,
      )}
      style={{
        ...(!isPtClass ? { paddingTop: resolvedPt } : {}),
        ...(!isPbClass ? { paddingBottom: resolvedPb } : {}),
      }}
    >
      {/* Scoped CSS for Custom Desktop Padding if required */}
      {hasCustomDesktopPadding && (
        <style>{`
          @media (min-width: 1024px) {
            .${padUid} {
              ${isPadTopCustom ? `padding-top: ${padTopDesktop} !important;` : ''}
              ${isPadBottomCustom ? `padding-bottom: ${padBottomDesktop} !important;` : ''}
              ${isPadLeftCustom ? `padding-left: ${padLeftDesktop} !important;` : ''}
              ${isPadRightCustom ? `padding-right: ${padRightDesktop} !important;` : ''}
            }
          }
        `}</style>
      )}

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Outer Rounded Card ────────────────────────────────────────────── */}
        <div
          className={cn(
            'w-full flex flex-col lg:flex-row items-stretch overflow-hidden shadow-sm transition-all duration-300',
            cardBgColor,
            cardBorderRadius,
          )}
        >
          {/* ─── Left Column: Full-Bleed Image (42% width) ──────────────────── */}
          <div
            className={cn(
              'w-full lg:w-[42%] relative flex-shrink-0 overflow-hidden bg-slate-100',
              mobileHeightClass,
              'lg:h-auto lg:min-h-[520px]',
            )}
          >
            {image && typeof image === 'object' ? (
              <Media
                resource={image}
                fill
                imgClassName="object-cover w-full h-full"
                alt={imageAlt || undefined}
                priority={false}
              />
            ) : typeof image === 'string' && image ? (
              /* If an image URL string is provided */
              <img
                src={image}
                alt={imageAlt || ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              /* Subtle neutral placeholder if no image uploaded */
              <div className="w-full h-full min-h-[260px] flex items-center justify-center bg-slate-200/60 text-slate-400">
                <span className="text-sm font-medium">Image Preview</span>
              </div>
            )}
          </div>

          {/* ─── Right Column: Editorial Area (58% width) ───────────────────── */}
          <div
            className={cn(
              'w-full lg:w-[58%] flex flex-col justify-center',
              padTopMobile,
              padBottomMobile,
              padLeftMobile,
              padRightMobile,
              !isPadTopCustom && `lg:${padTopDesktop}`,
              !isPadBottomCustom && `lg:${padBottomDesktop}`,
              !isPadLeftCustom && `lg:${padLeftDesktop}`,
              !isPadRightCustom && `lg:${padRightDesktop}`,
              hasCustomDesktopPadding && padUid,
            )}
          >
            {/* 1. Pill Badge */}
            {showBadge && (
              <div className={cn('inline-flex', badgeMb)}>
                <span
                  className={cn(
                    'inline-flex items-center px-5 py-2 rounded-full backdrop-blur-sm transition-all select-none',
                    badgeBg,
                    badgeTextColor,
                    badgeTypography.combined,
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* 2. Heading */}
            {heading && (
              <div
                className={cn(
                  'w-full tracking-tight leading-[1.12] transition-colors',
                  headingTypography.combined,
                  headingColor,
                  headingMb,
                )}
              >
                {renderContent(heading, headingTypography.combined)}
              </div>
            )}

            {/* 3. Description */}
            {description && (
              <div
                className={cn(
                  'w-full leading-relaxed transition-colors',
                  descriptionTypography.combined,
                  descriptionColor,
                  descMb,
                )}
              >
                {renderContent(description, descriptionTypography.combined)}
              </div>
            )}

            {/* 4. Action Button (Capsule with Circle Arrow) */}
            {Boolean(btnText) && (
              <div className="flex items-center pt-1">
                {isLinked ? (
                  <Link
                    href={href}
                    {...newTabProps}
                    className={cn(
                      'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full shadow-md transition-all group/btn hover:shadow-lg hover:scale-102 cursor-pointer',
                      btnBg,
                      btnTextCol,
                      btnTypography.combined,
                    )}
                  >
                    <span>{btnText}</span>
                    <span
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                        iconCircleBg,
                      )}
                    >
                      <ArrowUpRight className={cn('w-4 h-4 transition-colors', iconArrowCol)} />
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full shadow-md transition-all group/btn hover:shadow-lg hover:scale-102 cursor-pointer',
                      btnBg,
                      btnTextCol,
                      btnTypography.combined,
                    )}
                  >
                    <span>{btnText}</span>
                    <span
                      className={cn(
                        'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                        iconCircleBg,
                      )}
                    >
                      <ArrowUpRight className={cn('w-4 h-4 transition-colors', iconArrowCol)} />
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageTextSplitClient
