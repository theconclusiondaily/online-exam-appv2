import {
  GraduationCap,
  UserCheck,
  Building2,
  School,
  University,
  Globe,
} from "lucide-react";

const audience = [
  {
    title: "Students",
    description:
      "Practice, compete, and improve with secure online examinations, mock tests, and real-time performance analytics.",
    icon: GraduationCap,
  },
  {
    title: "Teachers",
    description:
      "Create exams, monitor student performance, analyze results, and manage assessments efficiently.",
    icon: UserCheck,
  },
  {
    title: "Coaching Institutes",
    description:
      "Conduct large-scale examinations with AI-powered monitoring, leaderboards, and detailed reports.",
    icon: Building2,
  },
  {
    title: "Schools",
    description:
      "Digitize classroom assessments with a secure and easy-to-use examination platform.",
    icon: School,
  },
  {
    title: "Colleges & Universities",
    description:
      "Manage internal assessments, entrance tests, and academic evaluations on a scalable platform.",
    icon: University,
  },
  {
    title: "Educational Organizations",
    description:
      "Run nationwide assessments, scholarship tests, recruitment exams, and certification programs.",
    icon: Globe,
  },
];

export default function Audience() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Who We Serve
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Built for the Entire Education Ecosystem
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The Conclusion Daily is designed to support learners,
            educators, and institutions through one intelligent
            examination platform.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10">
                  <Icon className="h-8 w-8 text-brand-gold" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}