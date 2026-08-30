"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Camera,
  Monitor,
  Clock3,
} from "lucide-react";

import Section from "./ui/Section";
import ProductShowcase from "./showcase/ProductShowcase";

const features = [
  {
    icon: ShieldCheck,
    title: "AI Proctoring",
    description:
      "Built-in monitoring helps maintain exam integrity.",
  },
  {
    icon: Camera,
    title: "Camera Monitoring",
    description:
      "Supports live camera verification during examinations.",
  },
  {
    icon: Monitor,
    title: "Fullscreen Protection",
    description:
      "Designed for distraction-free computer-based testing.",
  },
  {
    icon: Clock3,
    title: "Smart Timer",
    description:
      "Accurate countdown with automatic submission.",
  },
];

export default function ExamExperience() {
  return (
    <Section
      className="
        relative
        overflow-hidden
        bg-[#050B1A]
        py-20
        lg:py-28
      "
    >
      {/* ================================================================ */}
      {/* BACKGROUND                                                        */}
      {/* ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle gold glow */}


        {/* Subtle blue glow */}

       
        {/* Top separator */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand-gold/20
            to-transparent
          "
        />

        {/* Bottom separator */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />
      </div>

      {/* ================================================================ */}
      {/* CONTENT                                                           */}
      {/* ================================================================ */}

      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-14
          lg:grid-cols-2
          lg:gap-16
        "
      >
        {/* ============================================================ */}
        {/* LEFT — EXAM PREVIEW                                           */}
        {/* ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Showcase glow */}

          <div
            className="
              pointer-events-none
              absolute
              -inset-8
              rounded-[3rem]
              bg-brand-gold/5
              blur-3xl
            "
          />

          <div className="relative">
            <ProductShowcase mode="exam" />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* RIGHT — CONTENT                                                */}
        {/* ============================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          {/* ========================================================== */}
          {/* BADGE                                                       */}
          {/* ========================================================== */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand-gold/30
              bg-brand-gold/5
              px-4
              py-2
            "
          >
            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-brand-gold
              "
            >
              Exam Experience
            </span>
          </div>

          {/* ========================================================== */}
          {/* HEADING                                                     */}
          {/* ========================================================== */}

          <h2
            className="
              mt-7
              max-w-2xl
              text-4xl
              font-black
              leading-[1.05]
              tracking-tight
              text-white
              md:text-5xl
              xl:text-[3.5rem]
            "
          >
            Built for Secure{" "}
            <span className="text-brand-gold">
              Computer-Based
            </span>{" "}
            Testing
          </h2>

          {/* ========================================================== */}
          {/* DESCRIPTION                                                 */}
          {/* ========================================================== */}

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-white/60
            "
          >
            A professional exam environment with intelligent
            monitoring, smooth navigation, and reliable performance.
          </p>

          {/* ========================================================== */}
          {/* FEATURES                                                    */}
          {/* ========================================================== */}

          <div className="mt-10 space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -2,
                  }}
                  className="
                    group
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-5
                    transition-all
                    duration-300
                    hover:border-brand-gold/25
                    hover:bg-white/[0.045]
                  "
                >
                  {/* ================================================== */}
                  {/* ICON                                                  */}
                  {/* ================================================== */}

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-gold/30
                      bg-brand-gold/5
                      text-brand-gold
                      transition-all
                      duration-300
                      group-hover:border-brand-gold/50
                      group-hover:bg-brand-gold/10
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* ================================================== */}
                  {/* TEXT                                                  */}
                  {/* ================================================== */}

                  <div className="min-w-0">
                    <h3
                      className="
                        text-base
                        font-bold
                        tracking-tight
                        text-white
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-6
                        text-white/45
                      "
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}