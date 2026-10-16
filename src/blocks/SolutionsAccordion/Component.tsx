import React from 'react'
import type { SolutionsAccordionBlock as SolutionsAccordionProps } from '@/payload-types'
import { AccordionPanel } from './AccordionPanel'

export const SolutionsAccordionBlock: React.FC<SolutionsAccordionProps> = ({
  leftPanel,
  accordionItems,
  rightBgColor,
  sectionBgColor,
  scrollAnimation,
}) => {
  return (
    <AccordionPanel
      leftPanel={leftPanel}
      accordionItems={accordionItems}
      rightBgColor={rightBgColor}
      sectionBgColor={sectionBgColor}
      scrollAnimation={scrollAnimation}
    />
  )
}
