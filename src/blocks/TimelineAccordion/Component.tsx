import React from 'react'
import {
  TimelineAccordionClient,
  type TimelineAccordionProps,
} from './TimelineAccordionClient'

export const TimelineAccordionComponent: React.FC<TimelineAccordionProps> = (props) => {
  return <TimelineAccordionClient {...props} />
}

export const TimelineAccordionBlock: React.FC<TimelineAccordionProps> = (props) => {
  return <TimelineAccordionComponent {...props} />
}

export default TimelineAccordionComponent
