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

export interface ImageTextSplit2Props {
  // Spacing & Background
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingTopCustom?: string | null
  paddingBottom?: string | null
  paddingBottomCustom?: string | null

  // Layout Direction & Card Container
  imagePosition?: 'imageLeft' | 'imageRight' | null
  cardBgColor?: string | null
  cardBorderRadius?: string | null

  // Image Side
  imageGroup?: {
    image?: MediaType | string | null
    imageAlt?: string | null
    mobileImageHeight?: string | null
  } | null

  // Text Side Padding Controls
  textColumnPadding?: {
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

  // Optional Subheading / Pill Badge
  subheadingGroup?: {
    subheadingText?: string | null
    subheadingStyle?: 'badge' | 'text' | null
    subheadingBgColor?: string | null
    subheadingTextColor?: string | null
    subheadingFontSize?: string | null
    subheadingFontWeight?: string | null
    subheadingFontSizeMobile?: string | null
    subheadingFontWeightMobile?: string | null
    subheadingMarginBottom?: string | null
  } | null

  // Heading Group
  headingGroup?: {
    heading?: any | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeightMobile?: string | null
    headingMarginBottom?: string | null
  } | null

  // Description Group
  descriptionGroup?: {
    description?: any | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeightMobile?: string | null
    descriptionMarginBottom?: string | null
  } | null

  // Optional Button Group
  buttonGroup?: {
    buttonText?: string | null
    buttonLink?: {
      link?: LinkFieldProps | null
    } | LinkFieldProps | null
    buttonStyle?: 'capsuleArrow' | 'standard' | null
    buttonBgColor?: string | null
    buttonTextColor?: string | null
    iconCircleBgColor?: string | null
    iconArrowColor?: string | null
    buttonFontSize?: string | null
    buttonFontWeight?: string | null
    buttonFontSizeMobile?: string | null
    buttonFontWeightMobile?: string | null
  } | null

  // Container props
  isColumn?: boolean
  className?: string
  blockType?: string
}

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/<br\s*\/?>/gi, '<br />')
}

const renderContent = (content: any, className: string, fallbackText?: string) => {
  if (!content) {
    if (fallbackText) {
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: formatInlineHtml(fallbackText) }}
        />
      )
    }
    return null
  }
  if (typeof content === 'string') {
    const trimmed = content.trim()
    if (!trimmed) {
      if (fallbackText) {
        return (
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(fallbackText) }}
          />
        )
      }
      return null
    }
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: formatInlineHtml(trimmed) }}
      />
    )
  }
  if (typeof content === 'object' && content?.root) {
    // If Lexical content is empty, use fallback if provided
    const isEmptyLexical =
      !content.root.children ||
      content.root.children.length === 0 ||
      (content.root.children.length === 1 &&
        content.root.children[0].children?.length === 0 &&
        !content.root.children[0].text)

    if (isEmptyLexical && fallbackText) {
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: formatInlineHtml(fallbackText) }}
        />
      )
    }

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

const DEFAULT_HEADING = 'We embody our values'
const DEFAULT_DESCRIPTION =
  "At 316 Group, we're driven by a shared purpose, to help businesses, and the people behind them, achieve their best. We believe innovation happens when talented, curious, and kind people work together with ownership and passion. We are deeply passionate about providing every employee with the tools, resources, and support they need to grow and thrive."

export const ImageTextSplit2Client: React.FC<ImageTextSplit2Props> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-12',
  paddingTopCustom,
  paddingBottom = 'pb-12',
  paddingBottomCustom,
  imagePosition = 'imageLeft',
  cardBgColor = 'bg-white',
  cardBorderRadius = 'rounded-none',
  imageGroup,
  textColumnPadding,
  subheadingGroup,
  headingGroup,
  descriptionGroup,
  buttonGroup,
  isColumn = false,
  className,
}) => {
  // Stable unique class for scoped custom padding
  const [padUid] = useState(() => `its2-pad-${Math.random().toString(36).substring(2, 9)}`)

  // Section Padding Top/Bottom
  const resolvedPt = paddingTop === 'custom' && paddingTopCustom ? paddingTopCustom : paddingTop || 'pt-0'
  const resolvedPb = paddingBottom === 'custom' && paddingBottomCustom ? paddingBottomCustom : paddingBottom || 'pb-0'
  const isPtClass = resolvedPt?.startsWith('pt-')
  const isPbClass = resolvedPb?.startsWith('pb-')

  // Text Column Desktop Padding
  const padTopDesktop =
    textColumnPadding?.paddingTopDesktop === 'custom' && textColumnPadding?.paddingTopDesktopCustom
      ? textColumnPadding.paddingTopDesktopCustom
      : textColumnPadding?.paddingTopDesktop || 'pt-12'

  const padBottomDesktop =
    textColumnPadding?.paddingBottomDesktop === 'custom' && textColumnPadding?.paddingBottomDesktopCustom
      ? textColumnPadding.paddingBottomDesktopCustom
      : textColumnPadding?.paddingBottomDesktop || 'pb-12'

  const padLeftDesktop =
    textColumnPadding?.paddingLeftDesktop === 'custom' && textColumnPadding?.paddingLeftDesktopCustom
      ? textColumnPadding.paddingLeftDesktopCustom
      : textColumnPadding?.paddingLeftDesktop || 'pl-10'

  const padRightDesktop =
    textColumnPadding?.paddingRightDesktop === 'custom' && textColumnPadding?.paddingRightDesktopCustom
      ? textColumnPadding.paddingRightDesktopCustom
      : textColumnPadding?.paddingRightDesktop || 'pr-10'

  const isPadTopCustom = textColumnPadding?.paddingTopDesktop === 'custom' && Boolean(textColumnPadding?.paddingTopDesktopCustom)
  const isPadBottomCustom = textColumnPadding?.paddingBottomDesktop === 'custom' && Boolean(textColumnPadding?.paddingBottomDesktopCustom)
  const isPadLeftCustom = textColumnPadding?.paddingLeftDesktop === 'custom' && Boolean(textColumnPadding?.paddingLeftDesktopCustom)
  const isPadRightCustom = textColumnPadding?.paddingRightDesktop === 'custom' && Boolean(textColumnPadding?.paddingRightDesktopCustom)
  const hasCustomDesktopPadding = isPadTopCustom || isPadBottomCustom || isPadLeftCustom || isPadRightCustom

  // Text Column Mobile Padding
  const padTopMobile = textColumnPadding?.paddingTopMobile || 'pt-8'
  const padBottomMobile = textColumnPadding?.paddingBottomMobile || 'pb-8'
  const padLeftMobile = textColumnPadding?.paddingLeftMobile || 'pl-6'
  const padRightMobile = textColumnPadding?.paddingRightMobile || 'pr-6'

  // Image Settings
  const image = imageGroup?.image
  const imageAlt = imageGroup?.imageAlt
  const mobileHeightClass = imageGroup?.mobileImageHeight || 'h-72 sm:h-96'

  // Subheading (Optional)
  const subheadingText = subheadingGroup?.subheadingText?.trim() || ''
  const hasSubheading = Boolean(subheadingText)
  const subheadingStyle = subheadingGroup?.subheadingStyle || 'badge'
  const subheadingBg = subheadingGroup?.subheadingBgColor || 'bg-[#F0F5FF]'
  const subheadingTextColor = subheadingGroup?.subheadingTextColor || 'text-[#0256FF]'
  const subheadingMb = subheadingGroup?.subheadingMarginBottom || 'mb-6'
  const subheadingTypography = resolveTypography(
    subheadingGroup?.subheadingFontSize,
    subheadingGroup?.subheadingFontSizeMobile,
    subheadingGroup?.subheadingFontWeight,
    subheadingGroup?.subheadingFontWeightMobile,
    'text-xs md:text-sm',
    'font-medium',
  )

  // Heading (Default enabled)
  const heading = headingGroup?.heading
  const headingColor = headingGroup?.headingColor || 'text-slate-950'
  const headingMb = headingGroup?.headingMarginBottom || 'mb-6'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-2xl sm:text-3xl lg:text-4xl',
    'font-bold',
  )

  // Description (Default enabled)
  const description = descriptionGroup?.description
  const descriptionColor = descriptionGroup?.descriptionColor || 'text-slate-700'
  const descMb = descriptionGroup?.descriptionMarginBottom || 'mb-8'
  const descriptionTypography = resolveTypography(
    descriptionGroup?.descriptionFontSize,
    descriptionGroup?.descriptionFontSizeMobile,
    descriptionGroup?.descriptionFontWeight,
    descriptionGroup?.descriptionFontWeightMobile,
    'text-base lg:text-lg',
    'font-normal',
  )

  // Button (Optional)
  const btnText = buttonGroup?.buttonText?.trim() || ''
  const hasButton = Boolean(btnText)
  const btnStyle = buttonGroup?.buttonStyle || 'capsuleArrow'
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

  // Resolve link safely
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

  // Determine flex direction on desktop
  const isImageRight = imagePosition === 'imageRight'
  const desktopDirectionClass = isImageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'

  return (
    <section
      className={cn(
        'relative w-full overflow-hidden transition-colors duration-300',
        isColumn && 'h-full flex-1 flex flex-col',
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

      <div
        className={cn(
          'w-full',
          isColumn ? 'h-full flex-1 flex flex-col' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        )}
      >
        {/* ─── Outer Card Shell (Default: rounded-none) ────────────────────── */}
        <div
          className={cn(
            'w-full flex flex-col items-stretch overflow-hidden shadow-none transition-all duration-300',
            desktopDirectionClass,
            isColumn && 'h-full flex-1',
            cardBgColor,
            cardBorderRadius,
          )}
        >
          {/* ─── Image Half (50% Desktop Width) ─────────────────────────────── */}
          <div
            className={cn(
              'w-full lg:w-1/2 relative flex-shrink-0 overflow-hidden bg-slate-100',
              mobileHeightClass,
              'lg:h-auto lg:min-h-[460px] xl:min-h-[520px]',
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
              /* Clean visual placeholder if image not uploaded yet */
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                <svg
                  className="w-16 h-16 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* ─── Text Content Half (50% Desktop Width) ───────────────────────── */}
          <div
            className={cn(
              'w-full lg:w-1/2 flex flex-col justify-center',
              padUid,
              // Mobile paddings (Tailwind classes)
              padTopMobile,
              padBottomMobile,
              padLeftMobile,
              padRightMobile,
              // Desktop padding defaults (unless custom scoped CSS overrides it)
              !isPadTopCustom && `lg:${padTopDesktop}`,
              !isPadBottomCustom && `lg:${padBottomDesktop}`,
              !isPadLeftCustom && `lg:${padLeftDesktop}`,
              !isPadRightCustom && `lg:${padRightDesktop}`,
            )}
          >
            {/* Optional Subheading / Pill Badge */}
            {hasSubheading && (
              <div className={cn('flex items-center', subheadingMb)}>
                {subheadingStyle === 'badge' ? (
                  <span
                    className={cn(
                      'inline-block px-4 py-1.5 rounded-full tracking-wide',
                      subheadingBg,
                      subheadingTextColor,
                      subheadingTypography.combined,
                    )}
                  >
                    {subheadingText}
                  </span>
                ) : (
                  <span
                    className={cn(
                      'inline-block uppercase tracking-wider',
                      subheadingTextColor,
                      subheadingTypography.combined,
                    )}
                  >
                    {subheadingText}
                  </span>
                )}
              </div>
            )}

            {/* Main Heading (Default: "We embody our values") */}
            <div className={cn(headingMb)}>
              {renderContent(
                heading,
                cn(
                  'tracking-tight leading-[1.15]',
                  headingColor,
                  headingTypography.combined,
                ),
                DEFAULT_HEADING,
              )}
            </div>

            {/* Description / Body Copy (Default: 316 Group values paragraph) */}
            <div className={cn(descMb)}>
              {renderContent(
                description,
                cn(
                  'leading-relaxed',
                  descriptionColor,
                  descriptionTypography.combined,
                ),
                DEFAULT_DESCRIPTION,
              )}
            </div>

            {/* Optional CTA Button */}
            {hasButton && (
              <div className="flex items-center pt-2">
                {btnStyle === 'capsuleArrow' ? (
                  isLinked ? (
                    <Link
                      href={href}
                      {...newTabProps}
                      className={cn(
                        'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full shadow-sm transition-all group/btn hover:shadow-md hover:scale-102 cursor-pointer',
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
                        'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full shadow-sm transition-all group/btn hover:shadow-md hover:scale-102 cursor-pointer',
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
                  )
                ) : (
                  /* Standard Button Style */
                  isLinked ? (
                    <Link
                      href={href}
                      {...newTabProps}
                      className={cn(
                        'inline-flex items-center px-7 py-3 rounded-xl shadow-sm transition-all hover:shadow-md hover:opacity-90 cursor-pointer',
                        btnBg,
                        btnTextCol,
                        btnTypography.combined,
                      )}
                    >
                      <span>{btnText}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={cn(
                        'inline-flex items-center px-7 py-3 rounded-xl shadow-sm transition-all hover:shadow-md hover:opacity-90 cursor-pointer',
                        btnBg,
                        btnTextCol,
                        btnTypography.combined,
                      )}
                    >
                      <span>{btnText}</span>
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageTextSplit2Client

