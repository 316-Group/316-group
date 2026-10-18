import React from 'react'
import {
  VerticalCTAv2Client,
  type VerticalCTAv2Props,
} from './VerticalCTAv2Client'

export const VerticalCTAv2Component: React.FC<VerticalCTAv2Props> = (props) => {
  return <VerticalCTAv2Client {...props} />
}

export const VerticalCTAv2Block: React.FC<VerticalCTAv2Props> = (props) => {
  return <VerticalCTAv2Component {...props} />
}
