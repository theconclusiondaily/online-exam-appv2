"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
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
    <section
      className="
        relative
        overflow-hidden
        bg-[#050B1A]
        py-24
        lg:py-32
      "
    >
      {/* ================================================================
          BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main gold atmosphere */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[42rem]
            w-[42rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-brand-gold/10
            blur-[130px]
          "
        />

        {/* Blue atmosphere */}
        <div
          className="
            absolute
            -left-48
            bottom-[-16rem]
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

        {/* Subtle top line */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand-gold/40
            to-transparent
          "
        />

        {/* Subtle radial grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ================================================================
            CTA PANEL
        ================================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.045]
            px-6
            py-12
            text-center
            shadow-[0_30px_90px_rgba(0,0,0,0.22)]
            backdrop-blur-2xl
            sm:px-10
            lg:px-16
            lg:py-16
          "
        >
          {/* Panel glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-[-12rem]
              h-[28rem]
              w-[28rem]
              -translate-x-1/2
              rounded-full
              bg-brand-gold/10
              blur-[100px]
            "
          />

          {/* Gold top accent */}

          <div
            className="
              absolute
              inset-x-16
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-brand-gold/60
              to-transparent
            "
          />

          <div className="relative">
            {/* Badge */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-brand-gold/25
                bg-brand-gold/10
                px-4
                py-2
                backdrop-blur-xl
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" />

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-brand-gold
                "
              >
                Join THE CONCLUSION DAILY
              </span>
            </div>

            {/* Heading */}

            <h2
              className="
                mx-auto
                mt-7
                max-w-4xl
                text-4xl
                font-black
                leading-[1.05]
                tracking-tight
                text-white
                md:text-5xl
                lg:text-[4rem]
              "
            >
              Ready to Transform{" "}
              <span className="text-brand-gold">
                Learning?
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                mx-auto
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-white/55
                md:text-lg
                md:leading-8
              "
            >
              Experience computer-based examinations, competitive learning,
              secure assessments, and detailed analytics on one platform.
            </p>

            {/* Buttons */}

            <div
              className="
                mt-10
                flex
                flex-col
                items-center
                justify-center
                gap-4
                sm:flex-row
              "
            >
              <GradientButton href="/signup">
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>

              <OutlineButton href="/institutes">
                <Building2 className="mr-2 h-5 w-5" />
                For Institutes
              </OutlineButton>
            </div>

            {/* Benefits */}

            <div
              className="
                mx-auto
                mt-12
                flex
                max-w-3xl
                flex-wrap
                justify-center
                gap-x-7
                gap-y-4
                border-t
                border-white/[0.08]
                pt-7
              "
            >
              {benefits.map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-white/55
                  "
                >
                  <CheckCircle2
                    className="
                      h-4
                      w-4
                      shrink-0
                      text-brand-gold
                    "
                  />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================================================================
            TRUST NOTE
        ================================================================ */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="
            mt-7
            flex
            items-center
            justify-center
            gap-2
            text-center
          "
        >
          <ShieldCheck className="h-4 w-4 text-brand-gold/70" />

          <span
            className="
              text-xs
              font-medium
              text-white/30
            "
          >
            A modern platform for students, educators, and institutes.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
