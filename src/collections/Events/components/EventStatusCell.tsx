'use client'
import React from 'react'

export const EventStatusCell: React.FC<any> = ({ rowData }) => {
  const endDate = rowData?.schedule?.endDate
  const isConcluded = endDate ? new Date(endDate) < new Date() : false
  const hasPublishedRecap = Boolean(rowData?.recapConfig?.isPublished)

  if (isConcluded) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <span
          style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Ended
        </span>
        <a
          href={`/admin/collections/events/${rowData?.id}`}
          style={{
            color: '#0256FF',
            fontSize: '12px',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          {hasPublishedRecap ? 'Recap Configured' : 'Configure End'}
        </a>
      </div>
    )
  }

  return (
    <span
      style={{
        backgroundColor: '#dcfce7',
        color: '#16a34a',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      Active
    </span>
  )
}

export default EventStatusCell
