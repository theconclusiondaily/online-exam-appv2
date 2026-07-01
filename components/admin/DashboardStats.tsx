"use client";

import { TCDIcons } from "@/components/ui/tcd-icons";

interface Props {
  totalUsers: number;
  totalTeachers: number;
  totalInstitutes: number;
  totalQuestions: number;
  totalPapers: number;
  totalExams: number;
  liveExams: number;
  totalAttempts: number;
}

export default function DashboardStats({
  totalUsers,
  totalTeachers,
  totalInstitutes,
  totalQuestions,
  totalPapers,
  totalExams,
  liveExams,
  totalAttempts,
}: Props) {
  const cards = [
    {
      title: "Students",
      value: totalUsers,
      icon: TCDIcons.achievement,
      color: "text-tcd-blue",
    },
    {
      title: "Teachers",
      value: totalTeachers,
      icon: TCDIcons.rank,
      color: "text-tcd-gold",
    },
    {
      title: "Institutes",
      value: totalInstitutes,
      icon: TCDIcons.journey,
      color: "text-tcd-blue",
    },
    {
      title: "Question Bank",
      value: totalQuestions,
      icon: TCDIcons.target,
      color: "text-tcd-blue",
    },
    {
      title: "Question Papers",
      value: totalPapers,
      icon: TCDIcons.mastery,
      color: "text-tcd-gold",
    },
    {
      title: "Exams",
      value: totalExams,
      icon: TCDIcons.achievement,
      color: "text-tcd-blue",
    },
    {
      title: "Live Exams",
      value: liveExams,
      icon: TCDIcons.mastery,
      color: "text-green-600",
    },
    {
      title: "Attempts",
      value: totalAttempts,
      icon: TCDIcons.journey,
      color: "text-tcd-gold",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-[28px]
            border
            border-tcd-gold/10
            shadow-lg
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            p-6
          "
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={card.color}>
              {card.icon}
            </div>

            <div>
              <p className="text-brand text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-black text-tcd-blue">
                {card.value}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}