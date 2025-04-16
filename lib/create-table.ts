import { supabaseAdmin } from "./supabase"

export async function createSubscriptionsTable() {
  try {
    // Try direct SQL approach
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
      // If execute_sql RPC is not available, try direct SQL
      const { error: sqlError } = await supabaseAdmin
        .from("subscriptions")
        .insert({
          email: "test@example.com",
          status: "test",
        })
        .select()

      if (sqlError && sqlError.message.includes("does not exist")) {
        // Try creating the table with a direct query
        const { error: createError } = await supabaseAdmin.rpc("execute_sql", {
          sql: `
            CREATE TABLE subscriptions (
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
          `,
        })

        if (createError) {
          console.error("Error creating table:", createError)
          return false
        }

        // Create indexes in a separate query
        await supabaseAdmin.rpc("execute_sql", {
          sql: `
            CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
            CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
            CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
          `,
        })

        // Delete the test record
        await supabaseAdmin.from("subscriptions").delete().eq("email", "test@example.com")
      }
    }

    return true
  } catch (error) {
    console.error("Error creating subscriptions table:", error)
    return false
  }
}
