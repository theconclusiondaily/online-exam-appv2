"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  CheckCircle2,
} from "lucide-react";

import GradientButton from "./ui/GradientButton";
import OutlineButton from "./ui/OutlineButton";

const benefits = [
  "Free Registration",
  "AI-Powered Exams",
  "Instant Results",
  "National Rankings",
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-slate-950" />

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center"
        >

          <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
            Join THE CONCLUSION DAILY
          </span>

          <h2 className="mt-8 text-5xl font-black leading-tight text-white lg:text-6xl">
            Ready to Transform Learning?
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
            Experience computer-based examinations, competitive learning,
            secure assessments, and detailed analytics on one platform.
          </p>

          {/* Buttons */}

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">

            <GradientButton href="/signup">

              <GraduationCap className="mr-2 h-5 w-5" />

              Start Learning

            </GradientButton>

            <OutlineButton href="/institutes">

              <Building2 className="mr-2 h-5 w-5" />

              For Institutes

            </OutlineButton>

          </div>

          {/* Benefits */}

          <div className="mt-14 flex flex-wrap justify-center gap-8">

            {benefits.map((item) => (

              <div
                key={item}
                className="flex items-center gap-2 text-white"
              >

                <CheckCircle2 className="h-5 w-5 text-brand-gold" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}