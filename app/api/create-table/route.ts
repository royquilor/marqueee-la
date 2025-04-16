import { supabaseAdmin } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create the table using SQL
    const { error } = await supabaseAdmin.rpc("execute_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS subscriptions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email TEXT NOT NULL UNIQUE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          ip_address TEXT,
          user_agent TEXT,
          referrer TEXT,
          status TEXT DEFAULT 'active',
          mouse_movements INTEGER,
          form_load_time BIGINT,
          submission_time BIGINT
        );
        
        CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
        CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
        CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
      `,
    })

    if (error) {
      console.error("Error creating table:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Table created successfully" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
