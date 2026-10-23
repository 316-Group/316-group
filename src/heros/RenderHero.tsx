import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SpecialHero } from './SpecialHero'
import { ProductHero } from './ProductHero'
import { ProductHero2 } from './ProductHero2'
import { ProductHeroAbout } from './ProductHeroAbout'
import { ServicesHero } from './ServicesHero'
import { NoHero } from './NoHero'
import { SwiperHero } from './SwiperHero'
import { GroupHeroV2Wrapper } from './GroupHeroV2/GroupHeroV2Wrapper'
import { EventHero } from './EventHero'
// import { SwiperHero } from './SwiperHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  specialHero: SpecialHero,
  productHero: ProductHero,
  productHero2: ProductHero2,
  productHeroAbout: ProductHeroAbout,
  servicesHero: ServicesHero,
  swiperHero: SwiperHero,
  groupHeroV2: GroupHeroV2Wrapper,
  eventHero: EventHero,
  noHero: NoHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
