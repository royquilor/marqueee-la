"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { Theme } from "@/lib/types"

type ThemeProviderProps = {
  children: React.ReactNode
  theme: Theme
}

const ThemeContext = createContext<Theme | undefined>(undefined)

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  // Update CSS variables whenever theme changes
  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.colors.primary)
    document.documentElement.style.setProperty("--secondary", theme.colors.secondary)

    // Update Tailwind CSS variables to match our theme
    document.documentElement.style.setProperty("--primary-rgb", hexToRgb(theme.colors.primary))

    // Update the border radius CSS variable
    document.documentElement.style.setProperty("--radius", `${theme.borderRadius}px`)

    // Update the container width CSS variable
    document.documentElement.style.setProperty("--container-width", theme.containerWidth)

    // Force update of button styles by updating the CSS variable
    document.documentElement.style.setProperty("--ring", theme.colors.primary)

    // Add custom CSS for heading and body fonts
    const styleEl = document.createElement("style")
    styleEl.textContent = `
      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.headingFont};
      }
      body, p, div, span, button, input, select, textarea {
        font-family: ${theme.bodyFont};
      }
    `

    // Remove any previous custom font styles
    const prevStyle = document.getElementById("custom-font-styles")
    if (prevStyle) {
      prevStyle.remove()
    }

    // Add the new styles
    styleEl.id = "custom-font-styles"
    document.head.appendChild(styleEl)
  }, [theme])

  // Helper function to convert hex to RGB format
  function hexToRgb(hex: string) {
    // Remove the # if present
    hex = hex.replace("#", "")

    // Parse the hex values
    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)

    return `${r} ${g} ${b}`
  }

  return (
    <ThemeContext.Provider value={theme}>
      <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div
          style={
            {
              "--container-width": theme.containerWidth,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
