"use server"

import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import type { Section, Theme } from "@/lib/types"

// Base prompt for UI generation
const baseSystemPrompt = `
You are an expert UI/UX designer and React developer specializing in Tailwind CSS.
Generate high-quality, responsive React components using Tailwind CSS based on the user's requirements.
Your code should be clean, accessible, and follow best practices.
Use only Lucide React for icons with a consistent size of 16x16 pixels.
Ensure all components are fully responsive and work well on all screen sizes.
`

// Server action to generate a section
export async function generateSectionAction(
  sectionType: string,
  prompt: string,
  theme: Theme,
): Promise<{ code: string; variant: number }> {
  console.log("Server action: Generating section with Anthropic API...")
  console.log("Section type:", sectionType)
  console.log("Prompt:", prompt)

  // Check if we have the API key
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.log("No API key found, using fallback")
    return generateMockSection(sectionType, prompt, theme)
  }

  // Create a specific prompt for hero sections with email subscription
  const isHeroWithEmailSubscription =
    sectionType === "hero" &&
    (prompt.toLowerCase().includes("email") ||
      prompt.toLowerCase().includes("subscribe") ||
      prompt.toLowerCase().includes("subscription") ||
      prompt.toLowerCase().includes("input"))

  const systemPrompt = `
${baseSystemPrompt}

You are generating a ${sectionType} section for a website with the following theme:
- Primary color: ${theme.colors.primary}
- Font family: ${theme.headingFont || "Inter, sans-serif"}
- Border radius: ${theme.borderRadius}px

IMPORTANT INSTRUCTIONS:
1. Use existing shadcn/ui components like Button, Input, Card, etc. from "@/components/ui/..."
2. For icons, only use Lucide React icons with a consistent size of 16px (h-4 w-4)
3. Make sure to use the 'variant="primary"' prop on primary buttons
4. Return ONLY the React component code without any explanations or markdown formatting
5. The component should be a function that accepts 'variant' and 'theme' props
6. Make the component fully responsive with Tailwind's responsive classes (sm:, md:, lg:)
7. If the user requests a form or input fields, implement them with proper validation
8. Use the theme's primary color for important UI elements

Example of using existing components:
\`\`\`tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
\`\`\`

${
  isHeroWithEmailSubscription
    ? `
For a hero section with an email subscription form, include:
- A heading (h1)
- Descriptive text
- An email input field
- A submit button with variant="primary"
`
    : ""
}
`

  try {
    console.log("Calling Anthropic API...")
    // Use the server-side API key
    const { text } = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: systemPrompt,
      prompt: `Create a ${sectionType} section with the following requirements: ${prompt}
      
Be specific and detailed in your implementation. ${isHeroWithEmailSubscription ? "Include an email subscription form with an input field and a submit button." : ""}

Remember to:
- Use existing UI components from shadcn/ui
- Make the design responsive
- Follow accessibility best practices
- Use the theme's primary color for important UI elements
- Implement any forms or interactive elements the user requests`,
      temperature: 0.7, // Add some creativity but not too random
      maxTokens: 2000, // Allow for longer responses
    })

    console.log("AI response received, length:", text.length)
    const cleanedCode = cleanGeneratedCode(text)
    console.log("Cleaned code, length:", cleanedCode.length)

    return {
      code: cleanedCode,
      variant: 1, // Default to variant 1 for new sections
    }
  } catch (error) {
    console.error("Error generating section:", error)
    // Fallback to mock response on error
    return generateMockSection(sectionType, prompt, theme)
  }
}

// Server action to analyze a section
export async function analyzeSectionAction(section: Section, currentCode: string): Promise<{ suggestions: string[] }> {
  const systemPrompt = `
You are an expert UI/UX designer and React developer specializing in Tailwind CSS.
Analyze the provided React component and provide specific, actionable suggestions for improvement.
Focus on design, user experience, accessibility, and code quality.
Provide 3-5 concise, specific suggestions.
`

  try {
    const { text } = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: systemPrompt,
      prompt: `Analyze this ${section.type} section (variant ${section.variant}):\n\n${currentCode}`,
    })

    // Parse the suggestions from the response
    const suggestions = text
      .split(/\d+\./)
      .filter(Boolean)
      .map((suggestion) => suggestion.trim())

    return { suggestions }
  } catch (error) {
    console.error("Error analyzing section:", error)
    // Fallback on error
    return {
      suggestions: [
        "Consider adding more contrast between text and background for better readability.",
        "Improve mobile responsiveness by adjusting padding and margins on smaller screens.",
        "Add hover states to interactive elements for better user feedback.",
        "Consider using semantic HTML elements to improve accessibility.",
        "Optimize performance by reducing unnecessary re-renders.",
      ],
    }
  }
}

// Server action to generate a theme
export async function generateThemeAction(prompt: string): Promise<Partial<Theme>> {
  try {
    const systemPrompt = `
You are an expert UI/UX designer specializing in creating beautiful color schemes and themes.
Generate a theme based on the user's prompt with the following properties:
- primary: A hex color code for the primary brand color
- secondary: A hex color code for the secondary color
- background: A hex color code for the background
- foreground: A hex color code for the text that contrasts well with the background
- muted: A hex color code for subtle backgrounds
- mutedForeground: A hex color code for subtle text
- borderRadius: A number between 0 and 24 for the border radius
- headingFont: A font family for headings
- bodyFont: A font family for body text

Return ONLY a JSON object with these properties, nothing else.
`
    const { text } = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: systemPrompt,
      prompt: `Create a theme based on this description: ${prompt}`,
    })

    // Parse the JSON response
    try {
      const themeData = JSON.parse(text.trim())
      return {
        colors: {
          primary: themeData.primary || "#3b82f6",
          secondary: themeData.secondary || "#6b7280",
          background: themeData.background || "#1e293b",
          foreground: themeData.foreground || "#f8fafc",
          muted: themeData.muted || "#334155",
          mutedForeground: themeData.mutedForeground || "#94a3b8",
        },
        borderRadius: themeData.borderRadius || 8,
        headingFont: themeData.headingFont || "Inter, sans-serif",
        bodyFont: themeData.bodyFont || "Inter, sans-serif",
      }
    } catch (e) {
      console.error("Error parsing theme JSON:", e)
      // Fallback to a simulated theme
      return simulateThemeGeneration(prompt)
    }
  } catch (error) {
    console.error("Error generating theme:", error)
    return simulateThemeGeneration(prompt)
  }
}

// Server action to generate a personalized theme
export async function generatePersonalizedThemeAction(options: {
  targetUser?: string
  industry?: string
  productType?: string
}): Promise<Partial<Theme>> {
  try {
    const systemPrompt = `
You are an expert UI/UX designer specializing in creating beautiful color schemes and themes.
Generate a theme based on the user's specifications with the following properties:
- primary: A hex color code for the primary brand color
- secondary: A hex color code for the secondary color
- background: A hex color code for the background
- foreground: A hex color code for the text that contrasts well with the background
- muted: A hex color code for subtle backgrounds
- mutedForeground: A hex color code for subtle text
- borderRadius: A number between 0 and 24 for the border radius
- headingFont: A font family for headings
- bodyFont: A font family for body text

Return ONLY a JSON object with these properties, nothing else.
`
    const { text } = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: systemPrompt,
      prompt: `Create a theme for a ${options.productType || "website"} in the ${options.industry || "general"} industry, targeting ${options.targetUser || "general users"}.`,
    })

    // Parse the JSON response
    try {
      const themeData = JSON.parse(text.trim())
      return {
        colors: {
          primary: themeData.primary || "#3b82f6",
          secondary: themeData.secondary || "#6b7280",
          background: themeData.background || "#1e293b",
          foreground: themeData.foreground || "#f8fafc",
          muted: themeData.muted || "#334155",
          mutedForeground: themeData.mutedForeground || "#94a3b8",
        },
        borderRadius: themeData.borderRadius || 8,
        headingFont: themeData.headingFont || "Inter, sans-serif",
        bodyFont: themeData.bodyFont || "Inter, sans-serif",
      }
    } catch (e) {
      console.error("Error parsing theme JSON:", e)
      // Fallback to a simulated theme
      return simulatePersonalizedThemeGeneration(options)
    }
  } catch (error) {
    console.error("Error generating personalized theme:", error)
    return simulatePersonalizedThemeGeneration(options)
  }
}

// Helper function to clean up generated code
function cleanGeneratedCode(code: string): string {
  console.log("Cleaning generated code...")

  // Remove markdown code blocks if present
  code = code.replace(/```(jsx|tsx|javascript|typescript)?([\s\S]*?)```/g, "$2").trim()

  // Remove import statements for components we already have
  code = code.replace(/import\s+{\s*Button\s*}\s+from\s+["']@\/components\/ui\/button["'];?/g, "")
  code = code.replace(/import\s+{\s*Input\s*}\s+from\s+["']@\/components\/ui\/input["'];?/g, "")
  code = code.replace(/import\s+{\s*Card[^}]*}\s+from\s+["']@\/components\/ui\/card["'];?/g, "")

  // Ensure we're using the right imports for Lucide icons
  code = code.replace(
    /import\s+{\s*([^}]+)\s*}\s+from\s+["']lucide-react["'];?/g,
    "import { Clock1Icon as $1 } from 'lucide-react';",
  )

  // Fix any missing imports for shadcn components
  if (code.includes("Button") && !code.includes("import { Button }")) {
    code = `import { Button } from "@/components/ui/button"\n${code}`
  }
  if (code.includes("Input") && !code.includes("import { Input }")) {
    code = `import { Input } from "@/components/ui/input"\n${code}`
  }
  if (code.includes("Card") && !code.includes("import { Card }")) {
    code = `import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"\n${code}`
  }

  return code
}

// Generate mock sections when API is not available
function generateMockSection(sectionType: string, prompt: string, theme: Theme): { code: string; variant: number } {
  console.log("Generating mock section as fallback")

  // Create a simple mock section based on the section type
  let mockCode = ""

  switch (sectionType) {
    case "hero":
      // Always include an email subscription form for hero sections
      mockCode = `
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Theme } from "@/lib/types"
import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  variant: number
  theme: Theme
}

export function HeroSection({ variant, theme }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              ${prompt.length > 10 ? prompt.split(" ").slice(0, 5).join(" ") + "..." : "AI-Generated Hero Section"}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              ${prompt.length > 10 ? prompt : "This is a hero section generated based on your requirements."}
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">Sign up to get updates. No spam ever.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
`
      break
    // Other cases remain the same as in your original code
    default:
      mockCode = `
import type { Theme } from "@/lib/types"

interface ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}SectionProps {
  variant: number
  theme: Theme
}

export function ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)}Section({ variant, theme }: ${
        sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
      }SectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Mock ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Section</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              This is a mock ${sectionType} section generated when the AI API is not available.
            </p>
            <p className="text-sm text-muted-foreground">
              Your prompt: ${prompt}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
`
  }

  return {
    code: mockCode,
    variant: 1,
  }
}

// Simulate theme generation for fallback
function simulateThemeGeneration(prompt: string): Partial<Theme> {
  // Generate a random color palette based on the prompt
  const hue = Math.floor(Math.random() * 360)

  return {
    colors: {
      primary: `hsl(${hue}, 80%, 50%)`,
      secondary: `hsl(${(hue + 30) % 360}, 60%, 60%)`,
      background: prompt.toLowerCase().includes("dark") ? "#121212" : "#ffffff",
      foreground: prompt.toLowerCase().includes("dark") ? "#ffffff" : "#121212",
      muted: prompt.toLowerCase().includes("dark") ? "#1e1e1e" : "#f5f5f5",
      mutedForeground: prompt.toLowerCase().includes("dark") ? "#a1a1a1" : "#6c757d",
    },
    borderRadius: prompt.toLowerCase().includes("sharp") ? 0 : prompt.toLowerCase().includes("rounded") ? 12 : 8,
    headingFont: selectHeadingFontBasedOnPrompt(prompt),
    bodyFont: selectBodyFontBasedOnPrompt(prompt),
  }
}

// Simulate personalized theme generation for fallback
function simulatePersonalizedThemeGeneration(options: {
  targetUser?: string
  industry?: string
  productType?: string
}): Partial<Theme> {
  const { targetUser, industry, productType } = options
  let hue = 210 // Default blue
  let borderRadius = 8
  const headingFont = "Inter, sans-serif"
  const bodyFont = "Inter, sans-serif"
  let isDark = false

  // Adjust hue based on industry
  if (industry) {
    switch (industry.toLowerCase()) {
      case "technology":
        hue = 210 // Blue
        break
      case "healthcare":
        hue = 180 // Teal
        break
      case "finance":
        hue = 230 // Navy
        break
      case "education":
        hue = 120 // Green
        break
      case "entertainment":
        hue = 300 // Purple
        break
    }
  }

  // Adjust border radius based on product type
  if (productType) {
    switch (productType.toLowerCase()) {
      case "corporate":
      case "saas":
        borderRadius = 4
        break
      case "e-commerce":
      case "blog":
        borderRadius = 8
        break
      case "mobile app":
      case "community":
        borderRadius = 12
        break
      case "landing page":
        borderRadius = 16
        break
    }
  }

  // Determine if dark theme based on industry and product type
  if (
    (industry && ["entertainment", "technology"].includes(industry.toLowerCase())) ||
    (productType && ["mobile app", "saas"].includes(productType.toLowerCase()))
  ) {
    isDark = Math.random() > 0.5 // 50% chance of dark theme for these categories
  }

  return {
    colors: {
      primary: `hsl(${hue}, 80%, 50%)`,
      secondary: `hsl(${(hue + 30) % 360}, 60%, 60%)`,
      background: isDark ? "#121212" : "#ffffff",
      foreground: isDark ? "#ffffff" : "#121212",
      muted: isDark ? "#1e1e1e" : "#f5f5f5",
      mutedForeground: isDark ? "#a1a1a1" : "#6c757d",
    },
    borderRadius,
    headingFont,
    bodyFont,
  }
}

// Helper function to select a heading font based on the prompt
function selectHeadingFontBasedOnPrompt(prompt: string): string {
  const promptLower = prompt.toLowerCase()

  if (promptLower.includes("modern") || promptLower.includes("clean")) {
    return "Inter, sans-serif"
  } else if (promptLower.includes("traditional") || promptLower.includes("serious")) {
    return "Merriweather, serif"
  } else if (promptLower.includes("playful") || promptLower.includes("friendly")) {
    return "Poppins, sans-serif"
  } else if (promptLower.includes("elegant") || promptLower.includes("luxury")) {
    return "Playfair Display, serif"
  } else if (promptLower.includes("tech") || promptLower.includes("code")) {
    return "Roboto Mono, monospace"
  } else {
    // Random selection if no specific keywords
    const fonts = [
      "Inter, sans-serif",
      "Roboto, sans-serif",
      "Poppins, sans-serif",
      "Montserrat, sans-serif",
      "Playfair Display, serif",
    ]
    return fonts[Math.floor(Math.random() * fonts.length)]
  }
}

// Helper function to select a body font based on the prompt
function selectBodyFontBasedOnPrompt(prompt: string): string {
  const promptLower = prompt.toLowerCase()

  if (promptLower.includes("readable") || promptLower.includes("clean")) {
    return "Inter, sans-serif"
  } else if (promptLower.includes("traditional") || promptLower.includes("serious")) {
    return "Source Sans Pro, sans-serif"
  } else if (promptLower.includes("playful") || promptLower.includes("friendly")) {
    return "Open Sans, sans-serif"
  } else if (promptLower.includes("elegant") || promptLower.includes("luxury")) {
    return "Lato, sans-serif"
  } else if (promptLower.includes("tech") || promptLower.includes("code")) {
    return "Roboto, sans-serif"
  } else {
    // Random selection if no specific keywords
    const fonts = [
      "Inter, sans-serif",
      "Roboto, sans-serif",
      "Open Sans, sans-serif",
      "Lato, sans-serif",
      "Source Sans Pro, sans-serif",
    ]
    return fonts[Math.floor(Math.random() * fonts.length)]
  }
}
