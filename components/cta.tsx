import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/20 via-card to-card p-12 sm:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to automate your compliance?
            </h2>
            <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Join thousands of legal and compliance teams who trust ComplianceAI to keep their documents compliant and
              secure.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 bg-primary px-8 text-base font-medium text-primary-foreground hover:bg-primary/90"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium bg-transparent">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
