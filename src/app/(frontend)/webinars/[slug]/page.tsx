import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { defaultWebinarTemplateLayout } from '@/collections/Webinars'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const webinars = await payload.find({
    collection: 'webinars',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return webinars.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export default async function WebinarPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug = '' } = await paramsPromise
  const searchParams = searchParamsPromise ? await searchParamsPromise : {}
  const url = '/webinars/' + slug

  const { isEnabled: isDraft } = await draftMode()

  let webinar: any = await queryWebinarBySlug({ slug })

  if (!webinar) {
    if (isDraft || slug === 'preview' || !slug) {
      webinar = {
        id: 'preview',
        title: 'Webinar Preview',
        slug: slug || 'preview',
        layout: defaultWebinarTemplateLayout as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
  }

  if (!webinar) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = webinar
  const blocksToRender = layout || defaultWebinarTemplateLayout

  return (
    <article>
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {blocksToRender && <RenderBlocks blocks={blocksToRender as any} />}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const webinar = await queryWebinarBySlug({ slug })

  if (!webinar) {
    return {
      title: 'Webinar Preview | 316 Group',
    }
  }

  return generateMeta({ doc: webinar as any })
}

const queryWebinarBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'webinars',
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
