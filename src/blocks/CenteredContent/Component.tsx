'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'
import { resolveTypography } from '@/utilities/resolveTypography'

export interface CenteredContentProps {
  alignment?: 'center' | 'left' | 'right' | 'justify' | null
  maxWidth?: string | null
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null
  badge?: {
    enableBadge?: boolean | null
    badgeText?: string | null
    badgeBgColor?: string | null
    badgeTextColor?: string | null
    badgeFontSize?: string | null
    badgeFontSizeMobile?: string | null
    badgeFontWeight?: string | null
    badgeFontWeightMobile?: string | null
  } | null
  heading1?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null
  heading2?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | null
  descriptionGroup?: {
    description?: string | null
    color?: string | null
    fontSize?: string | null
    fontSizeMobile?: string | null
    fontWeight?: string | null
    fontWeightMobile?: string | null
  } | null
  // Mobile Width & Padding
  mobileWidthMode?: 'default' | 'fullWidth' | 'customPadding' | null
  mobilePaddingX?: string | null
  mobilePaddingXCustom?: string | null

  className?: string
  isColumn?: boolean
}

/**
 * Normalizes user-entered inline styles and HTML.
 * Handles cases like <style="color:red">...</style> or <style='color:red'>...</style>,
 * converting them to valid <span style="color:red">...</span>.
 */
export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const CenteredContentComponent: React.FC<CenteredContentProps> = ({
  alignment = 'center',
  maxWidth = 'max-w-4xl',
  sectionBgColor = 'bg-white',
  paddingTop = 'pt-16',
  paddingBottom = 'pb-16',
  mobileWidthMode = 'default',
  mobilePaddingX = '16px',
  mobilePaddingXCustom,
  badge,
  heading1,
  heading2,
  headingTag = 'h2',
  descriptionGroup,
  className,
  isColumn = false,
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
  const align = alignment || 'center'

  // Alignment classes for outer container & children
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

  const headingAlignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
    justify: 'text-center',
  }[align]

  const descriptionAlignClasses = {
    center: 'mx-auto text-center',
    left: 'mr-auto text-left',
    right: 'ml-auto text-right',
    justify: 'mx-auto text-justify',
  }[align]

  // Badge config
  const showBadge = badge?.enableBadge !== false && Boolean(badge?.badgeText)
  const badgeText = badge?.badgeText || 'Industries'
  const badgeBg = badge?.badgeBgColor || 'bg-[#EFF1F8]'
  const badgeTextCol = badge?.badgeTextColor || 'text-[#3F5AC9]'
  const badgeTypography = resolveTypography(
    badge?.badgeFontSize,
    badge?.badgeFontSizeMobile,
    badge?.badgeFontWeight,
    badge?.badgeFontWeightMobile,
    'text-sm',
    'font-medium',
  )

  // Heading 1 config
  const h1Text = heading1?.text
  const h1Color = heading1?.color || 'text-gray-900'
  const h1Typography = resolveTypography(
    heading1?.fontSize,
    heading1?.fontSizeMobile,
    heading1?.fontWeight,
    heading1?.fontWeightMobile,
    'text-4xl md:text-5xl lg:text-6xl',
    'font-normal',
  )

  // Heading 2 config
  const h2Text = heading2?.text
  const h2Color = heading2?.color || 'text-gray-900'
  const h2Typography = resolveTypography(
    heading2?.fontSize,
    heading2?.fontSizeMobile,
    heading2?.fontWeight,
    heading2?.fontWeightMobile,
    'text-4xl md:text-5xl lg:text-6xl',
    'font-normal',
  )

  // Description config
  const descText = descriptionGroup?.description
  const descColor = descriptionGroup?.color || 'text-gray-700'
  const descTypography = resolveTypography(
    descriptionGroup?.fontSize,
    descriptionGroup?.fontSizeMobile,
    descriptionGroup?.fontWeight,
    descriptionGroup?.fontWeightMobile,
    'text-base md:text-lg lg:text-xl',
    'font-normal',
  )

  const HeadingTag = (headingTag as keyof React.JSX.IntrinsicElements) || 'h2'

  const padUid = `cc-mob-pad-${uid}`
  const resolvedMobilePad =
    mobileWidthMode === 'fullWidth'
      ? '0px'
      : mobileWidthMode === 'customPadding'
        ? mobilePaddingX === 'custom'
          ? mobilePaddingXCustom || '16px'
          : mobilePaddingX || '16px'
        : '16px'

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200',
        isColumn && 'h-full flex-1 flex flex-col',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
        sectionBgColor || 'bg-white',
        paddingTop || 'pt-16',
        paddingBottom || 'pb-16',
        className,
      )}
    >
      {(mobileWidthMode === 'fullWidth' || mobileWidthMode === 'customPadding') && (
        <style>{`
          @media (max-width: 767px) {
            .${padUid} {
              padding-left: ${resolvedMobilePad} !important;
              padding-right: ${resolvedMobilePad} !important;
              width: 100% !important;
              max-width: 100% !important;
            }
          }
        `}</style>
      )}
      <div
        className={cn(
          'w-full',
          isColumn && 'h-full flex-1 flex flex-col',
          !isColumn && (!mobileWidthMode || mobileWidthMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8',
          !isColumn && (mobileWidthMode === 'fullWidth' || mobileWidthMode === 'customPadding') &&
            cn('md:container md:mx-auto md:px-6 lg:px-8', padUid),
          isColumn && mobileWidthMode === 'default' && 'px-4 sm:px-6',
          isColumn && mobileWidthMode === 'fullWidth' && 'px-0',
          isColumn && mobileWidthMode === 'customPadding' && padUid,
        )}
      >
        <div
          className={cn(
            'w-full flex flex-col',
            isColumn && 'h-full flex-1',
            !mobileWidthMode || mobileWidthMode === 'default'
              ? (isColumn && (!maxWidth || maxWidth === 'max-w-4xl') ? 'max-w-full' : (maxWidth || 'max-w-4xl'))
              : cn('max-md:max-w-none', isColumn && (!maxWidth || maxWidth === 'max-w-4xl') ? 'max-w-full' : (maxWidth || 'max-w-4xl')),
            alignContainerClasses,
          )}
        >
          {/* Badge */}
          {showBadge && (
            <div className={cn('w-full mb-6 md:mb-8', badgeWrapperClasses)}>
              <span
                className={cn(
                  'inline-flex items-center justify-center px-6 py-1.5 md:py-2 rounded-full tracking-wide transition-all shadow-sm',
                  badgeBg,
                  badgeTextCol,
                  badgeTypography,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(badgeText) }}
              />
            </div>
          )}

          {/* Headings */}
          {(h1Text || h2Text) && (
            <HeadingTag className={cn('w-full tracking-tight leading-[1.15]', headingAlignClasses)}>
              {h1Text && (
                <span
                  className={cn('block transition-colors', h1Color, h1Typography)}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(h1Text) }}
                />
              )}
              {h2Text && (
                <span
                  className={cn(
                    'block transition-colors',
                    h2Color,
                    h2Typography,
                    h1Text && 'mt-1.5 md:mt-2.5',
                  )}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(h2Text) }}
                />
              )}
            </HeadingTag>
          )}

          {/* Description */}
          {descText && (
            <div
              className={cn(
                'w-full mt-6 md:mt-8 leading-relaxed transition-colors',
                isColumn || maxWidth === 'max-w-full' ? 'max-w-full' : 'max-w-3xl',
                descriptionAlignClasses,
                descColor,
                descTypography,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export const CenteredContentBlock: React.FC<CenteredContentProps> = (props) => {
  return <CenteredContentComponent {...props} />
}
