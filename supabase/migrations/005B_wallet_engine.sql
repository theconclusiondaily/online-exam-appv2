-- ============================================================================
-- 005B_wallet_engine.sql
-- Internal Wallet Engine
-- Single source of truth for all wallet balance changes.
-- ============================================================================

CREATE OR REPLACE FUNCTION wallet_post_transaction(
    p_user_id uuid,
    p_operation wallet_operation,
    p_amount bigint,
    p_transaction_type transaction_type,

    p_bonus_amount bigint DEFAULT 0,
    p_balance_source text DEFAULT 'AVAILABLE',
    p_reference_number text DEFAULT NULL,
    p_exam_id uuid DEFAULT NULL,
    p_payment_order_id uuid DEFAULT NULL,
    p_gateway_payment_id text DEFAULT NULL,
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
DECLARE
    v_wallet tcd_wallets%ROWTYPE;
    v_transaction tcd_transactions%ROWTYPE;

    v_available_before bigint;
    v_available_after bigint;

    v_bonus_before bigint;
    v_bonus_after bigint;

        v_lifetime_added bigint;
    v_lifetime_won bigint;
    v_lifetime_spent bigint;
    v_lifetime_withdrawn bigint;
    v_lifetime_refunded bigint;
BEGIN

    --------------------------------------------------------------------------
    -- Basic validation
    --------------------------------------------------------------------------

    IF p_amount IS NULL OR p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;

    IF p_bonus_amount < 0 THEN
        RAISE EXCEPTION 'INVALID_BONUS_AMOUNT';
    END IF;

    IF p_bonus_amount > p_amount THEN
        RAISE EXCEPTION 'BONUS_EXCEEDS_TRANSACTION_AMOUNT';
    END IF;

    --------------------------------------------------------------------------
    -- Duplicate reference protection
    --------------------------------------------------------------------------

    IF p_reference_number IS NOT NULL THEN

        IF EXISTS (
            SELECT 1
            FROM tcd_transactions
            WHERE reference_number = p_reference_number
        ) THEN
            RAISE EXCEPTION 'DUPLICATE_REFERENCE_NUMBER';
        END IF;

    END IF;

    --------------------------------------------------------------------------
    -- Lock wallet row
    --------------------------------------------------------------------------

    SELECT *
    INTO v_wallet
    FROM tcd_wallets
    WHERE user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'WALLET_NOT_FOUND';
    END IF;

    --------------------------------------------------------------------------
    -- Store balances before transaction
    --------------------------------------------------------------------------

    v_available_before := v_wallet.available_balance;
    v_bonus_before := v_wallet.bonus_balance;

    v_available_after := v_available_before;
    v_bonus_after := v_bonus_before;
v_lifetime_added := v_wallet.lifetime_added;
v_lifetime_won := v_wallet.lifetime_won;
v_lifetime_spent := v_wallet.lifetime_spent;
v_lifetime_withdrawn := v_wallet.lifetime_withdrawn;
v_lifetime_refunded := v_wallet.lifetime_refunded;
        --------------------------------------------------------------------------
    -- Wallet operation
    --------------------------------------------------------------------------

    CASE p_operation

        ----------------------------------------------------------------------
        -- CREDIT
        ----------------------------------------------------------------------
        WHEN 'CREDIT' THEN

            v_available_after := v_available_before + p_amount;
            v_bonus_after := v_bonus_before + p_bonus_amount;

            CASE p_transaction_type

                WHEN 'ADD_MONEY' THEN
                   v_lifetime_added :=
    v_lifetime_added + p_amount;

                WHEN 'PRIZE' THEN
                    v_lifetime_won :=
    v_lifetime_won + p_amount;

                WHEN 'REFUND' THEN
                    v_lifetime_refunded :=
    v_lifetime_refunded + p_amount;

                WHEN 'BONUS' THEN
                    v_wallet.lifetime_added :=
                        v_wallet.lifetime_added + p_amount;

                WHEN 'REFERRAL' THEN
                    v_wallet.lifetime_added :=
                        v_wallet.lifetime_added + p_amount;

                WHEN 'ADMIN_CREDIT' THEN
                    v_wallet.lifetime_added :=
                        v_wallet.lifetime_added + p_amount;

                ELSE
                    NULL;

            END CASE;

        ----------------------------------------------------------------------
        -- DEBIT
        ----------------------------------------------------------------------
        WHEN 'DEBIT' THEN

            IF v_available_before < p_amount THEN
                RAISE EXCEPTION 'INSUFFICIENT_FUNDS';
            END IF;

            v_available_after := v_available_before - p_amount;

            CASE p_transaction_type

                WHEN 'ENTRY_FEE' THEN
                    v_lifetime_spent :=
    v_lifetime_spent + p_amount;

                WHEN 'WITHDRAW_SUCCESS' THEN
                    v_lifetime_withdrawn :=
    v_lifetime_withdrawn + p_amount;

                WHEN 'ADMIN_DEBIT' THEN
                    v_wallet.lifetime_spent :=
                        v_wallet.lifetime_spent + p_amount;

                ELSE
                    NULL;

            END CASE;

        ----------------------------------------------------------------------
        -- Unknown operation
        ----------------------------------------------------------------------
        ELSE

            RAISE EXCEPTION
                'INVALID_WALLET_OPERATION: %',
                p_operation;

    END CASE;

    --------------------------------------------------------------------------
    -- Update wallet
    --------------------------------------------------------------------------

    UPDATE tcd_wallets
    SET
        available_balance   = v_available_after,
        bonus_balance       = v_bonus_after,

        lifetime_added      = v_lifetime_added,
        lifetime_won        = v_lifetime_won,
        lifetime_spent      = v_lifetime_spent,
        lifetime_withdrawn  = v_lifetime_withdrawn,
        lifetime_refunded   = v_lifetime_refunded,

        updated_at = now()
    WHERE user_id = p_user_id;

        --------------------------------------------------------------------------
    -- Ledger Entry
    --------------------------------------------------------------------------

    INSERT INTO tcd_transactions
    (
        user_id,
        exam_id,

        amount,

        transaction_type,
        transaction_status,

        balance_before,
        balance_after,

        bonus_balance_before,
        bonus_balance_after,

        balance_source,

        reference_number,

        payment_order_id,
        gateway_payment_id,
        withdraw_request_id,

        metadata,
        created_by
    )
    VALUES
    (
        p_user_id,
        p_exam_id,

        p_amount,

        p_transaction_type,
        'SUCCESS',

        v_available_before,
        v_available_after,

        v_bonus_before,
        v_bonus_after,

        p_balance_source,

        p_reference_number,

        p_payment_order_id,
        p_gateway_payment_id,
        p_withdraw_request_id,

        COALESCE(p_metadata,'{}'::jsonb),
        p_created_by
    )
    RETURNING *
    INTO v_transaction;

        RETURN v_transaction;

        END;
$$;