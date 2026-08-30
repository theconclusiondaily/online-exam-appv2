import type { Metadata } from "next";

import { COMPANY } from "@/lib/company";

import AboutHero from "@/components/landing/about/AboutHero";
import Story from "@/components/landing/about/Story";
import MissionVision from "@/components/landing/about/MissionVision";
import Values from "@/components/landing/about/Values";
import Audience from "@/components/landing/about/Audience";
import Platform from "@/components/landing/about/Platform";
import WhyTCD from "@/components/landing/about/WhyTCD";
import Technology from "@/components/landing/about/Technology";
import Security from "@/components/landing/about/Security";
import Roadmap from "@/components/landing/about/Roadmap";
import CTA from "@/components/landing/about/CTA";

export const metadata: Metadata = {
  title: "About The Conclusion Daily | Our Mission & Vision",
  description:
    "Learn about The Conclusion Daily (TCD), an AI-powered online examination platform built to help students, teachers, coaching institutes, schools, colleges, and universities deliver secure, intelligent, and data-driven assessments.",
  alternates: {
    canonical: "https://www.theconclusiondaily.com/about",
  },
  openGraph: {
    title: "About The Conclusion Daily | Our Mission & Vision",
    description:
      "Discover the mission and vision behind The Conclusion Daily and our approach to secure, intelligent, technology-driven online assessments.",
    url: "https://www.theconclusiondaily.com/about",
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
    title: "About The Conclusion Daily | Our Mission & Vision",
    description:
      "Discover The Conclusion Daily's mission to make online assessments secure, intelligent, and accessible.",
    images: ["https://www.theconclusiondaily.com/logo.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Story />
      <MissionVision />
      <Values />
      <Audience />
      <Platform />
      <WhyTCD />
      <Technology />
      <Security />
      <Roadmap />
      <CTA />
    </>
  );
}