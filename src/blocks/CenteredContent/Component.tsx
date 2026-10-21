'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/cn'

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
    badgeFontWeight?: string | null
  } | null
  heading1?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
  } | null
  heading2?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
  } | null
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | null
  descriptionGroup?: {
    description?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
  } | null
  // Mobile Width & Padding
  mobileWidthMode?: 'default' | 'fullWidth' | 'customPadding' | null
  mobilePaddingX?: string | null
  mobilePaddingXCustom?: string | null

  className?: string
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
  const badgeSize = badge?.badgeFontSize || 'text-sm'
  const badgeWeight = badge?.badgeFontWeight || 'font-medium'

  // Heading 1 config
  const h1Text = heading1?.text
  const h1Color = heading1?.color || 'text-gray-900'
  const h1Size = heading1?.fontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const h1Weight = heading1?.fontWeight || 'font-normal'

  // Heading 2 config
  const h2Text = heading2?.text
  const h2Color = heading2?.color || 'text-gray-900'
  const h2Size = heading2?.fontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const h2Weight = heading2?.fontWeight || 'font-normal'

  // Description config
  const descText = descriptionGroup?.description
  const descColor = descriptionGroup?.color || 'text-gray-700'
  const descSize = descriptionGroup?.fontSize || 'text-base md:text-lg lg:text-xl'
  const descWeight = descriptionGroup?.fontWeight || 'font-normal'

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
          (!mobileWidthMode || mobileWidthMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8',
          (mobileWidthMode === 'fullWidth' || mobileWidthMode === 'customPadding') &&
            cn('md:container md:mx-auto md:px-6 lg:px-8', padUid),
        )}
      >
        <div
          className={cn(
            'w-full flex flex-col',
            !mobileWidthMode || mobileWidthMode === 'default'
              ? maxWidth || 'max-w-4xl'
              : cn('max-md:max-w-none', maxWidth || 'max-w-4xl'),
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
                  badgeSize,
                  badgeWeight,
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
                  className={cn('block transition-colors', h1Size, h1Color, h1Weight)}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(h1Text) }}
                />
              )}
              {h2Text && (
                <span
                  className={cn(
                    'block transition-colors',
                    h2Size,
                    h2Color,
                    h2Weight,
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
                'w-full mt-6 md:mt-8 max-w-3xl leading-relaxed transition-colors',
                descriptionAlignClasses,
                descSize,
                descColor,
                descWeight,
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
