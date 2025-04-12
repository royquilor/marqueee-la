"use client"

import { useThemeStore } from "@/hooks/use-theme-store"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

const fontOptions = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Playfair Display, serif", label: "Playfair" },
]

const spacingOptions = [
  { value: "0.75rem", label: "Compact" },
  { value: "1rem", label: "Default" },
  { value: "1.25rem", label: "Comfortable" },
  { value: "1.5rem", label: "Spacious" },
]

const borderRadiusOptions = [
  { value: "0", label: "Square" },
  { value: "0.25rem", label: "Slight" },
  { value: "0.5rem", label: "Rounded" },
  { value: "1rem", label: "Very Rounded" },
  { value: "9999px", label: "Circular" },
]

const containerWidthOptions = [
  { value: "1000px", label: "Narrow" },
  { value: "1200px", label: "Default" },
  { value: "1400px", label: "Wide" },
  { value: "100%", label: "Full Width" },
]

// Custom color picker component
function ColorPicker({
  color,
  onChange,
  label,
}: {
  color: string
  onChange: (value: string) => void
  label: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <button
      className="flex items-center gap-1.5 border border-gray-700 rounded-full py-1 pl-1 pr-2 hover:bg-gray-700 transition-colors flex-shrink-0"
      onClick={handleClick}
      type="button"
    >
      <span
        className="w-4 h-4 rounded-full block flex-shrink-0 border border-gray-600"
        style={{ backgroundColor: color }}
      />
      <span className="text-xs text-gray-300">{label}</span>
      <input ref={inputRef} type="color" value={color} onChange={(e) => onChange(e.target.value)} className="sr-only" />
    </button>
  )
}

export function ThemeEditor() {
  const theme = useThemeStore()
  const [activeTab, setActiveTab] = useState<"typography" | "colors" | "layout">("typography")

  return (
    <div className="space-y-3">
      <div className="flex space-x-1">
        <button
          className={cn(
            "px-2 py-0.5 text-xs rounded-full transition-colors",
            activeTab === "typography" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300",
          )}
          onClick={() => setActiveTab("typography")}
        >
          Typography
        </button>
        <button
          className={cn(
            "px-2 py-0.5 text-xs rounded-full transition-colors",
            activeTab === "colors" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300",
          )}
          onClick={() => setActiveTab("colors")}
        >
          Colors
        </button>
        <button
          className={cn(
            "px-2 py-0.5 text-xs rounded-full transition-colors",
            activeTab === "layout" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-gray-300",
          )}
          onClick={() => setActiveTab("layout")}
        >
          Layout
        </button>
      </div>

      <div>
        {activeTab === "typography" && (
          <div className="mb-3">
            <select
              value={theme.fontFamily}
              onChange={(e) => theme.updateFontFamily(e.target.value)}
              className="w-full h-7 text-xs text-white border border-gray-600 rounded-md px-2 py-0 appearance-none"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.85)",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='white' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
              }}
            >
              {fontOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeTab === "colors" && (
          <div className="mb-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              <ColorPicker color={theme.primaryColor} onChange={theme.updatePrimaryColor} label="Primary" />
              <ColorPicker color={theme.secondaryColor} onChange={theme.updateSecondaryColor} label="Secondary" />
              <ColorPicker color={theme.textColor} onChange={theme.updateTextColor} label="Text" />
              <ColorPicker color={theme.backgroundColor} onChange={theme.updateBackgroundColor} label="Background" />
              <ColorPicker color={theme.borderColor} onChange={theme.updateBorderColor} label="Border" />
            </div>
          </div>
        )}

        {activeTab === "layout" && (
          <div className="mb-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs whitespace-nowrap text-gray-300">Radius</label>
                <select
                  value={theme.borderRadius}
                  onChange={(e) => theme.updateBorderRadius(e.target.value)}
                  className="w-full h-7 text-xs text-white border border-gray-600 rounded-md px-2 py-0 appearance-none"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='white' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.5rem center",
                  }}
                >
                  {borderRadiusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs whitespace-nowrap text-gray-300">Spacing</label>
                <select
                  value={theme.spacing}
                  onChange={(e) => theme.updateSpacing(e.target.value)}
                  className="w-full h-7 text-xs text-white border border-gray-600 rounded-md px-2 py-0 appearance-none"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='white' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.5rem center",
                  }}
                >
                  {spacingOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs whitespace-nowrap text-gray-300">Width</label>
                <select
                  value={theme.containerWidth}
                  onChange={(e) => theme.updateContainerWidth(e.target.value)}
                  className="w-full h-7 text-xs text-white border border-gray-600 rounded-md px-2 py-0 appearance-none"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='white' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.5rem center",
                  }}
                >
                  {containerWidthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => theme.resetTheme()}
          className="text-white text-xs border border-gray-600 rounded-md px-2 py-1 hover:bg-gray-700 transition-colors"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
