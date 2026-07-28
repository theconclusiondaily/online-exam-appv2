// ===========================================
// File: lib/landing/navigation.ts
// ===========================================

export interface NavigationItem {
  title: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Students",
    href: "#students",
  },
  {
    title: "Competitions",
    href: "#competitions",
  },
  {
    title: "Institutes",
    href: "#institutes",
  },
  {
    title: "AI Security",
    href: "#security",
  },
  {
    title: "Rewards",
    href: "#rewards",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

export const footerNavigation = {
  company: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Students",
      href: "#students",
    },
    {
      title: "Institutes",
      href: "#institutes",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ],

  platform: [
    {
      title: "Live Exams",
      href: "https://exam.theconclusiondaily.com",
      external: true,
    },
    {
      title: "Leaderboard",
      href: "https://exam.theconclusiondaily.com/leaderboard",
      external: true,
    },
    {
      title: "Login",
      href: "https://exam.theconclusiondaily.com/login",
      external: true,
    },
    {
      title: "Create Account",
      href: "https://exam.theconclusiondaily.com/signup",
      external: true,
    },
  ],

 legal: [
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
  {
    title: "Refund Policy",
    href: "/refund",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
]
};

export default navigation;