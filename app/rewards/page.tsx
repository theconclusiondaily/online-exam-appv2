import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Trophy,
  Wallet,
  Target,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";


export const metadata: Metadata = {
  title: "Cash Rewards for Online Exams | The Conclusion Daily",
  description:
    "Compete in eligible online exams, climb the leaderboard, and earn cash rewards based on your performance with The Conclusion Daily.",
  keywords: [
    "cash rewards for students",
    "online exam cash rewards",
    "exam competitions",
    "student competitions",
    "online competitive exams",
    "exam rewards",
    "student rewards",
    "online exam platform",
    "The Conclusion Daily",
  ],
  alternates: {
    canonical: "https://www.theconclusiondaily.com/rewards",
  },
  openGraph: {
    title: "Cash Rewards for Online Exams | The Conclusion Daily",
    description:
      "Take competitive online exams, climb leaderboards, and earn cash rewards through eligible competitions.",
    url: "https://www.theconclusiondaily.com/rewards",
    siteName: "The Conclusion Daily",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Choose an Eligible Competition",
    description:
      "Explore available exams and competitions and choose an eligible opportunity that matches your preparation and goals.",
  },
  {
    number: "02",
    icon: Trophy,
    title: "Take the Exam",
    description:
      "Attempt the competition under its applicable rules and put your knowledge, speed, and accuracy to the test.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Get Ranked",
    description:
      "Your performance is evaluated according to the applicable competition rules and reflected in the leaderboard.",
  },
  {
    number: "04",
    icon: Banknote,
    title: "Earn Eligible Rewards",
    description:
      "Students who qualify for rewards according to the competition rules can receive the applicable cash reward.",
  },
];

const benefits = [
  {
    icon: Trophy,
    title: "Performance-Based",
    description:
      "Rewards are connected to performance and the ranking criteria of eligible competitions.",
  },
  {
    icon: BarChart3,
    title: "Competitive Rankings",
    description:
      "See how your performance compares with other participating students.",
  },
  {
    icon: Wallet,
    title: "Reward Tracking",
    description:
      "Keep track of eligible rewards and wallet activity through your account.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Rules",
    description:
      "Each eligible competition is governed by its own applicable reward and participation conditions.",
  },
];

const faqs = [
  {
    question: "Does every The Conclusion Daily exam offer cash rewards?",
    answer:
      "No. Cash rewards are available only for competitions or exams that are specifically designated as eligible for rewards. The applicable competition page and rules determine whether a particular exam carries a reward.",
  },
  {
    question: "How are cash rewards determined?",
    answer:
      "Rewards are determined according to the rules of the specific eligible competition. Ranking, eligibility criteria, and other applicable conditions may vary between competitions.",
  },
  {
    question: "Can I earn rewards simply by taking an exam?",
    answer:
      "Taking an exam by itself does not guarantee a cash reward. Rewards are associated with eligible competitions and are subject to their applicable rules and qualification criteria.",
  },
  {
    question: "Where can I see my rewards?",
    answer:
      "Eligible rewards and related wallet activity can be viewed through the reward and wallet features available in your The Conclusion Daily account.",
  },
  {
    question: "Are rewards guaranteed?",
    answer:
      "No. Cash rewards are not guaranteed for every participant. Eligibility depends on the rules and qualification criteria of the particular competition.",
  },
];

export default function RewardsPage() {
  return (
  <>
    <Navbar />

    <main className="min-h-screen bg-[#020817] text-white">
      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-14rem] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brand-gold/[0.10] blur-[120px]" />

          <div className="absolute -left-40 top-1/2 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.04] blur-[100px]" />

          <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-gold/[0.06] px-4 py-2">
              <Banknote className="h-4 w-4 text-brand-gold" />

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                Cash Rewards
              </span>
            </div>

            {/* Heading */}

            <h1 className="mt-7 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-7xl">
              Compete With Your Knowledge.
              <br />
              <span className="text-brand-gold">
                Earn Real Rewards.
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              The Conclusion Daily turns online exam preparation into a
              competitive experience. Take eligible competitions, perform at
              your best, climb the leaderboard, and earn cash rewards when you
              qualify.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-brand-gold/10 transition hover:-translate-y-0.5 hover:bg-brand-gold/90"
              >
                Start Competing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-bold text-white/80 transition hover:border-white/20 hover:bg-white/[0.06]"
              >
                Explore The Conclusion Daily
              </Link>
            </div>

            {/* Trust points */}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {[
                "Eligible competitions",
                "Performance-based rewards",
                "Leaderboard rankings",
                "Reward tracking",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs text-white/40 sm:text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS
      ================================================================ */}

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              From Exam Attempt
              <br className="hidden sm:block" />
              <span className="text-white/50"> to Eligible Reward</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-white/45">
              The reward journey is simple. Your result depends on the
              applicable competition rules and your performance.
            </p>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line */}

            <div className="pointer-events-none absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/25 to-brand-gold/0 lg:block" />

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-gold/20"
                >
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/[0.07] text-brand-gold">
                    <Icon className="h-5 w-5" />
                  </div>

                  <p className="mt-5 text-[11px] font-black tracking-[0.15em] text-brand-gold/60">
                    {step.number}
                  </p>

                  <h3 className="mt-2 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/45">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY REWARDS
      ================================================================ */}

      <section className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/[0.05] px-4 py-2">
                <Trophy className="h-3.5 w-3.5 text-brand-gold" />

                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                  More Than a Score
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Turn Competitive
                <br />
                Performance Into
                <br />
                <span className="text-brand-gold">Opportunity.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/50">
                Exams are about more than getting a number on a screen.
                Competition gives students a way to challenge themselves,
                measure their performance, and pursue meaningful rewards.
              </p>

              <div className="mt-7 flex items-start gap-3 rounded-xl border border-brand-gold/15 bg-brand-gold/[0.035] p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />

                <p className="text-sm leading-6 text-white/45">
                  Rewards are available only where explicitly offered and are
                  always subject to the applicable competition rules,
                  eligibility requirements, and qualification criteria.
                </p>
              </div>
            </div>

            {/* Right */}

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/[0.08] bg-[#071022] p-6 transition duration-300 hover:border-brand-gold/20"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-gold/20 bg-brand-gold/[0.06] text-brand-gold">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WALLET
      ================================================================ */}

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.06] text-brand-gold">
              <Wallet className="h-6 w-6" />
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Keep Your Rewards
              <span className="text-brand-gold"> Organized</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-white/45">
              Eligible rewards and wallet activity can be managed through your
              The Conclusion Daily account, giving you a clear view of your reward-related
              activity.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: Banknote,
                title: "Rewards",
                text: "View eligible rewards associated with your competitions.",
              },
              {
                icon: Wallet,
                title: "Wallet",
                text: "Keep your eligible reward activity organized in one place.",
              },
              {
                icon: ShieldCheck,
                title: "Secure",
                text: "Your account and transaction information are protected.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/[0.07] text-brand-gold">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-white/40">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          FAQ
      ================================================================ */}

      <section className="border-t border-white/[0.06] bg-white/[0.015] py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Cash Rewards Explained
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/45">
              Understand how eligible competitions, rankings, and rewards work
              before you participate.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/[0.08] bg-[#071022] px-5 py-4"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-white marker:hidden">
                  <span>{faq.question}</span>

                  <ChevronDown className="h-4 w-4 shrink-0 text-brand-gold transition-transform duration-300 group-open:rotate-180" />
                </summary>

                <p className="mt-4 max-w-3xl pr-8 text-sm leading-6 text-white/45">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================ */}

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/[0.07] blur-[110px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.06] text-brand-gold">
            <Trophy className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Put Your
            <br />
            <span className="text-brand-gold">Knowledge to the Test?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/45">
            Join The Conclusion Daily, explore eligible competitions, challenge yourself, and
            compete for rewards based on your performance.
          </p>

          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-brand-gold px-7 py-4 text-sm font-bold text-black shadow-xl shadow-brand-gold/10 transition hover:-translate-y-0.5 hover:bg-brand-gold/90"
            >
              Start Competing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <p className="mt-5 text-xs text-white/25">
            Rewards are subject to applicable competition rules and
            eligibility conditions.
          </p>
        </div>
      </section>
    </main>
        <Footer />
  </>
);
}