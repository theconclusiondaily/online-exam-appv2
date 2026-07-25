import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

import StudentExperience from "@/components/landing/StudentExperience";
import ExamExperience from "@/components/landing/ExamExperience";
import CompetitionExperience from "@/components/landing/CompetitionExperience";
import RewardsExperience from "@/components/landing/RewardsExperience";
import InstituteExperience from "@/components/landing/InstituteExperience";
import AISecurity from "@/components/landing/AISecurity";
import WhyChooseTCD from "@/components/landing/WhyChooseTCD";

import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";

import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function MarketingHome() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        <Hero />

        <StudentExperience />

        <ExamExperience />

        <CompetitionExperience />

        <RewardsExperience />

        <InstituteExperience />

        <AISecurity />

        <WhyChooseTCD />

        <Testimonials />

        <FAQ />

        <CTA />
      </main>

      <Footer />
    </>
  );
}