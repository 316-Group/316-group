'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, useContext, useState } from 'react'

import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
  /** True when the current page hero wants the header to float above it */
  heroOverlay: boolean
  setHeroOverlay: (v: boolean) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
  heroOverlay: false,
  setHeroOverlay: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )
  const [heroOverlay, setHeroOverlay] = useState(false)

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme, heroOverlay, setHeroOverlay }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)
