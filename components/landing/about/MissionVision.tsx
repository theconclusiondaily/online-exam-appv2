import { Target, Eye } from "lucide-react";
import { COMPANY } from "@/lib/company";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Our Purpose
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Mission & Vision
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every decision we make is guided by a clear mission and a bold
            vision for the future of digital education.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10">
              <Target className="h-8 w-8 text-brand-gold" />
            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Our Mission
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {COMPANY.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
              <Eye className="h-8 w-8 text-blue-700" />
            </div>

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Our Vision
            </h3>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              {COMPANY.vision}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}