-- ===========================================================
-- ADMIN : GET COMPLETE FINANCIAL HISTORY
-- ===========================================================

CREATE OR REPLACE FUNCTION get_all_financial_history()
RETURNS TABLE (
    id uuid,
    created_at timestamptz,
    user_id uuid,
    transaction_type transaction_type,
    transaction_status transaction_status,

    amount bigint,

    balance_before bigint,
    balance_after bigint,

    bonus_balance_before bigint,
    bonus_balance_after bigint,

    balance_source text,

    reference_number text,

    exam_id uuid,

    payment_order_id uuid,
    gateway_payment_id text,

    withdraw_request_id uuid,

    metadata jsonb,

    created_by uuid
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS
$$

SELECT
    id,
    created_at,
    user_id,
    transaction_type,
    transaction_status,

    amount,

    balance_before,
    balance_after,

    bonus_balance_before,
    bonus_balance_after,

    balance_source,

    reference_number,

    exam_id,

    payment_order_id,
    gateway_payment_id,

    withdraw_request_id,

    metadata,

    created_by

FROM tcd_transactions

ORDER BY created_at DESC;

$$;

GRANT EXECUTE
ON FUNCTION get_all_financial_history()
TO authenticated;