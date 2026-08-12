-- ============================================================
-- THE CONCLUSION DAILY
-- FINANCE ADMIN USER MANAGEMENT
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_finance_users(
    p_search text DEFAULT NULL,
    p_limit integer DEFAULT 50,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    user_id uuid,
    name text,
    email text,
    role text,
    available_balance bigint,
    locked_balance bigint,
    bonus_balance bigint,
    lifetime_added bigint,
    lifetime_won bigint,
    lifetime_spent bigint,
    lifetime_withdrawn bigint,
    lifetime_refunded bigint,
    wallet_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

    -- ========================================================
    -- ADMIN AUTHORIZATION
    -- ========================================================

    IF NOT EXISTS (
        SELECT 1
        FROM public.users AS admin_user
        WHERE admin_user.id = auth.uid()
          AND admin_user.role = 'admin'
    ) THEN
        RAISE EXCEPTION 'ADMIN_ACCESS_REQUIRED';
    END IF;


    -- ========================================================
    -- PAGINATION
    -- ========================================================

    IF p_limit IS NULL OR p_limit < 1 THEN
        p_limit := 50;
    END IF;

    IF p_limit > 100 THEN
        p_limit := 100;
    END IF;

    IF p_offset IS NULL OR p_offset < 0 THEN
        p_offset := 0;
    END IF;


    -- ========================================================
    -- USERS + WALLETS
    -- ========================================================

    RETURN QUERY
    SELECT
        u.id AS user_id,

        COALESCE(u.name, 'Unnamed User') AS name,

        COALESCE(u.email, '') AS email,

        COALESCE(u.role, 'student') AS role,

        COALESCE(w.available_balance, 0)::bigint
            AS available_balance,

        COALESCE(w.locked_balance, 0)::bigint
            AS locked_balance,

        COALESCE(w.bonus_balance, 0)::bigint
            AS bonus_balance,

        COALESCE(w.lifetime_added, 0)::bigint
            AS lifetime_added,

        COALESCE(w.lifetime_won, 0)::bigint
            AS lifetime_won,

        COALESCE(w.lifetime_spent, 0)::bigint
            AS lifetime_spent,

        COALESCE(w.lifetime_withdrawn, 0)::bigint
            AS lifetime_withdrawn,

        COALESCE(w.lifetime_refunded, 0)::bigint
            AS lifetime_refunded,

       CASE
    WHEN w.user_id IS NULL
        THEN 'NO_WALLET'
    ELSE 'ACTIVE'
END AS wallet_status

    FROM public.users AS u

    LEFT JOIN public.tcd_wallets AS w
        ON w.user_id = u.id

    WHERE
        (
            p_search IS NULL
            OR trim(p_search) = ''
            OR u.name ILIKE '%' || trim(p_search) || '%'
            OR u.email ILIKE '%' || trim(p_search) || '%'
            OR u.id::text ILIKE '%' || trim(p_search) || '%'
        )

    ORDER BY
        u.name ASC NULLS LAST,
        u.created_at DESC

    LIMIT p_limit
    OFFSET p_offset;

END;
$$;


-- ============================================================
-- EXECUTION PERMISSION
-- ============================================================

GRANT EXECUTE
ON FUNCTION public.get_finance_users(text, integer, integer)
TO authenticated;