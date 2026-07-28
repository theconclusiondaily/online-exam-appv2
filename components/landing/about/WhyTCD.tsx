import {
  Brain,
  Shield,
  Zap,
  Trophy,
  LineChart,
  Globe,
  Smartphone,
  Sparkles,
} from "lucide-react";

const advantages = [
  {
    title: "AI-Powered Platform",
    description:
      "Leverage intelligent technologies to create smarter, faster, and more reliable online examinations.",
    icon: Brain,
  },
  {
    title: "Secure Assessments",
    description:
      "Advanced authentication, AI-assisted proctoring, and secure exam environments help maintain exam integrity.",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description:
      "Optimized performance ensures smooth examinations even for large numbers of concurrent users.",
    icon: Zap,
  },
  {
    title: "Competitive Learning",
    description:
      "Leaderboards, rankings, achievements, and rewards motivate learners to continuously improve.",
    icon: Trophy,
  },
  {
    title: "Actionable Analytics",
    description:
      "Detailed reports and performance insights help educators make informed academic decisions.",
    icon: LineChart,
  },
  {
    title: "Cloud-Based",
    description:
      "Access examinations securely from anywhere without complex infrastructure.",
    icon: Globe,
  },
  {
    title: "Responsive Experience",
    description:
      "Designed to work seamlessly across desktops, tablets, and mobile devices.",
    icon: Smartphone,
  },
  {
    title: "Continuous Innovation",
    description:
      "We continuously improve our platform with new technologies and user-focused enhancements.",
    icon: Sparkles,
  },
];

export default function WhyTCD() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Why Choose The Conclusion Daily?
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            We combine modern technology, secure infrastructure, and intelligent
            assessment tools to create a premium examination experience for
            students, educators, and institutions.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/20">
                  <Icon className="h-8 w-8 text-brand-gold" />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
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