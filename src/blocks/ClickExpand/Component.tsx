import React from 'react'
import { ClickExpandClient, type ClickExpandProps } from './ClickExpandClient'

export const ClickExpandComponent: React.FC<ClickExpandProps> = (props) => {
  return <ClickExpandClient {...props} />
}

export const ClickExpandBlock: React.FC<ClickExpandProps> = (props) => {
  return <ClickExpandComponent {...props} />
}
