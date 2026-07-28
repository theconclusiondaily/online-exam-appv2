import GlassCard from "@/components/landing/ui/GlassCard";
import Section from "@/components/landing/ui/Section";

export default function RefundContent() {
  return (
    <Section spacing="xl">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            1. Overview
          </h2>

          <p className="text-brand-muted">
            This Refund Policy explains how refunds, cancellations, wallet
            balances, examination fees, and prize payouts are handled on
            The Conclusion Daily ("TCD") platform.
          </p>

          <p className="mt-4 text-brand-muted">
            By using TCD, you agree to this Refund Policy in addition to our
            Terms & Conditions and Privacy Policy.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            2. Examination Entry Fees
          </h2>

          <p className="text-brand-muted">
            Entry fees paid for examinations are generally non-refundable once
            an examination has started.
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Accidental registrations are not automatically refundable.</li>
            <li>Users should verify examination details before making payment.</li>
            <li>Entry fees are deducted only after successful registration.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            3. Eligible Refund Scenarios
          </h2>

          <p className="text-brand-muted">
            Refunds may be considered under the following circumstances:
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Duplicate payment for the same examination.</li>
            <li>Payment deducted but registration failed.</li>
            <li>Examination cancelled by TCD.</li>
            <li>Technical failure caused solely by the platform.</li>
            <li>Other situations approved by TCD after review.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            4. Wallet Balance
          </h2>

          <p className="text-brand-muted">
            Eligible refunds may be credited to the user's TCD Wallet or
            processed through the original payment method where applicable.
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Wallet credits are reflected after successful processing.</li>
            <li>Prize winnings remain subject to platform verification.</li>
            <li>Bonus credits may carry separate usage conditions.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            5. Prize Payouts
          </h2>

          <p className="text-brand-muted">
            Competition rewards are released only after result verification and
            fraud detection checks have been completed.
          </p>

          <ul className="mt-5 list-disc space-y-2 pl-6 text-brand-muted">
            <li>Identity verification may be required.</li>
            <li>Prize distribution timelines may vary.</li>
            <li>Fraudulent activity may result in cancellation of payouts.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            6. Refund Processing Time
          </h2>

          <p className="text-brand-muted">
            Approved refunds are generally processed within 5–10 business days.
            Actual timelines may vary depending on banks, payment providers,
            and applicable regulations.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            7. Non-Refundable Situations
          </h2>

          <ul className="list-disc space-y-2 pl-6 text-brand-muted">
            <li>Missed examinations.</li>
            <li>User device or internet connectivity issues.</li>
            <li>Violation of examination rules.</li>
            <li>Disqualification due to malpractice.</li>
            <li>Failure to appear for a scheduled examination.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            8. Policy Updates
          </h2>

          <p className="text-brand-muted">
            TCD reserves the right to modify this Refund Policy at any time.
            Updated versions will be published on this page with the revised
            effective date.
          </p>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-2xl font-bold text-brand">
            9. Contact Us
          </h2>

          <p className="text-brand-muted">
            For refund-related questions or assistance, please contact us.
          </p>

          <div className="mt-5 space-y-2">
            <p>
              <strong>The Conclusion Daily</strong>
            </p>

            <p>support@theconclusiondaily.com</p>

            <p>https://www.theconclusiondaily.com</p>
          </div>
        </GlassCard>

      </div>
    </Section>
  );
}