"use server"

import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function testAnthropicApi(): Promise<{
  success: boolean
  message: string
  apiKeyPresent: boolean
}> {
  console.log("🔍 Testing Anthropic API connection...")

  // Check if API key exists
  const apiKey = process.env.ANTHROPIC_API_KEY
  const apiKeyPresent = !!apiKey

  if (!apiKeyPresent) {
    console.log("⚠️ No Anthropic API key found")
    return {
      success: false,
      message: "No API key found. Please add ANTHROPIC_API_KEY to your environment variables.",
      apiKeyPresent: false,
    }
  }

  console.log("✅ API key found, testing connection...")

  try {
    console.log("🚀 Making test call to Anthropic API...")
    // Make a simple API call
    const { text } = await generateText({
      model: anthropic("claude-3-haiku-20240307"),
      system: "You are a helpful assistant. Respond with only the text 'API connection successful!'",
      prompt: "Test connection",
      maxTokens: 20,
    })

    console.log("✅ API response received:", text)

    return {
      success: true,
      message: `API connection successful! Response: ${text}`,
      apiKeyPresent: true,
    }
  } catch (error) {
    console.error("❌ Error testing Anthropic API:", error)

    // Extract error message
    let errorMessage = "Unknown error occurred"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    console.log("❌ Error message:", errorMessage)

    return {
      success: false,
      message: `API call failed: ${errorMessage}`,
      apiKeyPresent: true,
    }
  }
}
