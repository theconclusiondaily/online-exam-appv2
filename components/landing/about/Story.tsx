import { COMPANY } from "@/lib/company";

export default function Story() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
              Our Story
            </span>

            <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
              Why {COMPANY.shortName} Was Created
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              The Conclusion Daily was founded with a simple but ambitious
              vision—to transform the way examinations are conducted in the
              digital era.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Traditional examination systems often struggle with scalability,
              transparency, security, and meaningful performance insights.
              Students deserve better learning experiences, educators deserve
              better tools, and institutions deserve a reliable platform they
              can trust.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We built The Conclusion Daily to bring all these needs together
              into one intelligent ecosystem powered by modern technology,
              enabling secure online examinations, AI-assisted monitoring,
              real-time analytics, and seamless institute management.
            </p>
          </div>

          {/* Right Side */}
          <div className="rounded-3xl bg-slate-950 p-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold text-brand-gold">
              Our Purpose
            </h3>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              We believe technology should make assessments fair, transparent,
              accessible, and intelligent.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Every feature inside TCD is designed with one objective:
              empowering students, teachers, and institutions to achieve better
              educational outcomes through modern digital assessment.
            </p>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xl font-semibold text-brand-gold">
                "{COMPANY.tagline}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}