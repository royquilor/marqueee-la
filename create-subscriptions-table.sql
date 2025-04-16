-- Create a table for email subscriptions
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

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at);
