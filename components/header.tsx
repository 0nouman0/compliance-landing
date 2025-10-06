"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Shield, Star, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileMenuOpen(false)

    if (pathname === "/") {
      const featuresSection = document.getElementById("features")
      if (featuresSection) {
        const headerOffset = 80
        const elementPosition = featuresSection.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    } else {
      router.push("/#features")
    }
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={handleNavClick}>
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Shield className="h-6 w-6 text-white" strokeWidth={2} />
              <Star className="absolute h-3 w-3 text-yellow-300" fill="currentColor" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground">PoliGap</span>
              <span className="text-[10px] text-muted-foreground/70">A Kroolo company</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link
              href="#features"
              onClick={handleFeaturesClick}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-foreground">
              Sign In
            </Button>
            <Link href="/book-demo">
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              >
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              onClick={handleNavClick}
              className="text-base text-foreground hover:text-primary transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="#features"
              onClick={handleFeaturesClick}
              className="text-base text-foreground hover:text-primary transition-colors py-2"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              onClick={handleNavClick}
              className="text-base text-foreground hover:text-primary transition-colors py-2"
            >
              Pricing
            </Link>
            <div className="pt-4 border-t border-border/40 flex flex-col gap-3">
              <Button variant="ghost" size="default" className="w-full justify-start text-foreground">
                Sign In
              </Button>
              <Link href="/book-demo" onClick={handleNavClick}>
                <Button
                  size="default"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  Book Demo
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
