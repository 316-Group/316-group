import React from 'react'
import {
  AnimatedIconsGridClient,
  type AnimatedIconsGridProps,
} from './AnimatedIconsGridClient'

export const AnimatedIconsGridComponent: React.FC<AnimatedIconsGridProps> = (props) => {
  return <AnimatedIconsGridClient {...props} />
}

export const AnimatedIconsGridBlock: React.FC<AnimatedIconsGridProps> = (props) => {
  return <AnimatedIconsGridComponent {...props} />
}
