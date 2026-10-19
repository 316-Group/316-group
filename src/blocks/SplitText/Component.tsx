import React from 'react'
import { cn } from '@/utilities/cn'

export interface SplitTextProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingBottom?: string | null

  // Horizontal Padding Mode
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  // Left Column
  leftColumn?: {
    badgeGroup?: {
      text?: string | null
      bgColor?: string | null
      textColor?: string | null
      fontSize?: string | null
      fontWeight?: string | null
    } | null
    spacingBeforeHeading?: string | null
    spacingBeforeHeadingCustom?: string | null
    headingGroup?: {
      text?: string | null
      color?: string | null
      fontSize?: string | null
      fontWeight?: string | null
      tag?: 'h1' | 'h2' | 'h3' | 'div' | null
    } | null
  } | null

  // Right Column
  rightColumn?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
  } | null

  className?: string
}

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const SplitTextBlock: React.FC<SplitTextProps> = ({
  sectionBgColor = 'bg-transparent',
  paddingTop = 'pt-8',
  paddingBottom = 'pb-8',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  leftColumn,
  rightColumn,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')

  // ─── Layout & Padding Resolution ───────────────────────────────────────────
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
    paddingMode === 'custom' || paddingMode === 'none' ? `splittext-pad-${uid}` : ''

  // ─── Left Column: Badge ───────────────────────────────────────────────────
  const badgeText = leftColumn?.badgeGroup?.text?.trim()
  const hasBadgeText = Boolean(badgeText)
  const badgeBg = leftColumn?.badgeGroup?.bgColor || 'bg-[#EFF1F8]'
  const badgeTextCol = leftColumn?.badgeGroup?.textColor || 'text-[#3F5AC9]'
  const badgeSize = leftColumn?.badgeGroup?.fontSize || 'text-sm'
  const badgeWeight = leftColumn?.badgeGroup?.fontWeight || 'font-medium'

  // Spacing Before Heading
  const spacingSelect = leftColumn?.spacingBeforeHeading || '16px'
  const resolvedSpacingBeforeHeading =
    spacingSelect === 'custom'
      ? leftColumn?.spacingBeforeHeadingCustom || '16px'
      : spacingSelect

  // Heading
  const headingText = leftColumn?.headingGroup?.text?.trim()
  const hasHeadingText = Boolean(headingText)
  const headingColor = leftColumn?.headingGroup?.color || 'text-gray-950'
  const headingSize =
    leftColumn?.headingGroup?.fontSize || 'text-3xl md:text-4xl lg:text-5xl'
  const headingWeight = leftColumn?.headingGroup?.fontWeight || 'font-semibold'
  const HeadingTag = (leftColumn?.headingGroup?.tag as keyof React.JSX.IntrinsicElements) || 'h2'

  // ─── Right Column: Description ────────────────────────────────────────────
  const descText = rightColumn?.text?.trim()
  const hasDescText = Boolean(descText)
  const descColor = rightColumn?.color || 'text-gray-600'
  const descSize = rightColumn?.fontSize || 'text-base md:text-lg'
  const descWeight = rightColumn?.fontWeight || 'font-normal'

  // If nothing is provided, return null cleanly
  if (!hasBadgeText && !hasHeadingText && !hasDescText) {
    return null
  }

  return (
    <section
      className={cn('w-full relative transition-colors duration-300', sectionBgColor, className)}
    >
      {/* Dynamic Custom Horizontal Padding Overrides */}
      {(paddingMode === 'custom' || paddingMode === 'none') && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad} !important;
            padding-right: ${resolvedMobilePad} !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @media (min-width: 1024px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad} !important;
              padding-right: ${resolvedDesktopPad} !important;
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          'w-full',
          paddingTop,
          paddingBottom,
          paddingMode === 'default' && 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
          padClassName,
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          {/* Left Column: Badge & Heading */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Pill Badge with rounded left and right sides */}
            {hasBadgeText && (
              <div className="flex items-center">
                <span
                  className={cn(
                    'inline-flex items-center px-4 py-1.5 rounded-full border border-black/5 dark:border-white/10 transition-colors',
                    badgeBg,
                    badgeTextCol,
                    badgeSize,
                    badgeWeight,
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Dynamic Spacing Before Heading */}
            {hasBadgeText && hasHeadingText && (
              <div
                style={{
                  height: resolvedSpacingBeforeHeading,
                }}
                aria-hidden="true"
              />
            )}

            {/* Main Heading */}
            {hasHeadingText && (
              <HeadingTag
                className={cn(
                  'tracking-tight leading-[1.12] transition-colors',
                  headingColor,
                  headingSize,
                  headingWeight,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
            )}
          </div>

          {/* Right Column: Description on same line as the heading */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* On desktop, if left column has badge, offset description to align with heading */}
            {hasBadgeText && (
              <div
                className="hidden lg:block"
                style={{
                  height: `calc(32px + ${resolvedSpacingBeforeHeading})`,
                }}
                aria-hidden="true"
              />
            )}

            {hasDescText && (
              <div
                className={cn('leading-relaxed transition-colors', descColor, descSize, descWeight)}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
