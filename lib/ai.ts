import type { Theme } from "./types"
import { generateThemeAction, generatePersonalizedThemeAction } from "./actions"

// Use server action for theme generation
export async function generateTheme(prompt: string): Promise<Partial<Theme>> {
  console.log("🔍 AI: generateTheme called with prompt:", prompt)

  try {
    const result = await generateThemeAction(prompt)
    console.log("✅ AI: generateTheme completed successfully:", result)
    return result
  } catch (error) {
    console.error("❌ AI: generateTheme error:", error)
    throw error
  }
}

// Use server action for personalized theme generation
export async function generatePersonalizedTheme(options: {
  targetUser?: string
  industry?: string
  productType?: string
}): Promise<Partial<Theme>> {
  console.log("🔍 AI: generatePersonalizedTheme called with options:", options)

  try {
    const result = await generatePersonalizedThemeAction(options)
    console.log("✅ AI: generatePersonalizedTheme completed successfully:", result)
    return result
  } catch (error) {
    console.error("❌ AI: generatePersonalizedTheme error:", error)
    throw error
  }
}
