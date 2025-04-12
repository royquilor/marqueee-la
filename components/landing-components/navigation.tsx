"use client"

import { EditableText } from "../editable-text"
import { useEffect, useState } from "react"
import { useComponentStore } from "@/hooks/use-component-store"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  variant?: number
}

export function Navigation({ variant = 0 }: NavigationProps) {
  const componentId = "nav"
  const { content } = useComponentStore()
  const [isInitialized, setIsInitialized] = useState(false)

  // Ensure component is properly initialized
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
    }
  }, [isInitialized])

  // Render different variants based on the variant prop
  switch (variant) {
    case 1:
      return (
        <header className="border-b border-gray-200" style={{ backgroundColor: "var(--background-color)" }}>
          <div
            className="container-enforcer mx-auto px-4 py-4 flex flex-col items-center"
            style={{ maxWidth: "var(--container-width)" }}
          >
            <div className="mb-4">
              <EditableText
                content="Brand"
                className="text-xl font-bold"
                tag="span"
                componentId={componentId}
                elementId="brand"
                style={{ color: "var(--text-color)", fontFamily: "var(--font-family)" }}
              />
            </div>
            <nav className="flex items-center space-x-8" onClick={(e) => e.stopPropagation()}>
              <div>
                <EditableText
                  content="Home"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link1"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Features"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link2"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Pricing"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link3"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="About"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link4"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Contact"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link5"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
            </nav>
          </div>
        </header>
      )

    case 2:
      return (
        <header className="border-b border-gray-200" style={{ backgroundColor: "var(--primary-color)" }}>
          <div
            className="container-enforcer mx-auto px-4 py-4 flex items-center justify-between"
            style={{ maxWidth: "var(--container-width)" }}
          >
            <div className="flex items-center">
              <EditableText
                content="Brand"
                className="text-xl font-bold"
                tag="span"
                componentId={componentId}
                elementId="brand"
                style={{ color: "#ffffff", fontFamily: "var(--font-family)" }}
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8" onClick={(e) => e.stopPropagation()}>
              <div>
                <EditableText
                  content="Home"
                  className="text-sm font-medium hover:text-gray-300"
                  tag="span"
                  componentId={componentId}
                  elementId="link1"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <div>
                <EditableText
                  content="Features"
                  className="text-sm font-medium hover:text-gray-300"
                  tag="span"
                  componentId={componentId}
                  elementId="link2"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <div>
                <EditableText
                  content="Pricing"
                  className="text-sm font-medium hover:text-gray-300"
                  tag="span"
                  componentId={componentId}
                  elementId="link3"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <div>
                <EditableText
                  content="About"
                  className="text-sm font-medium hover:text-gray-300"
                  tag="span"
                  componentId={componentId}
                  elementId="link4"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <div>
                <EditableText
                  content="Contact"
                  className="text-sm font-medium hover:text-gray-300"
                  tag="span"
                  componentId={componentId}
                  elementId="link5"
                  style={{ color: "#ffffff" }}
                />
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                onClick={(e) => e.stopPropagation()}
                className=""
                size="sm"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--primary-color)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <EditableText
                  content="Sign Up"
                  className="text-sm font-medium"
                  tag="span"
                  componentId={componentId}
                  elementId="cta"
                />
              </Button>
            </div>
          </div>
        </header>
      )

    default:
      return (
        <header className="border-b border-gray-200" style={{ backgroundColor: "var(--background-color)" }}>
          <div
            className="container-enforcer mx-auto px-4 py-4 flex items-center justify-between"
            style={{ maxWidth: "var(--container-width)" }}
          >
            <div className="flex items-center">
              <EditableText
                content="Brand"
                className="text-xl font-bold"
                tag="span"
                componentId={componentId}
                elementId="brand"
                style={{ color: "var(--text-color)", fontFamily: "var(--font-family)" }}
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8" onClick={(e) => e.stopPropagation()}>
              <div>
                <EditableText
                  content="Home"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link1"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Features"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link2"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Pricing"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link3"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="About"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link4"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
              <div>
                <EditableText
                  content="Contact"
                  className="text-sm font-medium hover:text-gray-600"
                  tag="span"
                  componentId={componentId}
                  elementId="link5"
                  style={{ color: "var(--secondary-color)" }}
                />
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "#ffffff",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <EditableText
                  content="Sign Up"
                  className="text-sm font-medium"
                  tag="span"
                  componentId={componentId}
                  elementId="cta"
                />
              </Button>
            </div>
          </div>
        </header>
      )
  }
}
