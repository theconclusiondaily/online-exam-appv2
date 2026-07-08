BEGIN;

-- =====================================================
-- Upgrade transaction ledger
-- =====================================================

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS amount BIGINT NOT NULL DEFAULT 0;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS balance_before BIGINT;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS balance_after BIGINT;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS transaction_status transaction_status
NOT NULL DEFAULT 'SUCCESS';

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS reference_number TEXT;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS payment_order_id UUID;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS gateway_payment_id TEXT;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS withdraw_request_id UUID;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS metadata JSONB
NOT NULL DEFAULT '{}'::jsonb;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS created_by UUID;

ALTER TABLE public.tcd_transactions
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ
NOT NULL DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_transaction_user
ON public.tcd_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_transaction_status
ON public.tcd_transactions(transaction_status);

CREATE INDEX IF NOT EXISTS idx_transaction_payment_order
ON public.tcd_transactions(payment_order_id);

CREATE INDEX IF NOT EXISTS idx_transaction_created
ON public.tcd_transactions(created_at);

COMMIT;