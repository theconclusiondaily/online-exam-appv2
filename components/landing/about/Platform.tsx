import {
  Brain,
  ShieldCheck,
  BarChart3,
  Building2,
  Trophy,
  FileText,
  Camera,
  Award,
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Online Examinations",
    description:
      "Conduct secure online examinations with a modern, scalable and intelligent assessment platform.",
    icon: Brain,
  },
  {
    title: "AI Proctoring",
    description:
      "Monitor examinations with intelligent anti-cheating features, webcam monitoring and violation detection.",
    icon: Camera,
  },
  {
    title: "Institute Management",
    description:
      "Manage students, teachers, batches, examinations and reports from a centralized dashboard.",
    icon: Building2,
  },
  {
    title: "Real-Time Analytics",
    description:
      "Track student performance using detailed reports, insights and progress analytics.",
    icon: BarChart3,
  },
  {
    title: "Live Leaderboards",
    description:
      "Display rankings instantly to motivate learners through healthy competition.",
    icon: Trophy,
  },
  {
    title: "Question Bank",
    description:
      "Create, organize and reuse thousands of questions with powerful management tools.",
    icon: FileText,
  },
  {
    title: "Enterprise Security",
    description:
      "Role-based authentication, secure infrastructure and modern security practices protect every assessment.",
    icon: ShieldCheck,
  },
  {
    title: "Digital Certificates",
    description:
      "Generate professional certificates and recognize achievements after successful examinations.",
    icon: Award,
  },
];

export default function Platform() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Platform Features
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Everything You Need in One Platform
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The Conclusion Daily combines modern technology, intelligent
            assessment tools and enterprise-grade security into one unified
            examination ecosystem.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10 transition group-hover:bg-brand-gold">
                  <Icon className="h-8 w-8 text-brand-gold group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}