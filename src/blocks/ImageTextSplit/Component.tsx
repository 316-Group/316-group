import React from 'react'
import { ImageTextSplitClient, type ImageTextSplitProps } from './ImageTextSplitClient'

export const ImageTextSplitComponent: React.FC<ImageTextSplitProps> = (props) => {
  return <ImageTextSplitClient {...props} />
}

export const ImageTextSplitBlock: React.FC<ImageTextSplitProps> = (props) => {
  return <ImageTextSplitComponent {...props} />
}

export default ImageTextSplitComponent
