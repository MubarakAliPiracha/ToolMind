-- ============================================================
-- Migration 001: Create categories table
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL UNIQUE,
  slug        text        NOT NULL UNIQUE,
  description text,
  icon        text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories (slug);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read-only policy (anyone can browse categories)
CREATE POLICY "Allow public read access on categories"
  ON categories
  FOR SELECT
  USING (true);
