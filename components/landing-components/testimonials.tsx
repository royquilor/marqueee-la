"use client"

import { EditableText } from "../editable-text"

interface TestimonialsProps {
  variant?: number
}

export function Testimonials({ variant = 0 }: TestimonialsProps) {
  const componentId = "testimonials"

  const testimonials = [
    {
      quote:
        "This tool has completely transformed how I build websites. It's so intuitive and the results are amazing.",
      author: "Sarah Johnson",
      role: "Designer at CreativeStudio",
    },
    {
      quote:
        "I was able to launch my business website in just a few hours. The components are beautiful and easy to customize.",
      author: "Michael Chen",
      role: "Founder of TechStart",
    },
    {
      quote:
        "The best website builder I've ever used. The AI assistant makes it feel like having a professional designer by my side.",
      author: "Emma Rodriguez",
      role: "Marketing Director",
    },
  ]

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // Single featured testimonial with large quote
      return (
        <section className="py-40 theme-transition" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-12">
              <EditableText
                content="What our users say"
                className="text-3xl font-bold mb-4"
                tag="h2"
                componentId={componentId}
                elementId="title"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-5xl mb-8" style={{ color: "var(--primary-color)" }}>
                "
              </div>
              <EditableText
                content={testimonials[0].quote}
                className="text-2xl mb-8 italic"
                tag="p"
                componentId={componentId}
                elementId="quote-featured"
                style={{ color: "var(--text-color)" }}
              />
              <div className="flex justify-center items-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div className="text-left">
                  <EditableText
                    content={testimonials[0].author}
                    className="font-semibold"
                    tag="p"
                    componentId={componentId}
                    elementId="author-featured"
                    style={{ color: "var(--text-color)" }}
                  />
                  <EditableText
                    content={testimonials[0].role}
                    className="text-sm"
                    tag="p"
                    componentId={componentId}
                    elementId="role-featured"
                    style={{ color: "var(--secondary-color)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    default:
      // Default grid layout (original)
      return (
        <section className="py-40 theme-transition" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="What our users say"
                className="text-3xl font-bold mb-4"
                tag="h2"
                componentId={componentId}
                elementId="title"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Don't just take our word for it. Here's what people are saying about our platform."
                className="text-lg max-w-xl text-balance mx-auto"
                tag="p"
                componentId={componentId}
                elementId="subtitle"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="theme-transition"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "var(--border-radius)",
                    paddingTop: "var(--spacing)",
                    paddingRight: "var(--spacing)",
                    paddingBottom: "var(--spacing)",
                    paddingLeft: "var(--spacing)",
                  }}
                >
                  <EditableText
                    content={`"${testimonial.quote}"`}
                    className="text-lg mb-6 italic"
                    tag="p"
                    componentId={componentId}
                    elementId={`quote-${index}`}
                    style={{ color: "var(--text-color)" }}
                  />
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <EditableText
                        content={testimonial.author}
                        className="font-semibold"
                        tag="p"
                        componentId={componentId}
                        elementId={`author-${index}`}
                        style={{ color: "var(--text-color)" }}
                      />
                      <EditableText
                        content={testimonial.role}
                        className="text-sm"
                        tag="p"
                        componentId={componentId}
                        elementId={`role-${index}`}
                        style={{ color: "var(--secondary-color)" }}
                      />
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
