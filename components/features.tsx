import { Card } from "@/components/ui/card"
import { Shield, FileCheck, Sparkles, Zap, Lock, Globe } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Compliance Checking",
      description:
        "Automatically verify documents against 40+ global compliance standards including HIPAA, GDPR, CCPA, and ISO certifications.",
    },
    {
      icon: FileCheck,
      title: "Contract Review",
      description:
        "AI-powered legal contract analysis with intelligent clause detection, risk assessment, and compliance verification.",
    },
    {
      icon: Sparkles,
      title: "Smart Templates",
      description:
        "Pre-defined contract templates optimized for various industries and jurisdictions, customizable to your needs.",
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description:
        "Get comprehensive compliance reports in seconds, not days. Upload, analyze, and receive actionable insights instantly.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, SOC 2 Type II certified, with complete data privacy and confidentiality guarantees.",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Support for international regulations across 150+ countries with multi-language document processing capabilities.",
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need for compliance
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Comprehensive AI-powered tools to ensure your documents meet global regulatory standards
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-pretty leading-relaxed text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
