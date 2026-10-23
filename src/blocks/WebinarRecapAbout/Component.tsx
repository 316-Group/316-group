'use client'

import React from 'react'
import { cn } from '@/utilities/cn'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

export interface LearningItem {
  id?: string
  boxBgColor?: string
  boldPrefix?: string | null
  text?: string | null
}

export interface WebinarRecapAboutProps {
  // Content Tab
  metaRow?: {
    aboutHeading?: string
    recordedDateText?: string
  }
  aboutHeading?: string
  recordedDateText?: string

  intro?: {
    introSubheading?: string
    introHeading?: string
    introDescription?: string
  }
  introSubheading?: string
  introHeading?: string
  introDescription?: string

  takeaways?: {
    learnSubheading?: string
    learnHeading?: string
    learningItems?: LearningItem[]
  }
  learnSubheading?: string
  learnHeading?: string
  learningItems?: LearningItem[]

  concluding?: {
    concludingText?: string
  }
  concludingText?: string

  // Individual Styling Tab
  metaRowStyles?: {
    aboutHeadingColor?: string
    aboutHeadingFontSizeDesktop?: string
    aboutHeadingFontSizeMobile?: string
    aboutHeadingFontWeightDesktop?: string
    aboutHeadingFontWeightMobile?: string
    recordedDateColor?: string
    recordedDateFontSizeDesktop?: string
    recordedDateFontSizeMobile?: string
    recordedDateFontWeightDesktop?: string
    recordedDateFontWeightMobile?: string
    metaRowMarginBottomDesktop?: string
    metaRowMarginBottomMobile?: string
  }
  aboutHeadingColor?: string
  aboutHeadingFontSizeDesktop?: string
  aboutHeadingFontSizeMobile?: string
  aboutHeadingFontWeightDesktop?: string
  aboutHeadingFontWeightMobile?: string
  recordedDateColor?: string
  recordedDateFontSizeDesktop?: string
  recordedDateFontSizeMobile?: string
  recordedDateFontWeightDesktop?: string
  recordedDateFontWeightMobile?: string
  metaRowMarginBottomDesktop?: string
  metaRowMarginBottomMobile?: string

  hrStyles?: {
    hrColor?: string
    hrHeight?: string
    hrMarginBottomDesktop?: string
    hrMarginBottomMobile?: string
  }
  hrColor?: string
  hrHeight?: string
  hrMarginBottomDesktop?: string
  hrMarginBottomMobile?: string

  introStyles?: {
    introSubheadingColor?: string
    introSubheadingFontSizeDesktop?: string
    introSubheadingFontSizeMobile?: string
    introSubheadingFontWeightDesktop?: string
    introSubheadingFontWeightMobile?: string
    introSubheadingMarginBottomDesktop?: string
    introSubheadingMarginBottomMobile?: string
    introHeadingColor?: string
    introHeadingFontSizeDesktop?: string
    introHeadingFontSizeMobile?: string
    introHeadingFontWeightDesktop?: string
    introHeadingFontWeightMobile?: string
    introHeadingMarginBottomDesktop?: string
    introHeadingMarginBottomMobile?: string
    introDescriptionColor?: string
    introDescriptionFontSizeDesktop?: string
    introDescriptionFontSizeMobile?: string
    introDescriptionFontWeightDesktop?: string
    introDescriptionFontWeightMobile?: string
    introDescriptionMarginBottomDesktop?: string
    introDescriptionMarginBottomMobile?: string
  }
  introSubheadingColor?: string
  introSubheadingFontSizeDesktop?: string
  introSubheadingFontSizeMobile?: string
  introSubheadingFontWeightDesktop?: string
  introSubheadingFontWeightMobile?: string
  introSubheadingMarginBottomDesktop?: string
  introSubheadingMarginBottomMobile?: string
  introHeadingColor?: string
  introHeadingFontSizeDesktop?: string
  introHeadingFontSizeMobile?: string
  introHeadingFontWeightDesktop?: string
  introHeadingFontWeightMobile?: string
  introHeadingMarginBottomDesktop?: string
  introHeadingMarginBottomMobile?: string
  introDescriptionColor?: string
  introDescriptionFontSizeDesktop?: string
  introDescriptionFontSizeMobile?: string
  introDescriptionFontWeightDesktop?: string
  introDescriptionFontWeightMobile?: string
  introDescriptionMarginBottomDesktop?: string
  introDescriptionMarginBottomMobile?: string

  takeawaysStyles?: {
    learnSubheadingColor?: string
    learnSubheadingFontSizeDesktop?: string
    learnSubheadingFontSizeMobile?: string
    learnSubheadingFontWeightDesktop?: string
    learnSubheadingFontWeightMobile?: string
    learnSubheadingMarginBottomDesktop?: string
    learnSubheadingMarginBottomMobile?: string
    learnHeadingColor?: string
    learnHeadingFontSizeDesktop?: string
    learnHeadingFontSizeMobile?: string
    learnHeadingFontWeightDesktop?: string
    learnHeadingFontWeightMobile?: string
    learnHeadingMarginBottomDesktop?: string
    learnHeadingMarginBottomMobile?: string
    listItemTextColor?: string
    listItemFontSizeDesktop?: string
    listItemFontSizeMobile?: string
    listItemFontWeightDesktop?: string
    listItemFontWeightMobile?: string
    listItemMarginBottomDesktop?: string
    listItemMarginBottomMobile?: string
    listContainerMarginBottomDesktop?: string
    listContainerMarginBottomMobile?: string
  }
  learnSubheadingColor?: string
  learnSubheadingFontSizeDesktop?: string
  learnSubheadingFontSizeMobile?: string
  learnSubheadingFontWeightDesktop?: string
  learnSubheadingFontWeightMobile?: string
  learnSubheadingMarginBottomDesktop?: string
  learnSubheadingMarginBottomMobile?: string
  learnHeadingColor?: string
  learnHeadingFontSizeDesktop?: string
  learnHeadingFontSizeMobile?: string
  learnHeadingFontWeightDesktop?: string
  learnHeadingFontWeightMobile?: string
  learnHeadingMarginBottomDesktop?: string
  learnHeadingMarginBottomMobile?: string
  listItemTextColor?: string
  listItemFontSizeDesktop?: string
  listItemFontSizeMobile?: string
  listItemFontWeightDesktop?: string
  listItemFontWeightMobile?: string
  listItemMarginBottomDesktop?: string
  listItemMarginBottomMobile?: string
  listContainerMarginBottomDesktop?: string
  listContainerMarginBottomMobile?: string

  concludingStyles?: {
    concludingTextColor?: string
    concludingFontSizeDesktop?: string
    concludingFontSizeMobile?: string
    concludingFontWeightDesktop?: string
    concludingFontWeightMobile?: string
    concludingMarginBottomDesktop?: string
    concludingMarginBottomMobile?: string
  }
  concludingTextColor?: string
  concludingFontSizeDesktop?: string
  concludingFontSizeMobile?: string
  concludingFontWeightDesktop?: string
  concludingFontWeightMobile?: string
  concludingMarginBottomDesktop?: string
  concludingMarginBottomMobile?: string

  // Section Layout Tab
  sectionBgColor?: string
  matchHeaderPillWidth?: boolean
  paddingTopDesktop?: string
  paddingTopMobile?: string
  paddingBottomDesktop?: string
  paddingBottomMobile?: string
  paddingLeftDesktop?: string
  paddingLeftMobile?: string
  paddingRightDesktop?: string
  paddingRightMobile?: string
  customSectionId?: string
}

export const WebinarRecapAboutBlock: React.FC<WebinarRecapAboutProps> = (props) => {
  // Content values (with fallbacks for nested groups or direct props)
  const aboutHeading = props.metaRow?.aboutHeading ?? props.aboutHeading ?? 'About this webinar'
  const recordedDateText =
    props.metaRow?.recordedDateText ?? props.recordedDateText ?? 'Recorded 18 September 2026'

  const introSubheading =
    props.intro?.introSubheading ?? props.introSubheading ?? 'INTRODUCTION'
  const introHeading =
    props.intro?.introHeading ?? props.introHeading ?? 'Why this moment matters for fintech'
  const introDescription =
    props.intro?.introDescription ??
    props.introDescription ??
    'Financial technology is redefining how the world manages, moves and grows money. But scaling a fintech product in a regulated environment demands far more than a good idea. It requires robust evidence, cross-sector collaboration, and a deep understanding of compliance, consumer trust and the evolving expectations of financial institutions worldwide.'

  const learnSubheading =
    props.takeaways?.learnSubheading ?? props.learnSubheading ?? "WHAT YOU'LL LEARN"
  const learnHeading =
    props.takeaways?.learnHeading ??
    props.learnHeading ??
    'We explored the path from innovation to impact in financial services:'
  const learningItems = props.takeaways?.learningItems ?? props.learningItems ?? []

  const concludingText = props.concluding?.concludingText ?? props.concludingText

  // Meta row styles
  const aboutHeadingColor =
    props.metaRowStyles?.aboutHeadingColor ?? props.aboutHeadingColor ?? 'text-gray-950'
  const aboutHeadingFontSizeDesktop =
    props.metaRowStyles?.aboutHeadingFontSizeDesktop ??
    props.aboutHeadingFontSizeDesktop ??
    'text-2xl md:text-3xl lg:text-4xl'
  const aboutHeadingFontSizeMobile =
    props.metaRowStyles?.aboutHeadingFontSizeMobile ??
    props.aboutHeadingFontSizeMobile ??
    'text-2xl'
  const aboutHeadingFontWeightDesktop =
    props.metaRowStyles?.aboutHeadingFontWeightDesktop ??
    props.aboutHeadingFontWeightDesktop ??
    'font-semibold'
  const aboutHeadingFontWeightMobile =
    props.metaRowStyles?.aboutHeadingFontWeightMobile ??
    props.aboutHeadingFontWeightMobile ??
    'font-semibold'

  const recordedDateColor =
    props.metaRowStyles?.recordedDateColor ?? props.recordedDateColor ?? 'text-gray-500'
  const recordedDateFontSizeDesktop =
    props.metaRowStyles?.recordedDateFontSizeDesktop ??
    props.recordedDateFontSizeDesktop ??
    'text-xs sm:text-sm'
  const recordedDateFontSizeMobile =
    props.metaRowStyles?.recordedDateFontSizeMobile ?? props.recordedDateFontSizeMobile ?? 'text-xs'
  const recordedDateFontWeightDesktop =
    props.metaRowStyles?.recordedDateFontWeightDesktop ??
    props.recordedDateFontWeightDesktop ??
    'font-normal'
  const recordedDateFontWeightMobile =
    props.metaRowStyles?.recordedDateFontWeightMobile ??
    props.recordedDateFontWeightMobile ??
    'font-normal'

  const metaRowMarginBottomDesktop =
    props.metaRowStyles?.metaRowMarginBottomDesktop ??
    props.metaRowMarginBottomDesktop ??
    'mb-4 md:mb-6'
  const metaRowMarginBottomMobile =
    props.metaRowStyles?.metaRowMarginBottomMobile ?? props.metaRowMarginBottomMobile ?? 'mb-4'

  // HR Line styles
  const hrColor = props.hrStyles?.hrColor ?? props.hrColor ?? 'bg-slate-300'
  const hrHeight = props.hrStyles?.hrHeight ?? props.hrHeight ?? 'h-px'
  const hrMarginBottomDesktop =
    props.hrStyles?.hrMarginBottomDesktop ?? props.hrMarginBottomDesktop ?? 'mb-8 md:mb-12'
  const hrMarginBottomMobile =
    props.hrStyles?.hrMarginBottomMobile ?? props.hrMarginBottomMobile ?? 'mb-6'

  // Intro styles
  const introSubheadingColor =
    props.introStyles?.introSubheadingColor ?? props.introSubheadingColor ?? 'text-[#0000FF]'
  const introSubheadingFontSizeDesktop =
    props.introStyles?.introSubheadingFontSizeDesktop ??
    props.introSubheadingFontSizeDesktop ??
    'text-xs md:text-sm'
  const introSubheadingFontSizeMobile =
    props.introStyles?.introSubheadingFontSizeMobile ??
    props.introSubheadingFontSizeMobile ??
    'text-xs'
  const introSubheadingFontWeightDesktop =
    props.introStyles?.introSubheadingFontWeightDesktop ??
    props.introSubheadingFontWeightDesktop ??
    'font-semibold'
  const introSubheadingFontWeightMobile =
    props.introStyles?.introSubheadingFontWeightMobile ??
    props.introSubheadingFontWeightMobile ??
    'font-semibold'
  const introSubheadingMarginBottomDesktop =
    props.introStyles?.introSubheadingMarginBottomDesktop ??
    props.introSubheadingMarginBottomDesktop ??
    'mb-3 md:mb-4'
  const introSubheadingMarginBottomMobile =
    props.introStyles?.introSubheadingMarginBottomMobile ??
    props.introSubheadingMarginBottomMobile ??
    'mb-3'

  const introHeadingColor =
    props.introStyles?.introHeadingColor ?? props.introHeadingColor ?? 'text-gray-950'
  const introHeadingFontSizeDesktop =
    props.introStyles?.introHeadingFontSizeDesktop ??
    props.introHeadingFontSizeDesktop ??
    'text-3xl md:text-4xl lg:text-5xl'
  const introHeadingFontSizeMobile =
    props.introStyles?.introHeadingFontSizeMobile ??
    props.introHeadingFontSizeMobile ??
    'text-2xl sm:text-3xl'
  const introHeadingFontWeightDesktop =
    props.introStyles?.introHeadingFontWeightDesktop ??
    props.introHeadingFontWeightDesktop ??
    'font-semibold'
  const introHeadingFontWeightMobile =
    props.introStyles?.introHeadingFontWeightMobile ??
    props.introHeadingFontWeightMobile ??
    'font-semibold'
  const introHeadingMarginBottomDesktop =
    props.introStyles?.introHeadingMarginBottomDesktop ??
    props.introHeadingMarginBottomDesktop ??
    'mb-4 md:mb-6'
  const introHeadingMarginBottomMobile =
    props.introStyles?.introHeadingMarginBottomMobile ??
    props.introHeadingMarginBottomMobile ??
    'mb-4'

  const introDescriptionColor =
    props.introStyles?.introDescriptionColor ?? props.introDescriptionColor ?? 'text-gray-700'
  const introDescriptionFontSizeDesktop =
    props.introStyles?.introDescriptionFontSizeDesktop ??
    props.introDescriptionFontSizeDesktop ??
    'text-base md:text-lg'
  const introDescriptionFontSizeMobile =
    props.introStyles?.introDescriptionFontSizeMobile ??
    props.introDescriptionFontSizeMobile ??
    'text-sm md:text-base'
  const introDescriptionFontWeightDesktop =
    props.introStyles?.introDescriptionFontWeightDesktop ??
    props.introDescriptionFontWeightDesktop ??
    'font-normal'
  const introDescriptionFontWeightMobile =
    props.introStyles?.introDescriptionFontWeightMobile ??
    props.introDescriptionFontWeightMobile ??
    'font-normal'
  const introDescriptionMarginBottomDesktop =
    props.introStyles?.introDescriptionMarginBottomDesktop ??
    props.introDescriptionMarginBottomDesktop ??
    'mb-10 md:mb-14'
  const introDescriptionMarginBottomMobile =
    props.introStyles?.introDescriptionMarginBottomMobile ??
    props.introDescriptionMarginBottomMobile ??
    'mb-8'

  // Takeaways styles
  const learnSubheadingColor =
    props.takeawaysStyles?.learnSubheadingColor ?? props.learnSubheadingColor ?? 'text-[#0000FF]'
  const learnSubheadingFontSizeDesktop =
    props.takeawaysStyles?.learnSubheadingFontSizeDesktop ??
    props.learnSubheadingFontSizeDesktop ??
    'text-xs md:text-sm'
  const learnSubheadingFontSizeMobile =
    props.takeawaysStyles?.learnSubheadingFontSizeMobile ??
    props.learnSubheadingFontSizeMobile ??
    'text-xs'
  const learnSubheadingFontWeightDesktop =
    props.takeawaysStyles?.learnSubheadingFontWeightDesktop ??
    props.learnSubheadingFontWeightDesktop ??
    'font-semibold'
  const learnSubheadingFontWeightMobile =
    props.takeawaysStyles?.learnSubheadingFontWeightMobile ??
    props.learnSubheadingFontWeightMobile ??
    'font-semibold'
  const learnSubheadingMarginBottomDesktop =
    props.takeawaysStyles?.learnSubheadingMarginBottomDesktop ??
    props.learnSubheadingMarginBottomDesktop ??
    'mb-3 md:mb-4'
  const learnSubheadingMarginBottomMobile =
    props.takeawaysStyles?.learnSubheadingMarginBottomMobile ??
    props.learnSubheadingMarginBottomMobile ??
    'mb-3'

  const learnHeadingColor =
    props.takeawaysStyles?.learnHeadingColor ?? props.learnHeadingColor ?? 'text-gray-950'
  const learnHeadingFontSizeDesktop =
    props.takeawaysStyles?.learnHeadingFontSizeDesktop ??
    props.learnHeadingFontSizeDesktop ??
    'text-3xl md:text-4xl lg:text-5xl'
  const learnHeadingFontSizeMobile =
    props.takeawaysStyles?.learnHeadingFontSizeMobile ??
    props.learnHeadingFontSizeMobile ??
    'text-2xl sm:text-3xl'
  const learnHeadingFontWeightDesktop =
    props.takeawaysStyles?.learnHeadingFontWeightDesktop ??
    props.learnHeadingFontWeightDesktop ??
    'font-semibold'
  const learnHeadingFontWeightMobile =
    props.takeawaysStyles?.learnHeadingFontWeightMobile ??
    props.learnHeadingFontWeightMobile ??
    'font-semibold'
  const learnHeadingMarginBottomDesktop =
    props.takeawaysStyles?.learnHeadingMarginBottomDesktop ??
    props.learnHeadingMarginBottomDesktop ??
    'mb-6 md:mb-8'
  const learnHeadingMarginBottomMobile =
    props.takeawaysStyles?.learnHeadingMarginBottomMobile ??
    props.learnHeadingMarginBottomMobile ??
    'mb-5'

  const listItemTextColor =
    props.takeawaysStyles?.listItemTextColor ?? props.listItemTextColor ?? 'text-gray-800'
  const listItemFontSizeDesktop =
    props.takeawaysStyles?.listItemFontSizeDesktop ??
    props.listItemFontSizeDesktop ??
    'text-base md:text-lg'
  const listItemFontSizeMobile =
    props.takeawaysStyles?.listItemFontSizeMobile ??
    props.listItemFontSizeMobile ??
    'text-sm md:text-base'
  const listItemFontWeightDesktop =
    props.takeawaysStyles?.listItemFontWeightDesktop ??
    props.listItemFontWeightDesktop ??
    'font-normal'
  const listItemFontWeightMobile =
    props.takeawaysStyles?.listItemFontWeightMobile ??
    props.listItemFontWeightMobile ??
    'font-normal'
  const listItemMarginBottomDesktop =
    props.takeawaysStyles?.listItemMarginBottomDesktop ??
    props.listItemMarginBottomDesktop ??
    'mb-5 md:mb-7'
  const listItemMarginBottomMobile =
    props.takeawaysStyles?.listItemMarginBottomMobile ??
    props.listItemMarginBottomMobile ??
    'mb-4'
  const listContainerMarginBottomDesktop =
    props.takeawaysStyles?.listContainerMarginBottomDesktop ??
    props.listContainerMarginBottomDesktop ??
    'mb-10 md:mb-14'
  const listContainerMarginBottomMobile =
    props.takeawaysStyles?.listContainerMarginBottomMobile ??
    props.listContainerMarginBottomMobile ??
    'mb-8'

  // Concluding styles
  const concludingTextColor =
    props.concludingStyles?.concludingTextColor ?? props.concludingTextColor ?? 'text-gray-700'
  const concludingFontSizeDesktop =
    props.concludingStyles?.concludingFontSizeDesktop ??
    props.concludingFontSizeDesktop ??
    'text-base md:text-lg'
  const concludingFontSizeMobile =
    props.concludingStyles?.concludingFontSizeMobile ??
    props.concludingFontSizeMobile ??
    'text-sm md:text-base'
  const concludingFontWeightDesktop =
    props.concludingStyles?.concludingFontWeightDesktop ??
    props.concludingFontWeightDesktop ??
    'font-normal'
  const concludingFontWeightMobile =
    props.concludingStyles?.concludingFontWeightMobile ??
    props.concludingFontWeightMobile ??
    'font-normal'
  const concludingMarginBottomDesktop =
    props.concludingStyles?.concludingMarginBottomDesktop ??
    props.concludingMarginBottomDesktop ??
    'mb-0'
  const concludingMarginBottomMobile =
    props.concludingStyles?.concludingMarginBottomMobile ??
    props.concludingMarginBottomMobile ??
    'mb-0'

  // Layout & Spacing
  const sectionBgColor = props.sectionBgColor ?? 'bg-white'
  const matchHeaderPillWidth = props.matchHeaderPillWidth ?? true

  const paddingTopDesktop = props.paddingTopDesktop ?? '80px'
  const paddingTopMobile = props.paddingTopMobile ?? '48px'
  const paddingBottomDesktop = props.paddingBottomDesktop ?? '80px'
  const paddingBottomMobile = props.paddingBottomMobile ?? '48px'
  const paddingLeftDesktop = props.paddingLeftDesktop ?? '32px'
  const paddingLeftMobile = props.paddingLeftMobile ?? '16px'
  const paddingRightDesktop = props.paddingRightDesktop ?? '32px'
  const paddingRightMobile = props.paddingRightMobile ?? '16px'

  // Inline CSS variables for smooth responsive spacing
  const sectionStyle: React.CSSProperties = {
    paddingTop: `var(--pad-t, ${paddingTopDesktop})`,
    paddingBottom: `var(--pad-b, ${paddingBottomDesktop})`,
    paddingLeft: matchHeaderPillWidth ? undefined : `var(--pad-l, ${paddingLeftDesktop})`,
    paddingRight: matchHeaderPillWidth ? undefined : `var(--pad-r, ${paddingRightDesktop})`,
  }

  const hasTopMeta = Boolean(aboutHeading || recordedDateText)
  const hasIntro = Boolean(introSubheading || introHeading || introDescription)
  const hasTakeaways = Boolean(learnSubheading || learnHeading || (learningItems && learningItems.length > 0))
  const hasConcluding = Boolean(concludingText)

  return (
    <section
      id={props.customSectionId || undefined}
      className={cn('w-full relative transition-colors duration-200', sectionBgColor)}
      style={sectionStyle}
    >
      <style jsx>{`
        section {
          --pad-t: ${paddingTopMobile};
          --pad-b: ${paddingBottomMobile};
          --pad-l: ${paddingLeftMobile};
          --pad-r: ${paddingRightMobile};
        }
        @media (min-width: 768px) {
          section {
            --pad-t: ${paddingTopDesktop};
            --pad-b: ${paddingBottomDesktop};
            --pad-l: ${paddingLeftDesktop};
            --pad-r: ${paddingRightDesktop};
          }
        }
      `}</style>

      <div
        className={cn(
          'w-full mx-auto',
          matchHeaderPillWidth ? 'max-w-[1472px] px-4 sm:px-6 lg:px-8' : 'w-full',
        )}
      >
        {/* 1. Top Meta Row: About this webinar | Recorded 18 September 2026 */}
        {hasTopMeta && (
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4',
              metaRowMarginBottomMobile,
              `md:${metaRowMarginBottomDesktop}`,
            )}
          >
            {aboutHeading && (
              <h2
                className={cn(
                  'tracking-tight m-0',
                  aboutHeadingColor,
                  aboutHeadingFontSizeMobile,
                  `md:${aboutHeadingFontSizeDesktop}`,
                  aboutHeadingFontWeightMobile,
                  `md:${aboutHeadingFontWeightDesktop}`,
                )}
              >
                {aboutHeading}
              </h2>
            )}

            {recordedDateText && (
              <span
                className={cn(
                  'shrink-0 text-left sm:text-right',
                  recordedDateColor,
                  recordedDateFontSizeMobile,
                  `md:${recordedDateFontSizeDesktop}`,
                  recordedDateFontWeightMobile,
                  `md:${recordedDateFontWeightDesktop}`,
                )}
              >
                {recordedDateText}
              </span>
            )}
          </div>
        )}

        {/* 2. Horizontal Divider Line */}
        {hrHeight !== 'h-0' && (
          <div
            className={cn(
              'w-full',
              hrColor,
              hrHeight,
              hrMarginBottomMobile,
              `md:${hrMarginBottomDesktop}`,
            )}
            role="separator"
          />
        )}

        {/* 3. Introduction Block */}
        {hasIntro && (
          <div>
            {introSubheading && (
              <div
                className={cn(
                  'tracking-wider uppercase',
                  introSubheadingColor,
                  introSubheadingFontSizeMobile,
                  `md:${introSubheadingFontSizeDesktop}`,
                  introSubheadingFontWeightMobile,
                  `md:${introSubheadingFontWeightDesktop}`,
                  introSubheadingMarginBottomMobile,
                  `md:${introSubheadingMarginBottomDesktop}`,
                )}
              >
                {introSubheading}
              </div>
            )}

            {introHeading && (
              <h3
                className={cn(
                  'tracking-tight leading-[1.18] m-0',
                  introHeadingColor,
                  introHeadingFontSizeMobile,
                  `md:${introHeadingFontSizeDesktop}`,
                  introHeadingFontWeightMobile,
                  `md:${introHeadingFontWeightDesktop}`,
                  introHeadingMarginBottomMobile,
                  `md:${introHeadingMarginBottomDesktop}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(introHeading) }}
              />
            )}

            {introDescription && (
              <div
                className={cn(
                  'leading-relaxed max-w-5xl whitespace-pre-line',
                  introDescriptionColor,
                  introDescriptionFontSizeMobile,
                  `md:${introDescriptionFontSizeDesktop}`,
                  introDescriptionFontWeightMobile,
                  `md:${introDescriptionFontWeightDesktop}`,
                  introDescriptionMarginBottomMobile,
                  `md:${introDescriptionMarginBottomDesktop}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(introDescription) }}
              />
            )}
          </div>
        )}

        {/* 4. What You'll Learn & Key Takeaways List */}
        {hasTakeaways && (
          <div>
            {learnSubheading && (
              <div
                className={cn(
                  'tracking-wider uppercase',
                  learnSubheadingColor,
                  learnSubheadingFontSizeMobile,
                  `md:${learnSubheadingFontSizeDesktop}`,
                  learnSubheadingFontWeightMobile,
                  `md:${learnSubheadingFontWeightDesktop}`,
                  learnSubheadingMarginBottomMobile,
                  `md:${learnSubheadingMarginBottomDesktop}`,
                )}
              >
                {learnSubheading}
              </div>
            )}

            {learnHeading && (
              <h3
                className={cn(
                  'tracking-tight leading-[1.18] m-0',
                  learnHeadingColor,
                  learnHeadingFontSizeMobile,
                  `md:${learnHeadingFontSizeDesktop}`,
                  learnHeadingFontWeightMobile,
                  `md:${learnHeadingFontWeightDesktop}`,
                  learnHeadingMarginBottomMobile,
                  `md:${learnHeadingMarginBottomDesktop}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(learnHeading) }}
              />
            )}

            {learningItems && learningItems.length > 0 && (
              <div
                className={cn(
                  'space-y-0',
                  listContainerMarginBottomMobile,
                  `md:${listContainerMarginBottomDesktop}`,
                )}
              >
                {learningItems.map((item, index) => {
                  const boxBg = item.boxBgColor || 'bg-[#0000FF]'
                  const boldPrefix = item.boldPrefix?.trim()
                  const itemText = item.text?.trim()

                  if (!boldPrefix && !itemText) return null

                  return (
                    <div
                      key={item.id || index}
                      className={cn(
                        'flex items-start gap-3.5 sm:gap-4',
                        listItemMarginBottomMobile,
                        `md:${listItemMarginBottomDesktop}`,
                      )}
                    >
                      {/* Square Accent Box */}
                      <span
                        className={cn(
                          'w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 rounded-[1px] mt-1.5 transition-colors',
                          boxBg,
                        )}
                        aria-hidden="true"
                      />

                      {/* Item Content with non-collapsing space */}
                      <div
                        className={cn(
                          'leading-relaxed max-w-5xl',
                          listItemTextColor,
                          listItemFontSizeMobile,
                          `md:${listItemFontSizeDesktop}`,
                          listItemFontWeightMobile,
                          `md:${listItemFontWeightDesktop}`,
                        )}
                      >
                        {boldPrefix && (
                          <strong className="font-semibold text-gray-950 inline">
                            {boldPrefix}
                            {/* Guarantee non-breaking separation space if body text follows */}
                            {itemText ? ' ' : ''}
                          </strong>
                        )}
                        {itemText && (
                          <span
                            className="inline"
                            dangerouslySetInnerHTML={{ __html: formatInlineHtml(itemText) }}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* 5. Concluding Narrative Copy */}
        {hasConcluding && (
          <div
            className={cn(
              'leading-relaxed max-w-5xl whitespace-pre-line',
              concludingTextColor,
              concludingFontSizeMobile,
              `md:${concludingFontSizeDesktop}`,
              concludingFontWeightMobile,
              `md:${concludingFontWeightDesktop}`,
              concludingMarginBottomMobile,
              `md:${concludingMarginBottomDesktop}`,
            )}
            dangerouslySetInnerHTML={{ __html: formatInlineHtml(concludingText) }}
          />
        )}
      </div>
    </section>
  )
}

export default WebinarRecapAboutBlock
