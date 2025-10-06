"use client"

import { Card } from "@/components/ui/card"
import { Upload, Search, Sparkles, FileCheck, CheckCircle2, AlertCircle } from "lucide-react"
import { useState } from "react"

export function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload Documents",
      description:
        "Securely upload your contracts, policies, or compliance documents in any format. Our platform supports PDF, Word, and more.",
    },
    {
      number: "02",
      icon: Search,
      title: "Select Standards",
      description:
        "Choose from 40+ global compliance standards including GDPR, HIPAA, SOC 2, and ISO. Get smart recommendations based on your industry.",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "AI Analysis",
      description:
        "Our advanced AI engine analyzes your documents against selected standards in real-time, identifying gaps and risks instantly.",
    },
    {
      number: "04",
      icon: FileCheck,
      title: "Get Results",
      description:
        "Receive detailed compliance reports with actionable recommendations, risk scores, and automated fixes to ensure full compliance.",
    },
  ]

  const renderMockup = (index: number) => {
    if (hoveredStep !== index) return null

    const mockups = [
      // Upload Documents Mockup
      <div key="upload" className="animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-2 flex-1 rounded bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              poligap.com/upload
            </div>
          </div>
          {/* Upload Interface */}
          <div className="p-6">
            <div className="rounded-lg border-2 border-dashed border-purple-500/50 bg-purple-500/5 p-8 text-center">
              <Upload className="mx-auto mb-3 h-12 w-12 text-purple-400" />
              <p className="mb-2 font-semibold">Drop your files here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3">
                <FileCheck className="h-5 w-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">contract_v2.pdf</p>
                  <p className="text-xs text-muted-foreground">2.4 MB</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>,

      // Select Standards Mockup
      <div key="standards" className="animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-2 flex-1 rounded bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              poligap.com/standards
            </div>
          </div>
          {/* Standards Selection */}
          <div className="p-6">
            <h3 className="mb-4 font-semibold">Select Compliance Standards</h3>
            <div className="space-y-2">
              {["GDPR", "HIPAA", "SOC 2", "ISO 27001"].map((standard, i) => (
                <div
                  key={standard}
                  className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3"
                >
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded ${
                      i < 2 ? "bg-purple-500" : "border-2 border-muted-foreground/30"
                    }`}
                  >
                    {i < 2 && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{standard}</span>
                  {i < 2 && <span className="ml-auto text-xs text-purple-400">Selected</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,

      // AI Analysis Mockup
      <div key="analysis" className="animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-2 flex-1 rounded bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              poligap.com/analysis
            </div>
          </div>
          {/* Analysis Progress */}
          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <Sparkles className="h-5 w-5 animate-pulse text-white" />
              </div>
              <div>
                <p className="font-semibold">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    AI Analysis
                  </span>{" "}
                  in Progress
                </p>
                <p className="text-xs text-muted-foreground">Analyzing compliance requirements...</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Document Parsing</span>
                  <span className="text-green-400">Complete</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full w-full bg-gradient-to-r from-green-500 to-green-400" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Compliance Check</span>
                  <span className="text-blue-400">78%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full w-3/4 animate-pulse bg-gradient-to-r from-blue-500 to-purple-500" />
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span>Risk Assessment</span>
                  <span className="text-muted-foreground">Pending</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full w-1/4 bg-muted-foreground/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>,

      // Get Results Mockup
      <div key="results" className="animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-2xl">
          {/* Browser Chrome */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <div className="ml-2 flex-1 rounded bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
              poligap.com/results
            </div>
          </div>
          {/* Results Dashboard */}
          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Compliance Report</h3>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                85% Compliant
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-500/10 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">GDPR Compliance</p>
                  <p className="text-xs text-muted-foreground">All requirements met</p>
                </div>
                <span className="text-sm font-semibold text-green-400">100%</span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">HIPAA Compliance</p>
                  <p className="text-xs text-muted-foreground">3 items need attention</p>
                </div>
                <span className="text-sm font-semibold text-yellow-400">70%</span>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ]

    return mockups[index]
  }

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">How It Works</h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Get compliance insights in four simple steps with our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
              AI-powered
            </span>{" "}
            platform
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden gap-6 lg:grid lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-full top-20 z-0 h-px w-full bg-gradient-to-r from-purple-500/50 to-transparent" />
              )}

              <div
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
                className="relative"
              >
                <Card className="group relative z-10 h-full border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/50 hover:bg-card/80 hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/10 transition-colors group-hover:text-muted-foreground/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {step.title === "AI Analysis" ? (
                      <>
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          AI
                        </span>{" "}
                        Analysis
                      </>
                    ) : (
                      step.title
                    )}
                  </h3>

                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </Card>

                {hoveredStep === index && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-4">{renderMockup(index)}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical layout */}
        <div className="space-y-6 lg:hidden">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-full z-0 h-6 w-px bg-gradient-to-b from-purple-500/50 to-transparent" />
              )}

              <Card className="relative z-10 border-border/50 bg-card/50 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        {step.title === "AI Analysis" ? (
                          <>
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              AI
                            </span>{" "}
                            Analysis
                          </>
                        ) : (
                          step.title
                        )}
                      </h3>
                      <span className="text-3xl font-bold text-muted-foreground/10">{step.number}</span>
                    </div>
                    <p className="text-pretty text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
