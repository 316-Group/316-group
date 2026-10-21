import React from 'react'
import {
  FeatureCardsV2Client,
  type FeatureCardsV2Props,
} from './FeatureCardsV2Client'

export const FeatureCardsV2Component: React.FC<FeatureCardsV2Props> = (props) => {
  return <FeatureCardsV2Client {...props} />
}

export const FeatureCardsV2Block: React.FC<FeatureCardsV2Props> = (props) => {
  return <FeatureCardsV2Component {...props} />
}

export default FeatureCardsV2Component
