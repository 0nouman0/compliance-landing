import { NextRequest, NextResponse } from 'next/server'
import { CalendarService } from '@/lib/calendar-api'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source') // 'calcom', 'google', 'microsoft', or 'all'
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const calendarService = new CalendarService()
    
    // Get events from Cal.com and other sources
    const events = await calendarService.getAllUpcomingEvents()
    
    return NextResponse.json({
      success: true,
      events: events.slice(0, limit),
      total: events.length,
    })
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch calendar events',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...eventData } = body
    
    const calendarService = new CalendarService()
    
    switch (type) {
      case 'book_demo':
        const result = await calendarService.bookDemo(eventData)
        return NextResponse.json(result)
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid event type' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error processing calendar request:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process calendar request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
