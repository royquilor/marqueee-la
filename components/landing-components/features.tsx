"use client"

import { EditableText } from "../editable-text"
import { useState, useEffect } from "react"
import { useComponentStore } from "@/hooks/use-component-store"

interface FeaturesProps {
  variant?: number
}

export function Features({ variant = 0 }: FeaturesProps) {
  const componentId = "features"
  const { content: storedContent } = useComponentStore()

  const defaultFeatures = [
    {
      title: "Easy to Use",
      description: "Our intuitive interface makes it simple to create beautiful websites without any coding knowledge.",
    },
    {
      title: "Responsive Design",
      description: "All components are fully responsive and look great on any device, from mobile to desktop.",
    },
    {
      title: "Customizable",
      description: "Easily customize colors, fonts, and layouts to match your brand and vision.",
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed to ensure your website loads quickly and provides a great user experience.",
    },
  ]

  // Initialize features from localStorage if available
  const [features, setFeatures] = useState(defaultFeatures)

  // Load features from localStorage on client-side
  useEffect(() => {
    const loadedFeatures = []
    for (let i = 0; i < defaultFeatures.length; i++) {
      loadedFeatures.push({
        title: storedContent[componentId]?.[`feature-${i}-title`] || defaultFeatures[i].title,
        description: storedContent[componentId]?.[`feature-${i}-description`] || defaultFeatures[i].description,
      })
    }
    setFeatures(loadedFeatures)
  }, [storedContent, componentId])

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      // Horizontal feature cards with icons on the left
      return (
        <section className="py-40" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="Features"
                className="text-3xl font-bold mb-4 tracking-tighter"
                tag="h2"
                componentId={componentId}
                elementId="sectionTitle"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Everything you need to create stunning websites quickly and easily."
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                tag="p"
                componentId={componentId}
                elementId="sectionDescription"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-2 p-6"
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "var(--border-radius)",
                  }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl">✦</span>
                  </div>
                  <div>
                    <EditableText
                      content={feature.title}
                      className="text-xl font-semibold mb-2"
                      tag="h3"
                      componentId={componentId}
                      elementId={`feature-${index}-title`}
                      style={{ color: "var(--text-color)" }}
                    />
                    <EditableText
                      content={feature.description}
                      className="text-gray-600"
                      tag="p"
                      componentId={componentId}
                      elementId={`feature-${index}-description`}
                      style={{ color: "var(--secondary-color)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )

    case 2:
      // Features with alternating image and text
      return (
        <section className="py-40" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="Key Features"
                className="text-3xl font-bold mb-4 tracking-tighter"
                tag="h2"
                componentId={componentId}
                elementId="sectionTitle"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Discover what makes our platform stand out from the competition."
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                tag="p"
                componentId={componentId}
                elementId="sectionDescription"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>

            {features.slice(0, 2).map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12 py-12 border-b border-gray-200`}
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                <div className="md:w-1/2">
                  <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
                    <span className="text-gray-500">Feature Image {index + 1}</span>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <EditableText
                    content={feature.title}
                    className="text-2xl font-semibold mb-4"
                    tag="h3"
                    componentId={componentId}
                    elementId={`feature-${index}-title`}
                    style={{ color: "var(--text-color)" }}
                  />
                  <EditableText
                    content={feature.description}
                    className="text-gray-600 mb-6"
                    tag="p"
                    componentId={componentId}
                    elementId={`feature-${index}-description`}
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <button
                    className="px-4 py-2 text-sm font-medium rounded-md"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "#ffffff",
                      borderRadius: "var(--border-radius)",
                    }}
                  >
                    <EditableText
                      content="Learn More"
                      className="text-sm font-medium"
                      tag="span"
                      componentId={componentId}
                      elementId={`feature-${index}-cta`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )

    default:
      // Default grid layout (original)
      return (
        <section className="py-40" style={{ backgroundColor: "var(--background-color)" }}>
          <div className="container-enforcer mx-auto px-4" style={{ maxWidth: "var(--container-width)" }}>
            <div className="text-center mb-16">
              <EditableText
                content="Features"
                className="text-3xl font-bold mb-4 tracking-tighter"
                tag="h2"
                componentId={componentId}
                elementId="sectionTitle"
                style={{
                  color: "var(--text-color)",
                  fontFamily: "var(--font-family)",
                  marginBottom: "1rem",
                }}
              />
              <EditableText
                content="Everything you need to create stunning websites quickly and easily."
                className="text-lg text-gray-600 max-w-2xl mx-auto"
                tag="p"
                componentId={componentId}
                elementId="sectionDescription"
                style={{ color: "var(--secondary-color)" }}
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    paddingTop: "var(--spacing)",
                    paddingRight: "var(--spacing)",
                    paddingBottom: "var(--spacing)",
                    paddingLeft: "var(--spacing)",
                    borderRadius: "var(--border-radius)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl">✦</span>
                  </div>
                  <EditableText
                    content={feature.title}
                    className="text-xl font-semibold mb-2"
                    tag="h3"
                    componentId={componentId}
                    elementId={`feature-${index}-title`}
                  />
                  <EditableText
                    content={feature.description}
                    className="text-gray-600"
                    tag="p"
                    componentId={componentId}
                    elementId={`feature-${index}-description`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
  }
}
