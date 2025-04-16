"use server"

import { z } from "zod"
import { headers } from "next/headers"
import { addSubscription, getSubscriptionByEmail, type SubscriptionData } from "@/lib/supabase"

// List of common disposable email domains
const disposableEmailDomains = [
  "mailinator.com",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "10minutemail.com",
  "trashmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "mailnesia.com",
  "mailcatch.com",
  "dispostable.com",
  "mintemail.com",
  "tempinbox.com",
  "spamgourmet.com",
  "mailnull.com",
  "incognitomail.com",
  "getairmail.com",
  "mailexpire.com",
]

// List of common valid email domains for basic validation
const commonValidDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "mail.com",
  "zoho.com",
  "gmx.com",
  "yandex.com",
  "live.com",
  "fastmail.com",
  "me.com",
  "mac.com",
  "googlemail.com",
  "msn.com",
]

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 3600000 // 1 hour in milliseconds
const MAX_REQUESTS_PER_IP = 5 // Maximum submissions per IP per hour
const MAX_REQUESTS_PER_EMAIL_DOMAIN = 10 // Maximum submissions per email domain per hour

// In-memory store for rate limiting (would use Redis in production)
type RateLimitStore = {
  ips: Record<string, { count: number; timestamp: number }>
  domains: Record<string, { count: number; timestamp: number }>
  emails: Set<string> // Track unique emails to prevent duplicates
}

const rateLimitStore: RateLimitStore = {
  ips: {},
  domains: {},
  emails: new Set(),
}

// Form validation schema
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  formLoadTime: z.number().min(0),
  mouseMovements: z.number().min(0),
  honeypot: z.string().max(0, "Bot detected"),
})

export type SubscribeFormData = z.infer<typeof subscribeSchema>

export type SubscribeResult = {
  success: boolean
  message: string
}

/**
 * Validates an email domain using basic checks
 * @param email Email address to validate
 * @returns Boolean indicating if the domain appears valid
 */
function validateEmailDomain(email: string): boolean {
  try {
    const domain = email.split("@")[1].toLowerCase()

    // Check if it's a common valid domain
    if (commonValidDomains.includes(domain)) {
      return true
    }

    // Basic domain validation regex
    // This checks for a properly formatted domain with at least one dot
    const domainRegex =
      /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

    return domainRegex.test(domain)
  } catch (error) {
    console.error("Email domain validation failed:", error)
    return false
  }
}

/**
 * Checks if an email is from a disposable email service
 * @param email Email address to check
 * @returns Boolean indicating if the email is from a disposable service
 */
function isDisposableEmail(email: string): boolean {
  try {
    const domain = email.split("@")[1].toLowerCase()
    return disposableEmailDomains.includes(domain)
  } catch (error) {
    console.error("Disposable email check failed:", error)
    return false
  }
}

/**
 * Checks if a submission is rate limited
 * @param ip IP address of the submitter
 * @param email Email being submitted
 * @returns Boolean indicating if the submission is rate limited
 */
function isRateLimited(ip: string, email: string): boolean {
  try {
    const now = Date.now()
    const domain = email.split("@")[1].toLowerCase()

    // Clean up expired entries
    Object.entries(rateLimitStore.ips).forEach(([key, data]) => {
      if (now - data.timestamp > RATE_LIMIT_WINDOW) {
        delete rateLimitStore.ips[key]
      }
    })

    Object.entries(rateLimitStore.domains).forEach(([key, data]) => {
      if (now - data.timestamp > RATE_LIMIT_WINDOW) {
        delete rateLimitStore.domains[key]
      }
    })

    // Check IP rate limit
    if (!rateLimitStore.ips[ip]) {
      rateLimitStore.ips[ip] = { count: 0, timestamp: now }
    }

    if (rateLimitStore.ips[ip].count >= MAX_REQUESTS_PER_IP) {
      return true
    }

    // Check domain rate limit
    if (!rateLimitStore.domains[domain]) {
      rateLimitStore.domains[domain] = { count: 0, timestamp: now }
    }

    if (rateLimitStore.domains[domain].count >= MAX_REQUESTS_PER_EMAIL_DOMAIN) {
      return true
    }

    // Check for duplicate email
    if (rateLimitStore.emails.has(email)) {
      return true
    }

    return false
  } catch (error) {
    console.error("Rate limit check failed:", error)
    return false // Default to not rate limited on error
  }
}

/**
 * Updates rate limit counters for a submission
 * @param ip IP address of the submitter
 * @param email Email being submitted
 */
function updateRateLimitCounters(ip: string, email: string): void {
  try {
    const domain = email.split("@")[1].toLowerCase()

    if (!rateLimitStore.ips[ip]) {
      rateLimitStore.ips[ip] = { count: 0, timestamp: Date.now() }
    }

    if (!rateLimitStore.domains[domain]) {
      rateLimitStore.domains[domain] = { count: 0, timestamp: Date.now() }
    }

    rateLimitStore.ips[ip].count++
    rateLimitStore.domains[domain].count++
    rateLimitStore.emails.add(email)
  } catch (error) {
    console.error("Error updating rate limit counters:", error)
  }
}

/**
 * Server action to handle newsletter subscription
 * Implements multiple anti-spam techniques and stores valid submissions in Supabase
 */
export async function subscribeToNewsletter(formData: SubscribeFormData): Promise<SubscribeResult> {
  try {
    // 1. Validate form data
    const validatedData = subscribeSchema.parse(formData)
    const { email, formLoadTime, mouseMovements, honeypot } = validatedData

    // Get request headers
    const headersList = headers()
    const userAgent = headersList.get("user-agent") || ""
    const referer = headersList.get("referer") || ""

    // Get IP address (in production, this would be from X-Forwarded-For)
    // For local development, we'll use a placeholder
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"

    // 2. Check honeypot field (already validated by zod schema)

    // 3. Check timing - form should not be submitted too quickly
    const submissionTime = Date.now()
    const timeElapsed = submissionTime - formLoadTime
    if (timeElapsed < 2000) {
      // Silently accept but don't process (don't let bots know they've been detected)
      console.log("Submission too quick, likely a bot")
      return { success: true, message: "Thank you for subscribing!" }
    }

    // 4. Check mouse movements
    if (mouseMovements < 3) {
      // Silently accept but don't process
      console.log("No mouse movements, likely a bot")
      return { success: true, message: "Thank you for subscribing!" }
    }

    // 5. Check rate limiting
    if (isRateLimited(ip, email)) {
      // Return success but don't actually process
      // This prevents bots from knowing they've been rate limited
      return { success: true, message: "Thank you for subscribing!" }
    }

    // 6. Validate email domain with basic checks
    const isValidDomain = validateEmailDomain(email)
    if (!isValidDomain) {
      return {
        success: false,
        message: "Please provide an email with a valid domain",
      }
    }

    // 7. Check for disposable email
    if (isDisposableEmail(email)) {
      return {
        success: false,
        message: "Please use a permanent email address",
      }
    }

    // 8. Check if email already exists in database
    const existingSubscription = await getSubscriptionByEmail(email)
    if (existingSubscription) {
      return {
        success: true,
        message: "You're already subscribed! Thank you for your interest.",
      }
    }

    // 9. Save to Supabase
    const subscriptionData: SubscriptionData = {
      email,
      ip_address: ip,
      user_agent: userAgent,
      referrer: referer,
      mouse_movements: mouseMovements,
      form_load_time: formLoadTime,
      submission_time: submissionTime,
      status: "active",
    }

    const saved = await addSubscription(subscriptionData)

    if (!saved) {
      return {
        success: false,
        message: "There was an error saving your subscription. Please try again.",
      }
    }

    // Update rate limit counters
    updateRateLimitCounters(ip, email)

    // Return success
    return {
      success: true,
      message: "Thank you for subscribing!",
    }
  } catch (error) {
    console.error("Subscription error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message || "Invalid form data",
      }
    }

    return {
      success: false,
      message: "An error occurred. Please try again.",
    }
  }
}
