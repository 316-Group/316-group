import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexical, parseInlineCustomStyles } from './serialize'

type Props = {
  className?: string
  content: Record<string, any> | string
  enableGutter?: boolean
  enableProse?: boolean
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert ': enableProse,
        },
        className,
      )}
    >
      {typeof content === 'string'
        ? parseInlineCustomStyles(content, 'rt-string')
        : content &&
          !Array.isArray(content) &&
          typeof content === 'object' &&
          'root' in content &&
          serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText

