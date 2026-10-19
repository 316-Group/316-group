import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { ArrowUpRight } from 'lucide-react'
import type { Media as MediaType, Page, Post, CaseStudy, EbooksAndGuide, Brand } from '@/payload-types'

export interface ReadyToGrowProps {
  sectionBgColor?: string | null
  paddingTop?: string | null
  paddingMode?: 'default' | 'none' | 'custom' | null
  paddingXDesktop?: string | null
  paddingXMobile?: string | null
  paddingXDesktopCustom?: string | null
  paddingXMobileCustom?: string | null

  badgeGroup?: {
    text?: string | null
    bgColor?: string | null
    textColor?: string | null
    fontSize?: string | null
    alignment?: 'center' | 'left' | 'right' | null
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
  } | null

  headingGroup?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'center' | 'left' | 'right' | null
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
  } | null

  descriptionGroup?: {
    text?: string | null
    color?: string | null
    fontSize?: string | null
    fontWeight?: string | null
    alignment?: 'center' | 'left' | 'right' | null
    spacingBottom?: string | null
    spacingBottomCustom?: string | null
  } | null

  buttonGroup?: {
    text?: string | null
    link?: {
      type?: 'custom' | 'reference' | null
      url?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts' | 'ebooks-and-guides' | 'case-studies' | 'brands'
        value: Page | Post | CaseStudy | EbooksAndGuide | Brand | string | number
      } | null
    } | null
    bgColor?: string | null
    textColor?: string | null
    fontSize?: string | null
    alignment?: 'center' | 'left' | 'right' | null
    iconCircleBg?: string | null
    iconColor?: string | null
  } | null

  imagesGroup?: {
    spacingTop?: string | null
    spacingTopCustom?: string | null
    outerCapsulesMarginBottom?: string | null
    outerCapsulesMarginBottomCustom?: string | null
    image1?: MediaType | string | null
    image2?: MediaType | string | null
    image3?: MediaType | string | null
    image4?: MediaType | string | null
  } | null

  className?: string
}

export function formatInlineHtml(content?: string | null): string {
  if (!content) return ''
  return content
    .replace(/<style=(["'])(.*?)\1>(.*?)<\/style>/gi, '<span style="$2">$3</span>')
    .replace(/<style=(["'])(.*?)\1>/gi, '<span style="$2">')
}

export const ReadyToGrowBlock: React.FC<ReadyToGrowProps> = ({
  sectionBgColor = 'bg-blue-600',
  paddingTop = 'pt-20',
  paddingMode = 'default',
  paddingXDesktop = '48px',
  paddingXMobile = '16px',
  paddingXDesktopCustom,
  paddingXMobileCustom,
  badgeGroup,
  headingGroup,
  descriptionGroup,
  buttonGroup,
  imagesGroup,
  className,
}) => {
  const uid = React.useId().replace(/:/g, '')

  // ─── Layout & Horizontal Padding Resolution ─────────────────────────────────
  const resolvedDesktopPad =
    paddingMode === 'none'
      ? '0px'
      : paddingMode === 'custom'
        ? paddingXDesktop === 'custom'
          ? paddingXDesktopCustom || '48px'
          : paddingXDesktop || '48px'
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
    paddingMode === 'custom' || paddingMode === 'none' ? `readytogrow-pad-${uid}` : ''

  // ─── Helper for Spacing Resolutions ─────────────────────────────────────────
  const resolveSpacing = (selectVal?: string | null, customVal?: string | null, fallback = '24px') => {
    if (selectVal === 'custom') return customVal || fallback
    return selectVal || fallback
  }

  // ─── Alignment Classes ──────────────────────────────────────────────────────
  const textAlignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const flexAlignClasses: Record<string, string> = {
    left: 'justify-start self-start text-left',
    center: 'justify-center self-center text-center',
    right: 'justify-end self-end text-right',
  }

  // ─── 1. Badge Settings ──────────────────────────────────────────────────────
  const badgeText = badgeGroup?.text?.trim() ?? 'Ready to grow?'
  const badgeBg = badgeGroup?.bgColor || 'bg-blue-700'
  const badgeTextCol = badgeGroup?.textColor || 'text-white'
  const badgeSize = badgeGroup?.fontSize || 'text-sm md:text-base'
  const badgeAlign = badgeGroup?.alignment || 'center'
  const badgeSpacing = resolveSpacing(badgeGroup?.spacingBottom, badgeGroup?.spacingBottomCustom, '24px')

  // ─── 2. Heading Settings ────────────────────────────────────────────────────
  const headingText = headingGroup?.text?.trim() ?? "Let's build what comes next, together."
  const headingColor = headingGroup?.color || 'text-white'
  const headingSize = headingGroup?.fontSize || 'text-4xl md:text-5xl lg:text-6xl'
  const headingWeight = headingGroup?.fontWeight || 'font-bold'
  const headingAlign = headingGroup?.alignment || 'center'
  const headingSpacing = resolveSpacing(headingGroup?.spacingBottom, headingGroup?.spacingBottomCustom, '20px')

  // ─── 3. Description Settings ────────────────────────────────────────────────
  const descText =
    descriptionGroup?.text?.trim() ??
    'Explore solutions, discuss partnerships or connect with one of our specialist businesses.'
  const descColor = descriptionGroup?.color || 'text-white'
  const descSize = descriptionGroup?.fontSize || 'text-base md:text-lg lg:text-xl'
  const descWeight = descriptionGroup?.fontWeight || 'font-normal'
  const descAlign = descriptionGroup?.alignment || 'center'
  const descSpacing = resolveSpacing(
    descriptionGroup?.spacingBottom,
    descriptionGroup?.spacingBottomCustom,
    '32px',
  )

  // ─── 4. Button Settings ─────────────────────────────────────────────────────
  const btnText = buttonGroup?.text?.trim() ?? 'Talk to our experts'
  const btnBg = buttonGroup?.bgColor || 'bg-white'
  const btnTextCol = buttonGroup?.textColor || 'text-gray-950'
  const btnSize = buttonGroup?.fontSize || 'text-sm md:text-base'
  const btnAlign = buttonGroup?.alignment || 'center'
  const iconCircleBg = buttonGroup?.iconCircleBg || 'bg-blue-600'
  const iconCol = buttonGroup?.iconColor || 'text-white'

  // Link Resolution
  const linkObj = buttonGroup?.link
  let href = '#'
  if (linkObj?.type === 'custom' && linkObj.url) {
    href = linkObj.url
  } else if (linkObj?.type === 'reference' && typeof linkObj.reference?.value === 'object') {
    const refDoc = linkObj.reference.value as any
    const relation = linkObj.reference.relationTo
    const slug = refDoc?.slug
    if (slug) {
      href = relation !== 'pages' ? `/${relation}/${slug}` : `/${slug}`
    }
  }
  const newTabProps = linkObj?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  // ─── 5. Images Settings ─────────────────────────────────────────────────────
  const imagesTopSpacing = resolveSpacing(
    imagesGroup?.spacingTop,
    imagesGroup?.spacingTopCustom,
    '48px',
  )
  const outerCapsulesMarginBottom = resolveSpacing(
    imagesGroup?.outerCapsulesMarginBottom,
    imagesGroup?.outerCapsulesMarginBottomCustom,
    '32px',
  )
  const image1 = imagesGroup?.image1
  const image2 = imagesGroup?.image2
  const image3 = imagesGroup?.image3
  const image4 = imagesGroup?.image4

  const renderSlotImage = (img: MediaType | string | null | undefined, label: string) => {
    if (img && typeof img === 'object') {
      return (
        <Media
          resource={img}
          fill
          imgClassName="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
          priority={false}
          loading="lazy"
        />
      )
    }
    return (
      <div
        className="w-full h-full bg-gradient-to-t from-white/15 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm"
        aria-label={label}
      />
    )
  }

  return (
    <section
      className={cn(
        'w-full relative overflow-hidden transition-colors duration-300',
        sectionBgColor,
        className,
      )}
    >
      {/* Custom Horizontal Padding Overrides */}
      {(paddingMode === 'custom' || paddingMode === 'none') && (
        <style>{`
          .${padClassName} {
            padding-left: ${resolvedMobilePad} !important;
            padding-right: ${resolvedMobilePad} !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          @media (min-width: 1024px) {
            .${padClassName} {
              padding-left: ${resolvedDesktopPad} !important;
              padding-right: ${resolvedDesktopPad} !important;
            }
          }
        `}</style>
      )}

      <div
        className={cn(
          'w-full flex flex-col items-center',
          paddingTop,
          paddingMode === 'default' && 'max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12',
          padClassName,
        )}
      >
        {/* ─── Center Stack Content ────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* Badge */}
          {Boolean(badgeText) && (
            <>
              <div className={cn('w-full flex', flexAlignClasses[badgeAlign])}>
                <span
                  className={cn(
                    'inline-flex items-center px-6 py-2 rounded-full border border-white/10 shadow-sm transition-colors',
                    badgeBg,
                    badgeTextCol,
                    badgeSize,
                  )}
                >
                  {badgeText}
                </span>
              </div>
              <div style={{ height: badgeSpacing }} aria-hidden="true" />
            </>
          )}

          {/* Heading */}
          {Boolean(headingText) && (
            <>
              <h2
                className={cn(
                  'w-full tracking-tight leading-[1.12] transition-colors',
                  headingColor,
                  headingSize,
                  headingWeight,
                  textAlignClasses[headingAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(headingText) }}
              />
              <div style={{ height: headingSpacing }} aria-hidden="true" />
            </>
          )}

          {/* Description */}
          {Boolean(descText) && (
            <>
              <p
                className={cn(
                  'w-full max-w-2xl leading-relaxed transition-colors opacity-95',
                  descColor,
                  descSize,
                  descWeight,
                  textAlignClasses[descAlign],
                )}
                dangerouslySetInnerHTML={{ __html: formatInlineHtml(descText) }}
              />
              <div style={{ height: descSpacing }} aria-hidden="true" />
            </>
          )}

          {/* Action Button */}
          {Boolean(btnText) && (
            <div className={cn('w-full flex', flexAlignClasses[btnAlign])}>
              <Link
                href={href}
                {...newTabProps}
                className={cn(
                  'inline-flex items-center gap-3.5 pl-6 pr-2 py-2 rounded-full shadow-md transition-all group/btn hover:shadow-lg hover:scale-102 cursor-pointer',
                  btnBg,
                  btnTextCol,
                  btnSize,
                )}
              >
                <span className="font-semibold">{btnText}</span>
                <span
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5',
                    iconCircleBg,
                  )}
                >
                  <ArrowUpRight className={cn('w-4 h-4 transition-colors', iconCol)} />
                </span>
              </Link>
            </div>
          )}
        </div>

        {/* Spacing Above Images */}
        <div style={{ height: imagesTopSpacing }} aria-hidden="true" />

        {/* ─── Bottom 4 Arch / Capsule Images ──────────────────────────────────── */}
        <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-[1400px] mx-auto select-none">
          {/* Image 1: Left Outer Capsule (Full Upright Stadium) */}
          <div
            style={{ marginBottom: outerCapsulesMarginBottom }}
            className="w-[21%] sm:w-[21%] md:w-[22%] max-w-[260px] aspect-[10/16] rounded-full overflow-hidden shrink-0 shadow-lg relative bg-white/10 transition-all duration-300"
          >
            {renderSlotImage(image1, 'Image 1 - Left Outer Capsule')}
          </div>

          {/* Image 2: Left Inner Arch (Large Dome Arch, Top Half Visible, Bottom Half Cropped) */}
          <div className="w-[27%] sm:w-[27%] md:w-[28%] max-w-[360px] aspect-[1/1] rounded-t-full overflow-hidden shrink-0 shadow-lg relative bg-white/10 translate-y-[25%] sm:translate-y-[30%]">
            {renderSlotImage(image2, 'Image 2 - Left Inner Arch')}
          </div>

          {/* Image 3: Right Inner Arch (Large Dome Arch, Top Quarter Visible, 3/4 Cropped) */}
          <div className="w-[27%] sm:w-[27%] md:w-[28%] max-w-[360px] aspect-[1/1] rounded-t-full overflow-hidden shrink-0 shadow-lg relative bg-white/10 translate-y-[55%] sm:translate-y-[60%]">
            {renderSlotImage(image3, 'Image 3 - Right Inner Arch')}
          </div>

          {/* Image 4: Right Outer Capsule (Full Upright Stadium) */}
          <div
            style={{ marginBottom: outerCapsulesMarginBottom }}
            className="w-[21%] sm:w-[21%] md:w-[22%] max-w-[260px] aspect-[10/16] rounded-full overflow-hidden shrink-0 shadow-lg relative bg-white/10 transition-all duration-300"
          >
            {renderSlotImage(image4, 'Image 4 - Right Outer Capsule')}
          </div>
        </div>
      </div>
    </section>
  )
}
