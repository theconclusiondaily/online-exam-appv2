import { notFound } from "next/navigation";
import { createClient }
from "@/lib/supabase/server";
import SetCertificateTitle from "@/components/certificate/SetCertificateTitle";
import Link from "next/link";
import QRCode from "qrcode";
import CertificateCanvas
from "@/components/certificate-v2/CertificateCanvas";

import DownloadPdfButton
from "@/components/certificate-v2/DownloadPdfButton";

import DownloadImageButton
from "@/components/certificate-v2/DownloadImageButton";

import ShareButton
from "@/components/certificate-v2/ShareButton";

import {
  CertificateData,
  PrestigeLevel,
} from "@/components/certificate-v2/types";
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

  .select(`
    title,
    end_time,
    review_delay_minutes
  `)

  .eq(
    "id",
    certificate.exam_id
  )

  .single();
  const unlockTime = new Date(
  exam!.end_time
);

unlockTime.setMinutes(
  unlockTime.getMinutes() +
  (exam!.review_delay_minutes ?? 30)
);

const certificateLocked =
  new Date() < unlockTime;
const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://theconclusiondaily.com";

const verificationUrl =
`${appUrl}/verify/${certificate.certificate_number}`;

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
if (certificateLocked) {


  return (

    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="max-w-lg bg-white rounded-3xl shadow-xl border p-8 text-center">

        <h1 className="text-3xl font-black text-orange-600">

          🔒 Certificate Locked

        </h1>

        <p className="mt-5 text-gray-600">

          Your certificate will become available only after the exam has officially ended.

        </p>

        <div className="mt-6 rounded-2xl bg-orange-50 border p-5">

          <p className="font-bold">

            Available At

          </p>

          <p className="mt-2">

            {unlockTime.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}

          </p>

        </div>

      </div>

    </main>

  );

}
const certificateData: CertificateData = {

  id: certificate.id,

  certificateNumber:
    certificate.certificate_number,

  issuedAt:
    certificate.issued_at,

  studentId:
    certificate.user_id,

  studentName:
    student?.name ??
    "Student",

  prestige:
    (student?.prestige_level ??
      "Bronze") as PrestigeLevel,

  examId:
    certificate.exam_id,

  examTitle:
    exam?.title ??
    "Exam",

score:
certificate.score ?? 0,

percentage:
certificate.percentage ?? 0,

  rank:
    certificate.rank ?? 0,

  qrCode,

};
  return (

    <main
  className="
    min-h-screen
    bg-[#243B6B]
    p-8
    print:bg-white
    print:p-0
  "
>
<SetCertificateTitle
  studentName={student?.name || "Student"}
  examTitle={exam?.title || "Certificate"}
  issuedDate={new Date(certificate.issued_at).toLocaleDateString("en-GB")}
/>
<div className="max-w-7xl mx-auto">

<div
className="
grid
lg:grid-cols-[820px_360px]
gap-10
items-start
"
>
        <CertificateCanvas
    data={certificateData}
  />

 
<div className=" flex flex-col gap-6 lg:flex print:hidden">
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
     grid grid-cols-1 gap-4

      justify-center
    "
  >

   <DownloadPdfButton
  certificateNumber={
    certificate.certificate_number
  }
/>

<DownloadImageButton
  certificateNumber={
    certificate.certificate_number
  }
/>

<ShareButton
  certificateNumber={
    certificate.certificate_number
  }
/>

    <Link href="/dashboard"
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

    </Link>

    <Link href="/dashboard"
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

    </Link>

  </div>


  <div className="flex justify-center mt-4">

 <Link href="/dashboard"
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

  </Link>

</div>
</div>
 </div>
</div>
</main>

  );
}