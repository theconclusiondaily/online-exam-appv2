"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Trophy,
  Shield,
  Wallet,
  BarChart3,
  Building2,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  { icon: GraduationCap, number: "01", title: "Smart Learning", description: "Unlimited practice exams and mock tests." },
  { icon: Trophy, number: "02", title: "Live Competitions", description: "Compete with students across India." },
  { icon: BarChart3, number: "03", title: "Detailed Analytics", description: "Track performance with insightful reports." },
  { icon: Shield, number: "04", title: "AI Security", description: "Advanced proctoring and anti-cheating." },
  { icon: Wallet, number: "05", title: "TCD Wallet", description: "Rewards, prizes and bonus credits." },
  { icon: Brain, number: "06", title: "Achievements", description: "Unlock badges and learning milestones." },
  { icon: Building2, number: "07", title: "Institute Platform", description: "Complete solution for schools & coaching." },
  { icon: Trophy, number: "08", title: "Leaderboards", description: "Real-time rankings after every exam." },
];

export default function FeaturesPreview() {
  return (
    <section className="relative overflow-hidden bg-[#050B1A] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-48 h-[36rem] w-[36rem] rounded-full bg-brand-gold/10 blur-[120px]" />
        <div className="absolute -right-48 -bottom-48 h-[40rem] w-[40rem] rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/35 to-transparent" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold backdrop-blur-xl">
            Platform Features
          </span>

          <h2 className="mt-7 text-4xl font-black leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.6rem]">
            Everything You Need To Learn,
            <span className="block text-brand-gold">Compete & Grow</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 md:text-lg md:leading-8">
            Built for students, teachers and institutes with secure online exams,
            intelligent analytics and rewarding learning experiences.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.055 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/[0.065] hover:shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
              >
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-gold to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand-gold/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold transition-all duration-300 group-hover:border-brand-gold/40 group-hover:bg-brand-gold/15">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.18em] text-white/20 transition-colors group-hover:text-brand-gold/60">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold tracking-tight text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-white/45">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-gold/80" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
                      Included in TCD
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-12 flex justify-center lg:mt-14"
        >
          <Link
            href="/features"
            className="group inline-flex items-center gap-3 rounded-xl border border-brand-gold/40 bg-brand-gold px-7 py-3.5 text-sm font-bold text-brand shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-brand-gold/90"
          >
            Explore All Features
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
