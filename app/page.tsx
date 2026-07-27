import { headers } from "next/headers";
import Script from "next/script";

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

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "The Conclusion Daily",
          url: "https://www.theconclusiondaily.com",
          logo: "https://www.theconclusiondaily.com/logo.png",
          sameAs: [
      "https://www.youtube.com/@theconclusiondaily"
      // Add your LinkedIn, Facebook, X, etc. here when available
    ],
          description:
            "AI-powered online examination platform for students, teachers, and educational institutes.",
        })}
      </Script>

      <MarketingHome landing={landing} />
    </>
  );
}