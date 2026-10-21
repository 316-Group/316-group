import React from 'react'
import {
  NumberedGridClient,
  type NumberedGridProps,
} from './NumberedGridClient'

export const NumberedGridComponent: React.FC<NumberedGridProps> = (props) => {
  return <NumberedGridClient {...props} />
}

export const NumberedGridBlock: React.FC<NumberedGridProps> = (props) => {
  return <NumberedGridComponent {...props} />
}

export default NumberedGridComponent
