import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

function hasContent(richText?: any): boolean {
  if (!richText || typeof richText !== 'object') return false
  const children = richText?.root?.children
  if (!Array.isArray(children) || children.length === 0) return false
  return children.some((child: any) => {
    if (child.text && child.text.trim()) return true
    if (Array.isArray(child.children) && child.children.length > 0) {
      return child.children.some((c: any) => Boolean(c.text && c.text.trim()))
    }
    return false
  })
}

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  if (!children && !hasContent(richText)) {
    return null
  }

  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {children || (richText && <RichText content={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
