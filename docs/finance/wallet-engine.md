# TCD Wallet Engine v1.0

Status: LOCKED

---

## Purpose

The Wallet Engine is the only component allowed to modify wallet balances.

No API, frontend, webhook, admin panel or SQL query is allowed to update
`tcd_wallets` directly.

All balance updates must go through the Wallet Engine.

---

## Core Engine

wallet_post_transaction()

Responsible for

- Lock wallet row
- Validate wallet
- Read balances
- Calculate new balances
- Update wallet
- Insert ledger transaction
- Return transaction result

---

## Public Functions

credit_wallet()

debit_wallet()

refund_wallet()

distribute_prize()

---

## Business Rules

Money stored in paise.

10 TCD Credits = ₹1

Bonus Balance is consumed before Available Balance.

Cancelled Exams are automatically refunded.

Prize Distribution is manual.

Withdrawals require Admin approval.

Minimum Wallet Balance = ₹199 after withdrawal.

---

## Security Rules

No direct UPDATE on tcd_wallets.

Every operation inserts a transaction.

Every transaction is atomic.

Wallet row must be locked using FOR UPDATE.

Every failure rolls back.

---

## Status

LOCKED