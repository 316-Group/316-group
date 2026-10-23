import React from 'react'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/cn'

interface EventRecapFeatureProps {
  badgeText?: string
  heading?: any
  description?: any
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
  featuredImage?: any
  badgeStyles?: {
    badgeBgColor?: string
    badgeTextColor?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  headingStyles?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  descriptionStyles?: {
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
    marginBottomDesktop?: string
    marginBottomMobile?: string
  }
  button1Styles?: {
    bgColor?: string
    textColor?: string
    iconColor?: string
  }
  button2Styles?: {
    textColor?: string
    iconColor?: string
  }
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  className?: string
}

export const EventRecapFeatureBlock: React.FC<EventRecapFeatureProps> = (props) => {
  const {
    badgeText = 'FULFILMENT BY 316',
    heading,
    description,
    button1Text = 'Book a meeting',
    button1Link,
    button2Text = 'Learn more',
    button2Link,
    featuredImage,
    badgeStyles = {},
    headingStyles = {},
    descriptionStyles = {},
    button1Styles = {},
    button2Styles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-[#F4F6F9]',
    paddingTop = 'pt-20 md:pt-28',
    paddingBottom = 'pb-20 md:pb-28',
    className,
  } = props

  const isMatchHeader = matchHeaderPillWidth !== false

  return (
    <section
      className={cn(
        'w-full relative',
        sectionBgColor || 'bg-[#F4F6F9]',
        paddingTop,
        paddingBottom,
        className,
      )}
    >
      <div
        className={cn(
          'w-full mx-auto',
          isMatchHeader ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8' : 'px-6',
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (Content Stack, Vertically Centered) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Top Pill Badge */}
            {badgeText && (
              <div
                className={cn(
                  badgeStyles.marginBottomMobile || 'mb-4',
                  `md:${badgeStyles.marginBottomDesktop || 'mb-6'}`,
                )}
              >
                <span
                  className={cn(
                    'inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-slate-200/80 shadow-xs',
                    badgeStyles.badgeBgColor || 'bg-white',
                    badgeStyles.badgeTextColor || 'text-[#0256FF]',
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <div
                className={cn(
                  'tracking-tight leading-[1.12]',
                  headingStyles.textColor || 'text-gray-950',
                  headingStyles.fontSizeMobile || 'text-3xl',
                  `md:${headingStyles.fontSizeDesktop || 'text-4xl md:text-5xl'}`,
                  headingStyles.fontWeightMobile || 'font-bold',
                  `md:${headingStyles.fontWeightDesktop || 'font-bold'}`,
                  headingStyles.marginBottomMobile || 'mb-4',
                  `md:${headingStyles.marginBottomDesktop || 'mb-6'}`,
                  '[&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0',
                )}
              >
                <RichText content={heading} enableGutter={false} />
              </div>
            )}

            {/* Description */}
            {description && (
              <div
                className={cn(
                  descriptionStyles.textColor || 'text-slate-600',
                  descriptionStyles.fontSizeMobile || 'text-sm md:text-base',
                  `md:${descriptionStyles.fontSizeDesktop || 'text-base md:text-lg'}`,
                  descriptionStyles.fontWeightMobile || 'font-normal',
                  `md:${descriptionStyles.fontWeightDesktop || 'font-normal'}`,
                  descriptionStyles.marginBottomMobile || 'mb-6',
                  `md:${descriptionStyles.marginBottomDesktop || 'mb-8 md:mb-10'}`,
                  'leading-relaxed',
                )}
              >
                <RichText content={description} enableGutter={false} />
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {button1Text && (
                <Link
                  href={button1Link || '#'}
                  className={cn(
                    'px-6 py-3.5 rounded-xl font-semibold text-sm md:text-base inline-flex items-center gap-2 transition-all shadow-sm hover:opacity-95',
                    button1Styles.bgColor || 'bg-[#0256FF]',
                    button1Styles.textColor || 'text-white',
                  )}
                >
                  <span>{button1Text}</span>
                  <span className={cn('text-lg leading-none', button1Styles.iconColor || 'text-white')}>
                    ↗
                  </span>
                </Link>
              )}

              {button2Text && (
                <Link
                  href={button2Link || '#'}
                  className={cn(
                    'px-2 py-3 font-semibold text-sm md:text-base inline-flex items-center gap-2 hover:underline transition-colors bg-transparent border-0',
                    button2Styles.textColor || 'text-gray-950',
                  )}
                >
                  <span>{button2Text}</span>
                  <span
                    className={cn(
                      'text-lg leading-none font-normal',
                      button2Styles.iconColor || 'text-[#0256FF]',
                    )}
                  >
                    ↗
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Right Column (Rounded Card Image) */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full bg-slate-200/50 p-4 sm:p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-xs relative overflow-hidden">
              {featuredImage && typeof featuredImage === 'object' ? (
                <Media
                  resource={featuredImage}
                  className="w-full h-auto rounded-2xl overflow-hidden shadow-sm"
                  imgClassName="w-full h-auto object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0256FF] flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-gray-900 font-semibold text-lg">Product Dashboard Preview</h4>
                  <p className="text-gray-500 text-sm mt-1 max-w-sm">
                    Upload a dashboard screenshot or feature graphic in the CMS media field.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
