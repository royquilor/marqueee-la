"use client"

import { useState, useEffect, useRef } from "react"
import { ComponentSelector } from "./component-selector"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useComponentStore } from "@/hooks/use-component-store"
import { componentNames } from "./canvas"
import { useHistoryStore } from "@/hooks/use-history-store"
import { ThemeEditor } from "./theme-editor"
import { CodeExport } from "./code-export"
import { useVariantStore } from "@/hooks/use-variant-store"
import { AIThemeAssistant } from "./ai-theme-assistant"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Palette, Code, Sparkles, Minimize2 } from "lucide-react"
import { useActiveSection } from "@/hooks/use-active-section"

type View = "components" | "theme" | "code" | "ai"

export default function DynamicIslandAlt() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [currentView, setCurrentView] = useState<View>("components")
  const [prevSelectedComponent, setPrevSelectedComponent] = useState<number | null>(null)
  const islandRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const { selectedComponent, components, selectedElement } = useComponentStore()
  const { canUndo, canRedo } = useHistoryStore()
  const { getVariant } = useVariantStore()
  const { activeSection, activeSectionName, hasChanged } = useActiveSection()
  const [textKey, setTextKey] = useState(0)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastAnimatedSectionRef = useRef<string | null>(null)

  // Get the name of the selected component
  const selectedComponentName =
    selectedComponent !== null && components[selectedComponent]
      ? componentNames[components[selectedComponent] as keyof typeof componentNames]
      : null

  // Get the current variant of the selected component
  const selectedComponentId = selectedComponent !== null ? components[selectedComponent] : null
  const currentVariant = selectedComponentId ? getVariant(selectedComponentId) + 1 : null

  // Update text key when active section changes to trigger animation
  useEffect(() => {
    if (hasChanged && !isExpanded && activeSection !== lastAnimatedSectionRef.current) {
      // Clear any existing animation timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }

      // Set a small delay before triggering the animation
      animationTimeoutRef.current = setTimeout(() => {
        setTextKey((prev) => prev + 1)
        lastAnimatedSectionRef.current = activeSection
        animationTimeoutRef.current = null
      }, 50)
    }
  }, [activeSectionName, hasChanged, isExpanded, activeSection])

  // Cleanup animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
    }
  }, [])

  // Trigger animation when selected component changes
  useEffect(() => {
    if (selectedComponent !== prevSelectedComponent) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 1000) // Animation duration
      setPrevSelectedComponent(selectedComponent)
      return () => clearTimeout(timer)
    }
  }, [selectedComponent, prevSelectedComponent])

  // Check if mouse is near the island
  useEffect(() => {
    if (!islandRef.current || !mousePosition) return

    const rect = islandRef.current.getBoundingClientRect()
    const buffer = 100 // px buffer around the island to detect "nearness"

    const isNear =
      mousePosition.y > rect.top - buffer &&
      mousePosition.y < window.innerHeight &&
      mousePosition.x > rect.left - buffer &&
      mousePosition.x < rect.right + buffer

    if (isNear && !isExpanded) {
      setIsExpanded(true)
    }
  }, [mousePosition, isExpanded])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't collapse if clicking on an editable text element or TipTap editor
      const target = event.target as HTMLElement
      if (
        target.closest(".ProseMirror") ||
        target.closest("[contenteditable=true]") ||
        target.closest(".group") // Our editable text container
      ) {
        return
      }

      if (islandRef.current && !islandRef.current.contains(target)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Get display text for collapsed state
  const getCollapsedText = () => {
    if (selectedElement) return "Element Selected"
    if (selectedComponentName) return selectedComponentName
    if (currentView === "ai") return "AI Assistant"
    if (currentView === "theme") return "Theme Editor"
    if (currentView === "code") return "Code Export"

    // If no component is selected and we're in the components view,
    // show the active section name
    if (!isExpanded && activeSection) {
      return activeSectionName
    }

    return "Components"
  }

  // Get icon for the current view
  const getViewIcon = (view: View) => {
    switch (view) {
      case "components":
        return null
      case "theme":
        return <Palette size={14} className="mr-1" />
      case "ai":
        return <Sparkles size={14} className="mr-1" />
      case "code":
        return <Code size={14} className="mr-1" />
    }
  }

  return (
    <motion.div
      ref={islandRef}
      className="fixed bottom-4 left-1/2 shadow-lg z-50 overflow-hidden text-white"
      style={{
        x: "-50%", // This ensures proper centering with framer-motion
        originX: 0.5,
        originY: 0.5,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      initial={false}
      animate={{
        borderRadius: 16,
        width: isExpanded ? "auto" : "auto",
        height: isExpanded ? "auto" : "36px",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 1,
        bounce: 0.25,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <AnimatePresence mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            className="flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            {/* Header with navigation */}
            <div className="flex items-center justify-between border-b border-gray-700 px-3 py-2">
              <div className="flex items-center">
                {currentView !== "components" ? (
                  <button
                    onClick={() => setCurrentView("components")}
                    className="text-gray-300 hover:text-white flex items-center text-xs"
                  >
                    <ChevronLeft size={14} className="mr-1" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="text-xs text-gray-300">
                    {selectedElement
                      ? "Element selected"
                      : selectedComponentName
                        ? `${selectedComponentName}${currentVariant ? ` (Variant ${currentVariant})` : ""}`
                        : activeSection
                          ? activeSectionName
                          : "Components"}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {currentView === "components" ? (
                  <>
                    <button
                      onClick={() => setCurrentView("theme")}
                      className="text-gray-400 hover:text-white flex items-center text-xs"
                    >
                      <Palette size={14} className="mr-1" />
                      <span>Theme</span>
                    </button>
                    <button
                      onClick={() => setCurrentView("ai")}
                      className="text-gray-400 hover:text-white flex items-center text-xs"
                    >
                      <Sparkles size={14} className="mr-1" />
                      <span>AI</span>
                    </button>
                    <button
                      onClick={() => setCurrentView("code")}
                      className="text-gray-400 hover:text-white flex items-center text-xs"
                    >
                      <Code size={14} className="mr-1" />
                      <span>Code</span>
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-gray-300">
                    {currentView === "theme" ? "Theme Editor" : currentView === "ai" ? "AI Assistant" : "Code Export"}
                  </span>
                )}
                <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-white ml-1">
                  <Minimize2 size={14} />
                </button>
              </div>
            </div>

            {/* Content area */}
            <div className="p-3 min-w-[280px]">
              <AnimatePresence mode="wait">
                {currentView === "components" && (
                  <motion.div
                    key="components"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ComponentSelector />
                  </motion.div>
                )}

                {currentView === "theme" && (
                  <motion.div
                    key="theme"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ThemeEditor />
                  </motion.div>
                )}

                {currentView === "ai" && (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AIThemeAssistant />
                  </motion.div>
                )}

                {currentView === "code" && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CodeExport />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            className="flex items-center h-9 px-3 whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <div className="flex items-center space-x-1.5">
              {getViewIcon(currentView)}
              <AnimatePresence mode="wait">
                <motion.span
                  key={textKey}
                  className="font-medium text-xs"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    duration: 0.3,
                  }}
                >
                  {getCollapsedText()}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
