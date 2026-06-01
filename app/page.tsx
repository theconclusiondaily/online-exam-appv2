
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "Learning Journey",
    description:
      "Structured learning paths to help you improve every day.",
    icon: "/icons/learning-journey.svg",
  },
  {
    title: "Live Exams",
    description:
      "Compete in real-time exams and track your performance.",
    icon: "/icons/tcd-stopwatch.svg",
  },
  {
    title: "Leaderboards",
    description:
      "See where you stand among top performers.",
    icon: "/icons/leaderboard.svg",
  },
  {
    title: "Achievements",
    description:
      "Unlock medals, milestones and recognition.",
    icon: "/icons/achievement-medal.svg",
  },
  {
    title: "TCD Credits",
    description:
      "Earn credits through participation and excellence.",
    icon: "/icons/tcd-coin.svg",
  },
  {
    title: "Rankings",
    description:
      "Track your national and institute rankings.",
    icon: "/icons/rank.svg",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden

          bg-gradient-to-br
          from-[#12355B]
          via-[#274472]
          to-[#3B5998]

          text-white
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto

            px-6
            py-20
          "
        >
          <div
            className="
              grid
              lg:grid-cols-2

              gap-12

              items-center
            "
          >
            <div>

             <div className="mb-8">

  <Image
    src="/tcd-logo.svg"
    alt="The Conclusion Daily"
    width={220}
    height={220}
    priority
  />

</div>
<p
  className="
    text-[#F2D27A]

    font-bold

    tracking-[0.3em]

    uppercase
  "
>
  Hope • Faith • Excellence
</p>

              <p
                className="
                  text-[#F2D27A]

                  font-bold

                  tracking-[0.3em]

                  uppercase
                "
              >
                Hope • Faith • Excellence
              </p>

              <h1
                className="
                  mt-6

                  text-5xl
                  md:text-7xl

                  font-black

                  leading-tight
                "
              >
                Learn.
                <br />
                Compete.
                <br />
                Achieve.
              </h1>

              <p
                className="
                  mt-8

                  text-xl

                  text-blue-100

                  max-w-2xl
                "
              >
                Transform knowledge into achievement through
                Notes, PYQs, Practice Sheets, Live Exams,
                Rankings, Rewards and continuous growth.
              </p>

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row

                  gap-4

                  mt-10
                "
              >
                <Link
                  href="/signup"
                  className="
                    px-8
                    py-4

                    rounded-2xl

                    bg-gradient-to-r
                    from-[#D4AF37]
                    to-[#F2D27A]

                    text-[#12355B]

                    font-bold

                    text-center
                  "
                >
                  Create Account
                </Link>

                <Link
                  href="/login"
                  className="
                    px-8
                    py-4

                    rounded-2xl

                    border
                    border-white/30

                    bg-white/10

                    text-center

                    font-semibold
                  "
                >
                  Student Login
                </Link>
              </div>

            </div>

            <div>

              <div className="grid gap-5">

                {[
                  {
                    title: "Notes & PYQs",
                    icon: "/icons/tcd-target.svg",
                  },
                  {
                    title: "Practice Sheets",
                    icon: "/icons/precision-target.svg",
                  },
                  {
                    title: "Live Exams",
                    icon: "/icons/tcd-stopwatch.svg",
                  },
                  {
                    title: "Rankings & Rewards",
                    icon: "/icons/tcd-crown.svg",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="
                      bg-white/10

                      backdrop-blur-sm

                      rounded-3xl

                      p-5

                      border
                      border-white/10

                      flex
                      items-center

                      gap-4
                    "
                  >
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={50}
                      height={50}
                    />

                    <h3
                      className="
                        text-xl
                        font-bold
                      "
                    >
                      {item.title}
                    </h3>
                  </div>
                ))}

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section
        className="
          py-20
          px-6
        "
      >
        <div className="max-w-7xl mx-auto">

          <h2
            className="
              text-4xl

              font-black

              text-center

              text-[#12355B]
            "
          >
            Why Students Choose TCD
          </h2>

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-3

              gap-8

              mt-14
            "
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  bg-white

                  rounded-3xl

                  p-8

                  border
                  border-gray-100

                  shadow-lg

                  hover:-translate-y-1

                  transition-all
                "
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                />

                <h3
                  className="
                    mt-5

                    text-2xl

                    font-bold

                    text-[#12355B]
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-3

                    text-gray-600
                  "
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}

      <section
        className="
          py-20
          px-6

          bg-[#F8FAFF]
        "
      >
        <div
          className="
            max-w-4xl
            mx-auto

            text-center
          "
        >
          <Image
            src="/icons/trophy.svg"
            alt="TCD Trophy"
            width={90}
            height={90}
            className="mx-auto"
          />

          <h2
            className="
              mt-8

              text-5xl

              font-black

              text-[#12355B]
            "
          >
            Start Your Success Journey
          </h2>

          <p
            className="
              mt-6

              text-xl

              text-gray-600
            "
          >
            Join The Conclusion Daily and transform
            consistency into achievement.
          </p>

          <Link
            href="/signup"
            className="
              inline-block

              mt-10

              px-10
              py-4

              rounded-2xl

              bg-gradient-to-r
              from-[#D4AF37]
              to-[#F2D27A]

              text-[#12355B]

              font-black
            "
          >
            Join TCD Today
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        className="
          py-8

          border-t

          text-center

          text-gray-500
        "
      >
        © 2026 The Conclusion Daily. All Rights Reserved.
      </footer>

    </main>
  );
}
