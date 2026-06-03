import Link from "next/link";
import TCDIcon from "@/components/brand/TCDIcon";

interface Props {
  liveExams: any[];
}

export default function LiveExamsSection({
  liveExams,
}: Props) {

  return (

    <div className="mb-4">

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
          Active Opportunities
        </h2>

        <p className="text-gray-500 mt-1">
          Participate in live exams and earn rewards.
        </p>

      </div>

      {/* Empty State */}

      {liveExams.length === 0 ? (

        <div
          className="
            bg-white
            rounded-2xl
            p-12

            border
            border-gray-100

            shadow-sm

            text-center
          "
        >

          <div className="flex justify-center mb-2">

            <TCDIcon
              src="/icons/learning-journey.svg"
              alt="No Exams"
              size={72}
            />

          </div>

          <h3
            className="
              text-2xl
              font-bold
              text-tcd-blue
            "
          >
            No Active Opportunities
          </h3>

          <p className="text-gray-500 mt-3">

            New exams will appear here when published.

          </p>

        </div>

      ) : (

        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-3
          "
        >

          {liveExams.map((exam) => (

            <div
              key={exam.id}
              className="
                bg-white

                rounded-2xl

                p-6

                border
                border-gray-100

                shadow-md

                hover:shadow-xl
                hover:-translate-y-1

                transition-all
                duration-300
              "
            >

              {/* Badge */}

              <div className="flex justify-between items-start mb-2">

                <span
                  className="
                    bg-green-100
                    text-green-700

                    px-3
                    py-1

                    rounded-full

                    text-sm
                    font-semibold
                  "
                >
                🔴 LIVE NOW
                </span>

                <div
                  className="
                    bg-[#FFF8EA]

                    px-3
                    py-1

                    rounded-full

                    text-tcd-blue
                    font-bold
                  "
                >
                  ₹ {exam.reward_pool || 0}
                </div>

              </div>

              {/* Title */}

              <h3
                className="
                  text-xl
                  font-bold
                  text-tcd-blue
                  mb-3
                "
              >
                {exam.title}
              </h3>

              {/* Description */}

              <p
                className="
                  text-gray-500
                  text-sm
                  mb-2
                  line-clamp-3
                "
              >
                {exam.description ||
                  "Test your knowledge and compete with learners across the platform."}
              </p>

              {/* Details */}

              <div className="space-y-3 mb-3">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Duration
                  </span>

                  <span className="font-semibold">
                    {exam.duration || 0} mins
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Ends
                  </span>

                  <span className="font-semibold">

                    {new Date(
                      exam.end_time
                    ).toLocaleString("en-IN")}

                  </span>

                </div>

              </div>

              {/* CTA */}

              <Link
  href={`/exam/${exam.id}/intro`}
  className="
    block
    w-full
    bg-tcd-blue
    hover:bg-[#3F5D94]
    text-white
    py-3
    rounded-2xl
    text-center
    font-bold
    transition-all
  "
>
  Begin  Challenge
</Link>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}