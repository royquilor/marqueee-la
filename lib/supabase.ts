import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Type definitions for our Supabase clients
type SupabaseClient = ReturnType<typeof createClient>

// Type for subscription data
export type SubscriptionData = {
  email: string
  ip_address?: string
  user_agent?: string
  referrer?: string
  mouse_movements: number
  form_load_time: number
  submission_time: number
  status?: string
}

// Type for subscription record from database
export type Subscription = SubscriptionData & {
  id: string
  created_at: string
}

/**
 * Get all subscriptions from the database
 */
export async function getSubscriptions(): Promise<Subscription[]> {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching subscriptions:", error)
    return []
  }

  return data || []
}

/**
 * Get a subscription by email
 */
export async function getSubscriptionByEmail(email: string): Promise<Subscription | null> {
  const { data, error } = await supabaseAdmin.from("subscriptions").select("*").eq("email", email).maybeSingle()

  if (error) {
    console.error("Error fetching subscription by email:", error)
    return null
  }

  return data
}

/**
 * Update a subscription's status
 */
export async function updateSubscriptionStatus(id: string, status: string): Promise<boolean> {
  const { error } = await supabaseAdmin.from("subscriptions").update({ status }).eq("id", id)

  if (error) {
    console.error("Error updating subscription status:", error)
    return false
  }

  return true
}

/**
 * Add a new subscription to the database
 */
export async function addSubscription(subscription: SubscriptionData): Promise<boolean> {
  const { error } = await supabaseAdmin.from("subscriptions").insert([subscription])

  if (error) {
    console.error("Error adding subscription:", error)
    return false
  }

  return true
}
