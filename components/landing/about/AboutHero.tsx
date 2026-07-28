import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { ArrowLeft } from "lucide-react";
export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-black" />

      {/* Decorative Blur */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
<div className="flex flex-col items-center text-center">
  <Image
    src="/logo.png" // or your actual logo path
    alt="The Conclusion Daily"
    width={420}
    height={420}
    priority
    className="drop-shadow-2xl"
  />

  <h1 className="mt-8 text-5xl md:text-6xl font-black text-brand">
    About The Conclusion Daily
  </h1>

  <p className="mt-6 max-w-3xl text-lg text-brand-muted">
    India's Competitive Learning Ecosystem
  </p>
</div>
      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex rounded-full border border-brand-gold/30 bg-white/5 px-4 py-2 text-sm font-medium text-brand-gold backdrop-blur">
          About {COMPANY.shortName}
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">
          {COMPANY.name}
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-2xl font-semibold text-brand-gold">
          {COMPANY.tagline}
        </p>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-300">
          {COMPANY.shortDescription}
        </p>
<div className="mt-16 flex justify-center">
  <Link
    href="/"
    className="group inline-flex items-center gap-3 rounded-full border border-yellow-500 bg-gradient-to-r from-blue-700 to-blue-900 px-8 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
  >
    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
    Return to Home
  </Link>
</div>
        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-8 py-4 font-semibold text-slate-950 transition hover:scale-105"
          >
            Explore Platform
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}