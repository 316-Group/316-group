import React from 'react'
import { ImageSliderClient, type ImageSliderProps } from './ImageSliderClient'

export const ImageSliderBlock: React.FC<ImageSliderProps> = (props) => {
  return <ImageSliderClient {...props} />
}
