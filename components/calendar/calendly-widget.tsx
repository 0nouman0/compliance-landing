"use client"

import { useEffect, useRef } from 'react'
import { calendarConfig, calendlyWidgetConfig } from '@/lib/calendar-config'

interface CalendlyWidgetProps {
  url?: string
  height?: number
  className?: string
  onEventScheduled?: (event: any) => void
  onDateAndTimeSelected?: (event: any) => void
  onEventTypeViewed?: (event: any) => void
}

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: any) => void
      closePopupWidget: () => void
      initPopupWidget: (options: any) => void
    }
  }
}

export function CalendlyWidget({
  url = calendarConfig.calendly.url,
  height = 700,
  className = '',
  onEventScheduled,
  onDateAndTimeSelected,
  onEventTypeViewed,
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    const loadCalendlyScript = () => {
      if (scriptLoadedRef.current) return

      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        scriptLoadedRef.current = true
        initializeWidget()
      }
      document.body.appendChild(script)

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }

    const initializeWidget = () => {
      if (!widgetRef.current || !window.Calendly) return

      // Clear any existing widget
      widgetRef.current.innerHTML = ''

      // Create widget container
      const widgetDiv = document.createElement('div')
      widgetDiv.className = 'calendly-inline-widget'
      widgetDiv.style.minWidth = '320px'
      widgetDiv.style.height = `${height}px`
      
      // Build URL with configuration
      const widgetUrl = new URL(url)
      if (calendlyWidgetConfig.hideGdprBanner) {
        widgetUrl.searchParams.set('hide_gdpr_banner', '1')
      }
      if (calendlyWidgetConfig.primaryColor) {
        widgetUrl.searchParams.set('primary_color', calendlyWidgetConfig.primaryColor)
      }
      if (calendlyWidgetConfig.backgroundColor) {
        widgetUrl.searchParams.set('background_color', calendlyWidgetConfig.backgroundColor)
      }
      if (calendlyWidgetConfig.textColor) {
        widgetUrl.searchParams.set('text_color', calendlyWidgetConfig.textColor)
      }

      widgetDiv.setAttribute('data-url', widgetUrl.toString())
      widgetRef.current.appendChild(widgetDiv)

      // Initialize the widget
      window.Calendly.initInlineWidget({
        url: widgetUrl.toString(),
        parentElement: widgetDiv,
      })
    }

    // Set up event listeners for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return

      const { event, payload } = e.data

      switch (event) {
        case 'calendly.event_scheduled':
          onEventScheduled?.(payload)
          break
        case 'calendly.date_and_time_selected':
          onDateAndTimeSelected?.(payload)
          break
        case 'calendly.event_type_viewed':
          onEventTypeViewed?.(payload)
          break
      }
    }

    window.addEventListener('message', handleCalendlyEvent)
    loadCalendlyScript()

    return () => {
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [url, height, onEventScheduled, onDateAndTimeSelected, onEventTypeViewed])

  return (
    <div 
      ref={widgetRef} 
      className={`calendly-widget-container ${className}`}
      style={{ minHeight: height }}
    />
  )
}

// Popup widget component
interface CalendlyPopupProps {
  url?: string
  text?: string
  className?: string
  onEventScheduled?: (event: any) => void
}

export function CalendlyPopup({
  url = calendarConfig.calendly.url,
  text = 'Schedule time with me',
  className = '',
  onEventScheduled,
}: CalendlyPopupProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return

      const { event, payload } = e.data
      if (event === 'calendly.event_scheduled') {
        onEventScheduled?.(payload)
      }
    }

    window.addEventListener('message', handleCalendlyEvent)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      window.removeEventListener('message', handleCalendlyEvent)
    }
  }, [onEventScheduled])

  const openPopup = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: url,
      })
    }
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
