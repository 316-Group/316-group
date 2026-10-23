'use client'
import React, { useEffect, useId } from 'react'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { resolveTypography } from '@/utilities/resolveTypography'

import { defaultEventHeroHeading, defaultEventHeroDescription } from './defaults'

/**
 * Parses any spacing input (Tailwind classes like pt-16, pb-24, pl-12,
 * arbitrary bracket classes like pt-[30px], direct CSS values like 30px, 96px, 2rem,
 * or raw numbers like 30, 0) into a valid CSS measurement string.
 */
export function parseSpacingToCss(value: unknown, fallback: string): string {
  if (value === null || value === undefined) return fallback
  const str = String(value).trim().replace(/\s+/g, '')
  if (!str) return fallback

  // If already a valid CSS measurement like "30px", "2rem", "100%", "4em", "10vh", "5vw"
  if (/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax)$/i.test(str)) {
    return str
  }

  // If pure number like "30" or "0"
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return `${str}px`
  }

  // If arbitrary Tailwind class like "pt-[30px]" or "p-[2rem]"
  const arbitraryMatch = str.match(/(?:pt|pb|pl|pr|py|px|p)-\[([^\]]+)\]/i)
  if (arbitraryMatch && arbitraryMatch[1]) {
    return arbitraryMatch[1]
  }

  // If standard Tailwind class like "pt-16", "pb-24", "pl-4", "p-8", "pt-0"
  const twMatch = str.match(/(?:pt|pb|pl|pr|py|px|p)-([0-9]+(?:\.[0-9]+)?|px)/i)
  if (twMatch && twMatch[1]) {
    const scale = twMatch[1].toLowerCase()
    if (scale === 'px') return '1px'
    const num = parseFloat(scale)
    if (num === 0) return '0px'
    // 1 Tailwind spacing unit = 0.25rem = 4px (e.g. pt-16 -> 4rem -> 64px, pt-24 -> 6rem -> 96px)
    return `${num * 0.25}rem`
  }

  return fallback
}

function resolveMarginBottom(
  desktopMargin?: string | null,
  mobileMargin?: string | null,
  fallback = 'mb-4',
): string {
  const m = mobileMargin || fallback
  const d = desktopMargin || fallback
  if (m === d) return d
  return cn(m, `md:${d}`)
}

function resolveColor(
  color?: string | null,
  fallback = 'text-white',
): { className?: string; style?: React.CSSProperties } {
  if (!color || !color.trim()) return { className: fallback }
  const trimmed = color.trim()
  if (trimmed.startsWith('text-')) {
    return { className: trimmed }
  }
  if (/^(#|rgb|hsl)/i.test(trimmed)) {
    return { style: { color: trimmed } }
  }
  return { className: trimmed }
}

function isRichTextEmpty(content: any): boolean {
  if (!content) return true
  if (typeof content === 'string') return content.trim().length === 0
  if (typeof content === 'object') {
    if ('root' in content) {
      const children = content.root?.children
      if (!Array.isArray(children) || children.length === 0) return true
      if (
        children.length === 1 &&
        children[0]?.type === 'paragraph' &&
        (!children[0]?.children || children[0]?.children?.length === 0)
      ) {
        return true
      }
    }
  }
  return false
}

export const EventHero: React.FC<Page['hero']> = (props) => {
  const { setHeaderTheme, setHeroOverlay } = useHeaderTheme()
  const rawId = useId()
  const sectionClass = `eh-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`

  useEffect(() => {
    setHeaderTheme('light')
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
    eventHeroHeadingFontSizeDesktop = 'text-6xl',
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

  // Resolve heading & description with mockup default fallbacks
  const resolvedSubHeader = eventHeroSubHeader?.trim() ? eventHeroSubHeader : 'EVENTS & CONNECTIONS'
  const resolvedHeading = isRichTextEmpty(eventHeroHeading)
    ? defaultEventHeroHeading
    : eventHeroHeading
  const resolvedDescription = isRichTextEmpty(eventHeroDescription)
    ? defaultEventHeroDescription
    : eventHeroDescription

  // Determine container width and horizontal padding
  const isMatchHeader = eventHeroMatchHeaderPillWidth !== false

  // Parse paddings into accurate CSS values (supporting 30px, 96px, pt-16, pt-24, 0px, etc.)
  const ptMobile = parseSpacingToCss(eventHeroPaddingTopMobile, '4rem') // default pt-16 is 64px / 4rem
  const ptDesktop = parseSpacingToCss(eventHeroPaddingTopDesktop, '6rem') // default pt-24 is 96px / 6rem
  const pbMobile = parseSpacingToCss(eventHeroPaddingBottomMobile, '4rem') // default pb-16 is 64px / 4rem
  const pbDesktop = parseSpacingToCss(eventHeroPaddingBottomDesktop, '6rem') // default pb-24 is 96px / 6rem
  const plMobile = parseSpacingToCss(eventHeroPaddingLeftMobile, '1rem') // default pl-4 is 16px / 1rem
  const plDesktop = parseSpacingToCss(eventHeroPaddingLeftDesktop, '3rem') // default pl-12 is 48px / 3rem
  const prMobile = parseSpacingToCss(eventHeroPaddingRightMobile, '1rem')
  const prDesktop = parseSpacingToCss(eventHeroPaddingRightDesktop, '3rem')

  // Background styling
  const isTailwindBg =
    typeof eventHeroBgColor === 'string' && eventHeroBgColor.trim().startsWith('bg-')
  const isDirectCssBg =
    typeof eventHeroBgColor === 'string' &&
    (/^(#|rgb|hsl)/i.test(eventHeroBgColor.trim()) ||
      (!isTailwindBg && eventHeroBgColor.trim().length > 0))

  const bgClass = isTailwindBg ? eventHeroBgColor.trim() : !isDirectCssBg ? 'bg-[#0000FF]' : ''
  const bgStyle: React.CSSProperties = isDirectCssBg
    ? { backgroundColor: eventHeroBgColor.trim() }
    : {}

  // Typography resolution using resolveTypography
  const subHeaderTypo = resolveTypography(
    eventHeroSubHeaderFontSizeDesktop,
    eventHeroSubHeaderFontSizeMobile,
    eventHeroSubHeaderFontWeightDesktop,
    eventHeroSubHeaderFontWeightMobile,
    'text-sm',
    'font-semibold',
  )
  const subHeaderColor = resolveColor(eventHeroSubHeaderTextColor, 'text-white')

  const headingTypo = resolveTypography(
    eventHeroHeadingFontSizeDesktop,
    eventHeroHeadingFontSizeMobile,
    eventHeroHeadingFontWeightDesktop,
    eventHeroHeadingFontWeightMobile,
    'text-6xl',
    'font-bold',
  )
  const headingColor = resolveColor(eventHeroHeadingTextColor, 'text-white')

  const descriptionTypo = resolveTypography(
    eventHeroDescriptionFontSizeDesktop,
    eventHeroDescriptionFontSizeMobile,
    eventHeroDescriptionFontWeightDesktop,
    eventHeroDescriptionFontWeightMobile,
    'text-lg md:text-xl',
    'font-normal',
  )
  const descriptionColor = resolveColor(eventHeroDescriptionTextColor, 'text-white/90')

  // Clean heading: filter out empty paragraphs/ghost lines
  const cleanHeading = React.useMemo(() => {
    if (!resolvedHeading || typeof resolvedHeading !== 'object' || !('root' in resolvedHeading)) {
      return resolvedHeading
    }
    const root = (resolvedHeading as any).root
    if (!root || !Array.isArray(root.children)) return resolvedHeading
    const filtered = root.children.filter((child: any) => {
      if (child.type === 'paragraph' || child.type === 'heading') {
        const textContent = (child.children || [])
          .map((c: any) => c.text || '')
          .join('')
          .trim()
        return textContent.length > 0
      }
      return true
    })
    return {
      ...resolvedHeading,
      root: {
        ...root,
        children: filtered.length > 0 ? filtered : root.children,
      },
    }
  }, [resolvedHeading])

  return (
    <section
      className={cn(sectionClass, 'w-full relative overflow-hidden', bgClass)}
      style={
        {
          '--eh-pt-m': ptMobile,
          '--eh-pt-d': ptDesktop,
          '--eh-pb-m': pbMobile,
          '--eh-pb-d': pbDesktop,
          ...(!isMatchHeader
            ? {
                '--eh-pl-m': plMobile,
                '--eh-pl-d': plDesktop,
                '--eh-pr-m': prMobile,
                '--eh-pr-d': prDesktop,
              }
            : {}),
          ...bgStyle,
        } as React.CSSProperties
      }
    >
      <style>{`
        .${sectionClass} {
          padding-top: var(--eh-pt-m);
          padding-bottom: var(--eh-pb-m);
        }
        .${sectionClass}-inner {
          padding-left: var(--eh-pl-m);
          padding-right: var(--eh-pr-m);
        }
        @media (min-width: 768px) {
          .${sectionClass} {
            padding-top: var(--eh-pt-d);
            padding-bottom: var(--eh-pb-d);
          }
          .${sectionClass}-inner {
            padding-left: var(--eh-pl-d);
            padding-right: var(--eh-pr-d);
          }
        }
      `}</style>

      <div
        className={cn(
          'w-full mx-auto relative z-10',
          isMatchHeader
            ? 'container max-w-screen-2xl px-4 sm:px-6 lg:px-8'
            : cn('w-full', `${sectionClass}-inner`),
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
          {/* Left Column (Wider, Vertically Centered) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Sub Header */}
            {resolvedSubHeader && (
              <div
                className={cn(
                  'tracking-wider uppercase',
                  subHeaderColor.className,
                  subHeaderTypo.combined,
                  resolveMarginBottom(
                    eventHeroSubHeaderMarginBottomDesktop,
                    eventHeroSubHeaderMarginBottomMobile,
                    'mb-4',
                  ),
                )}
                style={subHeaderColor.style}
              >
                {resolvedSubHeader}
              </div>
            )}

            {/* Main Heading */}
            {cleanHeading && (
              <div
                className={cn(
                  'tracking-tight [word-spacing:normal] [white-space:normal] break-words',
                  headingColor.className,
                  headingTypo.combined,
                  'leading-[1.1] md:leading-[1.1]',
                  '[&_*]:leading-[1.1]',
                  '[&_p]:!leading-[1.1] [&_h1]:!leading-[1.1] [&_h2]:!leading-[1.1] [&_h3]:!leading-[1.1] [&_h4]:!leading-[1.1]',
                  '[&_p]:!m-0 [&_h1]:!m-0 [&_h2]:!m-0 [&_h3]:!m-0 [&_h4]:!m-0',
                  resolveMarginBottom(
                    eventHeroHeadingMarginBottomDesktop,
                    eventHeroHeadingMarginBottomMobile,
                    'mb-6',
                  ),
                )}
                style={headingColor.style}
              >
                <RichText content={cleanHeading} enableGutter={false} enableProse={false} />
              </div>
            )}

            {/* Description */}
            {resolvedDescription && (
              <div
                className={cn(
                  'leading-relaxed max-w-2xl [word-spacing:normal] [white-space:normal] break-words',
                  descriptionColor.className,
                  descriptionTypo.combined,
                  resolveMarginBottom(
                    eventHeroDescriptionMarginBottomDesktop,
                    eventHeroDescriptionMarginBottomMobile,
                    'mb-8',
                  ),
                  '[&_p]:m-0',
                )}
                style={descriptionColor.style}
              >
                <RichText content={resolvedDescription} enableGutter={false} enableProse={false} />
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

