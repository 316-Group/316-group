import React from 'react'
import { MissionVisionClient, type MissionVisionProps } from './MissionVisionClient'

export const MissionVisionComponent: React.FC<MissionVisionProps> = (props) => {
  return <MissionVisionClient {...props} />
}

export const MissionVisionBlock: React.FC<MissionVisionProps> = (props) => {
  return <MissionVisionComponent {...props} />
}

export default MissionVisionComponent
