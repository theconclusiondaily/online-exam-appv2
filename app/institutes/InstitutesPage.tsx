"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  LayoutDashboard,
  MonitorCheck,
  ShieldCheck,
  Users,
  Trophy,
} from "lucide-react";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ProductShowcase from "@/components/landing/showcase/ProductShowcase";
import GradientButton from "@/components/landing/ui/GradientButton";
import Image from "next/image";
import OutlineButton from "@/components/landing/ui/OutlineButton";
import { useState } from "react";

const capabilities = [
  {
    icon: ClipboardCheck,
    title: "Create & Manage Exams",
    description:
      "Build examinations, schedule assessments, and manage the complete exam lifecycle from one place.",
  },
  {
    icon: Users,
    title: "Student & Batch Management",
    description:
      "Organize students and batches efficiently while keeping academic activity structured and accessible.",
  },
  {
    icon: BookOpen,
    title: "Question Bank",
    description:
      "Maintain a structured question bank and use it to create consistent, high-quality assessments.",
  },
  {
    icon: MonitorCheck,
    title: "Live Examination",
    description:
      "Deliver a focused computer-based examination experience with controlled and secure assessments.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Understand student and batch performance through detailed reports and meaningful insights.",
  },
  {
    icon: Trophy,
    title: "Rankings & Competition",
    description:
      "Give students visibility into their performance with rankings and competitive learning experiences.",
  },
];

const advantages = [
  "Centralized examination management",
  "Secure computer-based assessments",
  "Student and batch-level insights",
  "Scalable for growing institutes",
];

export default function InstitutesPage() {
    function FormField({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-white/60">
        {label}
        {required && (
          <span className="ml-1 text-brand-gold">*</span>
        )}
      </label>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/[0.035]
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition
          placeholder:text-white/20
          focus:border-brand-gold/40
          focus:bg-white/[0.05]
          focus:ring-1
          focus:ring-brand-gold/20
        "
      />
    </div>
  );
}

function FormSelect({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-white/60">
        {label}
        {required && (
          <span className="ml-1 text-brand-gold">*</span>
        )}
      </label>

      <select
        name={name}
        required={required}
        defaultValue=""
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-[#0b172d]
          px-4
          py-3
          text-sm
          text-white
          outline-none
          transition
          focus:border-brand-gold/40
          focus:ring-1
          focus:ring-brand-gold/20
        "
      >
        <option value="" disabled>
          Select an option
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <>
      {/* ================================================================
          GLOBAL NAVIGATION
      ================================================================ */}

      <Navbar />

      <main className="overflow-hidden bg-[#050B1A] text-white pt-20">
        {/* ================================================================
            HERO
        ================================================================ */}

        <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-48 -top-40 h-[38rem] w-[38rem] rounded-full bg-brand-gold/10 blur-[130px]" />

            <div className="absolute -right-48 bottom-[-18rem] h-[42rem] w-[42rem] rounded-full bg-blue-500/10 blur-[140px]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

            <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 backdrop-blur-xl">
                  <Building2 className="h-3.5 w-3.5 text-brand-gold" />

                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                    Institute Platform
                  </span>
                </div>

                <h1 className="mt-7 max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[4rem]">
                  A Smarter Examination Platform for{" "}
                  <span className="text-brand-gold">Institutes</span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
                  Create examinations, manage students, monitor assessments,
                  and understand performance — all through one modern platform.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
  type="button"
  onClick={() => setShowEnquiry(true)}
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-brand-gold
    px-6
    py-3.5
    text-sm
    font-bold
    text-[#17366F]
    shadow-[0_12px_35px_rgba(0,0,0,0.25)]
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-[#e3bd38]
    hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
  "
>
  Get Started
  <ArrowRight className="h-4 w-4" />
</button>

                  <OutlineButton href="/contact">
                    Talk to Us
                  </OutlineButton>
                </div>
                
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {advantages.slice(0, 3).map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-xs font-medium text-white/40"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="absolute -inset-8 rounded-[3rem] bg-brand-gold/5 blur-3xl" />

                <div className="relative">
                  <ProductShowcase mode="dashboard" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CAPABILITIES
        ================================================================ */}

        <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-[-14rem] h-[30rem] w-[30rem] rounded-full bg-brand/5 blur-[110px]" />

            <div className="absolute -right-40 bottom-[-14rem] h-[32rem] w-[32rem] rounded-full bg-brand-gold/8 blur-[120px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="inline-flex rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Everything in One Place
              </span>

              <h2 className="mt-7 text-4xl font-black leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.5rem]">
                Everything Your{" "}
                <span className="text-brand-gold">Institute Needs</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg md:leading-8">
                A connected platform designed to simplify examination
                operations and give educators better visibility into learning.
              </p>
            </motion.div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-7 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.055] hover:shadow-[0_20px_55px_rgba(0,0,0,0.2)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold transition-all duration-300 group-hover:bg-brand-gold/15">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-7 text-lg font-bold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-white/50">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            DASHBOARD / MANAGEMENT
        ================================================================ */}

        <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                  <LayoutDashboard className="h-5 w-5" />
                </div>

                <h2 className="mt-7 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                  Manage Your Academic Operations{" "}
                  <span className="text-brand-gold">Effortlessly</span>
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/50">
                  Keep examinations, students, batches, and performance
                  information connected so your team can spend less time
                  managing systems and more time supporting students.
                </p>

                <div className="mt-8 space-y-4">
                  {advantages.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      <span className="text-sm font-semibold text-white/70">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="absolute -inset-10 rounded-full bg-brand-gold/5 blur-[90px]" />

                <div className="relative">
                  <ProductShowcase mode="analytics" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECURITY
        ================================================================ */}

        <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-[-18rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brand-gold/8 blur-[130px]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h2 className="mt-7 text-4xl font-black leading-[1.06] tracking-tight text-white md:text-5xl">
                Secure Assessments.{" "}
                <span className="text-brand-gold">
                  Trusted Results.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg md:leading-8">
                Give your institute a controlled examination environment with
                security-focused assessment workflows and transparent results.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {[
                  "Secure Assessments",
                  "Controlled Exams",
                  "Transparent Results",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white/55"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            FINAL CTA
        ================================================================ */}

        <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-white/10
                bg-white/[0.035]
                px-7
                py-10
                shadow-[0_30px_100px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
                sm:px-10
                lg:px-14
                lg:py-14
              "
            >
              {/* Background glow */}

              <div className="pointer-events-none absolute inset-0">
                <div
                  className="
                    absolute
                    -right-32
                    -top-40
                    h-[28rem]
                    w-[28rem]
                    rounded-full
                    bg-brand-gold/10
                    blur-[120px]
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-40
                    -left-40
                    h-[24rem]
                    w-[24rem]
                    rounded-full
                    bg-blue-500/8
                    blur-[110px]
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    opacity-[0.025]
                    [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
                    [background-size:48px_48px]
                  "
                />
              </div>

              <div className="relative z-10">
                {/* Top label */}

                <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/5 px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                    For Institutes
                  </span>
                </div>

                {/* Main content */}

                <div className="mt-7 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
                  <div className="max-w-3xl">
                    <h2
                      className="
                        text-4xl
                        font-black
                        leading-[1.02]
                        tracking-[-0.045em]
                        text-white
                        sm:text-5xl
                        lg:text-[4rem]
                      "
                    >
                      Bring Your Institute
                      <br />
                      to{" "}
                      <span className="text-brand-gold">
                        The Conclusion Daily
                      </span>
                    </h2>

                    <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
                      Build a smarter examination experience for your students
                      and give your academic team the tools to manage
                      performance better.
                    </p>
                  </div>

                  {/* CTA */}

                <button
  type="button"
  onClick={() => setShowEnquiry(true)}
  className="
    group
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-brand-gold
    px-6
    py-3.5
    text-sm
    font-bold
    text-[#17366F]
    shadow-[0_12px_35px_rgba(0,0,0,0.25)]
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:bg-[#e3bd38]
    hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
  "
>
 <span>Get Started</span>
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</button>
                </div>

                {/* Product highlights */}

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Powerful exam builder
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live monitoring
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Performance analytics
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Student management
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
     {/* ================================================================
    INSTITUTE ENQUIRY MODAL
================================================================ */}

{showEnquiry && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-start
      justify-center
      overflow-y-auto
      bg-[#020617]/90
      p-3
      backdrop-blur-md
      sm:p-5
      lg:p-8
    "
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) {
        setShowEnquiry(false);
      }
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="
        relative
        my-3
        w-full
        max-w-3xl
        max-h-[calc(100vh-1.5rem)]
        overflow-y-auto
        overflow-x-hidden
        rounded-[1.75rem]
        border
        border-white/10
        bg-[#081225]
        shadow-[0_35px_100px_rgba(0,0,0,0.55)]
      "
    >
      {/* Background glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -right-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-brand-gold/10
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-80
            w-80
            rounded-full
            bg-blue-500/10
            blur-[100px]
          "
        />
      </div>

      {/* Close */}

      <button
        type="button"
        onClick={() => setShowEnquiry(false)}
        className="
          absolute
          right-5
          top-5
          z-20
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-white/[0.05]
          text-white/60
          transition
          hover:bg-white/10
          hover:text-white
        "
        aria-label="Close enquiry form"
      >
        ×
      </button>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        {/* TCD Logo */}

        <div className="mb-7 flex items-center border-b border-white/10 pb-5 pr-12">
          <Image
            src="/logo.png"
            alt="The Conclusion Daily"
            width={190}
            height={48}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </div>

        {/* Header */}

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/5 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />

            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-gold">
              Institute Enquiry
            </span>
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Let's build a better{" "}
            <span className="text-brand-gold">
              examination experience.
            </span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Tell us a little about your institute and what you're looking
            for. Our business team will get in touch with you.
          </p>
        </div>

        {/* Form */}

        <form
          className="mt-8 space-y-7"
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.currentTarget;

            const data = new FormData(form);

            const subject = encodeURIComponent(
              `Institute Enquiry — ${data.get("instituteName") || "New Enquiry"}`
            );

            const body = encodeURIComponent(`
Institute Enquiry

INSTITUTE DETAILS
Institute Name: ${data.get("instituteName")}
Institute Type: ${data.get("instituteType")}
City: ${data.get("city")}
State: ${data.get("state")}
Students: ${data.get("students")}
Faculty: ${data.get("faculty")}

CONTACT PERSON
Name: ${data.get("name")}
Designation: ${data.get("designation")}
Business Email: ${data.get("email")}
Phone: ${data.get("phone")}
WhatsApp: ${data.get("whatsapp")}

REQUIREMENT
Interested In: ${data.getAll("interest").join(", ")}
Exams / Month: ${data.get("exams")}
Current System: ${data.get("currentSystem")}

Additional Requirements:
${data.get("message")}

CONTACT PREFERENCE
Preferred Contact: ${data.get("contactPreference")}
Preferred Time: ${data.get("contactTime")}
            `);

            window.open(
              `https://mail.google.com/mail/?view=cm&fs=1&to=business@theconclusiondaily.com&su=${subject}&body=${body}`,
              "_blank"
            );
          }}
        >
          {/* Institute Details */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                01
              </span>

              <h3 className="text-sm font-bold text-white">
                Institute Details
              </h3>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Institute / Organization Name"
                name="instituteName"
                required
                placeholder="e.g. ABC Coaching Institute"
              />

              <FormSelect
                label="Institute Type"
                name="instituteType"
                required
                options={[
                  "School",
                  "Coaching Institute",
                  "College / University",
                  "EdTech / Training Organization",
                  "Other",
                ]}
              />

              <FormField
                label="City"
                name="city"
                required
                placeholder="e.g. Jaipur"
              />

              <FormField
                label="State"
                name="state"
                required
                placeholder="e.g. Rajasthan"
              />

              <FormField
                label="Approx. Number of Students"
                name="students"
                required
                type="number"
                placeholder="e.g. 2500"
              />

              <FormField
                label="Number of Teachers / Faculty"
                name="faculty"
                type="number"
                placeholder="e.g. 80"
              />
            </div>
          </div>

          {/* Contact */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                02
              </span>

              <h3 className="text-sm font-bold text-white">
                Contact Person
              </h3>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Full Name"
                name="name"
                required
                placeholder="Your full name"
              />

              <FormField
                label="Designation"
                name="designation"
                required
                placeholder="e.g. Director / Academic Head"
              />

              <FormField
                label="Business Email"
                name="email"
                required
                type="email"
                placeholder="you@institute.com"
              />

              <FormField
                label="Phone Number"
                name="phone"
                required
                type="tel"
                placeholder="+91 XXXXX XXXXX"
              />

              <FormField
                label="WhatsApp Number"
                name="whatsapp"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Requirements */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                03
              </span>

              <h3 className="text-sm font-bold text-white">
                Your Requirements
              </h3>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="mb-3 text-xs text-white/40">
              What are you interested in?
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {[
                "Online Examinations",
                "Exam Management",
                "Question Bank",
                "Live Monitoring",
                "Performance Analytics",
                "Student Management",
                "Complete Institute Platform",
              ].map((item) => (
                <label
                  key={item}
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-4
                    py-3
                    text-xs
                    text-white/60
                    transition
                    hover:border-brand-gold/25
                    hover:bg-brand-gold/5
                  "
                >
                  <input
                    type="checkbox"
                    name="interest"
                    value={item}
                    className="h-4 w-4 accent-[#DDB52F]"
                  />

                  {item}
                </label>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField
                label="Expected Exams / Month"
                name="exams"
                placeholder="e.g. 20"
              />

              <FormField
                label="Current Examination System"
                name="currentSystem"
                placeholder="e.g. Offline / Other Platform"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-xs font-semibold text-white/60">
                Additional Requirements / Message
              </label>

              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your requirements..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.035]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-brand-gold/40
                  focus:bg-white/[0.05]
                  focus:ring-1
                  focus:ring-brand-gold/20
                "
              />
            </div>
          </div>

          {/* Contact Preference */}

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-brand-gold">
                04
              </span>

              <h3 className="text-sm font-bold text-white">
                Preferred Contact
              </h3>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormSelect
                label="Preferred Contact Method"
                name="contactPreference"
                options={["Phone", "WhatsApp", "Email"]}
              />

              <FormSelect
                label="Preferred Time"
                name="contactTime"
                options={[
                  "Morning — 9 AM to 12 PM",
                  "Afternoon — 12 PM to 4 PM",
                  "Evening — 4 PM to 7 PM",
                ]}
              />
            </div>
          </div>

          {/* Submit */}

          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[11px] leading-5 text-white/35">
                By submitting this form, you agree to be contacted by
                The Conclusion Daily regarding your institute enquiry.
              </p>

              <button
                type="submit"
                className="
                  group
                  inline-flex
                  h-13
                  shrink-0
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-brand-gold/80
                  bg-brand-gold
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-[#17366F]
                  shadow-[0_14px_35px_rgba(0,0,0,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#e3bd38]
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.38)]
                "
              >
                Send Enquiry
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            <p className="mt-4 text-center text-[11px] text-white/25">
              Business enquiries:{" "}
              <span className="text-brand-gold/70">
                business@theconclusiondaily.com
              </span>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
)}
      </main>

      {/* ================================================================
          GLOBAL FOOTER
      ================================================================ */}

      <Footer />
    </>
  );
}