"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  Check,
  ShieldCheck,
  Wallet,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type PaymentResult = {
  amount: number;
  bonusUsed: number;
  cashUsed: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceNumber: string;
};

type ExamData = {
  id: string;
  title: string;
  entry_fee: number;
  published: boolean;
  cancelled: boolean;
};

export default function ExamEntryPage() {

  const params =
    useParams();

  const router =
    useRouter();

  const examId =
    Array.isArray(params.id)
      ? params.id[0]
      : params.id;

  const [
    exam,
    setExam,
  ] =
    useState<ExamData | null>(
      null
    );

  const [
    walletBalance,
    setWalletBalance,
  ] =
    useState(0);

  const [
    bonusBalance,
    setBonusBalance,
  ] =
    useState(0);

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    processing,
    setProcessing,
  ] =
    useState(false);

  const [
    payment,
    setPayment,
  ] =
    useState<PaymentResult | null>(
      null
    );

  const [
    error,
    setError,
  ] =
    useState("");

  useEffect(() => {

  async function loadPage() {

    if (!examId) {
      return;
    }

    try {

      const response =
        await fetch(
          "/api/exam/entry-status",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                examId,
              }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {

        if (
          response.status === 401
        ) {
          router.replace(
            "/login"
          );

          return;
        }

        setError(
          result.error ||
          "Unable to load exam."
        );

        setLoading(false);

        return;
      }

      // Free exam:
      // payment page is unnecessary.
      if (
        !result.paymentRequired &&
        !result.alreadyPaid
      ) {
        router.replace(
          `/exam/${examId}`
        );

        return;
      }

      // Student already paid:
      // continue directly to exam.
      if (
        result.alreadyPaid
      ) {
        router.replace(
          `/exam/${examId}`
        );

        return;
      }

      setExam(
        result.exam
      );

      if (
        result.wallet
      ) {

        setWalletBalance(
          Number(
            result.wallet
              .available_balance ??
              0
          )
        );

        setBonusBalance(
          Number(
            result.wallet
              .bonus_balance ??
              0
          )
        );
      }

      setLoading(false);

    } catch (error) {

      console.error(
        "ENTRY PAGE LOAD ERROR:",
        error
      );

      setError(
        "Unable to load exam entry details."
      );

      setLoading(false);
    }
  }

  loadPage();

}, [
  examId,
  router,
]);

  const formatMoney = (
    paise: number
  ) =>
    `₹${(
      paise / 100
    ).toFixed(2)}`;

  async function handlePayment() {

    if (
      !exam ||
      processing
    ) {
      return;
    }

    // Free exams do not need
    // wallet payment.
    if (
      exam.entry_fee <= 0
    ) {
      router.push(
        `/exam/${examId}`
      );

      return;
    }

    setProcessing(true);
    setError("");

    try {

      const response =
        await fetch(
          "/api/exam/pay-entry-fee",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                examId,
              }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
          "Payment failed"
        );
      }

      setPayment(
        result.payment
      );

      // Keep success state visible
      // before entering the exam.
      setTimeout(() => {

        router.push(
          `/exam/${examId}`
        );

      }, 2500);

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Unable to process payment."
      );

      setProcessing(false);
    }
  }

  if (loading) {

    return (
      <main className="
        min-h-screen
        bg-[#F5F7FB]
        flex
        items-center
        justify-center
      ">
        <div className="
          w-12
          h-12
          rounded-full
          border-4
          border-[#243B6B]/20
          border-t-[#D4AF37]
          animate-spin
        " />
      </main>
    );
  }

  if (
    error &&
    !exam
  ) {

    return (
      <main className="
        min-h-screen
        bg-[#F5F7FB]
        flex
        items-center
        justify-center
        px-6
      ">

        <div className="
          max-w-md
          w-full
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          text-center
        ">

          <h1 className="
            text-xl
            font-bold
            text-[#243B6B]
          ">
            Unable to continue
          </h1>

          <p className="
            mt-3
            text-gray-500
          ">
            {error}
          </p>

        </div>

      </main>
    );
  }

  if (!exam) {
    return null;
  }

  const estimatedBonusUsed =
    Math.min(
      bonusBalance,
      exam.entry_fee
    );

  const estimatedCashUsed =
    Math.max(
      exam.entry_fee -
        estimatedBonusUsed,
      0
    );
const entryFee =
  Number(exam?.entry_fee ?? 0);

const hasInsufficientBalance =
  walletBalance < entryFee;

const shortageAmount =
  Math.max(
    entryFee - walletBalance,
    0
  );
  return (
    <main className="
      min-h-screen
      bg-gradient-to-br
      from-[#EEF2FA]
      via-white
      to-[#FFF9E8]
      flex
      items-center
      justify-center
      px-4
      py-10
    ">
{/* TCD BRAND */}

<div className="flex flex-col items-center mb-8">
  <img
    src="/logo.png"
    alt="The Conclusion Daily"
    className="w-20 h-20 object-contain"
  />

  <h1 className="mt-3 text-lg font-black tracking-wide text-[#243B6B]">
    THE CONCLUSION DAILY
  </h1>

  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4AF37]">
    Hope & Faith
  </p>
</div>
      <div className="
        w-full
        max-w-md
      ">

        <div className="
          bg-white
          rounded-[32px]
          shadow-2xl
          shadow-[#243B6B]/10
          overflow-hidden
          border
          border-white
        ">

          <div className="
            bg-[#243B6B]
            px-7
            py-6
            text-white
          ">

            <div className="
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/60
                ">
                  The Conclusion Daily
                </p>

                <h1 className="
                  mt-2
                  text-xl
                  font-bold
                ">
                  Secure Exam Entry
                </h1>

              </div>

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              ">
                <ShieldCheck
                  className="
                    w-6
                    h-6
                    text-[#D4AF37]
                  "
                />
              </div>

            </div>

          </div>

          <div className="
            p-7
          ">

            {!payment ? (
              <>

                <div className="
                  text-center
                  mb-7
                ">

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    Entry fee for
                  </p>

                  <h2 className="
                    mt-1
                    text-xl
                    font-bold
                    text-[#243B6B]
                  ">
                    {exam.title}
                  </h2>

                  <div className="
                    mt-5
                    text-4xl
                    font-black
                    text-[#243B6B]
                  ">
                    {formatMoney(
                      exam.entry_fee
                    )}
                  </div>
{hasInsufficientBalance && (
  <div className="
    mb-6
    rounded-2xl
    border
    border-red-200
    bg-red-50
    p-5
  ">
    <p className="font-bold text-red-700">
      Insufficient Wallet Balance
    </p>

    <div className="mt-3 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">
          Entry Fee
        </span>

        <span className="font-bold text-[#243B6B]">
          {formatMoney(entryFee)}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">
          Available Balance
        </span>

        <span className="font-bold text-[#243B6B]">
          {formatMoney(walletBalance)}
        </span>
      </div>

      <div className="flex justify-between border-t border-red-200 pt-2">
        <span className="font-semibold text-red-700">
          Amount Required
        </span>

        <span className="font-black text-red-700">
          {formatMoney(shortageAmount)}
        </span>
      </div>
    </div>
  </div>
)}
                </div>

                <div className="
                  bg-[#F7F9FD]
                  rounded-2xl
                  p-5
                  space-y-4
                ">

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Wallet balance
                    </span>

                    <span className="
                      font-bold
                      text-[#243B6B]
                    ">
                      {formatMoney(
                        walletBalance
                      )}
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Bonus used
                    </span>

                    <span className="
                      font-semibold
                      text-[#243B6B]
                    ">
                      {formatMoney(
                        estimatedBonusUsed
                      )}
                    </span>

                  </div>

                  <div className="
                    flex
                    justify-between
                  ">

                    <span className="
                      text-gray-500
                    ">
                      Cash used
                    </span>

                    <span className="
                      font-semibold
                      text-[#243B6B]
                    ">
                      {formatMoney(
                        estimatedCashUsed
                      )}
                    </span>

                  </div>

                </div>

                {error && (
                  <div className="
                    mt-5
                    rounded-xl
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-600
                  ">
                    {error}
                  </div>
                )}

                <button
  onClick={() => {
 if (hasInsufficientBalance) {
  router.push(
    `/dashboard?addMoney=true&amount=${shortageAmount}&returnTo=${encodeURIComponent(
      `/exam/${examId}/entry`
    )}`
  );

  return;
}

    handlePayment();
  }}
  disabled={processing}
  className="
    mt-7
    w-full
    min-h-14
    rounded-2xl
    bg-[#243B6B]
    text-white
    font-bold
    flex
    items-center
    justify-center
    gap-3
    transition
    hover:scale-[1.01]
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {processing ? (
    <>
      <div className="
        w-5
        h-5
        border-2
        border-white/30
        border-t-[#D4AF37]
        rounded-full
        animate-spin
      " />

      Processing securely...
    </>
  ) : hasInsufficientBalance ? (
    <>
      <Wallet className="w-5 h-5" />

      Add{" "}
      {formatMoney(
        shortageAmount
      )}{" "}
      to Continue
    </>
  ) : (
    <>
      <Wallet className="w-5 h-5" />

      Pay{" "}
      {formatMoney(
        entryFee
      )}{" "}
      & Enter Exam

      <ArrowRight className="w-5 h-5" />
    </>
  )}
</button>

                <div className="
                  mt-5
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-gray-400
                ">

                  <ShieldCheck
                    className="
                      w-4
                      h-4
                    "
                  />

                  Secure wallet transaction

                </div>

              </>
            ) : (

              <div className="
                py-8
                text-center
              ">

                <div className="
                  relative
                  mx-auto
                  w-24
                  h-24
                ">

                  <div className="
                    absolute
                    inset-0
                    rounded-full
                    bg-[#D4AF37]/20
                    animate-ping
                  " />

                  <div className="
                    relative
                    w-24
                    h-24
                    rounded-full
                    bg-[#243B6B]
                    flex
                    items-center
                    justify-center
                    shadow-xl
                  ">

                    <Check
                      className="
                        w-12
                        h-12
                        text-[#D4AF37]
                      "
                    />

                  </div>

                </div>

                <div className="
                  mt-7
                  flex
                  justify-center
                ">
                  <Sparkles
                    className="
                      w-5
                      h-5
                      text-[#D4AF37]
                    "
                  />
                </div>

                <h2 className="
                  mt-3
                  text-2xl
                  font-black
                  text-[#243B6B]
                ">
                  Entry Confirmed
                </h2>

                <p className="
                  mt-2
                  text-gray-500
                ">
                  Your entry fee of{" "}
                  <strong>
                    {formatMoney(
                      payment.amount
                    )}
                  </strong>{" "}
                  has been successfully paid.
                </p>

                <div className="
                  mt-6
                  bg-[#F7F9FD]
                  rounded-2xl
                  p-5
                  text-left
                  space-y-3
                ">

                  <div className="
                    flex
                    justify-between
                  ">
                    <span className="
                      text-gray-500
                    ">
                      Bonus used
                    </span>

                    <strong>
                      {formatMoney(
                        payment.bonusUsed
                      )}
                    </strong>
                  </div>

                  <div className="
                    flex
                    justify-between
                  ">
                    <span className="
                      text-gray-500
                    ">
                      Cash used
                    </span>

                    <strong>
                      {formatMoney(
                        payment.cashUsed
                      )}
                    </strong>
                  </div>

                  <div className="
                    border-t
                    pt-3
                    flex
                    justify-between
                  ">
                    <span className="
                      text-gray-500
                    ">
                      Remaining balance
                    </span>

                    <strong className="
                      text-[#243B6B]
                    ">
                      {formatMoney(
                        payment.balanceAfter
                      )}
                    </strong>
                  </div>

                </div>

                <p className="
                  mt-6
                  text-sm
                  text-gray-400
                ">
                  Preparing your secure exam environment...
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </main>
  );
}