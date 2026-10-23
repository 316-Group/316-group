'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'

export const EventStatusField: React.FC<any> = () => {
  const endDate = useFormFields(([fields]) => fields?.['schedule.endDate']?.value)
  const isConcluded = endDate ? new Date(endDate as string) < new Date() : false

  return (
    <div
      style={{
        padding: '14px 18px',
        marginBottom: '16px',
        borderRadius: '8px',
        backgroundColor: isConcluded ? '#fef2f2' : '#f0fdf4',
        border: `1px solid ${isConcluded ? '#fecaca' : '#bbf7d0'}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontWeight: 600,
            fontSize: '13px',
            color: isConcluded ? '#991b1b' : '#166534',
          }}
        >
          Operational Status: {isConcluded ? 'Concluded / Expired' : 'Active'}
        </span>
        {isConcluded && (
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
        )}
      </div>
      {isConcluded && (
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#7f1d1d', lineHeight: 1.5 }}>
          This event concluded on the specified end date. Meeting requests are blocked. Configure and publish the <strong>🏁 End Event Recap</strong> tab to present the recap layout on the public site and show the &quot;View recap →&quot; button in past event listings.
        </p>
      )}
    </div>
  )
}

export default EventStatusField
