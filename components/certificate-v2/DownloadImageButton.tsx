"use client";

import CertificateExporter from "./CertificateExporter";

interface Props {
  certificateNumber: string;
}

export default function DownloadImageButton({
  certificateNumber,
}: Props) {

  const handleDownload = async () => {

    try {

      await CertificateExporter.downloadImage(
        `TCD-Certificate-${certificateNumber}.png`
      );

    } catch (error) {

      console.error(
        "Image Export Failed:",
        error
      );

      alert(
        "Failed to generate image."
      );

    }

  };

  return (

    <button
      onClick={handleDownload}
      className="
        w-full

        rounded-2xl

        border

        border-[#D4AF37]/30

        bg-white/10

        py-4

        font-bold

        text-white

        transition

        hover:bg-white/20

        hover:scale-[1.02]

        active:scale-100
      "
    >

      🖼️ Save as Image

    </button>

  );

}