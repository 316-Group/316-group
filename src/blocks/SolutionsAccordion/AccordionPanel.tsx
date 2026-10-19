'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import type { SolutionsAccordionBlock } from '@/payload-types'
import Link from 'next/link'
import { AnimateIn, type AnimationType, type AnimationSpeed, type AnimationDelay } from '@/components/AnimateIn'

type AccordionItem = NonNullable<SolutionsAccordionBlock['accordionItems']>[number]

// Map animation speed to duration class
const speedMap: Record<string, string> = {
  fast: '150',
  normal: '300',
  slow: '500',
}

function getTransitionStyle(speed: string = 'normal'): React.CSSProperties {
  return { transitionDuration: `${speedMap[speed] ?? '300'}ms` }
}

interface Props {
  leftPanel: SolutionsAccordionBlock['leftPanel']
  accordionItems: SolutionsAccordionBlock['accordionItems']
  rightBgColor?: string | null
  sectionBgColor?: string | null
  scrollAnimation?: SolutionsAccordionBlock['scrollAnimation']
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobile?: string | null
  paddingXMobileCustom?: string | null
  columnGap?: string | null
  columnGapCustom?: string | null
}

export const AccordionPanel: React.FC<Props> = ({
  leftPanel,
  accordionItems,
  rightBgColor,
  sectionBgColor,
  scrollAnimation,
  paddingMode,
  paddingXDesktop,
  paddingXDesktopCustom,
  paddingXMobile,
  paddingXMobileCustom,
  columnGap,
  columnGapCustom,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isInView, setIsInView] = useState<boolean>(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const uid = React.useId().replace(/:/g, '')

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items = accordionItems ?? []
  const activeItem = items[activeIndex] as AccordionItem | undefined

  // Scroll animation config
  const saEnabled = scrollAnimation?.enabled !== false
  const saType = (scrollAnimation?.type as AnimationType) ?? 'fade-up'
  const saSpeed = (scrollAnimation?.speed as AnimationSpeed) ?? 'normal'
  const saLeftDelay = (scrollAnimation?.leftDelay as AnimationDelay) ?? '200'
  const saRightDelay = (scrollAnimation?.rightDelay as AnimationDelay) ?? '350'

  // Helper to get a link href from a CMS link object
  const getLinkHref = (linkObj: any): string => {
    if (!linkObj) return '#'
    if (linkObj.type === 'custom') return linkObj.url || '#'
    if (linkObj.type === 'reference' && linkObj.reference?.value) {
      const val = linkObj.reference.value
      if (typeof val === 'object' && val.slug) {
        const rel = linkObj.reference.relationTo
        if (rel === 'pages') return `/${val.slug}`
        return `/${rel}/${val.slug}`
      }
    }
    return '#'
  }

  // Resolve column gap
  const resolvedGap =
    columnGap === 'custom' ? columnGapCustom || '0px' : columnGap || '0px'

  // Resolve horizontal padding
  const resolvedDesktopPad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? paddingXDesktop === 'custom'
          ? paddingXDesktopCustom || '50px'
          : paddingXDesktop || '50px'
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
    paddingMode === 'custom' || paddingMode === 'none' ? `accordion-pad-${uid}` : ''

  return (
    <>
      {padClassName && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad || '0px'};
            padding-right: ${resolvedMobilePad || '0px'};
          }
          @media (min-width: 768px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad || '0px'};
              padding-right: ${resolvedDesktopPad || '0px'};
            }
          }
        `}</style>
      )}
      <div
        ref={sectionRef}
        className={cn(
          'w-full flex flex-col md:flex-row min-h-[600px] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] delay-150',
          padClassName,
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
          sectionBgColor ?? 'bg-white',
        )}
        style={{
          gap: resolvedGap !== '0px' ? resolvedGap : undefined,
        }}
      >
        {/* ── LEFT COLUMN ─────────────────────────────────────────────────────── */}
        <AnimateIn
          animation={saEnabled ? saType : 'none'}
          speed={saSpeed}
          delay={saLeftDelay}
          trigger="scroll"
          className={cn(
            'w-full md:w-[45%] md:shrink-0 flex flex-col justify-between p-8 md:p-12 xl:p-16',
            leftPanel?.bgColor ?? 'bg-white',
          )}
        >
        <div className="flex flex-col gap-6">
          {/* Badge */}
          {leftPanel?.badgeText && (
            <span
              className={cn(
                'inline-flex self-start items-center px-4 py-1.5 rounded-full text-sm font-medium',
                leftPanel.badgeBgColor ?? 'bg-gray-100',
                leftPanel.badgeTextColor ?? 'text-gray-800',
              )}
            >
              {leftPanel.badgeText}
            </span>
          )}

          {/* Main Heading */}
          {leftPanel?.heading && (
            <div className={cn('text-3xl md:text-4xl lg:text-5xl font-normal leading-tight', leftPanel.headingTextColor ?? 'text-black')}>
              <RichText
                content={leftPanel.heading}
                enableGutter={false}
                enableProse={false}
                className="[&_strong]:font-bold [&_p]:leading-tight [&_p]:m-0"
              />
            </div>
          )}

          {/* Sub-badge / button */}
          {leftPanel?.showSubBadge !== false && leftPanel?.subBadgeText && (
            <div>
              {leftPanel.subBadgeLink ? (
                <Link
                  href={getLinkHref(leftPanel.subBadgeLink)}
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90',
                    leftPanel.subBadgeBgColor ?? 'bg-blue-custom',
                    leftPanel.subBadgeTextColor ?? 'text-white',
                  )}
                >
                  {leftPanel.subBadgeText}
                </Link>
              ) : (
                <span
                  className={cn(
                    'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold',
                    leftPanel.subBadgeBgColor ?? 'bg-blue-custom',
                    leftPanel.subBadgeTextColor ?? 'text-white',
                  )}
                >
                  {leftPanel.subBadgeText}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Image — transitions when activeIndex changes */}
        <div className="mt-8 relative rounded-2xl overflow-hidden aspect-[4/3] w-full max-w-md">
          {items.map((item, i) => {
            const badges = [
              (item as any).imageBadges?.badge1,
              (item as any).imageBadges?.badge2,
              (item as any).imageBadges?.badge3,
            ].filter((b): b is string => Boolean(b && typeof b === 'string' && b.trim().length > 0))

            const badgeBg =
              (item as any).imageBadges?.badgeBgOverlay ||
              'bg-white/20 backdrop-blur-md border border-white/25'
            const badgeTextCol = (item as any).imageBadges?.badgeTextColor || 'text-white'

            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'ease-in-out',
                  pointerEvents: i === activeIndex ? 'auto' : 'none',
                }}
              >
                {item.image && typeof item.image === 'object' && (
                  <Media
                    resource={item.image}
                    fill
                    imgClassName="object-cover w-full h-full"
                    className="absolute inset-0 w-full h-full"
                  />
                )}

                {/* ─── Bottom-Left Frosted Glass Overlay Badges ─── */}
                {badges.length > 0 && (
                  <div className="absolute bottom-5 left-3 sm:bottom-6 sm:left-4 md:bottom-7 md:left-5 lg:bottom-8 lg:left-6 z-20 flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-2.5 max-w-[calc(100%-1.5rem)] sm:max-w-[calc(100%-2rem)]">
                    {badges.map((text, badgeIdx) => (
                      <div
                        key={badgeIdx}
                        className={cn(
                          'px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-3.5 md:py-1.5 lg:px-4 lg:py-2',
                          'rounded-md sm:rounded-lg md:rounded-xl',
                          'flex items-center justify-center font-medium sm:font-semibold',
                          'text-[11px] sm:text-xs md:text-[13px] lg:text-sm tracking-normal',
                          'shadow-sm select-none transition-all duration-300',
                          badgeBg,
                          badgeTextCol,
                        )}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {/* Fallback placeholder if no image */}
          {items.every((item) => !item.image) && (
            <div className="absolute inset-0 bg-gray-100 rounded-2xl" />
          )}
        </div>
      </AnimateIn>

      {/* ── RIGHT COLUMN ────────────────────────────────────────────────────── */}
      <AnimateIn
        animation={saEnabled ? saType : 'none'}
        speed={saSpeed}
        delay={saRightDelay}
        trigger="scroll"
        className={cn(
          'w-full md:flex-1 flex items-start p-6 md:p-10 xl:p-14',
          rightBgColor ?? 'bg-white',
        )}
      >
        <div className="w-full space-y-0">
          {items.map((item, index) => {
            const isActive = activeIndex === index
            const animStyle = item.animationStyle ?? 'slide'
            const speed = item.animationSpeed ?? 'normal'
            const transStyle = getTransitionStyle(speed)

            // Easing per animation style
            const easing =
              animStyle === 'fade'
                ? 'ease-in'
                : animStyle === 'scale'
                  ? 'ease-out'
                  : 'ease-in-out'

            return (
              <div key={index} className="w-full">
                {/* ── UNIFIED ACCORDION ITEM CARD ── */}
                <div
                  className={cn(
                    'w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden',
                    isActive
                      ? cn('rounded-2xl p-6 md:p-8', item.activeBgColor ?? 'bg-blue-custom')
                      : 'rounded-xl py-5 px-3 md:px-4 bg-transparent hover:bg-gray-50/60',
                  )}
                >
                  {/* Clickable Header Row */}
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon card with smooth color transition */}
                      {(item.icon || item.iconActive) && (
                        <div
                          className={cn(
                            'w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center p-2 shrink-0 transition-all duration-500',
                            isActive
                              ? ((item as any).activeIconCardBgColor || 'bg-white/20 backdrop-blur-sm')
                              : ((item as any).iconCardBgColor || 'bg-[#EFF2FE] group-hover:scale-105'),
                          )}
                        >
                          <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                            {isActive && item.iconActive && typeof item.iconActive === 'object' ? (
                              <Media
                                resource={item.iconActive}
                                imgClassName="w-full h-full object-contain"
                              />
                            ) : item.icon && typeof item.icon === 'object' ? (
                              <Media
                                resource={item.icon}
                                imgClassName="w-full h-full object-contain"
                              />
                            ) : null}
                          </div>
                        </div>
                      )}
                      <span
                        className={cn(
                          'text-base sm:text-lg md:text-xl font-semibold transition-colors duration-500',
                          isActive ? 'text-white' : (item.titleTextColor ?? 'text-black'),
                        )}
                      >
                        {isActive ? ((item as any).activeTitle || item.title) : item.title}
                      </span>
                    </div>

                    {/* Plus / Minus indicator */}
                    <div className="shrink-0 transition-transform duration-500">
                      {isActive ? (
                        <Minus className="h-5 w-5 text-white transition-all duration-300" />
                      ) : (
                        <Plus
                          className={cn(
                            'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
                            item.titleTextColor ?? 'text-black',
                          )}
                        />
                      )}
                    </div>
                  </button>

                  {/* ── EXPANDABLE CONTENT (Slide-Up on open, Slide-Down on close) ── */}
                  <div
                    className={cn(
                      'grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                      isActive
                        ? 'grid-rows-[1fr] opacity-100 mt-5'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none mt-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={cn(
                          'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                          isActive
                            ? 'translate-y-0 opacity-100 delay-150'
                            : 'translate-y-4 opacity-0 delay-0',
                        )}
                      >
                        {/* Sub-heading */}
                        {item.subHeading && (
                          <p
                            className={cn(
                              'text-base font-semibold mb-3 leading-snug',
                              item.subHeadingTextColor ?? 'text-white',
                            )}
                          >
                            {item.subHeading}
                          </p>
                        )}

                        {/* Body text */}
                        {item.bodyText && (
                          <div
                            className={cn(
                              'text-sm leading-relaxed mb-6',
                              item.bodyTextColor ?? 'text-white/90',
                            )}
                          >
                            <RichText
                              content={item.bodyText}
                              enableGutter={false}
                              enableProse={false}
                              className="[&_p]:mb-0 [&_p]:leading-relaxed"
                            />
                          </div>
                        )}

                        {/* CTA Button */}
                        {item.showCTAButton !== false && item.ctaLabel && (
                          <div>
                            {item.ctaLink ? (
                              <Link
                                href={getLinkHref(item.ctaLink)}
                                className={cn(
                                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90',
                                  item.ctaBgColor ?? 'bg-white',
                                  item.ctaTextColor ?? 'text-blue-custom',
                                )}
                              >
                                {item.ctaLabel}
                                <span
                                  className={cn(
                                    'inline-flex items-center justify-center w-6 h-6 rounded-full',
                                    item.ctaTextColor ? 'bg-current/10' : 'bg-blue-custom',
                                  )}
                                >
                                  <ArrowUpRight
                                    className="h-3.5 w-3.5"
                                    style={{ color: 'inherit' }}
                                  />
                                </span>
                              </Link>
                            ) : (
                              <span
                                className={cn(
                                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold',
                                  item.ctaBgColor ?? 'bg-white',
                                  item.ctaTextColor ?? 'text-blue-custom',
                                )}
                              >
                                {item.ctaLabel}
                                <ArrowUpRight className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* HR divider below each row */}
                <hr
                  className={cn(
                    'border-t transition-opacity duration-300 w-full',
                    isActive ? 'border-transparent opacity-0 my-0' : 'border-gray-200 opacity-100 my-1',
                  )}
                />
              </div>
            )
          })}
        </div>
      </AnimateIn>
      </div>
    </>
  )
}
