import {
  Cpu,
  Database,
  Cloud,
  ShieldCheck,
  Gauge,
  BrainCircuit,
} from "lucide-react";

const technologies = [
  {
    title: "Modern Web Platform",
    description:
      "Built using modern web technologies to deliver a fast, responsive, and seamless user experience across all devices.",
    icon: Cpu,
  },
  {
    title: "Reliable Data Management",
    description:
      "Designed with a secure and scalable database architecture to ensure data consistency and reliability.",
    icon: Database,
  },
  {
    title: "Cloud Infrastructure",
    description:
      "Hosted on cloud infrastructure that provides high availability, scalability, and dependable performance.",
    icon: Cloud,
  },
  {
    title: "Enterprise Security",
    description:
      "Role-based access, secure authentication, encrypted communication, and multiple security layers protect users and examinations.",
    icon: ShieldCheck,
  },
  {
    title: "High Performance",
    description:
      "Optimized architecture enables smooth performance even during large-scale online examinations.",
    icon: Gauge,
  },
  {
    title: "AI & Automation",
    description:
      "Artificial Intelligence enhances examination monitoring, analytics, and platform automation to improve efficiency.",
    icon: BrainCircuit,
  },
];

export default function Technology() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Technology
          </span>

          <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl">
            Built on Modern Technology
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The Conclusion Daily combines modern engineering, cloud
            infrastructure, intelligent automation, and enterprise-grade
            security to deliver a reliable digital examination platform.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10 transition group-hover:bg-brand-gold">
                  <Icon className="h-8 w-8 text-brand-gold group-hover:text-white" />
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