import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { resolveTypography } from '@/utilities/resolveTypography'
import type { Page, Post, CaseStudy, EbooksAndGuide, Brand } from '@/payload-types'

export interface LinkFieldProps {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: string
    value: string | { slug?: string } | Page | Post | CaseStudy | EbooksAndGuide | Brand
  } | null
  url?: string | null
}

export interface CenteredContentCTAProps {
  boxBgColor?: string | null
  containerBorderRadius?: string | null
  paddingVertical?: string | null
  matchHeaderPillWidth?: boolean | null

  badge?: {
    enableBadge?: boolean | null
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontSizeMobile?: string | null
    badgeFontWeight?: string | null
    badgeFontWeightMobile?: string | null
    badgeMarginBottom?: string | null
  } | null

  headingGroup?: {
    heading?: string | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeight?: string | null
    headingFontWeightMobile?: string | null
    headingMarginBottom?: string | null
  } | null

  descriptionGroup?: {
    description?: string | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeight?: string | null
    descriptionFontWeightMobile?: string | null
    descriptionMarginBottom?: string | null
  } | null

  buttonGroup?: {
    buttonText?: string | null
    buttonLink?: {
      link?: LinkFieldProps | null
    } | LinkFieldProps | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    iconCircleBgColor?: string | null
    iconArrowColor?: string | null
    buttonFontSize?: string | null
    buttonFontSizeMobile?: string | null
    buttonFontWeight?: string | null
    buttonFontWeightMobile?: string | null
  } | null

  className?: string
  isColumn?: boolean
  isMatchHeader?: boolean
}

/**
 * Converts user inline styles like <style="color:#ADE2FF">...</style> and line breaks <br />
 * into safe, valid inline HTML elements.
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

export const CenteredContentCTAComponent: React.FC<CenteredContentCTAProps> = (props) => {
  const {
    boxBgColor = 'bg-[#0000FF]',
    containerBorderRadius = 'rounded-2xl md:rounded-3xl',
    paddingVertical = 'py-16 md:py-24',
    matchHeaderPillWidth = true,
    badge = {},
    headingGroup = {},
    descriptionGroup = {},
    buttonGroup = {},
    className,
    isMatchHeader = false,
  } = props

  // 1. Container Width Constraint
  const shouldMatchHeader = Boolean(matchHeaderPillWidth || isMatchHeader)

  // 2. Badge Resolution
  const enableBadge = badge?.enableBadge !== false
  const badgeText = badge?.badgeText?.trim() || 'Ready to grow?'
  const badgeBg = badge?.badgeBgColor || 'bg-white/10'
  const badgeTextCol = badge?.badgeTextColor || 'text-white'
  const badgeTypography = resolveTypography(
    badge?.badgeFontSize,
    badge?.badgeFontSizeMobile,
    badge?.badgeFontWeight,
    badge?.badgeFontWeightMobile,
    'text-sm',
    'font-medium',
  )
  const badgeMb = badge?.badgeMarginBottom || 'mb-6 md:mb-8'

  // 3. Heading Resolution
  const headingText = headingGroup?.heading?.trim() || "Let's build what comes next, together."
  const headingCol = headingGroup?.headingColor || 'text-white'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    'font-bold',
  )
  const headingMb = headingGroup?.headingMarginBottom || 'mb-4 md:mb-6'

  // 4. Description Resolution
  const descText =
    descriptionGroup?.description?.trim() ||
    'Explore solutions, discuss partnerships or connect with\none of our specialist businesses.'
  const descCol = descriptionGroup?.descriptionColor || 'text-white/90'
  const descTypography = resolveTypography(
    descriptionGroup?.descriptionFontSize,
    descriptionGroup?.descriptionFontSizeMobile,
    descriptionGroup?.descriptionFontWeight,
    descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg lg:text-xl',
    'font-normal',
  )
  const descMb = descriptionGroup?.descriptionMarginBottom || 'mb-8 md:mb-10'

  // 5. Button Resolution
  const btnText = buttonGroup?.buttonText?.trim() || 'Talk to our experts'
  const btnBg = buttonGroup?.buttonBgColor || 'bg-white'
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-[#0000FF]'
  const iconCircleBg = buttonGroup?.iconCircleBgColor || 'bg-[#0000FF]'
  const iconArrowCol = buttonGroup?.iconArrowColor || 'text-white'
  const btnTypography = resolveTypography(
    buttonGroup?.buttonFontSize,
    buttonGroup?.buttonFontSizeMobile,
    buttonGroup?.buttonFontWeight,
    buttonGroup?.buttonFontWeightMobile,
    'text-sm md:text-base',
    'font-semibold',
  )

  // Link resolution
  const rawLink = (buttonGroup?.buttonLink as any)?.link || buttonGroup?.buttonLink
  let href = '#'
  if (rawLink?.type === 'custom' && rawLink.url) {
    href = rawLink.url
  } else if (rawLink?.type === 'reference' && typeof rawLink.reference?.value === 'object') {
    const refDoc = rawLink.reference.value as any
    const relation = rawLink.reference.relationTo
    const slug = refDoc?.slug
    if (slug) {
      href = relation !== 'pages' ? `/${relation}/${slug}` : `/${slug}`
    }
  }
  const newTabProps = rawLink?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div
      className={cn(
        'w-full mx-auto relative overflow-hidden transition-all',
        shouldMatchHeader ? 'max-w-screen-2xl' : 'w-full',
        className,
      )}
    >
      <div
        className={cn(
          'w-full flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 lg:px-16',
          boxBgColor || 'bg-[#0000FF]',
          containerBorderRadius || 'rounded-2xl md:rounded-3xl',
          paddingVertical || 'py-16 md:py-24',
        )}
      >
        {/* ── 1. Pill Badge ─────────────────────────────────────────────────── */}
        {enableBadge && badgeText && (
          <div
            className={cn(
              'inline-flex items-center justify-center px-5 py-2 rounded-full transition-all',
              badgeBg,
              badgeTextCol,
              badgeTypography,
              badgeMb,
            )}
          >
            <span>{badgeText}</span>
          </div>
        )}

        {/* ── 2. Heading ────────────────────────────────────────────────────── */}
        {headingText && (
          <h2
            className={cn(
              'tracking-tight leading-[1.12] max-w-4xl mx-auto',
              headingCol,
              headingTypography,
              headingMb,
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
          />
        )}

        {/* ── 3. Description ────────────────────────────────────────────────── */}
        {descText && (
          <div
            className={cn(
              'max-w-2xl mx-auto leading-relaxed',
              descCol,
              descTypography,
              descMb,
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
          />
        )}

        {/* ── 4. Action Button ──────────────────────────────────────────────── */}
        {btnText && (
          <Link
            href={href}
            {...newTabProps}
            className={cn(
              'group inline-flex items-center justify-center gap-3.5 pl-6 pr-2 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
              btnBg,
              btnTextCol,
              btnTypography,
            )}
          >
            <span className="font-semibold">{btnText}</span>
            <div
              className={cn(
                'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 shadow-xs',
                iconCircleBg,
                iconArrowCol,
              )}
            >
              <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export const CenteredContentCTABlock: React.FC<CenteredContentCTAProps> = (props) => {
  return <CenteredContentCTAComponent {...props} />
}

export default CenteredContentCTABlock
