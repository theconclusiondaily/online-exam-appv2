"use client";

import { motion } from "framer-motion";
import {
  Quote,
  GraduationCap,
  UserRound,
  Building2,
  Star,
} from "lucide-react";

import Section from "./ui/Section";

const testimonials = [
  {
    icon: GraduationCap,
    type: "STUDENT",
    name: "Student",
    role: "Early Access User",
    quote:
      "The interface is clean, fast, and makes practice tests feel like real computer-based exams.",
  },
  {
    icon: UserRound,
    type: "EDUCATOR",
    name: "Teacher",
    role: "Educator",
    quote:
      "Creating exams and reviewing performance is simple and intuitive. It saves a lot of time.",
  },
  {
    icon: Building2,
    type: "INSTITUTE",
    name: "Institute",
    role: "Coaching Center",
    quote:
      "The platform has the features we expect from a modern online examination system.",
  },
];

export default function Testimonials() {
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
        <div
          className="
            absolute
            -left-40
            top-[-12rem]
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-brand/5
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-40
            bottom-[-14rem]
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

      <div className="relative z-10">
        {/* ================================================================
            HEADER
        ================================================================ */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-brand/20
              bg-white/80
              px-4
              py-2
              shadow-sm
              backdrop-blur-xl
            "
          >
            <span
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-brand
              "
            >
              Testimonials
            </span>
          </div>

          {/* Heading */}

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
            Built for{" "}
            <span className="text-brand-gold">
              Students, Teachers
            </span>{" "}
            & Institutes
          </h2>

          {/* Subtitle */}

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
            Early feedback from users exploring THE CONCLUSION DAILY
            platform.
          </p>
        </motion.div>

        {/* ================================================================
            TESTIMONIAL CARDS
        ================================================================ */}

        <div
          className="
            mt-14
            grid
            gap-5
            md:grid-cols-3
            lg:mt-16
            lg:gap-6
          "
        >
          {testimonials.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-brand/10
                  bg-white
                  p-7
                  shadow-[0_12px_40px_rgba(20,45,90,0.06)]
                  transition-all
                  duration-300
                  hover:border-brand-gold/30
                  hover:shadow-[0_22px_55px_rgba(20,45,90,0.12)]
                  lg:p-8
                "
              >
                {/* Top gold line */}

                <div
                  className="
                    absolute
                    inset-x-0
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-brand-gold
                    via-brand-gold/50
                    to-transparent
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                {/* Soft glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-brand-gold/5
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:bg-brand-gold/10
                  "
                />

                <div className="relative">
                  {/* Top identity row */}

                  <div className="flex items-center justify-between">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-brand/15
                        bg-brand/[0.06]
                        text-brand
                        transition-all
                        duration-300
                        group-hover:border-brand-gold/30
                        group-hover:bg-brand-gold/10
                        group-hover:text-brand-gold
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className="
                        text-[10px]
                        font-bold
                        tracking-[0.18em]
                        text-brand/25
                        transition-colors
                        duration-300
                        group-hover:text-brand-gold/60
                      "
                    >
                      {item.type}
                    </span>
                  </div>

                  {/* Quote */}

                  <div className="mt-8">
                    <Quote
                      className="
                        h-8
                        w-8
                        text-brand-gold
                        opacity-70
                      "
                      strokeWidth={2.2}
                    />

                    <p
                      className="
                        mt-4
                        text-[15px]
                        leading-7
                        text-brand-muted
                      "
                    >
                      “{item.quote}”
                    </p>
                  </div>

                  {/* Rating */}

                  <div className="mt-7 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="
                          h-3.5
                          w-3.5
                          fill-brand-gold
                          text-brand-gold
                        "
                      />
                    ))}
                  </div>

                  {/* Author */}

                  <div
                    className="
                      mt-7
                      border-t
                      border-brand/[0.08]
                      pt-5
                    "
                  >
                    <h3
                      className="
                        text-sm
                        font-bold
                        text-brand
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        font-medium
                        text-brand-muted
                      "
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================================================================
            BOTTOM TRUST STRIP
        ================================================================ */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
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
            duration: 0.55,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-8
            flex
            max-w-4xl
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-brand/10
            bg-white/70
            px-6
            py-4
            text-center
            shadow-sm
            backdrop-blur-xl
          "
        >
          <ShieldCheckIcon />

          <p
            className="
              text-xs
              font-medium
              text-brand-muted
              sm:text-sm
            "
          >
            Early access feedback as TCD continues to evolve.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

function ShieldCheckIcon() {
  return (
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-lg
        bg-brand-gold/10
        text-brand-gold
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6l7-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
  );
}