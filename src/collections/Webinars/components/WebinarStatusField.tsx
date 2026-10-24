'use client'
import React from 'react'
import { useFormFields, useDocumentInfo } from '@payloadcms/ui'

export const WebinarStatusField: React.FC<any> = () => {
  const endDate = useFormFields(([fields]) => fields?.['schedule.endDate']?.value)
  const startDate = useFormFields(([fields]) => fields?.['schedule.startDate']?.value)
  const formStatus = useFormFields(([fields]) => fields?._status?.value)
  const docInfo = useDocumentInfo()

  const isPublished = formStatus === 'published' || Boolean(docInfo?.hasPublishedDoc)
  const isConcluded = endDate ? new Date(endDate as string) < new Date() : false
  const isUpcoming = startDate ? new Date(startDate as string) > new Date() : false

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
