-- =====================================================
-- PHASE 15
-- Exam Entry Fee Support
-- =====================================================

ALTER TABLE exams
ADD COLUMN entry_fee BIGINT NOT NULL DEFAULT 0;

COMMENT ON COLUMN exams.entry_fee IS
'Entry fee stored in paise. Example: ₹10 = 1000';