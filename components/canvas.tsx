"use client"

import React from "react"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Section, Theme } from "@/lib/types"
import { SectionRenderer } from "@/components/section-renderer"

interface CanvasProps {
  sections: Section[]
  theme: Theme
  onCycleVariant: (sectionId: string, direction: "next" | "prev") => void
  onMoveSection: (sectionId: string, direction: "up" | "down") => void
  onDeleteSection: (sectionId: string) => void
  selectedSectionId: string | null
  setSelectedSectionId: (id: string | null) => void
}

export function Canvas({
  sections,
  theme,
  onCycleVariant,
  onMoveSection,
  onDeleteSection,
  selectedSectionId,
  setSelectedSectionId,
}: CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  // Track if we're currently cycling variants to prevent animations
  const [isCyclingVariant, setIsCyclingVariant] = React.useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedSectionId) return

      switch (e.key) {
        case "ArrowRight":
          setIsCyclingVariant(true)
          onCycleVariant(selectedSectionId, "next")
          // Reset after a short delay
          setTimeout(() => setIsCyclingVariant(false), 50)
          break
        case "ArrowLeft":
          setIsCyclingVariant(true)
          onCycleVariant(selectedSectionId, "prev")
          // Reset after a short delay
          setTimeout(() => setIsCyclingVariant(false), 50)
          break
        case "ArrowUp":
          onMoveSection(selectedSectionId, "up")
          break
        case "ArrowDown":
          onMoveSection(selectedSectionId, "down")
          break
        case "Delete":
        case "Backspace":
          onDeleteSection(selectedSectionId)
          setSelectedSectionId(null)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedSectionId, onCycleVariant, onMoveSection, onDeleteSection, setSelectedSectionId])

  // Clear selection when clicking outside of sections
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (canvasRef.current && !canvasRef.current.contains(e.target as Node)) {
        setSelectedSectionId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setSelectedSectionId])

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId)
  }

  // Section animation variants
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  return (
    <div
      ref={canvasRef}
      className="w-full min-h-screen flex flex-col relative" // Added relative positioning
      style={
        {
          "--container-width": theme.containerWidth,
          fontFamily: theme.fontFamily,
          minHeight: "100vh", // Ensure minimum height
          paddingBottom: "80px", // Add padding at the bottom to make space for the menu
        } as React.CSSProperties
      }
    >
      <AnimatePresence initial={false}>
        {sections.map((section) => (
          <motion.div
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className="relative group w-full"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout={!isCyclingVariant} // Disable layout animations during variant cycling
            layoutId={isCyclingVariant ? undefined : section.id} // Remove layoutId during variant cycling
            style={{ contain: "content" }} // Add CSS containment to prevent layout shifts
          >
            <SectionRenderer
              section={section}
              theme={theme}
              isSelected={selectedSectionId === section.id}
              isCyclingVariant={isCyclingVariant && selectedSectionId === section.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
