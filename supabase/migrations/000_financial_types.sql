-- ============================================
-- TCD Financial System
-- Migration 000
-- Financial ENUM Types
-- ============================================

-- ==========================
-- Wallet Status
-- ==========================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'wallet_status'
    ) THEN

        CREATE TYPE wallet_status AS ENUM (
            'ACTIVE',
            'SUSPENDED',
            'BLOCKED'
        );

    END IF;
END $$;

-- ==========================
-- Transaction Status
-- ==========================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'transaction_status'
    ) THEN

        CREATE TYPE transaction_status AS ENUM (
            'PENDING',
            'SUCCESS',
            'FAILED',
            'CANCELLED',
            'REVERSED'
        );

    END IF;
END $$;

-- ==========================
-- Transaction Type
-- ==========================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'transaction_type'
    ) THEN

        CREATE TYPE transaction_type AS ENUM (

            'ADD_MONEY',

            'ENTRY_FEE',

            'PRIZE',

            'REFUND',

            'WITHDRAW_REQUEST',

            'WITHDRAW_SUCCESS',

            'WITHDRAW_REJECTED',

            'BONUS',

            'REFERRAL',

            'ADMIN_CREDIT',

            'ADMIN_DEBIT'

        );

    END IF;
END $$;

-- ==========================
-- Payment Order Status
-- ==========================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'payment_order_status'
    ) THEN

        CREATE TYPE payment_order_status AS ENUM (
            'CREATED',
            'PAID',
            'FAILED',
            'EXPIRED'
        );

    END IF;
END $$;

-- ==========================
-- Withdrawal Status
-- ==========================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'withdraw_status'
    ) THEN

        CREATE TYPE withdraw_status AS ENUM (
            'PENDING',
            'APPROVED',
            'PROCESSING',
            'COMPLETED',
            'REJECTED',
            'FAILED'
        );

    END IF;
END $$;