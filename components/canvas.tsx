"use client"

import type React from "react"

import { useComponentStore } from "@/hooks/use-component-store"
import { useVariantStore } from "@/hooks/use-variant-store"
import { Navigation } from "./landing-components/navigation"
import { Hero } from "./landing-components/hero"
import { Features } from "./landing-components/features"
import { Testimonials } from "./landing-components/testimonials"
import { Pricing } from "./landing-components/pricing"
import { CTA } from "./landing-components/cta"
import { Footer } from "./landing-components/footer"
import { useEffect, useState, useRef } from "react"
import { ComponentWrapper } from "./component-wrapper"

const componentMap = {
  nav: Navigation,
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  pricing: Pricing,
  cta: CTA,
  footer: Footer,
}

const componentNames = {
  nav: "Navigation",
  hero: "Hero",
  features: "Features",
  testimonials: "Testimonials",
  pricing: "Pricing",
  cta: "Call to Action",
  footer: "Footer",
}

export function Canvas() {
  const { components, selectComponent, lastAddedComponent, clearLastAdded } = useComponentStore()
  const { getVariant } = useVariantStore()
  const [isClient, setIsClient] = useState(false)
  const componentRefs = useRef<(HTMLDivElement | null)[]>([])

  // This ensures we only render after hydration to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update the scroll behavior for newly added components
  useEffect(() => {
    if (lastAddedComponent !== null && componentRefs.current[lastAddedComponent]) {
      // Scroll the component into view with a slight delay to ensure rendering is complete
      setTimeout(() => {
        componentRefs.current[lastAddedComponent]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })

        // Add a highlight animation to the new component
        const element = componentRefs.current[lastAddedComponent]
        if (element) {
          element.classList.add("animate-pulse-glow")
          setTimeout(() => {
            element.classList.remove("animate-pulse-glow")
            clearLastAdded() // Clear the last added component after animation
          }, 800) // Match the animation duration
        }
      }, 50) // Reduced delay for more immediate feedback
    }
  }, [lastAddedComponent, clearLastAdded])

  // Handle click on the canvas background to deselect
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      selectComponent(null)
    }
  }

  // Set up component refs
  const setComponentRef = (index: number, el: HTMLDivElement | null) => {
    componentRefs.current[index] = el
  }

  if (!isClient) {
    return <div className="min-h-screen w-full"></div>
  }

  return (
    <div className="min-h-screen w-full theme-transition bg-theme-background" onClick={handleCanvasClick}>
      {components.map((componentId, index) => {
        const Component = componentMap[componentId as keyof typeof componentMap]
        const variant = getVariant(componentId)

        return (
          <ComponentWrapper
            key={`${componentId}-${index}`}
            index={index}
            componentId={componentId}
            ref={(el) => setComponentRef(index, el)}
            isNewlyAdded={lastAddedComponent === index}
          >
            <Component variant={variant} />
          </ComponentWrapper>
        )
      })}
    </div>
  )
}

// Export component names for use in the dynamic island
export { componentNames }
