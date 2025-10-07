"use client"

import { useState, useEffect } from 'react'
import { calendarConfig } from '@/lib/calendar-config'

interface CalcomWidgetProps {
  url?: string
  height?: number
  className?: string
  onEventScheduled?: (event: any) => void
  onDateAndTimeSelected?: (event: any) => void
  onEventTypeViewed?: (event: any) => void
}

export function CalcomWidget({
  url = calendarConfig.calcom.url,
  height = 700,
  className = '',
  onEventScheduled,
  onDateAndTimeSelected,
  onEventTypeViewed,
}: CalcomWidgetProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBookingClick = () => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'width=800,height=700,scrollbars=yes,resizable=yes')
    }
  }

  // Prevent hydration mismatch by only rendering on client
  if (!isClient) {
    return (
      <div 
        className={`calcom-widget-container ${className}`}
        style={{ 
          minHeight: height,
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #333',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ color: '#888' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div 
      className={`calcom-widget-container ${className}`}
      style={{ 
        minHeight: height,
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #333',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          backgroundColor: '#9333ea', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          fontSize: '2rem'
        }}>
          📅
        </div>
        <h3 style={{ 
          marginBottom: '1rem', 
          color: '#9333ea', 
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Schedule Your Demo
        </h3>
        <p style={{ 
          marginBottom: '2rem', 
          color: '#888', 
          fontSize: '1rem',
          lineHeight: '1.5',
          maxWidth: '400px'
        }}>
          Book a personalized 30-minute demo with our compliance experts and see how PoliGap can transform your legal workflows.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: '#ccc'
        }}>
          <div>⏱️ 30 minutes</div>
          <div>💻 Online meeting</div>
          <div>🎯 Personalized</div>
        </div>
      </div>

      <button
        onClick={handleBookingClick}
        className="booking-button"
        style={{
          backgroundColor: '#9333ea',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
        }}
      >
        Book Your Demo Now
      </button>

      <p style={{ 
        marginTop: '1.5rem', 
        fontSize: '0.8rem', 
        color: '#666',
        fontStyle: 'italic'
      }}>
        Opens in a new window • No account required
      </p>

      <style jsx>{`
        .booking-button:hover {
          background-color: #7c3aed !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}

// Popup widget component for Cal.com
interface CalcomPopupProps {
  url?: string
  text?: string
  className?: string
  onEventScheduled?: (event: any) => void
}

export function CalcomPopup({
  url = calendarConfig.calcom.url,
  text = 'Schedule time with me',
  className = '',
  onEventScheduled,
}: CalcomPopupProps) {
  const openPopup = () => {
    // Open Cal.com in a new window/tab
    const popupUrl = `${url}?embed=true`
    window.open(popupUrl, 'cal-popup', 'width=800,height=600,scrollbars=yes,resizable=yes')
  }

  return (
    <button
      onClick={openPopup}
      className={className}
    >
      {text}
    </button>
  )
}
