"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Camera,
  Monitor,
  Save,
  Eye,
  Lock,
  CheckCircle2,
  Activity,
} from "lucide-react";

import Section from "./ui/Section";

const securityFeatures = [
  {
    icon: ShieldCheck,
    title: "AI Proctoring",
    description:
      "Intelligent monitoring helps identify suspicious activity during examinations.",
  },
  {
    icon: Camera,
    title: "Camera Verification",
    description:
      "Live camera verification supports secure and accountable exam sessions.",
  },
  {
    icon: Monitor,
    title: "Fullscreen Protection",
    description:
      "Keeps the examination environment focused and minimizes distractions.",
  },
  {
    icon: Eye,
    title: "Activity Monitoring",
    description:
      "Important examination events are recorded for review and analysis.",
  },
  {
    icon: Save,
    title: "Continuous Auto Save",
    description:
      "Student responses are continuously saved throughout the examination.",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description:
      "Modern authentication and data protection help keep examination data secure.",
  },
];

export default function AISecurity() {
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
        {/* Large gold glow */}
        <div
          className="
            absolute
            -left-48
            top-1/4
            h-[36rem]
            w-[36rem]
            rounded-full
            bg-brand-gold/10
            blur-[120px]
          "
        />

        {/* Blue glow */}
        <div
          className="
            absolute
            right-[-14rem]
            top-[-10rem]
            h-[40rem]
            w-[40rem]
            rounded-full
            bg-blue-500/10
            blur-[140px]
          "
        />

        {/* Bottom glow */}
        <div
          className="
            absolute
            bottom-[-18rem]
            left-1/3
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/[0.04]
            blur-[120px]
          "
        />

        {/* Top border */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand-gold/30
            to-transparent
          "
        />

        {/* Bottom border */}
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

        {/* Subtle grid */}
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

      <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* ================================================================ */}
        {/* LEFT — SECURITY VISUAL                                           */}
        {/* ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Outer glow */}
          <div
            className="
              pointer-events-none
              absolute
              -inset-12
              rounded-full
              bg-brand-gold/10
              blur-[80px]
            "
          />

          {/* Security panel */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/10
              bg-[#0a1120]
              p-6
              shadow-2xl
              shadow-black/30
              sm:p-8
            "
          >
            {/* Panel glow */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-64
                w-64
                -translate-x-1/2
                rounded-full
                bg-brand-gold/10
                blur-[80px]
              "
            />

            {/* Header */}
            <div className="relative flex items-center justify-between">
              <div>
                <p
                  className="
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-brand-gold
                  "
                >
                  AI SECURITY
                </p>

                <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
                  Examination Security
                </h3>
              </div>

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-brand-gold/30
                  bg-brand-gold/10
                  text-brand-gold
                "
              >
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>

            {/* Security status */}
            <div
              className="
                relative
                mt-7
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-400/10
                      text-emerald-400
                    "
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Examination Secure
                    </p>

                    <p className="mt-0.5 text-xs text-white/40">
                      AI monitoring active
                    </p>
                  </div>
                </div>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-xs
                    font-semibold
                    text-emerald-400
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE
                </span>
              </div>
            </div>

            {/* Monitoring visualization */}
            <div
              className="
                relative
                mt-5
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#0d1628]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-white/60">
                  Live Monitoring
                </p>

                <Activity className="h-4 w-4 text-brand-gold" />
              </div>

              {/* Signal */}
              <div className="mt-6 flex h-20 items-end gap-1.5">
                {[28, 42, 34, 58, 48, 72, 52, 64, 45, 78, 58, 68, 52, 74, 61, 82, 56, 70].map(
                  (height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 4 }}
                      whileInView={{ height }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.025,
                      }}
                      className="
                        flex-1
                        rounded-t
                        bg-brand-gold/60
                      "
                    />
                  )
                )}
              </div>

              <div className="mt-4 flex justify-between text-[10px] text-white/30">
                <span>Monitoring active</span>
                <span>Real time</span>
              </div>
            </div>

            {/* Verification rows */}
            <div className="relative mt-5 space-y-2.5">
              {[
                "Face detected",
                "Camera connected",
                "Fullscreen enabled",
                "No violations detected",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    px-4
                    py-3
                  "
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                    <span className="text-xs font-medium text-white/60">
                      {item}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-400">
                    VERIFIED
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div
              className="
                relative
                mt-6
                flex
                items-center
                gap-2
                border-t
                border-white/[0.07]
                pt-5
                text-[11px]
                text-white/35
              "
            >
              <Lock className="h-3.5 w-3.5 text-brand-gold/70" />

              Secure examination session
            </div>
          </div>
        </motion.div>

        {/* ================================================================ */}
        {/* RIGHT — CONTENT                                                   */}
        {/* ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          {/* Badge */}
          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand-gold/30
              bg-brand-gold/10
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
              Trust & Security
            </span>
          </div>

          {/* Heading */}
          <h2
            className="
              mt-7
              max-w-2xl
              text-4xl
              font-black
              leading-[1.08]
              tracking-tight
              text-white
              md:text-5xl
              xl:text-[3.5rem]
            "
          >
            Security Built Into{" "}
            <span className="text-brand-gold">
              Every Examination
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-white/60
            "
          >
            From identity verification to activity monitoring, TCD is
            designed to create a controlled and reliable environment for
            computer-based examinations.
          </p>

          {/* Security features */}
          <div className="mt-10 space-y-3">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
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
                    bg-white/[0.035]
                    p-4
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:border-brand-gold/25
                    hover:bg-white/[0.055]
                  "
                >
                  {/* Icon */}
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
                      border-brand-gold/25
                      bg-brand-gold/10
                      text-brand-gold
                      transition-all
                      duration-300
                      group-hover:border-brand-gold/40
                      group-hover:bg-brand-gold/15
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0">
                    <h3
                      className="
                        text-sm
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
                        text-white/40
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