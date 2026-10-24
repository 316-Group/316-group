'use client'
import React, { useEffect, useCallback } from 'react'
import { useFormFields, useDocumentInfo } from '@payloadcms/ui'

export const WebinarStatusField: React.FC<any> = () => {
  const endDate = useFormFields(([fields]) => fields?.['schedule.endDate']?.value)
  const startDate = useFormFields(([fields]) => fields?.['schedule.startDate']?.value)
  const formStatus = useFormFields(([fields]) => fields?._status?.value)
  const docInfo = useDocumentInfo()

  const isPublished = formStatus === 'published' || Boolean(docInfo?.hasPublishedDoc)
  const isConcluded = endDate ? new Date(endDate as string) < new Date() : false
  const isUpcoming = startDate ? new Date(startDate as string) > new Date() : false

  // Helper to find and click a tab by name, and sync with live preview iframe
  const switchToTab = useCallback((tabName: 'recap' | 'active') => {
    if (typeof document === 'undefined') return
    const buttons = document.querySelectorAll('button')
    for (const btn of Array.from(buttons)) {
      const text = btn.textContent || ''
      if (tabName === 'recap' && text.includes('End Webinar Recap')) {
        btn.click()
        break
      } else if (tabName === 'active' && text.includes('Template & Content')) {
        btn.click()
        break
      }
    }

    // Notify any live preview iframes of tab selection
    const iframes = document.querySelectorAll('iframe')
    iframes.forEach((frame) => {
      try {
        frame.contentWindow?.postMessage(
          {
            type: 'PAYLOAD_TAB_SWITCH',
            mode: tabName,
            collection: 'webinars',
          },
          '*',
        )
      } catch (err) {
        // ignore cross-origin restrictions if any
      }
    })
  }, [])

  // Deep-linking: If URL contains ?tab=recap, automatically click the recap tab
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('tab') === 'recap') {
      const timer = setTimeout(() => {
        switchToTab('recap')
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [switchToTab])

  // Attach click listener to tabs to dispatch preview synchronization whenever the user clicks a tab
  useEffect(() => {
    if (typeof document === 'undefined') return

    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('button')
      if (!target) return
      const text = target.textContent || ''
      let mode: 'recap' | 'active' | null = null

      if (text.includes('End Webinar Recap')) {
        mode = 'recap'
      } else if (text.includes('Template & Content')) {
        mode = 'active'
      }

      if (mode) {
        const iframes = document.querySelectorAll('iframe')
        iframes.forEach((frame) => {
          try {
            frame.contentWindow?.postMessage(
              {
                type: 'PAYLOAD_TAB_SWITCH',
                mode,
                collection: 'webinars',
              },
              '*',
            )
          } catch (err) {
            // cross-origin safe
          }
        })
      }
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => {
      document.removeEventListener('click', handleDocumentClick, true)
    }
  }, [])

  if (!isPublished) {
    return (
      <div
        style={{
          padding: '14px 18px',
          marginBottom: '16px',
          borderRadius: '8px',
          backgroundColor: '#fffbeb',
          border: '1px solid #fde68a',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '13px',
              color: '#b45309',
            }}
          >
            Operational Status: Pending (Unpublished)
          </span>
          <span
            style={{
              backgroundColor: '#f59e0b',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Pending
          </span>
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#92400e', lineHeight: 1.5 }}>
          This webinar has not been published yet. To publish, ensure Title, Start Date, and End Date are set.
        </p>
      </div>
    )
  }

  if (isConcluded) {
    return (
      <div
        style={{
          padding: '14px 18px',
          marginBottom: '16px',
          borderRadius: '8px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '13px',
              color: '#991b1b',
            }}
          >
            Operational Status: Concluded / Expired
          </span>
          <span
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Ended
          </span>
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#7f1d1d', lineHeight: 1.5 }}>
          This webinar concluded on the specified end date. Configure and publish the <strong>🏁 End Webinar Recap</strong> tab to present the recap layout on the public site and show the &quot;Watch Video ↗&quot; action in past webinar listings.
        </p>
        <button
          type="button"
          onClick={() => switchToTab('recap')}
          style={{
            marginTop: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <span>Switch to End Webinar Recap Tab</span>
          <span>→</span>
        </button>
      </div>
    )
  }

  if (isUpcoming) {
    return (
      <div
        style={{
          padding: '14px 18px',
          marginBottom: '16px',
          borderRadius: '8px',
          backgroundColor: '#eef2ff',
          border: '1px solid #c7d2fe',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: '13px',
              color: '#3730a3',
            }}
          >
            Operational Status: Upcoming Webinar
          </span>
          <span
            style={{
              backgroundColor: '#6366f1',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Upcoming
          </span>
        </div>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4338ca', lineHeight: 1.5 }}>
          This webinar is published and scheduled for a future date. Registration is open.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '14px 18px',
        marginBottom: '16px',
        borderRadius: '8px',
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: '13px',
            color: '#166534',
          }}
        >
          Operational Status: Active Webinar
        </span>
        <span
          style={{
            backgroundColor: '#16a34a',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
          }}
        >
          Active
        </span>
      </div>
    </div>
  )
}

export default WebinarStatusField
