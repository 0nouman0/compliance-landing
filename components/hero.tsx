"use client"

import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-6 gap-2 px-4 py-1.5 text-sm font-normal bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                Powered by Advanced AI Technology
              </span>
            </Badge>

            <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              All-in-One Comprehensive Tool for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered Legal & Compliance
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Comprehensive legal and compliance monitoring assessments powered by{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                AI
              </span>
              . Streamline your legal workflows with intelligent document analysis, risk assessment, and regulatory
              compliance tracking.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-foreground">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                    AI
                  </span>
                  -powered legal document analysis
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-foreground">Intelligent risk assessment tools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-foreground">Real-time compliance monitoring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-3 w-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-foreground">Automated regulatory compliance tracking</span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-base font-medium text-white hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
              </Button>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 gap-2 border-2 border-border px-8 text-base font-medium text-foreground hover:bg-accent bg-transparent"
                >
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Trusted by teams worldwide
              <span className="ml-2 font-medium text-foreground">Businesses • Teams • Organizations</span>
            </p>
          </div>

          {/* Right content - Product preview */}
          <div className="relative">
            <div className="relative rounded-2xl border-2 border-border bg-card p-6 shadow-2xl">
              {/* Browser chrome */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>
                <div className="ml-4 flex-1 rounded bg-muted px-3 py-1 text-xs text-muted-foreground">
                  poligap.com/dashboard
                </div>
              </div>

              {/* Document preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Document Analysis - Draft v3.0</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                          AI
                        </span>{" "}
                        Analysis Active
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20">
                    In Progress
                  </Badge>
                </div>

                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs font-medium text-yellow-200">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        AI
                      </span>{" "}
                      Suggestion: Consider reviewing this section for clarity and completeness.
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600" />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="destructive" className="text-xs">
                    Reject
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">Modify</Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/20">
                    Recommend
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
