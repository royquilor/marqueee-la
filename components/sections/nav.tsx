"use client"

import { Button } from "@/components/ui/button"
import type { Theme } from "@/lib/types"
import { Menu } from "lucide-react"

interface NavSectionProps {
  variant: number
  theme: Theme
}

export function NavSection({ variant, theme }: NavSectionProps) {
  switch (variant) {
    case 1:
      return (
        <header className="w-full py-4 bg-background border-b">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">Logo</div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:underline">
                  Home
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Features
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Pricing
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  About
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </header>
      )
    case 2:
      return (
        <header className="w-full py-4 bg-background border-b">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl">Logo</div>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:underline">
                  Home
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Features
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Pricing
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  About
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Contact
                </a>
              </nav>
              <div className="hidden md:flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </header>
      )
    case 3:
      return (
        <header className="w-full py-4 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="font-bold text-xl">Logo</div>
                <nav className="hidden md:flex items-center gap-6">
                  <a href="#" className="text-sm font-medium hover:underline">
                    Home
                  </a>
                  <a href="#" className="text-sm font-medium hover:underline">
                    Features
                  </a>
                  <a href="#" className="text-sm font-medium hover:underline">
                    Pricing
                  </a>
                  <a href="#" className="text-sm font-medium hover:underline">
                    About
                  </a>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm font-medium hover:underline hidden md:inline-block">
                  Contact
                </a>
                <Button variant="primary">Get Started</Button>
              </div>
            </div>
          </div>
        </header>
      )
    case 4:
      return (
        <header className="w-full py-4 bg-background border-b">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">Logo</div>
              <div className="flex items-center gap-4">
                <nav className="hidden md:flex items-center">
                  <Button variant="ghost" size="sm">
                    Home
                  </Button>
                  <Button variant="ghost" size="sm">
                    Features
                  </Button>
                  <Button variant="ghost" size="sm">
                    Pricing
                  </Button>
                  <Button variant="ghost" size="sm">
                    About
                  </Button>
                  <Button variant="ghost" size="sm">
                    Contact
                  </Button>
                </nav>
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  Log In
                </Button>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>
      )
    case 5:
      return (
        <header className="w-full py-4 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl">Logo</div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </div>
              </div>
              <div className="border-t pt-4">
                <nav className="flex items-center justify-center gap-6 overflow-x-auto pb-2">
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Home
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Features
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Pricing
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    About
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Contact
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Blog
                  </a>
                  <a href="#" className="text-sm font-medium whitespace-nowrap hover:underline">
                    Support
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>
      )
    default:
      return (
        <header className="w-full py-4 bg-background border-b">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex items-center justify-between">
              <div className="font-bold text-xl">Logo</div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:underline">
                  Home
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Features
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Pricing
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  About
                </a>
                <a href="#" className="text-sm font-medium hover:underline">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </header>
      )
  }
}
