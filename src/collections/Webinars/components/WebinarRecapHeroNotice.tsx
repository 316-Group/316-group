'use client'
import React from 'react'

export const WebinarRecapHeroNotice: React.FC = () => {
  return (
    <div
      style={{
        padding: '18px 22px',
        marginBottom: '20px',
        backgroundColor: '#eff6ff',
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
        <span>Top of Page: Preserved Webinar Hero</span>
      </div>
      <p
        style={{
          margin: 0,
          fontSize: '13.5px',
          lineHeight: '1.55',
          color: '#1e3a8a',
        }}
      >
        The End Webinar Recap page automatically retains and displays this webinar's original{' '}
        <strong>Webinar Hero</strong> (badge, main heading, description, date/time, and action button)
        from the <em>Template &amp; Content</em> tab at the very top of the page.
      </p>
      <p
        style={{
          margin: '8px 0 0 0',
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#2563eb',
        }}
      >
        Directly below this Hero, the recap renders the sequential recap template sections (e.g. Overview &amp; Key Takeaways). You can customize each section below:
      </p>
    </div>
  )
}

export default WebinarRecapHeroNotice
