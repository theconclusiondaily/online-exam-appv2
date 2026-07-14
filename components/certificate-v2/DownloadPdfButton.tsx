"use client";

import CertificateExporter from "./CertificateExporter";

interface Props {
  certificateNumber: string;
}

export default function DownloadPdfButton({
  certificateNumber,
}: Props) {

  const handleDownload = async () => {

    try {

      await CertificateExporter.downloadPDF(
        `TCD-Certificate-${certificateNumber}.pdf`
      );

    } catch (error) {

      console.error(
        "PDF Export Failed:",
        error
      );

      alert(
        "Failed to generate PDF."
      );

    }

  };

  return (

    <button
      onClick={handleDownload}
      className="
        w-full

        rounded-2xl

        bg-[#D4AF37]

        py-4

        font-bold

        text-[#243B6B]

        transition

        hover:scale-[1.02]

        active:scale-100
      "
    >

      ⬇️ Download PDF

    </button>

  );

}