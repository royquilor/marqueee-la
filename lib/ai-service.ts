import type { Section, Theme } from "./types"
import { generateSectionAction, analyzeSectionAction } from "./actions"

// Function to generate a section using the server action
export async function generateSection(
  sectionType: string,
  prompt: string,
  theme: Theme,
): Promise<{ code: string; variant: number }> {
  console.log("Generating section:", sectionType, prompt)
  return generateSectionAction(sectionType, prompt, theme)
}

// Function to analyze a section using the server action
export async function analyzeSection(section: Section, currentCode: string): Promise<{ suggestions: string[] }> {
  return analyzeSectionAction(section, currentCode)
}

// Mock suggestions for section analysis
export const mockSuggestions = [
  "Consider adding more contrast between text and background for better readability.",
  "Improve mobile responsiveness by adjusting padding and margins on smaller screens.",
  "Add hover states to interactive elements for better user feedback.",
  "Consider using semantic HTML elements to improve accessibility.",
  "Optimize performance by reducing unnecessary re-renders.",
]
