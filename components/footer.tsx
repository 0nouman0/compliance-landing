import { Shield, Star, Sparkles } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30 py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 md:gap-6 text-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
              <Star className="absolute h-3 w-3 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-semibold">PoliGap</span>
          </Link>

          {/* Powered by badge */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-accent/50 px-3 sm:px-4 py-1.5 sm:py-2">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="text-xs sm:text-sm text-muted-foreground">Powered by Advanced AI Technology</span>
          </div>

          {/* Simple links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Contact Us
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PoliGap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
