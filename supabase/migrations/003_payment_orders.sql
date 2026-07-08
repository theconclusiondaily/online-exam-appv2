BEGIN;

CREATE TABLE IF NOT EXISTS public.payment_orders (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,

    gateway TEXT NOT NULL DEFAULT 'RAZORPAY',

    gateway_order_id TEXT UNIQUE,

    gateway_payment_id TEXT,

    amount BIGINT NOT NULL,

    currency CHAR(3) NOT NULL DEFAULT 'INR',

    receipt TEXT NOT NULL UNIQUE,

    status payment_order_status
        NOT NULL
        DEFAULT 'CREATED',

    notes JSONB NOT NULL DEFAULT '{}'::jsonb,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT fk_payment_orders_user
        FOREIGN KEY (user_id)
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_payment_amount
        CHECK (amount > 0)

);

CREATE INDEX IF NOT EXISTS idx_payment_orders_user
ON public.payment_orders(user_id);

CREATE INDEX IF NOT EXISTS idx_payment_orders_status
ON public.payment_orders(status);

CREATE INDEX IF NOT EXISTS idx_payment_orders_gateway_order
ON public.payment_orders(gateway_order_id);

CREATE INDEX IF NOT EXISTS idx_payment_orders_created
ON public.payment_orders(created_at);

COMMIT;