-- =====================================================
-- TCD Financial System
-- Migration 001B
-- Convert TCD Credits -> Real Wallet Balance
-- Conversion:
-- 10 Credits = ₹1
-- Storage:
-- Money is stored in paise
-- Therefore:
-- 1 Credit = 10 paise
-- =====================================================

BEGIN;

---------------------------------------------------------
-- Convert current balance
---------------------------------------------------------

UPDATE public.tcd_wallets
SET available_balance = current_balance * 10::BIGINT
WHERE available_balance = 0;

---------------------------------------------------------
-- Convert lifetime earned
---------------------------------------------------------

UPDATE public.tcd_wallets
SET lifetime_won = lifetime_earned * 10::BIGINT
WHERE lifetime_won = 0;

COMMIT;