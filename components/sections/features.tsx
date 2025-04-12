"use client"

import type { Theme } from "@/lib/types"
import { Check } from "lucide-react"

interface FeaturesSectionProps {
  variant: number
  theme: Theme
}

export function FeaturesSection({ variant, theme }: FeaturesSectionProps) {
  switch (variant) {
    case 1:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Our platform provides all the tools you need to succeed. Here's what sets us apart.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="rounded-full bg-muted p-2">
                    <div className="h-6 w-6 rounded-full bg-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold">Feature {i}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case 2:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Powerful Features for Your Business</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform is designed to help you grow and succeed.
                </p>
                <ul className="grid gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">Feature {i}: Lorem ipsum dolor sit amet</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-square rounded-xl bg-background overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Feature Image
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 3:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Discover what makes our platform stand out from the competition.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col space-y-4 rounded-lg border p-6">
                  <div className="rounded-full bg-primary/10 p-2 w-fit">
                    <div className="h-6 w-6 rounded-full bg-primary/20" />
                  </div>
                  <h3 className="text-xl font-bold">Feature {i}</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </p>
                  <a href="#" className="text-sm font-medium text-primary hover:underline">
                    Learn more
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case 4:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Features That Make a Difference</h2>
                <p className="text-muted-foreground md:text-xl">
                  Our platform is packed with powerful features to help you succeed.
                </p>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="aspect-video rounded-xl bg-muted overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Features Overview
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-2">
                  <div className="rounded-full bg-muted p-3">
                    <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
                  </div>
                  <h3 className="text-lg font-bold">Feature {i}</h3>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case 5:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Advanced Features</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Our platform offers cutting-edge features to help you stay ahead.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-start gap-4 rounded-lg bg-background p-6">
                  <div className="rounded-full bg-primary/10 p-2">
                    <div className="h-6 w-6 rounded-full bg-primary/20" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold">Feature {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    default:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Our platform provides all the tools you need to succeed. Here's what sets us apart.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 rounded-lg p-4">
                  <div className="rounded-full bg-muted p-2">
                    <div className="h-6 w-6 rounded-full bg-muted-foreground/20" />
                  </div>
                  <h3 className="text-xl font-bold">Feature {i}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
  }
}
