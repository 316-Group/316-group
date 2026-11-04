'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useTheme } from '@/providers/Theme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { MegaMenu } from './menu/MegaMenu'
import { LogoDark } from '@/components/Logo/LogoDark'
import { cn } from '@/utilities/cn'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme, heroOverlay, setHeroOverlay } = useHeaderTheme()
  const { theme: appTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  if (heroOverlay || pathname === '/home-2') {
    /*
     * ── Hero Overlay Mode (GroupHeroV2) ──────────────────────────────────────
     * The GroupHeroV2 hero renders its own self-contained nav bar INSIDE the
     * hero card (normal document flow, scrolls away naturally).
     * The layout-level header must be invisible to prevent a double-header.
     */
    return null
  }

  const effectiveTheme = theme || appTheme || 'light'

  return (
    /* ── Default header (all other pages) ─────────────────────────────────── */
    <header
      className="w-full z-20 container max-w-screen-2xl relative"
      {...(effectiveTheme ? { 'data-theme': effectiveTheme } : {})}
    >
      <div className="pt-6 pb-5 border-border flex justify-between items-center">
        {effectiveTheme === 'dark' ? (
          <Link href="/">
            <LogoDark loading="eager" priority="high" />
          </Link>
        ) : (
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
        )}
        <MegaMenu className="dark:text-gray-100" header={header} theme={effectiveTheme} />
      </div>
    </header>
  )
}
