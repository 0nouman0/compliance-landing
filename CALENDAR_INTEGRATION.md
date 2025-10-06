# Calendar Integration Documentation

This document provides comprehensive information about the calendar integration system implemented in your compliance landing page.

## Overview

The calendar integration system provides multiple ways for users to book demo calls:
1. **Calendly Widget** - Direct integration with Calendly for instant booking
2. **Custom Booking Form** - Alternative form-based booking system
3. **API Integrations** - Support for Google Calendar, Microsoft Calendar, and Calendly APIs
4. **Webhook Handling** - Real-time event processing and notifications

## Setup Instructions

### 1. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```bash
# Copy from env.example and fill in your actual values
cp env.example .env.local
```

Required environment variables:

```bash
# Calendly Integration (Required)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/demo-call
CALENDLY_API_TOKEN=your_calendly_api_token_here
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_here

# Optional: Google Calendar API
GOOGLE_CALENDAR_CLIENT_ID=your_google_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALENDAR_REFRESH_TOKEN=your_refresh_token

# Optional: Microsoft Calendar API
MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
MICROSOFT_TENANT_ID=your_tenant_id

# General Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
WEBHOOK_SECRET=your_general_webhook_secret
```

### 2. Calendly Setup

1. **Create Calendly Account**: Sign up at [calendly.com](https://calendly.com)
2. **Set up Event Type**: Create a "Demo Call" event type
3. **Get API Token**: 
   - Go to Calendly Settings > Integrations > API & Webhooks
   - Generate a Personal Access Token
4. **Configure Webhook**:
   - Add webhook URL: `https://yourdomain.com/api/webhooks/calendly`
   - Select events: `invitee.created`, `invitee.canceled`
   - Set webhook secret for security

### 3. Google Calendar Setup (Optional)

1. **Create Google Cloud Project**
2. **Enable Calendar API**
3. **Create OAuth 2.0 Credentials**
4. **Get Refresh Token** using OAuth flow

### 4. Microsoft Calendar Setup (Optional)

1. **Register App in Azure AD**
2. **Configure API Permissions** for Calendar access
3. **Get Client Credentials**

## File Structure

```
├── lib/
│   ├── calendar-config.ts      # Configuration settings
│   └── calendar-api.ts         # API utilities and services
├── components/calendar/
│   ├── calendly-widget.tsx     # Calendly widget component
│   └── booking-form.tsx        # Custom booking form
├── app/api/
│   ├── webhooks/calendly/      # Webhook handlers
│   └── calendar/events/        # Calendar API endpoints
├── app/book-demo/
│   └── page.tsx               # Enhanced booking page
└── env.example                # Environment template
```

## Components Usage

### CalendlyWidget Component

```tsx
import { CalendlyWidget } from '@/components/calendar/calendly-widget'

<CalendlyWidget
  url="https://calendly.com/your-link"
  height={700}
  onEventScheduled={(event) => console.log('Booked:', event)}
  onDateAndTimeSelected={(event) => console.log('Selected:', event)}
/>
```

### BookingForm Component

```tsx
import { BookingForm } from '@/components/calendar/booking-form'

<BookingForm
  onBookingComplete={(bookingId) => console.log('Completed:', bookingId)}
  className="custom-styles"
/>
```

### CalendlyPopup Component

```tsx
import { CalendlyPopup } from '@/components/calendar/calendly-widget'

<CalendlyPopup
  url="https://calendly.com/your-link"
  text="Schedule a Call"
  className="btn btn-primary"
/>
```

## API Endpoints

### GET /api/calendar/events
Fetch calendar events from various sources.

**Query Parameters:**
- `source`: 'calendly' | 'google' | 'microsoft' | 'all'
- `limit`: Number of events to return (default: 10)

**Response:**
```json
{
  "success": true,
  "events": [...],
  "total": 5
}
```

### POST /api/calendar/events
Create calendar events or booking requests.

**Request Body:**
```json
{
  "type": "book_demo",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "preferredTime": "10:00 AM",
  "timezone": "America/New_York",
  "message": "Looking forward to the demo"
}
```

### POST /api/webhooks/calendly
Webhook endpoint for Calendly events.

**Supported Events:**
- `invitee.created` - New booking created
- `invitee.canceled` - Booking canceled

## Calendar API Services

### CalendlyAPI Class

```typescript
import { CalendlyAPI } from '@/lib/calendar-api'

const calendly = new CalendlyAPI()

// Get user info
const user = await calendly.getUser()

// Get scheduled events
const events = await calendly.getScheduledEvents({
  status: 'active',
  minStartTime: new Date().toISOString()
})

// Cancel an event
await calendly.cancelEvent(eventUuid, 'Rescheduling requested')
```

### GoogleCalendarAPI Class

```typescript
import { GoogleCalendarAPI } from '@/lib/calendar-api'

const google = new GoogleCalendarAPI()

// Create event
const event = await google.createEvent('primary', {
  summary: 'Demo Call',
  start: { dateTime: '2024-01-15T10:00:00Z', timeZone: 'UTC' },
  end: { dateTime: '2024-01-15T11:00:00Z', timeZone: 'UTC' },
  attendees: [{ email: 'attendee@example.com' }]
})
```

### MicrosoftCalendarAPI Class

```typescript
import { MicrosoftCalendarAPI } from '@/lib/calendar-api'

const microsoft = new MicrosoftCalendarAPI()

// Create event
const event = await microsoft.createEvent('user@domain.com', {
  subject: 'Demo Call',
  start: { dateTime: '2024-01-15T10:00:00Z', timeZone: 'UTC' },
  end: { dateTime: '2024-01-15T11:00:00Z', timeZone: 'UTC' },
  isOnlineMeeting: true
})
```

### CalendarService Class (Unified)

```typescript
import { CalendarService } from '@/lib/calendar-api'

const service = new CalendarService()

// Get all upcoming events
const events = await service.getAllUpcomingEvents()

// Book a demo
const result = await service.bookDemo({
  name: 'John Doe',
  email: 'john@example.com',
  preferredTime: '10:00 AM',
  timezone: 'America/New_York'
})
```

## Webhook Event Handling

The webhook system automatically handles:

1. **New Bookings** (`invitee.created`):
   - Logs booking details
   - Sends internal notifications
   - Can trigger email confirmations
   - Updates database records

2. **Cancellations** (`invitee.canceled`):
   - Logs cancellation
   - Sends cancellation notifications
   - Updates booking status

### Customizing Webhook Handlers

Edit `/app/api/webhooks/calendly/route.ts` to add custom logic:

```typescript
async function handleInviteeCreated(event: CalendlyWebhookEvent) {
  // Add your custom logic here:
  // - Send confirmation emails
  // - Update CRM systems
  // - Trigger Slack notifications
  // - Save to database
}
```

## Security Considerations

1. **Webhook Signature Verification**: All webhooks verify signatures using HMAC-SHA256
2. **API Token Security**: Store API tokens in environment variables
3. **CORS Configuration**: Configure CORS for your domain
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Customization Options

### Styling the Calendly Widget

The widget automatically applies your theme colors:
- Primary color: Purple (#9333ea)
- Background: Dark theme compatible
- Text color: White for dark backgrounds

### Adding Custom Fields

Modify the `BookingForm` component to add custom fields:

```tsx
// Add to the form
<div className="space-y-2">
  <Label htmlFor="customField">Custom Field</Label>
  <Input
    id="customField"
    value={formData.customField}
    onChange={(e) => handleInputChange('customField', e.target.value)}
  />
</div>
```

### Custom Notifications

Implement custom notification systems in the webhook handlers:

```typescript
// Slack notifications
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
await fetch(slackWebhookUrl, {
  method: 'POST',
  body: JSON.stringify({
    text: `New demo booking: ${customerName}`
  })
})

// Email notifications
await sendEmail({
  to: customerEmail,
  subject: 'Demo Confirmation',
  template: 'demo-confirmation',
  data: { customerName, eventDetails }
})
```

## Troubleshooting

### Common Issues

1. **Calendly Widget Not Loading**:
   - Check if the Calendly URL is correct
   - Verify the script is loading properly
   - Check browser console for errors

2. **Webhook Not Receiving Events**:
   - Verify webhook URL is accessible
   - Check webhook secret configuration
   - Review Calendly webhook settings

3. **API Authentication Errors**:
   - Verify API tokens are correct
   - Check token permissions and scopes
   - Ensure tokens haven't expired

### Debug Mode

Enable debug logging by setting:
```bash
NODE_ENV=development
```

This will log all webhook events and API calls to the console.

## Analytics and Tracking

Track booking events for analytics:

```typescript
// In your event handlers
const handleEventScheduled = (event: any) => {
  // Google Analytics
  gtag('event', 'demo_booked', {
    event_category: 'engagement',
    event_label: 'calendly_widget'
  })

  // Custom analytics
  analytics.track('Demo Booked', {
    source: 'calendly',
    eventType: event.event_type_name
  })
}
```

## Support and Maintenance

- **Calendly API Documentation**: [https://developer.calendly.com/](https://developer.calendly.com/)
- **Google Calendar API**: [https://developers.google.com/calendar](https://developers.google.com/calendar)
- **Microsoft Graph API**: [https://docs.microsoft.com/en-us/graph/api/resources/calendar](https://docs.microsoft.com/en-us/graph/api/resources/calendar)

For issues or questions, check the API documentation or contact the respective support teams.
