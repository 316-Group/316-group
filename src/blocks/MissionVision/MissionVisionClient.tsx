'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/cn'

export interface MissionVisionItem {
  id?: string | null
  subHeading?: string | null
  subHeadingColor?: string | null
  subHeadingFontSize?: string | null
  subHeadingFontWeight?: string | null
  subHeadingFontSizeMobile?: string | null
  subHeadingFontWeightMobile?: string | null
  subHeadingMarginBottom?: string | null

  heading?: string | null
  headingColor?: string | null
  headingFontSize?: string | null
  headingFontWeight?: string | null
  headingFontSizeMobile?: string | null
  headingFontWeightMobile?: string | null
  headingMarginBottom?: string | null

  description?: string | null
  descriptionColor?: string | null
  descriptionFontSize?: string | null
  descriptionFontWeight?: string | null
  descriptionFontSizeMobile?: string | null
  descriptionFontWeightMobile?: string | null
  descriptionMarginBottom?: string | null
}

export interface MissionVisionProps {
  sectionBgColor?: string | null
  spacingAboveItems?: string | null
  paddingMode?: 'default' | 'custom' | 'none' | null
  paddingTopDesktop?: string | null
  paddingBottomDesktop?: string | null
  paddingLeftDesktop?: string | null
  paddingRightDesktop?: string | null
  paddingTopMobile?: string | null
  paddingBottomMobile?: string | null
  paddingLeftMobile?: string | null
  paddingRightMobile?: string | null
  items?: MissionVisionItem[] | null
  className?: string
}

import { resolveTypography } from '@/utilities/resolveTypography'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
}

export const MissionVisionClient: React.FC<MissionVisionProps> = ({
  sectionBgColor = 'bg-[#0256FF]',
  spacingAboveItems = 'pt-0',
  paddingMode = 'default',
  paddingTopDesktop = '60px',
  paddingBottomDesktop = '60px',
  paddingLeftDesktop = '48px',
  paddingRightDesktop = '48px',
  paddingTopMobile = '32px',
  paddingBottomMobile = '32px',
  paddingLeftMobile = '20px',
  paddingRightMobile = '20px',
  items = [],
  className,
}) => {
  const [uid] = useState(() => Math.random().toString(36).substring(2, 9))
  const padUid = `mv-pad-${uid}`

  const resolvedTopSpacing = spacingAboveItems || 'pt-0'

  return (
    <section
      className={cn(
        'w-full h-full flex flex-col justify-start relative transition-colors duration-200',
        sectionBgColor === 'bg-transparent'
          ? 'bg-transparent'
          : sectionBgColor || 'bg-[#0256FF]',
        className,
      )}
    >
      {/* Scoped Dynamic Custom Padding */}
      {paddingMode === 'custom' && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .${padUid} {
              padding-top: ${paddingTopMobile || '32px'} !important;
              padding-bottom: ${paddingBottomMobile || '32px'} !important;
              padding-left: ${paddingLeftMobile || '20px'} !important;
              padding-right: ${paddingRightMobile || '20px'} !important;
            }
            @media (min-width: 768px) {
              .${padUid} {
                padding-top: ${paddingTopDesktop || '60px'} !important;
                padding-bottom: ${paddingBottomDesktop || '60px'} !important;
                padding-left: ${paddingLeftDesktop || '48px'} !important;
                padding-right: ${paddingRightDesktop || '48px'} !important;
              }
            }
          `,
        }} />
      )}

      <div
        className={cn(
          'w-full flex-1 flex flex-col',
          (!paddingMode || paddingMode === 'default') &&
            'container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl py-12 md:py-16',
          paddingMode === 'none' && 'w-full max-w-none px-0 py-0',
          paddingMode === 'custom' && cn('w-full max-w-none', padUid),
        )}
      >
        {/* Optional Spacing Above Items */}
        {resolvedTopSpacing && resolvedTopSpacing !== 'pt-0' && (
          <div className={cn('w-full', resolvedTopSpacing)} aria-hidden="true" />
        )}

        {/* 2-Column Statements Grid (Max 2 columns per row) */}
        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-12 lg:gap-16 items-start w-full">
            {items.map((item, index) => {
              const subHeading = item.subHeading?.trim()
              const subHeadingCol = item.subHeadingColor || 'text-[#00E5FF]'
              const subHeadingMb = item.subHeadingMarginBottom || 'mb-4'
              const subHeadingTypography = resolveTypography(
                item.subHeadingFontSize,
                item.subHeadingFontSizeMobile,
                item.subHeadingFontWeight,
                item.subHeadingFontWeightMobile,
                'text-lg md:text-xl',
                'font-semibold',
              )

              const heading = item.heading?.trim()
              const headingCol = item.headingColor || 'text-white'
              const headingMb = item.headingMarginBottom || 'mb-6'
              const headingTypography = resolveTypography(
                item.headingFontSize,
                item.headingFontSizeMobile,
                item.headingFontWeight,
                item.headingFontWeightMobile,
                'text-3xl md:text-4xl lg:text-5xl',
                'font-bold',
              )

              const description = item.description?.trim()
              const descriptionCol = item.descriptionColor || 'text-white/90'
              const descriptionMb = item.descriptionMarginBottom || 'mb-0'
              const descriptionTypography = resolveTypography(
                item.descriptionFontSize,
                item.descriptionFontSizeMobile,
                item.descriptionFontWeight,
                item.descriptionFontWeightMobile,
                'text-base md:text-lg',
                'font-normal',
              )

              return (
                <div
                  key={item.id || index}
                  className="flex flex-col items-start w-full transition-opacity duration-300"
                >
                  {/* Sub-Heading */}
                  {subHeading && (
                    <p
                      className={cn(
                        'tracking-tight leading-snug transition-colors',
                        subHeadingCol,
                        subHeadingMb,
                        subHeadingTypography.combined,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(subHeading) }}
                    />
                  )}

                  {/* Heading */}
                  {heading && (
                    <h3
                      className={cn(
                        'tracking-tight leading-tight transition-colors',
                        headingCol,
                        headingMb,
                        headingTypography.combined,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(heading) }}
                    />
                  )}

                  {/* Description */}
                  {description && (
                    <div
                      className={cn(
                        'leading-relaxed transition-colors max-w-xl',
                        descriptionCol,
                        descriptionMb,
                        descriptionTypography.combined,
                      )}
                      dangerouslySetInnerHTML={{ __html: formatInlineHtml(description) }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
