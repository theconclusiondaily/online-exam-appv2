"use client";

import Link from "next/link";
import { COMPANY, LEGAL } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Company */}
          <div>
            <h2 className="text-2xl font-black text-brand-gold">
              {COMPANY.name}
            </h2>

            <p className="mt-4 text-slate-400">
              {COMPANY.tagline}
            </p>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              {COMPANY.shortDescription}
            </p>
          </div>

          {/* Students */}
          <div>
            <h3 className="font-semibold">Students</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link
                  href="/signup"
                  className="transition hover:text-brand-gold"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition hover:text-brand-gold"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/features"
                  className="transition hover:text-brand-gold"
                >
                  Explore Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutes */}
          <div>
            <h3 className="font-semibold">Company</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link
                  href="/institutes"
                  className="transition hover:text-brand-gold"
                >
                  Institute Platform
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-brand-gold"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-brand-gold"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold">Legal</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-brand-gold"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-brand-gold"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refund"
                  className="transition hover:text-brand-gold"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
          {LEGAL.copyright}
        </div>
      </div>
    </footer>
  );
}