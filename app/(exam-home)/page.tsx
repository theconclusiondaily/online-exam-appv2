"use client";


import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";
import TCDIntro from "@/components/TCDIntro";

const features = [
  {
    title: "Live Competitive Exams",
    description:
      "Compete with aspirants across India in real-time and climb national rankings.",
    icon: "/icons/fire.svg",
  },
  {
    title: "National Leaderboards",
    description:
      "Track your performance and compare yourself with the best learners.",
    icon: "/icons/leaderboard.svg",
  },
  {
    title: "Achievements & Rewards",
    description:
      "Unlock medals, trophies, crowns, shields and mastery badges.",
    icon: "/icons/trophy.svg",
  },
  {
    title: "TCD Credits Economy",
    description:
      "Earn TCD Credits through exams, achievements and participation.",
    icon: "/icons/tcd-coin.svg",
  },
];

export default function HomePage() {
    const [showIntro, setShowIntro] = useState<boolean | null>(null);

useEffect(() => {
  const seen = sessionStorage.getItem("tcd_intro_seen");
  setShowIntro(seen !== "true");
}, []);

if (showIntro === null) {
  return null;
}

if (showIntro) {
  return (
    <TCDIntro
      onComplete={() => setShowIntro(false)}
    />
  );
}

return (
  <main
  className="
    animate-[landingFade_1s_ease-out]
    overflow-x-hidden
  "
>

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Image
  src="/logo.png"
  alt="The Conclusion Daily"
  width={90}
  height={90}
  className="
    w-14
    md:w-[90px]
    h-auto
  "
  priority
/>

          <div className="flex gap-2 md:gap-4">
            <Link
              href="/login"
              className="
  bg-[#2F4B7C]/80

  border
  border-[#D4AF37]/40

  text-white

  backdrop-blur-xl

  px-3 md:px-8
py-2 md:py-4

text-sm md:text-base

  rounded-lg

  font-semibold

  shadow-[0_0_30px_rgba(47,75,124,0.4)]

  hover:bg-[#3D5F99]

  hover:border-[#D4AF37]

  hover:scale-105

  transition-all
  duration-300
"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="
  bg-[#D4AF37]

  text-brand

  px-4 md:px-10
py-2 md:py-4

text-sm md:text-base

  rounded-lg

  font-bold

  shadow-[0_0_30px_rgba(212,175,55,0.35)]

  hover:scale-105

  transition
"
            >
              Sign Up
            </Link>

            <Link
  href="/demo"
  className="
    px-3 md:px-6
    py-2 md:py-3

    text-xs md:text-base

    rounded-xl

    border-2 border-tcd-gold

    text-tcd-gold

    font-bold

    whitespace-nowrap

    hover:bg-tcd-gold
    hover:text-tcd-blue

    transition-all
  "
>
  Try Free Demo
</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative min-h-[55vh] flex items-center">

        
          
<div className="absolute inset-0 overflow-hidden">

  {/* Base Background */}

  <div className="absolute inset-0 bg-[#020812]" />

  {/* Blue Glow */}

  <div
    className="
      absolute

      left-1/2
      top-1/2

      -translate-x-1/2
      -translate-y-1/2

      w-[1000px]
      h-[1000px]

      rounded-full

      bg-[#2F4B7C]/30

      blur-[200px]
    "
  />

  {/* Gold Glow */}

  <div
    className="
      absolute

      right-0
      top-0

      w-[500px]
      h-[500px]

      rounded-full

      bg-[#D4AF37]/10

      blur-[180px]
    "
  />

</div>


          
        

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

          <div className="max-w-2xl">

           <div className="mb-6">

  <h2
  className="
    text-[#D4AF37]

    text-2xl
    md:text-4xl

    font-black

    tracking-[0.15em]

    uppercase

    mb-4

    drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]
  "
>
  THE CONCLUSION DAILY
</h2>

  <div
    className="
      inline-flex
      items-center
      gap-2

      px-4
      py-2

      rounded-full

      border
      border-[#D4AF37]/40

      bg-[#D4AF37]/10
    "
  >

    <Image
      src="/icons/tcd-crown.svg"
      alt=""
      width={20}
      height={20}
    />

    <span className="text-[#D4AF37] text-sm">
      India's Competitive Learning Platform
    </span>

  </div>

</div>
<p className="mt-4 text-[#D4AF37] uppercase tracking-[0.25em] font-semibold">
  Hope • Faith • Excellence
</p>
            <h1
  className="
    text-white

    text-4xl
md:text-6xl

    font-black

    leading-tight

    tracking-tight

    drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]
  "
>
<div
  className="
    absolute

    left-1/2
    top-1/2

    -translate-x-1/2
    -translate-y-1/2

    w-[900px]
    h-[900px]

    rounded-full

    bg-[#D4AF37]/10

    blur-[180px]
  "
/>
              
              <br />Learn.
<br />
Compete.
<br />
Achieve Greatness.
            </h1>

            <p className="mt-6 text-lg text-[#D4AF37] max-w-2xl">
              Notes, PYQs, Practice Sheets, Live Exams, Rankings,
              Achievements and TCD Credits — all in one powerful ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/signup"
                className="
  bg-[#D4AF37]

  text-brand

  px-10
  py-4

  rounded-lg

  font-bold

  shadow-[0_0_30px_rgba(212,175,55,0.35)]

  hover:scale-105

  transition
"
              >
                Get Started
              </Link>

              <Link
                href="/login"
               className="
  bg-[#2F4B7C]/80

  border
  border-[#D4AF37]/40

  text-white

  backdrop-blur-xl

  px-8
  py-4

  rounded-lg

  font-semibold

  shadow-[0_0_30px_rgba(47,75,124,0.4)]

  hover:bg-[#3D5F99]

  hover:border-[#D4AF37]

  hover:scale-105

  transition-all
  duration-300
"
              >
                Login
              </Link>
            </div>

            
<div className="flex flex-wrap gap-8 mt-12">

  <div className="flex items-center gap-3">
    <Image
      src="/icons/leaderboard.svg"
      alt="Rankings"
      width={24}
      height={24}
    />
    <span className="text-white font-medium">
      National Rankings
    </span>
  </div>

  <div className="flex items-center gap-3">
    <Image
      src="/icons/fire.svg"
      alt="Live Exams"
      width={24}
      height={24}
    />
    <span className="text-white font-medium">
      Live Exams
    </span>
  </div>

  <div className="flex items-center gap-3">
    <Image
      src="/icons/tcd-coin.svg"
      alt="TCD Credits"
      width={24}
      height={24}
    />
    <span className="text-white font-medium">
      TCD Credits
    </span>
  </div>

  <div className="flex items-center gap-3">
    <Image
      src="/icons/achievement-medal.svg"
      alt="Achievements"
      width={24}
      height={24}
    />
    <span className="text-white font-medium">
      Achievements
    </span>
  </div>

</div>

          </div>
        </div>
      </section>

     {/* FEATURES */}

<section className="py-20 bg-[#071018]">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2 className="text-4xl md:text-5xl font-black text-white">
        Why Students Choose TCD
      </h2>

      <p className="mt-4 text-lg text-[#D4AF37] max-w-3xl mx-auto">
        Everything you need to learn, compete, grow and achieve greatness —
        all inside one powerful ecosystem.
      </p>

    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {features.map((feature) => (

        <div
          key={feature.title}
          className="
            bg-[#0D1B2A]
            border
            border-[#1B2E45]

            rounded-3xl

            p-6

            hover:border-[#D4AF37]
            hover:-translate-y-2

            transition-all
            duration-300
          "
        >

          <div
            className="
              w-16
              h-16

              rounded-2xl

              bg-[#10243A]

              flex
              items-center
              justify-center

              mb-5
            "
          >

            <Image
              src={feature.icon}
              alt={feature.title}
              width={40}
              height={40}
            />

          </div>

          <h3 className="text-xl font-bold text-[#D4AF37]">

            {feature.title}

          </h3>

          <p className="mt-3 text-white leading-relaxed">

            {feature.description}

          </p>

        </div>

      ))}

    </div>

  </div>

</section>

      



      {/* ACHIEVEMENTS */}

<section className="py-24 bg-[#020812]">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-4xl md:text-5xl font-black text-white">

        Achievements & Badges

      </h2>

      <p className="mt-4 text-lg text-[#D4AF37]">

        Earn prestigious badges and showcase your mastery.

      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

      {[
        {
          icon: "/icons/tcd-crown.svg",
          title: "Achiever",
        },
        {
          icon: "/icons/tcd-medal.svg",
          title: "Medal",
        },
        {
          icon: "/icons/tcd-star.svg",
          title: "Prestige",
        },
        {
          icon: "/icons/tcd-shield.svg",
          title: "XP",
        },
        {
          icon: "/icons/tcd-target.svg",
          title: "Aim",
        },
        {
          icon: "/icons/tcd-flame.svg",
          title: "Streak",
        },
        {
          icon: "/icons/tcd-mountain.svg",
          title: "Global Leader",
        },
        {
          icon: "/icons/mastery-star.svg",
          title: "Mastery",
        },
      ].map((badge) => (

        <div
          key={badge.title}
          className="
            bg-[#0D1B2A]

            border
            border-[#1B2E45]

            rounded-3xl

            p-8

            flex
            flex-col
            items-center

            hover:border-[#D4AF37]
            hover:-translate-y-2

            transition-all
            duration-300
          "
        >

          <Image
            src={badge.icon}
            alt={badge.title}
            width={60}
            height={60}
          />

          <h3
            className="
              mt-5

              text-lg

              font-bold

              text-[#D4AF37]
            "
          >
            {badge.title}
          </h3>

        </div>

      ))}

    </div>

  </div>

</section>

    
      {/* CTA */}

      <section className="py-20 bg-[#071018]">

        <div className="max-w-5xl mx-auto px-6 text-center">

         <h2 className="text-3xl md:text-5xl font-bold text-white">
            Ready to Become
            <br />
            a Top Ranker?
          </h2>

          <p className="mt-8 text-xl text-[#D4AF37]">
            Join thousands of aspirants already competing on
            The Conclusion Daily.
          </p>

          <Link
            href="/signup"
            className="inline-block mt-10 bg-[#D4AF37] text-brand px-10 py-5 rounded-md text-lg font-bold hover:scale-105 transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            <Image
  src="/logo.png"
  alt="TCD"
  width={90}
  height={90}
  className="h-auto"
/>

            <p className="text-tcd-primary text-sm">
              © 2026 The Conclusion Daily. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}