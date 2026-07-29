"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Trophy,
  Shield,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
export function FeaturesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 lg:flex-row">

  {/* Logo */}

  <Link
    href="/"
    className="flex items-center gap-4"
  >
    <Image
      src="/logo.png"
      alt="The Conclusion Daily"
      width={70}
      height={70}
      priority
      className="rounded-xl"
    />

    <div>
      <h2 className="text-2xl font-bold text-white">
        THE CONCLUSION DAILY
      </h2>

      <p className="text-sm text-slate-400">
        Hope & Faith
      </p>
    </div>
  </Link>

  <Link
    href="/"
    className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-blue-500 hover:bg-slate-900"
  >
    <ArrowLeft className="h-5 w-5" />
    Back to Home
  </Link>

</div>
<div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
  <Link href="/" className="hover:text-white">
    Home
  </Link>

  <span>/</span>

  <span className="text-blue-400">
    Features
  </span>
</div>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-semibold text-yellow-400">
              🚀 Powerful Learning Platform
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white lg:text-7xl">
              Everything You Need
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                To Learn & Compete
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              The Conclusion Daily combines secure online examinations,
              real-time rankings, powerful analytics, rewards, and
              institute management into one premium learning ecosystem.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-7 py-4 font-semibold text-white transition hover:border-blue-500 hover:bg-slate-900"
              >
                <ArrowLeft className="h-5 w-5" />
                Back Home
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
              <div>
                <h3 className="text-3xl font-bold text-white">1000+</h3>
                <p className="mt-1 text-sm text-slate-400">Questions</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">Live</h3>
                <p className="mt-1 text-sm text-slate-400">Competitive Exams</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">AI</h3>
                <p className="mt-1 text-sm text-slate-400">Proctoring</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">24×7</h3>
                <p className="mt-1 text-sm text-slate-400">Learning</p>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
              <h3 className="mb-8 text-2xl font-bold text-white">
                Platform Highlights
              </h3>

              <div className="space-y-5">
                <FeatureCard
                  icon={<GraduationCap />}
                  title="Smart Online Exams"
                  description="Practice tests, live exams and mock tests."
                />

                <FeatureCard
                  icon={<Shield />}
                  title="Advanced Security"
                  description="Face detection, fullscreen mode and anti-cheat."
                />

                <FeatureCard
                  icon={<BarChart3 />}
                  title="Performance Analytics"
                  description="Track your progress with detailed reports."
                />

                <FeatureCard
                  icon={<Trophy />}
                  title="Rewards & Achievements"
                  description="Earn TCD Credits, badges and certificates."
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-blue-500">
      <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}