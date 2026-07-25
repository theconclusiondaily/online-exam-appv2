"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <h2 className="text-2xl font-black text-brand-gold">
              THE CONCLUSION DAILY
            </h2>

            <p className="mt-4 text-slate-400">
              Hope & Faith
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              A modern online examination platform for students,
              teachers, and educational institutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Students</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link href="/signup">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/exams">Exams</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Institutes</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link href="/institutes">
                  Institute Platform
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Legal</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/refund-policy">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          © 2026 THE CONCLUSION DAILY. All rights reserved.
        </div>

      </div>
    </footer>
  );
}