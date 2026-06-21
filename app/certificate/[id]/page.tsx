import { notFound } from "next/navigation";
import { createClient }
from "@/lib/supabase/server";
import SetCertificateTitle from "@/components/certificate/SetCertificateTitle";
import PrintButton from
"@/components/certificate/PrintButton";
import QRCode from "qrcode";

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
const verificationUrl =
  `https://theconclusiondaily.com/verify/${certificate.certificate_number}`;

const qrCode =
  await QRCode.toDataURL(
    verificationUrl,
    {
      width: 220,
      margin: 1,
    }
  );
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
      <SetCertificateTitle
  studentName={student?.name || "Student"}
  examTitle={exam?.title || "Certificate"}
  issuedDate={new Date(certificate.issued_at).toLocaleDateString("en-GB")}
/>
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
  id="certificate-wrapper"
   className="
    w-[90%]
    mx-auto
    pl-2
    pr-4
  "
>
  

       <div
       id="certificate"
       className="
       certificate-print
relative
overflow-hidden

w-[210mm]
h-[297mm]

mx-auto

bg-gradient-to-br
from-[#243B6B]
to-[#1A2E57]

border-[10px]
border-[#D4AF37]

rounded-none

shadow-none

p-6

print:w-[210mm]
print:h-[297mm]
print:p-8
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
      text-[#FFF4B0]

font-black

tracking-wider

text-lg
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
w-[560px]

h-[560px]

object-contain

opacity-[0.025]

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

      w-16
      h-16

      mx-auto
    "
    alt="TCD"
  />

</div>

          <p
            className="
              text-[#D4AF37]

              mt-4
            "
          >
            The Conclusion Daily
          </p>
          <div className="flex justify-center mb-4">

  <div
    className="
      flex

      items-center

      gap-3

      px-6

      py-2

      rounded-full

      bg-[#D4AF37]/15

      border

      border-[#D4AF37]/30
    "
  >

    <img
      src="/icons/tcd-crown.svg"
      className="w-5 h-5"
      alt=""
    />

    <span
      className="
        text-[#E6C15A]

        text-sm

        font-bold

        tracking-[0.35em]

        uppercase
      "
    >

      Official Recognition

    </span>

    <img
      src="/icons/tcd-crown.svg"
      className="w-5 h-5"
      alt=""
    />

  </div>

</div>
          <div
  className="
    inline-block

    px-10

    py-3

    rounded-full

    bg-gradient-to-r

    from-[#FFF4B0]

    via-[#D4AF37]

    to-[#B88A1B]

    shadow-lg

    mt-2
  "
>

  <h1
    className="
      text-4xl

      font-black

      text-[#243B6B]
    "
  >

    Certificate of Achievement

  </h1>

</div>
          

        </div>

        <div className="text-center mt-5">

          <p className="text-tcd-muted mt-6">
  This certificate is awarded to
</p>



<div className="flex justify-center mt-3  ">

  <div className="relative
inline-block w-48 h-[2px] bg-[#D4AF37]"  />

</div>

<h2
  className={`
    mt-4
    px-8
    text-center
    font-black
    text-[#D4AF37]
    leading-tight

    ${
      student?.name?.length > 30
        ? "text-3xl md:text-3xl"
        : student?.name?.length > 20
        ? "text-3xl md:text-5xl"
        : "text-5xl md:text-6xl"
    }
  `}
>
   {student?.name?.toUpperCase()}
</h2>
<div
  className="
    absolute

    inset-0

    blur-3xl

    bg-[#D4AF37]/10

    -z-10
  "
/>
<div className="flex justify-center mt-5">

  <div className="w-72 h-[2px] bg-[#D4AF37]" />

</div>
<p className="text-tcd-muted mt-2">
  For successfully participating in
</p>

<h3
  className={`
    mt-3

    font-bold

    text-white

    text-center

    max-w-[85%]

    mx-auto

    break-words

    leading-tight

    ${
      (exam?.title?.length ?? 0) > 60
        ? "text-xl md:text-2xl"
        : (exam?.title?.length ?? 0) > 40
        ? "text-2xl md:text-3xl"
        : "text-3xl md:text-4xl"
    }
  `}
>
  {exam?.title}
</h3>
<div
  className="
    grid
   grid-cols-2 md:grid-cols-4

    gap-6

    max-w-3xl

    mx-auto

    mt-6
  "
>

  <div
 className="
bg-white/10

backdrop-blur-md

rounded-3xl

p-3

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
  className="w-6 h-6 mx-auto mb-3"
/>
  <p className="text-tcd-muted">
    Score
  </p>

  <p
    className="
      text-2xl

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

p-3

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
  className="w-6 h-6 mx-auto mb-3"
/>
  <p className="text-tcd-muted">
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

p-3

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
  className="w-6 h-6 mx-auto mb-3"
/>
  <p className="text-tcd-muted">
    Percentage
  </p>

  <p
    className="
      text-2xl

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

p-3

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
    className="w-6 h-6 mx-auto mb-3"
  />

  <p className="text-tcd-muted">

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

            mt-6
          "
        >
        
          
          
<div
  className="
    grid

    grid-cols-2

    items-end

    gap-12

    mt-6
  "

>

  {/* Signature */}

  <div>

    <img
      src="/signature.png"
      alt="Founder Signature"
      className="
h-48
md:h-52

object-contain
"
    />

   <div
  className="
    w-88

    h-[2px]

    bg-gradient-to-r

    from-transparent

    via-[#E6C15A]

    to-transparent

    mt-1
  "
/>

  <div className="flex justify-center items-right gap-1 mt-1">

  <img
    src="/icons/tcd-crown.svg"
    className="w-6 h-6"
    alt=""
  />

  <span
    className="
      text-[#E6C15A]

      font-black

      tracking-[0.15em]

      uppercase
    "
  >
    The Conclusion Daily
  </span>

  <img
    src="/icons/tcd-crown.svg"
    className="w-6 h-6"
    alt=""
  />

</div>

<p
  className="
    text-xs

    text-brand-light

    italic

    mt-1
  "
>

  Digitally Signed by
  The Conclusion Daily

</p>


  </div>
<div
  className="
    flex
    flex-col
    items-center
    gap-5
  "
>
  <div
  className="
    flex
    flex-col
    items-center
    gap-2
  "
>

  <div
    className="
      p-[4px]

      rounded-3xl

      bg-gradient-to-br

      from-[#FFF4B0]

      via-[#D4AF37]

      to-[#9A7315]
    "
  >

    <div
      className="
        bg-white

        rounded-[20px]

        p-3
      "
    >

      <img
        src={qrCode}
        alt="Verification QR"
        className="w-24 h-24"
      />

    </div>

  </div>

  <p
    className="
      text-xs

      font-bold

      text-[#E6C15A]

      uppercase

      tracking-wider
    "
  >
    Scan to Verify
  </p>

  <p
    className="
      text-[10px]

      text-[#243B6B]/70

      text-center
    "
  >
    Official Digital Verification
  </p>

</div>
<div
  className="
    w-28
    h-28

    rounded-full

    bg-gradient-to-br

    from-[#FFF4B0]

    via-[#D4AF37]

    to-[#9A7315]

    p-[4px]

    shadow-lg
  "
>

  <div
    className="
      w-full
      h-full

      rounded-full

      bg-[#243B6B]

      flex

      items-center

      justify-center

      border

      border-[#F5E6A5]
    "
  >

    <img
      src="/logo.png"
      alt="TCD Seal"
      className="
        w-16
        h-16

        object-contain
      "
    />

  </div>

</div>
</div>

</div>
        </div>
<div className="space-y-1">
<div className="flex justify-center my-4">

  <div
    className="
      w-60

      h-[2px]

      bg-gradient-to-r

      from-transparent

      via-[#E6C15A]

      to-transparent
    "
  />

</div>


</div>
        {/* NEXT STEPS */}


</div>
</div>
      </div>
<div className="mt-6 flex flex-col print:hidden">
<div
  className="
    mt-6

    rounded-3xl

    border

    border-[#D4AF37]/30

    bg-white/5

    backdrop-blur-sm

    p-4

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

  <p className="text-tcd-muted mt-2">

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
</div>
    </main>

  );
}