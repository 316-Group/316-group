/**
 * GroupHeroV2Nav – self-contained nav bar rendered INSIDE the hero card.
 *
 * This is a React Server Component so it can fetch the header global
 * directly without any client-side JS. It renders as part of normal
 * document flow (no position:fixed), which means it:
 *   - Scrolls away with the hero as the user scrolls down ✓
 *   - Never causes a double-header flash (no hydration mismatch) ✓
 *   - Sits inside the rounded hero card, matching the mockup ✓
 */
import React from 'react'
import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Header } from '@/payload-types'
import { MegaMenuHero } from './MegaMenuHero'

export async function GroupHeroV2Nav() {
  const header: Header = await getCachedGlobal('header', 1)()

  return (
    // Same container as the hero content so the pill's edges line up with
    // the heading on the left and the right-column text on the right.
    <div className="container max-w-screen-2xl pt-6 md:pt-8">
      <div className="flex justify-between items-center gap-4 rounded-full bg-white/10 border border-white/15 backdrop-blur-md pl-4 pr-2 md:pl-6 md:pr-3 py-2">
        {/* Logo — white "316.group" text variant */}
        <Link href="/" aria-label="Home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-white.svg"
            alt="316 Group Logo"
            width={130}
            height={44}
            fetchPriority="high"
            className="h-9 md:h-10 w-auto"
          />
        </Link>

        {/* Navigation */}
        <MegaMenuHero header={header} />
      </div>
    </div>
  )
}
