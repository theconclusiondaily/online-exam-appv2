
CREATE OR REPLACE FUNCTION request_withdrawal(
    p_user_id uuid,
    p_amount bigint
)
RETURNS withdraw_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
DECLARE
    v_wallet tcd_wallets%ROWTYPE;
    v_request withdraw_requests%ROWTYPE;

    v_reference_number text;

    v_minimum_remaining_balance constant bigint := 19900;
BEGIN
IF p_amount IS NULL
OR p_amount <= 0 THEN
    RAISE EXCEPTION 'INVALID_WITHDRAW_AMOUNT';
END IF;
SELECT *
INTO v_wallet
FROM tcd_wallets
WHERE user_id = p_user_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WALLET_NOT_FOUND';
END IF;
IF EXISTS
(
    SELECT 1
    FROM withdraw_requests
    WHERE user_id = p_user_id
      AND status = 'PENDING'
)
THEN
    RAISE EXCEPTION
        'PENDING_WITHDRAWAL_ALREADY_EXISTS';
END IF;
IF
(
    v_wallet.available_balance - p_amount
)
<
v_minimum_remaining_balance
THEN
    RAISE EXCEPTION
        'INSUFFICIENT_WITHDRAWABLE_BALANCE';
END IF;
IF v_wallet.status <> 'ACTIVE' THEN
    RAISE EXCEPTION 'WALLET_NOT_ACTIVE';
END IF;
v_reference_number :=
    'WD-' ||
    to_char(now(), 'YYYYMMDD') ||
    '-' ||
    upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8));
    INSERT INTO withdraw_requests
(
    user_id,
    amount,
    status,
    reference_number
)
VALUES
(
    p_user_id,
    p_amount,
    'PENDING',
    v_reference_number
)
RETURNING *
INTO v_request;
RETURN v_request;
END;
$$;

CREATE OR REPLACE FUNCTION approve_withdrawal(
    p_withdraw_request_id uuid,
    p_admin_user_id uuid
)
RETURNS withdraw_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
DECLARE
    v_request withdraw_requests%ROWTYPE;
    v_wallet tcd_wallets%ROWTYPE;
    v_transaction tcd_transactions%ROWTYPE;

    v_minimum_remaining_balance constant bigint := 19900;
BEGIN

SELECT *
INTO v_request
FROM withdraw_requests
WHERE id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_FOUND';
END IF;

IF v_request.status <> 'PENDING' THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_PENDING';
END IF;

SELECT *
INTO v_wallet
FROM tcd_wallets
WHERE user_id = v_request.user_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WALLET_NOT_FOUND';
END IF;
UPDATE withdraw_requests
SET
    status = 'APPROVED',
    approved_by = p_admin_user_id,
    approved_at = now(),
    updated_at = now()
WHERE id = p_withdraw_request_id
RETURNING *
INTO v_request;
RETURN v_request;

END;
$$;
