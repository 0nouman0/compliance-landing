import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturesShowcase } from "@/components/features-showcase"
import { Features } from "@/components/features"
import { ComplianceStandards } from "@/components/compliance-standards"
import { HowItWorks } from "@/components/how-it-works"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FeaturesShowcase />
      <Features />
      <ComplianceStandards />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  )
}
