"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video, CheckCircle2, Shield, Sparkles, Users, TrendingUp } from "lucide-react"
import { useEffect } from "react"

export function BookDemo() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="demo" className="relative overflow-hidden py-20 sm:py-28">
      {/* Gradient orb decorations */}
      <div className="gradient-orb gradient-orb-purple absolute -top-20 right-0 h-96 w-96 opacity-40" />
      <div className="gradient-orb gradient-orb-blue absolute bottom-0 left-0 h-96 w-96 opacity-30" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
            <Sparkles className="h-4 w-4" />
            Schedule Your Demo
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            See{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">PoliGap</span>{" "}
            in Action
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Book a personalized demo with our compliance experts and discover how{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text font-semibold text-transparent">
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
            <div className="rounded-2xl border-2 border-border bg-card p-8 shadow-lg">
              <h3 className="mb-6 text-2xl font-bold text-foreground">What You'll Get</h3>
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
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                      <item.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demo details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="mb-2 font-semibold text-foreground">30 Minutes</h4>
                <p className="text-sm text-muted-foreground">Focused session tailored to your needs</p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="mb-2 font-semibold text-foreground">Flexible Scheduling</h4>
                <p className="text-sm text-muted-foreground">Choose a time that works for you</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
              <h4 className="mb-4 font-semibold text-foreground">Why Teams Choose PoliGap</h4>
              <div className="space-y-3">
                {[
                  "90% faster compliance document review",
                  "40+ global standards supported",
                  "Enterprise-grade security & privacy",
                  "Seamless integration with existing workflows",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-purple-600" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Calendly embed */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-2xl border-2 border-border bg-card shadow-xl">
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/your-calendly-link?hide_gdpr_banner=1&primary_color=9333ea"
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>

            {/* Help text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Can't find a suitable time?{" "}
                <Button variant="link" className="h-auto p-0 text-sm text-purple-600 hover:text-purple-700">
                  Contact us directly
                </Button>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA for mobile */}
        <div className="mt-16 text-center lg:hidden">
          <p className="text-sm text-muted-foreground">
            Questions before booking?{" "}
            <Button variant="link" className="h-auto p-0 text-sm text-purple-600 hover:text-purple-700">
              Chat with our team
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}
