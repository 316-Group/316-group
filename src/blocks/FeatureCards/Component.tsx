import React from 'react'
import {
  FeatureCardsClient,
  type FeatureCardsProps,
} from './FeatureCardsClient'

export const FeatureCardsComponent: React.FC<FeatureCardsProps> = (props) => {
  return <FeatureCardsClient {...props} />
}

export const FeatureCardsBlock: React.FC<FeatureCardsProps> = (props) => {
  return <FeatureCardsComponent {...props} />
}
