"use client"

import { Button } from "@/components/ui/button"
import { useComponentStore } from "@/hooks/use-component-store"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const COMPONENTS = [
  { id: "nav", label: "Nav" },
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "testimonials", label: "Testimonials" },
  { id: "pricing", label: "Pricing" },
  { id: "cta", label: "CTA" },
  { id: "footer", label: "Footer" },
]

export function ComponentSelector() {
  const { addComponent } = useComponentStore()
  const [lastClicked, setLastClicked] = useState<string | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showScrollIndicators, setShowScrollIndicators] = useState({
    left: false,
    right: false,
  })

  const handleAddComponent = (componentId: string) => {
    addComponent(componentId)
    setLastClicked(componentId)

    // Reset the last clicked state after animation
    setTimeout(() => {
      setLastClicked(null)
    }, 500)
  }

  // Check if scroll indicators should be shown
  const checkScrollIndicators = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

    setShowScrollIndicators({
      left: scrollLeft > 0,
      right: scrollLeft < scrollWidth - clientWidth - 5, // 5px buffer
    })
  }

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollIndicators)
      // Initial check
      checkScrollIndicators()

      // Check on resize too
      window.addEventListener("resize", checkScrollIndicators)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollIndicators)
        window.removeEventListener("resize", checkScrollIndicators)
      }
    }
  }, [])

  return (
    <div className="relative">
      <AnimatePresence>
        {showScrollIndicators.left && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {COMPONENTS.map((component, index) => {
          const isJustClicked = lastClicked === component.id

          return (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "bg-gray-800 hover:bg-gray-700 text-white border-gray-700 transition-all flex-shrink-0 h-7 text-xs px-2 py-0",
                  isJustClicked && "bg-gray-600",
                )}
                onClick={() => handleAddComponent(component.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                as={motion.button}
                animate={
                  isJustClicked
                    ? {
                        scale: [1, 1.1, 1],
                        transition: { duration: 0.4, times: [0, 0.5, 1] },
                      }
                    : {}
                }
              >
                {component.label}
              </Button>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {showScrollIndicators.right && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
