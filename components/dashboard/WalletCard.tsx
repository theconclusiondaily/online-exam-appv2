import TCDIcon from "@/components/brand/TCDIcon";

interface WalletCardProps {
  balance: number;
  lifetime: number;
  lastEarned: number;
}

export default function WalletCard({
  balance,
  lifetime,
  lastEarned,
}: WalletCardProps) {
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
            alt="TCD Vault"
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
            TCD Vault
          </h2>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Your earned credits
          </p>

        </div>

      </div>

      {/* Balance */}

      <div className="mb-3">

        <div
          className="
            text-4xl
            font-black
            tracking-tight
            text-tcd-blue
          "
        >
          {balance}
        </div>

        <div
          className="
            mt-2
            text-gray-500
          "
        >
          Current Balance
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
            Last Earned
          </span>

          <span
            className="
              font-bold
              text-green-600
            "
          >
            +{lastEarned} TCD
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
            Lifetime Earned
          </span>

          <span
            className="
              font-bold
              text-tcd-blue
            "
          >
            {lifetime} TCD
          </span>

        </div>

      </div>

      {/* Footer Badge */}

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
          The Conclusion Daily Credits Wallet
        </p>

      </div>

    </div>
  );
}