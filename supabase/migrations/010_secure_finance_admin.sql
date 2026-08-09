/*
========================================================
TCD FINANCE ADMIN SECURITY
========================================================

Purpose:
- Ensure only authenticated admins can perform
  admin wallet credit/debit operations.
- Ensure p_admin_user_id cannot be spoofed.
- Keep wallet mutations inside the existing
  wallet engine.
========================================================
*/


/*
========================================================
1. ADMIN CREDIT
========================================================
*/

CREATE OR REPLACE FUNCTION public.admin_credit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_reason text,
    p_admin_user_id uuid
)
RETURNS public.tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    /*
     * Caller must be authenticated.
     */
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'UNAUTHORIZED';
    END IF;


    /*
     * The admin ID supplied by the frontend
     * must match the authenticated Supabase user.
     */
    IF auth.uid() <> p_admin_user_id THEN
        RAISE EXCEPTION 'ADMIN_ID_MISMATCH';
    END IF;


    /*
     * Verify that the authenticated user
     * actually has the admin role.
     */
    IF NOT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid()
          AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'ADMIN_ACCESS_REQUIRED';
    END IF;


    /*
     * Validate amount.
     */
    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;


    /*
     * Validate reason.
     */
    IF p_reason IS NULL
       OR length(trim(p_reason)) = 0 THEN
        RAISE EXCEPTION 'REASON_REQUIRED';
    END IF;


    /*
     * Use the existing wallet engine.
     */
    RETURN public.credit_wallet(
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
            'reason',
            trim(p_reason)
        )
    );

END;
$$;


/*
========================================================
2. ADMIN DEBIT
========================================================
*/

CREATE OR REPLACE FUNCTION public.admin_debit_wallet(
    p_user_id uuid,
    p_amount bigint,
    p_reason text,
    p_admin_user_id uuid
)
RETURNS public.tcd_transactions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS
$$
BEGIN

    /*
     * Caller must be authenticated.
     */
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'UNAUTHORIZED';
    END IF;


    /*
     * Prevent admin ID spoofing.
     */
    IF auth.uid() <> p_admin_user_id THEN
        RAISE EXCEPTION 'ADMIN_ID_MISMATCH';
    END IF;


    /*
     * Verify admin role.
     */
    IF NOT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid()
          AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'ADMIN_ACCESS_REQUIRED';
    END IF;


    /*
     * Validate amount.
     */
    IF p_amount <= 0 THEN
        RAISE EXCEPTION 'INVALID_AMOUNT';
    END IF;


    /*
     * Validate reason.
     */
    IF p_reason IS NULL
       OR length(trim(p_reason)) = 0 THEN
        RAISE EXCEPTION 'REASON_REQUIRED';
    END IF;


    /*
     * Use the existing wallet engine.
     */
    RETURN public.debit_wallet(
        p_user_id,
        p_amount,
        'ADMIN_DEBIT',
        'AVAILABLE',
        'ADMIN-' ||
        to_char(now(), 'YYYYMMDD') ||
        '-' ||
        upper(
            substr(
                replace(
                    gen_random_uuid()::text,
                    '-',
                    ''
                ),
                1,
                8
            )
        ),
        NULL,
        NULL,
        p_admin_user_id,
        jsonb_build_object(
            'reason',
            trim(p_reason)
        )
    );

END;
$$;


/*
========================================================
3. REMOVE DEFAULT FUNCTION EXECUTION
========================================================
*/

REVOKE EXECUTE
ON FUNCTION public.admin_credit_wallet(
    uuid,
    bigint,
    text,
    uuid
)
FROM PUBLIC;

REVOKE EXECUTE
ON FUNCTION public.admin_debit_wallet(
    uuid,
    bigint,
    text,
    uuid
)
FROM PUBLIC;


/*
========================================================
4. ALLOW AUTHENTICATED USERS TO CALL THE FUNCTIONS

The functions themselves perform the admin-role check.
========================================================
*/

GRANT EXECUTE
ON FUNCTION public.admin_credit_wallet(
    uuid,
    bigint,
    text,
    uuid
)
TO authenticated;

GRANT EXECUTE
ON FUNCTION public.admin_debit_wallet(
    uuid,
    bigint,
    text,
    uuid
)
TO authenticated;