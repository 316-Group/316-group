import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { defaultEventTemplateLayout } from '@/collections/Events'
import PageClient from './page.client'
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
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as any
    }
  }

  if (!event) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = event

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {layout && <RenderBlocks blocks={layout as any} />}
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
