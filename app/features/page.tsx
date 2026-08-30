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
  title: "Online Exam Platform Features | The Conclusion Daily",
  description:
    "Explore The Conclusion Daily's online examination platform features for students, teachers, and educational institutions, including practice tests, live competitions, performance analytics, AI-assisted security, rewards, and institute management.",
  alternates: {
    canonical: "https://www.theconclusiondaily.com/features",
  },
  openGraph: {
    title: "Online Exam Platform Features | The Conclusion Daily",
    description:
      "Practice, compete, analyze performance, and manage examinations with powerful tools built for students, teachers, and educational institutions.",
    url: "https://www.theconclusiondaily.com/features",
    siteName: "The Conclusion Daily",
    type: "website",
    images: [
      {
        url: "https://www.theconclusiondaily.com/logo.png",
        width: 512,
        height: 512,
        alt: "The Conclusion Daily",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Exam Platform Features | The Conclusion Daily",
    description:
      "Explore online examination, analytics, competition, security, rewards, and institute management features.",
    images: ["https://www.theconclusiondaily.com/logo.png"],
  },
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