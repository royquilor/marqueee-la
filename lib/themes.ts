import type { Theme } from "./types"

export const fontFamilies = [
  "Inter, sans-serif",
  "Roboto, sans-serif",
  "Poppins, sans-serif",
  "Montserrat, sans-serif",
  "Open Sans, sans-serif",
  "Lato, sans-serif",
  "Raleway, sans-serif",
  "Playfair Display, serif",
  "Merriweather, serif",
  "Source Sans Pro, sans-serif",
]

export const defaultTheme: Theme = {
  headingFont: "Inter, sans-serif",
  bodyFont: "Inter, sans-serif",
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#1e293b",
    foreground: "#f8fafc",
    muted: "#334155",
    mutedForeground: "#94a3b8",
  },
  borderRadius: 8,
  containerWidth: "1280px",
}

export const darkTheme: Theme = {
  headingFont: "Inter, sans-serif",
  bodyFont: "Inter, sans-serif",
  colors: {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#0f172a",
    foreground: "#f8fafc",
    muted: "#1e293b",
    mutedForeground: "#94a3b8",
  },
  borderRadius: 8,
  containerWidth: "1280px",
}

export const minimalTheme: Theme = {
  headingFont: "Roboto, sans-serif",
  bodyFont: "Roboto, sans-serif",
  colors: {
    primary: "#000000",
    secondary: "#6c757d",
    background: "#ffffff",
    foreground: "#000000",
    muted: "#f8f9fa",
    mutedForeground: "#6c757d",
  },
  borderRadius: 0,
  containerWidth: "1024px",
}

export const boldTheme: Theme = {
  headingFont: "Poppins, sans-serif",
  bodyFont: "Poppins, sans-serif",
  colors: {
    primary: "#7c3aed",
    secondary: "#9333ea",
    background: "#ffffff",
    foreground: "#111827",
    muted: "#f3f4f6",
    mutedForeground: "#6b7280",
  },
  borderRadius: 12,
  containerWidth: "1280px",
}

export const corporateTheme: Theme = {
  headingFont: "Source Sans Pro, sans-serif",
  bodyFont: "Source Sans Pro, sans-serif",
  colors: {
    primary: "#2563eb",
    secondary: "#4b5563",
    background: "#ffffff",
    foreground: "#1f2937",
    muted: "#f9fafb",
    mutedForeground: "#4b5563",
  },
  borderRadius: 4,
  containerWidth: "1200px",
}
