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

// Cal.com API utilities
export class CalcomAPI {
  private apiToken: string
  private baseUrl = 'https://api.cal.com/v1'

  constructor() {
    this.apiToken = calendarConfig.calcom.apiToken || ''
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
      throw new Error(`Cal.com API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Get user information
  async getMe() {
    return this.makeRequest('/me')
  }

  // Get bookings
  async getBookings(params: {
    status?: 'upcoming' | 'recurring' | 'past' | 'cancelled'
    take?: number
    skip?: number
  } = {}) {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString())
    })

    return this.makeRequest(`/bookings?${searchParams.toString()}`)
  }

  // Get booking details
  async getBooking(bookingId: number) {
    return this.makeRequest(`/bookings/${bookingId}`)
  }

  // Cancel a booking
  async cancelBooking(bookingId: number, reason?: string) {
    return this.makeRequest(`/bookings/${bookingId}/cancel`, {
      method: 'DELETE',
      body: JSON.stringify({ reason }),
    })
  }

  // Get event types
  async getEventTypes() {
    return this.makeRequest('/event-types')
  }

  // Create a booking
  async createBooking(data: {
    eventTypeId: number
    start: string
    end: string
    responses: Record<string, any>
    timeZone: string
    language: string
    metadata?: Record<string, any>
  }) {
    return this.makeRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    })
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
  private calcomAPI: CalcomAPI
  private googleAPI: GoogleCalendarAPI
  private microsoftAPI: MicrosoftCalendarAPI

  constructor() {
    this.calcomAPI = new CalcomAPI()
    this.googleAPI = new GoogleCalendarAPI()
    this.microsoftAPI = new MicrosoftCalendarAPI()
  }

  // Get all upcoming events from all sources
  async getAllUpcomingEvents(): Promise<CalendarEvent[]> {
    const events: CalendarEvent[] = []

    try {
      // Get Cal.com events
      const calcomBookings = await this.calcomAPI.getBookings({
        status: 'upcoming',
        take: 50,
      })

      // Transform Cal.com events to unified format
      if (calcomBookings.bookings) {
        events.push(...calcomBookings.bookings.map((booking: any) => ({
          id: booking.id.toString(),
          title: booking.title || booking.eventType?.title || 'Meeting',
          description: booking.description || booking.eventType?.description,
          startTime: booking.startTime,
          endTime: booking.endTime,
          attendees: booking.attendees?.map((a: any) => a.email) || [],
          meetingUrl: booking.location?.type === 'integrations:zoom' ? booking.location.link : undefined,
          status: booking.status === 'ACCEPTED' ? 'scheduled' as const : 'cancelled' as const,
        })))
      }
    } catch (error) {
      console.error('Error fetching Cal.com events:', error)
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
