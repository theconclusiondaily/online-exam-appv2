// lib/company/seo.ts

import { COMPANY } from "./identity";

export const SEO: {
  title: string;
  titleTemplate: string;
  description: string;
  keywords: string[];
  author: string;
  robots: string;
} = {
  title: COMPANY.name,

  titleTemplate: "%s | The Conclusion Daily",

  description: COMPANY.shortDescription,

  keywords: [
    "The Conclusion Daily",
    "TCD",
    "Online Examination Platform",
    "AI Online Exams",
    "AI Proctoring",
    "Competitive Exams",
    "CBT Exam",
    "NEET Mock Test",
    "JEE Mock Test",
    "Institute Exam Platform",
    "Student Assessment",
    "Teacher Dashboard",
    "Educational Technology",
  ],

  author: COMPANY.name,

  robots: "index,follow",
};