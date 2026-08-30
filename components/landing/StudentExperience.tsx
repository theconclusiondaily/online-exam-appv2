"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const features = [
  "Unlimited Practice Tests",
  "National Leaderboards",
  "Instant Performance Analysis",
  "Track XP & Achievements",
];

export default function StudentExperience() {
  return (
    <Section className="relative overflow-hidden bg-[#050B1A]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-40
            top-1/4
            h-96
            w-96
            rounded-full
            bg-brand-gold/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-0
            top-1/2
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/5
            blur-3xl
          "
        />

      </div>

      {/* Main Content */}
      <div
        className="
          relative
          z-10
          grid
          items-center
          gap-12
          lg:grid-cols-[1fr_0.9fr]
          lg:gap-20
        "
      >

        {/* LEFT — Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

        <SectionHeading
  badge="THE PRACTICE EXPERIENCE"
  title="Practice With Purpose. Improve With Every Attempt."
  subtitle="Build confidence through realistic tests, detailed performance insights, and a learning system designed around measurable improvement."
  dark
/>

          {/* Feature List */}
          <div className="mt-8 space-y-3">

            {features.map((feature) => (

              <motion.div
                key={feature}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:border-brand-gold/20
                  hover:bg-white/[0.05]
                "
              >

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
                    border-brand-gold/20
                    bg-brand-gold/10
                    text-brand-gold
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <span className="text-sm font-semibold text-white/80">
                  {feature}
                </span>

              </motion.div>

            ))}

          </div>

        </motion.div>

        {/* RIGHT — Premium Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative flex min-h-[360px] items-center justify-center lg:min-h-[500px]"
        >

          {/* Outer Glow */}
          <div
            className="
              pointer-events-none
              absolute
              h-[280px]
              w-[280px]
              rounded-full
              bg-brand-gold/10
              blur-[90px]
              sm:h-[360px]
              sm:w-[360px]
            "
          />

          {/* Decorative Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              h-[280px]
              w-[280px]
              rounded-full
              border
              border-brand-gold/10
              sm:h-[380px]
              sm:w-[380px]
              lg:h-[440px]
              lg:w-[440px]
            "
          />

          {/* Secondary Ring */}
          <div
            className="
              absolute
              h-[220px]
              w-[220px]
              rounded-full
              border
              border-white/5
              sm:h-[300px]
              sm:w-[300px]
              lg:h-[360px]
              lg:w-[360px]
            "
          />

          {/* Logo Container */}
          <motion.div
            whileHover={{
              scale: 1.04,
              y: -5,
            }}
            transition={{ duration: 0.3 }}
            className="
              relative
              flex
              h-[220px]
              w-[220px]
              items-center
              justify-center
              rounded-[3rem]
              border
              border-white/10
              bg-white/[0.04]
              shadow-2xl
              shadow-black/30
              backdrop-blur-xl
              sm:h-[290px]
              sm:w-[290px]
              lg:h-[350px]
              lg:w-[350px]
            "
          >

            <div
              className="
                absolute
                inset-4
                rounded-[2.5rem]
                border
                border-brand-gold/10
              "
            />

            <Image
              src="/logo.png"
              alt="The Conclusion Daily"
              width={350}
              height={350}
              priority
              className="
                relative
                z-10
                h-[150px]
                w-[150px]
                object-contain
                drop-shadow-[0_0_35px_rgba(234,179,8,0.18)]
                sm:h-[200px]
                sm:w-[200px]
                lg:h-[240px]
                lg:w-[240px]
              "
            />

          </motion.div>

        </motion.div>

      </div>

    </Section>
  );
}