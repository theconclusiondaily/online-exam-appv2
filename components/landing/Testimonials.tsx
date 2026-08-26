"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const testimonials = [
  {
    name: "Student",
    role: "Early Access User",
    quote:
      "The interface is clean, fast, and makes practice tests feel like real computer-based exams.",
  },
  {
    name: "Teacher",
    role: "Educator",
    quote:
      "Creating exams and reviewing performance is simple and intuitive. It saves a lot of time.",
  },
  {
    name: "Institute",
    role: "Coaching Center",
    quote:
      "The platform has the features we expect from a modern online examination system.",
  },
];

export default function Testimonials() {
  return (
    <Section>
      <SectionHeading
        badge="Testimonials"
        title="Built for Students, Teachers & Institutes"
        subtitle="Early feedback from users exploring THE CONCLUSION DAILY platform."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6 }}
            className="
  rounded-2xl
  border
  border-gray-200/80
  bg-white
  p-5
  shadow-sm
  transition-all
  duration-300
  hover:-translate-y-0.5
  hover:shadow-md
"
          >
            <Quote className="mb-4 h-6 w-6 text-brand" />

            <p className="text-sm leading-6 text-brand-muted">
              "{item.quote}"
            </p>

            <div className="mt-6">
              <h3 className="font-bold text-brand">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500">
                {item.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}