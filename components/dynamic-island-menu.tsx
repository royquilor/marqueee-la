"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronLeft, Moon, Sun, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "@/components/theme-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Default font values
const DEFAULT_HEADING_FONT = "Inter, sans-serif"
const DEFAULT_TEXT_FONT = "Inter, sans-serif"

// Font categories and options
const fontCategories = [
  {
    name: "Clean",
    fonts: [
      { name: "Arial", value: "Arial, Helvetica, sans-serif" },
      {
        name: "System UI",
        value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      },
      { name: "Inter", value: "var(--font-inter), system-ui, sans-serif" },
      { name: "DM Sans", value: "var(--font-dm-sans), system-ui, sans-serif" },
      { name: "Manrope", value: "var(--font-manrope), system-ui, sans-serif" },
    ],
  },
  {
    name: "Elegant",
    fonts: [
      { name: "Georgia", value: "Georgia, serif" },
      { name: "System Serif", value: "Georgia, Cambria, 'Times New Roman', Times, serif" },
      { name: "Instrument Serif", value: "var(--font-instrument-serif), Georgia, serif" },
      { name: "Playfair Display", value: "var(--font-playfair-display), Georgia, serif" },
    ],
  },
  {
    name: "Fun",
    fonts: [
      { name: "Verdana", value: "Verdana, Geneva, sans-serif" },
      { name: "Nunito", value: "var(--font-nunito), sans-serif" },
    ],
  },
  {
    name: "Retro",
    fonts: [
      { name: "Courier New", value: "Courier New, Courier, monospace" },
      { name: "Press Start 2P", value: "var(--font-press-start-2p), 'Press Start 2P', monospace" },
      { name: "Silkscreen", value: "var(--font-silkscreen), sans-serif" },
      { name: "Honk", value: "var(--font-honk), sans-serif" },
    ],
  },
  {
    name: "Experimental",
    fonts: [
      { name: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
      { name: "Orbitron", value: "var(--font-orbitron), 'Orbitron', sans-serif" },
      { name: "Audiowide", value: "var(--font-audiowide), 'Audiowide', sans-serif" },
      { name: "Bruno Ace", value: "var(--font-bruno-ace), 'Bruno Ace', sans-serif" },
      { name: "Bruno Ace SC", value: "var(--font-bruno-ace-sc), 'Bruno Ace SC', sans-serif" },
    ],
  },
]

// Flatten all fonts for random selection
const allFonts = fontCategories.flatMap((category) => category.fonts)

// Theme options
const colorOptions = [
  { name: "red-600", color: "#dc2626" },
  { name: "orange-600", color: "#ea580c" },
  { name: "green-600", color: "#16a34a" },
  { name: "blue-600", color: "#2563eb" },
  { name: "purple-600", color: "#9333ea" },
  { name: "yellow-600", color: "#ca8a04" },
  { name: "pink-600", color: "#db2777" },
]
const themeOptions = [
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "system", label: "Auto" },
]
const spacingOptions = ["Compact", "Default", "Comfortable"]
const radiusOptions = ["None", "Small", "Default", "Large", "Full"]

// MARQUEEE letters for the animation
const MARQUEEE_LETTERS = ["M", "A", "R", "Q", "U", "E", "E", "E"]

interface DynamicIslandMenuProps {
  onThemeChange: (ThemeSettings) => void
}

export interface ThemeSettings {
  headingFont: string
  textFont: string
  color: string
  spacing: string
  radius: string
  theme: "light" | "dark" | "system"
}

export function DynamicIslandMenu({ onThemeChange }: DynamicIslandMenuProps) {
  const { theme, setTheme } = useTheme()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [fontTab, setFontTab] = useState<"heading" | "text">("heading")
  const [aiPrompt, setAiPrompt] = useState<string>("")
  const [isRandomizing, setIsRandomizing] = useState(false)
  const [currentMarqueeLetter, setCurrentMarqueeLetter] = useState("M")
  const [isMarqueeAnimating, setIsMarqueeAnimating] = useState(false)
  const [showAmbientLight, setShowAmbientLight] = useState(true)
  const [settings, setSettings] = useState<ThemeSettings>({
    headingFont: DEFAULT_HEADING_FONT,
    textFont: DEFAULT_TEXT_FONT,
    color: "blue-600",
    spacing: "Default",
    radius: "Default",
    theme: theme as "light" | "dark" | "system",
  })
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const slotRef = useRef<HTMLDivElement>(null)

  // Track key presses for custom shortcut detection
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set())

  // Add keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Add the key to the set of pressed keys
      setKeysPressed((prev) => {
        const updated = new Set(prev)
        updated.add(event.key.toLowerCase())
        return updated
      })

      // Check if both Command and R are pressed (for Mac)
      if (keysPressed.has("meta") && event.key.toLowerCase() === "r") {
        event.preventDefault()
        triggerRandomTheme()
      }
      // Check if both Control and R are pressed (for Windows/Linux)
      else if (keysPressed.has("control") && event.key.toLowerCase() === "r") {
        event.preventDefault()
        triggerRandomTheme()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      // Remove the key from the set of pressed keys
      setKeysPressed((prev) => {
        const updated = new Set(prev)
        updated.delete(event.key.toLowerCase())
        return updated
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [keysPressed]) // Depend on keysPressed to track combinations

  // Effect to fade out the ambient light after a few seconds
  useEffect(() => {
    // Keep the ambient light visible for longer initially
    const timer = setTimeout(() => {
      setShowAmbientLight(false)
    }, 8000) // Show for 8 seconds initially

    return () => clearTimeout(timer)
  }, [])

  // Function to trigger random theme and marquee animation
  const triggerRandomTheme = () => {
    if (!isRandomizing && !isMarqueeAnimating) {
      generateRandomTheme()
      animateMarquee()
      // Show the ambient light again when randomizing
      setShowAmbientLight(true)
      // And hide it again after a few seconds
      setTimeout(() => {
        setShowAmbientLight(false)
      }, 5000)
    }
  }

  // Function to animate through the MARQUEEE letters like a slot machine
  const animateMarquee = () => {
    setIsMarqueeAnimating(true)

    // Create a sequence of letters for the slot machine effect
    // We'll create a longer sequence to make the animation more interesting
    const slotSequence = []

    // Generate a random sequence of 20 letters
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * MARQUEEE_LETTERS.length)
      slotSequence.push(MARQUEEE_LETTERS[randomIndex])
    }

    // Add the final letter (random)
    const finalIndex = Math.floor(Math.random() * MARQUEEE_LETTERS.length)
    const finalLetter = MARQUEEE_LETTERS[finalIndex]
    slotSequence.push(finalLetter)

    // Start the animation
    let currentIndex = 0
    const totalFrames = slotSequence.length

    // Speed up at start, slow down at end
    const getDelay = (index: number, total: number) => {
      if (index < total / 3) return 50 // Fast at start
      if (index < (total * 2) / 3) return 70 // Medium in middle
      return 100 + (index - (total * 2) / 3) * 20 // Gradually slower at end
    }

    const animateNextLetter = () => {
      if (currentIndex >= totalFrames) {
        // Animation complete
        setCurrentMarqueeLetter(finalLetter)
        setTimeout(() => {
          setIsMarqueeAnimating(false)
        }, 500)
        return
      }

      setCurrentMarqueeLetter(slotSequence[currentIndex])
      currentIndex++

      // Schedule next frame with variable timing
      setTimeout(animateNextLetter, getDelay(currentIndex, totalFrames))
    }

    // Start the animation
    animateNextLetter()
  }

  const updateSettings = (key: keyof ThemeSettings, value: string) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onThemeChange(newSettings)

    // Update theme if that's what changed
    if (key === "theme") {
      setTheme(value as "light" | "dark" | "system")
    }
  }

  const handleFontSelection = (fontValue: string) => {
    // Update either headingFont or textFont based on the active tab
    const key = fontTab === "heading" ? "headingFont" : "textFont"
    updateSettings(key, fontValue)
  }

  const handleResetFonts = () => {
    // Reset both heading and text fonts to defaults
    const newSettings = {
      ...settings,
      headingFont: DEFAULT_HEADING_FONT,
      textFont: DEFAULT_TEXT_FONT,
    }
    setSettings(newSettings)
    onThemeChange(newSettings)
  }

  const handleGenerateTheme = () => {
    // Here you would implement the AI theme generation logic
    console.log("Generating theme based on:", aiPrompt)
    // For now, just close the menu
    setActiveMenu(null)
  }

  // Function to generate random theme settings
  const generateRandomTheme = () => {
    setIsRandomizing(true)

    // Create a sequence of random settings to animate through
    const animationSteps = 10
    let step = 0

    const interval = setInterval(() => {
      // Generate random settings
      const randomHeadingFont = allFonts[Math.floor(Math.random() * allFonts.length)].value
      const randomTextFont = allFonts[Math.floor(Math.random() * allFonts.length)].value
      const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)].name
      const randomSpacing = spacingOptions[Math.floor(Math.random() * spacingOptions.length)]
      const randomRadius = radiusOptions[Math.floor(Math.random() * radiusOptions.length)]

      // Update settings for animation effect
      const newSettings = {
        ...settings,
        headingFont: randomHeadingFont,
        textFont: randomTextFont,
        color: randomColor,
        spacing: randomSpacing,
        radius: randomRadius,
        // Keep the current theme
        theme: settings.theme,
      }

      setSettings(newSettings)
      onThemeChange(newSettings)

      step++

      // Stop after animation steps
      if (step >= animationSteps) {
        clearInterval(interval)
        setIsRandomizing(false)
      }
    }, 100) // 100ms between each change
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    }),
  }

  const renderMainMenu = () => (
    <motion.div
      className="flex space-x-1 p-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* MARQUEEE Logo - Slot Machine Style */}
      <motion.div
        className="flex items-center justify-center mr-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className="w-7 h-7 rounded-full text-foreground font-bold text-sm flex items-center justify-center overflow-hidden"
          ref={slotRef}
        >
          <motion.div
            className="flex flex-col items-center justify-center"
            animate={
              isMarqueeAnimating ? { y: [0, -20], transition: { duration: 0.2, repeat: 1, repeatType: "reverse" } } : {}
            }
          >
            {currentMarqueeLetter}
          </motion.div>
        </div>
      </motion.div>

      {/* Menu Items */}
      {["font", "color", "spacing", "radius", "ai"].map((item, index) => (
        <motion.div key={item} custom={index} variants={itemVariants} initial="hidden" animate="visible">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-4 text-sm text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setActiveMenu(item)}
          >
            {item === "ai" ? "AI" : item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )

  const getOptionsForMenu = (menu: string) => {
    switch (menu) {
      case "spacing":
        return spacingOptions
      case "radius":
        return radiusOptions
      default:
        return []
    }
  }

  const renderSubMenu = (menu: string) => {
    // Special handling for font menu with categories
    if (menu === "font") {
      // Get the current font value based on the active tab
      const currentFont = fontTab === "heading" ? settings.headingFont : settings.textFont

      return (
        <motion.div
          className="flex items-center p-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ width: "auto", maxWidth: "484px" }}
        >
          {/* Back button */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-2 text-sm text-white/70 hover:text-white hover:bg-white/10 flex-shrink-0"
            onClick={() => setActiveMenu(null)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="capitalize">{menu}</span>
          </Button>

          {/* Segmented control for font type */}
          <div className="flex bg-white/10 rounded-full p-0.5 mx-2 flex-shrink-0">
            <button
              type="button"
              className={`h-7 px-3 flex items-center justify-center text-sm rounded-full transition-colors ${
                fontTab === "heading" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
              onClick={() => setFontTab("heading")}
            >
              Heading
            </button>
            <button
              type="button"
              className={`h-7 px-3 flex items-center justify-center text-sm rounded-full transition-colors ${
                fontTab === "text" ? "bg-white text-black" : "text-white/70 hover:text-white"
              }`}
              onClick={() => setFontTab("text")}
            >
              Text
            </button>
          </div>

          {/* Font categories in a scrollable container */}
          <div className="flex overflow-x-auto scrollbar-hide gap-2 flex-1">
            {fontCategories.map((category) => (
              <div key={category.name} className="flex-shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center justify-between px-3 py-1 rounded-full bg-white/5 min-w-[100px] h-auto text-sm text-white/70 hover:text-white"
                    >
                      <span>{category.name}</span>
                      <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="bg-black/90 backdrop-blur-lg border-white/10"
                    style={{ minWidth: "150px" }}
                  >
                    {category.fonts.map((font) => (
                      <DropdownMenuItem
                        key={font.value}
                        className={`text-sm ${currentFont === font.value ? "bg-white/10" : ""}`}
                        style={{ fontFamily: font.value }}
                        onSelect={() => handleFontSelection(font.value)}
                      >
                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

            {/* Reset button */}
            <div className="flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFonts}
                className="flex items-center justify-center px-3 py-1 rounded-full bg-white/5 h-auto text-sm text-white/70 hover:text-white"
              >
                Reset
              </Button>
            </div>
          </div>
        </motion.div>
      )
    }

    // Special handling for AI menu
    if (menu === "ai") {
      return (
        <motion.div
          className="flex flex-col p-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ width: "320px" }}
        >
          <Textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe your theme..."
            className="w-full bg-transparent border border-white/20 rounded-md text-white text-sm resize-none focus:border-white/40 focus:ring-0 placeholder:text-white/40 mb-2"
            style={{ maxHeight: "80px" }}
          />

          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setActiveMenu(null)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="rounded-md text-sm text-white hover:text-white hover:bg-white/10 border-white/20 hover:border-white/40"
              onClick={handleGenerateTheme}
            >
              <Wand2 className="h-3.5 w-3.5 mr-1.5" />
              Generate
            </Button>
          </div>
        </motion.div>
      )
    }

    // Special handling for color menu with theme options
    if (menu === "color") {
      return (
        <motion.div
          className="flex items-center p-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div variants={itemVariants} custom={0} className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full px-2 text-sm text-white/70 hover:text-white hover:bg-white/10"
              onClick={() => setActiveMenu(null)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span className="capitalize">{menu}</span>
            </Button>
          </motion.div>

          <div
            ref={scrollContainerRef}
            className="flex items-center space-x-4 overflow-x-auto max-w-[576px] px-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex-shrink-0">
              <div className="flex space-x-1">
                {colorOptions.map((colorOption, index) => (
                  <motion.div
                    key={colorOption.name}
                    custom={index + 1}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex-shrink-0"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`rounded-full p-1 flex items-center justify-center ${
                        settings.color === colorOption.name ? "bg-white/10" : "hover:bg-white/10"
                      }`}
                      onClick={() => updateSettings("color", colorOption.name)}
                      title={
                        colorOption.name.split("-")[0].charAt(0).toUpperCase() + colorOption.name.split("-")[0].slice(1)
                      }
                    >
                      <span
                        className={`w-6 h-6 rounded-full border border-white/20 ${
                          settings.color === colorOption.name ? "ring-1 ring-white" : ""
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                      />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 flex-shrink-0 mx-2"></div>

            <div className="flex-shrink-0">
              <div className="flex bg-white/10 rounded-full p-0.5">
                {themeOptions.map((themeOption, index) => {
                  const Icon = themeOption.icon
                  return (
                    <motion.div
                      key={themeOption.name}
                      custom={index + colorOptions.length + 1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex-shrink-0"
                    >
                      <button
                        type="button"
                        className={`h-7 px-3 flex items-center justify-center text-sm rounded-full transition-colors ${
                          settings.theme === themeOption.name ? "bg-white text-black" : "text-white/70 hover:text-white"
                        }`}
                        onClick={() => updateSettings("theme", themeOption.name)}
                        title={themeOption.label}
                      >
                        {Icon ? <Icon className="h-3.5 w-3.5" /> : themeOption.label}
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )
    }

    const options = getOptionsForMenu(menu)
    const currentValue = settings[menu as keyof ThemeSettings]

    return (
      <motion.div
        className="flex items-center space-x-1 p-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div variants={itemVariants} custom={0}>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-2 text-sm text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setActiveMenu(null)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="capitalize">{menu}</span>
          </Button>
        </motion.div>

        <div className="overflow-x-auto max-w-[576px] flex items-center">
          {options.map((option, index) => (
            <motion.div
              key={option}
              custom={index + 1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex-shrink-0 mr-1"
            >
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-3 text-sm ${
                  currentValue.toLowerCase() === option.toLowerCase()
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => updateSettings(menu as keyof ThemeSettings, option.toLowerCase())}
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Get the current primary color value for the glow
  const getPrimaryColorValue = () => {
    const colorOption = colorOptions.find((option) => option.name === settings.color)
    return colorOption ? colorOption.color : "#2563eb" // Default to blue if not found
  }

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-center">
      {/* Enhanced ambient light effect using the primary color */}
      <div className="relative">
        {/* Outer glow */}
        <motion.div
          className="absolute -inset-8 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: showAmbientLight ? 0.6 : 0,
            scale: showAmbientLight ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: showAmbientLight ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
          }}
          style={{
            background: `radial-gradient(circle, ${getPrimaryColorValue()} 0%, transparent 70%)`,
            filter: "blur(15px)",
          }}
        />

        {/* Inner glow - more intense */}
        <motion.div
          className="absolute -inset-4 rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: showAmbientLight ? 0.4 : 0,
            scale: showAmbientLight ? [1.05, 1, 1.05] : 1,
          }}
          transition={{
            duration: 3,
            repeat: showAmbientLight ? Number.POSITIVE_INFINITY : 0,
            repeatType: "reverse",
            delay: 0.5,
          }}
          style={{
            background: `radial-gradient(circle, ${getPrimaryColorValue()} 0%, transparent 60%)`,
            filter: "blur(8px)",
          }}
        />

        <motion.div
          className={`bg-black/80 backdrop-blur-lg shadow-lg overflow-hidden z-50 ${
            activeMenu === "ai" ? "rounded-md" : "rounded-full"
          } ${showAmbientLight ? "ring-2 ring-primary/20" : "ring-2 ring-black/20"}`}
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onHoverStart={() => setShowAmbientLight(true)}
          onHoverEnd={() => {
            // Delay turning off the light to make it feel more responsive
            setTimeout(() => setShowAmbientLight(false), 1000)
          }}
        >
          <AnimatePresence mode="wait">
            {activeMenu === null ? (
              <motion.div key="main-menu" layout>
                {renderMainMenu()}
              </motion.div>
            ) : (
              <motion.div key={`submenu-${activeMenu}`} layout>
                {renderSubMenu(activeMenu)}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
