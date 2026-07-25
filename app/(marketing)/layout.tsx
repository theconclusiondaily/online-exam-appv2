import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "The Conclusion Daily",
    template: "%s | The Conclusion Daily",
  },
  description:
    "India's Competitive Learning Ecosystem. Practice, compete, earn rewards, and empower institutes with secure online examinations.",

  keywords: [
    "Online Exams",
    "CBT Platform",
    "Competitive Learning",
    "NEET",
    "JEE",
    "Scholarships",
    "Institute Exams",
    "The Conclusion Daily",
    "TCD",
  ],

  openGraph: {
    title: "The Conclusion Daily",
    description:
      "India's Competitive Learning Ecosystem",
    url: "https://theconclusiondaily.com",
    siteName: "The Conclusion Daily",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Conclusion Daily",
    description:
      "India's Competitive Learning Ecosystem",
  },

  metadataBase: new URL("https://theconclusiondaily.com"),
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${inter.variable} font-sans bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden`}
    >
      {children}
    </main>
  );
}