'use client'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<{
    text?: string
  }>()

  const text = data?.text?.replace(/<[^>]+>/g, '') || `Item ${String(rowNumber).padStart(2, '0')}`

  return <div>{text}</div>
}
