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
import type { HeroData } from "@/lib/landing/types";
interface HeroProps {
  data: HeroData;
}

export default function Hero({
  data,
}: HeroProps) {
  return (
    <Section
  className="
    relative
    min-h-screen
    flex
    items-center
    overflow-hidden
    bg-[#050B1A]
    pt-28
    pb-16
  "
>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div
    className="
      absolute
      -left-32
      top-20
      h-96
      w-96
      rounded-full
      bg-brand-gold/10
      blur-3xl
    "
  />

  <div
    className="
      absolute
      right-0
      top-1/3
      h-[32rem]
      w-[32rem]
      rounded-full
      bg-blue-400/10
      blur-3xl
    "
  />

  <div
    className="
      absolute
      inset-x-0
      bottom-0
      h-px
      bg-gradient-to-r
      from-transparent
      via-brand-gold/40
      to-transparent
    "
  />
</div>

      <div
  className="
    relative
    z-10
    grid
    items-center
    gap-12
   lg:grid-cols-[0.85fr_1.15fr]
    lg:gap-10
  "
>

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >

          {/* Badge */}

        <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 backdrop-blur-xl">
  <Award className="h-4 w-4 text-brand-gold" />

  <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
    Hope & Faith
  </span>
</div>

          {/* Heading */}

          <h1 className="mt-8 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-white md:text-6xl xl:text-[4.5rem]">

            India's

            <span className="mt-2 block text-brand-gold drop-shadow-[0_0_24px_rgba(234,179,8,0.15)]">
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

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">

            {COMPANY.heroDescription}

          </p>

          {/* CTA */}

         <div className="mt-10 flex items-center gap-4">

           <GradientButton
  size="md"
  className="shrink-0 whitespace-nowrap"
  href="https://exam.theconclusiondaily.com/signup"
  target="_blank"
  rel="noopener noreferrer">

              Start Learning

              <ArrowRight className="ml-2 h-5 w-5" />

            </GradientButton>

            <OutlineButton
  size="md"
  className="shrink-0 whitespace-nowrap"
  href="/login"
>
  Login
</OutlineButton>

          </div>
<div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-6 sm:grid-cols-4">
  <div>
    <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
      {data.stats.exams}
    </p>
    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
      Live Exams
    </p>
  </div>

  <div>
    <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
      {data.stats.students}
    </p>
    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
      Students
    </p>
  </div>

  <div>
    <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
      {data.stats.institutes}
    </p>
    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
      Institutes
    </p>
  </div>

  <div>
    <p className="text-2xl font-black tracking-tight text-white sm:text-3xl">
      {data.stats.questions}
    </p>
    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
      Questions
    </p>
  </div>
</div>
          {/* Highlights */}

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">

                <ShieldCheck size={20} />

              </div>

              <div>

                <p className="font-semibold text-white">
  Secure Exams
</p>

<p className="text-sm text-white/45">
  AI Proctoring
</p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">

                <Trophy size={20} />

              </div>

              <div>

               <p className="font-semibold text-white">
  Rewards
</p>

<p className="text-sm text-white/45">
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

       {data.featuredExam && (
  <div className="
  mb-5
  rounded-2xl
  border
  border-white/10
  bg-white/[0.04]
  p-5
  backdrop-blur-xl
">
    <div className="flex items-center justify-between">
      <div>
       <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
  Featured Exam
</p>

       <h3 className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">
          {data.featuredExam.title}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          Prize Pool: {data.featuredExam.rewardPool}
        </p>
      </div>

      <span className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1.5 text-xs font-bold text-brand-gold">
        {data.featuredExam.status}
      </span>
    </div>
  </div>
)}

<div className="relative">
  <div className="absolute -inset-6 rounded-[40px] bg-brand-gold/5 blur-3xl" />

  <div className="relative">
    <ProductShowcase mode="dashboard" />
  </div>
</div>

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
            border-white/20
            flex
            justify-center
            pt-2
          "
        >

          <div className="h-3 w-3 rounded-full bg-brand-gold" />

        </motion.div>

      </motion.div>

    </Section>
  );
}