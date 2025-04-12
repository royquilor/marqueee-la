"use server"

import { Anthropic } from "@anthropic-ai/sdk"

export async function testAnthropicApi() {
  try {
    // Check if API key exists
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      return {
        success: false,
        message: "ANTHROPIC_API_KEY is not set in environment variables",
        apiKeyPresent: false,
      }
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey,
    })

    // Make a simple test request
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 10,
      messages: [
        {
          role: "user",
          content: "Say hello in one word",
        },
      ],
    })

    // If we get here, the API call was successful
    return {
      success: true,
      message: "API connection successful! Response: " + response.content[0].text,
      apiKeyPresent: true,
    }
  } catch (error: any) {
    console.error("Error testing Anthropic API:", error)

    // Return detailed error information
    return {
      success: false,
      message: `API error: ${error.message || "Unknown error"}`,
      apiKeyPresent: true,
      error: error.toString(),
    }
  }
}
