"use client";

import Image from "next/image";

interface Props {
  text?: string;
}

export default function TCDLoader({
  text = "Loading...",
}: Props) {

 return (

  <div
    className="
      fixed
      inset-0

      bg-[#071018]

      flex
      flex-col

      items-center
      justify-center

      z-[9999]

      animate-[tcdFade_.4s_ease]
    "
  >

    <Image
      src="/logo.png"
      alt="TCD"
      width={110}
      height={110}
      className="animate-[spin_3s_horizontal_infinite]"
      priority
    />

    <h2 className="mt-8 text-2xl font-bold text-white">

      {text}

    </h2>

    <p className="mt-2 text-gray-400">

      Excellence in Progress

    </p>

  </div>

);

}