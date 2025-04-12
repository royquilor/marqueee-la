"use client"

import type { Theme } from "@/lib/types"
import { Twitter, Github, Linkedin } from "lucide-react"

interface FooterSectionProps {
  variant: number
  theme: Theme
}

export function FooterSection({ variant, theme }: FooterSectionProps) {
  switch (variant) {
    case 1:
      return (
        <footer className="w-full py-6 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Company</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    About
                  </a>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Product</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                  <a href="#" className="hover:underline">
                    Integrations
                  </a>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Resources</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                  <a href="#" className="hover:underline">
                    Guides
                  </a>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                  <a href="#" className="hover:underline">
                    API
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Legal</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                  <a href="#" className="hover:underline">
                    Security
                  </a>
                  <a href="#" className="hover:underline">
                    Cookies
                  </a>
                </nav>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      )
    case 2:
      return (
        <footer className="w-full py-12 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4 md:w-1/3">
                <div className="font-bold text-xl">Logo</div>
                <p className="text-sm text-muted-foreground">
                  Building the future of web design with AI-powered tools and templates.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h3 className="font-bold">Product</h3>
                  <nav className="flex flex-col space-y-2 text-sm">
                    <a href="#" className="hover:underline">
                      Features
                    </a>
                    <a href="#" className="hover:underline">
                      Pricing
                    </a>
                    <a href="#" className="hover:underline">
                      Templates
                    </a>
                    <a href="#" className="hover:underline">
                      Customers
                    </a>
                  </nav>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold">Company</h3>
                  <nav className="flex flex-col space-y-2 text-sm">
                    <a href="#" className="hover:underline">
                      About
                    </a>
                    <a href="#" className="hover:underline">
                      Blog
                    </a>
                    <a href="#" className="hover:underline">
                      Careers
                    </a>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </nav>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold">Legal</h3>
                  <nav className="flex flex-col space-y-2 text-sm">
                    <a href="#" className="hover:underline">
                      Privacy
                    </a>
                    <a href="#" className="hover:underline">
                      Terms
                    </a>
                    <a href="#" className="hover:underline">
                      Security
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )
    case 3:
      return (
        <footer className="w-full py-6 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="font-bold text-xl">Logo</div>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  Features
                </a>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </nav>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )
    case 4:
      return (
        <footer className="w-full py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="font-bold text-2xl">Logo</div>
              <p className="max-w-[400px] text-muted-foreground">
                Creating beautiful websites has never been easier. Try our platform today.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mt-6">
                <a href="#" className="hover:underline">
                  Home
                </a>
                <a href="#" className="hover:underline">
                  Features
                </a>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
                <a href="#" className="hover:underline">
                  About
                </a>
                <a href="#" className="hover:underline">
                  Contact
                </a>
                <a href="#" className="hover:underline">
                  Privacy
                </a>
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </nav>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      )
    case 5:
      return (
        <footer className="w-full py-8 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="font-bold text-xl">Logo</div>
                <p className="text-sm text-muted-foreground">
                  Creating beautiful websites with AI-powered design tools.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">GitHub</span>
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold">Product</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                  <a href="#" className="hover:underline">
                    Templates
                  </a>
                  <a href="#" className="hover:underline">
                    Customers
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold">Resources</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                  <a href="#" className="hover:underline">
                    Guides
                  </a>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold">Subscribe</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest updates and offers straight to your inbox.
                </p>
                <form className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )
    default:
      return (
        <footer className="w-full py-6 bg-background border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Company</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    About
                  </a>
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                  <a href="#" className="hover:underline">
                    Press
                  </a>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Product</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                  <a href="#" className="hover:underline">
                    Integrations
                  </a>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Resources</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                  <a href="#" className="hover:underline">
                    Guides
                  </a>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                  <a href="#" className="hover:underline">
                    API
                  </a>
                </nav>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Legal</h3>
                <nav className="flex flex-col space-y-2 text-sm">
                  <a href="#" className="hover:underline">
                    Privacy
                  </a>
                  <a href="#" className="hover:underline">
                    Terms
                  </a>
                  <a href="#" className="hover:underline">
                    Security
                  </a>
                  <a href="#" className="hover:underline">
                    Cookies
                  </a>
                </nav>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Your Company. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      )
  }
}
