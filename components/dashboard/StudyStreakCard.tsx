import TCDIcon from "@/components/brand/TCDIcon";

interface StudyStreakCardProps {
  current: number;
  longest: number;
  nextMilestone: number | null;
  progressPercent: number;
}

export default function StudyStreakCard({
  current,
  longest,
  nextMilestone,
  progressPercent,
}: StudyStreakCardProps) {
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

            bg-[#EEF8F0]

            flex
            items-center
            justify-center

            border
            border-green-200
          "
        >
          <TCDIcon
            src="/icons/banyan-tree.svg"
            alt="Growth Streak"
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
            Growth Streak
          </h2>

          <p
            className="
              text-sm
              text-gray-700
            "
          >
            Consistent learning builds mastery
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
            text-green-600
          "
        >
          {current}
        </div>

        <div
          className="
            mt-2
            text-gray-700
          "
        >
          Current Study Streak
        </div>

      </div>

      {/* Progress */}

      <div className="mb-3">

        <div
          className="
            flex
            justify-between
            mb-2
            text-sm
          "
        >

          <span className="text-gray-700">
            Progress to Next Milestone
          </span>

          <span className="font-semibold text-tcd-blue">
            {nextMilestone
              ? `${nextMilestone} Days`
              : "Completed"}
          </span>

        </div>

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
              from-green-500
              to-green-400
              rounded-full
              transition-all
              duration-500
            "
            style={{
              width: `${progressPercent}%`,
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
            Longest Streak
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
            Next Milestone
          </span>

          <span
            className="
              font-bold
              text-green-600
            "
          >
            {nextMilestone
              ? `${nextMilestone} Days`
              : "Legend Status"}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          mt-6

          bg-gradient-to-r
          from-[#EEF8F0]
          to-[#EEF3FF]

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
          Every day of learning strengthens your foundation
        </p>

      </div>

    </div>
  );
}