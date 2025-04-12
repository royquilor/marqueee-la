"use client"

import DynamicIslandAlt from "@/components/dynamic-island-alt"
import { Canvas } from "@/components/canvas"
import { useComponentStore } from "@/hooks/use-component-store"
import { useEffect } from "react"
import { useHistory } from "@/hooks/use-history-store"
import { useThemeInit } from "@/hooks/use-theme-store"

export default function Home() {
  const { selectComponent, selectElement } = useComponentStore()
  // Initialize history hooks
  const { undo, redo } = useHistory()
  // Initialize theme
  useThemeInit()

  // Handle global click to deselect components
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // If clicking on the main content area (not a component or the dynamic island)
      if (
        e.target instanceof HTMLElement &&
        e.target.tagName === "MAIN" &&
        !e.target.closest(".ProseMirror") &&
        !e.target.closest("[contenteditable=true]")
      ) {
        selectComponent(null)
        selectElement(null)
      }
    }

    document.addEventListener("click", handleGlobalClick)
    return () => {
      document.removeEventListener("click", handleGlobalClick)
    }
  }, [selectComponent, selectElement])

  return (
    <main className="min-h-screen relative theme-transition bg-theme-background">
      <Canvas />
      <DynamicIslandAlt />
    </main>
  )
}
