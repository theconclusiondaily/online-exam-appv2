import {
  ShieldCheck,
  Lightbulb,
  Users,
  Lock,
  TrendingUp,
  Award,
} from "lucide-react";

const values = [
  {
    title: "Integrity",
    icon: ShieldCheck,
    description:
      "We believe examinations should always be fair, transparent, and trustworthy.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We continuously build intelligent solutions that improve digital education.",
  },
  {
    title: "Student First",
    icon: Users,
    description:
      "Every feature is designed to improve the learning experience for students.",
  },
  {
    title: "Security",
    icon: Lock,
    description:
      "Protecting examinations and user data is at the core of everything we build.",
  },
  {
    title: "Growth",
    icon: TrendingUp,
    description:
      "Helping students, teachers, and institutions achieve measurable progress.",
  },
  {
    title: "Excellence",
    icon: Award,
    description:
      "We strive to deliver a premium experience through quality, reliability, and continuous improvement.",
  },
];

export default function Values() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Core Values
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            What We Believe
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            These principles guide every product, feature, and decision we make
            at The Conclusion Daily.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10">
                  <Icon className="h-8 w-8 text-brand-gold" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}