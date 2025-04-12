"use client"

import { useState, useEffect, useRef } from "react"
import { useComponentStore } from "./use-component-store"
import { componentNames } from "@/components/canvas"

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const previousSectionRef = useRef<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const { components } = useComponentStore()

  useEffect(() => {
    // Function to check which section is in view
    const checkActiveSection = () => {
      // Get all section elements
      const sections = components
        .map((componentId, index) => {
          const element = document.getElementById(`section-${componentId}-${index}`)
          return { id: componentId, element, index }
        })
        .filter((item) => item.element !== null)

      if (sections.length === 0) return

      // Find the section that is most visible in the viewport
      let mostVisibleSection = null
      let maxVisiblePercentage = 0

      sections.forEach(({ id, element, index }) => {
        if (!element) return

        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calculate how much of the section is visible
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(windowHeight, rect.bottom)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visiblePercentage = visibleHeight / rect.height

        // If this section is more visible than the current most visible section, update
        if (visiblePercentage > maxVisiblePercentage) {
          maxVisiblePercentage = visiblePercentage
          mostVisibleSection = id
        }
      })

      // Only update if the section has changed and is significantly visible
      if (mostVisibleSection !== activeSection && maxVisiblePercentage > 0.2) {
        // Clear any existing debounce timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }

        // Set a debounce timer to update the section after a short delay
        debounceTimerRef.current = setTimeout(() => {
          previousSectionRef.current = activeSection
          setActiveSection(mostVisibleSection)
          debounceTimerRef.current = null
        }, 100) // 100ms debounce delay
      }
    }

    // Add scroll event listener with throttling
    let scrollTimeout: NodeJS.Timeout | null = null
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          checkActiveSection()
          scrollTimeout = null
        }, 50) // 50ms throttle
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Initial check
    checkActiveSection()

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [components, activeSection])

  // Get the display name for the active section
  const activeSectionName = activeSection ? componentNames[activeSection as keyof typeof componentNames] : "Components"

  // Check if the section has changed
  const hasChanged = activeSection !== previousSectionRef.current && previousSectionRef.current !== null

  return { activeSection, activeSectionName, hasChanged }
}
