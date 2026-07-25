"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import ProductShowcase from "./showcase/ProductShowcase";

import GradientButton from "./ui/GradientButton";
import OutlineButton from "./ui/OutlineButton";
import GlowBackground from "./ui/GlowBackground";
import Section from "./ui/Section";

import { COMPANY } from "@/lib/landing/constants";

export default function Hero() {
  return (
    <Section className="relative min-h-screen flex items-center pt-24">

      <GlowBackground />

      <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-white/80 backdrop-blur-xl px-5 py-2">

            <Award className="h-5 w-5 text-brand-gold" />

            <span className="text-sm font-semibold text-brand">
              Hope • Faith • Excellence
            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-brand">

            India's

            <span className="block mt-2 text-brand-gold">
              Competitive
            </span>

            <span className="block">
              Learning
            </span>

            <span className="block">
              Ecosystem
            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-brand-muted">

            {COMPANY.heroDescription}

          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-wrap gap-4">

            <GradientButton href="/signup">

              Start Learning

              <ArrowRight className="ml-2 h-5 w-5" />

            </GradientButton>

            <OutlineButton href="/institutes">

              For Institutes

            </OutlineButton>

          </div>

          {/* Highlights */}

          <div className="mt-12 flex flex-wrap gap-6">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">

                <ShieldCheck size={20} />

              </div>

              <div>

                <p className="font-semibold text-brand">

                  Secure Exams

                </p>

                <p className="text-sm text-brand-muted">

                  AI Proctoring

                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold text-white">

                <Trophy size={20} />

              </div>

              <div>

                <p className="font-semibold text-brand">

                  Rewards

                </p>

                <p className="text-sm text-brand-muted">

                  Scholarships & Cash

                </p>

              </div>

            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: .8,
            delay: .2,
          }}
        >

        <ProductShowcase mode="dashboard" />

        </motion.div>

      </div>

      {/* Scroll Indicator */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.4,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          className="
            h-14
            w-8
            rounded-full
            border-2
            border-brand
            flex
            justify-center
            pt-2
          "
        >

          <div className="h-3 w-3 rounded-full bg-brand" />

        </motion.div>

      </motion.div>

    </Section>
  );
}