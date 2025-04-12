"use client"

import { Button } from "@/components/ui/button"
import type { Theme } from "@/lib/types"

interface HeroSectionProps {
  variant: number
  theme: Theme
}

export function HeroSection({ variant, theme }: HeroSectionProps) {
  switch (variant) {
    case 1:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The all-in-one solution for your business needs. Boost productivity and streamline your workflow.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="primary">Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      )
    case 2:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Transform Your Business with Our Solution
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Powerful tools to help you reach your goals faster and more efficiently.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary">Get Started</Button>
                  <Button variant="outline">Watch Demo</Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-video rounded-xl bg-muted/50 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">Hero Image</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 3:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2 max-w-[800px]">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Elevate Your Online Presence
                </h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Create stunning websites that convert visitors into customers with our powerful platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button variant="primary" className="w-full" size="lg">
                  Start Free Trial
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  View Demos
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl font-bold">10k+</div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl font-bold">24/7</div>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-2xl font-bold">100+</div>
                  <p className="text-sm text-muted-foreground">Templates</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 4:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Feature</div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Build Your Website in Minutes
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Our drag-and-drop builder makes it easy to create professional websites without coding.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="primary">Try it Free</Button>
                  <Button variant="outline">See Examples</Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-square rounded-xl bg-muted/50 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Product Image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 5:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="space-y-3 mb-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">The Future of Web Design</h1>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  AI-powered website creation that adapts to your brand and audience.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card">
                  <div className="p-2 rounded-full bg-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">1</div>
                  </div>
                  <h3 className="text-xl font-bold">Choose a Template</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Start with one of our professionally designed templates
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card">
                  <div className="p-2 rounded-full bg-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">2</div>
                  </div>
                  <h3 className="text-xl font-bold">Customize</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Personalize with your brand colors, fonts, and content
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4 rounded-lg border bg-card">
                  <div className="p-2 rounded-full bg-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">3</div>
                  </div>
                  <h3 className="text-xl font-bold">Publish</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Launch your site with one click and start attracting visitors
                  </p>
                </div>
              </div>
              <Button variant="primary" className="mt-8" size="lg">
                Get Started Today
              </Button>
            </div>
          </div>
        </section>
      )
    default:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto" style={{ maxWidth: theme.containerWidth }}>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Welcome to Our Platform
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The all-in-one solution for your business needs. Boost productivity and streamline your workflow.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="primary">Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      )
  }
}
