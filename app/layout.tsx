import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MathJaxContext } from "better-react-mathjax";
import { AuthProvider } from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theconclusiondaily.com"),

  title: {
    default: "The Conclusion Daily",
    template: "%s | The Conclusion Daily",
  },

  description:
    "The Conclusion Daily is an AI-powered online examination platform for students, teachers, and educational institutes. Practice, compete, earn rewards, and conduct secure online exams.",

  applicationName: "The Conclusion Daily",

  keywords: [
    "The Conclusion Daily",
    "Online Exam Platform",
    "CBT",
    "Computer Based Test",
    "NEET",
    "JEE",
    "Mock Tests",
    "AI Proctoring",
    "Institute Exams",
    "Online Test Series",
    "Education",
  ],

  authors: [{ name: "The Conclusion Daily" }],

  creator: "The Conclusion Daily",

  publisher: "The Conclusion Daily",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: "https://www.theconclusiondaily.com",
  },

  openGraph: {
    type: "website",
    url: "https://www.theconclusiondaily.com",
    title: "The Conclusion Daily",
    description:
      "AI-powered Online Examination Platform for Students, Teachers & Institutes.",
    siteName: "The Conclusion Daily",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "The Conclusion Daily",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Conclusion Daily",
    description:
      "AI-powered Online Examination Platform.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
     <body className="min-h-full flex flex-col">
  <MathJaxContext
    config={{
      loader: {
        load: ["[tex]/physics"],
      },
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\[", "\\]"],
        ],
        packages: {
          "[+]": ["physics"],
        },
      },
    }}
  >
    <AuthProvider>
      <Toaster
        richColors
        position="top-right"
      />
      {children}
    </AuthProvider>
  </MathJaxContext>
</body>
    </html>
  );
}