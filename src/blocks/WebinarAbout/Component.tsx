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

export interface CoverageItem {
  id?: string
  boldPrefix?: string | null
  text: string
}

export interface WebinarAboutProps {
  // Zone 1: Top Bar
  topBar?: {
    title?: string
    meta?: string
  }
  topBarTitle?: string
  topBarMeta?: string

  // Zone 3: Introduction
  intro?: {
    kickerText?: string
    heading?: string
    description?: string
  }
  introKickerText?: string
  introHeading?: string
  introDescription?: string

  // Zone 4: Coverage
  coverage?: {
    kickerText?: string
    heading?: string
    items?: CoverageItem[]
  }
  coverageKickerText?: string
  coverageHeading?: string
  coverageItems?: CoverageItem[]

  // Zone 5: Concluding
  concluding?: {
    text?: string
  }
  concludingText?: string

  // Styling Groups
  topBarStyles?: {
    titleColor?: string
    titleFontSizeDesktop?: string
    titleFontSizeMobile?: string
    titleFontWeightDesktop?: string
    titleFontWeightMobile?: string
    metaColor?: string
    metaFontSizeDesktop?: string
    metaFontSizeMobile?: string
    metaFontWeightDesktop?: string
    metaFontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }

  hrStyles?: {
    lineColor?: string
    lineHeight?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }

  introStyles?: {
    squareColor?: string
    kickerColor?: string
    kickerFontSizeDesktop?: string
    kickerFontSizeMobile?: string
    kickerFontWeightDesktop?: string
    kickerFontWeightMobile?: string
    kickerMarginBottomDesktop?: string
    kickerMarginBottomMobile?: string
    headingColor?: string
    headingFontSizeDesktop?: string
    headingFontSizeMobile?: string
    headingFontWeightDesktop?: string
    headingFontWeightMobile?: string
    headingMarginBottomDesktop?: string
    headingMarginBottomMobile?: string
    descColor?: string
    descFontSizeDesktop?: string
    descFontSizeMobile?: string
    descFontWeightDesktop?: string
    descFontWeightMobile?: string
    descMarginBottomDesktop?: string
    descMarginBottomMobile?: string
  }

  coverageStyles?: {
    squareColor?: string
    kickerColor?: string
    kickerFontSizeDesktop?: string
    kickerFontSizeMobile?: string
    kickerFontWeightDesktop?: string
    kickerFontWeightMobile?: string
    kickerMarginBottomDesktop?: string
    kickerMarginBottomMobile?: string
    headingColor?: string
    headingFontSizeDesktop?: string
    headingFontSizeMobile?: string
    headingFontWeightDesktop?: string
    headingFontWeightMobile?: string
    headingMarginBottomDesktop?: string
    headingMarginBottomMobile?: string
    bulletBoxColor?: string
    itemTextColor?: string
    itemFontSizeDesktop?: string
    itemFontSizeMobile?: string
    itemFontWeightDesktop?: string
    itemFontWeightMobile?: string
    itemMarginBottomDesktop?: string
    itemMarginBottomMobile?: string
  }

  concludingStyles?: {
    marginTopDesktop?: string
    marginTopMobile?: string
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
  }

  // Section Layout & Spacing
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  className?: string
}

export const WebinarAboutBlock: React.FC<WebinarAboutProps> = (props) => {
  const {
    topBar = {},
    intro = {},
    coverage = {},
    concluding = {},
    topBarStyles = {},
    hrStyles = {},
    introStyles = {},
    coverageStyles = {},
    concludingStyles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-white',
    paddingTop = 'pt-16 md:pt-24',
    paddingBottom = 'pb-16 md:pb-24',
    paddingLeft,
    paddingRight,
    className,
  } = props

  // Data resolution with fallbacks matching group ui/webinar-2.png
  const title = topBar?.title ?? props.topBarTitle ?? 'About this webinar'
  const meta = topBar?.meta ?? props.topBarMeta ?? 'January Nov 24, 2026. 10:30AM BST'

  const introKicker = intro?.kickerText ?? props.introKickerText ?? 'INTRODUCTION'
  const introHeading = intro?.heading ?? props.introHeading ?? 'Why this is important'
  const introDesc =
    intro?.description ??
    props.introDescription ??
    "Hiring internationally shouldn't mean setting up an entity, stitching together local vendors, or carrying the compliance risk yourself. In this live 30-minute session, see how G-P Employer of Record makes it possible to hire, onboard, and manage employees in 180+ countries without any of that complexity."

  const coverageKicker = coverage?.kickerText ?? props.coverageKickerText ?? 'WHAT WE WILL COVER'
  const coverageHeading =
    coverage?.heading ?? props.coverageHeading ?? "We'll walk you through FintecConnect and cover:"

  const defaultItems: CoverageItem[] = [
    {
      boldPrefix: 'How FintecConnect works.',
      text: 'A clear walk-through of what G-P takes on, what stays with you, and where the compliance risk sits, so you and your buying committee know exactly how the relationship works.',
    },
    {
      boldPrefix: 'Onboard in minutes, not days:',
      text: 'Our AI-guided experience and Global Compliance Engine automatically applies real-time local labor laws and compliance requirements to every step— so your team can move fast without putting your business at risk.',
    },
    {
      boldPrefix: 'Full control, less friction:',
      text: 'Full control, less friction: Generate compliant contract in seconds, manage job changes, track onboarding progress, and access detailed financial reporting — all in one intuitive, self-serve platform.',
    },
    {
      boldPrefix: 'Technology when you want it, human when you need it:',
      text: 'G-P Assist delivers 24/7 expert, AI-powered answers built on our proprietary knowledge, and connects you to a live G-P team member when you need to talk to one of our local experts.',
    },
  ]

  const itemsList =
    coverage?.items && coverage.items.length > 0
      ? coverage.items
      : props.coverageItems && props.coverageItems.length > 0
        ? props.coverageItems
        : defaultItems

  const concludingText =
    concluding?.text ??
    props.concludingText ??
    "G-P also supports the wider global employment journey with G-P Gia for instant compliance answers and Contractor for international contractor management, so as your needs evolve, our Global Employment Platform evolves with you.\n\nBring your HR, finance, and legal stakeholders. Come with questions. Leave with a clear view of what global hiring looks like when it's done right."

  const isMatchHeader = matchHeaderPillWidth !== false

  return (
    <section
      className={cn(
        'w-full relative',
        sectionBgColor || 'bg-white',
        paddingTop,
        paddingBottom,
        className,
      )}
    >
      <div
        className={cn(
          'w-full mx-auto',
          isMatchHeader
            ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8'
            : cn(paddingLeft || 'px-6', paddingRight),
        )}
      >
        <div className="max-w-5xl mx-auto flex flex-col">
          {/* ═════════════════════════════════════════════════════════════════
              ZONE 1: TOP BAR (Left Title, Right Date/Time Metadata)
              ═════════════════════════════════════════════════════════════════ */}
          <div
            className={cn(
              'flex items-baseline justify-between flex-wrap gap-4',
              topBarStyles.marginBottomMobile || 'mb-4',
              `md:${topBarStyles.marginBottomDesktop || 'mb-6'}`,
            )}
          >
            {title && (
              <h2
                className={cn(
                  'tracking-tight',
                  topBarStyles.titleColor || 'text-gray-950',
                  topBarStyles.titleFontSizeMobile || 'text-2xl',
                  `md:${topBarStyles.titleFontSizeDesktop || 'text-2xl md:text-3xl lg:text-4xl'}`,
                  topBarStyles.titleFontWeightMobile || 'font-semibold',
                  `md:${topBarStyles.titleFontWeightDesktop || 'font-semibold'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(title) }}
              />
            )}
            {meta && (
              <span
                className={cn(
                  topBarStyles.metaColor || 'text-gray-500',
                  topBarStyles.metaFontSizeMobile || 'text-xs',
                  `md:${topBarStyles.metaFontSizeDesktop || 'text-xs sm:text-sm'}`,
                  topBarStyles.metaFontWeightMobile || 'font-normal',
                  `md:${topBarStyles.metaFontWeightDesktop || 'font-normal'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(meta) }}
              />
            )}
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              ZONE 2: HORIZONTAL DIVIDER LINE (<hr />)
              ═════════════════════════════════════════════════════════════════ */}
          <div
            className={cn(
              'w-full',
              hrStyles.lineHeight || 'h-px',
              hrStyles.lineColor || 'bg-slate-300',
              hrStyles.marginBottomMobile || 'mb-6',
              `md:${hrStyles.marginBottomDesktop || 'mb-8 md:mb-12'}`,
            )}
          />

          {/* ═════════════════════════════════════════════════════════════════
              ZONE 3: INTRODUCTION GROUP
              ═════════════════════════════════════════════════════════════════ */}
          {introKicker && (
            <div
              className={cn(
                'flex items-center gap-2.5 uppercase tracking-wider',
                introStyles.kickerMarginBottomMobile || 'mb-3',
                `md:${introStyles.kickerMarginBottomDesktop || 'mb-3 md:mb-4'}`,
              )}
            >
              <span
                className={cn(
                  'w-2.5 h-2.5 rounded-[1px] shrink-0',
                  introStyles.squareColor || 'bg-[#0056FF]',
                )}
              />
              <span
                className={cn(
                  introStyles.kickerColor || 'text-[#0056FF]',
                  introStyles.kickerFontSizeMobile || 'text-xs',
                  `md:${introStyles.kickerFontSizeDesktop || 'text-xs md:text-sm'}`,
                  introStyles.kickerFontWeightMobile || 'font-semibold',
                  `md:${introStyles.kickerFontWeightDesktop || 'font-semibold'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(introKicker) }}
              />
            </div>
          )}

          {introHeading && (
            <h3
              className={cn(
                'tracking-tight leading-[1.12]',
                introStyles.headingColor || 'text-gray-950',
                introStyles.headingFontSizeMobile || 'text-2xl sm:text-3xl',
                `md:${introStyles.headingFontSizeDesktop || 'text-3xl md:text-4xl lg:text-5xl'}`,
                introStyles.headingFontWeightMobile || 'font-bold',
                `md:${introStyles.headingFontWeightDesktop || 'font-bold'}`,
                introStyles.headingMarginBottomMobile || 'mb-4',
                `md:${introStyles.headingMarginBottomDesktop || 'mb-4 md:mb-6'}`,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(introHeading) }}
            />
          )}

          {introDesc && (
            <div
              className={cn(
                'leading-relaxed max-w-4xl',
                introStyles.descColor || 'text-gray-700',
                introStyles.descFontSizeMobile || 'text-sm md:text-base',
                `md:${introStyles.descFontSizeDesktop || 'text-base md:text-lg'}`,
                introStyles.descFontWeightMobile || 'font-normal',
                `md:${introStyles.descFontWeightDesktop || 'font-normal'}`,
                introStyles.descMarginBottomMobile || 'mb-8',
                `md:${introStyles.descMarginBottomDesktop || 'mb-10 md:mb-14'}`,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(introDesc) }}
            />
          )}

          {/* ═════════════════════════════════════════════════════════════════
              ZONE 4: "WHAT WE WILL COVER" CURRICULUM GROUP
              ═════════════════════════════════════════════════════════════════ */}
          {coverageKicker && (
            <div
              className={cn(
                'flex items-center gap-2.5 uppercase tracking-wider',
                coverageStyles.kickerMarginBottomMobile || 'mb-3',
                `md:${coverageStyles.kickerMarginBottomDesktop || 'mb-3 md:mb-4'}`,
              )}
            >
              <span
                className={cn(
                  'w-2.5 h-2.5 rounded-[1px] shrink-0',
                  coverageStyles.squareColor || 'bg-[#0056FF]',
                )}
              />
              <span
                className={cn(
                  coverageStyles.kickerColor || 'text-[#0056FF]',
                  coverageStyles.kickerFontSizeMobile || 'text-xs',
                  `md:${coverageStyles.kickerFontSizeDesktop || 'text-xs md:text-sm'}`,
                  coverageStyles.kickerFontWeightMobile || 'font-semibold',
                  `md:${coverageStyles.kickerFontWeightDesktop || 'font-semibold'}`,
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(coverageKicker) }}
              />
            </div>
          )}

          {coverageHeading && (
            <h3
              className={cn(
                'tracking-tight leading-[1.12]',
                coverageStyles.headingColor || 'text-gray-950',
                coverageStyles.headingFontSizeMobile || 'text-2xl sm:text-3xl',
                `md:${coverageStyles.headingFontSizeDesktop || 'text-3xl md:text-4xl lg:text-5xl'}`,
                coverageStyles.headingFontWeightMobile || 'font-bold',
                `md:${coverageStyles.headingFontWeightDesktop || 'font-bold'}`,
                coverageStyles.headingMarginBottomMobile || 'mb-5',
                `md:${coverageStyles.headingMarginBottomDesktop || 'mb-6 md:mb-8'}`,
              )}
              dangerouslySetInnerHTML={{ __html: formatInlineHtml(coverageHeading) }}
            />
          )}

          {/* Coverage List Items */}
          <div className="flex flex-col">
            {itemsList.map((item, idx) => (
              <div
                key={item.id || idx}
                className={cn(
                  'flex items-start gap-3 sm:gap-4',
                  coverageStyles.itemMarginBottomMobile || 'mb-4',
                  `md:${coverageStyles.itemMarginBottomDesktop || 'mb-4 md:mb-6'}`,
                )}
              >
                {/* Square bullet box */}
                <span
                  className={cn(
                    'w-3.5 h-3.5 md:w-4 md:h-4 rounded-[2px] shrink-0 mt-1',
                    coverageStyles.bulletBoxColor || 'bg-[#0056FF]',
                  )}
                />
                {/* Text area with bold prefix */}
                <div
                  className={cn(
                    'leading-relaxed max-w-4xl',
                    coverageStyles.itemTextColor || 'text-gray-800',
                    coverageStyles.itemFontSizeMobile || 'text-sm md:text-base',
                    `md:${coverageStyles.itemFontSizeDesktop || 'text-base md:text-lg'}`,
                    coverageStyles.itemFontWeightMobile || 'font-normal',
                    `md:${coverageStyles.itemFontWeightDesktop || 'font-normal'}`,
                  )}
                >
                  {item.boldPrefix && (
                    <strong className="font-semibold text-gray-950 mr-1.5">
                      {item.boldPrefix}
                    </strong>
                  )}
                  <span dangerouslySetInnerHTML={{ __html: formatInlineHtml(item.text) }} />
                </div>
              </div>
            ))}
          </div>

          {/* ═════════════════════════════════════════════════════════════════
              ZONE 5: CONCLUDING NARRATIVE & STAKEHOLDER TAKEAWAY
              ═════════════════════════════════════════════════════════════════ */}
          {concludingText && (
            <div
              className={cn(
                'leading-relaxed max-w-4xl [&_p]:mb-4 [&_p:last-child]:mb-0',
                concludingStyles.marginTopMobile || 'mt-6',
                `md:${concludingStyles.marginTopDesktop || 'mt-8 md:mt-12'}`,
                concludingStyles.textColor || 'text-gray-700',
                concludingStyles.fontSizeMobile || 'text-sm md:text-base',
                `md:${concludingStyles.fontSizeDesktop || 'text-base md:text-lg'}`,
                concludingStyles.fontWeightMobile || 'font-normal',
                `md:${concludingStyles.fontWeightDesktop || 'font-normal'}`,
              )}
            >
              {concludingText.split('\n\n').map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  dangerouslySetInnerHTML={{ __html: formatInlineHtml(paragraph) }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
