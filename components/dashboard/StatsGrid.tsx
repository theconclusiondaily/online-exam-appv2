import TCDIcon from "@/components/brand/TCDIcon";

interface StatsGridProps {
  stats: {
    totalAttempts: number;
    averageAccuracy: number;
    averagePercentage: number;
    highestScore: number;
    totalCorrect: number;
    totalWrong: number;
  };
}

export default function StatsGrid({
  stats,
}: StatsGridProps) {

  const cards = [

    {
      title: "Learning Journey",
      value: stats.totalAttempts,
      icon: "/icons/learning-journey.svg",
      color: "text-tcd-blue",
      subtitle: "Exams Attempted",
      bg: "from-[#EEF3FF] to-white",
    },

    {
      title: "Precision",
      value: `${stats.averageAccuracy}%`,
      icon: "/icons/precision-target.svg",
      color: "text-green-600",
      subtitle: "Average Accuracy",
      bg: "from-[#EEF8F0] to-white",
    },

    {
      title: "Mastery Index",
      value: `${stats.averagePercentage}%`,
      icon: "/icons/mastery-star.svg",
      color: "text-[#D4A017]",
      subtitle: "Average Percentage",
      bg: "from-[#FFF8EA] to-white",
    },

    {
      title: "Peak Achievement",
      value: stats.highestScore,
      icon: "/icons/achievement-medal.svg",
      color: "text-purple-600",
      subtitle: "Highest Score",
      bg: "from-[#F4F0FF] to-white",
    },

  ];

  return (

    <div className="mb-10">

      {/* Section Header */}

      <div className="mb-3">

        <div
          className="
            h-1
            w-24
            bg-tcd-gold
            rounded-full
            mb-3
          "
        />

        <h2
          className="
            text-3xl
            font-black
            text-tcd-blue
          "
        >
          Performance Overview
        </h2>

        <p className="text-gray-700 mt-1">
          Track your learning growth and mastery.
        </p>

      </div>

      {/* Stats Cards */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-3
        "
      >

        {cards.map((card) => (

          <div
            key={card.title}
            className={`
              bg-gradient-to-br
              ${card.bg}

              rounded-2xl
              p-6

              border
              border-gray-100

              shadow-md
              hover:shadow-xl
              hover:-translate-y-1

              transition-all
              duration-300
            `}
          >

            {/* Icon */}

            <div
              className="
                w-14
                h-14

                rounded-2xl

                bg-white

                flex
                items-center
                justify-center

                shadow-sm
                mb-2
              "
            >

              <TCDIcon
                src={card.icon}
                alt={card.title}
                size={40}
              />

            </div>

            {/* Title */}

            <p
              className="
                text-sm
                text-gray-700
                font-medium
              "
            >
              {card.title}
            </p>

            {/* Value */}

            <h3
              className={`
                text-3xl
                font-black
                tracking-tight
                mt-2

                ${card.color}
              `}
            >
              {card.value}
            </h3>

            {/* Subtitle */}

            <p
              className="
                mt-3
                text-gray-700
                text-sm
              "
            >
              {card.subtitle}
            </p>

          </div>

        ))}

      </div>

      {/* Additional Stats */}

      <div
        className="
          grid
          md:grid-cols-2
          gap-3
          mt-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            p-3

            border
            border-gray-100

            shadow-sm
          "
        >

          <div className="flex justify-between">

            <span className="text-gray-700">
              Correct Answers
            </span>

            <span
              className="
                font-bold
                text-green-600
              "
            >
              {stats.totalCorrect}
            </span>

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            p-3

            border
            border-gray-100

            shadow-sm
          "
        >

          <div className="flex justify-between">

            <span className="text-gray-700">
              Incorrect Answers
            </span>

            <span
              className="
                font-bold
                text-red-500
              "
            >
              {stats.totalWrong}
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}