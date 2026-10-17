'use client'
/**
 * MegaMenuHero – the navigation used inside the GroupHeroV2 hero card.
 *
 * Reuses the full MegaMenu component with `pillMode` and `heroOverlay` flags.
 * Because this is rendered inside the hero card (not at layout level), there
 * is no double-header issue — the layout-level Header renders nothing when
 * heroOverlay is active.
 */
import React from 'react'
import { MegaMenu } from '@/Header/menu/MegaMenu'
import type { Header } from '@/payload-types'

interface MegaMenuHeroProps {
  header: Header
}

export function MegaMenuHero({ header }: MegaMenuHeroProps) {
  return (
    <MegaMenu
      className="text-white"
      header={header}
      theme="light"
      pillMode
      heroOverlay
    />
  )
}
