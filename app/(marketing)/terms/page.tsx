import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";

import Section from "@/components/landing/ui/Section";
import SectionHeading from "@/components/landing/ui/SectionHeading";

import TermsContent from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions governing your use of The Conclusion Daily (TCD) platform and services.",
};

export default function TermsPage() {
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
            title="Terms & Conditions"
            subtitle="These Terms & Conditions govern your access to and use of The Conclusion Daily platform, services, examinations, competitions, and related features."
          />

          <p className="mt-6 text-sm text-brand-muted">
            Last Updated: July 28, 2026
          </p>
        </Section>

        <TermsContent />

        <CTA />
      </main>

      <Footer />
    </>
  );
}