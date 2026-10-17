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
import { Logo } from '@/components/Logo/Logo'
import { MegaMenuHero } from './MegaMenuHero'

export async function GroupHeroV2Nav() {
  const header: Header = await getCachedGlobal('header', 1)()

  return (
    <div className="w-full px-4 md:px-8 pt-6 pb-2">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" aria-label="Home">
          <Logo loading="eager" priority="high" />
        </Link>

        {/* Navigation */}
        <MegaMenuHero header={header} />
      </div>
    </div>
  )
}
