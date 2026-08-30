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

      <main className="min-h-screen bg-[#050B1A] pt-20">
        {/* ================================================================
            CONTACT HERO
        ================================================================ */}

        <Section
          background="dark"
          spacing="xl"
          className="relative overflow-hidden bg-[#050B1A] text-center"
        >
          {/* Background glow */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-gold/8 blur-[120px]" />

            <div className="absolute -right-40 bottom-[-14rem] h-[32rem] w-[32rem] rounded-full bg-blue-500/7 blur-[130px]" />

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />
          </div>

          <div className="relative z-10">
            <SectionHeading
              eyebrow="Support"
              title="Contact Us"
              subtitle="Have questions, suggestions, partnership opportunities, or need support? We're here to help."
            />

            <p className="mt-6 text-sm text-white/40">
              We usually respond within 1–2 business days.
            </p>
          </div>
        </Section>

        {/* ================================================================
            CONTACT CONTENT
        ================================================================ */}

        <ContactContent />

        {/* ================================================================
            FINAL CTA
        ================================================================ */}

        <CTA />
      </main>

      <Footer />
    </>
  );
}