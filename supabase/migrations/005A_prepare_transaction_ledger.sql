BEGIN;

-- =====================================================
-- Prepare Transaction Ledger for Wallet Engine
-- =====================================================

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS balance_source TEXT;

COMMENT ON COLUMN public.tcd_transactions.balance_source IS
'AVAILABLE, BONUS, LOCKED or MIXED';

UPDATE public.tcd_transactions
SET balance_source = 'AVAILABLE'
WHERE balance_source IS NULL;

ALTER TABLE public.tcd_transactions
ALTER COLUMN balance_source
SET NOT NULL;

ALTER TABLE public.tcd_transactions
DROP CONSTRAINT IF EXISTS chk_balance_source;

ALTER TABLE public.tcd_transactions
ADD CONSTRAINT chk_balance_source
CHECK (
    balance_source IN (
        'AVAILABLE',
        'BONUS',
        'LOCKED',
        'MIXED'
    )
);

CREATE INDEX IF NOT EXISTS idx_transaction_balance_source
ON public.tcd_transactions(balance_source);

COMMIT;