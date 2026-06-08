"use client";

export default function PrintButton() {

  return (

    <button
      onClick={() =>
        window.print()
      }
      className="
        bg-tcd-blue
        text-white
        px-8
        py-4
        rounded-2xl
        font-bold
      "
    >
      Print Certificate
    </button>

  );

}