"use client";

export default function AuthHero() {
  return (
    <div
      className="
        hidden
        lg:flex

        flex-col
        justify-between

        relative
        overflow-hidden

        bg-gradient-to-br
        from-[#203B63]
        via-[#35548C]
        to-[#4D6FAF]

        text-white

        p-14
      "
    >
      {/* Watermark */}

      <img
        src="/logo.png"
        alt="TCD"
        className="
          absolute
          right-[-80px]
          top-[-60px]

          w-[700px]
          h-[700px]

          opacity-[0.07]

          pointer-events-none
        "
      />

      {/* Header */}

      <div>

        <img
          src="/logo.png"
          alt="TCD"
          className="w-28 mb-4"
        />

        <p
          className="
            text-[#D4AF37]
            font-black
            tracking-[0.25em]
            uppercase
            mb-2
          "
        >
          Hope • Faith • Excellence
        </p>

        <h1
          className="
            text-2xl
            font-black
            leading-tight
            mb-4
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
            text-white/80
            text-xl
            max-w-xl
            leading-relaxed
          "
        >
          Transform knowledge into
          achievement through
          competitive exams,
          rewards, rankings,
          streaks and continuous
          growth.
        </p>

      </div>

      {/* Feature Cards */}

      <div className="space-y-5">

        <div
          className="
            bg-white/10
            backdrop-blur-md

            border
            border-white/10

            rounded-3xl

            p-6
          "
        >
          <h3
            className="
              text-[#D4AF37]
              font-black
              text-lg
              mb-2
            "
          >
            🌱 Banyan Growth
          </h3>

          <p className="text-white/80">
            Every day of learning
            strengthens your
            foundation.
          </p>
        </div>

        <div
          className="
            bg-white/10
            backdrop-blur-md

            border
            border-white/10

            rounded-3xl

            p-6
          "
        >
          <h3
            className="
              text-[#D4AF37]
              font-black
              text-lg
              mb-2
            "
          >
            🏆 Achievement System
          </h3>

          <p className="text-white/80">
            Earn rewards,
            rankings and
            recognition for
            excellence.
          </p>
        </div>

        <div
          className="
            bg-white/10
            backdrop-blur-md

            border
            border-white/10

            rounded-3xl

            p-6
          "
        >
          <h3
            className="
              text-[#D4AF37]
              font-black
              text-lg
              mb-2
            "
          >
            🪙 TCD Credits Wallet
          </h3>

          <p className="text-white/80">
            Convert consistency
            into rewards and
            progress.
          </p>
        </div>

      </div>
    </div>
  );
}