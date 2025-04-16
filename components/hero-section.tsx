"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Dashboard from "./dashboard"
import { DynamicIslandMenu, type ThemeSettings } from "./dynamic-island-menu"
import { MarqueeHeading } from "./marquee-heading"
import { EmailSubscriptionForm } from "./email-subscription-form"
import { MinecraftStarsBackground } from "./minecraft-stars-background"

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
    radius: "Default",
    theme: "dark" as const,
  },
  variant2: {
    headingFont: "var(--font-press-start-2p), 'Press Start 2P', 'VT323', monospace",
    textFont: "var(--font-silkscreen), 'Silkscreen', 'VT323', sans-serif",
    color: "green-600",
    radius: "None",
    theme: "dark" as const,
  },
  variant3: {
    headingFont: "var(--font-bruno-ace), 'Bruno Ace', sans-serif",
    textFont: "var(--font-audiowide), 'Audiowide', sans-serif",
    color: "red-600",
    radius: "Small",
    theme: "dark" as const,
  },
}

export function HeroSection() {
  const [heroVariant, setHeroVariant] = useState<1 | 2 | 3>(1)
  const [direction, setDirection] = useState<1 | -1>(1) // 1 for right, -1 for left
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    headingFont: SYSTEM_HEADING_FONT,
    textFont: SYSTEM_TEXT_FONT,
    color: "blue-600",
    radius: "Default",
    theme: "dark",
  })
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Apply initial spacing class and theme on mount
  useEffect(() => {
    // Always use default spacing
    document.documentElement.classList.add("spacing-default")

    // Apply initial font settings
    document.documentElement.style.setProperty("--heading-font-family", themeSettings.headingFont)
    document.documentElement.style.setProperty("--text-font-family", themeSettings.textFont)

    return () => {
      document.documentElement.classList.remove("spacing-default")
    }
  }, [])

  // Function to change theme variant with a simple transition
  const changeThemeVariant = (newVariant: 1 | 2 | 3, newDirection: 1 | -1) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setDirection(newDirection)

    // Apply the corresponding theme immediately
    const themeKey = `variant${newVariant}` as keyof typeof themeVariants
    const newThemeSettings = {
      ...themeVariants[themeKey],
      theme: themeSettings.theme, // Preserve current theme mode
    }

    // Apply theme settings
    handleThemeSettings(newThemeSettings)

    // Update the hero variant after a small delay to ensure theme is applied
    setTimeout(() => {
      setHeroVariant(newVariant)
    }, 10)

    // Reset transitioning state after a short delay
    setTimeout(() => {
      setIsTransitioning(false)
    }, 300)
  }

  // Add keyboard event listener for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const newVariant = heroVariant === 3 ? 1 : ((heroVariant + 1) as 1 | 2 | 3)
        changeThemeVariant(newVariant, 1) // 1 for right direction
      } else if (e.key === "ArrowLeft") {
        const newVariant = heroVariant === 1 ? 3 : ((heroVariant - 1) as 1 | 2 | 3)
        changeThemeVariant(newVariant, -1) // -1 for left direction
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [heroVariant, themeSettings.theme, isTransitioning])

  // Add swipe gesture handling
  const handleSwipe = (e: TouchEvent) => {
    if (isTransitioning) return

    const touchEnd = e.changedTouches[0].clientX
    const touchStart = (e as any).startX || touchEnd
    const threshold = 50 // Minimum swipe distance

    if (touchEnd < touchStart - threshold) {
      // Swiped left, go to next variant
      const newVariant = heroVariant === 3 ? 1 : ((heroVariant + 1) as 1 | 2 | 3)
      changeThemeVariant(newVariant, 1)
    } else if (touchEnd > touchStart + threshold) {
      // Swiped right, go to previous variant
      const newVariant = heroVariant === 1 ? 3 : ((heroVariant - 1) as 1 | 2 | 3)
      changeThemeVariant(newVariant, -1)
    }
  }

  // Track touch start position
  const handleTouchStart = (e: TouchEvent) => {
    ;(e as any).startX = e.touches[0].clientX
  }

  // Add touch event listeners
  useEffect(() => {
    const element = document.getElementById("hero-container")
    if (element) {
      element.addEventListener("touchstart", handleTouchStart as any)
      element.addEventListener("touchend", handleSwipe as any)

      return () => {
        element.removeEventListener("touchstart", handleTouchStart as any)
        element.removeEventListener("touchend", handleSwipe as any)
      }
    }
  }, [heroVariant, isTransitioning])

  const handleThemeSettings = (newSettings: ThemeSettings) => {
    setThemeSettings(newSettings)

    // Apply font changes - update CSS variables and force apply to elements
    document.documentElement.style.setProperty("--heading-font-family", newSettings.headingFont)
    document.documentElement.style.setProperty("--text-font-family", newSettings.textFont)

    // Force apply heading font to all h1-h6 elements AND their child spans
    // Use setTimeout to ensure this happens after the DOM has updated
    setTimeout(() => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      headingElements.forEach((el) => {
        ;(el as HTMLElement).style.fontFamily = newSettings.headingFont

        // Also apply to all spans inside headings
        const spans = el.querySelectorAll("span")
        spans.forEach((span) => {
          ;(span as HTMLElement).style.fontFamily = newSettings.headingFont
        })
      })
    }, 50)

    // Always use default spacing
    document.documentElement.classList.remove("spacing-compact", "spacing-default", "spacing-comfortable")
    document.documentElement.classList.add("spacing-default")

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

  // Animation variants for variant 1 only
  const marqueeVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "30%" : "-30%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-30%" : "30%",
      opacity: 0,
    }),
  }

  // Render the appropriate hero variant
  const renderHeroContent = () => {
    // For variant 1, we'll use the marquee transition
    if (heroVariant === 1) {
      return (
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key="variant-1"
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
            <div className="py-20 text-center lg:py-40 w-full">
              <h1 className="animate-fade-in text-4xl font-medium tracking-tighter text-foreground sm:text-6xl md:text-9xl w-full m-0 p-0">
                <MarqueeHeading
                  text="Just Marqueee it. Look Different Fast. CMD + R. Export Code Soon."
                  className="leading-none w-full"
                  speed={15}
                  gap={100}
                  repeat={2}
                />
              </h1>
              <p className="animate-fade-in-delay-1 mx-auto mt-4 max-w-2xl text-xl text-balance text-muted-foreground px-4">
                Try different design themes fast. Built on Shadcn/UI. Hit the right arrow key, or press CMD + R. Export Code Soon.
              </p>
              <div className="animate-fade-in-delay-2">
                <EmailSubscriptionForm />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )
    }

    // For variants 2 and 3, we'll render the content directly without transitions
    if (heroVariant === 2) {
      return (
        <div className="w-full relative z-5">
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
                style={{ fontFamily: "var(--font-press-start-2p), 'Press Start 2P', 'VT323', monospace" }}
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
        </div>
      )
    }

    if (heroVariant === 3) {
      return (
        <div className="w-full relative z-5 px-4 sm:px-6 lg:px-8 tron-theme">
          {/* Red glow background */}
          <div className="absolute inset-0 tron-red-glow-bg pointer-events-none"></div>

          <div className="py-20 text-center lg:py-40 w-full flex flex-col items-center text-center relative z-10">
            <motion.h1
              className="text-4xl font-bold tracking-wider sm:text-5xl md:text-6xl max-w-3xl tron-text-outline"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: "var(--font-bruno-ace), 'Bruno Ace', sans-serif",
                textTransform: "none",
              }}
            >
              Try different designs fast
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-base text-muted-foreground tron-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ fontFamily: "var(--tron-heading-font)" }}
            >
              Built on Shadcn/UI. Hit the right arrow key, or press CMD + R. Export Code Soon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-8 w-full max-w-md"
            >
              <EmailSubscriptionForm theme="tron" />
            </motion.div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div
      id="hero-container"
      className={`relative overflow-hidden bg-background min-h-screen ${
        heroVariant === 2 ? "minecraft-theme" : heroVariant === 3 ? "tron-theme" : ""
      } ${heroVariant === 3 ? "tron-grid-bg" : ""}`}
    >
      {/* Gradient background - positioned absolutely to cover the full height */}
      <div
        className={`absolute inset-0 pointer-events-none ${heroVariant === 2 ? "minecraft-night-sky" : ""}`}
        style={{
          background:
            heroVariant !== 2 && heroVariant !== 3
              ? `linear-gradient(to top, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.2) 40%, transparent 100%)`
              : heroVariant === 3
                ? `linear-gradient(to top, rgba(255, 50, 50, 0.3) 0%, rgba(255, 50, 50, 0.1) 40%, transparent 100%)`
                : undefined,
          zIndex: 0,
          transition: "background 0.3s ease-in-out",
        }}
        aria-hidden="true"
      />

      {/* Hero content - changes based on variant */}
      <motion.div className="transition-opacity duration-300" style={{ opacity: isTransitioning ? 0.7 : 1 }}>
        {renderHeroContent()}
      </motion.div>

      {/* Dashboard section */}
      <div className="animate-fade-in-up mx-auto max-w-screen-2xl px-4 pb-16 sm:px-6 lg:px-8 relative z-10">
        <div className="relative mx-auto max-w-screen-2xl">
          {/* Dashboard container */}
          <motion.div
            className={`relative h-[600px] overflow-hidden rounded-xl border border-border bg-card/30 shadow-xl dark:border-border/90 dark:bg-card/20 backdrop-blur-sm transition-all duration-300 ${
              heroVariant === 3 ? "tron-neon-box" : "ring-4 ring-black/20 dark:ring-black/20"
            }`}
            style={{
              opacity: isTransitioning ? 0.7 : 1,
            }}
          >
            <Dashboard heroVariant={heroVariant} />
          </motion.div>
        </div>
      </div>

      {/* Theme indicator dots */}
      <div className="fixed bottom-24 left-0 right-0 z-40 flex justify-center gap-2">
        {[1, 2, 3].map((variant) => (
          <button
            key={variant}
            className={`w-2 h-2 rounded-full transition-all ${
              heroVariant === variant ? "bg-primary w-4" : "bg-primary/30 hover:bg-primary/50"
            }`}
            onClick={() => changeThemeVariant(variant as 1 | 2 | 3, variant > heroVariant ? 1 : -1)}
            aria-label={`Switch to theme variant ${variant}`}
          />
        ))}
      </div>

      {/* Dynamic Island Menu */}
      <DynamicIslandMenu onThemeChange={handleThemeSettings} heroVariant={heroVariant} />
    </div>
  )
}
