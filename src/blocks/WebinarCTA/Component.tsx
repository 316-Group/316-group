import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
    .replace(/\n/g, '<br />')
}

export interface WebinarCTAProps {
  badgeText?: string
  heading?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  badgeStyles?: {
    bgColor?: string
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
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
  buttonStyles?: {
    bgColor?: string
    textColor?: string
    iconBgColor?: string
    iconColor?: string
  }
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  className?: string
}

export const WebinarCTABlock: React.FC<WebinarCTAProps> = (props) => {
  const {
    badgeText = 'Ready to grow?',
    heading = "Let's build what comes next, together.",
    description = 'Explore solutions, discuss partnerships or connect with\none of our specialist businesses.',
    buttonText = 'Talk to our experts',
    buttonLink = '/contact',
    badgeStyles = {},
    headingStyles = {},
    descriptionStyles = {},
    buttonStyles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-[#0000FF]',
    paddingTop = 'pt-20 md:pt-32',
    paddingBottom = 'pb-20 md:pb-32',
    paddingLeft,
    paddingRight,
    className,
  } = props

  const isMatchHeader = matchHeaderPillWidth !== false

  return (
    <section
      className={cn(
        'w-full relative overflow-hidden',
        sectionBgColor || 'bg-[#0000FF]',
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
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
          {/* 1. Pill Badge */}
          {badgeText && (
            <div
              className={cn(
                'inline-flex items-center px-6 py-2 rounded-full border border-white/20 shadow-xs',
                badgeStyles.bgColor || 'bg-blue-600/50',
                badgeStyles.marginBottomMobile || 'mb-5',
                `md:${badgeStyles.marginBottomDesktop || 'mb-6 md:mb-8'}`,
              )}
            >
              <span
                className={cn(
                  badgeStyles.textColor || 'text-white',
                  badgeStyles.fontSizeMobile || 'text-xs',
                  `md:${badgeStyles.fontSizeDesktop || 'text-xs md:text-sm'}`,
                  badgeStyles.fontWeightMobile || 'font-semibold',
                  `md:${badgeStyles.fontWeightDesktop || 'font-semibold'}`,
                  'tracking-wide',
                )}
              >
                {badgeText}
              </span>
            </div>
          )}

          {/* 2. Main Heading Display */}
          {heading && (
            <h2
              className={cn(
                headingStyles.textColor || 'text-white',
                headingStyles.fontSizeMobile || 'text-3xl sm:text-4xl',
                `md:${headingStyles.fontSizeDesktop || 'text-4xl sm:text-5xl lg:text-6xl'}`,
                headingStyles.fontWeightMobile || 'font-bold',
                `md:${headingStyles.fontWeightDesktop || 'font-bold'}`,
                headingStyles.marginBottomMobile || 'mb-4',
                `md:${headingStyles.marginBottomDesktop || 'mb-5 md:mb-6'}`,
                'tracking-tight leading-tight',
              )}
              dangerouslySetInnerHTML={{
                __html: formatInlineHtml(heading),
              }}
            />
          )}

          {/* 3. Description Copy */}
          {description && (
            <div
              className={cn(
                descriptionStyles.textColor || 'text-white/90',
                descriptionStyles.fontSizeMobile || 'text-base',
                `md:${descriptionStyles.fontSizeDesktop || 'text-base sm:text-lg md:text-xl'}`,
                descriptionStyles.fontWeightMobile || 'font-normal',
                `md:${descriptionStyles.fontWeightDesktop || 'font-normal'}`,
                descriptionStyles.marginBottomMobile || 'mb-8',
                `md:${descriptionStyles.marginBottomDesktop || 'mb-8 md:mb-10'}`,
                'leading-relaxed max-w-2xl',
              )}
              dangerouslySetInnerHTML={{
                __html: formatInlineHtml(description),
              }}
            />
          )}

          {/* 4. Action Button with Rounded Icon Badge */}
          {buttonText && (
            <Link
              href={buttonLink || '/contact'}
              className={cn(
                'pl-6 pr-2 py-2 rounded-full inline-flex items-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-95 group cursor-pointer',
                buttonStyles.bgColor || 'bg-white',
              )}
            >
              <span
                className={cn(
                  'font-semibold text-sm sm:text-base tracking-tight',
                  buttonStyles.textColor || 'text-gray-950',
                )}
              >
                {buttonText}
              </span>
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105',
                  buttonStyles.iconBgColor || 'bg-[#0000FF]',
                )}
              >
                <ArrowUpRight
                  className={cn(
                    'w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
                    buttonStyles.iconColor || 'text-white',
                  )}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default WebinarCTABlock
