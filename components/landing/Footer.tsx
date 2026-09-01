"use client";

import Link from "next/link";
import { COMPANY, LEGAL } from "@/lib/company";
import {
  ArrowUpRight,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050B1A] text-white">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 bottom-[-14rem] h-[32rem] w-[32rem] rounded-full bg-brand-gold/7 blur-[120px]" />
        <div className="absolute -right-40 top-[-14rem] h-[30rem] w-[30rem] rounded-full bg-blue-500/8 blur-[120px]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent" />

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-black tracking-tight text-brand-gold">
                {COMPANY.name}
              </span>
            </Link>

            <p className="mt-3 text-sm font-semibold text-white/65">
              {COMPANY.tagline}
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
              {COMPANY.shortDescription}
            </p>

            {/* Support */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=support@theconclusiondaily.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/55 transition-all duration-300 hover:border-brand-gold/25 hover:bg-white/[0.07] hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <Mail className="h-4 w-4" />
              </span>

              <span>support@theconclusiondaily.com</span>

              <ArrowUpRight className="h-3.5 w-3.5 text-white/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-gold" />
            </a>
          </div>

          {/* Students */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              Students
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/45">
              <li>
                <Link
                  href="/signup"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/features"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Explore Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              Company
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/45">
  <li>
    <Link
      href="/institutes"
      className="transition-colors duration-200 hover:text-white"
    >
      Institute Platform
    </Link>
  </li>

  <li>
    <Link
      href="/rewards"
      className="transition-colors duration-200 hover:text-white"
    >
      Rewards
    </Link>
  </li>

  <li>
    <Link
      href="/contact"
      className="transition-colors duration-200 hover:text-white"
    >
      Contact
    </Link>
  </li>

  <li>
    <Link
      href="/about"
      className="transition-colors duration-200 hover:text-white"
    >
      About Us
    </Link>
  </li>
</ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
              Legal
            </h3>

            <ul className="mt-6 space-y-4 text-sm text-white/45">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/refund"
                  className="transition-colors duration-200 hover:text-white"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-white/[0.08] pt-7">
          <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-white/30">
              {LEGAL.copyright}
            </p>

            <div className="flex items-center gap-2 text-xs font-medium text-white/30">
              <ShieldCheck className="h-4 w-4 text-brand-gold/60" />
              <span>Secure • Transparent • Built for Learning</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
