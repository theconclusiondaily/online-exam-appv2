import { headers } from "next/headers";
import MarketingHome from "@/components/marketing/MarketingHome";
import ExamHome from "@/components/exam/ExamHome";

export default async function Home() {
  const host = (await headers()).get("host")?.toLowerCase() ?? "";

  const isExamDomain =
    host === "exam.theconclusiondaily.com" ||
    host.startsWith("exam.");

  return isExamDomain ? <ExamHome /> : <MarketingHome />;
}