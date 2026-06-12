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
    p-[6px]

    rounded-[38px]

    bg-gradient-to-br

    from-[#FFF4B0]

    via-[#D4AF37]

    to-[#9A7315]

    shadow-[0_0_60px_rgba(212,175,55,0.25)]

    max-w-4xl

    w-full
  "
>
       <div
        className="
        relative
        
    overflow-hidden
          
          w-full

          bg-gradient-to-br
from-[#243B6B]
to-[#1A2E57]

          rounded-[30px]

          border-[2px]
border-[#F5E6A5]
shadow-2xl
p-6 md:p-16

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

    inset-4

    rounded-[24px]

    border

    border-[#E6C15A]/35

    pointer-events-none
  "
/>
        <img
  src="/icons/tcd-crown.svg"
  className="absolute top-6 left-6 w-10 h-10 opacity-20"
/>

<img
  src="/icons/tcd-crown.svg"
  className="absolute top-6 right-6 w-10 h-10 rotate-90 opacity-20"
/>

<img
  src="/icons/tcd-crown.svg"
  className="absolute bottom-6 left-6 w-10 h-10 -rotate-90 opacity-20"
/>

<img
  src="/icons/tcd-crown.svg"
  className="absolute bottom-6 right-6 w-10 h-10 rotate-180 opacity-20"
/>
        
  <div
  className="
    absolute

    top-6
    left-6

    px-4
    py-3

    rounded-2xl

    bg-black/20

    backdrop-blur-md

    border

    border-[#D4AF37]/30
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

    px-4
    py-3

    rounded-2xl

    bg-black/20

    backdrop-blur-md

    border

    border-[#D4AF37]/30
  "
>

  <p
    className="
text-[#E6C15A]

font-black

tracking-wider

text-lg
"
  >
    ISSUED ON
  </p>

  <p
   className="
text-[#E6C15A]

font-black

tracking-wider

text-lg
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
  w-[720px]
  h-[720px]
  object-contain
  opacity-[0.05]
select-none
"

  />
  </div>
        <div className="text-center">

         <div className="relative inline-flex">

  <div
    className="
      absolute

      inset-0

      blur-3xl

      bg-[#D4AF37]/20

      rounded-full
    "
  />

  <img
    src="/logo.png"
    className="
      relative

      w-24
      h-24

      mx-auto
    "
    alt="TCD"
  />

</div>

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
              text-[#D4AF37]

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

          <p className="text-gray-300 mt-6">
  This certificate is awarded to
</p>

<p className="text-gray-300 mt-2">
  For successfully participating in
</p>

<h3
  className="
    text-3xl
    md:text-4xl

    font-bold

    text-white

    mt-3
  "
>
  {exam?.title}
</h3>

<div className="flex justify-center mt-6">

  <div className="w-48 h-[2px] bg-[#D4AF37]" />

</div>

<h2
  className="
    text-5xl

    md:text-7xl

    font-black

    tracking-[0.18em]

    uppercase

    text-[#E6C15A]

    mt-6
  "
>
  {student?.name}
</h2>

<div className="flex justify-center mt-5">

  <div className="w-72 h-[2px] bg-[#D4AF37]" />

</div>
<div
  className="
    grid
   grid-cols-2 md:grid-cols-4

    gap-6

    max-w-3xl

    mx-auto

    mt-12
  "
>

  <div
 className="
bg-white/10

backdrop-blur-md

rounded-3xl

p-6

border

border-[#D4AF37]/20

shadow-xl

transition-all

duration-300

hover:scale-105

hover:border-[#D4AF37]/50
"
>
<img
  src="/icons/tcd-medal.svg"
  className="w-8 h-8 mx-auto mb-3"
/>
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

backdrop-blur-md

rounded-3xl

p-6

border

border-[#D4AF37]/20

shadow-xl

transition-all

duration-300

hover:scale-105

hover:border-[#D4AF37]/50
"
>
<img
  src="/icons/tcd-crown.svg"
  className="w-8 h-8 mx-auto mb-3"
/>
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

backdrop-blur-md

rounded-3xl

p-6

border

border-[#D4AF37]/20

shadow-xl

transition-all

duration-300

hover:scale-105

hover:border-[#D4AF37]/50
"
>
<img
  src="/icons/tcd-star.svg"
  className="w-8 h-8 mx-auto mb-3"
/>
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
<div
 className="
bg-white/10

backdrop-blur-md

rounded-3xl

p-6

border

border-[#D4AF37]/20

shadow-xl

transition-all

duration-300

hover:scale-105

hover:border-[#D4AF37]/50
"
>

  <img
    src="/icons/tcd-shield.svg"
    className="w-8 h-8 mx-auto mb-3"
  />

  <p className="text-gray-300">

    Verified

  </p>

  <p
    className="
      text-[#E6C15A]

      font-black

      text-xl
    "
  >

    TCD

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
h-24
md:h-28

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

  <div className="flex justify-center items-center gap-3 mt-4">

  <img
    src="/icons/tcd-crown.svg"
    className="w-8 h-8"
    alt=""
  />

  <span
    className="
      text-[#E6C15A]

      font-black

      tracking-[0.35em]

      uppercase
    "
  >
    The Conclusion Daily
  </span>

  <img
    src="/icons/tcd-crown.svg"
    className="w-8 h-8"
    alt=""
  />

</div>

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
<div className="space-y-2">

  <p
    className="
      text-[#E6C15A]

      font-bold

      tracking-[0.25em]

      uppercase
    "
  >

    Recognizing Excellence

  </p>

  <p className="text-gray-300">

    Inspiring Success • Building Futures

  </p>

</div>
        {/* NEXT STEPS */}

<div className="mt-12 flex flex-col print:hidden">
<div
  className="
    mt-12

    rounded-3xl

    border

    border-[#D4AF37]/30

    bg-white/5

    backdrop-blur-sm

    p-6

    text-center
  "
>

  <img
    src="/icons/tcd-medal.svg"
    className="w-12 h-12 mx-auto mb-4"
    alt=""
  />

  <h3
    className="
      text-xl

      font-black

      text-[#E6C15A]
    "
  >

    Officially Certified

  </h3>

  <p className="text-gray-300 mt-2">

    This achievement is now part of your permanent TCD academic record.

  </p>

</div>
  

  <div
    className="
      flex
     flex-col
md:flex-row

      justify-center

      gap-4
    "
  >

    <PrintButton />

    <a
      href="/dashboard?tab=profile"
      className="
        flex
        items-center

        gap-3

        px-6
        py-4

        rounded-2xl

        bg-[#D4AF37]

        text-[#243B6B]

        font-bold

        hover:scale-105

        transition
      "
    >

      <img
        src="/icons/tcd-crown.svg"
        className="w-6 h-6"
        alt=""
      />

      My Profile

    </a>

    <a
      href="/dashboard"
      className="
        flex
        items-center

        gap-3

        px-6
        py-4

        rounded-2xl

        bg-white/10

        border

        border-[#D4AF37]/30

        text-white

        font-bold

        hover:bg-white/20

        transition
      "
    >

      <img
        src="/icons/tcd-target.svg"
        className="w-6 h-6"
        alt=""
      />

      Continue Learning

    </a>

  </div>


  <div className="flex justify-center mt-4">

  <a
    href="/dashboard"
    className="
      relative

      flex
      items-center
      justify-center

      w-56
      h-14

      rounded-2xl

      bg-[#243B6B]

      border
      border-[#D4AF37]

      text-white

      font-bold

      shadow-lg

      hover:bg-[#1A2E57]

      transition
    "
  >

    <img
      src="/icons/tcd-shield.svg"
      className="
        absolute
        left-5

        w-5
        h-5
      "
      alt=""
    />

    Dashboard

  </a>

</div>

 

</div>
<div
  className="
    absolute

    bottom-6
    right-14
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
</div>
    </main>

  );
}