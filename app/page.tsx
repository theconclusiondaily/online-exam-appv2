import Image from "next/image";
import Link from "next/link";

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
  return (
    <main className="bg-black text-white overflow-x-hidden">

      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <Image
            src="/logo.png"
            alt="The Conclusion Daily"
            width={220}
            height={60}
            priority
          />

          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-md border border-white/20 hover:bg-white/10 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 rounded-md bg-[#D4AF37] text-black font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative min-h-screen flex items-center">

        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,123,255,.35), rgba(0,0,0,.95) 70%)",
            }}
          />

          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 mb-6">

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

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

              Learn.
              <br />
              Compete.
              <br />
              Rise to the Top.
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-2xl">
              Notes, PYQs, Practice Sheets, Live Exams, Rankings,
              Achievements and TCD Credits — all in one powerful ecosystem.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/signup"
                className="bg-[#D4AF37] text-black px-8 py-4 rounded-md font-bold hover:scale-105 transition"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="bg-white/15 backdrop-blur px-8 py-4 rounded-md font-semibold"
              >
                Login
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-300">

              <div>🏆 National Rankings</div>
              <div>🔥 Live Exams</div>
              <div>🪙 TCD Credits</div>
              <div>👑 Achievements</div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      {features.map((feature, index) => (
        <section
          key={feature.title}
          className="py-24 border-t border-white/10"
        >
          <div
            className={`max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center ${
              index % 2 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >

            <div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {feature.title}
              </h2>

              <p className="text-xl text-gray-300">
                {feature.description}
              </p>
            </div>

            <div className="flex justify-center">

              <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-[#007BFF]/20 to-[#D4AF37]/20 border border-white/10 flex items-center justify-center">

                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={140}
                  height={140}
                />
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* LIVE EXAMS */}

      <section className="py-24 bg-gradient-to-b from-black to-[#021327]">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Live Exam Arena
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[
              "/icons/fire.svg",
              "/icons/timer.svg",
              "/icons/rank.svg",
            ].map((icon, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-2xl p-8 border border-white/10"
              >
                <Image
                  src={icon}
                  alt=""
                  width={70}
                  height={70}
                />

                <h3 className="text-2xl font-semibold mt-6">
                  Real Competition
                </h3>

                <p className="text-gray-400 mt-4">
                  Compete against thousands of learners and earn rankings.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERBOARDS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <Image
                src="/icons/leaderboard.svg"
                alt=""
                width={220}
                height={220}
              />
            </div>

            <div>

              <h2 className="text-5xl font-bold mb-6">
                National Rankings
              </h2>

              <p className="text-xl text-gray-300">
                Every exam impacts your position. Climb leaderboards,
                outperform competitors and earn recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}

      <section className="py-24 bg-[#071018]">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-center text-5xl font-bold mb-14">
            Achievements & Badges
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {[
              "/icons/tcd-crown.svg",
              "/icons/tcd-medal.svg",
              "/icons/tcd-star.svg",
              "/icons/tcd-shield.svg",
              "/icons/tcd-target.svg",
              "/icons/tcd-flame.svg",
              "/icons/tcd-mountain.svg",
              "/icons/mastery-star.svg",
            ].map((icon) => (
              <div
                key={icon}
                className="bg-white/5 rounded-2xl p-8 flex justify-center border border-white/10"
              >
                <Image
                  src={icon}
                  alt=""
                  width={90}
                  height={90}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TCD CREDITS */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <Image
            src="/icons/tcd-coin.svg"
            alt=""
            width={120}
            height={120}
            className="mx-auto"
          />

          <h2 className="text-5xl font-bold mt-8">
            Earn TCD Credits
          </h2>

          <p className="max-w-3xl mx-auto text-xl text-gray-300 mt-6">
            Gain credits from exams, participation, streaks,
            achievements and rankings. Build your learning reputation.
          </p>
        </div>
      </section>

      {/* CTA */}

      <section className="py-32">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl md:text-7xl font-bold">
            Ready to Become
            <br />
            a Top Ranker?
          </h2>

          <p className="mt-8 text-xl text-gray-300">
            Join thousands of aspirants already competing on
            The Conclusion Daily.
          </p>

          <Link
            href="/signup"
            className="inline-block mt-10 bg-[#D4AF37] text-black px-10 py-5 rounded-md text-lg font-bold hover:scale-105 transition"
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
              width={180}
              height={50}
            />

            <p className="text-gray-500 text-sm">
              © 2026 The Conclusion Daily. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}