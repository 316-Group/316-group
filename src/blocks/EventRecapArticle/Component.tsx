import React from 'react'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

interface EventRecapArticleProps {
  kickerText?: string
  heading?: any
  description?: any
  buttonText?: string
  buttonLink?: string
  kickerStyles?: {
    boxBgColor?: string
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
    textColor?: string
    fontSizeDesktop?: string
    fontSizeMobile?: string
    fontWeightDesktop?: string
    fontWeightMobile?: string
  }
  matchHeaderPillWidth?: boolean
  sectionBgColor?: string
  paddingTop?: string
  paddingBottom?: string
  paddingLeft?: string
  paddingRight?: string
  className?: string
}

export const EventRecapArticleBlock: React.FC<EventRecapArticleProps> = (props) => {
  const {
    kickerText = 'A SHARED PURPOSE',
    heading,
    description,
    buttonText = 'Bring your perspective to the conversation',
    buttonLink,
    kickerStyles = {},
    headingStyles = {},
    descriptionStyles = {},
    buttonStyles = {},
    matchHeaderPillWidth = true,
    sectionBgColor = 'bg-white',
    paddingTop = 'pt-16 md:pt-24',
    paddingBottom = 'pb-16 md:pb-24',
    paddingLeft,
    paddingRight,
    className,
  } = props

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
        <div className="w-full max-w-none flex flex-col">
          {/* 1. Kicker / Accent Square + Text */}
          {kickerText && (
            <div
              className={cn(
                'flex items-center gap-2.5 uppercase tracking-wider',
                kickerStyles.marginBottomMobile || 'mb-4',
                `md:${kickerStyles.marginBottomDesktop || 'mb-5'}`,
              )}
            >
              <span
                className={cn(
                  'w-2.5 h-2.5 rounded-[1px] shrink-0',
                  kickerStyles.boxBgColor || 'bg-[#0256FF]',
                )}
              />
              <span
                className={cn(
                  kickerStyles.textColor || 'text-[#0256FF]',
                  kickerStyles.fontSizeMobile || 'text-xs',
                  `md:${kickerStyles.fontSizeDesktop || 'text-xs md:text-sm'}`,
                  kickerStyles.fontWeightMobile || 'font-semibold',
                  `md:${kickerStyles.fontWeightDesktop || 'font-semibold'}`,
                )}
              >
                {kickerText}
              </span>
            </div>
          )}

          {/* 2. Main Heading */}
          {heading && (
            <div
              className={cn(
                'w-full max-w-none tracking-tight leading-[1.12]',
                headingStyles.textColor || 'text-gray-950',
                headingStyles.fontSizeMobile || 'text-3xl',
                `md:${headingStyles.fontSizeDesktop || 'text-4xl md:text-5xl lg:text-6xl'}`,
                headingStyles.fontWeightMobile || 'font-bold',
                `md:${headingStyles.fontWeightDesktop || 'font-bold'}`,
                headingStyles.marginBottomMobile || 'mb-4',
                `md:${headingStyles.marginBottomDesktop || 'mb-6 md:mb-8'}`,
                '[&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_.prose]:max-w-none',
              )}
            >
              <RichText content={heading} enableGutter={false} />
            </div>
          )}

          {/* 3. Description (Preserving paragraph spacing and taking full available width) */}
          {description && (
            <div
              className={cn(
                'w-full max-w-none',
                descriptionStyles.textColor || 'text-slate-600',
                descriptionStyles.fontSizeMobile || 'text-sm md:text-base',
                `md:${descriptionStyles.fontSizeDesktop || 'text-base md:text-lg'}`,
                descriptionStyles.fontWeightMobile || 'font-normal',
                `md:${descriptionStyles.fontWeightDesktop || 'font-normal'}`,
                descriptionStyles.marginBottomMobile || 'mb-6',
                `md:${descriptionStyles.marginBottomDesktop || 'mb-8 md:mb-10'}`,
                'prose-p:mb-6 prose-p:leading-relaxed prose-p:max-w-none [&_.prose]:max-w-none',
              )}
            >
              <RichText content={description} enableGutter={false} />
            </div>
          )}

          {/* 4. Text Button (No background, no border) */}
          {buttonText && (
            <div>
              {buttonLink ? (
                <Link
                  href={buttonLink}
                  className={cn(
                    'inline-block hover:underline transition-colors border-0 bg-transparent p-0',
                    buttonStyles.textColor || 'text-[#0256FF]',
                    buttonStyles.fontSizeMobile || 'text-sm',
                    `md:${buttonStyles.fontSizeDesktop || 'text-sm md:text-base'}`,
                    buttonStyles.fontWeightMobile || 'font-medium',
                    `md:${buttonStyles.fontWeightDesktop || 'font-medium'}`,
                  )}
                >
                  {buttonText}
                </Link>
              ) : (
                <span
                  className={cn(
                    'inline-block border-0 bg-transparent p-0',
                    buttonStyles.textColor || 'text-[#0256FF]',
                    buttonStyles.fontSizeMobile || 'text-sm',
                    `md:${buttonStyles.fontSizeDesktop || 'text-sm md:text-base'}`,
                    buttonStyles.fontWeightMobile || 'font-medium',
                    `md:${buttonStyles.fontWeightDesktop || 'font-medium'}`,
                  )}
                >
                  {buttonText}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
