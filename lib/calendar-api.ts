import { calendarConfig } from './calendar-config'

// Types for calendar events
export interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  attendees: string[]
  meetingUrl?: string
  status: 'scheduled' | 'cancelled' | 'completed'
}

export interface BookingRequest {
  name: string
  email: string
  company?: string
  phone?: string
  message?: string
  preferredTime: string
  timezone: string
}

// Calendly API utilities
export class CalendlyAPI {
  private apiToken: string
  private baseUrl = 'https://api.calendly.com'

  constructor() {
    this.apiToken = calendarConfig.calendly.apiToken || ''
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Get user information
  async getUser() {
    return this.makeRequest('/users/me')
  }

  // Get scheduled events
  async getScheduledEvents(params: {
    user?: string
    organization?: string
    count?: number
    pageToken?: string
    sort?: 'start_time:asc' | 'start_time:desc'
    status?: 'active' | 'canceled'
    minStartTime?: string
    maxStartTime?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })

    return this.makeRequest(`/scheduled_events?${searchParams.toString()}`)
  }

  // Get event details
  async getEvent(eventUuid: string) {
    return this.makeRequest(`/scheduled_events/${eventUuid}`)
  }

  // Cancel an event
  async cancelEvent(eventUuid: string, reason?: string) {
    return this.makeRequest(`/scheduled_events/${eventUuid}/cancellation`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    })
  }

  // Get event invitees
  async getEventInvitees(eventUuid: string) {
    return this.makeRequest(`/scheduled_events/${eventUuid}/invitees`)
  }
}

// Google Calendar API utilities
export class GoogleCalendarAPI {
  private clientId: string
  private clientSecret: string
  private refreshToken: string
  private baseUrl = 'https://www.googleapis.com/calendar/v3'

  constructor() {
    this.clientId = calendarConfig.google.clientId || ''
    this.clientSecret = calendarConfig.google.clientSecret || ''
    this.refreshToken = calendarConfig.google.refreshToken || ''
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    const data = await response.json()
    return data.access_token
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Google Calendar API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Create a calendar event
  async createEvent(calendarId: string, event: {
    summary: string
    description?: string
    start: { dateTime: string; timeZone: string }
    end: { dateTime: string; timeZone: string }
    attendees?: { email: string }[]
    conferenceData?: any
  }) {
    return this.makeRequest(`/calendars/${calendarId}/events`, {
      method: 'POST',
      body: JSON.stringify(event),
    })
  }

  // Get calendar events
  async getEvents(calendarId: string, params: {
    timeMin?: string
    timeMax?: string
    maxResults?: number
    singleEvents?: boolean
    orderBy?: 'startTime' | 'updated'
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })

    return this.makeRequest(`/calendars/${calendarId}/events?${searchParams.toString()}`)
  }
}

// Microsoft Calendar API utilities
export class MicrosoftCalendarAPI {
  private clientId: string
  private clientSecret: string
  private tenantId: string
  private baseUrl = 'https://graph.microsoft.com/v1.0'

  constructor() {
    this.clientId = calendarConfig.microsoft.clientId || ''
    this.clientSecret = calendarConfig.microsoft.clientSecret || ''
    this.tenantId = calendarConfig.microsoft.tenantId || ''
  }

  private async getAccessToken(): Promise<string> {
    const response = await fetch(`https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    })

    const data = await response.json()
    return data.access_token
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const accessToken = await this.getAccessToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Microsoft Calendar API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Create a calendar event
  async createEvent(userId: string, event: {
    subject: string
    body?: { contentType: 'HTML' | 'Text'; content: string }
    start: { dateTime: string; timeZone: string }
    end: { dateTime: string; timeZone: string }
    attendees?: { emailAddress: { address: string; name?: string } }[]
    isOnlineMeeting?: boolean
  }) {
    return this.makeRequest(`/users/${userId}/events`, {
      method: 'POST',
      body: JSON.stringify(event),
    })
  }

  // Get calendar events
  async getEvents(userId: string, params: {
    startDateTime?: string
    endDateTime?: string
    top?: number
    orderby?: string
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })

    return this.makeRequest(`/users/${userId}/events?${searchParams.toString()}`)
  }
}

// Unified calendar service
export class CalendarService {
  private calendlyAPI: CalendlyAPI
  private googleAPI: GoogleCalendarAPI
  private microsoftAPI: MicrosoftCalendarAPI

  constructor() {
    this.calendlyAPI = new CalendlyAPI()
    this.googleAPI = new GoogleCalendarAPI()
    this.microsoftAPI = new MicrosoftCalendarAPI()
  }

  // Get all upcoming events from all sources
  async getAllUpcomingEvents(): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = []

    try {
      // Get Calendly events
      const calendlyEvents = await this.calendlyAPI.getScheduledEvents({
        status: 'active',
        minStartTime: new Date().toISOString(),
        sort: 'start_time:asc',
      })

      // Transform Calendly events to unified format
      if (calendlyEvents.collection) {
        events.push(...calendlyEvents.collection.map((event: any) => ({
          id: event.uri,
          title: event.name,
          description: event.event_type.description_plain,
          startTime: event.start_time,
          endTime: event.end_time,
          attendees: [], // Would need to fetch invitees separately
          meetingUrl: event.location?.join_url,
          status: 'scheduled' as const,
        })))
      }
    } catch (error) {
      console.error('Error fetching Calendly events:', error)
    }

    return events
  }

  // Book a demo call
  async bookDemo(request: BookingRequest) {
    // This would typically integrate with your booking system
    // For now, we'll return a success response
    return {
      success: true,
      message: 'Demo booking request received',
      bookingId: `booking_${Date.now()}`,
      request,
    }
  }
}
