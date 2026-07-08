CREATE OR REPLACE FUNCTION start_payout(
    p_withdraw_request_id uuid,
    p_razorpay_payout_id text,
    p_contact_id text,
    p_fund_account_id text
)
RETURNS razorpay_payouts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
DECLARE
    v_request withdraw_requests%ROWTYPE;
    v_payout razorpay_payouts%ROWTYPE;
BEGIN
SELECT *
INTO v_request
FROM withdraw_requests
WHERE id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_FOUND';
END IF;
IF v_request.status <> 'APPROVED' THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_APPROVED';
END IF;
INSERT INTO razorpay_payouts
(
    withdraw_request_id,
    razorpay_payout_id,
    razorpay_contact_id,
    razorpay_fund_account_id,
    status,
    initiated_at
)
VALUES
(
    p_withdraw_request_id,
    p_razorpay_payout_id,
    p_contact_id,
    p_fund_account_id,
    'PROCESSING',
    now()
)
RETURNING *
INTO v_payout;
UPDATE withdraw_requests
SET
    status='PROCESSING',
    updated_at=now()
WHERE id=p_withdraw_request_id;
RETURN v_payout;

END;
$$;







CREATE OR REPLACE FUNCTION complete_payout(
    p_withdraw_request_id uuid,
    p_razorpay_payout_id text,
    p_gateway_response jsonb DEFAULT '{}'::jsonb,
    p_admin_user_id uuid DEFAULT NULL
)
RETURNS withdraw_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
DECLARE
    v_request withdraw_requests%ROWTYPE;
    v_payout razorpay_payouts%ROWTYPE;
    v_transaction tcd_transactions%ROWTYPE;
BEGIN

SELECT *
INTO v_request
FROM withdraw_requests
WHERE id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_FOUND';
END IF;

IF v_request.status <> 'APPROVED' THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_APPROVED';
END IF;

SELECT *
INTO v_payout
FROM razorpay_payouts
WHERE withdraw_request_id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'PAYOUT_RECORD_NOT_FOUND';
END IF;
SELECT debit_wallet(
    v_request.user_id,
    v_request.amount,
    'WITHDRAW_SUCCESS',
    'AVAILABLE',
    v_request.reference_number,
    NULL,
    v_request.id,
    p_admin_user_id,
    jsonb_build_object(
        'source', 'razorpay',
        'payout_id', p_razorpay_payout_id
    )
)
INTO v_transaction;
IF v_request.status = 'COMPLETED' THEN
    RETURN v_request;
END IF;
UPDATE withdraw_requests
SET
    status = 'COMPLETED',
    processed_at = now(),
    updated_at = now()
WHERE id = p_withdraw_request_id
RETURNING *
INTO v_request;
UPDATE razorpay_payouts
SET
    status = 'COMPLETED',
    razorpay_payout_id = p_razorpay_payout_id,
    response = p_gateway_response,
    completed_at = now(),
    updated_at = now()
WHERE withdraw_request_id = p_withdraw_request_id;
RETURN v_request;

END;
$$;
CREATE OR REPLACE FUNCTION fail_payout(
    p_withdraw_request_id uuid,
    p_failure_reason text,
    p_gateway_response jsonb DEFAULT '{}'::jsonb
)
RETURNS withdraw_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
DECLARE
    v_request withdraw_requests%ROWTYPE;
    v_payout razorpay_payouts%ROWTYPE;
BEGIN

SELECT *
INTO v_request
FROM withdraw_requests
WHERE id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'WITHDRAW_REQUEST_NOT_FOUND';
END IF;

SELECT *
INTO v_payout
FROM razorpay_payouts
WHERE withdraw_request_id = p_withdraw_request_id
FOR UPDATE;

IF NOT FOUND THEN
    RAISE EXCEPTION 'PAYOUT_RECORD_NOT_FOUND';
END IF;

UPDATE razorpay_payouts
SET
    status = 'FAILED',
    failure_reason = p_failure_reason,
    response = p_gateway_response,
    updated_at = now()
WHERE withdraw_request_id = p_withdraw_request_id;

UPDATE withdraw_requests
SET
    status = 'APPROVED',
    updated_at = now()
WHERE id = p_withdraw_request_id
RETURNING *
INTO v_request;
RETURN v_request;

END;
$$;