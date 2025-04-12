"use client"

import { create } from "zustand"
import { useComponentStore } from "./use-component-store"
import { useThemeStore } from "./use-theme-store"
import { useVariantStore } from "./use-variant-store"
import { useEffect } from "react"

interface HistoryState {
  past: any[]
  future: any[]
  canUndo: boolean
  canRedo: boolean
  recordChange: (state: any) => void
  undo: () => void
  redo: () => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  recordChange: (state) => {
    set((historyState) => ({
      past: [...historyState.past, state],
      future: [],
      canUndo: true,
      canRedo: false,
    }))
  },

  undo: () => {
    const { past, future } = get()

    if (past.length === 0) return

    const previous = past[past.length - 1]
    const newPast = past.slice(0, past.length - 1)

    // Get current state to store in future
    const currentState: any = {}

    // Handle component state
    if (previous.components !== undefined) {
      currentState.components = useComponentStore.getState().components
      currentState.content = useComponentStore.getState().content

      // Apply the previous state
      useComponentStore.setState({
        components: previous.components,
        content: previous.content,
      })
    }

    // Handle theme state
    if (previous.theme !== undefined) {
      currentState.theme = { ...useThemeStore.getState() }

      // Apply the previous theme state
      const themeStore = useThemeStore.getState()
      Object.entries(previous.theme).forEach(([key, value]) => {
        if (key.startsWith("update") || key === "resetTheme") return
        // @ts-ignore - dynamic property access
        themeStore[`update${key.charAt(0).toUpperCase()}${key.slice(1)}`](value as string)
      })
    }

    // Handle variants state
    if (previous.variants !== undefined) {
      currentState.variants = { ...useVariantStore.getState().variants }

      // Apply the previous variants state
      useVariantStore.setState({
        variants: previous.variants,
      })
    }

    set({
      past: newPast,
      future: [currentState, ...future],
      canUndo: newPast.length > 0,
      canRedo: true,
    })
  },

  redo: () => {
    const { past, future } = get()

    if (future.length === 0) return

    const next = future[0]
    const newFuture = future.slice(1)

    // Get current state to store in past
    const currentState: any = {}

    // Handle component state
    if (next.components !== undefined) {
      currentState.components = useComponentStore.getState().components
      currentState.content = useComponentStore.getState().content

      // Apply the next state
      useComponentStore.setState({
        components: next.components,
        content: next.content,
      })
    }

    // Handle theme state
    if (next.theme !== undefined) {
      currentState.theme = { ...useThemeStore.getState() }

      // Apply the next theme state
      const themeStore = useThemeStore.getState()
      Object.entries(next.theme).forEach(([key, value]) => {
        if (key.startsWith("update") || key === "resetTheme") return
        // @ts-ignore - dynamic property access
        themeStore[`update${key.charAt(0).toUpperCase()}${key.slice(1)}`](value as string)
      })
    }

    // Handle variants state
    if (next.variants !== undefined) {
      currentState.variants = { ...useVariantStore.getState().variants }

      // Apply the next variants state
      useVariantStore.setState({
        variants: next.variants,
      })
    }

    set({
      past: [...past, currentState],
      future: newFuture,
      canUndo: true,
      canRedo: newFuture.length > 0,
    })
  },

  clearHistory: () => {
    set({
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,
    })
  },
}))

// Hook to use history with keyboard shortcuts
export function useHistory() {
  const { undo, redo, canUndo, canRedo } = useHistoryStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the target is an input or contenteditable element
      const target = e.target as HTMLElement
      const isEditingText =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable ||
        target.closest(".ProseMirror") !== null

      // Only handle keyboard shortcuts if not editing text
      if (!isEditingText) {
        if (e.ctrlKey && e.key === "z") {
          e.preventDefault()
          undo()
        } else if (e.ctrlKey && e.key === "y") {
          e.preventDefault()
          redo()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [undo, redo])

  return { undo, redo, canUndo, canRedo }
}
