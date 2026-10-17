/**
 * GroupHeroV2Wrapper — React Server Component
 *
 * Next.js rule: you cannot import a Server Component from a Client Component.
 * The pattern to work around this is to have a Server Component parent that:
 *   1. Does the server-side work (fetching header data here)
 *   2. Renders server children (GroupHeroV2Nav)
 *   3. Passes them as a `nav` prop (ReactNode) into the Client Component
 *
 * This keeps all server-only code (payload config, nodemailer, etc.) entirely
 * out of the client bundle.
 */
import React from 'react'
import type { Page } from '@/payload-types'
import { GroupHeroV2 } from './index'
import { GroupHeroV2Nav } from './GroupHeroV2Nav'

export async function GroupHeroV2Wrapper(props: Page['hero']) {
  return (
    <GroupHeroV2
      {...props}
      nav={<GroupHeroV2Nav />}
    />
  )
}
