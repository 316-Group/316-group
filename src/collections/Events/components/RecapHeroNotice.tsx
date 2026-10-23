'use client'
import React from 'react'

export const RecapHeroNotice: React.FC = () => {
  return (
    <div
      style={{
        padding: '18px 22px',
        marginBottom: '20px',
        backgroundColor: '#f0f5ff',
        border: '1.5px solid #bfdbfe',
        borderRadius: '10px',
        color: '#1e3a8a',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          fontSize: '15px',
          marginBottom: '6px',
          color: '#1e40af',
        }}
      >
        <span>📌</span>
        <span>Top of Page: Preserved Event Hero</span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '13.5px',
          lineHeight: '1.55',
          color: '#1e3a8a',
        }}
      >
        The End Event Recap page automatically retains and displays this event's original{' '}
        <strong>Event Hero</strong> (subheading, main heading, description, date/location, and media)
        from the <em>Template &amp; Content</em> tab at the very top.
      </p>
      <p
        style={{
          margin: '8px 0 0 0',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#2563eb',
        }}
      >
        Directly below this Hero, the recap renders the <strong>5 sequential recap template sections</strong>{' '}
        (Narrative Articles &amp; 2-Column Feature Showcase). You can customize each section below:
      </p>
    </div>
  )
}

export default RecapHeroNotice
