-- ==========================================
-- Prevent duplicate leaderboard entries
-- One row per student per exam
-- ==========================================

ALTER TABLE leaderboard
ADD CONSTRAINT leaderboard_exam_user_unique
UNIQUE (exam_id, user_id);