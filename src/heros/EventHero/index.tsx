'use client'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

export const EventHero: React.FC<Page['hero']> = (props) => {
  const { setHeaderTheme, setHeroOverlay } = useHeaderTheme()

  useEffect(() => {
    // Keep header visible, theme dark so header logo and navigation text are white
    setHeaderTheme('dark')
    setHeroOverlay(false)

    return () => {
      setHeroOverlay(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    eventHeroBgColor = 'bg-[#0000FF]',
    eventHeroMatchHeaderPillWidth = true,
    eventHeroPaddingTopDesktop = 'pt-24',
    eventHeroPaddingTopMobile = 'pt-16',
    eventHeroPaddingBottomDesktop = 'pb-24',
    eventHeroPaddingBottomMobile = 'pb-16',
    eventHeroPaddingLeftDesktop = 'pl-12',
    eventHeroPaddingLeftMobile = 'pl-4',
    eventHeroPaddingRightDesktop = 'pr-12',
    eventHeroPaddingRightMobile = 'pr-4',
    eventHeroSubHeader = 'EVENTS & CONNECTIONS',
    eventHeroSubHeaderTextColor = 'text-white',
    eventHeroSubHeaderFontSizeDesktop = 'text-sm',
    eventHeroSubHeaderFontSizeMobile = 'text-xs',
    eventHeroSubHeaderFontWeightDesktop = 'font-semibold',
    eventHeroSubHeaderFontWeightMobile = 'font-semibold',
    eventHeroSubHeaderMarginBottomDesktop = 'mb-4',
    eventHeroSubHeaderMarginBottomMobile = 'mb-3',
    eventHeroHeading,
    eventHeroHeadingTextColor = 'text-white',
    eventHeroHeadingFontSizeDesktop = 'text-5xl md:text-6xl',
    eventHeroHeadingFontSizeMobile = 'text-3xl',
    eventHeroHeadingFontWeightDesktop = 'font-bold',
    eventHeroHeadingFontWeightMobile = 'font-bold',
    eventHeroHeadingMarginBottomDesktop = 'mb-6',
    eventHeroHeadingMarginBottomMobile = 'mb-4',
    eventHeroDescription,
    eventHeroDescriptionTextColor = 'text-white/90',
    eventHeroDescriptionFontSizeDesktop = 'text-lg md:text-xl',
    eventHeroDescriptionFontSizeMobile = 'text-base',
    eventHeroDescriptionFontWeightDesktop = 'font-normal',
    eventHeroDescriptionFontWeightMobile = 'font-normal',
    eventHeroDescriptionMarginBottomDesktop = 'mb-8',
    eventHeroDescriptionMarginBottomMobile = 'mb-6',
    eventHeroImage,
  } = (props as any) || {}

  // Determine container width and horizontal padding
  const isMatchHeader = eventHeroMatchHeaderPillWidth !== false

  return (
    <section
      className={cn(
        'w-full min-h-screen relative flex flex-col justify-center overflow-hidden',
        eventHeroBgColor || 'bg-[#0000FF]',
        eventHeroPaddingTopMobile,
        `md:${eventHeroPaddingTopDesktop}`,
        eventHeroPaddingBottomMobile,
        `md:${eventHeroPaddingBottomDesktop}`,
      )}
    >
      <div
        className={cn(
          'w-full mx-auto relative z-10 flex-1 flex flex-col justify-center',
          isMatchHeader
            ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8'
            : cn(
                eventHeroPaddingLeftMobile,
                `md:${eventHeroPaddingLeftDesktop}`,
                eventHeroPaddingRightMobile,
                `md:${eventHeroPaddingRightDesktop}`,
              ),
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
          {/* Left Column (Wider, Vertically Centered) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Sub Header */}
            {eventHeroSubHeader && (
              <div
                className={cn(
                  'tracking-wider uppercase',
                  eventHeroSubHeaderTextColor,
                  eventHeroSubHeaderFontSizeMobile,
                  `md:${eventHeroSubHeaderFontSizeDesktop}`,
                  eventHeroSubHeaderFontWeightMobile,
                  `md:${eventHeroSubHeaderFontWeightDesktop}`,
                  eventHeroSubHeaderMarginBottomMobile,
                  `md:${eventHeroSubHeaderMarginBottomDesktop}`,
                )}
              >
                {eventHeroSubHeader}
              </div>
            )}

            {/* Main Heading */}
            {eventHeroHeading && (
              <div
                className={cn(
                  'tracking-tight leading-[1.1]',
                  eventHeroHeadingTextColor,
                  eventHeroHeadingFontSizeMobile,
                  `md:${eventHeroHeadingFontSizeDesktop}`,
                  eventHeroHeadingFontWeightMobile,
                  `md:${eventHeroHeadingFontWeightDesktop}`,
                  eventHeroHeadingMarginBottomMobile,
                  `md:${eventHeroHeadingMarginBottomDesktop}`,
                  '[&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0',
                )}
              >
                <RichText content={eventHeroHeading} enableGutter={false} />
              </div>
            )}

            {/* Description */}
            {eventHeroDescription && (
              <div
                className={cn(
                  'leading-relaxed max-w-2xl',
                  eventHeroDescriptionTextColor,
                  eventHeroDescriptionFontSizeMobile,
                  `md:${eventHeroDescriptionFontSizeDesktop}`,
                  eventHeroDescriptionFontWeightMobile,
                  `md:${eventHeroDescriptionFontWeightDesktop}`,
                  eventHeroDescriptionMarginBottomMobile,
                  `md:${eventHeroDescriptionMarginBottomDesktop}`,
                )}
              >
                <RichText content={eventHeroDescription} enableGutter={false} />
              </div>
            )}
          </div>

          {/* Right Column (Image with no shadow and no border) */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center relative">
            {eventHeroImage && typeof eventHeroImage === 'object' ? (
              <div className="w-full relative overflow-hidden border-0 shadow-none">
                <Media
                  resource={eventHeroImage}
                  className="w-full h-auto border-0 shadow-none"
                  imgClassName="w-full h-auto object-cover border-0 shadow-none rounded-none"
                />
              </div>
            ) : (
              /* Fallback Placeholder Graphic matching the composition style in page-event.png */
              <div className="w-full relative aspect-[4/3] flex items-center justify-center border-0 shadow-none">
                <div className="absolute top-0 right-4 w-28 h-28 rounded-full bg-[#00E5FF] opacity-90 z-0" />
                <div className="absolute bottom-0 left-6 w-24 h-24 rounded-tl-full bg-[#00D2FF] opacity-80 z-0" />
                <div className="relative z-10 w-4/5 h-4/5 bg-white/10 backdrop-blur-sm rounded-none flex items-center justify-center p-6 border-0 shadow-none">
                  <div className="text-center text-white/80">
                    <svg
                      className="w-16 h-16 mx-auto mb-3 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium tracking-wide">Featured Event Media</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
