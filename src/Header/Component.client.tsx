'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
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
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setHeroOverlay(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  if (heroOverlay) {
    /*
     * ── Hero Overlay Mode (GroupHeroV2) ──────────────────────────────────────
     * Use position:fixed so this header floats OVER the hero without consuming
     * any document-flow space. The hero component itself provides top padding
     * to push its content clear of this bar.
     */
    return (
      <header className="fixed top-0 left-0 right-0 z-50 px-[5px] pt-4 pointer-events-none">
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-full px-5 py-3 pointer-events-auto">
          {theme && theme === 'light' ? (
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          ) : (
            <Link href="/">
              <LogoDark loading="eager" priority="high" />
            </Link>
          )}
          <MegaMenu
            className="dark:text-gray-100"
            header={header}
            theme={theme}
            pillMode
          />
        </div>
      </header>
    )
  }

  return (
    /* ── Default header (all other pages) ─────────────────────────────────── */
    <header
      className="w-full z-20 container max-w-screen-2xl relative"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="pt-6 pb-5 border-border flex justify-between items-center">
        {theme && theme === 'light' ? (
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
        ) : (
          <Link href="/">
            <LogoDark loading="eager" priority="high" />
          </Link>
        )}
        <MegaMenu className="dark:text-gray-100" header={header} theme={theme} />
      </div>
    </header>
  )
}
