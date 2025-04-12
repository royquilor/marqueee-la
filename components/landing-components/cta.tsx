"use client"

import { EditableText } from "../editable-text"
import { Button } from "@/components/ui/button"

interface CTAProps {
  variant?: number
}

export function CTA({ variant = 0 }: CTAProps) {
  const componentId = "cta"

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // CTA with image background
      return (
        <section
          className="py-40 text-white theme-transition relative"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div
            className="container-enforcer mx-auto px-4 text-center relative z-10"
            style={{ maxWidth: "var(--container-width)" }}
          >
            <EditableText
              content="Take your website to the next level"
              className="text-3xl font-bold mb-6"
              tag="h2"
              componentId={componentId}
              elementId="title"
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-family)",
                marginBottom: "1.5rem",
              }}
            />
            <EditableText
              content="Start building your dream website today with our powerful platform."
              className="text-lg mb-8 max-w-lg mx-auto text-balance"
              tag="p"
              componentId={componentId}
              elementId="subtitle"
              style={{ color: "rgba(255, 255, 255, 0.9)" }}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={(e) => e.stopPropagation()}
                className="font-medium"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--primary-color)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <EditableText
                  content="Get Started Free"
                  className="font-medium"
                  tag="span"
                  componentId={componentId}
                  elementId="primary-cta"
                />
              </Button>
            </div>
          </div>
        </section>
      )

    default:
      // Default CTA (original)
      return (
        <section className="py-40 text-white theme-transition" style={{ backgroundColor: "var(--primary-color)" }}>
          <div className="container-enforcer mx-auto px-4 text-center" style={{ maxWidth: "var(--container-width)" }}>
            <EditableText
              content="Ready to get started?"
              className="text-3xl font-bold mb-6"
              tag="h2"
              componentId={componentId}
              elementId="title"
              style={{
                color: "#ffffff",
                fontFamily: "var(--font-family)",
                marginBottom: "1.5rem",
              }}
            />
            <EditableText
              content="Join thousands of users who are already building beautiful websites with our platform."
              className="text-lg mb-8 max-w-lg text-balance mx-auto"
              tag="p"
              componentId={componentId}
              elementId="subtitle"
              style={{ color: "rgba(255, 255, 255, 0.9)" }}
            />
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                onClick={(e) => e.stopPropagation()}
                className="font-medium"
                style={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <EditableText
                  content="Start Building Now"
                  className="font-medium"
                  tag="span"
                  componentId={componentId}
                  elementId="primary-cta"
                />
              </Button>
              <Button
                onClick={(e) => e.stopPropagation()}
                variant="outline"
                className="font-medium"
                style={{
                  borderColor: "#ffffff",
                  borderRadius: "var(--border-radius)",
                  color: "#ffffff",
                }}
              >
                <EditableText
                  content="Schedule a Demo"
                  className="font-medium"
                  tag="span"
                  componentId={componentId}
                  elementId="secondary-cta"
                />
              </Button>
            </div>
          </div>
        </section>
      )
  }
}
