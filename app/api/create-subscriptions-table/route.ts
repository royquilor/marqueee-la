import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Create the table using direct SQL
    const createTableQuery = `
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
    `

    // Execute the query using Supabase's REST API
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      },
      body: JSON.stringify({ query: createTableQuery }),
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create table",
          details: await response.text(),
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, message: "Table created successfully" })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
