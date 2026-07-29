"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  School,
  Rocket,
  Sparkles,
} from "lucide-react";

export function FeaturesCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-950 to-slate-950 py-24">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-lg lg:p-16"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-sm font-semibold text-yellow-400">
              <Sparkles className="h-4 w-4" />
              Join the Future of Learning
            </div>

            <h2 className="text-4xl font-bold text-white lg:text-6xl">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Learning Journey?
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
              Whether you're a student preparing for competitive exams,
              a teacher creating engaging assessments, or an institution
              managing thousands of learners, The Conclusion Daily is
              built to help you succeed.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                <Rocket className="h-5 w-5" />
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/institutes"
                className="inline-flex items-center gap-2 rounded-xl border border-yellow-500 px-8 py-4 font-semibold text-yellow-400 transition-all duration-300 hover:bg-yellow-500 hover:text-slate-950"
              >
                <School className="h-5 w-5" />
                Create Institute
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-blue-500 hover:bg-slate-900"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 md:grid-cols-4">
              <div>
                <h3 className="text-4xl font-bold text-blue-400">1000+</h3>
                <p className="mt-2 text-slate-400">
                  Practice Questions
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-yellow-400">Live</h3>
                <p className="mt-2 text-slate-400">
                  Competitive Exams
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-green-400">
                  Secure
                </h3>
                <p className="mt-2 text-slate-400">
                  Proctoring System
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-bold text-cyan-400">
                  24×7
                </h3>
                <p className="mt-2 text-slate-400">
                  Learning Platform
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}