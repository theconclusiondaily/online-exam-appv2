"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  countdownMinutes: number;
  onStayLoggedIn: () => void;
  onLogout: () => void;
};

export default function SessionTimeoutModal({
  open,
  countdownMinutes,
  onStayLoggedIn,
  onLogout,
}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(
  countdownMinutes * 60
);

useEffect(() => {
  if (!open) return;

  setSecondsLeft(countdownMinutes * 60);

  const interval = setInterval(() => {
    setSecondsLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [open, countdownMinutes]);

const minutes = Math.floor(secondsLeft / 60);
const seconds = secondsLeft % 60;
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">

          <div className="flex items-center gap-3">

            <AlertTriangle className="w-8 h-8" />

            <div>

              <h2 className="text-2xl font-bold">
                Session Expiring
              </h2>

              <p className="opacity-90 text-sm">
                Your account has been inactive.
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

       <div className="p-6 text-center">

  <p className="text-gray-700 leading-7">
    For your security, your session will expire unless you continue.
  </p>

  <div
    className="
      mt-6
      rounded-2xl
      border
      border-red-200
      bg-red-50
      py-5
    "
  >
    <div className="text-sm text-gray-600">
      Session expires in
    </div>

    <div
      className="
        mt-2
        text-5xl
        font-bold
        tracking-wider
        text-red-600
        tabular-nums
      "
    >
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  </div>

</div>

        {/* Footer */}

        <div className="border-t p-5 flex gap-3">

          <button
            onClick={onLogout}
            className="
              flex-1
              rounded-xl
              border
              border-red-300
              py-3
              font-semibold
              text-red-600
              hover:bg-red-50
              transition
            "
          >
            Logout
          </button>

          <button
            onClick={onStayLoggedIn}
            className="
              flex-1
              rounded-xl
              bg-tcd-blue
              text-white
              py-3
              font-semibold
              hover:opacity-90
              transition
            "
          >
            Stay Logged In
          </button>

        </div>

      </div>

    </div>
  );
}