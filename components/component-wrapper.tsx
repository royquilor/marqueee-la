"use client"

import type React from "react"

import { useComponentStore } from "@/hooks/use-component-store"
import { useVariantStore } from "@/hooks/use-variant-store"
import { useEffect, useState, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface ComponentWrapperProps {
  index: number
  children: React.ReactNode
  isNewlyAdded?: boolean
  componentId: string
}

export const ComponentWrapper = forwardRef<HTMLDivElement, ComponentWrapperProps>(function ComponentWrapper(
  { index, children, isNewlyAdded = false, componentId },
  ref,
) {
  const { selectedComponent, selectComponent, removeSelectedComponent, reorderComponents, components } =
    useComponentStore()
  const { cycleVariant } = useVariantStore()

  const isSelected = selectedComponent === index
  const [wasSelected, setWasSelected] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [reorderDirection, setReorderDirection] = useState<"up" | "down" | null>(null)
  const [showVariantHint, setShowVariantHint] = useState(false)

  // Improve the animation handling in ComponentWrapper
  useEffect(() => {
    if ((isSelected && !wasSelected) || isNewlyAdded) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 400) // Reduced animation duration for smoother effect
      return () => clearTimeout(timer)
    }
    setWasSelected(isSelected)
  }, [isSelected, wasSelected, isNewlyAdded])

  // Handle reorder animation
  useEffect(() => {
    if (reorderDirection) {
      const timer = setTimeout(() => {
        setReorderDirection(null)
      }, 500) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [reorderDirection])

  // Show variant hint when component is selected
  useEffect(() => {
    if (isSelected) {
      setShowVariantHint(true)
      const timer = setTimeout(() => {
        setShowVariantHint(false)
      }, 3000) // Hide after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [isSelected])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSelected) return

      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault()
        removeSelectedComponent()
      } else if (e.key === "Escape") {
        e.preventDefault()
        selectComponent(null)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (index > 0) {
          setReorderDirection("up")
          reorderComponents(index, index - 1)
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (index < components.length - 1) {
          setReorderDirection("down")
          reorderComponents(index, index + 1)
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        // Cycle to next variant
        const componentId = components[index]
        cycleVariant(componentId, "next")
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 600)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        // Cycle to previous variant
        const componentId = components[index]
        cycleVariant(componentId, "prev")
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 600)
      }
    }

    if (isSelected) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isSelected, removeSelectedComponent, selectComponent, index, reorderComponents, components, cycleVariant])

  return (
    <div
      id={`section-${componentId}-${index}`}
      ref={ref}
      className={cn(
        "relative transition-all duration-200", // Reduced duration for smoother animation
        isAnimating && "animate-pulse-glow",
        isNewlyAdded && "animate-shimmer",
        reorderDirection === "up" && "animate-move-up",
        reorderDirection === "down" && "animate-move-down",
      )}
      style={{
        boxShadow: isSelected ? `0 0 0 2px var(--primary-color)` : "none",
        borderRadius: isSelected ? "var(--border-radius)" : "0",
      }}
      onClick={(e) => {
        // Only select if clicking the wrapper itself, not a child element that's being edited
        if (e.target === e.currentTarget || !e.target.closest(".ProseMirror")) {
          e.stopPropagation()
          selectComponent(index)
        }
      }}
    >
      <div
        className={cn(
          "transition-all duration-300",
          isAnimating && "bg-black bg-opacity-[0.02]",
          isNewlyAdded && "bg-black bg-opacity-[0.03]",
        )}
      >
        {children}
      </div>
      {isSelected && <></>}
    </div>
  )
})
