"use client"

import { EditableText } from "../editable-text"
import { Button } from "@/components/ui/button"

interface HeroProps {
  variant?: number
}

export function Hero({ variant = 0 }: HeroProps) {
  const componentId = "hero"

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // Centered hero with image on top
      return (
        <section className="py-40" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-10 w-full max-w-2xl">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center mb-8">
                  <span className="text-gray-500">Hero Image</span>
                </div>
                <div className="mb-6">
                  <EditableText
                    content="Sync. Sort. Ship."
                    className="text-5xl font-bold mb-4 tracking-tighter"
                    style={{
                      color: "var(--text-color)",
                      fontFamily: "var(--font-family)",
                    }}
                    tag="h1"
                    componentId={componentId}
                    elementId="title"
                  />
                </div>
                <div className="mb-8">
                  <EditableText
                    content="Let algorithms rank tasks on what truly needs your attention."
                    className="text-lg text-pretty text-gray-600"
                    style={{ color: "var(--secondary-color)" }}
                    tag="p"
                    componentId={componentId}
                    elementId="description"
                  />
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#ffffff",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Get Started"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="primaryCta"
                    />
                  </Button>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: "var(--secondary-color)",
                      borderWidth: "1px",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Learn More"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="secondaryCta"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    case 2:
      // Dark background hero with gradient
      return (
        <section className="py-40" style={{ backgroundColor: "var(--primary-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <div className="mb-6">
                  <EditableText
                    content="Sync. Sort. Ship."
                    className="text-5xl font-bold mb-4 tracking-tighter"
                    style={{
                      color: "#ffffff",
                      fontFamily: "var(--font-family)",
                    }}
                    tag="h1"
                    componentId={componentId}
                    elementId="title"
                  />
                </div>
                <div className="mb-8">
                  <EditableText
                    content="Let algorithms rank tasks on what truly needs your attention."
                    className="text-lg"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    tag="p"
                    componentId={componentId}
                    elementId="description"
                  />
                </div>
                <div className="flex space-x-4">
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
                      content="Get Started"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="primaryCta"
                    />
                  </Button>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: "#ffffff",
                      borderWidth: "1px",
                      color: "#ffffff",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Watch Demo"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="secondaryCta"
                    />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-700 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-300">Hero Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )

    default:
      // Default hero (original)
      return (
        <section className="py-40" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <div className="mb-6">
                  <EditableText
                    content="Sync. Sort. Ship."
                    className="text-5xl font-bold mb-4 tracking-tighter"
                    style={{
                      color: "var(--text-color)",
                      fontFamily: "var(--font-family)",
                    }}
                    tag="h1"
                    componentId={componentId}
                    elementId="title"
                  />
                </div>
                <div className="mb-8">
                  <EditableText
                    content="Let algorithms rank tasks on what truly needs your attention."
                    className="text-lg text-gray-600"
                    style={{ color: "var(--secondary-color)" }}
                    tag="p"
                    componentId={componentId}
                    elementId="description"
                  />
                </div>
                <div className="flex space-x-4">
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    className="font-medium"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#ffffff",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Get Started"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="primaryCta"
                    />
                  </Button>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: "var(--secondary-color)",
                      borderWidth: "1px",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Learn More"
                      className="font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId="secondaryCta"
                    />
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                  <span className="text-gray-500">Hero Image</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )
  }
}
