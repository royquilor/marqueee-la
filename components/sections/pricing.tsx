"use client"

import { Button } from "@/components/ui/button"
import type { Theme } from "@/lib/types"
import { Check } from "lucide-react"

interface PricingSectionProps {
  variant: number
  theme: Theme
}

export function PricingSection({ variant, theme }: PricingSectionProps) {
  switch (variant) {
    case 1:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for you and get started today.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
              {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                <div key={plan} className="flex flex-col rounded-lg border bg-card p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">{plan}</h3>
                    <div className="text-3xl font-bold">
                      ${i === 0 ? "9" : i === 1 ? "19" : "49"}
                      <span className="text-sm font-normal">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {i === 0
                        ? "For individuals just getting started"
                        : i === 1
                          ? "For growing businesses"
                          : "For large organizations"}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {[
                      i === 0 ? "5 projects" : i === 1 ? "20 projects" : "Unlimited projects',s' : 'Unlimited projects",
                      i === 0 ? "5GB storage" : i === 1 ? "50GB storage" : "Unlimited storage",
                      i === 0 ? "Basic analytics" : i === 1 ? "Advanced analytics" : "Custom analytics",
                      i === 1 || i === 2 ? "Priority support" : null,
                      i === 2 ? "Custom branding" : null,
                    ]
                      .filter(Boolean)
                      .map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full" variant={i === 1 ? "primary" : "outline"}>
                      {i === 1 ? "Get Started" : "Learn More"}
                    </Button>
                  </div>
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Choose Your Plan</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  We have plans for businesses of all sizes. Start with our free tier and upgrade as you grow.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              {["Free", "Starter", "Pro", "Enterprise"].map((plan, i) => (
                <div
                  key={plan}
                  className={`flex flex-col rounded-lg border ${i === 2 ? "border-primary" : ""} bg-card p-6`}
                >
                  {i === 2 && (
                    <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-4 self-start">
                      Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-bold">{plan}</h3>
                    <div className="text-3xl font-bold">
                      {i === 0 ? "Free" : `${i === 1 ? "12" : i === 2 ? "29" : "99"}`}
                      {i > 0 && <span className="text-sm font-normal">/month</span>}
                    </div>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm flex-1">
                    {[
                      i === 0 ? "1 project" : i === 1 ? "10 projects" : i === 2 ? "50 projects" : "Unlimited projects",
                      i === 0
                        ? "1GB storage"
                        : i === 1
                          ? "10GB storage"
                          : i === 2
                            ? "100GB storage"
                            : "Unlimited storage",
                      i >= 1 ? "Priority support" : "Email support",
                      i >= 2 ? "Custom domain" : null,
                      i >= 3 ? "SLA guarantee" : null,
                    ]
                      .filter(Boolean)
                      .map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full" variant={i === 2 ? "primary" : "outline"}>
                      {i === 0 ? "Sign Up" : "Subscribe"}
                    </Button>
                  </div>
                </div>
              ))}
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Pricing Plans</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Choose the perfect plan for your needs. All plans include a 14-day free trial.
                </p>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <span className="text-sm font-medium">Monthly</span>
                <div className="h-6 w-12 rounded-full bg-muted p-1">
                  <div className="h-4 w-4 rounded-full bg-primary ml-auto" />
                </div>
                <span className="text-sm font-medium">Yearly (Save 20%)</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
              {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                <div
                  key={plan}
                  className={`flex flex-col rounded-lg border ${i === 1 ? "border-primary" : ""} bg-card p-6`}
                >
                  <div className="space-y-2">
                    <h3 className="font-bold">{plan}</h3>
                    <div className="text-3xl font-bold">
                      ${i === 0 ? "15" : i === 1 ? "30" : "75"}
                      <span className="text-sm font-normal">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Billed annually (${i === 0 ? "18" : i === 1 ? "36" : "90"}/month billed monthly)
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {[
                      i === 0 ? "3 team members" : i === 1 ? "10 team members" : "Unlimited team members",
                      i === 0 ? "10GB storage" : i === 1 ? "100GB storage" : "Unlimited storage",
                      i === 0 ? "Basic reporting" : i === 1 ? "Advanced reporting" : "Custom reporting",
                      i >= 1 ? "24/7 support" : null,
                      i >= 2 ? "Dedicated account manager" : null,
                    ]
                      .filter(Boolean)
                      .map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full" variant={i === 1 ? "primary" : "outline"}>
                      Start Free Trial
                    </Button>
                  </div>
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Flexible Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Pay only for what you need. No hidden fees or long-term commitments.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="rounded-lg border bg-card overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4">
                  <div className="p-6 bg-muted">
                    <div className="space-y-4">
                      <h3 className="font-bold">Features</h3>
                      <ul className="space-y-6 text-sm">
                        <li className="font-medium">Projects</li>
                        <li className="font-medium">Storage</li>
                        <li className="font-medium">Users</li>
                        <li className="font-medium">Support</li>
                        <li className="font-medium">Custom Domain</li>
                      </ul>
                      <div className="pt-4 mt-auto">
                        <span className="font-bold">Price</span>
                      </div>
                    </div>
                  </div>
                  {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                    <div key={plan} className="p-6 border-t md:border-t-0 md:border-l">
                      <div className="space-y-4">
                        <h3 className="font-bold">{plan}</h3>
                        <ul className="space-y-6 text-sm">
                          <li>{i === 0 ? "5" : i === 1 ? "20" : "Unlimited"}</li>
                          <li>{i === 0 ? "10GB" : i === 1 ? "100GB" : "Unlimited"}</li>
                          <li>{i === 0 ? "3" : i === 1 ? "10" : "Unlimited"}</li>
                          <li>{i === 0 ? "Email" : i === 1 ? "Priority" : "24/7 Dedicated"}</li>
                          <li>{i === 0 ? "❌" : <Check className="h-4 w-4 text-primary" />}</li>
                        </ul>
                        <div className="pt-4">
                          <div className="text-xl font-bold">
                            ${i === 0 ? "19" : i === 1 ? "49" : "99"}
                            <span className="text-sm font-normal">/mo</span>
                          </div>
                          <Button className="w-full mt-2" variant={i === 1 ? "primary" : "outline"}>
                            {i === 1 ? "Get Started" : "Choose Plan"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  No complicated tiers. Just choose the plan that works for you.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
              {["Standard", "Premium"].map((plan, i) => (
                <div key={plan} className="flex flex-col rounded-lg border bg-card p-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan}</h3>
                    <div className="text-4xl font-bold">
                      ${i === 0 ? "29" : "79"}
                      <span className="text-sm font-normal">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {i === 0 ? "Perfect for small teams and startups" : "For growing businesses and agencies"}
                    </p>
                  </div>
                  <div className="mt-8 space-y-4">
                    <h4 className="text-sm font-bold uppercase tracking-wide">What's included</h4>
                    <ul className="space-y-3 text-sm">
                      {[
                        i === 0 ? "Up to 10 team members" : "Unlimited team members",
                        i === 0 ? "50GB storage" : "Unlimited storage",
                        "All core features",
                        i === 0 ? "Basic analytics" : "Advanced analytics",
                        i === 1 ? "Custom branding" : null,
                        i === 1 ? "API access" : null,
                        i === 1 ? "Dedicated support" : null,
                      ]
                        .filter(Boolean)
                        .map((feature, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Button className="w-full" variant={i === 1 ? "primary" : "outline"}>
                      {i === 0 ? "Get Started" : "Upgrade Now"}
                    </Button>
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Choose the plan that's right for you and get started today.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-8">
              {["Basic", "Pro", "Enterprise"].map((plan, i) => (
                <div key={plan} className="flex flex-col rounded-lg border bg-card p-6">
                  <div className="space-y-2">
                    <h3 className="font-bold">{plan}</h3>
                    <div className="text-3xl font-bold">
                      ${i === 0 ? "9" : i === 1 ? "19" : "49"}
                      <span className="text-sm font-normal">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {i === 0
                        ? "For individuals just getting started"
                        : i === 1
                          ? "For growing businesses"
                          : "For large organizations"}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {[
                      i === 0 ? "5 projects" : i === 1 ? "20 projects" : "Unlimited projects",
                      i === 0 ? "5GB storage" : i === 1 ? "50GB storage" : "Unlimited storage",
                      i === 0 ? "Basic analytics" : i === 1 ? "Advanced analytics" : "Custom analytics",
                      i === 1 || i === 2 ? "Priority support" : null,
                      i === 2 ? "Custom branding" : null,
                    ]
                      .filter(Boolean)
                      .map((feature, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <Button className="w-full" variant={i === 1 ? "primary" : "outline"}>
                      {i === 1 ? "Get Started" : "Learn More"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
  }
}
