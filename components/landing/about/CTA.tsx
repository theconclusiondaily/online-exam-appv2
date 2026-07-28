import Link from "next/link";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950" />

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 text-center text-white">
        <span className="rounded-full border border-brand-gold/30 bg-white/10 px-5 py-2 text-sm font-semibold text-brand-gold backdrop-blur">
          Join The Future of Digital Assessments
        </span>

        <h2 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
          Ready to Transform
          <br />
          Your Examination Experience?
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-300">
          Whether you're a student preparing for competitive exams,
          a teacher creating assessments, or an institution managing
          thousands of learners, The Conclusion Daily is built for you.
        </p>

        {/* Buttons */}
        <div className="mt-14 flex flex-col items-center justify-center gap-6 md:flex-row">

          <Link
            href="/signup"
            className="inline-flex items-center gap-3 rounded-2xl bg-brand-gold px-8 py-5 text-lg font-bold text-slate-900 transition-all duration-300 hover:scale-105"
          >
            <GraduationCap className="h-6 w-6" />
            Start as Student
          </Link>

          <Link
            href="/institutes"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-8 py-5 text-lg font-bold backdrop-blur transition-all duration-300 hover:bg-white/20"
          >
            <Building2 className="h-6 w-6" />
            For Institutes
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-2xl border border-brand-gold/40 px-8 py-5 text-lg font-bold text-brand-gold transition-all duration-300 hover:bg-brand-gold hover:text-slate-900"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-10 md:grid-cols-3">

          <div>
            <h3 className="text-5xl font-black text-brand-gold">
              AI
            </h3>

            <p className="mt-2 text-slate-300">
              Powered Examination Platform
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-brand-gold">
              24×7
            </h3>

            <p className="mt-2 text-slate-300">
              Cloud Availability
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-black text-brand-gold">
              Secure
            </h3>

            <p className="mt-2 text-slate-300">
              Built with Modern Security
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}