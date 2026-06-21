import TCDIcon from "@/components/brand/TCDIcon";

interface DailyRewardCardProps {
  rewardClaimed: boolean;
  onClaim: () => void;
}

export default function DailyRewardCard({
  rewardClaimed,
  onClaim,
}: DailyRewardCardProps) {
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

            bg-[#FFF8EA]

            flex
            items-center
            justify-center

            border
            border-[#E6C06E]/30
          "
        >
          <TCDIcon
            src="/icons/tcd-coin.svg"
            alt="Daily Reward"
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
            Daily Reward
          </h2>

          <p
            className="
              text-sm
              text-tcd-primary
            "
          >
            Claim your daily TCD bonus
          </p>

        </div>

      </div>

      {/* Reward Display */}

      <div className="mb-3">

        <div
          className="
            text-2xl
            font-black
            tracking-tight
            text-[#D4A017]
          "
        >
          +5
        </div>

        <div
          className="
            mt-2
            text-tcd-primary
          "
        >
          Daily TCD Credits
        </div>

      </div>

      {/* Status Box */}

      <div
        className="
          bg-gray-50
          rounded-2xl
          p-4
          mb-3
        "
      >

        <div className="flex justify-between">

          <span className="text-brand">
            Status
          </span>

          <span
            className={`
              font-bold

              ${
                rewardClaimed
                  ? "text-green-600"
                  : "text-amber-600"
              }
            `}
          >
            {rewardClaimed
              ? "Claimed"
              : "Available"}
          </span>

        </div>

      </div>

      {/* Action Button */}

      {rewardClaimed ? (

        <button
          disabled
          className="
            w-full

            bg-green-100
            text-green-700

            py-3
            rounded-2xl

            font-bold
            cursor-not-allowed
          "
        >
          Reward Claimed ✓
        </button>

      ) : (

        <button
          onClick={onClaim}
          className="
            w-full

            bg-tcd-gold
            hover:bg-[#D4AF37]

            text-tcd-blue

            py-3
            rounded-2xl

            font-bold

            transition-all
            duration-300
          "
        >
          Claim Reward
        </button>

      )}

      {/* Footer */}

      <div
        className="
          mt-6

          bg-gradient-to-r
          from-[#FFF8EA]
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
          Consistency builds excellence
        </p>

      </div>

    </div>
  );
}