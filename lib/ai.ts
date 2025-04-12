import type { Theme } from "./types"
import { generateThemeAction, generatePersonalizedThemeAction } from "./actions"

// Use server action for theme generation
export async function generateTheme(prompt: string): Promise<Partial<Theme>> {
  return generateThemeAction(prompt)
}

// Use server action for personalized theme generation
export async function generatePersonalizedTheme(options: {
  targetUser?: string
  industry?: string
  productType?: string
}): Promise<Partial<Theme>> {
  return generatePersonalizedThemeAction(options)
}
