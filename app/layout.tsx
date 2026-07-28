import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { MathJaxContext } from "better-react-mathjax";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { COMPANY, SEO } from "@/lib/company";
import { organizationSchema } from "@/lib/company";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),

  title: {
    default: SEO.title,
    template: SEO.titleTemplate,
  },

  description: SEO.description,

  applicationName: COMPANY.name,

  authors: [
    {
      name: COMPANY.name,
    },
  ],

  creator: COMPANY.name,

  publisher: COMPANY.name,

  keywords: SEO.keywords,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical: COMPANY.website,
  },

  openGraph: {
    type: "website",
    url: COMPANY.website,
    title: COMPANY.name,
    description: SEO.description,
    siteName: COMPANY.name,

    images: [
      {
        url: COMPANY.logo,
        width: 1200,
        height: 630,
        alt: COMPANY.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: COMPANY.name,
    description: SEO.description,
    images: [COMPANY.logo],
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
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>
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