"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Dashboard from "./dashboard"
import { DynamicIslandMenu, type ThemeSettings } from "./dynamic-island-menu"
import { MarqueeHeading } from "./marquee-heading"
import { EmailSubscriptionForm } from "./email-subscription-form"

export function HeroSection() {
  const [heroVariant, setHeroVariant] = useState<1 | 2 | 3>(1)
  const [direction, setDirection] = useState<1 | -1>(1) // 1 for right, -1 for left
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    headingFont: "Inter, sans-serif",
    textFont: "Inter, sans-serif",
    color: "blue-600",
    spacing: "Default",
    radius: "Default",
    theme: "dark",
  })

  // Apply initial spacing class on mount
  useEffect(() => {
    const spacingClass = themeSettings.spacing.toLowerCase()
    document.documentElement.classList.add(`spacing-${spacingClass}`)

    return () => {
      document.documentElement.classList.remove(`spacing-${spacingClass}`)
    }
  }, [])

  // Add keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setDirection(1)
        setHeroVariant((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))
      } else if (e.key === "ArrowLeft") {
        setDirection(-1)
        setHeroVariant((prev) => (prev === 1 ? 3 : ((prev - 1) as 1 | 2 | 3)))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

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
        {heroVariant === 1 && (
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

        {heroVariant === 2 && (
          <motion.div
            key="variant-2"
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
              <motion.h1
                className="text-4xl font-medium tracking-tighter text-foreground sm:text-5xl md:text-6xl w-full m-0 p-0 mb-8"
                initial={{ opacity: 0, y: 10 }} // Reduced y distance
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }} // Slower animation
              >
                Try different designs fast
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 10 }} // Reduced y distance
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }} // Slower animation
              >
                <EmailSubscriptionForm />
              </motion.div>
            </div>
          </motion.div>
        )}

        {heroVariant === 3 && (
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
      {/* Removed variant indicator */}

      {/* Gradient background - positioned absolutely to cover the bottom half */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[800px] pointer-events-none"
        style={{
          background: `linear-gradient(to top, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.2) 40%, transparent 100%)`,
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
