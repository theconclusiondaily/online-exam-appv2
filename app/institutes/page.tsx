import type { Metadata } from "next";

import InstitutesPage from "./InstitutesPage";

export const metadata: Metadata = {
  title: "Online Exam Platform for Institutes | The Conclusion Daily",
  description:
    "A modern online examination platform for coaching institutes, schools, colleges, and universities. Create and manage exams, students, batches, question banks, live assessments, rankings, and performance analytics with The Conclusion Daily.",
  alternates: {
    canonical: "https://www.theconclusiondaily.com/institutes",
  },
  openGraph: {
    title: "Online Exam Platform for Institutes | The Conclusion Daily",
    description:
      "Create and manage online examinations, students, batches, question banks, assessments, rankings, and performance analytics from one platform.",
    url: "https://www.theconclusiondaily.com/institutes",
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
    title: "Online Exam Platform for Institutes | The Conclusion Daily",
    description:
      "Manage online examinations, students, batches, assessments, rankings, and performance analytics with TCD.",
    images: ["https://www.theconclusiondaily.com/logo.png"],
  },
};

export default function Page() {
  return <InstitutesPage />;
}