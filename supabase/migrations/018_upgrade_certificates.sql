-- =====================================================
-- PHASE 15
-- Certificate Upgrade
-- =====================================================

ALTER TABLE certificates

ADD COLUMN score NUMERIC,
ADD COLUMN percentage NUMERIC,
ADD COLUMN rank INTEGER,
ADD COLUMN prize_amount BIGINT DEFAULT 0,
ADD COLUMN verification_code TEXT,
ADD COLUMN generated_at TIMESTAMPTZ DEFAULT NOW();