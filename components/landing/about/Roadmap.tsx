import {
  CheckCircle2,
  Circle,
  Rocket,
  Globe,
  Brain,
  Smartphone,
  GraduationCap,
  Trophy,
} from "lucide-react";

const roadmap = [
  {
    title: "AI-Powered Examination Platform",
    description:
      "Secure online examinations with modern assessment tools.",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    title: "Institute Management System",
    description:
      "Complete examination management for educational institutions.",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    title: "AI Proctoring",
    description:
      "Smart monitoring to help maintain examination integrity.",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    title: "Advanced Analytics",
    description:
      "Comprehensive insights for students and educators.",
    status: "completed",
    icon: CheckCircle2,
  },
  {
    title: "Mobile Experience",
    description:
      "Enhanced mobile-first experience for students and teachers.",
    status: "upcoming",
    icon: Smartphone,
  },
  {
    title: "AI Learning Assistant",
    description:
      "Personalized learning support powered by artificial intelligence.",
    status: "upcoming",
    icon: Brain,
  },
  {
    title: "National Expansion",
    description:
      "Connecting institutions and learners across India.",
    status: "future",
    icon: GraduationCap,
  },
  {
    title: "Global Education Ecosystem",
    description:
      "Building a trusted examination platform for learners worldwide.",
    status: "future",
    icon: Globe,
  },
];

export default function Roadmap() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Our Roadmap
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Building the Future of Digital Assessments
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every milestone represents our commitment to creating one of the
            most trusted online examination ecosystems for students,
            educators, and institutions.
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="relative border-l-2 border-brand-gold/30 pl-10">
            {roadmap.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative mb-16">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[53px] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-brand-gold/20">
                    <Icon
                      className={`h-6 w-6 ${
                        item.status === "completed"
                          ? "text-green-600"
                          : item.status === "upcoming"
                          ? "text-brand-gold"
                          : "text-slate-400"
                      }`}
                    />
                  </div>

                  {/* Card */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <span
                        className={`rounded-full px-4 py-1 text-sm font-semibold ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "upcoming"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status === "completed"
                          ? "Completed"
                          : item.status === "upcoming"
                          ? "In Progress"
                          : "Future"}
                      </span>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision Card */}
        <div className="mt-24 rounded-3xl bg-slate-950 p-12 text-center text-white">
          <Rocket className="mx-auto h-16 w-16 text-brand-gold" />

          <h3 className="mt-8 text-4xl font-black">
            The Journey Has Just Begun
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            We are committed to continuously innovating and building
            technologies that make learning, assessments, and educational
            management smarter, more secure, and more accessible for everyone.
          </p>
        </div>
      </div>
    </section>
  );
}