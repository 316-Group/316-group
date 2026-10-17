'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { AnimateIn, type AnimationType, type AnimationSpeed, type AnimationDelay } from '@/components/AnimateIn'

// `nav` is injected by GroupHeroV2Wrapper (a Server Component) so we never
// import server-only code into this client bundle.
export const GroupHeroV2: React.FC<Page['hero'] & { nav?: React.ReactNode }> = ({
  richText,
  descriptionText,
  links,
  media,
  heroBgColor,
  heroRounded,
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
  // text color pickers
  headingTextColor,
  descriptionTextColor,
  glanceHeadingTextColor,
  glanceDescriptionTextColor,
  statValueTextColor,
  statLabelTextColor,
  ecosystemTitleTextColor,
  ecosystemItemsTextColor,
  // entrance animation
  entranceAnimation,
  // injected by GroupHeroV2Wrapper (server component) as ReactNode
  nav,
}) => {
  const { setHeaderTheme, setHeroOverlay } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
    // Tell the layout-level header to hide itself (renders null)
    // while this hero renders its own self-contained nav bar inside the card.
    setHeroOverlay(true)
    return () => {
      setHeroOverlay(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Rounded class for the hero zone
  const roundedClass = heroRounded !== false ? 'rounded-[2rem]' : ''

  // Animation helpers — fall back to sensible defaults if not configured
  const animEnabled = entranceAnimation?.enabled !== false
  const animType = (entranceAnimation?.type as AnimationType) ?? 'fade-up'
  const animSpeed = (entranceAnimation?.speed as AnimationSpeed) ?? 'normal'
  const hDelay = (entranceAnimation?.headingDelay as AnimationDelay) ?? '0'
  const dDelay = (entranceAnimation?.descriptionDelay as AnimationDelay) ?? '150'
  const mDelay = (entranceAnimation?.mediaDelay as AnimationDelay) ?? '300'
  const sDelay = (entranceAnimation?.statsDelay as AnimationDelay) ?? '400'

  // Shorthand wrapper so we don't repeat props every time
  const anim = (delay: AnimationDelay) =>
    animEnabled
      ? { animation: animType, speed: animSpeed, delay, trigger: 'load' as const }
      : { animation: 'none' as const }

  return (
    /*
     * Outer wrapper — sits in normal document flow (NOT fixed/absolute).
     * mt-6 gives a small gap from the top of the page so the card floats.
     * mx-[5px] gives the left/right breathing room seen in the mockup.
     */
    <div className="relative mt-6">
      {/* ── Part 1: Hero Zone ─────────────────────────────────────────────────── */}
      <div
        className={cn(
          'mx-[5px]',
          heroBgColor ?? 'bg-blue-custom',
          roundedClass,
        )}
      >
        {/*
         * Nav bar injected by GroupHeroV2Wrapper (server component).
         * Normal document flow = scrolls away naturally. No fixed
         * positioning = no double-header.
         */}
        {nav}

        <div className="container max-w-screen-2xl">
          {/* Top content row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-10 md:pt-6 md:pb-14 items-end">
            {/* Left: large heading */}
            {richText && (
              <AnimateIn {...anim(hDelay)}>
                {/*
                 * Wrap in a container div that carries the default colour.
                 * Individual headings/spans that have an inline `style`
                 * (e.g. color:red set via the Lexical editor colour picker)
                 * naturally override the inherited CSS colour.
                 */}
                <div
                  className={cn(
                    'font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-tight',
                    headingTextColor ?? 'text-white',
                  )}
                >
                  <RichText
                    content={richText}
                    enableGutter={false}
                    enableProse={false}
                  />
                </div>
              </AnimateIn>
            )}

            {/* Right: description + button */}
            <AnimateIn {...anim(dDelay)}>
              <div className="flex flex-col gap-6 items-start">
                {descriptionText && (
                  <RichText
                    className={cn(
                      'text-base md:text-lg leading-relaxed',
                      descriptionTextColor ?? 'text-white/90',
                    )}
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
            </AnimateIn>
          </div>
        </div>

        {/* Hero media */}
        {media && typeof media === 'object' && (
          <AnimateIn {...anim(mDelay)}>
            {/* Desktop */}
            <div className="hidden md:block w-full">
              <div className="relative rounded-t-[3em] h-[60vh] overflow-hidden mx-4 md:mx-8 2xl:mx-12">
                <Media
                  fill
                  imgClassName="object-cover absolute inset-0 w-full h-full"
                  videoClassName="absolute object-cover inset-0 w-full h-full"
                  priority={false}
                  loading="lazy"
                  resource={media}
                  className="absolute inset-0 w-full h-full rounded-t-[3em]"
                />
              </div>
            </div>
            {/* Mobile */}
            <div className="block md:hidden w-full">
              <div className="relative rounded-t-[3em] h-[50vh] overflow-hidden mx-3">
                <Media
                  fill
                  imgClassName="object-cover absolute inset-0 w-full h-full"
                  videoClassName="absolute object-cover inset-0 w-full h-full"
                  priority={false}
                  loading="lazy"
                  resource={media}
                  className="absolute inset-0 w-full h-full rounded-t-[3em]"
                />
              </div>
            </div>
          </AnimateIn>
        )}

        {/* ── "At a Glance" section */}
        <div className="container max-w-screen-2xl pb-12 md:pb-16">
          <div className="mt-12 md:mt-16">
            {/* Badge */}
            {badgeText && (
              <AnimateIn {...anim(dDelay)}>
                <div className="mb-8">
                  <span
                    className={cn(
                      'inline-flex items-center px-5 py-2 rounded-full text-sm font-medium',
                      badgeBgColor ?? 'bg-white',
                      'text-gray-900',
                    )}
                  >
                    {badgeText}
                  </span>
                </div>
              </AnimateIn>
            )}

            {/* Glance 2-col grid */}
            {(glanceHeading || glanceDescription) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-14 items-start">
                {glanceHeading && (
                  <AnimateIn {...anim(dDelay)}>
                    <RichText
                      className={cn(
                        'text-3xl md:text-4xl lg:text-5xl font-normal leading-tight',
                        glanceHeadingTextColor ?? 'text-white',
                      )}
                      content={glanceHeading}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </AnimateIn>
                )}
                {glanceDescription && (
                  <AnimateIn {...anim(mDelay)}>
                    <RichText
                      className={cn(
                        'text-sm md:text-base leading-relaxed',
                        glanceDescriptionTextColor ?? 'text-white/80',
                      )}
                      content={glanceDescription}
                      enableGutter={false}
                      enableProse={false}
                    />
                  </AnimateIn>
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

            {/* Stat items */}
            {Array.isArray(statItems) && statItems.length > 0 && (
              <AnimateIn {...anim(sDelay)}>
                <div className="flex flex-wrap justify-between gap-y-8">
                  {statItems.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span
                        className={cn(
                          'text-4xl md:text-5xl font-bold leading-none',
                          statValueTextColor ?? 'text-white',
                        )}
                      >
                        {item.statValue}
                      </span>
                      <span
                        className={cn(
                          'text-sm md:text-base',
                          statLabelTextColor ?? 'text-white/70',
                        )}
                      >
                        {item.statLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            )}
          </div>
        </div>
      </div>

      {/* ── Part 2: Ecosystem Strip ──────────────────────────────────────────── */}
      {(ecosystemTitle || (Array.isArray(ecosystemItems) && ecosystemItems.length > 0)) && (
        <AnimateIn animation={animEnabled ? animType : 'none'} speed={animSpeed} delay={sDelay} trigger="load">
          <div
            className={cn(
              'px-[5px] py-6 md:py-8',
              ecosystemBgColor ?? 'bg-transparent',
            )}
          >
            <div className="container max-w-screen-2xl">
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
                {ecosystemTitle && (
                  <span
                    className={cn(
                      'text-xs font-semibold tracking-widest uppercase shrink-0 mr-6',
                      ecosystemTitleTextColor ?? 'text-current',
                    )}
                  >
                    {ecosystemTitle}
                  </span>
                )}

                {Array.isArray(ecosystemItems) && ecosystemItems.length > 0 && (
                  <div
                    className={cn(
                      'flex flex-1 flex-wrap items-center justify-between gap-y-3',
                      ecosystemItemsTextColor ?? 'text-current',
                    )}
                  >
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

            {/* Full-width divider — outside container so it spans edge-to-edge */}
            <hr className="w-full border-t border-current opacity-20 mt-6 md:mt-8" />
          </div>
        </AnimateIn>
      )}
    </div>
  )
}
