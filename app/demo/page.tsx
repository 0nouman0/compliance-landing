import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb / Back Navigation */}
        <section className="border-b border-border bg-muted/30 py-3 sm:py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              {/* Header */}
              <div className="mb-8 sm:mb-10 md:mb-12 text-center">
                <h1 className="mb-3 sm:mb-4 text-balance text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                  Watch{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    PoliGap
                  </span>{" "}
                  in Action
                </h1>
                <p className="mx-auto max-w-2xl text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground px-4">
                  See how our AI-powered platform streamlines legal document analysis, compliance monitoring, and risk
                  assessment in just a few minutes.
                </p>
              </div>

              {/* Video Player */}
              <div className="relative mb-8 sm:mb-10 md:mb-12 overflow-hidden rounded-xl sm:rounded-2xl border border-border sm:border-2 bg-card shadow-xl sm:shadow-2xl">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-3 sm:px-4 py-2 sm:py-3">
                  <div className="flex gap-1 sm:gap-1.5">
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500" />
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
                    <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-2 sm:ml-4 flex-1 rounded bg-background px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-muted-foreground truncate">
                    poligap.com/demo
                  </div>
                </div>

                {/* Video Container */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  {/* Placeholder Video Player */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-center">
                      <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 transition-transform hover:scale-110">
                        <Play className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="white" />
                      </div>
                      <p className="text-base sm:text-lg font-medium text-white">Demo Video</p>
                      <p className="text-xs sm:text-sm text-slate-400">Click to play</p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="hidden sm:block absolute left-4 sm:left-8 top-4 sm:top-8 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
                    <p className="text-[10px] sm:text-xs font-medium text-blue-300">AI Analysis Active</p>
                  </div>
                  <div className="hidden sm:block absolute bottom-4 sm:bottom-8 right-4 sm:right-8 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
                    <p className="text-[10px] sm:text-xs font-medium text-purple-300">Real-time Processing</p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Document Analysis</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Upload and analyze legal documents with AI-powered insights in seconds.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Compliance Monitoring</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Track regulatory compliance across multiple frameworks automatically.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Real-time Insights</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Get instant risk assessments and actionable recommendations.
                  </p>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-8 sm:mt-10 md:mt-12 text-center">
                <h2 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-foreground">Ready to Get Started?</h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground px-4">
                  Join teams worldwide using PoliGap for smarter legal compliance.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto h-11 sm:h-12 gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 text-base font-medium text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Free Trial
                  </Button>
                  <Link href="/pricing" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-11 sm:h-12 border-2 border-border px-6 sm:px-8 text-base font-medium text-foreground hover:bg-accent bg-transparent"
                    >
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
