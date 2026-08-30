import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  GraduationCap,
  Mail,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";

import GlassCard from "@/components/landing/ui/GlassCard";
import Section from "@/components/landing/ui/Section";

export default function ContactContent() {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-[#050B1A]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-brand-gold/7 blur-[120px]" />
        <div className="absolute -right-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-blue-500/7 blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">

        <GlassCard className="!border-white/10 !bg-white/[0.045] !shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
          <h2 className="mb-6 text-2xl font-black tracking-tight text-white">
            Get in Touch
          </h2>

          <p className="mb-6 text-white/50">
            Whether you're a student, teacher, educational institution, or
            business partner, we'd love to hear from you. Our team is committed
            to providing timely assistance and ensuring the best possible
            experience with The Conclusion Daily.
          </p>

          <div className="space-y-6">

            <div>
              <h3 className="mb-2 font-bold text-white">
                General Support
              </h3>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@theconclusiondaily.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-gold transition-colors hover:text-white"
              >
                support@theconclusiondaily.com
              </a>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Business & Partnerships
              </h3>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=business@theconclusiondaily.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand-gold transition-colors hover:text-white"
              >
                business@theconclusiondaily.com
              </a>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Website
              </h3>

              <p className="text-white/50">
                https://www.theconclusiondaily.com
              </p>
            </div>

          </div>
        </GlassCard>

        <GlassCard className="!border-white/10 !bg-white/[0.045] !shadow-[0_20px_70px_rgba(0,0,0,0.2)]">
          <h2 className="mb-6 text-2xl font-black tracking-tight text-white">
            Office Information
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="mb-2 font-bold text-white">
                Company
              </h3>

              <p className="text-white/50">
                The Conclusion Daily (TCD)
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Headquarters
              </h3>

              <p className="text-white/50">
                India
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Support Hours
              </h3>

              <p className="text-white/50">
                Monday – Saturday
              </p>

              <p className="text-white/50">
                9:00 AM – 6:00 PM (IST)
              </p>
            </div>

          </div>
        </GlassCard>

      </div>

      <div className="relative mx-auto mt-6 max-w-6xl">
        <GlassCard className="!border-white/10 !bg-white/[0.045] !shadow-[0_20px_70px_rgba(0,0,0,0.2)]">

          <h2 className="mb-6 text-2xl font-black tracking-tight text-white">
            How Can We Help?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <h3 className="mb-2 font-bold text-white">
                Students
              </h3>

              <p className="text-white/50">
                Get help with account registration, examinations, rankings,
                wallet, competitions, certificates, and technical issues.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Teachers
              </h3>

              <p className="text-white/50">
                Assistance with creating examinations, managing students,
                analytics, question banks, and institute onboarding.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Educational Institutions
              </h3>

              <p className="text-white/50">
                Contact us for institution setup, large-scale examinations,
                branding, integrations, and administrative support.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-bold text-white">
                Partnerships
              </h3>

              <p className="text-white/50">
                We welcome collaborations with educational organizations,
                coaching institutes, universities, publishers, and technology
                partners.
              </p>
            </div>

          </div>

        </GlassCard>
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl">
        <GlassCard className="!border-white/10 !bg-white/[0.045] !shadow-[0_20px_70px_rgba(0,0,0,0.2)]">

          <h2 className="mb-4 text-2xl font-black tracking-tight text-white">
            Careers
          </h2>

          <p className="text-white/50">
            Interested in building the future of digital education with us?
            We'd love to hear from talented educators, engineers, designers,
            and innovators.
          </p>

          <p className="mt-4 text-white/50">
            Send your resume and portfolio to:
          </p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=careers@theconclusiondaily.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-semibold text-brand-gold transition-colors hover:text-white"
          >
            careers@theconclusiondaily.com
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

        </GlassCard>
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl">
        <GlassCard className="!border-white/10 !bg-white/[0.045] !shadow-[0_20px_70px_rgba(0,0,0,0.2)]">

          <h2 className="mb-4 text-2xl font-black tracking-tight text-white">
            Need Immediate Help?
          </h2>

          <p className="text-white/50">
            When contacting us, please include your registered email address,
            examination name (if applicable), and a clear description of your
            issue. This helps us resolve your request as quickly as possible.
          </p>

        </GlassCard>
      </div>
    </Section>
  );
}