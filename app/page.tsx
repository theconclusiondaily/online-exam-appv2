import type { Metadata } from "next";
import { headers } from "next/headers";

import ExamHome from "@/components/exam/ExamHome";
import MarketingHome from "@/components/marketing/MarketingHome";
import TCDIntroWrapper from "@/components/TCDIntroWrapper";
import { getLandingData } from "@/lib/landing/getLandingData";

export const metadata: Metadata = {
  title:
    "AI-Powered Online Examination Platform for Students & Institutes",
  description:
    "The Conclusion Daily is an AI-powered online examination platform for students, teachers, coaching institutes, schools, colleges, and universities. Conduct secure online exams, practice tests, competitive assessments, track performance, and manage examinations in one platform.",
  keywords: [
    "online examination platform",
    "AI online exam platform",
    "online exams for students",
    "online exam platform for institutes",
    "online mock tests",
    "competitive exam platform",
    "AI proctoring",
    "exam management platform",
    "student performance analytics",
    "The Conclusion Daily",
    "TCD",
  ],
  alternates: {
    canonical: "https://www.theconclusiondaily.com/",
  },
  openGraph: {
    title:
      "AI-Powered Online Examination Platform | The Conclusion Daily",
    description:
      "Conduct secure online examinations, practice tests, competitive assessments, and performance analytics with The Conclusion Daily.",
    url: "https://www.theconclusiondaily.com/",
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
    title:
      "AI-Powered Online Examination Platform | The Conclusion Daily",
    description:
      "Secure online examinations, mock tests, competitive assessments, analytics, and institute management.",
    images: ["https://www.theconclusiondaily.com/logo.png"],
  },
};

export default async function Home() {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";

  const isExamDomain =
    host === "exam.theconclusiondaily.com" ||
    host.startsWith("exam.");

  if (isExamDomain) {
    return (
      <TCDIntroWrapper>
        <ExamHome />
      </TCDIntroWrapper>
    );
  }

  const landing = await getLandingData();

  return (
    <TCDIntroWrapper>
      <MarketingHome landing={landing} />
    </TCDIntroWrapper>
  );
}