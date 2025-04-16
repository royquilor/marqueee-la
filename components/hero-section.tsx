"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Dashboard from "./dashboard"
import { DynamicIslandMenu, type ThemeSettings } from "./dynamic-island-menu"
import { MarqueeHeading } from "./marquee-heading"
import { EmailSubscriptionForm } from "./email-subscription-form"
import { MinecraftStarsBackground } from "./minecraft-stars-background"
import { ThemeLoader } from "./theme-loader"

// Define system font stacks
const SYSTEM_HEADING_FONT =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
const SYSTEM_TEXT_FONT =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

// Define theme variants with system fonts as defaults
const themeVariants = {
  variant1: {
    headingFont: SYSTEM_HEADING_FONT,
    textFont: SYSTEM_TEXT_FONT,
    color: "blue-600",
    spacing: "Default",
    radius: "Default",
    theme: "dark" as const,
  },
  variant2: {
    headingFont: "var(--font-press-start-2p), 'Press Start 2P', 'VT323', monospace",
    textFont: "var(--font-silkscreen), 'Silkscreen', 'VT323', sans-serif",
    color: "green-600",
    spacing: "Default",
    radius: "None",
    theme: "dark" as const,
  },
  variant3: {
    headingFont: SYSTEM_HEADING_FONT,
    textFont: SYSTEM_TEXT_FONT,
    color: "green-600",
    spacing: "Compact",
    radius: "Small",
    theme: "dark" as const,
  },
}

export function HeroSection() {
  const [heroVariant, setHeroVariant] = useState<1 | 2 | 3>(1)
  const [direction, setDirection] = useState<1 | -1>(1) // 1 for right, -1 for left
  const [isLoading, setIsLoading] = useState(false)
  const [targetVariant, setTargetVariant] = useState<1 | 2 | 3 | null>(null)
  const [progress, setProgress] = useState(0)
  const [contentVisible, setContentVisible] = useState(true)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    headingFont: SYSTEM_HEADING_FONT,
    textFont: SYSTEM_TEXT_FONT,
    color: "blue-600",
    spacing: "Default",
    radius: "Default",
    theme: "dark",
  })

  // Apply initial spacing class and theme on mount
  useEffect(() => {
    const spacingClass = themeSettings.spacing.toLowerCase()
    document.documentElement.classList.add(`spacing-${spacingClass}`)

    // Apply initial font settings
    document.documentElement.style.setProperty("--heading-font-family", themeSettings.headingFont)
    document.documentElement.style.setProperty("--text-font-family", themeSettings.textFont)

    return () => {
      document.documentElement.classList.remove(`spacing-${spacingClass}`)
    }
  }, [])

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  // Handle theme change with loading state
  const changeThemeWithLoading = (newVariant: 1 | 2 | 3) => {
    // Only show loader for variants 2 and 3
    if ((newVariant === 2 || newVariant === 3) && heroVariant !== newVariant) {
      // First hide the current content
      setContentVisible(false)

      // After content is hidden, show the loader
      setTimeout(() => {
        setIsLoading(true)
        setTargetVariant(newVariant)
        setProgress(0)

        // Start progress animation
        let currentProgress = 0
        progressInterval.current = setInterval(() => {
          currentProgress += 2
          if (currentProgress > 100) {
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }
            return
          }
          setProgress(currentProgress)
        }, 30)

        // Apply the theme after a delay
        setTimeout(() => {
          setHeroVariant(newVariant)

          // Apply the corresponding theme
          const themeKey = `variant${newVariant}` as keyof typeof themeVariants
          handleThemeSettings({
            ...themeVariants[themeKey],
            theme: themeSettings.theme, // Preserve current theme mode
          })

          // After theme is applied, hide loader and show content
          setTimeout(() => {
            setIsLoading(false)
            setTargetVariant(null)
            if (progressInterval.current) {
              clearInterval(progressInterval.current)
            }

            // Show content after loader is gone
            setTimeout(() => {
              setContentVisible(true)
            }, 300)
          }, 500)
        }, 1500)
      }, 300)
    } else {
      // For variant 1, just switch immediately with a quick fade
      setContentVisible(false)

      setTimeout(() => {
        setHeroVariant(newVariant)

        // Apply the corresponding theme
        const themeKey = `variant${newVariant}` as keyof typeof themeVariants
        handleThemeSettings({
          ...themeVariants[themeKey],
          theme: themeSettings.theme, // Preserve current theme mode
        })

        setTimeout(() => {
          setContentVisible(true)
        }, 300)
      }, 300)
    }
  }

  // Add keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't process key events during loading
      if (isLoading || !contentVisible) return

      if (e.key === "ArrowRight") {
        setDirection(1)
        const newVariant = heroVariant === 3 ? 1 : ((heroVariant + 1) as 1 | 2 | 3)
        changeThemeWithLoading(newVariant)
      } else if (e.key === "ArrowLeft") {
        setDirection(-1)
        const newVariant = heroVariant === 1 ? 3 : ((heroVariant - 1) as 1 | 2 | 3)
        changeThemeWithLoading(newVariant)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [heroVariant, themeSettings.theme, isLoading, contentVisible])

  const handleThemeSettings = (newSettings: ThemeSettings) => {
    setThemeSettings(newSettings)

    // Apply font changes - update to directly set styles on document.documentElement
    document.documentElement.style.setProperty("--heading-font-family", newSettings.headingFont)
    document.documentElement.style.setProperty("--text-font-family", newSettings.textFont)

    // Force apply heading font to all h1-h6 elements AND their child spans
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    headingElements.forEach((el) => {
      ;(el as HTMLElement).style.fontFamily = newSettings.headingFont

      // Also apply to all spans inside headings
      const spans = el.querySelectorAll("span")
      spans.forEach((span) => {
        ;(span as HTMLElement).style.fontFamily = newSettings.headingFont
      })
    })

    // Apply spacing changes
    const spacingClass = newSettings.spacing.toLowerCase()
    document.documentElement.classList.remove("spacing-compact", "spacing-default", "spacing-comfortable")
    document.documentElement.classList.add(`spacing-${spacingClass}`)

    // Apply radius changes
    const radiusValues: Record<string, string> = {
      none: "0",
      small: "0.25rem",
      default: "0.5rem",
      large: "0.75rem",
      full: "0.5rem", // Keep default for most elements
    }

    // Remove any previous radius classes
    document.documentElement.classList.remove("radius-full")

    // Apply the base radius to the CSS variable
    document.documentElement.style.setProperty("--radius", radiusValues[newSettings.radius])

    // If "Full" is selected, add a special class to handle specific elements
    if (newSettings.radius.toLowerCase() === "full") {
      document.documentElement.classList.add("radius-full")
    }

    // Apply color changes
    const colorValues: Record<string, { hue: number; saturation: string }> = {
      "red-600": { hue: 0, saturation: "84%" },
      "orange-600": { hue: 25, saturation: "95%" },
      "green-600": { hue: 142, saturation: "71%" },
      "blue-600": { hue: 221, saturation: "83%" },
      "purple-600": { hue: 262, saturation: "83%" },
      "yellow-600": { hue: 48, saturation: "96%" },
      "pink-600": { hue: 330, saturation: "81%" },
    }

    const color = colorValues[newSettings.color.toLowerCase()]
    if (color) {
      // Use the same color values for both light and dark modes
      document.documentElement.style.setProperty("--primary-hue", color.hue.toString())
      document.documentElement.style.setProperty("--primary-saturation", color.saturation)

      // Force update of CSS variables
      updateThemeColors(newSettings.theme as "light" | "dark" | "system")
    }
  }

  // Helper function to update theme colors based on current theme
  const updateThemeColors = (theme: "light" | "dark" | "system") => {
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    if (isDark) {
      // In dark mode, use a brighter version of the color
      document.documentElement.style.setProperty("--primary", "var(--primary-hue) var(--primary-saturation) 50%")
    } else {
      // In light mode, use a slightly darker version of the color
      document.documentElement.style.setProperty("--primary", "var(--primary-hue) var(--primary-saturation) 40%")
    }
  }

  // Animation variants for the marquee effect - more subtle now
  const marqueeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%", // Reduced from 100% to 30%
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-30%" : "30%", // Reduced from 100% to 30%
      opacity: 0,
    }),
  }

  // Render the appropriate hero variant
  const renderHeroVariant = () => {
    return (
      <AnimatePresence mode="wait" custom={direction}>
        {heroVariant === 1 && contentVisible && (
          <motion.div
            key="variant-1"
            className="w-full relative z-5"
            custom={direction}
            variants={marqueeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 25 }, // Reduced stiffness, increased damping
              opacity: { duration: 0.5 }, // Increased duration for opacity
            }}
          >
            <div className="py-20 text-center lg:py-40 w-full">
              <h1 className="animate-fade-in text-4xl font-medium tracking-tighter text-foreground sm:text-6xl md:text-9xl w-full m-0 p-0">
                <MarqueeHeading
                  text="Just Marqueee it. Look Different Fast. CMD + R. Export Code soon."
                  className="leading-none w-full"
                  speed={15}
                  gap={100}
                  repeat={2}
                />
              </h1>
              <p className="animate-fade-in-delay-1 mx-auto mt-4 max-w-2xl text-xl text-balance text-muted-foreground px-4">
                Streamline your design workflow with AI-powered task management. Boost productivity and keep your team
                in sync.
              </p>
              <div className="animate-fade-in-delay-2">
                <EmailSubscriptionForm />
              </div>
            </div>
          </motion.div>
        )}

        {heroVariant === 2 && contentVisible && (
          <motion.div
            key="variant-2"
            className="w-full relative z-5"
            custom={direction}
            variants={marqueeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 25 },
              opacity: { duration: 0.5 },
            }}
          >
            {/* Add the stars background for variant 2 */}
            <MinecraftStarsBackground starCount={40} starColor="#ffdd00" />

            <div className="py-20 text-center lg:py-40 w-full minecraft-theme">
              {/* Star Wars style 3D perspective container */}
              <div className="star-wars-container mx-auto max-w-3xl perspective-500 overflow-hidden">
                <motion.h1
                  className="text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl w-full m-0 p-0 mb-8 minecraft-heading minecraft-pixelated minecraft-text-yellow star-wars-text"
                  initial={{ opacity: 0, rotateX: 25, y: "50%" }}
                  animate={{
                    opacity: 1,
                    rotateX: 25,
                    y: "0%",
                    transition: {
                      opacity: { duration: 1 },
                      y: { duration: 2, ease: "easeOut" },
                    },
                  }}
                >
                  Try different designs fast
                </motion.h1>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="inline-block mx-auto"
              >
                <EmailSubscriptionForm className="minecraft-form" theme="minecraft" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {heroVariant === 3 && contentVisible && (
          <motion.div
            key="variant-3"
            className="w-full relative z-5 px-4 sm:px-6 lg:px-8"
            custom={direction}
            variants={marqueeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 100, damping: 25 }, // Reduced stiffness, increased damping
              opacity: { duration: 0.5 }, // Increased duration for opacity
            }}
          >
            <div className="py-10 w-full flex flex-col items-start text-left">
              <motion.h1
                className="text-2xl font-medium tracking-tighter text-foreground sm:text-3xl md:text-4xl max-w-3xl"
                initial={{ opacity: 0, x: -20 }} // Reduced x distance
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }} // Slower animation
              >
                Try different designs fast.
              </motion.h1>
              <motion.p
                className="mt-6 max-w-lg text-base text-balance text-muted-foreground"
                initial={{ opacity: 0, x: -20 }} // Reduced x distance
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }} // Slower animation
              >
                Get inspiration on website sections and components based on Shadcn/UI.
              </motion.p>
              {/* CTA button removed from variant 3 */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && targetVariant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
          >
            <ThemeLoader variant={targetVariant} progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient background - positioned absolutely to cover the bottom half */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[800px] pointer-events-none ${
          heroVariant === 2 ? "minecraft-night-sky" : ""
        }`}
        style={{
          background:
            heroVariant !== 2
              ? `linear-gradient(to top, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.2) 40%, transparent 100%)`
              : undefined,
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      {/* Hero content - changes based on variant */}
      {renderHeroVariant()}

      {/* Dashboard section - keep padding for this section */}
      <div className="animate-fade-in-up mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-8 relative z-10">
        <div className="relative mx-auto max-w-screen-2xl">
          {/* Dashboard container */}
          <motion.div
            className="relative h-[600px] overflow-hidden rounded-xl border border-border bg-card/30 shadow-xl dark:border-border/90 dark:bg-card/20 backdrop-blur-sm ring-4 ring-black/20 dark:ring-black/20"
            key={`dashboard-${heroVariant}`}
            initial={{ opacity: 0.9, scale: 0.99 }} // More subtle initial values
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }} // Slower animation
          >
            <Dashboard heroVariant={heroVariant} />
          </motion.div>
        </div>
      </div>

      {/* Dynamic Island Menu */}
      <DynamicIslandMenu onThemeChange={handleThemeSettings} />
    </div>
  )
}
