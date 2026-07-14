"use client";

import { CertificateData } from "./types";
import {
  formatPercentage,
  formatRank,
  prestigeLabel,
} from "./utils";

interface Props {
  data: CertificateData;
}

export default function CertificateStats({
  data,
}: Props) {

  const stats = [

    {
      title: "Score",
      value: data.score,
    },

    {
      title: "Percentage",
      value: formatPercentage(
        data.percentage
      ),
    },

    {
      title: "Prestige",
      value: prestigeLabel(
        data.prestige
      ),
    },

    {
      title: "Rank",
      value: formatRank(
        data.rank
      ),
    },

  ];

  return (

    <section
      className="
        mt-12

        px-20
      "
    >

      <div
        className="
          grid

          grid-cols-2

          gap-6
        "
      >

        {stats.map((item) => (

          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
          />

        ))}

      </div>

    </section>

  );

}

interface CardProps {

  title: string;

  value: string | number;

}

function StatCard({

  title,

  value,

}: CardProps) {

  return (

    <div
      className="
        rounded-3xl

        border

        border-[#D4AF37]/30

        bg-white/10

        backdrop-blur-md

        p-6

        min-h-[130px]

        flex

        flex-col

        justify-center

        items-center
      "
    >

      <p
        className="
          uppercase

          tracking-[0.25em]

          text-xs

          text-white/60

          font-semibold
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-4

          text-3xl

          font-black

          text-[#E6C15A]

          text-center

          break-words

          leading-tight
        "
      >
        {value}
      </h3>

    </div>

  );

}