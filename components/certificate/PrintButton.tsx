"use client";

export default function PrintButton() {

  return (

    <button
  onClick={() => window.print()}
  className="
    flex
    items-center

    gap-3

    px-6
    py-4

    rounded-2xl

    bg-[#243B6B]

    border

    border-[#D4AF37]

    text-white

    font-bold

    hover:bg-[#1A2E57]

    transition
  "
>

  <img
    src="/icons/tcd-star.svg"
    className="w-6 h-6"
    alt=""
  />

  Download Certificate

</button>

  );

}