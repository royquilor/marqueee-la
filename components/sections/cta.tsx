"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Theme } from "@/lib/types"
import { Check } from "lucide-react"

interface CtaSectionProps {
  variant: number
  theme: Theme
}

export function CtaSection({ variant, theme }: CtaSectionProps) {
  switch (variant) {
    case 1:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied customers using our platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" variant="primary">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">Start your free 14-day trial. No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      )
    case 2:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Join Our Community of Creators Today
                </h2>
                <p className="md:text-xl/relaxed">
                  Get access to all our premium features and start building amazing websites.
                </p>
              </div>
              <div className="flex flex-col space-y-4 rounded-lg bg-primary-foreground/10 backdrop-blur-sm p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Sign up for our newsletter</h3>
                  <p className="text-sm">Get the latest updates and offers straight to your inbox.</p>
                </div>
                <form className="flex flex-col space-y-2">
                  <Input
                    className="bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    variant="primary"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )
    case 3:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Start Building Today</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Create your account and get started in minutes.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-2">
                <Button size="lg" variant="primary">
                  Get Started
                </Button>
                <Button size="lg" variant="primary">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      )
    case 4:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="rounded-lg border bg-card p-8">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Business?</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Join over 10,000 companies already growing with our platform.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Free 14-day trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Cancel anytime</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <form className="grid gap-4">
                    <Input placeholder="Name" />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Company" />
                    <Button className="w-full" size="lg" variant="primary">
                      Get Started
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 5:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Limited Time Offer</h2>
                <p className="max-w-[600px] md:text-xl/relaxed">
                  Get 50% off your first 3 months when you sign up today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  size="lg"
                  variant="primary"
                >
                  Claim Offer
                </Button>
                <Button
                  variant="primary"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/80">
                Offer valid until December 31, 2023. Terms and conditions apply.
              </p>
            </div>
          </div>
        </section>
      )
    default:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied customers using our platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" variant="primary">
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">Start your free 14-day trial. No credit card required.</p>
              </div>
            </div>
          </div>
        </section>
      )
  }
}
