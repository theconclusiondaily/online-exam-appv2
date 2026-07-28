import GlassCard from "@/components/landing/ui/GlassCard";
import Section from "@/components/landing/ui/Section";

export default function ContactContent() {
  return (
    <Section spacing="xl">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">

        <GlassCard>
          <h2 className="mb-6 text-2xl font-bold text-brand">
            Get in Touch
          </h2>

          <p className="mb-6 text-brand-muted">
            Whether you're a student, teacher, educational institution, or
            business partner, we'd love to hear from you. Our team is committed
            to providing timely assistance and ensuring the best possible
            experience with The Conclusion Daily.
          </p>

          <div className="space-y-6">

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                General Support
              </h3>

              <p className="text-brand-muted">
                support@theconclusiondaily.com
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Business & Partnerships
              </h3>

              <p className="text-brand-muted">
                business@theconclusiondaily.com
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Website
              </h3>

              <p className="text-brand-muted">
                https://www.theconclusiondaily.com
              </p>
            </div>

          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-6 text-2xl font-bold text-brand">
            Office Information
          </h2>

          <div className="space-y-6">

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Company
              </h3>

              <p className="text-brand-muted">
                The Conclusion Daily (TCD)
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Headquarters
              </h3>

              <p className="text-brand-muted">
                India
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Support Hours
              </h3>

              <p className="text-brand-muted">
                Monday – Saturday
              </p>

              <p className="text-brand-muted">
                9:00 AM – 6:00 PM (IST)
              </p>
            </div>

          </div>
        </GlassCard>

      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <GlassCard>

          <h2 className="mb-6 text-2xl font-bold text-brand">
            How Can We Help?
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Students
              </h3>

              <p className="text-brand-muted">
                Get help with account registration, examinations, rankings,
                wallet, competitions, certificates, and technical issues.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Teachers
              </h3>

              <p className="text-brand-muted">
                Assistance with creating examinations, managing students,
                analytics, question banks, and institute onboarding.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Educational Institutions
              </h3>

              <p className="text-brand-muted">
                Contact us for institution setup, large-scale examinations,
                branding, integrations, and administrative support.
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-brand">
                Partnerships
              </h3>

              <p className="text-brand-muted">
                We welcome collaborations with educational organizations,
                coaching institutes, universities, publishers, and technology
                partners.
              </p>
            </div>

          </div>

        </GlassCard>
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            Careers
          </h2>

          <p className="text-brand-muted">
            Interested in building the future of digital education with us?
            We'd love to hear from talented educators, engineers, designers,
            and innovators.
          </p>

          <p className="mt-4 text-brand-muted">
            Send your resume and portfolio to:
          </p>

          <p className="mt-2 font-semibold text-brand">
            careers@theconclusiondaily.com
          </p>

        </GlassCard>
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            Need Immediate Help?
          </h2>

          <p className="text-brand-muted">
            When contacting us, please include your registered email address,
            examination name (if applicable), and a clear description of your
            issue. This helps us resolve your request as quickly as possible.
          </p>

        </GlassCard>
      </div>
    </Section>
  );
}