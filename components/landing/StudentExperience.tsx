"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";
import GradientButton from "./ui/GradientButton";
import ProductShowcase from "./showcase/ProductShowcase";

const features = [
  "Unlimited Practice Tests",
  "National Leaderboards",
  "Instant Performance Analysis",
  "Track XP & Achievements",
];

export default function StudentExperience() {
  return (
    <Section>

      <div className="grid items-center gap-16 lg:grid-cols-2">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            badge="For Students"
            title="Every Great Achievement Begins With Practice"
            subtitle="Prepare with realistic computer-based tests, compete with students across India, and measure your growth with detailed analytics."
          />

          <div className="mt-10 space-y-5">

            {features.map((feature) => (

              <div
                key={feature}
                className="flex items-center gap-4"
              >
                <div className="rounded-full bg-brand/10 p-2 text-brand">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <span className="font-medium text-brand">
                  {feature}
                </span>

              </div>

            ))}

          </div>

          <div className="mt-10">

            <GradientButton href="/signup">

              Start Learning

              <ArrowRight className="ml-2 h-5 w-5" />

            </GradientButton>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <ProductShowcase mode="dashboard" />

        </motion.div>

      </div>

    </Section>
  );
}