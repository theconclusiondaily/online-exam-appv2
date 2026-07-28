import GlassCard from "@/components/ui/GlassCard";
import Section from "../landing/ui/Section";

export default function PrivacyContent() {
  return (
    <Section spacing="xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            1. Information We Collect
          </h2>

          <p className="mb-4 text-brand-muted">
            The Conclusion Daily ("TCD", "we", "our", or "us") collects
            information necessary to provide secure online examinations,
            competitive learning experiences, institute services, and rewards.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-semibold">
            Personal Information
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Date of Birth (where applicable)</li>
            <li>Profile Photograph</li>
            <li>Educational Details</li>
            <li>Institute Information</li>
            <li>City, State, and Country</li>
          </ul>

          <h3 className="mt-8 mb-2 text-lg font-semibold">
            Account Information
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Login history</li>
            <li>User role</li>
            <li>Account preferences</li>
            <li>Authentication details</li>
          </ul>

          <h3 className="mt-8 mb-2 text-lg font-semibold">
            Device Information
          </h3>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>IP Address</li>
            <li>Browser Type</li>
            <li>Operating System</li>
            <li>Device Information</li>
            <li>Language & Time Zone</li>
            <li>Session Identifiers</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            2. Examination & AI Proctoring
          </h2>

          <p className="text-brand-muted">
            To maintain fair examinations and protect examination integrity,
            TCD may use automated monitoring technologies during eligible
            examinations.
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Webcam verification</li>
            <li>Fullscreen monitoring</li>
            <li>Tab switching detection</li>
            <li>Window focus monitoring</li>
            <li>Multiple face detection</li>
            <li>Device activity monitoring</li>
            <li>Suspicious activity logging</li>
            <li>Examination event records</li>
          </ul>

          <p className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-4 text-sm text-brand-muted">
            Proctoring features are enabled only for examinations where they
            have been configured by the examination organizer or platform
            administrator.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            3. How We Use Your Information
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Create and manage user accounts</li>
            <li>Authenticate users securely</li>
            <li>Conduct online examinations</li>
            <li>Generate rankings and leaderboards</li>
            <li>Issue rewards and achievements</li>
            <li>Improve platform performance</li>
            <li>Prevent fraud and malpractice</li>
            <li>Respond to support requests</li>
            <li>Comply with legal obligations</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            4. Payments & Wallet
          </h2>

          <p className="text-brand-muted">
            TCD may process examination entry fees, wallet transactions,
            refunds, rewards, and prize distributions through authorized
            payment partners.
          </p>

          <p className="mt-4 text-brand-muted">
            We do not store complete debit card, credit card, UPI PIN, or
            banking credentials on our servers.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            5. Cookies & Analytics
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Session management</li>
            <li>User authentication</li>
            <li>Security monitoring</li>
            <li>Performance analytics</li>
            <li>User preferences</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            6. Data Security
          </h2>

          <p className="text-brand-muted">
            We implement reasonable technical and organizational safeguards to
            protect user information, including encrypted connections, secure
            authentication, role-based access controls, database protection,
            and continuous monitoring.
          </p>

          <p className="mt-4 text-brand-muted">
            While we strive to protect your information, no online platform can
            guarantee absolute security.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            7. Information Sharing
          </h2>

          <p className="text-brand-muted">
            We do not sell personal information.
          </p>

          <p className="mt-4 text-brand-muted">
            Information may be shared only with educational institutions,
            payment providers, trusted technology partners, or government
            authorities when required by applicable law.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            8. Your Rights
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Access your information</li>
            <li>Update your profile</li>
            <li>Request corrections</li>
            <li>Request deletion where applicable</li>
            <li>Contact us regarding privacy concerns</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            9. Changes to this Privacy Policy
          </h2>

          <p className="text-brand-muted">
            We may update this Privacy Policy periodically to reflect platform
            improvements, legal requirements, security enhancements, or new
            features. Updated versions will always be published on this page.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            10. Contact Us
          </h2>

          <p className="text-brand-muted">
            If you have any questions regarding this Privacy Policy, please
            contact us.
          </p>

          <div className="mt-6 space-y-2">
            <p>
              <strong>The Conclusion Daily</strong>
            </p>

            <p>Email: support@theconclusiondaily.com</p>

            <p>Website: https://www.theconclusiondaily.com</p>
          </div>
        </GlassCard>

      </div>
    </Section>
  );
}