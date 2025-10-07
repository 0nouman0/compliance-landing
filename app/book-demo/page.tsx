"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, CheckCircle2, Shield, Sparkles, Users, TrendingUp, ArrowLeft } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { CalcomWidget } from "@/components/calendar/calcom-widget"
import { BookingForm } from "@/components/calendar/booking-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookDemoPage() {
  const [bookingMethod, setBookingMethod] = useState<'calcom' | 'form'>('calcom')

  const handleEventScheduled = (event: any) => {
    console.log('Event scheduled:', event)
    // You can add analytics tracking, notifications, etc. here
  }

  const handleBookingComplete = (bookingId: string) => {
    console.log('Booking completed:', bookingId)
    // Handle successful booking
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background pt-24 pb-20">
      {/* Gradient orb decorations */}
      <div className="gradient-orb gradient-orb-purple absolute -top-20 right-0 h-96 w-96 opacity-20" />
      <div className="gradient-orb gradient-orb-blue absolute bottom-0 left-0 h-96 w-96 opacity-20" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400">
            <Sparkles className="h-4 w-4" />
            Schedule Your Demo
          </div>
          <h1 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            See{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">PoliGap</span>{" "}
            in Action
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Book a personalized demo with our compliance experts and discover how{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
              AI
            </span>{" "}
            can transform your legal workflows
          </p>
        </div>

        {/* Main content - Split layout */}
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Benefits and info */}
          <div className="space-y-8">
            {/* What you'll get */}
            <div className="rounded-2xl border border-border bg-card/50 p-8 shadow-lg backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold">What You'll Get</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Video,
                    title: "Live Product Walkthrough",
                    description: "See PoliGap's AI-powered compliance checking in real-time",
                  },
                  {
                    icon: Shield,
                    title: "Custom Use Case Review",
                    description: "Discuss your specific compliance needs and challenges",
                  },
                  {
                    icon: TrendingUp,
                    title: "ROI Analysis",
                    description: "Learn how much time and money you can save",
                  },
                  {
                    icon: Users,
                    title: "Implementation Guidance",
                    description: "Get a clear roadmap for deploying PoliGap in your organization",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-purple-500/20">
                      <item.icon className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/20">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="mb-2 font-semibold">30 Minutes</h3>
                <p className="text-sm text-muted-foreground">Focused session tailored to your needs</p>
              </div>

              <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/20">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="mb-2 font-semibold">Flexible Scheduling</h3>
                <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm">
              <h3 className="mb-4 font-semibold">Why Teams Choose PoliGap</h3>
              <div className="space-y-3">
                {[
                  "90% faster compliance document review",
                  "40+ global standards supported",
                  "Enterprise-grade security & privacy",
                  "Seamless integration with existing workflows",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-400" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Booking Options */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-border bg-card/50 shadow-xl backdrop-blur-sm">
              <Tabs value={bookingMethod} onValueChange={(value) => setBookingMethod(value as 'calcom' | 'form')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger value="calcom">Quick Book</TabsTrigger>
                  <TabsTrigger value="form">Custom Request</TabsTrigger>
                </TabsList>
                
                <TabsContent value="calcom" className="p-4 pt-2">
                  <CalcomWidget
                    height={650}
                    onEventScheduled={handleEventScheduled}
                    className="rounded-lg overflow-hidden"
                  />
                </TabsContent>
                
                <TabsContent value="form" className="p-4 pt-2">
                  <BookingForm
                    onBookingComplete={handleBookingComplete}
                    className="border-0 shadow-none"
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Help text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Need help or have questions?{" "}
                <Button variant="link" className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300">
                  Contact our team
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA for mobile */}
        <div className="mt-16 text-center lg:hidden">
          <p className="text-sm text-muted-foreground">
            Questions before booking?{" "}
            <Button variant="link" className="h-auto p-0 text-sm text-purple-400 hover:text-purple-300">
              Chat with our team
            </Button>
          </p>
        </div>
      </div>
    </main>
  )
}
