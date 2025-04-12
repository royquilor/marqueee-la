"use client"

import { useEffect, useState, useRef } from "react"
import { DynamicMenu } from "@/components/dynamic-menu"
import { Canvas } from "@/components/canvas"
import type { Section, Theme } from "@/lib/types"
import { defaultTheme } from "@/lib/themes"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

export default function Home() {
  // Load state from local storage or use defaults
  const [sections, setSections] = useLocalStorage<Section[]>("builder-sections", [])
  const [theme, setTheme] = useLocalStorage<Theme>("builder-theme", defaultTheme)
  const [credits, setCredits] = useLocalStorage<number>("ai-credits", 5) // This should be 5
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Use a ref to track if we've already reset credits to avoid infinite loops
  const hasResetCredits = useRef(false)

  // Reset credits only once on initial mount
  useEffect(() => {
    if (credits === 0 && !hasResetCredits.current) {
      hasResetCredits.current = true
      setCredits(5)
    }
  }, []) // Empty dependency array means this only runs once on mount

  useEffect(() => {
    // Set first load to false after a delay to trigger animation
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const addSection = (sectionType: string) => {
    const newSectionId = `section-${Date.now()}`
    setSections([
      ...sections,
      {
        id: newSectionId,
        type: sectionType,
        variant: 1,
      },
    ])
    // Automatically select the newly added section
    setSelectedSectionId(newSectionId)
  }

  const addGeneratedSection = (sectionType: string, code: string, variant: number) => {
    // In a real implementation, you would need to save the generated code
    // and create a mechanism to render it in the SectionRenderer
    // For now, we'll just add a regular section
    const newSectionId = `section-${Date.now()}`
    setSections([
      ...sections,
      {
        id: newSectionId,
        type: sectionType,
        variant: variant,
        // You might want to add a property to indicate this is a custom section
        // and store the generated code somewhere
      },
    ])
    // Automatically select the newly added section
    setSelectedSectionId(newSectionId)
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(null)
    }
  }

  const cycleVariant = (sectionId: string, direction: "next" | "prev") => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const maxVariants = 5
          const newVariant =
            direction === "next"
              ? (section.variant % maxVariants) + 1
              : section.variant === 1
                ? maxVariants
                : section.variant - 1

          return { ...section, variant: newVariant }
        }
        return section
      }),
    )
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const index = sections.findIndex((s) => s.id === sectionId)
    if (index === -1) return

    const newSections = [...sections]

    if (direction === "up" && index > 0) {
      ;[newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]]
    } else if (direction === "down" && index < sections.length - 1) {
      ;[newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
    }

    setSections(newSections)
  }

  const updateTheme = (newTheme: Partial<Theme>) => {
    // Ensure borderRadius is properly converted to a number if it's provided
    if (newTheme.borderRadius !== undefined && typeof newTheme.borderRadius === "string") {
      newTheme.borderRadius = Number(newTheme.borderRadius)
    }
    setTheme({ ...theme, ...newTheme })
  }

  const resetSections = () => {
    setSections([])
    setSelectedSectionId(null)
  }

  const resetTheme = () => {
    setTheme(defaultTheme)
  }

  const useAiCredit = () => {
    if (credits > 0) {
      setCredits(credits - 1)
      return true
    }
    return false
  }

  // Add a function to reset credits to 5 for testing
  const resetCredits = () => {
    setCredits(5)
    console.log("Credits reset to 5")
  }

  return (
    <ThemeProvider theme={theme}>
      <main className="min-h-screen flex flex-col items-center justify-center">
        {sections.length === 0 ? (
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-center">Start building your website</h1>
            <div className="text-sm text-muted-foreground">
              <p>Current AI credits: {credits}</p>
              <Button onClick={resetCredits} variant="outline" size="sm" className="mt-2">
                Reset AI Credits to 5
              </Button>
            </div>
          </div>
        ) : (
          <Canvas
            sections={sections}
            theme={theme}
            onCycleVariant={cycleVariant}
            onMoveSection={moveSection}
            onDeleteSection={deleteSection}
            selectedSectionId={selectedSectionId}
            setSelectedSectionId={setSelectedSectionId}
          />
        )}

        <DynamicMenu
          isFirstLoad={isFirstLoad}
          onAddSection={addSection}
          onUpdateTheme={updateTheme}
          onResetSections={resetSections}
          onResetTheme={resetTheme}
          theme={theme}
          credits={credits}
          useAiCredit={useAiCredit}
          hasSections={sections.length > 0}
          sections={sections}
          onAddGeneratedSection={addGeneratedSection}
          selectedSectionId={selectedSectionId}
        />
      </main>
    </ThemeProvider>
  )
}
