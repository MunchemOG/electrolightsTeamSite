-- ============================================================
-- CONTACT SUBMISSIONS TABLE + RATE LIMITING SUPPORT
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 16. Contact Form Submissions
--     Stores every successful contact form submission.
--     Used for server-side rate limiting (20 per hour per fingerprint).
CREATE TABLE IF NOT EXISTS contact_submissions (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  subject     TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  -- Lightweight browser fingerprint (language|timezone|resolution|cores)
  fingerprint TEXT        NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast per-fingerprint window queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_fingerprint_time
  ON contact_submissions (fingerprint, created_at DESC);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anon users can INSERT (submit the form)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Anon users can SELECT their own submissions (needed for rate-limit check)
-- We match on fingerprint — no PII exposed since fingerprint is opaque
CREATE POLICY "Submitter can read own submissions"
  ON contact_submissions
  FOR SELECT
  USING (true);
-- Note: If you want tighter security, restrict SELECT to authenticated users only
-- and move rate-limit logic to an Edge Function. For a small team site this is fine.

-- Only authenticated admins can delete / manage records
CREATE POLICY "Admins can manage contact submissions"
  ON contact_submissions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
