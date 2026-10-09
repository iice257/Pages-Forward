-- Update books table
ALTER TABLE books ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE books ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 5;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  items JSONB,
  total_amount NUMERIC,
  status TEXT DEFAULT 'pending',
  receipt_sent BOOLEAN DEFAULT false,
  user_details JSONB
);
