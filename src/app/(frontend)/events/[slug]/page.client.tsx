'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { getClientSideURL } from '@/utilities/getURL'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Event } from '@/payload-types'
import React, { useEffect } from 'react'

export const EventLivePreview: React.FC<{ initialEvent: Event }> = ({ initialEvent }) => {
  const { setHeaderTheme } = useHeaderTheme()

  const { data: liveEvent } = useLivePreview<Event>({
    initialData: initialEvent,
    serverURL: getClientSideURL(),
    depth: 1,
  })

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  const event = liveEvent || initialEvent
  const layout = event?.layout

  return (
    <article>
      {layout && <RenderBlocks blocks={layout as any} />}
    </article>
  )
}

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient

