"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Theme } from "@/lib/types"
import { fontFamilies, defaultTheme } from "@/lib/themes"
import { useMemo } from "react"

interface ThemeMenuProps {
  theme: Theme
  onUpdateTheme: (theme: Partial<Theme>) => void
  onResetTheme: () => void
}

export function ThemeMenu({ theme, onUpdateTheme, onResetTheme }: ThemeMenuProps) {
  const colorOptions = [
    { name: "Blue", value: "#3b82f6", tailwindClass: "bg-blue-600" },
    { name: "Purple", value: "#9333ea", tailwindClass: "bg-purple-600" },
    { name: "Pink", value: "#db2777", tailwindClass: "bg-pink-600" },
    { name: "Red", value: "#dc2626", tailwindClass: "bg-red-600" },
    { name: "Yellow", value: "#ca8a04", tailwindClass: "bg-yellow-600" },
    { name: "Green", value: "#16a34a", tailwindClass: "bg-green-600" },
  ]

  const borderRadiusOptions = [
    { value: "0", label: "None", class: "rounded-none" },
    { value: "2", label: "XS", class: "rounded-sm" },
    { value: "4", label: "SM", class: "rounded" },
    { value: "6", label: "MD", class: "rounded-md" },
    { value: "8", label: "LG", class: "rounded-lg" },
    { value: "12", label: "XL", class: "rounded-xl" },
    { value: "16", label: "2XL", class: "rounded-2xl" },
    { value: "24", label: "3XL", class: "rounded-3xl" },
    { value: "9999", label: "Full", class: "rounded-full" },
  ]

  // Check if the current theme differs from the default theme
  const isThemeModified = useMemo(() => {
    return (
      theme.headingFont !== defaultTheme.headingFont ||
      theme.bodyFont !== defaultTheme.bodyFont ||
      theme.colors.primary !== defaultTheme.colors.primary ||
      theme.borderRadius !== defaultTheme.borderRadius ||
      theme.containerWidth !== defaultTheme.containerWidth
    )
  }, [theme])

  const handleColorChange = (colorValue: string) => {
    onUpdateTheme({ colors: { ...theme.colors, primary: colorValue } })
  }

  const handleBorderRadiusChange = (value: string) => {
    // Explicitly convert the value to a number
    const numericValue = Number.parseInt(value, 10)
    onUpdateTheme({ borderRadius: numericValue })
  }

  // Get font name without the fallbacks for display
  const getShortFontName = (fontFamily: string) => {
    return fontFamily.split(",")[0].replace(/['"]/g, "")
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <Select value={theme.headingFont} onValueChange={(value) => onUpdateTheme({ headingFont: value })}>
        <SelectTrigger className="w-auto h-7 text-xs px-2 py-0 min-w-[40px]">
          <SelectValue>
            <span style={{ fontFamily: theme.headingFont }} className="font-bold">
              Hh
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {fontFamilies.map((font) => (
            <SelectItem key={font} value={font}>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: font }} className="font-bold">
                  Hh
                </span>
                <span className="text-xs">{getShortFontName(font)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={theme.bodyFont} onValueChange={(value) => onUpdateTheme({ bodyFont: value })}>
        <SelectTrigger className="w-auto h-7 text-xs px-2 py-0 min-w-[40px]">
          <SelectValue>
            <span style={{ fontFamily: theme.bodyFont }}>Pp</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {fontFamilies.map((font) => (
            <SelectItem key={font} value={font}>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: font }}>Pp</span>
                <span className="text-xs">{getShortFontName(font)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-1">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={`w-5 h-5 rounded-full ${color.tailwindClass} flex items-center justify-center ${
              theme.colors.primary === color.value ? "ring-2 ring-white" : ""
            }`}
            onClick={() => handleColorChange(color.value)}
            title={color.name}
            aria-label={`Set primary color to ${color.name}`}
          />
        ))}
      </div>

      <Select value={theme.borderRadius.toString()} onValueChange={handleBorderRadiusChange}>
        <SelectTrigger className="w-auto h-7 text-xs px-2 py-0">
          <SelectValue placeholder="Radius" />
        </SelectTrigger>
        <SelectContent>
          {borderRadiusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={theme.containerWidth} onValueChange={(value) => onUpdateTheme({ containerWidth: value })}>
        <SelectTrigger className="w-auto h-7 text-xs px-2 py-0">
          <SelectValue placeholder="Width" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="100%">Full</SelectItem>
          <SelectItem value="1280px">1280px</SelectItem>
          <SelectItem value="1024px">1024px</SelectItem>
          <SelectItem value="768px">768px</SelectItem>
        </SelectContent>
      </Select>

      {isThemeModified && (
        <Button variant="outline" size="sm" onClick={onResetTheme} className="h-7 text-xs px-2">
          Reset
        </Button>
      )}
    </div>
  )
}
