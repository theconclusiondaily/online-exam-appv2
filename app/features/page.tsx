import type { Metadata } from "next";

import Navbar from "@/components/landing/Navbar";
import Footer  from "@/components/landing/Footer";

import { FeaturesHero } from "@/components/landing/features/FeaturesHero";
import { StudentFeatures } from "@/components/landing/features/StudentFeatures";
import { TeacherFeatures } from "@/components/landing/features/TeacherFeatures";
import { InstituteFeatures } from "@/components/landing/features/InstituteFeatures";
import { SecurityFeatures } from "@/components/landing/features/SecurityFeatures";
import { RewardsFeatures } from "@/components/landing/features/RewardsFeatures";
import { WhyChooseTCD } from "@/components/landing/features/WhyChooseTCD";
import { FeaturesCTA } from "@/components/landing/features/FeaturesCTA";

export const metadata: Metadata = {
  title: "Features | The Conclusion Daily",
  description:
    "Discover everything The Conclusion Daily offers for students, teachers, coaching institutes, and schools. Secure online exams, live leaderboards, rewards, analytics, AI-powered proctoring, and much more.",
};

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">

        <FeaturesHero />

        <StudentFeatures />

        <TeacherFeatures />

        <InstituteFeatures />

        <SecurityFeatures />

        <RewardsFeatures />

        <WhyChooseTCD />

        <FeaturesCTA />

      </main>

      <Footer />
    </>
  );
}