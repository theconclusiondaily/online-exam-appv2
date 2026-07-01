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
<div className="mt-5">

  <span
    className="
      inline-flex
      items-center
      gap-2

      px-5
      py-2

      rounded-full

      bg-green-500/20

      border

      border-green-400

      text-green-300

      font-bold
    "
  >
    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>

    Official Certificate Verified

  </span>

</div>
        <p className="text-white/80 mt-2">
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
          <Info
  label="Issued On"
  value={new Date(certificate.issued_at).toLocaleDateString("en-GB")}
/>

        </div>
        <div
  className="
    mt-10

    rounded-2xl

    border

    border-[#D4AF37]/30

    bg-white/5

    p-5
  "
>

  <h3
    className="
      text-[#E6C15A]

      font-bold

      text-lg
    "
  >
    Digital Verification
  </h3>

  <p className="mt-3 text-white/80 leading-7">

    This certificate has been digitally verified against
    the official records of

    <span className="font-bold text-[#E6C15A]">
      {"  "}THE CONCLUSION DAILY{"  "}
    </span>

    and is authentic.

  </p>

</div>
<div
  className="
    mt-10

    border-t

    border-[#D4AF37]/30

    pt-6

    text-center
  "
>

  <img
    src="/logo.png"
    className="w-14 h-14 mx-auto"
    alt=""
  />

  <p className="mt-4 text-white/60">

    Need help verifying this certificate?
    Contact Us on

  </p>

  <a
    href="mailto:support@theconclusiondaily.com"
    className="
      text-[#E6C15A]

      font-bold

      hover:underline
    "
  >
    admin@theconclusiondaily.com
  </a>

  <p className="mt-4 text-white/40 text-sm">
    © 2026 THE CONCLUSION DAILY
  </p>

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
      <p className="text-sm text-white/60">
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
