"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Zap, Shield, Users, Lock } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("plans")
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubscribing(true)

    try {
      // Simulate API call - replace with actual backend integration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success
      toast({
        title: "Successfully Subscribed!",
        description: "You'll receive updates on legal & compliance insights.",
      })
      setEmail("") // Clear the input
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg text-muted-foreground px-4">
              Choose the perfect plan for your legal team. Start with a free trial, scale as you grow, and get
              enterprise features when you need them.
            </p>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={scrollToSection} className="mt-6 sm:mt-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-auto">
                <TabsTrigger
                  value="plans"
                  onClick={() => scrollToSection("plans")}
                  className="text-xs sm:text-sm px-2 py-2"
                >
                  View Plans
                </TabsTrigger>
                <TabsTrigger
                  value="enterprise"
                  onClick={() => scrollToSection("enterprise")}
                  className="text-xs sm:text-sm px-2 py-2"
                >
                  Enterprise
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  onClick={() => scrollToSection("faq")}
                  className="text-xs sm:text-sm px-2 py-2"
                >
                  FAQ
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Billing Toggle */}
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <Label htmlFor="billing" className="text-sm">
                Monthly
              </Label>
              <Switch id="billing" />
              <Label htmlFor="billing" className="text-sm">
                Annual
              </Label>
              <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="plans" className="pb-12 sm:pb-16 md:pb-20 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-6 sm:gap-7 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Starter Plan */}
            <Card className="relative flex flex-col p-8 bg-card">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Starter</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Perfect for small legal teams getting started with AI contract review
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Up to 50 contracts/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Basic AI analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">PDF upload & export</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Standard templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">3 team members</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Custom templates</span>
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="mt-8 w-full bg-transparent" asChild>
                <Link href="#trial">Start Free Trial →</Link>
              </Button>
            </Card>

            {/* Professional Plan - Highlighted */}
            <Card className="relative flex flex-col border-2 border-primary p-8 bg-card shadow-xl">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Professional</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">$149</span>
                  <span className="text-muted-foreground">/user/month</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Used for growing law firms and legal departments</p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Up to 500 contracts/month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Advanced AI analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Real-time collaboration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Custom templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">10 team members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Compliance reporting</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">White-label solution</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-40">
                    <Check className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Dedicated account manager</span>
                  </li>
                </ul>
              </div>

              <Button className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="#trial">Start Free Trial →</Link>
              </Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative flex flex-col p-8 bg-card">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">Enterprise</h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Tailored solutions for large organizations with complex needs
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Unlimited contracts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Custom AI training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">White-label solution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Unlimited team members</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Advanced security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">SLA guarantees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">On-premise deployment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">Custom workflows</span>
                  </li>
                </ul>
              </div>

              <Button variant="outline" className="mt-8 w-full bg-transparent" asChild>
                <Link href="#contact">Contact Sales →</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section id="enterprise" className="py-12 sm:py-16 md:py-20 bg-muted/30 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Enterprise Features</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Get advanced capabilities designed for large organizations with complex legal workflows.
            </p>
          </div>

          <div className="mx-auto mt-10 sm:mt-12 md:mt-16 grid max-w-5xl gap-6 sm:gap-7 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Custom AI Training</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Train AI models on your specific contract types and legal requirements
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">White-Label Solution</h3>
              <p className="mt-2 text-sm text-muted-foreground">Fully branded with your company logo and colors</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Dedicated Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">24/7 priority support with dedicated account manager</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Advanced Security</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                SOC 2 Type II, HIPAA compliance, and custom security controls
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 sm:py-16 md:py-20 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="mt-8 sm:mt-10 md:mt-12">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">Can I change my plan at any time?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                  prorate the difference in your next billing cycle.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">What happens if I exceed my contract limit?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase
                  additional contract credits. We never interrupt your workflow.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Is there a free trial?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we offer a 14-day free trial for all plans. No credit card required to start.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">Do you offer annual discounts?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, annual plans receive a 20% discount. Enterprise customers can discuss custom pricing with our
                  sales team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">What security measures do you have in place?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We're SOC 2 compliant with bank-grade encryption, regular security audits, and GDPR compliance. Your
                  data is always secure.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-12 sm:py-16 md:py-20 text-primary-foreground">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Ready to Transform Your Contract Review?
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-foreground/90">
              Start your free trial today and experience the power of AI-driven contract analysis.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link href="#trial">Start Free Trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="#contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-secondary py-12 sm:py-14 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-xl sm:text-2xl font-bold">
              Stay Updated with{" "}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                Legal & Compliance
              </span>{" "}
              Insights
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get the latest updates on compliance regulations, legal technology trends, and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubscribing}
                required
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe →"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
