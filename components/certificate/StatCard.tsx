interface Props {
  title: string;
  value: string | number;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        min-h-[90px]

        rounded-2xl

        bg-white/10

        border

        border-[#D4AF37]/30

        backdrop-blur-md

        p-4

        flex

        flex-col

        items-center

        justify-center
      "
    >
      <p
        className="
          text-[10px]

          uppercase

          tracking-wider

          text-white/60

          font-semibold
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-2

          text-xl

          font-black

          text-[#E6C15A]

          leading-none

          text-center
        "
      >
        {value}
      </h3>
    </div>
  );
}