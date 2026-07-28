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
  title: `About | ${COMPANY.name}`,
  description: COMPANY.shortDescription,
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