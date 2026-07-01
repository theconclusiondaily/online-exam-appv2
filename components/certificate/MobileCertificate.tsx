
"use client";

import StatCard from "./StatCard";
import Link from "next/link";
import DownloadPdfButton from "./DownloadPdfButton";
import DownloadImageButton from "./DownloadImageButton";
import ShareCertificateButton from "./ShareCertificateButton";
interface Props {
  certificate: any;
  student: any;
  exam: any;
  attempt: any;
  qrCode: string;
}

export default function MobileCertificate({
  certificate,
  student,
  exam,
  attempt,
  qrCode,
}: Props) {
  return (
  <div
    className="block lg:hidden min-h-screen bg-gradient-to-br from-[#243B6B] to-[#1A2E57] px-5 py-8"
  >
      <div
  id="mobile-certificate"
  className="max-w-md mx-auto rounded-3xl border-4 border-[#D4AF37] bg-[#243B6B] shadow-2xl overflow-hidden"
>

        <div className="pt-12 pb-8 px-8 text-center">

          <img
            src="/logo.png"
            alt="TCD"
            className="w-20 h-20 mx-auto"
          />

          <p className="mt-4 text-[#E6C15A] tracking-[0.25em] font-bold text-xs">
            THE CONCLUSION DAILY
          </p>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto my-6" />

          <h1 className="text-3xl font-black text-white">
            Certificate
          </h1>

          <h2 className="text-xl font-bold text-[#D4AF37]">
            of Achievement
          </h2>

          <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto my-6" />

          <p className="text-white/70">
            This certificate is proudly awarded to
          </p>

          <h2 className="mt-5 text-4xl font-black text-[#D4AF37] leading-tight">
            {student?.name?.toUpperCase()}
          </h2>

          <div className="mt-8 rounded-2xl bg-white/10 border border-[#D4AF37]/30 backdrop-blur-md p-5">
            <p className="text-white/60 text-xs uppercase tracking-widest">
              Successfully Completed
            </p>

            <h3 className="mt-3 text-2xl font-black text-[#E6C15A]">
              {exam?.title}
            </h3>

            <p className="mt-4 text-white/70 text-sm">
              Issued on {new Date(certificate.issued_at).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <StatCard title="Score" value={`${attempt?.score ?? 0}`} />
            <StatCard title="Percentage" value={`${attempt?.percentage ?? 0}%`} />
            <StatCard
  title="Prestige"
  value={
    student?.prestige_level === "Bronze"
      ? "🥉 Bronze"
      : student?.prestige_level === "Silver"
      ? "🥈 Silver"
      : student?.prestige_level === "Gold"
      ? "🥇 Gold"
      : student?.prestige_level === "Diamond"
      ? "💎 Diamond"
      : student?.prestige_level === "Legend"
      ? "👑 Legend"
      : "🥉 Bronze"
  }
/>
            <StatCard
  title="Rank"
  value={
    certificate?.rank
      ? `#${certificate.rank}`
      : "N/A"
  }
/>
          </div>

          <div className="mt-10">
            <div className="rounded-full border-4 border-[#D4AF37] w-28 h-28 mx-auto flex items-center justify-center bg-[#1A2E57]">
              <img src="/logo.png" alt="Seal" className="w-16 h-16"/>
            </div>

            <p className="mt-4 text-[#E6C15A] font-bold">
              Digitally Verified by
            </p>

            <p className="text-white">
              THE CONCLUSION DAILY
            </p>
          </div>

          <div className="mt-10">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-36 h-36 mx-auto rounded-xl bg-white p-2"
            />

            <p className="mt-3 text-white/70 text-sm">
  Scan to verify this certificate
</p>

<p className="text-[#E6C15A] text-xs mt-2">
  www.theconclusiondaily.com
</p>
          </div>

         <div className="mt-10 border-t border-[#D4AF37]/30 pt-6">

  <img
    src="/signature.png"
    alt="Founder Signature"
    className="h-16 mx-auto object-contain"
  />

  <p className="mt-2 text-[#E6C15A] font-bold text-lg">
   Authorized Digital Signature
  </p>

    <p className="text-white font-semibold mt-1">
    THE CONCLUSION DAILY
  </p>

</div>

          <div className="mt-8 rounded-2xl bg-white/10 border border-[#D4AF37]/30 p-4">
            <p className="text-xs uppercase tracking-widest text-white/60">
              Certificate ID
            </p>

            <p className="mt-2 text-[#E6C15A] font-mono text-sm break-all">
              {certificate?.certificate_number}
            </p>
          </div>

        </div>
      </div>
      <Link
  href="/dashboard"
  className="
    mt-4

    w-full

    flex

    items-center

    justify-center

    gap-3

    rounded-2xl

    border

    border-[#D4AF37]

    bg-white/10

    py-4

    text-white

    font-bold

    hover:bg-white/20

    transition
  "
>
  <img
    src="/icons/tcd-shield.svg"
    alt="Dashboard"
    className="w-5 h-5"
  />

  Back to Dashboard
</Link>
<div className="mt-10 space-y-4">

  <DownloadPdfButton />

 <DownloadImageButton
  certificateNumber={
    certificate.certificate_number
  }
/>
  <ShareCertificateButton />

</div>
    </div>
    
  );
}
