import React from 'react'
import { ImageTextSplit2Client, type ImageTextSplit2Props } from './ImageTextSplit2Client'

export const ImageTextSplit2Component: React.FC<ImageTextSplit2Props> = (props) => {
  return <ImageTextSplit2Client {...props} />
}

export const ImageTextSplit2Block: React.FC<ImageTextSplit2Props> = (props) => {
  return <ImageTextSplit2Component {...props} />
}

export default ImageTextSplit2Component

