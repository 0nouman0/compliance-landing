import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { calendarConfig } from '@/lib/calendar-config'
import crypto from 'crypto'

// Webhook event types from Cal.com
interface CalcomWebhookEvent {
  triggerEvent: 'BOOKING_CREATED' | 'BOOKING_CANCELLED' | 'BOOKING_RESCHEDULED' | 'MEETING_ENDED'
  createdAt: string
  payload: {
    type: string
    title: string
    description?: string
    additionalNotes?: string
    customInputs?: Record<string, any>
    startTime: string
    endTime: string
    organizer: {
      id: number
      name: string
      email: string
      username: string
      timeZone: string
    }
    attendees: Array<{
      id: number
      email: string
      name: string
      timeZone: string
      locale: string
    }>
    location?: string
    destinationCalendar?: {
      id: number
      integration: string
      externalId: string
    }
    uid: string
    bookingId: number
    eventTypeId: number
    rescheduleUid?: string
    rescheduleStartTime?: string
    rescheduleEndTime?: string
    metadata?: Record<string, any>
  }
}

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expectedSignature}`)
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('x-cal-signature-256')
    
    // Verify webhook signature if secret is configured
    if (calendarConfig.calcom.webhookSecret && signature) {
      const isValid = verifyWebhookSignature(
        body,
        signature,
        calendarConfig.calcom.webhookSecret
      )
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        )
      }
    }

    const event: CalcomWebhookEvent = JSON.parse(body)
    
    // Handle different event types
    switch (event.triggerEvent) {
      case 'BOOKING_CREATED':
        await handleBookingCreated(event)
        break
      case 'BOOKING_CANCELLED':
        await handleBookingCancelled(event)
        break
      case 'BOOKING_RESCHEDULED':
        await handleBookingRescheduled(event)
        break
      case 'MEETING_ENDED':
        await handleMeetingEnded(event)
        break
      default:
        console.log(`Unhandled event type: ${event.triggerEvent}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleBookingCreated(event: CalcomWebhookEvent) {
  const { payload } = event
  
  console.log('New booking created:', {
    bookingId: payload.bookingId,
    title: payload.title,
    organizer: payload.organizer.name,
    attendees: payload.attendees.map(a => ({ name: a.name, email: a.email })),
    startTime: payload.startTime,
    endTime: payload.endTime,
    location: payload.location,
  })

  try {
    // Send internal notification
    await sendInternalNotification({
      type: 'new_booking',
      data: {
        bookingId: payload.bookingId,
        eventTitle: payload.title,
        organizerName: payload.organizer.name,
        organizerEmail: payload.organizer.email,
        attendees: payload.attendees,
        scheduledTime: payload.startTime,
        endTime: payload.endTime,
        location: payload.location,
        customInputs: payload.customInputs || {},
        additionalNotes: payload.additionalNotes,
      },
    })

    // Example: Save to database (implement your database logic)
    // await saveBookingToDatabase(payload)
    
  } catch (error) {
    console.error('Error handling booking created:', error)
  }
}

async function handleBookingCancelled(event: CalcomWebhookEvent) {
  const { payload } = event
  
  console.log('Booking cancelled:', {
    bookingId: payload.bookingId,
    title: payload.title,
    organizer: payload.organizer.name,
    cancelledAt: event.createdAt,
  })

  try {
    await sendInternalNotification({
      type: 'booking_cancelled',
      data: {
        bookingId: payload.bookingId,
        eventTitle: payload.title,
        organizerName: payload.organizer.name,
        attendees: payload.attendees,
        cancelledAt: event.createdAt,
      },
    })

    // Example: Update database
    // await updateBookingStatus(payload.bookingId, 'cancelled')
    
  } catch (error) {
    console.error('Error handling booking cancelled:', error)
  }
}

async function handleBookingRescheduled(event: CalcomWebhookEvent) {
  const { payload } = event
  
  console.log('Booking rescheduled:', {
    bookingId: payload.bookingId,
    title: payload.title,
    oldTime: payload.rescheduleStartTime,
    newTime: payload.startTime,
  })

  try {
    await sendInternalNotification({
      type: 'booking_rescheduled',
      data: {
        bookingId: payload.bookingId,
        eventTitle: payload.title,
        organizerName: payload.organizer.name,
        attendees: payload.attendees,
        oldStartTime: payload.rescheduleStartTime,
        newStartTime: payload.startTime,
        rescheduledAt: event.createdAt,
      },
    })
    
  } catch (error) {
    console.error('Error handling booking rescheduled:', error)
  }
}

async function handleMeetingEnded(event: CalcomWebhookEvent) {
  const { payload } = event
  
  console.log('Meeting ended:', {
    bookingId: payload.bookingId,
    title: payload.title,
    endedAt: event.createdAt,
  })

  try {
    await sendInternalNotification({
      type: 'meeting_ended',
      data: {
        bookingId: payload.bookingId,
        eventTitle: payload.title,
        organizerName: payload.organizer.name,
        attendees: payload.attendees,
        endedAt: event.createdAt,
      },
    })
    
  } catch (error) {
    console.error('Error handling meeting ended:', error)
  }
}

async function sendInternalNotification(notification: {
  type: string
  data: any
}) {
  // Implement your notification logic here
  console.log('Internal notification:', notification)
  
  // Example Slack webhook (uncomment and configure)
  /*
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  if (slackWebhookUrl) {
    const message = notification.type === 'new_booking' 
      ? `🎉 New demo booking: ${notification.data.attendees[0]?.name} (${notification.data.attendees[0]?.email})`
      : `📅 Booking ${notification.type}: ${notification.data.eventTitle}`
    
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${notification.type.replace('_', ' ').toUpperCase()}*\n*Event:* ${notification.data.eventTitle}\n*Organizer:* ${notification.data.organizerName}\n*Time:* ${new Date(notification.data.scheduledTime || notification.data.newStartTime).toLocaleString()}`,
            },
          },
        ],
      }),
    })
  }
  */
}

// GET method for webhook verification
export async function GET() {
  return NextResponse.json({ message: 'Cal.com webhook endpoint' })
}
