'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // Real-time synchronization with Payload Admin tab switching
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMessage = (e: MessageEvent) => {
      const data = e.data
      if (data && data.type === 'PAYLOAD_TAB_SWITCH' && (data.mode === 'recap' || data.mode === 'active')) {
        document.cookie = `webinar_preview_mode=${data.mode}; path=/; max-age=86400`
        const currentParams = new URLSearchParams(window.location.search)
        if (currentParams.get('view') !== data.mode) {
          currentParams.set('view', data.mode)
          router.replace(`${window.location.pathname}?${currentParams.toString()}`)
          router.refresh()
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [router])

  return <React.Fragment />
}

export default PageClient

