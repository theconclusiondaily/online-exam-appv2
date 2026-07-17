"use client";

import { useEffect, useState } from "react";

import TCDIcon from "@/components/brand/TCDIcon";

import { supabase } from "@/lib/supabase/client";
import { getWallet } from "@/services/wallet.service";
import {
  formatCredits,
  formatRupees,
} from "@/lib/finance/formatter";

import type {
  Wallet,
} from "@/services/finance.types";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function WalletCard() {
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

  useEffect(() => {
    loadWallet();
  }, []);

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
      alert(
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

            alert(
              "Payment successful. Your TCD Wallet has been credited."
            );
          } catch (error) {
            console.error(
              "PAYMENT VERIFY ERROR:",
              error
            );

            alert(
              error instanceof Error
                ? error.message
                : "Payment verification failed."
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

          alert(
            response.error
              ?.description ||
              "Payment failed."
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

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
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
    </>
  );
}