"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

interface SectionsMenuProps {
  onAddSection: (sectionType: string) => void
  onResetSections: () => void
  hasSections: boolean
}

export function SectionsMenu({ onAddSection, onResetSections, hasSections }: SectionsMenuProps) {
  const sectionTypes = ["nav", "hero", "features", "pricing", "cta", "testimonials", "footer"]
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([])

  // Handle keyboard navigation and Enter key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const activeElement = document.activeElement as HTMLButtonElement
        const sectionType = activeElement.getAttribute("data-section-type")

        if (sectionType && sectionTypes.includes(sectionType)) {
          onAddSection(sectionType)
          e.preventDefault()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onAddSection, sectionTypes])

  // Button animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  }

  const buttonVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 700,
        damping: 30,
      },
    },
  }

  return (
    <motion.div className="flex flex-wrap gap-1" variants={containerVariants} initial="hidden" animate="visible">
      {sectionTypes.map((type, index) => (
        <motion.div key={type} variants={buttonVariants}>
          <Button
            ref={(el) => (buttonsRef.current[index] = el)}
            variant="outline"
            size="sm"
            onClick={() => onAddSection(type)}
            className="capitalize h-7 text-xs px-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
            data-section-type={type}
            tabIndex={0}
          >
            {type}
          </Button>
        </motion.div>
      ))}

      {hasSections && (
        <motion.div variants={buttonVariants}>
          <Button variant="outline" size="sm" onClick={onResetSections} className="h-7 text-xs px-2">
            Reset
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
