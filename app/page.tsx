import { headers } from "next/headers";

import MarketingHomePage from "./(marketing)/page";
import ExamHomePage from "./(exam-home)/page"; // we'll create this

export default async function Home() {
  const host = (await headers()).get("host") ?? "";

  if (host.startsWith("exam.")) {
    return <ExamHomePage />;
  }

  return <MarketingHomePage />;
}