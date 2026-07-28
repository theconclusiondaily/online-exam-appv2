// lib/company/identity.ts

export const COMPANY = {
  // Basic Information
  name: "The Conclusion Daily",
  shortName: "TCD",
  legalName: "The Conclusion Daily",

  tagline: "Hope & Faith",

  founded: 2026,

  website: "https://www.theconclusiondaily.com",

  logo: "/logo.png",

  brandColor: "#1E3A8A",

  // Company Description
  shortDescription:
    "AI-Powered Online Examination Platform for Students, Teachers and Educational Institutions.",

  description: `
The Conclusion Daily (TCD) is an AI-powered online examination platform
designed to transform digital assessments for students, teachers,
coaching institutes, schools, colleges and universities.

Our platform combines secure online examinations,
AI-assisted proctoring, real-time leaderboards,
performance analytics and institute management into
one modern ecosystem.

Whether preparing for competitive examinations,
conducting institutional assessments,
or analyzing student performance,
The Conclusion Daily provides
a secure, scalable and intelligent examination experience.
`,

  mission:
    "To empower every learner and educational institution through secure, intelligent and technology-driven assessments.",

  vision:
    "To become one of the world's most trusted AI-powered examination ecosystems connecting millions of students, educators and institutions.",

  values: [
    "Integrity",
    "Innovation",
    "Trust",
    "Accessibility",
    "Security",
    "Growth",
  ],

  audience: [
    "Students",
    "Teachers",
    "Coaching Institutes",
    "Schools",
    "Colleges",
    "Universities",
  ],

  products: [
    "AI Online Exams",
    "Institute Exam Platform",
    "Student Analytics",
    "Teacher Dashboard",
    "AI Proctoring",
    "Competitive Exams",
    "Mock Tests",
    "National Leaderboards",
  ],
} as const;