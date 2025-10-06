"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarService, BookingRequest } from '@/lib/calendar-api'
import { Calendar, Clock, User, Mail, Building, Phone, MessageSquare } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BookingFormProps {
  onBookingComplete?: (bookingId: string) => void
  className?: string
}

export function BookingForm({ onBookingComplete, className = '' }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<BookingRequest>>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  })
  const { toast } = useToast()

  const handleInputChange = (field: keyof BookingRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const calendarService = new CalendarService()
      const result = await calendarService.bookDemo(formData as BookingRequest)

      if (result.success) {
        toast({
          title: 'Booking Request Submitted',
          description: 'We\'ll contact you shortly to confirm your demo appointment.',
        })
        onBookingComplete?.(result.bookingId)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          preferredTime: '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      }
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: 'There was an error submitting your booking request. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  ]

  return (
    <Card className={`w-full max-w-2xl ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-400" />
          Book Your Demo
        </CardTitle>
        <CardDescription>
          Fill out the form below and we'll schedule a personalized demo for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>

          {/* Scheduling Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferredTime" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Preferred Time *
            </Label>
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => handleInputChange('preferredTime', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your preferred time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your compliance needs or any specific questions you have..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Book Demo'}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            By submitting this form, you agree to our terms of service and privacy policy.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
