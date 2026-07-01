import { notFound } from "next/navigation";
import { createClient }
from "@/lib/supabase/server";
import SetCertificateTitle from "@/components/certificate/SetCertificateTitle";
import PrintButton from
"@/components/certificate/PrintButton";
import QRCode from "qrcode";
import DesktopCertificate from "@/components/certificate/DesktopCertificate";
import MobileCertificate from "@/components/certificate/MobileCertificate";
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
  <DesktopCertificate
  certificate={certificate}
  student={student}
  exam={exam}
  attempt={attempt}
  qrCode={qrCode}
/>
<MobileCertificate
    certificate={certificate}
    student={student}
    exam={exam}
    attempt={attempt}
    qrCode={qrCode}
/>
      </div>
<div className="hidden lg:flex flex-col print:hidden">
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

  <p className="text-[#E8EEF9] mt-2">

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