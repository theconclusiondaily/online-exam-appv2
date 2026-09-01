import type { Metadata } from "next";
import { headers } from "next/headers";

import ExamHome from "@/components/exam/ExamHome";
import MarketingHome from "@/components/marketing/MarketingHome";
import TCDIntroWrapper from "@/components/TCDIntroWrapper";
import { getLandingData } from "@/lib/landing/getLandingData";

export const metadata: Metadata = {
  title:
    "Online Exams, Competitions & Cash Rewards | The Conclusion Daily",

  description:
    "Take AI-powered online exams, compete with students across India, climb leaderboards, track your performance, and earn cash rewards through eligible competitions with The Conclusion Daily.",

  keywords: [
    "online examination platform",
    "online exam platform for students",
    "AI online exam platform",
    "online exams for students",
    "online exam platform for institutes",
    "online mock tests",
    "competitive exam platform",
    "online exam competitions",
    "online test series",
    "cash rewards for students",
    "exam cash rewards",
    "competitive exam rewards",
    "student competitions",
    "student performance analytics",
    "AI proctoring",
    "exam management platform",
    "The Conclusion Daily",
    "TCD",
  ],

  alternates: {
    canonical: "https://www.theconclusiondaily.com/",
  },

  openGraph: {
    title:
      "Online Exams, Competitions & Cash Rewards | The Conclusion Daily",

    description:
      "Practice, compete, climb the leaderboard, and earn cash rewards through eligible online competitions with The Conclusion Daily.",

    url: "https://www.theconclusiondaily.com/",
    siteName: "The Conclusion Daily",
    type: "website",

    images: [
      {
        url: "https://www.theconclusiondaily.com/logo.png",
        width: 512,
        height: 512,
        alt: "The Conclusion Daily - Online Exams, Competitions & Cash Rewards",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Online Exams, Competitions & Cash Rewards | The Conclusion Daily",

    description:
      "Take competitive online exams, climb leaderboards, track your performance, and earn cash rewards through eligible competitions.",

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