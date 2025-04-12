"use client"

import type React from "react"

import { useState } from "react"
import { useThemeStore } from "@/hooks/use-theme-store"

export function AIThemeAssistant() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastTheme, setLastTheme] = useState<string | null>(null)
  const themeStore = useThemeStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // In a real implementation, this would be an API call to Claude Haiku
      // For now, we'll simulate the response with some predefined themes
      const themeResponse = await simulateAIResponse(prompt)

      // Apply the theme
      applyTheme(themeResponse)

      // Save the last prompt for display
      setLastTheme(prompt)

      // Clear the input
      setPrompt("")
    } catch (err) {
      setError("Failed to generate theme. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate AI response based on keywords in the prompt
  const simulateAIResponse = async (prompt: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const promptLower = prompt.toLowerCase()

    // Predefined themes based on keywords
    if (promptLower.includes("ghibli") || promptLower.includes("studio ghibli")) {
      return {
        fontFamily: "Montserrat, sans-serif",
        primaryColor: "#4A8FE7", // Ghibli sky blue
        secondaryColor: "#7CAA2D", // Ghibli nature green
        textColor: "#4A4A4A",
        backgroundColor: "#F5F9FF", // Light sky blue
        borderRadius: "0.75rem",
        spacing: "1.25rem",
        containerWidth: "1200px",
      }
    } else if (promptLower.includes("dark") || promptLower.includes("night")) {
      return {
        fontFamily: "Inter, sans-serif",
        primaryColor: "#6D28D9", // Purple
        secondaryColor: "#9CA3AF",
        textColor: "#E5E7EB",
        backgroundColor: "#1F2937",
        borderRadius: "0.5rem",
        spacing: "1rem",
        containerWidth: "1200px",
      }
    } else if (promptLower.includes("minimal") || promptLower.includes("clean")) {
      return {
        fontFamily: "Inter, sans-serif",
        primaryColor: "#000000",
        secondaryColor: "#6B7280",
        textColor: "#111827",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.25rem",
        spacing: "1rem",
        containerWidth: "1000px",
      }
    } else if (promptLower.includes("colorful") || promptLower.includes("vibrant")) {
      return {
        fontFamily: "Montserrat, sans-serif",
        primaryColor: "#F43F5E", // Pink
        secondaryColor: "#8B5CF6", // Purple
        textColor: "#1F2937",
        backgroundColor: "#FFFFFF",
        borderRadius: "1rem",
        spacing: "1.25rem",
        containerWidth: "1200px",
      }
    } else if (promptLower.includes("retro") || promptLower.includes("vintage")) {
      return {
        fontFamily: "Georgia, serif",
        primaryColor: "#B45309", // Amber
        secondaryColor: "#78350F", // Brown
        textColor: "#292524",
        backgroundColor: "#FEFCE8", // Cream
        borderRadius: "0.25rem",
        spacing: "1rem",
        containerWidth: "1000px",
      }
    } else {
      // Default fallback - generate a random theme
      const colors = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
        "#14B8A6",
        "#F97316",
        "#6366F1",
        "#D946EF",
      ]
      const randomPrimary = colors[Math.floor(Math.random() * colors.length)]
      const randomSecondary = colors[Math.floor(Math.random() * colors.length)]
      const fonts = [
        "Inter, sans-serif",
        "Roboto, sans-serif",
        "Montserrat, sans-serif",
        "Georgia, serif",
        "Arial, sans-serif",
      ]
      const randomFont = fonts[Math.floor(Math.random() * fonts.length)]

      return {
        fontFamily: randomFont,
        primaryColor: randomPrimary,
        secondaryColor: randomSecondary,
        textColor: "#111827",
        backgroundColor: "#FFFFFF",
        borderRadius: "0.5rem",
        spacing: "1rem",
        containerWidth: "1200px",
      }
    }
  }

  // Apply the theme to the store
  const applyTheme = (theme: any) => {
    themeStore.updateFontFamily(theme.fontFamily)
    themeStore.updatePrimaryColor(theme.primaryColor)
    themeStore.updateSecondaryColor(theme.secondaryColor)
    themeStore.updateTextColor(theme.textColor)
    themeStore.updateBackgroundColor(theme.backgroundColor)
    themeStore.updateBorderRadius(theme.borderRadius)
    themeStore.updateSpacing(theme.spacing)
    themeStore.updateContainerWidth(theme.containerWidth)
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your theme..."
            className="w-full bg-gray-700 text-white rounded-md px-2 py-1 text-xs"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg
                className="animate-spin h-3 w-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md text-xs font-medium disabled:opacity-50"
          disabled={isLoading || !prompt.trim()}
        >
          Generate
        </button>
      </form>

      {error && <p className="text-red-400 text-xs">{error}</p>}

      {lastTheme && (
        <div className="mt-2 p-1.5 rounded bg-gray-800">
          <p className="text-xs text-gray-400">Last applied theme:</p>
          <p className="text-xs font-medium">{lastTheme}</p>
        </div>
      )}
    </div>
  )
}
