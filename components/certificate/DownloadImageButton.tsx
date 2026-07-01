"use client";

import { toPng } from "html-to-image";

interface Props {
  certificateNumber: string;
}

export default function DownloadImageButton({
  certificateNumber,
}: Props) {

  async function handleDownload() {

    try {

      const node =
        document.getElementById("mobile-certificate");

      if (!node) {

        alert("Certificate not found.");

        return;

      }

      const dataUrl =
        await toPng(node, {
          cacheBust: true,
          pixelRatio: 4,
          backgroundColor: "#243B6B",
        });

      const link =
        document.createElement("a");

      link.download =
  `TCD-Certificate-${certificateNumber}.png`;

      link.href = dataUrl;

      link.click();

    } catch (err) {

      console.error(err);

      alert("Failed to generate image.");

    }

  }

  return (

    <button
      onClick={handleDownload}
      className="
        w-full
        py-4
        rounded-2xl
        bg-white/10
        border
        border-[#D4AF37]/30
        text-white
        font-bold
      "
    >
      🖼️ Save as Image
    </button>

  );

}