import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function VerifyPage({
  params,
}: {
  params: Promise<{
    certificateNumber: string;
  }>;
}) {
  const supabase = await createClient();

  const { certificateNumber } = await params;

  const {
    data: certificate,
  } = await supabase
    .from("certificates")
    .select("*")
    .eq(
      "certificate_number",
      certificateNumber
    )
    .single();

  if (!certificate) {
    notFound();
  }

  const {
    data: student,
  } = await supabase
    .from("users")
    .select(`
      name,
      prestige_level
    `)
    .eq(
      "id",
      certificate.user_id
    )
    .single();

  const {
    data: exam,
  } = await supabase
    .from("exams")
    .select("title")
    .eq(
      "id",
      certificate.exam_id
    )
    .single();

  const {
    data: attempt,
  } = await supabase
    .from("exam_attempts")
    .select(`
      score,
      percentage
    `)
    .eq(
      "exam_id",
      certificate.exam_id
    )
    .eq(
      "user_id",
      certificate.user_id
    )
    .order(
      "submitted_at",
      {
        ascending: false,
      }
    )
    .limit(1)
    .single();

  return (
    <main
      className="
        min-h-screen

        bg-[#243B6B]

        flex

        items-center

        justify-center

        p-6
      "
    >
      <div
        className="
          max-w-2xl

          w-full

          rounded-3xl

          bg-[#1A2E57]

          border-4

          border-[#D4AF37]

          p-10

          text-center

          shadow-2xl
        "
      >
        <img
          src="/logo.png"
          className="w-20 h-20 mx-auto mb-6"
          alt=""
        />

        <img
          src="/icons/tcd-shield.svg"
          className="w-14 h-14 mx-auto mb-4"
          alt=""
        />

        <h1
          className="
            text-4xl

            font-black

            text-[#D4AF37]
          "
        >
          VERIFIED
        </h1>

        <p className="text-tcd-muted mt-2">
          This certificate is authentic and issued by
          The Conclusion Daily.
        </p>

        <div
          className="
            mt-10

            grid

            grid-cols-2

            gap-6
          "
        >
          <Info
            label="Student"
            value={student?.name}
          />

          <Info
            label="Exam"
            value={exam?.title}
          />

          <Info
            label="Score"
            value={String(
              attempt?.score ?? 0
            )}
          />

          <Info
            label="Percentage"
            value={`${attempt?.percentage ?? 0}%`}
          />

          <Info
            label="Prestige"
            value={
              student?.prestige_level ??
              "Scholar"
            }
          />

          <Info
            label="Certificate ID"
            value={
              certificate.certificate_number
            }
          />
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div
      className="
        rounded-2xl

        bg-white/10

        border

        border-white/10

        p-4
      "
    >
      <p className="text-sm text-[#243B6B]/70">
        {label}
      </p>

      <p
        className="
          mt-2

          text-lg

          font-bold

          text-[#E6C15A]
        "
      >
        {value}
      </p>
    </div>
  );
}