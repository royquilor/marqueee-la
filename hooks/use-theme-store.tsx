"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useHistoryStore } from "./use-history-store"
import { useEffect } from "react"

// Add borderColor to the ThemeState interface
interface ThemeState {
  fontFamily: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  backgroundColor: string
  borderColor: string
  borderRadius: string
  spacing: string
  containerWidth: string

  updateFontFamily: (value: string) => void
  updatePrimaryColor: (value: string) => void
  updateSecondaryColor: (value: string) => void
  updateTextColor: (value: string) => void
  updateBackgroundColor: (value: string) => void
  updateBorderColor: (value: string) => void
  updateBorderRadius: (value: string) => void
  updateSpacing: (value: string) => void
  updateContainerWidth: (value: string) => void
  resetTheme: () => void
}

// Add borderColor to the defaultTheme
const defaultTheme = {
  fontFamily: "Inter, sans-serif",
  primaryColor: "#000000",
  secondaryColor: "#4B5563",
  textColor: "#111827",
  backgroundColor: "#FFFFFF",
  borderColor: "#E5E7EB",
  borderRadius: "0.5rem",
  spacing: "1rem",
  containerWidth: "1200px",
}

// Helper function to apply CSS variable and force repaint
const applyThemeVariable = (name: string, value: string) => {
  document.documentElement.style.setProperty(`--${name}`, value)

  // Force a repaint by toggling a class on the body
  document.body.classList.add("theme-updated")
  setTimeout(() => document.body.classList.remove("theme-updated"), 10)

  // Also dispatch a custom event that components can listen for
  const event = new CustomEvent("themeUpdated", { detail: { name, value } })
  document.dispatchEvent(event)
}

// Add the updateBorderColor function to the store
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      ...defaultTheme,

      updateFontFamily: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ fontFamily: value })
        applyThemeVariable("font-family", value)
        document.body.style.fontFamily = value
      },

      updatePrimaryColor: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ primaryColor: value })
        applyThemeVariable("primary-color", value)
      },

      updateSecondaryColor: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ secondaryColor: value })
        applyThemeVariable("secondary-color", value)
      },

      updateTextColor: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ textColor: value })
        applyThemeVariable("text-color", value)
      },

      updateBackgroundColor: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ backgroundColor: value })
        applyThemeVariable("background-color", value)
      },

      updateBorderColor: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ borderColor: value })
        applyThemeVariable("border-color", value)
      },

      updateBorderRadius: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ borderRadius: value })
        applyThemeVariable("border-radius", value)
      },

      updateSpacing: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ spacing: value })
        applyThemeVariable("spacing", value)
      },

      updateContainerWidth: (value) => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ containerWidth: value })
        applyThemeVariable("container-width", value)
      },

      resetTheme: () => {
        // Record current state for undo
        const currentState = {
          ...get(),
        }
        useHistoryStore.getState().recordChange({ theme: currentState })

        set({ ...defaultTheme })
        Object.entries(defaultTheme).forEach(([key, value]) => {
          const cssVarName = key.replace(/([A-Z])/g, "-$1").toLowerCase()
          applyThemeVariable(cssVarName, value)
        })

        document.body.style.fontFamily = defaultTheme.fontFamily
      },
    }),
    {
      name: "landing-page-theme",
    },
  ),
)

// Update the useThemeInit hook to include the border color
export function useThemeInit() {
  const theme = useThemeStore()

  useEffect(() => {
    // Set initial CSS variables
    document.documentElement.style.setProperty("--font-family", theme.fontFamily)
    document.documentElement.style.setProperty("--primary-color", theme.primaryColor)
    document.documentElement.style.setProperty("--secondary-color", theme.secondaryColor)
    document.documentElement.style.setProperty("--text-color", theme.textColor)
    document.documentElement.style.setProperty("--background-color", theme.backgroundColor)
    document.documentElement.style.setProperty("--border-color", theme.borderColor)
    document.documentElement.style.setProperty("--border-radius", theme.borderRadius)
    document.documentElement.style.setProperty("--spacing", theme.spacing)
    document.documentElement.style.setProperty("--container-width", theme.containerWidth)

    // Apply font family to body as well
    document.body.style.fontFamily = theme.fontFamily

    // Add event listener for theme changes
    const handleThemeUpdate = () => {
      // Force a repaint by toggling a class
      document.body.classList.add("theme-updated")
      setTimeout(() => document.body.classList.remove("theme-updated"), 10)
    }

    document.addEventListener("themeUpdated", handleThemeUpdate)

    return () => {
      document.removeEventListener("themeUpdated", handleThemeUpdate)
    }
  }, [theme])
}
