import Link from "next/link";
import TCDIcon from "@/components/brand/TCDIcon";

interface Props {
  liveExams: any[];
}

export default function LiveExamsSection({
  liveExams,
}: Props) {
const arenaExams =
  liveExams.filter(
    (exam) =>
      exam.exam_scope ===
      "PUBLIC"
  );
const dailyChallenges =
  arenaExams.filter(
    (exam) =>
      exam.challenge_type ===
      "DAILY"
  );

const weeklyChallenges =
  arenaExams.filter(
    (exam) =>
      exam.challenge_type ===
      "WEEKLY"
  );

const monthlyChallenges =
  arenaExams.filter(
    (exam) =>
      exam.challenge_type ===
      "MONTHLY"
  );

const currentAffairsChallenges =
  arenaExams.filter(
    (exam) =>
      exam.challenge_type ===
      "CURRENT_AFFAIRS"
  );

const scholarshipChallenges =
  arenaExams.filter(
    (exam) =>
      exam.challenge_type ===
      "SCHOLARSHIP"
  );
  console.log(
  "Daily",
  dailyChallenges.length
);

console.log(
  "Weekly",
  weeklyChallenges.length
);

console.log(
  "Monthly",
  monthlyChallenges.length
);

console.log(
  "Current Affairs",
  currentAffairsChallenges.length
);

console.log(
  "Scholarship",
  scholarshipChallenges.length
);
const instituteExams =
  liveExams.filter(
    (exam) =>
      exam.exam_scope ===
      "INSTITUTE"
  );
  console.log(
  "Arena Exams",
  arenaExams
);

console.log(
  "Institute Exams",
  instituteExams
);
const renderArenaSection = (
  title: string,
  icon: string,
  exams: any[]
) => {

  if (exams.length === 0)
    return null;

  return (

    <>

      <div className="md:col-span-2 xl:col-span-3 mt-6">

        <div className="flex items-center gap-3 mb-3">

          <img
            src={icon}
            alt={title}
            className="w-10 h-10"
          />

          <h3 className="text-2xl font-black text-tcd-blue">
            {title}
          </h3>

        </div>

      </div>

      {exams.map((exam) => (

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
                  text-gray-700
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

                  <span className="text-gray-700">
                    Duration
                  </span>

                  <span className="font-semibold">
                    {exam.duration || 0} mins
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-700">
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

    </>

  );
};
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
  TCD Exam Arena
</h2>

        <p className="text-gray-700 mt-1">
          Compete in public challenges and institute exams to earn XP, achievements, prestige and TCD credits.
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

          <p className="text-gray-700 mt-3">

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
          
<div className="md:col-span-2 xl:col-span-3">

  <div className="flex items-center gap-3 mb-3">

    <img
      src="/icons/mastery-star.svg"
      alt="Arena"
      className="w-10 h-10"
    />

    <h3 className="text-2xl font-black text-tcd-blue">
      TCD Arena
    </h3>

  </div>

  <p className="text-gray-700 mb-5">
    Daily Challenges, Weekly Challenges,
    Monthly Challenges and Public Competitions.
  </p>

</div>
{renderArenaSection(
  "Daily Challenges",
  "/icons/precision-target.svg",
  dailyChallenges
)}

{renderArenaSection(
  "Weekly Challenges",
  "/icons/mastery-star.svg",
  weeklyChallenges
)}

{renderArenaSection(
  "Monthly Challenges",
  "/icons/achievement-medal.svg",
  monthlyChallenges
)}

{renderArenaSection(
  "Current Affairs Challenges",
  "/icons/learning-journey.svg",
  currentAffairsChallenges
)}

{renderArenaSection(
  "Scholarship Challenges",
  "/icons/rank.svg",
  scholarshipChallenges
)}
          
          {instituteExams.length > 0 && (

  <>

    <div className="md:col-span-2 xl:col-span-3 mt-8">

      <div className="flex items-center gap-3 mb-3">

        <img
          src="/icons/banyan-tree.svg"
          alt="Institute Exams"
          className="w-10 h-10"
        />

        <h3 className="text-2xl font-black text-tcd-blue">
          Institute Exams
        </h3>

      </div>

      <p className="text-gray-700 mb-5">
        Exams available through your institute memberships.
      </p>

    </div>

    {instituteExams.map((exam) => (
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
                  text-gray-700
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

                  <span className="text-gray-700">
                    Duration
                  </span>

                  <span className="font-semibold">
                    {exam.duration || 0} mins
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-700">
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

  </>

)}

        </div>

      )}

    </div>

  );
}