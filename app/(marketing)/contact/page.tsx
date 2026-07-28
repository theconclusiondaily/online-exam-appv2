import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";

import Section from "@/components/landing/ui/Section";
import SectionHeading from "@/components/landing/ui/SectionHeading";

import ContactContent from "@/components/legal/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Conclusion Daily (TCD). We'd love to hear from students, teachers, institutes, and partners.",
};

export default function ContactPage() {
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
            eyebrow="Support"
            title="Contact Us"
            subtitle="Have questions, suggestions, partnership opportunities, or need support? We're here to help."
          />

          <p className="mt-6 text-sm text-brand-muted">
            We usually respond within 1–2 business days.
          </p>
        </Section>

        <ContactContent />

        <CTA />
      </main>

      <Footer />
    </>
  );
}