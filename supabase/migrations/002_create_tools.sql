-- ============================================================
-- Migration 002: Create tools table
-- ============================================================

CREATE TABLE IF NOT EXISTS tools (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text        NOT NULL,
  slug             text        NOT NULL UNIQUE,
  description      text,
  long_description text,
  url              text        NOT NULL,
  image_url        text,
  category_id      uuid        REFERENCES categories (id) ON DELETE SET NULL,
  pricing          text        CHECK (pricing IN ('Free', 'Freemium', 'Paid', 'Open Source')),
  is_featured      boolean     NOT NULL DEFAULT false,
  tags             text[]      DEFAULT '{}',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_tools_slug        ON tools (slug);
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON tools (category_id);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON tools (is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Public read-only policy (anyone can browse tools)
CREATE POLICY "Allow public read access on tools"
  ON tools
  FOR SELECT
  USING (true);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
