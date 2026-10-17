'use client'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{
    headingGroup?: {
      heading?: string
    }
    kickerGroup?: {
      text?: string
    }
  }>()

  const heading =
    data?.headingGroup?.heading?.replace(/<[^>]+>/g, '') ||
    data?.kickerGroup?.text?.replace(/<[^>]+>/g, '') ||
    `Card ${String(rowNumber).padStart(2, '0')}`

  return <div>{heading}</div>
}
