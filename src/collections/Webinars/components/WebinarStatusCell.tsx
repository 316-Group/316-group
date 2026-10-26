'use client'
import React from 'react'

export const WebinarStatusCell: React.FC<any> = ({ rowData }) => {
  if (!rowData) return null

  const isPublished = rowData?._status === 'published'
  const startDate = rowData?.schedule?.startDate
  const endDate = rowData?.schedule?.endDate
  const isConcluded = endDate ? new Date(endDate) < new Date() : false
  const isUpcoming = startDate ? new Date(startDate) > new Date() : false
  const hasPublishedRecap = Boolean(rowData?.recapConfig?.isPublished)

  if (!isPublished) {
    return (
      <span
        style={{
          backgroundColor: '#fef3c7',
          color: '#b45309',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Pending
      </span>
    )
  }

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
        {rowData?.id && (
          <a
            href={`/admin/collections/webinars/${rowData.id}?tab=recap`}
            onClick={(e) => {
              e.stopPropagation()
            }}
            style={{
              color: '#0256FF',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {hasPublishedRecap ? 'Recap Configured' : 'Configure Recap'}
          </a>
        )}
      </div>
    )
  }

  if (isUpcoming) {
    return (
      <span
        style={{
          backgroundColor: '#e0e7ff',
          color: '#4338ca',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        Upcoming
      </span>
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

export default WebinarStatusCell
