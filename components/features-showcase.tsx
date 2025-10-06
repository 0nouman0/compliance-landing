"use client"

import { FileText, CheckCircle, FileCheck, Shield, Sparkles, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"

const features = [
  {
    title: "Templates Library",
    description: "Access pre-built compliance templates and legal document frameworks for faster implementation.",
    icon: FileText,
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
    bgGradient: "bg-gradient-to-br from-purple-500/5 to-purple-600/10",
  },
  {
    title: "Compliance Checker",
    description: "Automated compliance verification against multiple regulatory standards and frameworks.",
    icon: CheckCircle,
    color: "from-cyan-500/20 to-cyan-600/20",
    iconColor: "text-cyan-400",
    bgGradient: "bg-gradient-to-br from-cyan-500/5 to-cyan-600/10",
  },
  {
    title: "Contract Reviewer",
    description:
      "AI-powered contract analysis with clause identification, risk assessment, and compliance verification.",
    icon: FileCheck,
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
    bgGradient: "bg-gradient-to-br from-green-500/5 to-green-600/10",
  },
  {
    title: "Policy Analyzer",
    description: "Intelligent policy analysis with automated compliance checking and regulatory alignment assessment.",
    icon: Shield,
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
    bgGradient: "bg-gradient-to-br from-blue-500/5 to-blue-600/10",
  },
  {
    title: "Policy Generator",
    description:
      "AI-assisted policy creation with compliance templates, regulatory requirements, and automated formatting.",
    icon: Sparkles,
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
    bgGradient: "bg-gradient-to-br from-pink-500/5 to-pink-600/10",
  },
  {
    title: "Legal AI Assistant",
    description: "Conversational AI assistant for legal queries, document drafting, and compliance guidance.",
    icon: MessageSquare,
    color: "from-amber-500/20 to-amber-600/20",
    iconColor: "text-amber-400",
    bgGradient: "bg-gradient-to-br from-amber-500/5 to-amber-600/10",
  },
]

const FeatureMockup = ({ featureIndex }: { featureIndex: number }) => {
  const mockups = [
    // Templates Library
    <div key="templates-library" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Document Templates</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {["Privacy Policy", "Terms of Service", "GDPR Compliance", "Data Processing"].map((template, i) => (
          <div key={i} className="bg-purple-500/10 border border-purple-500/20 rounded p-3 space-y-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <p className="text-xs font-medium">{template}</p>
            <div className="h-1 bg-purple-500/20 rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>,

    // Compliance Checker
    <div key="compliance-checker" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Compliance Status</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="space-y-3">
        {[
          { name: "GDPR", status: "Compliant", color: "green" },
          { name: "HIPAA", status: "Compliant", color: "green" },
          { name: "SOC 2", status: "In Progress", color: "yellow" },
          { name: "ISO 27001", status: "Review Required", color: "red" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-cyan-500/5 border border-cyan-500/20 rounded p-3"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className={`w-4 h-4 text-${item.color}-400`} />
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded bg-${item.color}-500/20 text-${item.color}-400`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>,

    // Contract Reviewer
    <div key="contract-reviewer" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Contract Analysis</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">Payment Terms</p>
          <div className="h-2 bg-green-500/20 rounded w-full mb-1" />
          <div className="h-2 bg-green-500/20 rounded w-4/5" />
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">Standard clause detected</span>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">Liability Clause</p>
          <div className="h-2 bg-yellow-500/20 rounded w-full mb-1" />
          <div className="h-2 bg-yellow-500/20 rounded w-3/5" />
          <div className="flex items-center gap-2 mt-2">
            <Shield className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-yellow-400">Review recommended</span>
          </div>
        </div>
      </div>
    </div>,

    // Policy Analyzer
    <div key="policy-analyzer" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Policy Analysis Dashboard</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">Compliance Score</p>
          <p className="text-2xl font-bold text-blue-400">94%</p>
          <div className="h-1.5 bg-blue-500/20 rounded-full w-full mt-2">
            <div className="h-1.5 bg-blue-500 rounded-full w-[94%]" />
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">Risk Level</p>
          <p className="text-2xl font-bold text-green-400">Low</p>
          <div className="flex gap-1 mt-2">
            <div className="h-1.5 bg-green-500 rounded-full flex-1" />
            <div className="h-1.5 bg-muted rounded-full flex-1" />
            <div className="h-1.5 bg-muted rounded-full flex-1" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {["Data Protection", "Access Control", "Audit Logging"].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3 h-3 text-blue-400" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>,

    // Policy Generator
    <div key="policy-generator" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Generate New Policy</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="bg-pink-500/10 border border-pink-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">Policy Type</p>
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-pink-500/20 rounded text-xs">Privacy Policy</div>
            <div className="px-3 py-1 bg-muted rounded text-xs">Security Policy</div>
          </div>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 rounded p-3">
          <p className="text-xs text-muted-foreground mb-2">AI Generation Progress</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
              <span className="text-xs">Analyzing requirements...</span>
            </div>
            <div className="h-1.5 bg-pink-500/20 rounded-full w-full">
              <div className="h-1.5 bg-pink-500 rounded-full w-2/3 animate-pulse" />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <div className="h-2 bg-muted rounded w-full" />
          <div className="h-2 bg-muted rounded w-5/6" />
          <div className="h-2 bg-muted rounded w-4/6" />
        </div>
      </div>
    </div>,

    // Legal AI Assistant
    <div key="legal-ai-assistant" className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h4 className="font-semibold text-sm">Legal AI Assistant</h4>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex-1">
            <p className="text-xs">What are the key requirements for GDPR compliance?</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="bg-card border border-border rounded-lg p-3 flex-1">
            <p className="text-xs mb-2">GDPR compliance requires:</p>
            <div className="space-y-1">
              <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5" />
                <span className="text-xs text-muted-foreground">Data protection by design</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5" />
                <span className="text-xs text-muted-foreground">User consent management</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-amber-400 mt-1.5" />
                <span className="text-xs text-muted-foreground">Data breach notification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-2xl">
        {mockups[featureIndex]}
      </div>
    </div>
  )
}

export function FeaturesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance px-4">
            Comprehensive Features for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Legal & Compliance
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto text-pretty px-4">
            Everything you need for legal document analysis, compliance monitoring, and risk assessment with
            cutting-edge AI technology and legal-grade security.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="relative">
                <Card
                  className={`relative p-6 sm:p-7 md:p-8 border-border/50 transition-all duration-300 hover:border-border hover:shadow-xl hover:shadow-purple-500/10 ${feature.bgGradient} group cursor-pointer`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Icon Circle */}
                  <div className="absolute top-6 right-6 sm:top-7 sm:right-7 md:top-8 md:right-8">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${feature.iconColor}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pr-16 sm:pr-18 md:pr-20">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-1.5 bg-muted rounded-full w-full" />
                      <div className="h-1.5 bg-muted rounded-full w-5/6" />
                      <div className="h-1.5 bg-muted rounded-full w-4/6" />
                    </div>
                  </div>

                  {/* Description on hover */}
                  <div
                    className={`mt-4 sm:mt-5 md:mt-6 text-sm text-muted-foreground transition-all duration-300 ${
                      hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 absolute"
                    }`}
                  >
                    {feature.description}
                  </div>

                  {/* Hover gradient border effect */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
                  />
                </Card>

                {hoveredIndex === index && (
                  <div className="hidden lg:block">
                    <FeatureMockup featureIndex={index} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
