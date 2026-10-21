import React from 'react'
import { CenteredButtonClient, type CenteredButtonProps } from './CenteredButtonClient'

export const CenteredButtonComponent: React.FC<CenteredButtonProps> = (props) => {
  return <CenteredButtonClient {...props} />
}

export const CenteredButtonBlock: React.FC<CenteredButtonProps> = (props) => {
  return <CenteredButtonComponent {...props} />
}

export default CenteredButtonComponent
