import React from 'react'
import { WhoWeAreClient, type WhoWeAreProps } from './WhoWeAreClient'

export const WhoWeAreComponent: React.FC<WhoWeAreProps> = (props) => {
  return <WhoWeAreClient {...props} />
}

export const WhoWeAreBlock: React.FC<WhoWeAreProps> = (props) => {
  return <WhoWeAreComponent {...props} />
}

export default WhoWeAreComponent
