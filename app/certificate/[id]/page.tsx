import { notFound } from "next/navigation";
import { createClient }
from "@/lib/supabase/server";
import PrintButton from
"@/components/certificate/PrintButton";
export default async function CertificatePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
})  {

  const supabase =
    await createClient();
const { id } =
  await params;
const {
  data: certificate,
  error: certificateError,
} = await supabase

  .from("certificates")

  .select("*")

  .eq("id", id)

  .single();

if (
  certificateError ||
  !certificate
) {
  notFound();
}
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
    { ascending: false }
  )

  .limit(1)

  .single();
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

  if (!certificate)
    notFound();

  return (

    <main
            className="
  min-h-screen
  bg-[#243B6B]
  flex
  items-center
  justify-center
  p-6

  print:bg-white
  print:p-0
"
    >
        
       <div
        className="
        relative
    overflow-hidden
          max-w-4xl
          w-full

          bg-gradient-to-br
from-[#243B6B]
to-[#1A2E57]

          rounded-[32px]

          border-[12px]
border-[#D4AF37]
shadow-2xl
p-16

print:w-full
print:max-w-none
print:w-full
print:max-w-none
print:min-h-0
print:h-auto
print:rounded-none
print:shadow-none
print:p-8
print:rounded-none
print:shadow-none
print:border-[10px]
print:overflow-hidden
print:bg-[#243B6B]
print:text-white
        "
      >
        <div
  className="
    absolute

    top-6
    left-6
  "
>

  <p
    className="
      text-[#E6C15A]

      font-bold

      text-sm

      tracking-wide
    "
  >
    CERTIFICATE ID
  </p>

  <p
    className="
      text-[#E6C15A]

      font-black
    "
  >
    {certificate.certificate_number}
  </p>

</div>
<div
  className="
    absolute

    top-6
    right-6

    text-right
  "
>

  <p
    className="
      text-[#E6C15A]

      font-bold

      text-sm

      tracking-wide
    "
  >
    ISSUED ON
  </p>

  <p
    className="
      text-[#E6C15A]

      font-black
    "
  >
    {new Date(
      certificate.issued_at
    ).toLocaleDateString("en-IN")}
  </p>

</div>
<div className="absolute inset-0 flex items-center justify-center pointer-events-none">

  <img
    src="/logo.png"
    alt="TCD Watermark"
    className="
  w-[950px]
  h-[950px]
  object-contain
  opacity-[0.04]

"

  />
  </div>
        <div className="text-center">

          <img
            src="/logo.png"
            alt="TCD"
            className="
              w-24
              h-24

              mx-auto

              mb-4
            "
          />

          <img
            src="/icons/achievement-medal.svg"
            alt="Certificate"
            className="
              w-16
              h-16

              mx-auto

              mb-4
            "
          />
 <p
            className="
              text-gray-700

              mt-4
            "
          >
            The Conclusion Daily
          </p>
          <h1
            className="
              text-4xl
              font-black

              text-[#D4AF37]
            "
          >
            Certificate of Achievement
          </h1>
          

        </div>

        <div className="text-center mt-10">

          <p className="text-gray-700">
            This certificate is awarded to
          </p>

          <h2
            className="
              text-7xl tracking-wide
              font-black

              text-[#D4AF37]

              mt-3
            "
          >
            {student?.name}
          </h2>

        </div>

        <div className="text-center mt-10">

          <p className="text-gray-700">
            For successfully participating in
          </p>

          <h3
            className="
              text-3xl
              font-bold

              text-tcd-gold

              mt-3
            "
          >
            {exam?.title}
          </h3>
<div
  className="
    grid
    grid-cols-3

    gap-6

    max-w-3xl

    mx-auto

    mt-12
  "
>

  <div
  className="
    bg-white/10

    backdrop-blur-sm

    rounded-2xl

    p-5

    border
    border-white/20
  "
>

  <p className="text-gray-300">
    Score
  </p>

  <p
    className="
      text-4xl

      font-black

      text-[#E6C15A]
    "
  >
    {attempt?.score ?? 0}
  </p>

</div>
<div
  className="
    bg-white/10

    backdrop-blur-sm

    rounded-2xl

    p-5

    border
    border-white/20
  "
>

  <p className="text-gray-300">
    Prestige
  </p>

  <p
    className="
      text-2xl

      font-black

      text-[#E6C15A]
    "
  >
    {student?.prestige_level ??
      "Scholar"}
  </p>

</div>

  <div
  className="
    bg-white/10

    backdrop-blur-sm

    rounded-2xl

    p-5

    border
    border-white/20
  "
>

  <p className="text-gray-300">
    Percentage
  </p>

  <p
    className="
      text-4xl

      font-black

      text-[#E6C15A]
    "
  >
    {attempt?.percentage ?? 0}%
  </p>

</div>

</div>
        </div>

        <div
          className="
            grid
            md:grid-cols-1

            gap-6

            mt-12
          "
        >
        
          
          
<div
  className="
    flex
    justify-between
    items-end

    mt-20
    w-full
  "
>

  {/* Signature */}

  <div>

    <img
      src="/signature.png"
      alt="Founder Signature"
      className="
        h-25
        object-contain
      "
    />

    <div
      className="
        border-t-2
        border-[#E6C15A]

        w-64

        mt-2
      "
    />

   <p
  className="
    font-bold
    text-[#E6C15A]
  "
>
  The Conclusion Daily
</p>

<p className="text-gray-300">
  Official Certification Authority
</p>

  </div>

  {/* Seal */}

  <div
    className="
      flex
      justify-end
      flex-1
    "
  >

    <img
      src="/logo.png"
      alt="Official Seal"
      className="
        w-32
        h-32

        object-contain

        opacity-90
      "
    />

  </div>

</div>
        </div>
<div
  className="
    mt-10

    text-center

    text-sm

    text-gray-300
  "
>

  © The Conclusion Daily 2026

</div>
        <div className="mt-10 text-center">

          <PrintButton />

        </div>
<div
  className="
    absolute

    bottom-6
    right-8
  "
>

  <span
    className="
      text-6xl

      font-black

      text-[#D4AF37]/30

      tracking-widest
    "
  >
    TCD
  </span>

</div>
      </div>

    </main>

  );
}