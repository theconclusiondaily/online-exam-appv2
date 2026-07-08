CREATE OR REPLACE FUNCTION credit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_transaction_type transaction_type,
    p_bonus_amount bigint DEFAULT 0,
    p_reference_number text DEFAULT NULL,
    p_exam_id uuid DEFAULT NULL,
    p_payment_order_id uuid DEFAULT NULL,
    p_gateway_payment_id text DEFAULT NULL,
    p_created_by uuid DEFAULT NULL,
    p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    IF p_transaction_type NOT IN
(
    'ADD_MONEY',
    'PRIZE',
    'REFUND',
    'BONUS',
    'REFERRAL',
    'ADMIN_CREDIT'
)
    THEN
        RAISE EXCEPTION
            'INVALID_CREDIT_TRANSACTION_TYPE';
    END IF;

    RETURN wallet_post_transaction(
        p_user_id,
        'CREDIT',
        p_amount,
        p_transaction_type,
        p_bonus_amount,
        
        'AVAILABLE',
        p_reference_number,
        p_exam_id,
        p_payment_order_id,
        p_gateway_payment_id,
        NULL,
        p_created_by,
        p_metadata
    );

END;
$$;
CREATE OR REPLACE FUNCTION debit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_transaction_type transaction_type,
    p_balance_source text DEFAULT 'AVAILABLE',
    p_reference_number text DEFAULT NULL,
    p_exam_id uuid DEFAULT NULL,
    p_withdraw_request_id uuid DEFAULT NULL,
    p_created_by uuid DEFAULT NULL,
    p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    IF p_transaction_type NOT IN
    (
        'ENTRY_FEE',
        'WITHDRAW_SUCCESS',
        'ADMIN_DEBIT'
    )
    THEN
        RAISE EXCEPTION
            'INVALID_DEBIT_TRANSACTION_TYPE';
    END IF;

    RETURN wallet_post_transaction(
        p_user_id,
        'DEBIT',
        p_amount,
        p_transaction_type,
        0,
        
        p_balance_source,
        p_reference_number,
        p_exam_id,
        NULL,
        NULL,
        p_withdraw_request_id,
        p_created_by,
        p_metadata
    );

END;
$$;

CREATE OR REPLACE FUNCTION distribute_prize(
    p_user_id uuid,
    p_exam_id uuid,
    p_amount bigint,
    p_reference_number text,
    p_created_by uuid DEFAULT NULL,
    p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_PRIZE_AMOUNT';
    END IF;

    IF p_exam_id IS NULL THEN
        RAISE EXCEPTION 'EXAM_ID_REQUIRED';
    END IF;

    RETURN credit_wallet(
        p_user_id,
        p_amount,
        'PRIZE',
        0,
        p_reference_number,
        p_exam_id,
        NULL,
        NULL,
        p_created_by,
        p_metadata
    );

END;
$$;