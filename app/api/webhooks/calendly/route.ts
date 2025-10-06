import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { calendarConfig } from '@/lib/calendar-config'
import crypto from 'crypto'

// Webhook event types from Calendly
interface CalendlyWebhookEvent {
  created_at: string
  created_by: string
  event: 'invitee.created' | 'invitee.canceled'
  payload: {
    cancel_url?: string
    created_at: string
    email: string
    event: string
    name: string
    new_invitee?: string
    old_invitee?: string
    questions_and_answers?: Array<{
      question: string
      answer: string
    }>
    reschedule_url?: string
    rescheduled?: boolean
    status: 'active' | 'canceled'
    text_reminder_number?: string
    timezone: string
    tracking?: {
      utm_campaign?: string
      utm_source?: string
      utm_medium?: string
      utm_content?: string
      utm_term?: string
      salesforce_uuid?: string
    }
    updated_at: string
    uri: string
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
    .digest('base64')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('calendly-webhook-signature')
    
    // Verify webhook signature if secret is configured
    if (calendarConfig.calendly.webhookSecret && signature) {
      const isValid = verifyWebhookSignature(
        body,
        signature,
        calendarConfig.calendly.webhookSecret
      )
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid webhook signature' },
          { status: 401 }
        )
      }
    }

    const event: CalendlyWebhookEvent = JSON.parse(body)
    
    // Handle different event types
    switch (event.event) {
      case 'invitee.created':
        await handleInviteeCreated(event)
        break
      case 'invitee.canceled':
        await handleInviteeCanceled(event)
        break
      default:
        console.log(`Unhandled event type: ${event.event}`)
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

async function handleInviteeCreated(event: CalendlyWebhookEvent) {
  const { payload } = event
  
  console.log('New booking created:', {
    name: payload.name,
    email: payload.email,
    event: payload.event,
    timezone: payload.timezone,
    created_at: payload.created_at,
  })

  // Here you can:
  // 1. Save booking to your database
  // 2. Send confirmation emails
  // 3. Create calendar events in other systems
  // 4. Trigger notifications
  // 5. Update CRM systems
  
  try {
    // Example: Send internal notification
    await sendInternalNotification({
      type: 'new_booking',
      data: {
        customerName: payload.name,
        customerEmail: payload.email,
        eventType: payload.event,
        scheduledTime: payload.created_at,
        timezone: payload.timezone,
        questionsAndAnswers: payload.questions_and_answers || [],
      },
    })

    // Example: Save to database (implement your database logic)
    // await saveBookingToDatabase(payload)
    
  } catch (error) {
    console.error('Error handling invitee created:', error)
  }
}

async function handleInviteeCanceled(event: CalendlyWebhookEvent) {
  const { payload } = event
  
  console.log('Booking canceled:', {
    name: payload.name,
    email: payload.email,
    event: payload.event,
    canceled_at: event.created_at,
  })

  try {
    // Example: Send cancellation notification
    await sendInternalNotification({
      type: 'booking_canceled',
      data: {
        customerName: payload.name,
        customerEmail: payload.email,
        eventType: payload.event,
        canceledAt: event.created_at,
      },
    })

    // Example: Update database
    // await updateBookingStatus(payload.uri, 'canceled')
    
  } catch (error) {
    console.error('Error handling invitee canceled:', error)
  }
}

async function sendInternalNotification(notification: {
  type: string
  data: any
}) {
  // Implement your notification logic here
  // This could be:
  // - Slack notifications
  // - Email alerts
  // - Discord webhooks
  // - Teams messages
  // - Database logging
  
  console.log('Internal notification:', notification)
  
  // Example Slack webhook (uncomment and configure)
  /*
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  if (slackWebhookUrl) {
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `New demo booking: ${notification.data.customerName} (${notification.data.customerEmail})`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*New Demo Booking*\n*Name:* ${notification.data.customerName}\n*Email:* ${notification.data.customerEmail}\n*Event:* ${notification.data.eventType}`,
            },
          },
        ],
      }),
    })
  }
  */
}

// GET method for webhook verification (some services require this)
export async function GET() {
  return NextResponse.json({ message: 'Calendly webhook endpoint' })
}
