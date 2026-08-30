"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Cloud,
  FileSpreadsheet,
  MonitorSmartphone,
  Users,
} from "lucide-react";

import Section from "./ui/Section";
import ProductShowcase from "./showcase/ProductShowcase";
import GradientButton from "./ui/GradientButton";

const features = [
  {
    icon: FileSpreadsheet,
    title: "Powerful Exam Builder",
    description:
      "Create objective exams with configurable settings, scheduling, and scoring.",
  },
  {
    icon: MonitorSmartphone,
    title: "Live Monitoring",
    description:
      "Track ongoing exams, attendance, and student progress in real time.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Understand individual, batch, and institute-level performance through detailed reports.",
  },
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage students, teachers, institutes, and permissions from one platform.",
  },
  {
    icon: Cloud,
    title: "Cloud Platform",
    description:
      "Access exams securely from anywhere without managing local infrastructure.",
  },
];

export default function InstituteExperience() {
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
      {/* ================================================================
          PREMIUM DARK BACKGROUND
      ================================================================ */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-48
            top-1/4
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-brand-gold/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -right-48
            bottom-[-8rem]
            h-[36rem]
            w-[36rem]
            rounded-full
            bg-blue-500/10
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-brand-gold/25
            to-transparent
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
            via-white/10
            to-transparent
          "
        />
      </div>

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        {/* ================================================================
            LEFT — INSTITUTE CAPABILITIES
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="min-w-0"
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand-gold/30
              bg-brand-gold/5
              px-3.5
              py-1.5
              backdrop-blur-xl
            "
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-brand-gold">
              For Institutes
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-6
              max-w-xl
              text-4xl
              font-black
              leading-[1.06]
              tracking-[-0.045em]
              text-white
              md:text-5xl
              xl:text-[3.4rem]
            "
          >
            Everything an Institute
            <br />
            <span className="text-brand-gold">Needs</span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-lg
              text-base
              leading-7
              text-white/60
              md:text-[17px]
            "
          >
            A complete platform for schools and coaching institutes to create
            exams, monitor students, and analyze performance.
          </p>

          {/* Features */}

          <div className="mt-8 space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -2,
                    x: 2,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    px-4
                    py-3.5
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
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-brand-gold/25
                      bg-brand-gold/5
                      text-brand-gold
                      transition-all
                      duration-300
                      group-hover:border-brand-gold/45
                      group-hover:bg-brand-gold/10
                    "
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Text */}

                  <div className="min-w-0">
                    <h3 className="text-[13px] font-bold tracking-[-0.01em] text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-0.5 text-[10px] leading-5 text-white/45">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

       {/* ================================================================
    INSTITUTE CTA
================================================================ */}

<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.45,
    delay: 0.35,
  }}
  className="
    mt-9
    flex
    items-center
    justify-between
    gap-5
    border-t
    border-white/10
    pt-6
  "
>
  <div className="min-w-0">
    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
      Built for modern institutes
    </p>

    <p className="mt-1 text-xs leading-5 text-white/45">
      Explore the complete institute platform.
    </p>
  </div>

  <GradientButton
    href="/institutes"
    className="
      shrink-0
      whitespace-nowrap
      shadow-[0_12px_35px_rgba(0,0,0,0.25)]
    "
  >
    Explore Platform
    <ArrowRight className="ml-2 h-4 w-4" />
  </GradientButton>
</motion.div>
        </motion.div>

        {/* ================================================================
            RIGHT — PERFORMANCE ANALYTICS SHOWCASE
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="relative min-w-0"
        >
          {/* Dark-section glow behind browser */}

          <div
            className="
              pointer-events-none
              absolute
              -inset-10
              rounded-[4rem]
              bg-brand-gold/5
              blur-[100px]
            "
          />

          <div className="relative">
            <ProductShowcase mode="analytics" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}