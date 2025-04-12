import type { Section, Theme } from "./types"
import { generateSectionAction, analyzeSectionAction } from "./actions"

// Function to generate a section using the server action
export async function generateSection(
  sectionType: string,
  prompt: string,
  theme: Theme,
): Promise<{ code: string; variant: number }> {
  console.log("🔍 AI Service: generateSection called with:", { sectionType, prompt })
  console.log("🔍 Theme being used:", theme)

  try {
    const result = await generateSectionAction(sectionType, prompt, theme)
    console.log("✅ AI Service: generateSection completed successfully")
    return result
  } catch (error) {
    console.error("❌ AI Service: generateSection error:", error)
    throw error
  }
}

// Function to analyze a section using the server action
export async function analyzeSection(section: Section, currentCode: string): Promise<{ suggestions: string[] }> {
  console.log("🔍 AI Service: analyzeSection called with:", { section, currentCode })

  try {
    const result = await analyzeSectionAction(section, currentCode)
    console.log("✅ AI Service: analyzeSection completed successfully")
    return result
  } catch (error) {
    console.error("❌ AI Service: analyzeSection error:", error)
    throw error
  }
}

// Mock suggestions for section analysis
export const mockSuggestions = [
  "Consider adding more contrast between text and background for better readability.",
  "Improve mobile responsiveness by adjusting padding and margins on smaller screens.",
  "Add hover states to interactive elements for better user feedback.",
  "Consider using semantic HTML elements to improve accessibility.",
  "Optimize performance by reducing unnecessary re-renders.",
]
