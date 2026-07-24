"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import TCDIcon from "@/components/brand/TCDIcon";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { getWallet } from "@/services/wallet.service";
import {
  formatCredits,
  formatRupees,
} from "@/lib/finance/formatter";
import { useSearchParams } from "next/navigation";
import type {
  Wallet,
} from "@/services/finance.types";

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface PayoutAccount {
  id: string;
  accountType: "UPI" | "BANK";
  accountHolderName: string;
  upiId: string | null;
  bankAccountNumber: string | null;
  ifscCode: string | null;
  isVerified: boolean;
  isActive: boolean;
}

type PayoutAccountType =
  | "UPI"
  | "BANK";
export default function WalletCard() {
  const searchParams =
  useSearchParams();

const returnTo =
  searchParams.get("returnTo");
  const [wallet, setWallet] =
    useState<Wallet | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [showAddMoney, setShowAddMoney] =
    useState(false);

  const [amount, setAmount] =
    useState("");

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [
  showWithdraw,
  setShowWithdraw,
] = useState(false);

const [
  payoutAccount,
  setPayoutAccount,
] =
  useState<PayoutAccount | null>(
    null
  );

const [
  payoutLoading,
  setPayoutLoading,
] = useState(false);

const [
  withdrawAmount,
  setWithdrawAmount,
] = useState("");

const [
  accountType,
  setAccountType,
] =
  useState<PayoutAccountType>(
    "UPI"
  );

const [
  accountHolderName,
  setAccountHolderName,
] = useState("");

const [
  upiId,
  setUpiId,
] = useState("");

const [
  bankAccountNumber,
  setBankAccountNumber,
] = useState("");

const [
  ifscCode,
  setIfscCode,
] = useState("");

  // ==========================================
  // Load wallet
  // ==========================================

  async function loadWallet() {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const {
        data,
        error,
      } =
        await getWallet(user.id);

      if (error) {
        console.error(
          "WALLET LOAD ERROR:",
          error
        );

        return;
      }

      setWallet(data);
    } catch (error) {
      console.error(
        "Failed to load wallet:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

const shouldOpenAddMoney =
  searchParams.get("addMoney") ===
  "true";

const requestedAmount =
  searchParams.get("amount");

useEffect(() => {
  const amountInPaise =
    Number(requestedAmount);

  if (
    shouldOpenAddMoney &&
    Number.isFinite(
      amountInPaise
    ) &&
    amountInPaise > 0
  ) {
    setAmount(
      (
        amountInPaise / 100
      ).toFixed(2)
    );

    setShowAddMoney(true);
  }
}, [
  shouldOpenAddMoney,
  requestedAmount,
]);

  useEffect(() => {
  loadWallet();
  loadPayoutAccount();
}, []);


  async function loadPayoutAccount() {
  try {
    const response =
      await fetch(
        "/api/payout-accounts",
        {
          method: "GET",
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Unable to load payout account."
      );
    }

    const data =
      await response.json();

    setPayoutAccount(
      data.account ?? null
    );
  } catch (error) {
    console.error(
      "PAYOUT ACCOUNT LOAD ERROR:",
      error
    );
  }
}
  // ==========================================
  // Load Razorpay checkout script
  // ==========================================

  function loadRazorpayScript() {
    return new Promise<boolean>(
      (resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const existingScript =
          document.querySelector(
            'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
          );

        if (existingScript) {
          existingScript.addEventListener(
            "load",
            () => resolve(true)
          );

          existingScript.addEventListener(
            "error",
            () => resolve(false)
          );

          return;
        }

        const script =
          document.createElement("script");

        script.src =
          "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () =>
          resolve(true);

        script.onerror = () =>
          resolve(false);

        document.body.appendChild(
          script
        );
      }
    );
  }

  // ==========================================
  // Add money
  // ==========================================

  async function handleAddMoney() {
    if (paymentLoading) {
      return;
    }

    const rupees =
      Number(amount);

    if (
      !Number.isFinite(rupees) ||
      rupees < 1
    ) {
      toast.error(
        "Please enter a valid amount of at least ₹1."
      );

      return;
    }

    // Convert rupees to paise
    const amountInPaise =
      Math.round(rupees * 100);

    setPaymentLoading(true);

    try {
      // ----------------------------------------
      // Load Razorpay
      // ----------------------------------------

      const loaded =
        await loadRazorpayScript();

      if (!loaded) {
        throw new Error(
          "Unable to load Razorpay Checkout."
        );
      }

      // ----------------------------------------
      // Create secure server-side order
      // ----------------------------------------

      const orderResponse =
        await fetch(
          "/api/payments/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              amount:
                amountInPaise,
            }),
          }
        );

      const orderData =
        await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.error ||
            "Unable to create payment order."
        );
      }

      // ----------------------------------------
      // Get current user for Checkout prefill
      // ----------------------------------------

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      // ----------------------------------------
      // Razorpay Checkout configuration
      // ----------------------------------------

      const options = {
        key:
          orderData.keyId,

        amount:
          orderData.amount,

        currency:
          orderData.currency,

        name:
          "The Conclusion Daily",

        description:
          "Add Money to TCD Wallet",

        order_id:
          orderData.razorpayOrderId,

        handler: async (
          response: any
        ) => {
          try {
            // ----------------------------------
            // Verify payment on our server
            // ----------------------------------

            const verifyResponse =
              await fetch(
                "/api/payments/verify",
                {
                  method:
                    "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body:
                    JSON.stringify({
                      paymentOrderId:
                        orderData.paymentOrderId,

                      razorpayOrderId:
                        response.razorpay_order_id,

                      razorpayPaymentId:
                        response.razorpay_payment_id,

                      razorpaySignature:
                        response.razorpay_signature,
                    }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok
            ) {
              throw new Error(
                verifyData.error ||
                  "Payment verification failed."
              );
            }

            // ----------------------------------
            // Refresh wallet
            // ----------------------------------

            await loadWallet();

            setAmount("");

            setShowAddMoney(
              false
            );

           toast.success(
  "Payment successful",
  {
    description:
      "Your TCD Wallet has been credited successfully.",
  }
);

if (
  returnTo &&
  returnTo.startsWith("/")
) {
  window.location.href =
    returnTo;

  return;
}

          } catch (error) {
            console.error(
              "PAYMENT VERIFY ERROR:",
              error
            );

            toast.error(
  "Payment verification failed",
  {
    description:
      error instanceof Error
        ? error.message
        : "Please try again.",
  }
);
          } finally {
            setPaymentLoading(
              false
            );
          }
        },

        prefill: {
          email:
            user?.email || "",
        },

        notes: {
          payment_order_id:
            orderData.paymentOrderId,
        },

        theme: {
          color:
            "#243B6B",
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(
              false
            );
          },
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.on(
        "payment.failed",
        (response: any) => {
          console.error(
            "RAZORPAY PAYMENT FAILED:",
            response.error
          );

          setPaymentLoading(
            false
          );

          toast.error(
  "Payment failed",
  {
    description:
      response.error?.description ||
      "The payment could not be completed.",
  }
);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "ADD MONEY ERROR:",
        error
      );

      setPaymentLoading(false);

     toast.error(
  "Unable to start payment",
  {
    description:
      error instanceof Error
        ? error.message
        : "Please try again.",
  }
);
    }
  }

  // ==========================================
  // Loading states
  // ==========================================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Loading wallet...
      </div>
    );
  }

  if (!wallet) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        Wallet not found.
      </div>
    );
  }
async function handleSavePayoutAccount() {
  try {
    setPayoutLoading(true);

    const response =
      await fetch(
        "/api/payout-accounts",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            accountType,
            accountHolderName,

            upiId:
              accountType === "UPI"
                ? upiId
                : undefined,

            bankAccountNumber:
              accountType === "BANK"
                ? bankAccountNumber
                : undefined,

            ifscCode:
              accountType === "BANK"
                ? ifscCode
                : undefined,
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "Unable to save payout account."
      );
    }

    setPayoutAccount(
      data.account
    );

    toast.success(
      "Payout account saved."
    );

    setAccountHolderName("");
    setUpiId("");
    setBankAccountNumber("");
    setIfscCode("");

  } catch (error) {
    console.error(
      "SAVE PAYOUT ACCOUNT ERROR:",
      error
    );

    toast.error(
      error instanceof Error
        ? error.message
        : "Unable to save payout account."
    );

  } finally {
    setPayoutLoading(false);
  }
}

async function handleWithdrawal() {
  try {
    if (!wallet) {
      return;
    }

    if (!payoutAccount) {
      toast.error(
        "Add a payout account first."
      );
      return;
    }

    if (
      !payoutAccount.isVerified
    ) {
      toast.error(
        "Your payout account must be verified before withdrawal."
      );
      return;
    }

    const amountInRupees =
      Number(withdrawAmount);

    if (
      !Number.isFinite(
        amountInRupees
      ) ||
      amountInRupees < 300
    ) {
      toast.error(
        "Minimum withdrawal is ₹300."
      );
      return;
    }

    const amountInPaise =
      Math.round(
        amountInRupees * 100
      );
const cashWithdrawableBalance =
  wallet.available_balance -
  wallet.bonus_balance;

if (
  amountInPaise >
  cashWithdrawableBalance
) {
  toast.error(
    "Bonus credits cannot be withdrawn. Your cash balance is insufficient."
  );
  return;
}
    if (
      wallet.available_balance -
        amountInPaise <
      19900
    ) {
      toast.error(
        "A minimum wallet balance of ₹199 must remain after withdrawal."
      );
      return;
    }

    setPayoutLoading(true);

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      throw new Error(
        "Please sign in again."
      );
    }

    const {
      error,
    } =
      await supabase.rpc(
        "request_withdrawal",
        {
          p_user_id:
            user.id,

          p_amount:
            amountInPaise,
        }
      );

    if (error) {
      throw error;
    }

    toast.success(
      "Withdrawal request submitted."
    );

    setWithdrawAmount("");
    setShowWithdraw(false);

    await loadWallet();

  } catch (error: any) {
    console.error(
      "WITHDRAWAL ERROR:",
      error
    );

    const message =
      error?.message || "";

    if (
      message.includes(
        "ACTIVE_WITHDRAWAL_ALREADY_EXISTS"
      )
    ) {
      toast.error(
        "You already have an active withdrawal request."
      );
    } else if (
      message.includes(
        "MINIMUM_WITHDRAW_AMOUNT_IS_300"
      )
    ) {
      toast.error(
        "Minimum withdrawal is ₹300."
      );
   } else if (
  message.includes(
    "INSUFFICIENT_CASH_BALANCE"
  )
) {
  toast.error(
    "Bonus credits cannot be withdrawn. Your cash balance is insufficient."
  );
} else if (
  message.includes(
    "MINIMUM_WALLET_BALANCE_MUST_REMAIN_199"
  )
) {
  toast.error(
    "A minimum wallet balance of ₹199 must remain after withdrawal."
  );
    } else {
      toast.error(
        "Unable to submit withdrawal request."
      );
    }

  } finally {
    setPayoutLoading(false);
  }
}
  return (
    <>
      <div
        className="
          bg-white
          rounded-2xl
          p-7
          shadow-md
          hover:shadow-xl
          hover:-translate-y-1
          transition-all
          duration-300
          border
          border-gray-100
        "
      >
        {/* Header */}

        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-[#FFF8EA]
              flex
              items-center
              justify-center
              border
              border-[#E6C06E]/30
            "
          >
            <TCDIcon
              src="/icons/tcd-coin.svg"
              alt="TCD Wallet"
              size={42}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-tcd-blue">
              TCD Wallet
            </h2>

            <p className="text-sm text-tcd-primary">
              Your Credits Wallet
            </p>
          </div>
        </div>

        {/* Main Balance */}

        <div className="mb-6">
          <div className="text-4xl font-black text-tcd-blue">
            {formatCredits(
              wallet.available_balance
            )}
          </div>

          <div className="text-sm text-gray-500 mt-2">
            {formatRupees(
              wallet.available_balance
            )}
          </div>
        </div>

        {/* Wallet Stats */}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Bonus
            </p>

            <p className="mt-2 text-lg font-bold text-yellow-600">
              {formatCredits(
                wallet.bonus_balance
              )}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Locked
            </p>

            <p className="mt-2 text-lg font-bold text-red-600">
              {formatCredits(
                wallet.locked_balance
              )}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Lifetime Won
            </p>

            <p className="mt-2 text-lg font-bold text-green-600">
              {formatCredits(
                wallet.lifetime_won
              )}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Lifetime Added
            </p>

            <p className="mt-2 text-lg font-bold text-blue-600">
              {formatCredits(
                wallet.lifetime_added
              )}
            </p>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            mt-6
            bg-gradient-to-r
            from-[#FFF8EA]
            to-[#EEF3FF]
            rounded-2xl
            p-4
            text-center
          "
        >
          <p className="font-semibold text-tcd-blue">
            The Conclusion Daily Digital Wallet
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Secure • Fast • Transparent
          </p>
        </div>

        {/* Buttons */}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={() =>
              setShowAddMoney(true)
            }
            className="
              rounded-xl
              bg-tcd-blue
              text-white
              py-3
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Add Money
          </button>

         <button
  onClick={() =>
    setShowWithdraw(true)
  }
  className="
    rounded-xl
    border
    border-tcd-blue
    text-tcd-blue
    py-3
    font-semibold
    hover:bg-gray-50
    transition
  "
>
  Withdraw
</button>
        </div>
        <Link
  href="/dashboard/tcd-wallet"
  className="
    mt-4
    w-full
    flex
    items-center
    justify-center
    rounded-xl
    py-3
    font-semibold
    text-tcd-blue
    bg-[#F7F9FC]
    hover:bg-[#EEF3FF]
    transition
  "
>
  View Transaction History
</Link>
      </div>

      {/* Add Money Modal */}

      {showAddMoney && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/50
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-3xl
              shadow-2xl
              p-7
            "
          >
            <h2 className="text-2xl font-black text-tcd-blue">
              Add Money
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Add funds securely to your TCD Wallet.
            </p>

            <div className="mt-6">
              <label className="text-sm font-semibold text-gray-700">
                Amount
              </label>

              <div className="relative mt-2">
                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-xl
                    font-bold
                    text-gray-500
                  "
                >
                  ₹
                </span>

                <input
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(event) =>
                    setAmount(
                      event.target.value
                    )
                  }
                  placeholder="Enter amount"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    py-4
                    pl-10
                    pr-4
                    text-lg
                    font-bold
                    outline-none
                    focus:border-tcd-blue
                  "
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                disabled={
                  paymentLoading
                }
                onClick={() => {
                  if (
                    !paymentLoading
                  ) {
                    setShowAddMoney(
                      false
                    );
                  }
                }}
                className="
                  rounded-xl
                  border
                  py-3
                  font-semibold
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                disabled={
                  paymentLoading
                }
                onClick={
                  handleAddMoney
                }
                className="
                  rounded-xl
                  bg-tcd-blue
                  text-white
                  py-3
                  font-semibold
                  disabled:opacity-50
                "
              >
                {paymentLoading
                  ? "Processing..."
                  : "Proceed to Pay"}
              </button>
            </div>

            <p className="text-xs text-center text-gray-400 mt-5">
              Payments are securely processed by Razorpay.
            </p>
          </div>
        </div>
      )}

      {showWithdraw && (
  <div
    className="
      fixed
      inset-0
      z-50
      bg-black/50
      flex
      items-center
      justify-center
      p-4
    "
  >
    <div
      className="
        bg-white
        w-full
        max-w-lg
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        shadow-2xl
        p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-tcd-blue">
            Withdraw Funds
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Minimum withdrawal ₹300 • Keep ₹199 in your wallet
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowWithdraw(false)
          }
          className="
            text-gray-500
            hover:text-gray-900
            text-2xl
          "
        >
          ×
        </button>
      </div>

      {!payoutAccount ? (
        <div className="mt-6">
          <h3 className="font-bold text-lg">
            Add Payout Account
          </h3>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              type="button"
              onClick={() =>
                setAccountType("UPI")
              }
              className={`
                rounded-xl
                py-3
                font-semibold
                border
                ${
                  accountType === "UPI"
                    ? "bg-tcd-blue text-white border-tcd-blue"
                    : "text-tcd-blue border-gray-200"
                }
              `}
            >
              UPI
            </button>

            <button
              type="button"
              onClick={() =>
                setAccountType("BANK")
              }
              className={`
                rounded-xl
                py-3
                font-semibold
                border
                ${
                  accountType === "BANK"
                    ? "bg-tcd-blue text-white border-tcd-blue"
                    : "text-tcd-blue border-gray-200"
                }
              `}
            >
              Bank Account
            </button>
          </div>

          <input
            value={accountHolderName}
            onChange={(event) =>
              setAccountHolderName(
                event.target.value
              )
            }
            placeholder="Account holder name"
            className="
              mt-4
              w-full
              border
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-tcd-blue
            "
          />

          {accountType === "UPI" ? (
            <input
              value={upiId}
              onChange={(event) =>
                setUpiId(
                  event.target.value
                )
              }
              placeholder="UPI ID"
              className="
                mt-3
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-tcd-blue
              "
            />
          ) : (
            <>
              <input
                value={bankAccountNumber}
                onChange={(event) =>
                  setBankAccountNumber(
                    event.target.value
                  )
                }
                placeholder="Bank account number"
                inputMode="numeric"
                className="
                  mt-3
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-tcd-blue
                "
              />

              <input
                value={ifscCode}
                onChange={(event) =>
                  setIfscCode(
                    event.target.value
                      .toUpperCase()
                  )
                }
                placeholder="IFSC code"
                className="
                  mt-3
                  w-full
                  border
                  rounded-xl
                  px-4
                  py-3
                  uppercase
                  outline-none
                  focus:border-tcd-blue
                "
              />
            </>
          )}

          <button
            type="button"
            disabled={payoutLoading}
            onClick={
              handleSavePayoutAccount
            }
            className="
              mt-5
              w-full
              rounded-xl
              bg-tcd-blue
              text-white
              py-3
              font-bold
              disabled:opacity-50
            "
          >
            {payoutLoading
              ? "Saving..."
              : "Save Payout Account"}
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <div
            className="
              bg-[#F7F9FC]
              border
              border-gray-100
              rounded-2xl
              p-4
            "
          >
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">
                  Payout Account
                </p>

                <p className="font-bold mt-1">
                  {
                    payoutAccount.accountHolderName
                  }
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {payoutAccount.accountType ===
                  "UPI"
                    ? payoutAccount.upiId
                    : `${payoutAccount.bankAccountNumber} • ${payoutAccount.ifscCode}`}
                </p>
              </div>

              <div>
                {payoutAccount.isVerified ? (
                  <span className="text-sm font-bold text-green-600">
                    Verified
                  </span>
                ) : (
                  <span className="text-sm font-bold text-yellow-600">
                    Verification Pending
                  </span>
                )}
              </div>
            </div>
          </div>

          {!payoutAccount.isVerified ? (
            <div
              className="
                mt-4
                rounded-2xl
                bg-yellow-50
                border
                border-yellow-200
                p-4
                text-sm
                text-yellow-800
              "
            >
              Your payout account must be verified before you can withdraw funds.
            </div>
          ) : (
            <>
              <div className="mt-5">
                <label className="text-sm font-semibold">
                  Withdrawal Amount
                </label>

                <div className="relative mt-2">
                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      font-bold
                    "
                  >
                    ₹
                  </span>

                  <input
                    type="number"
                    min="300"
                    step="1"
                    value={
                      withdrawAmount
                    }
                    onChange={(event) =>
                      setWithdrawAmount(
                        event.target.value
                      )
                    }
                    placeholder="300"
                    className="
                      w-full
                      border
                      rounded-xl
                      pl-9
                      pr-4
                      py-3
                      outline-none
                      focus:border-tcd-blue
                    "
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Available:{" "}
                  {formatRupees(
                    wallet?.available_balance ??
                      0
                  )}
                </p>
              </div>

              <button
                type="button"
                disabled={
                  payoutLoading
                }
                onClick={
                  handleWithdrawal
                }
                className="
                  mt-5
                  w-full
                  rounded-xl
                  bg-tcd-blue
                  text-white
                  py-3
                  font-bold
                  disabled:opacity-50
                "
              >
                {payoutLoading
                  ? "Submitting..."
                  : "Request Withdrawal"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  </div>
)}
    </>
  );
}