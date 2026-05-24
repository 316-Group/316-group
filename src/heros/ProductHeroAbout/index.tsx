'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import type { Page } from '@/payload-types'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

export const ProductHeroAbout: React.FC<Page['hero']> = ({
  links,
  media,
  includeStoreLinks,
  heroGraphic,
  title,
  titleClasses,
  subTitle,
  subTitleClasses,
  mediaMobile,
  descriptionText,
  descriptionClasses,
  heroTitle,
  heroTitleClasses,
  bgColor,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })
  // Render background media
  const renderBackground = () => {
    if (!media || typeof media === 'string') return null
    if (!mediaMobile || typeof mediaMobile === 'string') return null

    const { mimeType: mimeTypeMobile, url: urlMobile } = mediaMobile
    const { mimeType, url } = media

    if (
      mimeType?.startsWith('image/') &&
      mimeTypeMobile?.startsWith('image/') &&
      url &&
      urlMobile
    ) {
      return (
        <React.Fragment>
          <Image
            src={url}
            fill
            alt={media.alt ? media.alt : 'background image'}
            className="absolute hidden md:block inset-0 w-full h-full object-cover object-top z-[-1]"
          />
          <Image
            src={urlMobile}
            fill
            alt={mediaMobile.alt ? mediaMobile.alt : 'background image'}
            className="absolute md:hidden inset-0 w-full h-full object-cover object-top z-[-1]"
          />
        </React.Fragment>
      )
    } else if (mimeType?.startsWith('video/') && url) {
      return (
        <video
          src={url}
          className="absolute inset-0 w-full h-full object-cover z-[-1]"
          autoPlay
          muted
          loop
          playsInline
        />
      )
    }

    console.warn('Unsupported media type:', mimeType)
    return null
  }

  return (
    <div className="text-white" data-theme="dark">
      <div className={cn('relative w-full h-full overflow-hidden z-[-2] pt-16 md:pt-28', bgColor)}>
        {renderBackground()}

        <div className="relative container max-w-screen-2xl flex flex-col items-center justify-center text-center gap-12 overflow-hidden pb-16 md:pb-28">
          <div
            className={cn('top-0 left-0 absolute w-[100%] h-full md:hidden z-[1]', bgColor)}
            style={{ clipPath: 'polygon(0 44%, 100% 0, 100% 100%, 0 100%)' }}
          ></div>
          <div className="w-full max-w-[800px] z-[2] px-3 flex flex-col items-center justify-center text-center">
            {heroTitle && <button className={cn('mx-auto', heroTitleClasses)}>{heroTitle}</button>}
            {title && (
              <h1 dangerouslySetInnerHTML={{ __html: title }} className={cn('text-center mx-auto mt-6', titleClasses)}></h1>
            )}
            {subTitle && (
              <h4
                dangerouslySetInnerHTML={{ __html: subTitle }}
                className={cn('text-center mx-auto mt-4', subTitleClasses)}
              ></h4>
            )}

            {descriptionText && (
              <RichText
                content={descriptionText}
                enableGutter={false}
                enableProse={false}
                className={cn('text-center mx-auto mt-6', descriptionClasses)}
              />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <div key={i} className="flex">
                      <CMSLink
                        size={'sm'}
                        {...link}
                        className={cn('rounded-xl bg-transparent border-slate-950', buttonClasses)}
                      />
                    </div>
                  )
                })}
              </div>
            )}
            {includeStoreLinks && (
              <div className="flex justify-center gap-4 pt-12">
                <Link href={'#'}>
                  <Image
                    src="/assets/applestore.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
                <Link href={'#'}>
                  <Image
                    src="/assets/googleplay.svg"
                    alt="apple store link"
                    height={40}
                    width={120}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="w-full max-w-[1000px] flex justify-center items-center content-center z-[3] px-3 mt-4">
            {heroGraphic && typeof heroGraphic === 'object' && (
              <div className="w-full">
                <Media
                  imgClassName="-z-10 object-fit inset-0 w-full h-full"
                  videoClassName="-z-10 absolute object-fit inset-0 w-full max-h-[100%]"
                  priority={false}
                  loading="lazy"
                  resource={heroGraphic}
                  className="rounded-[3em] overflow-hidden shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
