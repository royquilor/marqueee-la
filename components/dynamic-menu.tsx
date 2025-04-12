"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionsMenu } from "@/components/menu/sections-menu"
import { ThemeMenu } from "@/components/menu/theme-menu"
import { AiPromptMenu } from "@/components/menu/ai-prompt-menu"
import { DownloadMenu } from "@/components/menu/download-menu"
import type { Section, Theme } from "@/lib/types"

type MenuOption = "main" | "sections" | "theme" | "ai" | "download"

interface DynamicMenuProps {
  isFirstLoad: boolean
  onAddSection: (sectionType: string) => void
  onUpdateTheme: (theme: Partial<Theme>) => void
  onResetSections: () => void
  onResetTheme: () => void
  theme: Theme
  credits: number
  useAiCredit: () => boolean
  hasSections: boolean
  sections: Section[]
  onAddGeneratedSection?: (sectionType: string, code: string, variant: number) => void
  selectedSectionId?: string | null
}

export function DynamicMenu({
  isFirstLoad,
  onAddSection,
  onUpdateTheme,
  onResetSections,
  onResetTheme,
  theme,
  credits,
  useAiCredit,
  hasSections,
  sections,
  onAddGeneratedSection,
  selectedSectionId,
}: DynamicMenuProps) {
  const [currentMenu, setCurrentMenu] = useState<MenuOption>("main")
  const shouldReduceMotion = useReducedMotion()

  // Container animation variants - using spring physics for natural movement
  const containerVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : 20,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        // Delay children animations until container is mostly animated
        delayChildren: 0.15,
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      y: shouldReduceMotion ? 0 : 10,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.98,
      transition: {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1], // Modern easing curve
      },
    },
  }

  // Button animation variants
  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 10, opacity: 0 },
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

  // Content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: [0.32, 0.72, 0, 1], // Modern easing curve
      },
    },
  }

  const goBack = () => {
    setCurrentMenu("main")
  }

  const renderMenuContent = () => {
    switch (currentMenu) {
      case "sections":
        return (
          <motion.div
            className="flex items-center gap-2"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0 h-7 w-7 p-0">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <span className="text-sm font-medium capitalize mr-2 shrink-0">{currentMenu}</span>
            <SectionsMenu onAddSection={onAddSection} onResetSections={onResetSections} hasSections={hasSections} />
          </motion.div>
        )
      case "theme":
        return (
          <motion.div
            className="flex items-center gap-2"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0 h-7 w-7 p-0">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <span className="text-sm font-medium capitalize mr-2 shrink-0">{currentMenu}</span>
            <ThemeMenu theme={theme} onUpdateTheme={onUpdateTheme} onResetTheme={onResetTheme} />
          </motion.div>
        )
      case "ai":
        return (
          <motion.div className="w-full" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <AiPromptMenu
              credits={credits}
              useAiCredit={useAiCredit}
              onUpdateTheme={onUpdateTheme}
              onBack={goBack}
              onAddGeneratedSection={onAddGeneratedSection}
              sections={sections}
              selectedSectionId={selectedSectionId}
              theme={theme}
            />
          </motion.div>
        )
      case "download":
        return (
          <motion.div
            className="flex items-center gap-2"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Button variant="ghost" size="icon" onClick={goBack} className="shrink-0 h-7 w-7 p-0">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <span className="text-xs font-medium capitalize mr-2 shrink-0">{currentMenu}</span>
            <DownloadMenu sections={sections} theme={theme} />
          </motion.div>
        )
      default:
        return (
          <motion.div
            className="flex flex-wrap gap-2 justify-center"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                onClick={() => setCurrentMenu("sections")}
              >
                Sections
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => setCurrentMenu("theme")}>
                Theme
              </Button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button variant="outline" size="sm" className="h-7 text-xs px-2" onClick={() => setCurrentMenu("ai")}>
                AI
              </Button>
            </motion.div>
            {hasSections && (
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  onClick={() => setCurrentMenu("download")}
                >
                  Download
                </Button>
              </motion.div>
            )}
          </motion.div>
        )
    }
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center z-50 px-2 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMenu}
          className="bg-card border rounded-md shadow-lg p-2 w-fit max-w-[95vw] overflow-x-auto pointer-events-auto"
          initial={isFirstLoad ? "hidden" : "visible"}
          animate="visible"
          exit="exit"
          variants={containerVariants}
          layout="position"
          layoutId="menu-container"
          transition={{
            layout: { type: "spring", bounce: 0.2, duration: 0.6 },
          }}
          style={{
            position: "relative",
            willChange: "transform",
          }}
        >
          {renderMenuContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
