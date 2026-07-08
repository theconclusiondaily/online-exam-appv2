-- =====================================================
-- TCD Financial System
-- Migration 001
-- Wallet Schema Upgrade
-- Version: 1.0
-- Safe / Non-destructive
-- =====================================================

BEGIN;

----------------------------------------------------------
-- Add new financial columns
----------------------------------------------------------

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS available_balance BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS locked_balance BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS bonus_balance BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS lifetime_added BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS lifetime_won BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS lifetime_spent BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS lifetime_withdrawn BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS lifetime_refunded BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'INR';

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS status wallet_status
NOT NULL
DEFAULT 'ACTIVE';

ALTER TABLE public.tcd_wallets
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ
NOT NULL
DEFAULT now();

----------------------------------------------------------
-- Column comments
----------------------------------------------------------

COMMENT ON COLUMN public.tcd_wallets.available_balance
IS 'Spendable wallet balance stored in paise';

COMMENT ON COLUMN public.tcd_wallets.locked_balance
IS 'Amount temporarily locked for withdrawal or settlement';

COMMENT ON COLUMN public.tcd_wallets.bonus_balance
IS 'Promotional bonus balance stored separately';

COMMENT ON COLUMN public.tcd_wallets.lifetime_added
IS 'Total money deposited into wallet';

COMMENT ON COLUMN public.tcd_wallets.lifetime_won
IS 'Total prize money earned';

COMMENT ON COLUMN public.tcd_wallets.lifetime_spent
IS 'Total money spent on exams';

COMMENT ON COLUMN public.tcd_wallets.lifetime_withdrawn
IS 'Total withdrawn by user';

COMMENT ON COLUMN public.tcd_wallets.lifetime_refunded
IS 'Total refunded to wallet';

----------------------------------------------------------
-- Constraints
----------------------------------------------------------

ALTER TABLE public.tcd_wallets
DROP CONSTRAINT IF EXISTS chk_wallet_available_balance;

ALTER TABLE public.tcd_wallets
ADD CONSTRAINT chk_wallet_available_balance
CHECK (available_balance >= 0);

ALTER TABLE public.tcd_wallets
DROP CONSTRAINT IF EXISTS chk_wallet_locked_balance;

ALTER TABLE public.tcd_wallets
ADD CONSTRAINT chk_wallet_locked_balance
CHECK (locked_balance >= 0);

ALTER TABLE public.tcd_wallets
DROP CONSTRAINT IF EXISTS chk_wallet_bonus_balance;

ALTER TABLE public.tcd_wallets
ADD CONSTRAINT chk_wallet_bonus_balance
CHECK (bonus_balance >= 0);

COMMIT;