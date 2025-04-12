"use client"

import { Star } from "lucide-react"
import type { Theme } from "@/lib/types"

interface TestimonialsSectionProps {
  variant: number
  theme: Theme
}

export function TestimonialsSection({ variant, theme }: TestimonialsSectionProps) {
  const testimonials = [
    {
      quote: "This platform has completely transformed how we build websites. The AI-powered suggestions are spot on!",
      author: "Sarah Johnson",
      role: "Marketing Director",
    },
    {
      quote:
        "I've tried many website builders, but this one stands out. The customization options are endless and intuitive.",
      author: "Michael Chen",
      role: "Freelance Designer",
    },
    {
      quote: "The themes are beautiful and the AI personalization saved us countless hours of design work.",
      author: "Alex Rodriguez",
      role: "Startup Founder",
    },
    {
      quote:
        "Our conversion rates increased by 40% after switching to this platform. The designs just connect better with our audience.",
      author: "Emily Williams",
      role: "E-commerce Manager",
    },
  ]

  switch (variant) {
    case 1:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
              {testimonials.slice(0, 4).map((testimonial, i) => (
                <div key={i} className="flex flex-col justify-between rounded-lg border bg-card p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="rounded-full bg-muted h-10 w-10" />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
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
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Thousands</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  See what our customers have to say about their experience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-8">
              {testimonials.slice(0, 3).map((testimonial, i) => (
                <div key={i} className="flex flex-col justify-between rounded-lg bg-background p-6 shadow-sm">
                  <div className="space-y-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-primary"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Customers Love Us</h2>
                <p className="text-muted-foreground md:text-xl">
                  Don't just take our word for it. Read what our customers have to say.
                </p>
                <div className="flex space-x-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-muted ring-2 ring-background" />
                    ))}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Join over 2,000+ happy customers</p>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <div className="rounded-lg border bg-card p-6">
                  <div className="space-y-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-primary"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                    <p className="text-muted-foreground">"{testimonials[0].quote}"</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="rounded-full bg-muted h-10 w-10" />
                    <div>
                      <p className="font-medium">{testimonials[0].author}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[0].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    case 4:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Customer Success Stories</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Real feedback from real customers who have transformed their businesses with our platform.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <div className="rounded-lg border bg-card p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="aspect-square rounded-full bg-muted overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">Photo</div>
                    </div>
                  </div>
                  <div className="md:w-2/3 space-y-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 text-primary"
                    >
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                    </svg>
                    <p className="text-xl md:text-2xl font-medium">"{testimonials[0].quote}"</p>
                    <div>
                      <p className="font-bold text-lg">{testimonials[0].author}</p>
                      <p className="text-muted-foreground">{testimonials[0].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {testimonials.slice(1, 4).map((testimonial, i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-muted h-8 w-8" />
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    case 5:
      return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Testimonials</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Here's what our customers have to say about their experience.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="flex flex-col h-full rounded-lg border bg-card p-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-6 pt-6 border-t flex items-center space-x-3">
                    <div className="rounded-full bg-muted h-10 w-10" />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
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
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Don't just take our word for it. Here's what our customers have to say.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 mt-8">
              {testimonials.slice(0, 4).map((testimonial, i) => (
                <div key={i} className="flex flex-col justify-between rounded-lg border bg-card p-6">
                  <div className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="rounded-full bg-muted h-10 w-10" />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )
  }
}
