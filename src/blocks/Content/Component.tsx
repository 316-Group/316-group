import { cn } from 'src/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { TestimonialCarousel } from '@/components/ui/testimonial'
import Carousel from '@/components/ui/Carousel'
import CardInvert from '@/components/CardInvert'
import { AutoScrollSlider } from '@/components/AutoScrollSlider'
import { StyledCards } from '@/components/StyledCards'
import { Icon } from '@/components/Icon'
import { SwiperElement } from '@/components/Swiper'
import { paddingGenerator } from '@/utilities/paddingGenerator'
import { AccordionClient } from './AccordionClient'
import { CaseStudySliderClient } from './CaseStudySliderClient'
import { getBestContrastTextColor } from '@/utilities/getBestContrastTextColor'
import { ImageTextSplitBlock } from '../ImageTextSplit/Component'
import { AccordionPanel } from '../SolutionsAccordion/AccordionPanel'
import { CenteredContentComponent } from '../CenteredContent/Component'
import { ClickExpandBlock } from '../ClickExpand/Component'
import { GridColBlock } from '../GridCol/Component'
import { AnimatedIconsGridBlock } from '../AnimatedIconsGrid/Component'
import { FeatureCardsBlock } from '../FeatureCards/Component'
import { VerticalCTAv2Component } from '../VerticalCTAv2/Component'
import { SplitTextBlock } from '../SplitText/Component'
import { ImageSliderBlock } from '../ImageSlider/Component'
import { BlogPostUpdatedBlock } from '../BlogPostUpdated/Component'
import { ReadyToGrowBlock } from '../ReadyToGrow/Component'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const {
    columns,
    backgroundMedia,
    backgroundType,
    sectionBackgroundColor,
    paddingType,
    bgoverlay,
    gradientSettings,
  } = props

  const colsSpanClasses = {
    full: 'lg:col-span-12 md:col-span-4',
    half: 'lg:col-span-6 md:col-span-4',
    oneThird: 'lg:col-span-4 md:col-span-4',
    twoThirds: 'lg:col-span-8 md:col-span-4',
  }
  const orderClasses = {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
    5: 'order-5',
    6: 'order-6',
    7: 'order-7',
    8: 'order-8',
    9: 'order-9',
    10: 'order-10',
    11: 'order-11',
    12: 'order-12',
  }
  const mdOrderClasses = {
    1: 'md:order-1',
    2: 'md:order-2',
    3: 'md:order-3',
    4: 'md:order-4',
    5: 'md:order-5',
    6: 'md:order-6',
    7: 'md:order-7',
    8: 'md:order-8',
    9: 'md:order-9',
    10: 'md:order-10',
    11: 'md:order-11',
    12: 'md:order-12',
    13: 'md:order-13',
    14: 'md:order-14',
    15: 'md:order-15',
    16: 'md:order-16',
    17: 'md:order-17',
    18: 'md:order-18',
    19: 'md:order-19',
    20: 'md:order-20',
    21: 'md:order-21',
    22: 'md:order-22',
    23: 'md:order-23',
  }

  // function getBestContrastTextColor is now imported from utilities
  const renderBackgroundMedia = () => {
    if (!backgroundMedia || typeof backgroundMedia === 'string') return null

    const { mimeType, url } = backgroundMedia

    if (mimeType?.startsWith('image/') && url) {
      return (
        <>
          <Image
            src={url}
            fill
            alt={backgroundMedia.alt ? backgroundMedia.alt : 'background image'}
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div
            className={cn(
              bgoverlay && 'bg-black/30 absolute inset-0 w-full h-full object-cover z-[-1]',
            )}
          />
        </>
      )
    } else if (mimeType?.startsWith('video/') && url) {
      return (
        <>
          <video
            src={url}
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            autoPlay
            muted
            loop
            playsInline
          />
          <div
            className={cn(
              bgoverlay && 'bg-black/30 absolute inset-0 w-full h-full object-cover z-[-1]',
            )}
          />
        </>
      )
    }

    console.warn('Unsupported media type:', mimeType)
    return null
  }

  const gradientStyle: React.CSSProperties = {}

  if (backgroundType === 'gradient' && gradientSettings) {
    if (
      gradientSettings.gradientStartPercentage !== undefined &&
      gradientSettings.gradientStartPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-from-position'] = `${gradientSettings.gradientStartPercentage}%`
    }
    if (
      gradientSettings.gradientViaPercentage !== undefined &&
      gradientSettings.gradientViaPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-via-position'] = `${gradientSettings.gradientViaPercentage}%`
    }
    if (
      gradientSettings.gradientStopPercentage !== undefined &&
      gradientSettings.gradientStopPercentage !== null
    ) {
      // @ts-ignore
      gradientStyle['--tw-gradient-to-position'] = `${gradientSettings.gradientStopPercentage}%`
    }
  }

  return (
    <div
      style={gradientStyle}
      className={cn(
        'w-full relative overflow-hidden',
        paddingGenerator(paddingType),
        backgroundType === 'color' && sectionBackgroundColor,
        backgroundType === 'color' && getBestContrastTextColor(sectionBackgroundColor),
        backgroundType === 'media' && 'text-white',
        backgroundType === 'gradient' &&
          gradientSettings &&
          cn(
            `bg-gradient-${gradientSettings.gradientDirection}`,
            gradientSettings.gradientStartColor && `from-${gradientSettings.gradientStartColor}`,
            gradientSettings.gradientViaColor && `via-${gradientSettings.gradientViaColor}`,
            gradientSettings.gradientStopColor && `to-${gradientSettings.gradientStopColor}`,
          ),
        backgroundType === 'gradient' &&
          gradientSettings?.gradientStartColor &&
          getBestContrastTextColor(`bg-${gradientSettings.gradientStartColor}`),
      )}
    >
      {backgroundType === 'media' && renderBackgroundMedia()}
      {(() => {
        const hasFullWidthCol = columns?.some(
          (c) => (c as any).widthMode === 'fullWidth' && !(c as any).matchHeaderPillWidth,
        )
        return (
          <div className={cn(hasFullWidthCol ? 'w-full' : 'container max-w-screen-2xl', 'z-5')}>
            <div
              className={cn(
                'mobile-only:flex mobile-only:flex-col gap-8 md:grid lg:grid-cols-12 md:grid-cols-4 lg:gap-y-12',
                !hasFullWidthCol && 'lg:gap-x-16',
              )}
            >
              {columns?.map((col, index) => {
                const isMatchHeaderPillWidth = Boolean((col as any).matchHeaderPillWidth)
                const size = isMatchHeaderPillWidth ? 'full' : (col.size || 'full')
                const mobileOrder = col.mobileOrder || index + 1
                const orderClass = orderClasses[mobileOrder as keyof typeof orderClasses] || ''
                const mdOrderClass = mdOrderClasses[index + 1] || 'md:order-0'
                const colWidth = colsSpanClasses[size]
                const colBg = (col as any).columnBgColor
                const isColFullWidth = !isMatchHeaderPillWidth && (col as any).widthMode === 'fullWidth'

                // Column padding resolution
                const colPaddingMode = (col as any).paddingMode || 'default'
                const colPaddingSide = (col as any).paddingSide || 'both'

                const resolvePadVal = (
                  sel?: string | null,
                  custom?: string | null,
                  fallback = '0px',
                ) => {
                  if (sel === 'custom') return custom || fallback
                  return sel || fallback
                }

                let colPadLeftDesktop = '0px'
                let colPadRightDesktop = '0px'
                let colPadLeftMobile = '0px'
                let colPadRightMobile = '0px'

                if (colPaddingMode === 'none') {
                  colPadLeftDesktop = '0px'
                  colPadRightDesktop = '0px'
                  colPadLeftMobile = '0px'
                  colPadRightMobile = '0px'
                } else if (colPaddingMode === 'custom') {
                  if (colPaddingSide === 'left') {
                    colPadLeftDesktop = resolvePadVal(
                      (col as any).paddingLeftDesktop,
                      (col as any).paddingLeftDesktopCustom,
                      '50px',
                    )
                    colPadLeftMobile = resolvePadVal(
                      (col as any).paddingLeftMobile,
                      (col as any).paddingLeftMobileCustom,
                      '16px',
                    )
                    colPadRightDesktop = '0px'
                    colPadRightMobile = '0px'
                  } else if (colPaddingSide === 'right') {
                    colPadLeftDesktop = '0px'
                    colPadLeftMobile = '0px'
                    colPadRightDesktop = resolvePadVal(
                      (col as any).paddingRightDesktop,
                      (col as any).paddingRightDesktopCustom,
                      '50px',
                    )
                    colPadRightMobile = resolvePadVal(
                      (col as any).paddingRightMobile,
                      (col as any).paddingRightMobileCustom,
                      '16px',
                    )
                  } else if (colPaddingSide === 'split') {
                    colPadLeftDesktop = resolvePadVal(
                      (col as any).paddingLeftDesktop,
                      (col as any).paddingLeftDesktopCustom,
                      '50px',
                    )
                    colPadRightDesktop = resolvePadVal(
                      (col as any).paddingRightDesktop,
                      (col as any).paddingRightDesktopCustom,
                      '50px',
                    )
                    colPadLeftMobile = resolvePadVal(
                      (col as any).paddingLeftMobile,
                      (col as any).paddingLeftMobileCustom,
                      '16px',
                    )
                    colPadRightMobile = resolvePadVal(
                      (col as any).paddingRightMobile,
                      (col as any).paddingRightMobileCustom,
                      '16px',
                    )
                  } else {
                    // 'both' (default)
                    const dVal = resolvePadVal(
                      (col as any).paddingXDesktop,
                      (col as any).paddingXDesktopCustom,
                      '50px',
                    )
                    const mVal = resolvePadVal(
                      (col as any).paddingXMobile,
                      (col as any).paddingXMobileCustom,
                      '16px',
                    )
                    colPadLeftDesktop = dVal
                    colPadRightDesktop = dVal
                    colPadLeftMobile = mVal
                    colPadRightMobile = mVal
                  }
                }

                const colPadUid =
                  colPaddingMode === 'none' || colPaddingMode === 'custom'
                    ? `col-pad-${index}`
                    : undefined

                return (
                  <React.Fragment key={index}>
                    {colPadUid && (
                      <style>{`
                        .${colPadUid} {
                          padding-left: ${colPadLeftMobile};
                          padding-right: ${colPadRightMobile};
                        }
                        @media (min-width: 768px) {
                          .${colPadUid} {
                            padding-left: ${colPadLeftDesktop};
                            padding-right: ${colPadRightDesktop};
                          }
                        }
                      `}</style>
                    )}
                    <div
                      className={cn(
                        colWidth, // Responsive column spans
                        orderClass, // Mobile order
                        mdOrderClass, // Reset order on desktop
                        colPadUid,
                        col.alignment === 'center' &&
                          'text-center flex flex-col items-center justify-center',
                        colBg && colBg !== 'bg-transparent' && colBg,
                        isMatchHeaderPillWidth && 'w-full max-w-[1472px] mx-auto',
                        hasFullWidthCol &&
                          !isColFullWidth &&
                          !colPadUid &&
                          'max-w-screen-2xl mx-auto px-4 md:px-8',
                      )}
                    >
                      {col.columnContent?.map((content, index) => {
                  const {
                    contentType,
                    links,
                    richText,
                    media,
                    verticalCTA,
                    cardWithList,
                    linkAlignment,
                    verticalCTABgColor,
                    verticalCTABgOpacity,
                  } = content

                  if (contentType === 'media' && media && typeof media !== 'string') {
                    const { mediaWidth, mediaCustomWidth, mediaMobileCustomWidth } = content
                    let wrapperClasses = 'rounded-xl overflow-hidden'
                    let imgClasses = 'rounded-xl'
                    let fill = false
                    const wrapperStyle: React.CSSProperties = {}
                    const mobileClass = mediaMobileCustomWidth
                      ? `media-mobile-${index}`
                      : undefined

                    if (mediaWidth === 'fill') {
                      wrapperClasses = cn(wrapperClasses, 'relative w-full h-full')
                      imgClasses = cn(imgClasses, 'object-cover')
                      fill = true
                    } else if (mediaWidth === 'full') {
                      wrapperClasses = cn(wrapperClasses, 'w-full')
                      imgClasses = cn(imgClasses, 'w-full h-auto')
                    } else if (mediaWidth === 'custom' && mediaCustomWidth) {
                      wrapperStyle.width = mediaCustomWidth
                      imgClasses = cn(imgClasses, 'w-full h-auto')
                    }

                    return (
                      <>
                        {mobileClass && (
                          <style>{`@media (max-width: 768px) { .${mobileClass} { width: ${mediaMobileCustomWidth} !important; } }`}</style>
                        )}
                        <div
                          className={cn(wrapperClasses, mobileClass)}
                          style={wrapperStyle}
                          key={index}
                        >
                          <Media resource={media} size="33vw" imgClassName={imgClasses} fill={fill} />
                        </div>
                      </>
                    )
                  }
                  if (contentType === 'cardInvert' && content.cardInvert) {
                    const { cardTitle, cardDescription, cardImage } = content.cardInvert
                    if (typeof cardImage === 'object')
                      return (
                        <CardInvert
                          key={index}
                          cardTitle={cardTitle}
                          cardDescription={cardDescription}
                          cardImage={cardImage}
                        />
                      )
                  }

                  if (contentType === 'swiperSlider' && content.swiperImages) {
                    const images = content.swiperImages
                    return <SwiperElement key={index} images={images} />
                  }

                  if (contentType === 'testimonials' && content.testimonials) {
                    const testimonials = content.testimonials
                    const bgColor = content.testimonialCustomizer?.cardBgColor
                    const textClasses = content.testimonialCustomizer?.textClasses
                    if (bgColor && textClasses) {
                      return (
                        <TestimonialCarousel
                          testimonials={testimonials}
                          testimonialModifier={{ bgColor, textClasses }}
                          showArrows={true}
                          showBars={true}
                          key={index}
                          className="w-[95%] md:w-[70%] lg:[w-60%] m-auto"
                        />
                      )
                    } else
                      return (
                        <TestimonialCarousel
                          testimonials={testimonials}
                          showArrows={true}
                          showBars={true}
                          key={index}
                          className="w-[95%] md:w-[70%] lg:[w-60%] m-auto"
                        />
                      )
                  }

                  if (contentType === 'carousel' && content.carousel) {
                    const carousel = content.carousel

                    return <Carousel key={index} {...carousel} />
                  }

                  if (contentType === 'richText') {
                    // const richText = content.richText
                    const richTextClasses = content.richTextClasses
                    return (
                      richText && (
                        <RichText
                          content={richText}
                          enableGutter={false}
                          enableProse={false}
                          className={cn(richTextClasses, col.alignment === 'center' && 'text-center mx-auto')}
                        />
                      )
                    )
                  }
                  if (contentType === 'styledHeading') {
                    const styledHeading = content.styledHeading
                    return (
                      styledHeading?.heading && (
                        <h2
                          key={index}
                          className={cn(
                            styledHeading?.headingClasses,
                            col.alignment === 'center' && 'text-center mx-auto',
                            styledHeading?.leftBorderStyle &&
                              `pl-4 md:pl-8 border-l-4 border-${styledHeading?.borderColor}`,
                          )}
                          dangerouslySetInnerHTML={{ __html: styledHeading?.heading }}
                        />
                      )
                    )
                  }

                  if (contentType === 'verticalCTA') {
                    // const verticalCTA = content.verticalCTA
                    return (
                      verticalCTA && (
                        <div
                          key={index}
                          className={cn(
                            'flex flex-col',
                            verticalCTA.alignment === 'top' && 'justify-start h-full',
                            verticalCTA.alignment === 'center' && 'justify-center h-full',
                            verticalCTA.alignment === 'bottom' && 'justify-end h-full',
                            verticalCTABgColor && verticalCTABgColor,
                            verticalCTABgOpacity && verticalCTABgOpacity,
                            verticalCTABgColor && 'p-8 md:p-12 rounded-2xl',
                          )}
                        >
                          {verticalCTA.subtitle && (
                            <p
                              className={cn(verticalCTA.subtitleClasses)}
                              dangerouslySetInnerHTML={{ __html: verticalCTA.subtitle }}
                            />
                          )}

                          {verticalCTA.title && (
                            <h3
                              dangerouslySetInnerHTML={{ __html: verticalCTA.title }}
                              className={cn(verticalCTA.titleClasses)}
                            ></h3>
                          )}
                          {verticalCTA.description && (
                            <RichText
                              className={cn(verticalCTA.descriptionClasses)}
                              content={verticalCTA.description}
                              enableGutter={false}
                              enableProse={false}
                            />
                          )}
                          <div className="flex gap-8">
                            {(verticalCTA.links || []).map(({ link, buttonClasses }, i) => {
                              return (
                                <CMSLink
                                  key={i}
                                  size="lg"
                                  {...link}
                                  className={cn(buttonClasses)}
                                />
                              )
                            })}
                          </div>
                        </div>
                      )
                    )
                  }

                  if (contentType === 'cardWithList' && cardWithList) {
                    const { cardTitle, listItems, cardBgColor, titleClasses } = cardWithList
                    return (
                      <div
                        key={index}
                        className={cn('p-8 md:p-16 lg:p-24 rounded-2xl', cardBgColor)}
                      >
                        <h3
                          className={cn(titleClasses)}
                          dangerouslySetInnerHTML={{ __html: cardTitle }}
                        />
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {listItems?.map((item, i) => (
                            <li key={i} className="flex items-center gap-2">
                              {item.icon && <Media resource={item.icon} className="w-6 h-6" />}
                              <span className={cn(item.textClasses)}>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  }

                  if (contentType === 'autoScrollSlider' && content.autoScrollSlider) {
                    const { images, dimensionClasses, speed, showFadingEffect } = content.autoScrollSlider
                    return (
                      <AutoScrollSlider
                        key={index}
                        images={images}
                        dimensionClasses={dimensionClasses || []}
                        speed={speed || 1000}
                        showFadingEffect={showFadingEffect ?? true}
                      />
                    )
                  }

                  if (contentType === 'styledCards' && content.styledCards) {
                    const {
                      cards,
                      imageClasses,
                      gapClasses,
                      titleClasses,
                      descriptionClasses,
                      shadowClasses,
                      cardBgColor,
                      cardHoverBgColor,
                      borderClasses,
                      cardsPerRow,
                      marginSpace,
                      alignContent,
                      alignCardContent,
                      cardRounded,
                      descriptionAlign,
                    } = content.styledCards
                    return (
                      <StyledCards
                        key={index}
                        cards={cards}
                        imageClasses={imageClasses}
                        gapClasses={gapClasses}
                        titleClasses={titleClasses}
                        descriptionClasses={descriptionClasses}
                        shadowClasses={shadowClasses}
                        cardBgColor={cardBgColor}
                        cardHoverBgColor={cardHoverBgColor}
                        borderClasses={borderClasses}
                        cardsPerRow={cardsPerRow}
                        marginSpace={marginSpace}
                        alignContent={alignContent}
                        alignCardContent={alignCardContent}
                        cardRounded={cardRounded}
                        descriptionAlign={descriptionAlign}
                      />
                    )
                  }

                  if (contentType === 'statusBanner' && content.statusBanner) {
                    const {
                      content: bannerContent,
                      contentClasses,
                      flavor,
                      alignment,
                      icon,
                    } = content.statusBanner

                    const flavorClasses = {
                      success: {
                        bg: 'bg-green-900/30',
                        text: 'text-green-500',
                        border: 'border-green-800',
                      },
                      danger: {
                        bg: 'bg-red-900/30',
                        text: 'text-red-500',
                        border: 'border-red-800',
                      },
                      warning: {
                        bg: 'bg-amber-900/30',
                        text: 'text-amber-500',
                        border: 'border-amber-800',
                      },
                      info: {
                        bg: 'bg-blue-900/30',
                        text: 'text-blue-500',
                        border: 'border-blue-800',
                      },
                      primary: {
                        bg: 'bg-slate-800',
                        text: 'text-white',
                        border: 'border-slate-700',
                      },
                      secondary: {
                        bg: 'bg-gray-100',
                        text: 'text-gray-800',
                        border: 'border-gray-200',
                      },
                    }

                    const selectedFlavor = flavorClasses[flavor || 'success']

                    return (
                      <div
                        key={index}
                        className={cn(
                          'w-full py-4 px-6 rounded-xl border flex items-center gap-3',
                          selectedFlavor.bg,
                          selectedFlavor.border,
                          alignment === 'center' && 'justify-center',
                          alignment === 'right' && 'justify-end',
                          alignment === 'left' && 'justify-start',
                        )}
                      >
                        {icon && (
                          <Icon name={icon} className={cn('w-8 h-8', selectedFlavor.text)} />
                        )}
                        <span className={cn(contentClasses, selectedFlavor.text)}>
                          {bannerContent}
                        </span>
                      </div>
                    )
                  }

                  if (contentType === 'modernCard' && content.modernCard) {
                    const {
                      title,
                      titleClasses,
                      description,
                      descriptionClasses,
                      links,
                      cardBgColor,
                      cardBgOpacity,
                      icon: iconName,
                    } = content.modernCard

                    return (
                      <div
                        key={index}
                        className={cn(
                          'rounded-3xl p-8 md:p-12 flex flex-col gap-6',
                          cardBgColor,
                          cardBgOpacity,
                        )}
                      >
                        {iconName && (
                          <Icon name={iconName} className="w-12 h-12 mb-4 text-blue-600" />
                        )}
                        {title && (
                          <h3
                            dangerouslySetInnerHTML={{ __html: title }}
                            className={cn(titleClasses)}
                          />
                        )}
                        {description && (
                          <RichText
                            content={description}
                            enableGutter={false}
                            enableProse={false}
                            className={cn(descriptionClasses)}
                          />
                        )}
                        {links && Array.isArray(links) && links.length > 0 && (
                          <div className="flex gap-4 mt-auto">
                            {links.map(({ link, buttonClasses }, i) => (
                              <CMSLink key={i} size="lg" {...link} className={cn(buttonClasses)} />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  if (contentType === 'spacer' && content.spacer) {
                    const spacer = content.spacer
                    return (
                      <div
                        key={index}
                        className={cn(spacer.spacing, spacer.bgColor, spacer.width)}
                      />
                    )
                  }

                  if (contentType === 'accordion' && content.accordion) {
                    return (
                      <AccordionClient
                        key={index}
                        accordion={content.accordion}
                        textColor={getBestContrastTextColor(sectionBackgroundColor)}
                      />
                    )
                  }

                  if (contentType === 'caseStudySlider' && content.caseStudySlider) {
                    return (
                      <CaseStudySliderClient
                        key={index}
                        caseStudySlider={content.caseStudySlider}
                      />
                    )
                  }

                  if (contentType === 'imageTextSplit' && content.imageTextSplit) {
                    return (
                      <ImageTextSplitBlock
                        key={index}
                        blockType="imageTextSplit"
                        {...content.imageTextSplit}
                      />
                    )
                  }

                  if (contentType === 'divider' && content.divider) {
                    const { color, thickness, width, alignment } = content.divider
                    // Map legacy 'center' value (old DB data) to 'mx-auto'
                    const resolvedAlignment = alignment === 'center' ? 'mx-auto' : alignment
                    return (
                      <div className="py-4 w-full" key={index}>
                        <hr
                          className={cn(
                            thickness,
                            width,
                            resolvedAlignment,
                            color ? `border-${color}` : 'border-slate-300',
                          )}
                        />
                      </div>
                    )
                  }

                  if (contentType === 'customJobAction' && content.customJobAction) {
                    const {
                      link,
                      paddingX,
                      paddingY,
                      rounded,
                      borderWidth,
                      borderColor,
                      bgColor,
                      textColor,
                      nestedBadge,
                      fontWeight,
                      fontStyle,
                      textSize,
                      textTransform,
                    } = content.customJobAction

                    const nestedBg = nestedBadge?.bgColor || 'bg-slate-100'
                    const nestedText = nestedBadge?.textColor ? `text-${nestedBadge.textColor}` : 'text-slate-900'
                    const nestedRounded = nestedBadge?.rounded || 'rounded-full'

                    const resolvedFontWeight = fontWeight || 'font-semibold'
                    const resolvedFontStyle = fontStyle || 'not-italic'
                    const resolvedTextSize = textSize || 'text-base'
                    const resolvedTextTransform = textTransform || 'normal-case'

                    return (
                      <div className="py-2 w-full" key={index}>
                        <CMSLink
                          {...link}
                          label={null}
                          className={cn(
                            'flex items-center justify-between transition-all duration-300 w-full text-left',
                            paddingX,
                            paddingY,
                            rounded,
                            borderWidth,
                            borderColor && `border-${borderColor}`,
                            bgColor,
                            textColor && `text-${textColor}`,
                          )}
                        >
                          <span
                            className={cn(
                              resolvedFontWeight,
                              resolvedFontStyle,
                              resolvedTextSize,
                              resolvedTextTransform,
                            )}
                          >
                            {link?.label}
                          </span>
                          
                          {nestedBadge && (
                            <div
                              className={cn(
                                'flex items-center gap-2 py-1.5 px-4 transition-all duration-300',
                                nestedBg,
                                nestedText,
                                nestedRounded,
                              )}
                            >
                              {nestedBadge.image && typeof nestedBadge.image === 'object' && (
                                <div className="relative w-5 h-5 overflow-hidden flex-shrink-0">
                                  <Media
                                    resource={nestedBadge.image}
                                    imgClassName="object-contain w-full h-full"
                                    fill
                                  />
                                </div>
                              )}
                              <span className="text-sm font-medium whitespace-nowrap">
                                {nestedBadge.text}
                              </span>
                            </div>
                          )}
                        </CMSLink>
                      </div>
                    )
                  }

                  if (contentType === 'customButton' && content.customButton) {
                    const {
                      link,
                      paddingX,
                      paddingY,
                      rounded,
                      borderWidth,
                      borderColor,
                      bgColor,
                      textColor,
                      alignment,
                    } = content.customButton
                    return (
                      <div
                        className={cn(
                          'w-full flex py-2',
                          alignment === 'center' && 'justify-center',
                          alignment === 'right' && 'justify-end',
                          alignment === 'left' && 'justify-start',
                        )}
                        key={index}
                      >
                        <CMSLink
                          {...link}
                          className={cn(
                            'inline-flex items-center justify-center transition-all duration-300',
                            paddingX,
                            paddingY,
                            rounded,
                            borderWidth,
                            borderColor && `border-${borderColor}`,
                            bgColor,
                            textColor && `text-${textColor}`,
                          )}
                        />
                      </div>
                    )
                  }

                  if (contentType === 'solutionsAccordion' && content.solutionsAccordion) {
                    const {
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
                    } = content.solutionsAccordion as any
                    return (
                      <AccordionPanel
                        key={index}
                        leftPanel={leftPanel}
                        accordionItems={accordionItems}
                        rightBgColor={rightBgColor}
                        sectionBgColor={sectionBgColor}
                        scrollAnimation={scrollAnimation}
                        paddingMode={paddingMode}
                        paddingXDesktop={paddingXDesktop}
                        paddingXDesktopCustom={paddingXDesktopCustom}
                        paddingXMobile={paddingXMobile}
                        paddingXMobileCustom={paddingXMobileCustom}
                        columnGap={columnGap}
                        columnGapCustom={columnGapCustom}
                      />
                    )
                  }

                  if (contentType === 'centeredContent' && (content as any).centeredContent) {
                    return (
                      <CenteredContentComponent
                        key={index}
                        {...(content as any).centeredContent}
                      />
                    )
                  }

                  if (contentType === 'clickExpand' && (content as any).clickExpand) {
                    return (
                      <ClickExpandBlock
                        key={index}
                        {...(content as any).clickExpand}
                      />
                    )
                  }

                  if (contentType === 'gridCol' && (content as any).gridCol) {
                    return (
                      <GridColBlock
                        key={index}
                        {...(content as any).gridCol}
                      />
                    )
                  }

                  if (contentType === 'animatedIconsGrid' && (content as any).animatedIconsGrid) {
                    return (
                      <AnimatedIconsGridBlock
                        key={index}
                        {...(content as any).animatedIconsGrid}
                      />
                    )
                  }

                  if (contentType === 'featureCards' && (content as any).featureCards) {
                    return (
                      <FeatureCardsBlock
                        key={index}
                        {...(content as any).featureCards}
                      />
                    )
                  }

                  if (contentType === 'verticalCTAv2' && (content as any).verticalCTAv2) {
                    return (
                      <VerticalCTAv2Component
                        key={index}
                        {...(content as any).verticalCTAv2}
                      />
                    )
                  }

                  if (contentType === 'splitText' && (content as any).splitText) {
                    return (
                      <SplitTextBlock
                        key={index}
                        {...(content as any).splitText}
                      />
                    )
                  }

                  if (contentType === 'imageSlider' && (content as any).imageSlider) {
                    return (
                      <ImageSliderBlock
                        key={index}
                        {...(content as any).imageSlider}
                      />
                    )
                  }

                  if (contentType === 'blogPostUpdated' && (content as any).blogPostUpdated) {
                    return (
                      <BlogPostUpdatedBlock
                        key={index}
                        {...(content as any).blogPostUpdated}
                      />
                    )
                  }

                  if (contentType === 'readyToGrow' && (content as any).readyToGrow) {
                    return (
                      <ReadyToGrowBlock
                        key={index}
                        {...(content as any).readyToGrow}
                      />
                    )
                  }

                  return (
                    Array.isArray(links) &&
                    links.length > 0 && (
                      <div
                        className={cn(
                          'flex gap-4',
                          linkAlignment === 'center' && 'justify-center',
                          linkAlignment === 'right' && 'justify-end',
                          linkAlignment === 'left' && 'justify-start',
                        )}
                        key={index}
                      >
                        {links.map(({ link, buttonClasses, size }, i) => {
                          return (
                            <div key={i} className="flex">
                              <CMSLink
                                size={size ? size : 'lg'}
                                {...link}
                                className={cn(
                                  'rounded-xl bg-transparent border-slate-950',
                                  buttonClasses,
                                )}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )
                  )
                })}
                </div>
              </React.Fragment>
            )
          })}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
