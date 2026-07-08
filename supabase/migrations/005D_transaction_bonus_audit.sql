BEGIN;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS bonus_balance_before BIGINT;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS bonus_balance_after BIGINT;

COMMIT;