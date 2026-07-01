"use client";

export default function DownloadPdfButton() {

  function handleDownload() {
    window.print();
  }

  return (
    <button
      onClick={handleDownload}
      className="
        w-full
        py-4
        rounded-2xl
        bg-[#D4AF37]
        text-[#243B6B]
        font-bold
        hover:scale-[1.02]
        transition
      "
    >
      ⬇️ Download PDF
    </button>
  );
}