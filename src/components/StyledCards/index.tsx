'use client'

import { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import React from 'react'
import { Media } from '../Media'

interface StyledCardsProps {
  cards?:
    | {
        image: string | MediaType
        title: string
        description: string
        id?: string | null
      }[]
    | null
  imageClasses?: string[] | null
  gapClasses?: string | null
  titleClasses?: string[] | null
  descriptionClasses?: string[] | null
  shadowClasses?: string[] | null
  cardBgColor?: string | null
  cardHoverBgColor?: string | null
  borderClasses?: string[] | null
  cardsPerRow?: string | null
  marginSpace?: string | null
  alignContent?: string | null
  alignCardContent?: string | null
  /** Border radius applied to each card. Defaults to 'rounded-xl'. */
  cardRounded?: string | null
  /** Override description text alignment independently of alignCardContent. */
  descriptionAlign?: string | null
}

export const StyledCards: React.FC<StyledCardsProps> = ({
  cards,
  imageClasses,
  gapClasses = 'gap-6',
  titleClasses,
  descriptionClasses,
  shadowClasses,
  cardBgColor = 'bg-white',
  cardHoverBgColor,
  borderClasses,
  cardsPerRow = '3',
  marginSpace = 'my-0',
  alignContent = 'left',
  alignCardContent = 'left',
  cardRounded = 'rounded-xl',
  descriptionAlign = 'inherit',
}) => {
  const isCentered = alignContent === 'center'
  const isCardCentered = alignCardContent === 'center'

  // Resolve the description text alignment class.
  // 'inherit' means follow the card's alignCardContent setting.
  const resolvedDescAlign =
    descriptionAlign === 'center'
      ? 'text-center w-full'
      : descriptionAlign === 'left'
        ? 'text-left'
        : isCardCentered
          ? 'text-center w-full'
          : ''

  return (
    <div
      className={cn(
        isCentered
          ? 'flex flex-wrap justify-center'
          : cn(
              'grid grid-cols-1',
              cardsPerRow === '2' && 'md:grid-cols-2',
              cardsPerRow === '3' && 'md:grid-cols-2 lg:grid-cols-3',
              cardsPerRow === '4' && 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
            ),
        gapClasses,
        marginSpace,
      )}
    >
      {cards?.map((card, i) => (
        <div
          key={i}
          className={cn(
            'p-6 transition-all duration-300 w-full',
            cardRounded,
            isCentered && cardsPerRow === '2' && 'md:w-[calc(50%-12px)]',
            isCentered && cardsPerRow === '3' && 'md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]',
            isCentered &&
              cardsPerRow === '4' &&
              'md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]',
            cardBgColor,
            cardHoverBgColor && `hover:${cardHoverBgColor}`,
            shadowClasses,
            borderClasses,
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-4 w-full',
              isCardCentered ? 'items-center text-center' : 'items-start',
            )}
          >
            <div className={cn('relative overflow-hidden rounded-lg w-full', imageClasses)}>
              <Media resource={card.image} className="h-full w-full object-cover" />
            </div>
            <div
              className={cn(
                'flex flex-col gap-2 w-full',
                isCardCentered ? 'items-center text-center' : 'items-start',
              )}
            >
              <h3 className={cn(titleClasses, isCardCentered && 'text-center w-full')}>
                {card.title}
              </h3>
              {/* Description uses its own alignment, independent of title/card alignment */}
              <p className={cn(descriptionClasses, resolvedDescAlign)}>{card.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
