'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'

export const GroupHeroV2: React.FC<Page['hero']> = ({
  richText,
  descriptionText,
  links,
  media,
  heroBgColor,
  badgeText,
  badgeBgColor,
  glanceHeading,
  glanceDescription,
  dividerColor,
  dividerWidth,
  statItems,
  ecosystemTitle,
  ecosystemBgColor,
  ecosystemItems,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div>
      {/* ── Part 1: Hero Zone (coloured background) ─────────────────────── */}
      <div className={cn('px-4 md:px-8 2xl:mx-14', heroBgColor ?? 'bg-blue-custom')}>
        <div className="container max-w-screen-2xl">

          {/* Top content row: heading left | description + button right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 pb-10 md:pt-14 md:pb-14 items-end">
            {/* Left: large heading */}
            {richText && (
              <RichText
                className="font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] text-white leading-tight"
                content={richText}
                enableGutter={false}
                enableProse={false}
              />
            )}

            {/* Right: description + button */}
            <div className="flex flex-col gap-6 items-start">
              {descriptionText && (
                <RichText
                  className="text-white/90 text-base md:text-lg leading-relaxed"
                  content={descriptionText}
                  enableGutter={false}
                  enableProse={false}
                />
              )}
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex flex-wrap gap-4">
                  {links.map(({ link }, i) => (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Hero media — full width within the hero zone, rounded top corners */}
        {media && typeof media === 'object' && (
          <>
            {/* Desktop */}
            <div className="hidden md:block w-full">
              <div className="relative rounded-t-[3em] h-[60vh] overflow-hidden mx-4 md:mx-8 2xl:mx-0">
                <Media
                  fill
                  imgClassName="-z-10 object-cover inset-0 w-full h-full"
                  videoClassName="-z-10 absolute object-cover inset-0 w-full max-h-[100%]"
                  priority={false}
                  loading="lazy"
                  resource={media}
                  className="rounded-t-[3em]"
                />
              </div>
            </div>
            {/* Mobile */}
            <div className="block md:hidden w-full">
              <div className="relative rounded-t-[3em] h-[50vh] overflow-hidden">
                <Media
                  fill
                  imgClassName="-z-10 object-cover inset-0 w-full h-full"
                  videoClassName="-z-10 absolute object-cover inset-0 w-full h-full"
                  priority={false}
                  loading="lazy"
                  resource={media}
                  className="rounded-t-[3em]"
                />
              </div>
            </div>
          </>
        )}

        {/* ── "At a Glance" section ──────────────────────────────────────── */}
        <div className="container max-w-screen-2xl pb-12 md:pb-16">
          {/* Spacing below media */}
          <div className="mt-12 md:mt-16">

            {/* Badge */}
            {badgeText && (
              <div className="mb-8">
                <span
                  className={cn(
                    'inline-flex items-center px-5 py-2 rounded-full text-sm font-medium',
                    badgeBgColor ?? 'bg-white',
                    // Badge text color: dark on light badge, white on dark badge
                    'text-gray-900',
                  )}
                >
                  {badgeText}
                </span>
              </div>
            )}

            {/* Glance 2-col grid: heading left | description right */}
            {(glanceHeading || glanceDescription) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-14 items-start">
                {glanceHeading && (
                  <RichText
                    className="text-white text-3xl md:text-4xl lg:text-5xl font-normal leading-tight"
                    content={glanceHeading}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
                {glanceDescription && (
                  <RichText
                    className="text-white/80 text-sm md:text-base leading-relaxed"
                    content={glanceDescription}
                    enableGutter={false}
                    enableProse={false}
                  />
                )}
              </div>
            )}

            {/* Divider */}
            <hr
              className={cn(
                'border-t mb-10 md:mb-14',
                dividerColor ?? 'border-white/30',
                dividerWidth ?? 'w-full',
              )}
            />

            {/* Stat items grid */}
            {Array.isArray(statItems) && statItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statItems.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="text-white text-4xl md:text-5xl font-bold leading-none">
                      {item.statValue}
                    </span>
                    <span className="text-white/70 text-sm md:text-base">
                      {item.statLabel}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Part 2: Ecosystem Strip ──────────────────────────────────────── */}
      {(ecosystemTitle || (Array.isArray(ecosystemItems) && ecosystemItems.length > 0)) && (
        <div
          className={cn(
            'px-4 md:px-8 2xl:mx-14 py-6 md:py-8',
            ecosystemBgColor ?? 'bg-transparent',
          )}
        >
          <div className="container max-w-screen-2xl">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {/* Left: section title */}
              {ecosystemTitle && (
                <span className="text-xs font-semibold tracking-widest uppercase text-current shrink-0">
                  {ecosystemTitle}
                </span>
              )}

              {/* Right: ecosystem brand items */}
              {Array.isArray(ecosystemItems) && ecosystemItems.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  {ecosystemItems.map((item, i) => (
                    <div key={i} className="text-base md:text-lg">
                      <RichText
                        content={item.itemText}
                        enableGutter={false}
                        enableProse={false}
                        className="[&_strong]:font-bold [&_p]:inline [&>*]:inline"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
