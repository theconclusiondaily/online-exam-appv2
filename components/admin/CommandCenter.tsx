"use client";

import { TCDIcons } from "@/components/ui/tcd-icons";

interface Props {
  liveExams: number;
  totalAttempts: number;
  totalUsers: number;
}

export default function CommandCenter({
  liveExams,
  totalAttempts,
  totalUsers,
}: Props) {
  const cards = [
    {
      title: "Live Exams",
      value: liveExams,
      subtitle: "Currently Running",
      icon: TCDIcons.mastery,
      color: "bg-green-500",
    },
    {
      title: "Students Online",
      value: totalUsers,
      subtitle: "Platform Users",
      icon: TCDIcons.fire,
      color: "bg-blue-600",
    },
    {
      title: "Attempts",
      value: totalAttempts,
      subtitle: "Total Exam Attempts",
      icon: TCDIcons.achievement,
      color: "bg-[#D4AF37]",
    },
  ];

  return (
    <section className="mb-10">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-tcd-gold">

          {TCDIcons.mastery}

        </div>

        <h2 className="text-3xl font-black text-tcd-blue">

          Live Command Center

        </h2>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-[30px] shadow-lg border border-tcd-gold/10 p-8"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-brand">

                  {card.title}

                </p>

                <h2 className="text-5xl font-black text-tcd-blue mt-2">

                  {card.value}

                </h2>

                <p className="mt-3 text-brand">

                  {card.subtitle}

                </p>

              </div>

              <div
                className={`${card.color}
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                text-white`}
              >

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <div
          className="
            bg-white
            rounded-[30px]
            border
            border-tcd-gold/10
            shadow-lg
            p-8
          "
        >

          <div className="flex items-center gap-3 mb-6">

            {TCDIcons.target}

            <h3 className="text-2xl font-black text-tcd-blue">

              System Status

            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>API Server</span>

              <span className="text-green-600 font-bold">

                Healthy

              </span>

            </div>

            <div className="flex justify-between">

              <span>Database</span>

              <span className="text-green-600 font-bold">

                Connected

              </span>

            </div>

            <div className="flex justify-between">

              <span>Realtime Engine</span>

              <span className="text-green-600 font-bold">

                Active

              </span>

            </div>

            <div className="flex justify-between">

              <span>Exam Engine</span>

              <span className="text-green-600 font-bold">

                Running

              </span>

            </div>

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-[30px]
            border
            border-tcd-gold/10
            shadow-lg
            p-8
          "
        >

          <div className="flex items-center gap-3 mb-6">

            {TCDIcons.rank}

            <h3 className="text-2xl font-black text-tcd-blue">

              Today's Overview

            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Live Exams</span>

              <strong>{liveExams}</strong>

            </div>

            <div className="flex justify-between">

              <span>Total Attempts</span>

              <strong>{totalAttempts}</strong>

            </div>

            <div className="flex justify-between">

              <span>Registered Users</span>

              <strong>{totalUsers}</strong>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}