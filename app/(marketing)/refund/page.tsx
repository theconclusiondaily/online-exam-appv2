import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";

import Section from "@/components/landing/ui/Section";
import SectionHeading from "@/components/landing/ui/SectionHeading";

import RefundContent from "@/components/legal/RefundContent";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Learn about refunds, cancellations, wallet credits, and prize payouts on The Conclusion Daily platform.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Section
          background="gradient"
          spacing="xl"
          className="text-center"
        >
          <SectionHeading
            eyebrow="Legal"
            title="Refund Policy"
            subtitle="This Refund Policy explains how examination fees, wallet balances, competition refunds, and prize payouts are handled on The Conclusion Daily platform."
          />

          <p className="mt-6 text-sm text-brand-muted">
            Last Updated: July 28, 2026
          </p>
        </Section>

        <RefundContent />

        <CTA />
      </main>

      <Footer />
    </>
  );
}