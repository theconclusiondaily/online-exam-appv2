BEGIN;

-- =====================================================
-- Create payment_webhooks table
-- =====================================================

CREATE TABLE IF NOT EXISTS public.payment_webhooks (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payment_order_id UUID,

    gateway TEXT NOT NULL DEFAULT 'RAZORPAY',

    event_type TEXT NOT NULL,

    gateway_order_id TEXT,

    gateway_payment_id TEXT,

    payload JSONB NOT NULL,

    signature TEXT NOT NULL,

    processed BOOLEAN NOT NULL DEFAULT FALSE,

    processed_at TIMESTAMPTZ,

    error_message TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_payment_webhooks_payment_order
        FOREIGN KEY (payment_order_id)
        REFERENCES public.payment_orders(id)
        ON DELETE SET NULL

);

-- =====================================================
-- Add FK to transaction table
-- =====================================================

ALTER TABLE public.tcd_transactions
DROP CONSTRAINT IF EXISTS fk_transaction_payment_order;

ALTER TABLE public.tcd_transactions
ADD CONSTRAINT fk_transaction_payment_order
FOREIGN KEY (payment_order_id)
REFERENCES public.payment_orders(id)
ON DELETE SET NULL;

-- =====================================================
-- Indexes
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_payment_webhooks_payment_order
ON public.payment_webhooks(payment_order_id);

CREATE INDEX IF NOT EXISTS idx_payment_webhooks_processed
ON public.payment_webhooks(processed);

CREATE INDEX IF NOT EXISTS idx_payment_webhooks_gateway_payment
ON public.payment_webhooks(gateway_payment_id);

CREATE INDEX IF NOT EXISTS idx_payment_webhooks_created
ON public.payment_webhooks(created_at);

COMMIT;