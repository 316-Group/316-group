'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import RichText from '@/components/RichText'
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

export interface CenteredButtonProps {
  alignment?: 'center' | 'left' | 'right' | 'justify' | null
  maxWidth?: string | null
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingTopCustom?: string | null
  paddingBottom?: string | null
  paddingBottomCustom?: string | null
  mobileWidthMode?: 'default' | 'fullWidth' | 'customPadding' | null
  mobilePaddingX?: string | null
  mobilePaddingXCustom?: string | null

  // Badge
  badge?: {
    enableBadge?: boolean | null
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontWeight?: string | null
    badgeFontSizeMobile?: string | null
    badgeFontWeightMobile?: string | null
    badgeMarginBottom?: string | null
  } | null

  // Heading
  headingGroup?: {
    heading?: any | null
    headingColor?: string | null
    headingFontSize?: string | null
    headingFontWeight?: string | null
    headingFontSizeMobile?: string | null
    headingFontWeightMobile?: string | null
    headingMarginBottom?: string | null
  } | null

  // Description
  descriptionGroup?: {
    description?: any | null
    descriptionColor?: string | null
    descriptionFontSize?: string | null
    descriptionFontWeight?: string | null
    descriptionFontSizeMobile?: string | null
    descriptionFontWeightMobile?: string | null
    descriptionMarginBottom?: string | null
  } | null

  // Button
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

export const CenteredButtonClient: React.FC<CenteredButtonProps> = ({
  alignment = 'center',
  maxWidth = 'max-w-4xl',
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-16',
  paddingTopCustom,
  paddingBottom = 'pb-16',
  paddingBottomCustom,
  mobileWidthMode = 'default',
  mobilePaddingX = '16px',
  mobilePaddingXCustom,
  badge,
  headingGroup,
  descriptionGroup,
  buttonGroup,
  className,
}) => {
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const align = alignment || 'center'

  // Alignment classes
  const alignContainerClasses = {
    center: 'text-center mx-auto items-center',
    left: 'text-left mr-auto items-start',
    right: 'text-right ml-auto items-end',
    justify: 'text-justify mx-auto items-center',
  }[align]

  const badgeWrapperClasses = {
    center: 'flex justify-center',
    left: 'flex justify-start',
    right: 'flex justify-end',
    justify: 'flex justify-center',
  }[align]

  const buttonWrapperClasses = {
    center: 'flex justify-center',
    left: 'flex justify-start',
    right: 'flex justify-end',
    justify: 'flex justify-center',
  }[align]

  // Spacing
  const resolvedPt =
    paddingTop === 'custom' && paddingTopCustom ? paddingTopCustom : (paddingTop ?? 'pt-0')
  const isPtClass = resolvedPt.startsWith('pt-')

  const resolvedPb =
    paddingBottom === 'custom' && paddingBottomCustom
      ? paddingBottomCustom
      : (paddingBottom ?? 'pb-0')
  const isPbClass = resolvedPb.startsWith('pb-')

  // Mobile horizontal padding
  const resolvedMobilePadding =
    mobilePaddingX === 'custom' ? mobilePaddingXCustom || '16px' : mobilePaddingX || '16px'
  const customPaddingClass = `centered-btn-mobile-pad-${uid}`

  // Badge configuration
  const showBadge = badge?.enableBadge !== false && Boolean(badge?.badgeText?.trim())
  const badgeText = badge?.badgeText?.trim() || ''
  const badgeBg = badge?.badgeBgColor || 'bg-[#0256FF]'
  const badgeTextColor = badge?.badgeTextColor || 'text-white'
  const badgeTypography = resolveTypography(
    badge?.badgeFontSize,
    badge?.badgeFontSizeMobile,
    badge?.badgeFontWeight,
    badge?.badgeFontWeightMobile,
    'text-sm',
    'font-medium',
  )
  const badgeMb = badge?.badgeMarginBottom || 'mb-8 md:mb-10'

  // Heading configuration
  const heading = headingGroup?.heading
  const headingColor = headingGroup?.headingColor || 'text-white'
  const headingTypography = resolveTypography(
    headingGroup?.headingFontSize,
    headingGroup?.headingFontSizeMobile,
    headingGroup?.headingFontWeight,
    headingGroup?.headingFontWeightMobile,
    'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    'font-bold',
  )
  const headingMb = headingGroup?.headingMarginBottom || 'mb-6'

  // Description configuration
  const description = descriptionGroup?.description
  const descriptionColor = descriptionGroup?.descriptionColor || 'text-white/90'
  const descriptionTypography = resolveTypography(
    descriptionGroup?.descriptionFontSize,
    descriptionGroup?.descriptionFontSizeMobile,
    descriptionGroup?.descriptionFontWeight,
    descriptionGroup?.descriptionFontWeightMobile,
    'text-base md:text-lg',
    'font-normal',
  )
  const descMb = descriptionGroup?.descriptionMarginBottom || 'mb-8 md:mb-10'

  // Button configuration
  const btnText = buttonGroup?.buttonText?.trim() || ''
  const btnBg = buttonGroup?.buttonBgColor || 'bg-white'
  const btnTextCol = buttonGroup?.buttonTextColor || 'text-[#0256FF]'
  const iconCircleBg = buttonGroup?.iconCircleBgColor || 'bg-[#0256FF]'
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
  const rawLink = buttonGroup?.buttonLink
  const linkObj: LinkFieldProps | undefined =
    rawLink && 'link' in rawLink && rawLink.link
      ? rawLink.link
      : (rawLink as LinkFieldProps | undefined)

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
      ref={sectionRef}
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
      {/* Mobile custom padding style injection */}
      {mobileWidthMode === 'customPadding' && (
        <style>{`
          @media (max-width: 767px) {
            .${customPaddingClass} {
              padding-left: ${resolvedMobilePadding} !important;
              padding-right: ${resolvedMobilePadding} !important;
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          'w-full flex flex-col',
          alignContainerClasses,
          maxWidth || 'max-w-4xl',
          // Mobile Width Mode
          mobileWidthMode === 'default' && 'px-4 sm:px-6 lg:px-8',
          mobileWidthMode === 'fullWidth' && 'px-0 sm:px-6 lg:px-8',
          mobileWidthMode === 'customPadding' && cn(customPaddingClass, 'sm:px-6 lg:px-8'),
        )}
      >
        {/* 1. Pill Badge */}
        {showBadge && (
          <div
            className={cn(
              'w-full transition-all duration-700 ease-out',
              badgeWrapperClasses,
              badgeMb,
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            <span
              className={cn(
                'inline-flex items-center px-6 py-2.5 rounded-full backdrop-blur-md shadow-sm transition-all select-none',
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
              'w-full tracking-tight leading-[1.12] transition-all duration-700 ease-out delay-100',
              headingTypography.combined,
              headingColor,
              headingMb,
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {renderContent(heading, headingTypography.combined)}
          </div>
        )}

        {/* 3. Description */}
        {description && (
          <div
            className={cn(
              'w-full leading-relaxed transition-all duration-700 ease-out delay-200',
              descriptionTypography.combined,
              descriptionColor,
              descMb,
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
            {renderContent(description, descriptionTypography.combined)}
          </div>
        )}

        {/* 4. Action Button (Capsule with Circle Arrow) */}
        {Boolean(btnText) && (
          <div
            className={cn(
              'w-full transition-all duration-700 ease-out delay-300 pt-1',
              buttonWrapperClasses,
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
          >
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
    </section>
  )
}

export default CenteredButtonClient
