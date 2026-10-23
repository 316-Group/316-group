import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, cookies } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { defaultWebinarTemplateLayout, defaultWebinarRecapLayout } from '@/collections/Webinars'
import PageClient from './page.client'
import { WebinarPreviewModeSwitcher } from './PreviewModeSwitcher'

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
        recapConfig: {
          isPublished: false,
          recapLayout: defaultWebinarRecapLayout as any,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
  }

  if (!webinar) {
    return <PayloadRedirects url={url} />
  }

  const { layout } = webinar
  const recapConfig = (webinar as any)?.recapConfig

  const cookieStore = await cookies()
  const cookieMode = cookieStore.get('webinar_preview_mode')?.value

  // Check if webinar concluded based on operational schedule endDate
  const isConcluded = webinar?.schedule?.endDate
    ? new Date(webinar.schedule.endDate) < new Date()
    : false

  const configuredRecapLayout =
    Array.isArray(recapConfig?.recapLayout) && recapConfig.recapLayout.length > 0
      ? recapConfig.recapLayout
      : defaultWebinarRecapLayout

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

  let blocksToRender = layout || defaultWebinarTemplateLayout

  if (
    shouldRenderRecap &&
    Array.isArray(configuredRecapLayout) &&
    configuredRecapLayout.length > 0
  ) {
    const heroBlock = Array.isArray(layout)
      ? layout.find((b: any) => b?.blockType === 'webinarHero')
      : (defaultWebinarTemplateLayout as any)[0]

    blocksToRender = [heroBlock, ...configuredRecapLayout].filter(Boolean) as any
  }

  return (
    <article>
      {isDraft && (
        <WebinarPreviewModeSwitcher
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
