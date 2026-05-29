import TCDIcon from "@/components/brand/TCDIcon";

interface LoginStreakCardProps {
  current: number;
  longest: number;
}

export default function LoginStreakCard({
  current,
  longest,
}: LoginStreakCardProps) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-7
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300

        border
        border-gray-100
      "
    >
      {/* Header */}

      <div className="flex items-center gap-2 mb-3">

        <div
          className="
            w-14
            h-14
            rounded-2xl

            bg-[#EEF3FF]

            flex
            items-center
            justify-center

            border
            border-blue-200
          "
        >
          <TCDIcon
            src="/icons/mount-kilimanjaro.svg"
            alt="Journey Streak"
            size={42}
          />
        </div>

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-tcd-blue
            "
          >
            Journey Streak
          </h2>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Every login is a step toward excellence
          </p>

        </div>

      </div>

      {/* Main Number */}

      <div className="mb-3">

        <div
          className="
            text-2xl
            font-black
            tracking-tight
            text-tcd-blue
          "
        >
          {current}
        </div>

        <div
          className="
            mt-2
            text-gray-500
          "
        >
          Current Login Streak
        </div>

      </div>

      {/* Progress Visual */}

      <div className="mb-3">

        <div
          className="
            h-3
            bg-gray-200
            rounded-full
            overflow-hidden
          "
        >

          <div
            className="
              h-full
              bg-gradient-to-r
              from-tcd-blue
              to-[#5D84C6]
              rounded-full
              transition-all
              duration-500
            "
            style={{
              width: `${Math.min(
                (current / Math.max(longest || 1, current || 1)) * 100,
                100
              )}%`,
            }}
          />

        </div>

      </div>

      {/* Stats */}

      <div className="space-y-4">

        <div
          className="
            flex
            justify-between
            items-center

            bg-gray-50
            rounded-2xl
            p-3
          "
        >

          <span className="text-gray-600">
            Longest Journey
          </span>

          <span
            className="
              font-bold
              text-tcd-blue
            "
          >
            {longest} Days
          </span>

        </div>

        <div
          className="
            flex
            justify-between
            items-center

            bg-gray-50
            rounded-2xl
            p-3
          "
        >

          <span className="text-gray-600">
            Commitment Status
          </span>

          <span
            className="
              font-bold
              text-green-600
            "
          >
            Active
          </span>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          mt-6

          bg-gradient-to-r
          from-[#EEF3FF]
          to-[#FFF8EA]

          rounded-2xl
          p-3

          text-center
        "
      >

        <p
          className="
            text-sm
            font-semibold
            text-tcd-blue
          "
        >
          Great journeys are built one day at a time
        </p>

      </div>

    </div>
  );
}