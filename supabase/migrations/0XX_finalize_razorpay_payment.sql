CREATE OR REPLACE FUNCTION public.finalize_razorpay_payment(
    p_payment_order_id uuid,
    p_gateway_payment_id text
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
    v_order payment_orders%ROWTYPE;
    v_transaction tcd_transactions%ROWTYPE;
BEGIN

    --------------------------------------------------------------------------
    -- Validate input
    --------------------------------------------------------------------------

    IF p_payment_order_id IS NULL THEN
        RAISE EXCEPTION 'PAYMENT_ORDER_ID_REQUIRED';
    END IF;

    IF p_gateway_payment_id IS NULL
       OR length(trim(p_gateway_payment_id)) = 0
    THEN
        RAISE EXCEPTION 'GATEWAY_PAYMENT_ID_REQUIRED';
    END IF;

    --------------------------------------------------------------------------
    -- Lock payment order
    --------------------------------------------------------------------------

    SELECT *
    INTO v_order
    FROM payment_orders
    WHERE id = p_payment_order_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PAYMENT_ORDER_NOT_FOUND';
    END IF;

    --------------------------------------------------------------------------
    -- Idempotency
    --------------------------------------------------------------------------

    IF v_order.status = 'PAID' THEN

        SELECT *
        INTO v_transaction
        FROM tcd_transactions
        WHERE payment_order_id = v_order.id
          AND transaction_type = 'ADD_MONEY'
        ORDER BY created_at DESC
        LIMIT 1;

        IF FOUND THEN
            RETURN v_transaction;
        END IF;

        RAISE EXCEPTION 'PAID_ORDER_TRANSACTION_NOT_FOUND';

    END IF;

    IF v_order.status <> 'CREATED' THEN
        RAISE EXCEPTION
            'PAYMENT_ORDER_NOT_PAYABLE';
    END IF;

    --------------------------------------------------------------------------
    -- Prevent Razorpay payment ID reuse
    --------------------------------------------------------------------------

    IF EXISTS (
        SELECT 1
        FROM payment_orders
        WHERE gateway_payment_id =
              p_gateway_payment_id
          AND id <> v_order.id
    ) THEN
        RAISE EXCEPTION
            'GATEWAY_PAYMENT_ALREADY_USED';
    END IF;

    --------------------------------------------------------------------------
    -- Credit wallet
    --
    -- IMPORTANT:
    -- This function does NOT verify Razorpay signatures.
    -- Signature verification must happen on the trusted Next.js server first.
    --------------------------------------------------------------------------

    SELECT *
    INTO v_transaction
    FROM credit_wallet(
        v_order.user_id,
        v_order.amount,
        'ADD_MONEY',
        0,
        'PAYMENT-' || v_order.id::text,
        NULL,
        v_order.id,
        p_gateway_payment_id,
        NULL,
        jsonb_build_object(
            'source', 'razorpay',
            'gateway_order_id',
                v_order.gateway_order_id,
            'gateway_payment_id',
                p_gateway_payment_id
        )
    );

    --------------------------------------------------------------------------
    -- Mark payment order paid
    --------------------------------------------------------------------------

    UPDATE payment_orders
    SET
        status = 'PAID',
        gateway_payment_id =
            p_gateway_payment_id,
        updated_at = now()
    WHERE id = v_order.id;

    RETURN v_transaction;

END;
$function$;

REVOKE ALL
ON FUNCTION public.finalize_razorpay_payment(uuid, text)
FROM PUBLIC;

REVOKE ALL
ON FUNCTION public.finalize_razorpay_payment(uuid, text)
FROM anon;

REVOKE ALL
ON FUNCTION public.finalize_razorpay_payment(uuid, text)
FROM authenticated;

GRANT EXECUTE
ON FUNCTION public.finalize_razorpay_payment(uuid, text)
TO service_role;