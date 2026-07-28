import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";

import Section from "@/components/landing/ui/Section";
import SectionHeading from "@/components/landing/ui/SectionHeading";
import PrivacyContent from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of The Conclusion Daily (TCD) to understand how we collect, use, store, and protect your information.",
};

export default function PrivacyPage() {
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
            title="Privacy Policy"
            subtitle="Your privacy is important to us. This Privacy Policy explains how The Conclusion Daily collects, uses, stores, and protects your information when you use our platform."
          />

          <p className="mt-6 text-sm text-brand-muted">
            Last Updated: July 28, 2026
          </p>
        </Section>

        <PrivacyContent />

        <CTA />
      </main>

      <Footer />
    </>
  );
}