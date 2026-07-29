import { getLandingData } from "@/lib/landing/getLandingData";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

import StudentExperience from "@/components/landing/StudentExperience";
import ExamExperience from "@/components/landing/ExamExperience";
import CompetitionExperience from "@/components/landing/CompetitionExperience";
import RewardsExperience from "@/components/landing/RewardsExperience";
import InstituteExperience from "@/components/landing/InstituteExperience";
import AISecurity from "@/components/landing/AISecurity";
import WhyChooseTCD from "@/components/landing/WhyChooseTCD";
import FeaturesPreview from "@/components/landing/FeaturesPreview";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";

import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

interface MarketingHomeProps {
  landing: Awaited<ReturnType<typeof getLandingData>>;
}

export default function MarketingHome({
  landing,
}: MarketingHomeProps) {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
  <section id="home">
    <Hero data={landing.hero} />
  </section>

  <section id="students" className="scroll-mt-24">
    <StudentExperience />
  </section>

  <section id="competitions" className="scroll-mt-24">
    <CompetitionExperience />
  </section>

  <section id="rewards" className="scroll-mt-24">
    <RewardsExperience />
  </section>

  <section id="institutes" className="scroll-mt-24">
    <InstituteExperience />
  </section>

  <section id="security" className="scroll-mt-24">
    <AISecurity />
  </section>

  <section>
    <WhyChooseTCD />
  </section>

<section id="features" className="scroll-mt-24">
    <FeaturesPreview />
</section>

  <section>
    <Testimonials />
  </section>

  <section id="faq" className="scroll-mt-24">
    <FAQ />
  </section>

  <section>
    <CTA />
  </section>
</main>

      <Footer />
    </>
  );
}