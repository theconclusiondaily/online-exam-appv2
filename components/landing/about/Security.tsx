import {
  ShieldCheck,
  Lock,
  Camera,
  UserCheck,
  Cloud,
  BadgeCheck,
} from "lucide-react";

const securityFeatures = [
  {
    title: "Secure Authentication",
    description:
      "Protected user authentication helps ensure that only authorized users can access examinations and platform resources.",
    icon: UserCheck,
  },
  {
    title: "AI-Assisted Proctoring",
    description:
      "Intelligent monitoring tools help maintain examination integrity by detecting suspicious activities during online exams.",
    icon: Camera,
  },
  {
    title: "Protected User Data",
    description:
      "User information is handled using modern security practices designed to protect privacy and maintain confidentiality.",
    icon: Lock,
  },
  {
    title: "Role-Based Access",
    description:
      "Students, teachers, institute administrators, and platform administrators each receive appropriate access permissions.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable Cloud Infrastructure",
    description:
      "Cloud-hosted infrastructure provides dependable availability, performance, and scalability for online examinations.",
    icon: Cloud,
  },
  {
    title: "Commitment to Trust",
    description:
      "Security, transparency, and fairness are central to every examination conducted on The Conclusion Daily.",
    icon: BadgeCheck,
  },
];

export default function Security() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Security & Trust
          </span>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Built with Security at Every Layer
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Educational institutions trust examination platforms to protect
            their assessments, students, and academic integrity. Security is a
            fundamental part of how The Conclusion Daily is designed.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {securityFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-brand-gold hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/20">
                  <Icon className="h-8 w-8 text-brand-gold" />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-20 rounded-3xl border border-brand-gold/20 bg-brand-gold/10 p-10 text-center">
          <h3 className="text-3xl font-bold text-brand-gold">
            Your Trust is Our Responsibility
          </h3>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Every examination conducted through The Conclusion Daily is backed
            by our commitment to security, transparency, reliability, and a
            fair assessment experience for every learner.
          </p>
        </div>
      </div>
    </section>
  );
}