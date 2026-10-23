import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, cookies } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { defaultEventTemplateLayout, defaultEventRecapLayout } from '@/collections/Events'
import PageClient from './page.client'
import { PreviewModeSwitcher } from './PreviewModeSwitcher'
import type { Event } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return events.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function EventPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug = '' } = await paramsPromise
  const searchParams = searchParamsPromise ? await searchParamsPromise : {}
  const url = '/events/' + slug

  const { isEnabled: isDraft } = await draftMode()

  let event: Event | null = await queryEventBySlug({ slug })

  if (!event) {
    if (isDraft || slug === 'preview' || !slug) {
      event = {
        id: 'preview',
        title: 'Event Preview',
        slug: slug || 'preview',
        layout: defaultEventTemplateLayout as any,
        recapConfig: {
          isPublished: false,
          recapLayout: defaultEventRecapLayout as any,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as any
    }
  }

  if (!event) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = event
  const recapConfig = (event as any)?.recapConfig

  let blocksToRender = layout

  const cookieStore = await cookies()
  const cookieMode = cookieStore.get('event_preview_mode')?.value

  // Check if event concluded based on operational schedule endDate
  const isConcluded = event?.schedule?.endDate
    ? new Date(event.schedule.endDate) < new Date()
    : false

  // Determine recap layout (custom saved recap blocks or fallback to default template in draft mode)
  const configuredRecapLayout =
    Array.isArray(recapConfig?.recapLayout) && recapConfig.recapLayout.length > 0
      ? recapConfig.recapLayout
      : defaultEventRecapLayout

  // In production: render recap if recapConfig.isPublished === true
  // In draft/preview:
  // - explicit recap requested via searchParams (?view=recap, ?recap=true, ?tab=recap) or cookieMode === 'recap'
  // - explicit active requested via searchParams (?view=active) or cookieMode === 'active'
  const isExplicitRecap =
    searchParams?.view === 'recap' ||
    searchParams?.recap === 'true' ||
    searchParams?.tab === 'recap' ||
    cookieMode === 'recap'

  const isExplicitActive =
    searchParams?.view === 'active' ||
    searchParams?.tab === 'active' ||
    cookieMode === 'active'

  const shouldRenderRecap = isDraft
    ? isExplicitActive
      ? false
      : isExplicitRecap || Boolean(recapConfig?.isPublished) || isConcluded
    : Boolean(recapConfig?.isPublished)

  if (shouldRenderRecap && Array.isArray(configuredRecapLayout) && configuredRecapLayout.length > 0) {
    const heroBlock = Array.isArray(layout)
      ? layout.find((b: any) => b?.blockType === 'eventHero')
      : (defaultEventTemplateLayout as any)[0]

    blocksToRender = [heroBlock, ...configuredRecapLayout].filter(Boolean) as any
  }

  return (
    <article>
      {isDraft && (
        <PreviewModeSwitcher
          currentMode={shouldRenderRecap ? 'recap' : 'active'}
          isConcluded={isConcluded}
          isPublished={Boolean(recapConfig?.isPublished)}
        />
      )}
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {blocksToRender && <RenderBlocks blocks={blocksToRender as any} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const event = await queryEventBySlug({ slug })

  if (!event) {
    return {
      title: 'Event Preview | 316 Group',
    }
  }

  return generateMeta({ doc: event as any })
}

const queryEventBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
