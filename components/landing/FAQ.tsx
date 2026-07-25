"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "./ui/Section";
import SectionHeading from "./ui/SectionHeading";

const faqs = [
  {
    q: "What is THE CONCLUSION DAILY?",
    a: "THE CONCLUSION DAILY is an online examination platform designed for students, teachers, and educational institutes.",
  },
  {
    q: "Can institutes conduct their own exams?",
    a: "Yes. Institutes can create, schedule, monitor, and analyze their own examinations.",
  },
  {
    q: "Does the platform support computer-based tests?",
    a: "Yes. The platform is designed for secure computer-based examinations.",
  },
  {
    q: "Can students view rankings?",
    a: "Yes. Students can participate in leaderboards and track their performance over time.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeading
        badge="FAQ"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before getting started."
      />

      <div className="mx-auto mt-14 max-w-4xl space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white"
          >
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="font-semibold text-brand">
                {faq.q}
              </span>

              <ChevronDown
                className={`transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="px-6 pb-6 text-brand-muted">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}