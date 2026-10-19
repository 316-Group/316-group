import React from 'react'
import type { SolutionsAccordionBlock as SolutionsAccordionProps } from '@/payload-types'
import { AccordionPanel } from './AccordionPanel'

export const SolutionsAccordionBlock: React.FC<SolutionsAccordionProps> = (props) => {
  return <AccordionPanel {...(props as any)} />
}
