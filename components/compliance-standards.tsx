import { Card } from "@/components/ui/card"
import { Heart, Globe, CreditCard, TrendingUp, Lock, Award, CheckCircle, Building } from "lucide-react"

export function ComplianceStandards() {
  const standards = [
    {
      icon: Heart,
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
    },
    {
      icon: Globe,
      name: "GDPR",
      description: "General Data Protection Regulation",
    },
    {
      icon: Lock,
      name: "CCPA",
      description: "California Consumer Privacy Act",
    },
    {
      icon: TrendingUp,
      name: "SOX",
      description: "Sarbanes-Oxley Act",
    },
    {
      icon: CreditCard,
      name: "PCI DSS",
      description: "Payment Card Industry Data Security Standard",
    },
    {
      icon: Award,
      name: "ISO 27001",
      description: "Information Security Management Systems",
    },
    {
      icon: CheckCircle,
      name: "ISO 9001",
      description: "Quality Management Systems",
    },
    {
      icon: Building,
      name: "NIST",
      description: "National Institute of Standards and Technology",
    },
  ]

  return (
    <section id="standards" className="border-y border-border/40 bg-card/30 py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Comprehensive Standards Coverage
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Verify compliance against the world's most important regulatory frameworks
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {standards.map((standard, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-border bg-card p-6 text-center transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <standard.icon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{standard.name}</h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{standard.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            + 32 additional standards including FERPA, GLBA, FISMA, and more
          </p>
        </div>
      </div>
    </section>
  )
}
