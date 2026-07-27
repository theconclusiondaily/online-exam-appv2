import { headers } from "next/headers";

import MarketingHome from "@/components/marketing/MarketingHome";
import ExamHome from "@/components/exam/ExamHome";

import { getLandingData } from "@/lib/landing/getLandingData";

export default async function Home() {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";

  const isExamDomain =
    host === "exam.theconclusiondaily.com" ||
    host.startsWith("exam.");

  if (isExamDomain) {
    return <ExamHome />;
  }

  const landing = await getLandingData();

  return <MarketingHome landing={landing} />;
}