import GlassCard from "@/components/landing/ui/GlassCard";
import Section from "@/components/landing/ui/Section";

export default function TermsContent() {
  return (
    <Section spacing="xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            1. Acceptance of Terms
          </h2>

          <p className="text-brand-muted">
            By accessing or using The Conclusion Daily ("TCD"), you agree to
            comply with these Terms & Conditions. If you do not agree with any
            part of these Terms, you must discontinue use of the platform.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            2. Eligibility
          </h2>

          <p className="text-brand-muted">
            You must provide accurate information while registering. If you are
            using TCD on behalf of an educational institution, you confirm that
            you are authorized to do so.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            3. User Accounts
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Maintain accurate profile information.</li>
            <li>Keep login credentials confidential.</li>
            <li>You are responsible for all activity on your account.</li>
            <li>Notify us immediately of unauthorized access.</li>
          </ul>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            4. Online Examinations
          </h2>

          <p className="text-brand-muted">
            TCD provides online examination services for educational
            institutions, teachers, and public competitive events.
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Users must follow examination rules.</li>
            <li>Cheating or impersonation is prohibited.</li>
            <li>AI proctoring may be enabled for certain examinations.</li>
            <li>Violation of examination rules may result in disqualification.</li>
          </ul>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            5. Wallet, Rewards & Competitions
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Competition rewards are subject to eligibility verification.</li>
            <li>Wallet balances are non-transferable unless permitted.</li>
            <li>TCD reserves the right to verify winners before payouts.</li>
            <li>Fraudulent activity may lead to forfeiture of rewards.</li>
          </ul>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            6. Prohibited Activities
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Cheating during examinations.</li>
            <li>Account sharing.</li>
            <li>Impersonation.</li>
            <li>Attempting unauthorized access.</li>
            <li>Uploading malicious software.</li>
            <li>Reverse engineering the platform.</li>
            <li>Violating applicable laws.</li>
          </ul>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            7. Intellectual Property
          </h2>

          <p className="text-brand-muted">
            All platform content, branding, software, graphics, examination
            systems, and intellectual property are owned by The Conclusion Daily
            unless otherwise stated. Unauthorized use is prohibited.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            8. Suspension & Termination
          </h2>

          <p className="text-brand-muted">
            TCD may suspend or terminate accounts involved in fraud, cheating,
            security violations, misuse of the platform, or breaches of these
            Terms.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            9. Disclaimer
          </h2>

          <p className="text-brand-muted">
            While we strive to provide reliable services, TCD does not guarantee
            uninterrupted availability and shall not be liable for losses caused
            by events beyond our reasonable control.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            10. Limitation of Liability
          </h2>

          <p className="text-brand-muted">
            To the maximum extent permitted by applicable law, TCD shall not be
            liable for indirect, incidental, consequential, or special damages
            arising from the use of the platform.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            11. Changes to these Terms
          </h2>

          <p className="text-brand-muted">
            We may update these Terms periodically. Continued use of the
            platform after updates constitutes acceptance of the revised Terms.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            12. Governing Law
          </h2>

          <p className="text-brand-muted">
            These Terms shall be governed by and interpreted in accordance with
            the laws of India. Any disputes shall be subject to the jurisdiction
            of the competent courts.
          </p>

        </GlassCard>

        <GlassCard>

          <h2 className="mb-4 text-2xl font-bold text-brand">
            13. Contact Us
          </h2>

          <p className="text-brand-muted">
            Questions regarding these Terms may be sent to:
          </p>

          <div className="mt-5 space-y-2">
            <p><strong>The Conclusion Daily</strong></p>
            <p>support@theconclusiondaily.com</p>
            <p>https://www.theconclusiondaily.com</p>
          </div>

        </GlassCard>

      </div>
    </Section>
  );
}