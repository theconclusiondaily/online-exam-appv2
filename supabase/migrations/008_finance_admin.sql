CREATE OR REPLACE FUNCTION admin_credit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_reason text,
    p_admin_user_id uuid
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;

    RETURN credit_wallet(
        p_user_id,
        p_amount,
        'ADMIN_CREDIT',
        0,
        'ADMIN-' || gen_random_uuid(),
        NULL,
        NULL,
        NULL,
        p_admin_user_id,
        jsonb_build_object(
            'reason', p_reason
        )
    );

END;
$$;

CREATE OR REPLACE FUNCTION admin_debit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_reason text,
    p_admin_user_id uuid
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;

    RETURN debit_wallet(
        p_user_id,
        p_amount,
        'ADMIN_DEBIT',
        'AVAILABLE',
        'ADMIN-' ||
to_char(now(), 'YYYYMMDD') ||
'-' ||
upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
        NULL,
        NULL,
        p_admin_user_id,
        jsonb_build_object(
            'reason', p_reason
        )
    );

END;
$$;

CREATE OR REPLACE FUNCTION get_pending_withdrawals()
RETURNS TABLE
(
    withdraw_request_id uuid,
    user_id uuid,
    amount bigint,
    reference_number text,
    status withdraw_request_status,
    created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS
$$
SELECT
    wr.id,
    wr.user_id,
    wr.amount,
    wr.reference_number,
    wr.status,
    wr.created_at
FROM withdraw_requests wr
WHERE wr.status = 'PENDING'
ORDER BY wr.created_at ASC;
$$;

CREATE OR REPLACE FUNCTION get_wallet_summary(
    p_user_id uuid
)
RETURNS tcd_wallets
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS
$$
SELECT *
FROM tcd_wallets
WHERE user_id = p_user_id;
$$;

CREATE OR REPLACE FUNCTION get_user_financial_history(
    p_user_id uuid,
    p_limit integer DEFAULT 100,
    p_offset integer DEFAULT 0
)
RETURNS SETOF tcd_transactions
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS
$$
SELECT *
FROM tcd_transactions
WHERE user_id = p_user_id
ORDER BY created_at DESC
LIMIT p_limit
OFFSET p_offset;
$$;

CREATE OR REPLACE FUNCTION get_finance_dashboard()
RETURNS jsonb
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS
$$
SELECT jsonb_build_object(

    'total_wallet_balance',
    COALESCE((SELECT SUM(available_balance) FROM tcd_wallets),0),

    'total_locked_balance',
    COALESCE((SELECT SUM(locked_balance) FROM tcd_wallets),0),

    'total_bonus_balance',
    COALESCE((SELECT SUM(bonus_balance) FROM tcd_wallets),0),

    'pending_withdrawals',
    COALESCE((
        SELECT COUNT(*)
        FROM withdraw_requests
        WHERE status='PENDING'
    ),0),

    'completed_withdrawals',
    COALESCE((
        SELECT COUNT(*)
        FROM withdraw_requests
        WHERE status='COMPLETED'
    ),0),

    'total_transactions',
    COALESCE((
        SELECT COUNT(*)
        FROM tcd_transactions
    ),0)
);
$$;



