"use client";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function PrintButton() {
  const downloadCertificate = async () => {
    const node = document.getElementById("certificate");

    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 4,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const img = new Image();

      img.src = dataUrl;

      img.onload = () => {
        const pdfWidth = 210;
        const pdfHeight = 297;

        const imgWidth = img.width;
        const imgHeight = img.height;

        const ratio = Math.min(
          pdfWidth / imgWidth,
          pdfHeight / imgHeight
        );

        const renderWidth = imgWidth * ratio;
        const renderHeight = imgHeight * ratio;

        const x = (pdfWidth - renderWidth) / 2;
        const y = (pdfHeight - renderHeight) / 2;

        pdf.addImage(
          dataUrl,
          "PNG",
          x,
          y,
          renderWidth,
          renderHeight
        );

        pdf.save(`${document.title}.pdf`);
      };
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={downloadCertificate}
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
      Download Certificate
    </button>
  );
}