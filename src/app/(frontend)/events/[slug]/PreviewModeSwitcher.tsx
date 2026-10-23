'use client'
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const PreviewModeSwitcher: React.FC<{
  currentMode: 'active' | 'recap'
  isConcluded?: boolean
  isPublished?: boolean
}> = ({ currentMode, isConcluded = false, isPublished = false }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setMode = (mode: 'active' | 'recap') => {
    document.cookie = `event_preview_mode=${mode}; path=/; max-age=86400`
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '')
    params.set('view', mode)
    router.replace(`${pathname}?${params.toString()}`)
    router.refresh()
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-slate-950/95 backdrop-blur-md text-white border-b border-white/10 px-4 py-2 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium text-slate-300">Live Preview:</span>
        <span className="font-semibold text-white">
          {currentMode === 'recap' ? '🏁 End Event Recap' : '📅 Active Event'}
        </span>
        {isPublished && (
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
            Recap Published
          </span>
        )}
        {isConcluded && (
          <span className="bg-amber-500/20 text-amber-300 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
            Event Ended
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
        <button
          type="button"
          onClick={() => setMode('active')}
          className={`px-3 py-1 rounded font-medium transition-all cursor-pointer ${
            currentMode === 'active'
              ? 'bg-[#0256FF] text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          📅 Active Event Template
        </button>
        <button
          type="button"
          onClick={() => setMode('recap')}
          className={`px-3 py-1 rounded font-medium transition-all cursor-pointer ${
            currentMode === 'recap'
              ? 'bg-[#0256FF] text-white shadow-xs'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🏁 End Event Recap (Hero + 5 Sections)
        </button>
      </div>
    </div>
  )
}

export default PreviewModeSwitcher
