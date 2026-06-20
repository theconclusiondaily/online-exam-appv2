"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2 } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 p-10">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
          Verify Your Email
        </h1>

        <p className="mt-3 text-center text-slate-600 leading-7">
          Your account has been created successfully.
          <br />
          We've sent a verification link to:
        </p>

        {/* Email Box */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-4">
          <Mail className="h-5 w-5 text-slate-500" />

          <span className="break-all font-medium text-slate-800">
            {email || "your email address"}
          </span>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h2 className="font-semibold text-blue-900">
            Next Steps
          </h2>

          <ul className="mt-3 space-y-2 text-sm text-blue-800">
            <li>• Open your inbox.</li>
            <li>• Click the verification link we sent.</li>
            <li>• Once verified, return and log in.</li>
          </ul>
        </div>

        {/* Didn't receive */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Didn't receive the email?
          <br />
          Check your spam or promotions folder and wait a minute before trying
          again.
        </p>

        {/* Login Button */}
        <Link
          href="/login"
          className="mt-8 flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Login
        </Link>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Your account will become active only after email verification.
        </p>
      </div>
    </main>
  );
}