"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  ShieldCheck,
} from "lucide-react";

import Section from "./ui/Section";

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
    <Section
      className="
        relative
        overflow-hidden
        bg-[#050B1A]
        py-20
        lg:py-28
      "
    >
      {/* Background atmosphere */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-40
            top-[-10rem]
            h-[30rem]
            w-[30rem]
            rounded-full
            bg-brand/5
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-[-12rem]
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand-gold/10
            blur-[120px]
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
            via-brand/15
            to-transparent
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-brand/15
              bg-white/80
              px-4
              py-2
              shadow-sm
              backdrop-blur-xl
            "
          >
            <HelpCircle className="h-4 w-4 text-brand-gold" />

            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-brand
              "
            >
              FAQ
            </span>
          </div>

          <h2
            className="
              mt-7
              text-4xl
              font-black
              leading-[1.06]
              tracking-tight
              text-brand
              md:text-5xl
              lg:text-[3.5rem]
            "
          >
            Frequently Asked{" "}
            <span className="text-brand-gold">
              Questions
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-brand-muted
              md:text-lg
              md:leading-8
            "
          >
            Everything you need to know before getting started.
          </p>
        </motion.div>

        {/* FAQ list */}

        <div className="mt-12 space-y-4 lg:mt-14">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
                className={`
                  group
                  overflow-hidden
                  rounded-[1.4rem]
                  border
                  bg-white
                  shadow-[0_8px_30px_rgba(20,45,90,0.05)]
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-brand-gold/30 shadow-[0_16px_45px_rgba(20,45,90,0.09)]"
                      : "border-brand/10 hover:border-brand/20"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    gap-5
                    px-6
                    py-5
                    text-left
                    sm:px-7
                    sm:py-6
                  "
                >
                  {/* Number */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      text-xs
                      font-bold
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "bg-brand-gold text-brand"
                          : "bg-brand/[0.06] text-brand/40 group-hover:bg-brand-gold/10 group-hover:text-brand-gold"
                      }
                    `}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Question */}

                  <span
                    className={`
                      flex-1
                      text-sm
                      font-bold
                      leading-6
                      transition-colors
                      duration-300
                      sm:text-base
                      ${
                        isOpen
                          ? "text-brand"
                          : "text-brand/85 group-hover:text-brand"
                      }
                    `}
                  >
                    {faq.q}
                  </span>

                  {/* Chevron */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      transition-all
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180 border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
                          : "border-brand/10 bg-brand/[0.03] text-brand/45 group-hover:border-brand/20"
                      }
                    `}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {/* Answer */}

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                        <div className="ml-14 border-l-2 border-brand-gold/30 pl-5">
                          <p
                            className="
                              max-w-3xl
                              text-sm
                              leading-7
                              text-brand-muted
                            "
                          >
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom help card */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="
            mt-8
            overflow-hidden
            rounded-[1.5rem]
            border
            border-brand/10
            bg-brand
            p-6
            shadow-[0_18px_50px_rgba(20,45,90,0.13)]
            sm:p-7
          "
        >
          <div className="flex items-center gap-5">
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
              "
            >
              <MessageCircleQuestion className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-bold text-white">
                Still have questions?
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50 sm:text-sm">
  Contact us at{" "}
  <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=support@theconclusiondaily.com"
  target="_blank"
  rel="noopener noreferrer"
  className="
    font-semibold
    text-brand-gold
    underline-offset-4
    transition-colors
    hover:text-white
    hover:underline
  "
>
  support@theconclusiondaily.com
</a>
</p>
            </div>

            <ShieldCheck
              className="
                ml-auto
                hidden
                h-6
                w-6
                shrink-0
                text-brand-gold/70
                sm:block
              "
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
