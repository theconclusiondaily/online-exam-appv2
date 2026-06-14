"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
interface Props {
  text?: string;
}

export default function TCDLoader({
  text = "Loading",
}: Props) {
const [dots, setDots] = useState("");

useEffect(() => {
  const interval = setInterval(() => {
    setDots(prev => prev.length >= 3 ? "" : prev + ".");
  }, 500);

  return () => clearInterval(interval);
}, []);
 return (

  <div
    className="
      fixed
      inset-0

     bg-gradient-to-br
from-[#020812]
via-[#071018]
to-[#10243A]

      flex
      flex-col

      items-center
      justify-center

      z-[9999]

      animate-[tcdFade_.4s_ease]
    "
  >

    <div className="relative w-32 h-32">

  <div
  className="
    absolute

    left-1/2
    top-1/2

    -translate-x-1/2
    -translate-y-1/2

    w-[500px]
    h-[500px]

    rounded-full

    bg-[#D4AF37]/10

    blur-[150px]
  "
/>
  {/* Rotating Ring */}
  <div
    className="
      absolute
      inset-0

      rounded-full

      border-[4px]

      border-transparent

      border-t-[#D4AF37]
      border-r-[#FFF4B0]

      animate-spin
    "
      style={{
    animationDuration: "2.5s",
  }}
  />
<div
  className="
    absolute

    inset-2

    rounded-full

    border

    border-[#D4AF37]/20
  "
/>
  {/* Static Logo */}
  <div className="absolute inset-4 flex items-center justify-center">

    <Image
      src="/logo.png"
      alt="TCD"
      width={100}
      height={100}
      priority
      className="animate-[tcdGlow_2s_ease-in-out_infinite]"
    />

  </div>

</div>

    <h2
  className="
    mt-8

    text-2xl

    font-bold

    text-[#D4AF37]

    tracking-[0.08em]

    text-center
  "
>
  <span>{text}</span>

<span className="inline-block w-6 text-left">
  {dots}
</span>
</h2>

    <p
  className="
    mt-3
animate-[tcdGlow_3s_ease-in-out_infinite]
    text-[#F2D27A]

    uppercase

    tracking-[0.25em]

    text-sm
  "
>
  Hope • Faith • Excellence
</p>
<p
  className="
    absolute

    bottom-8

    text-xs

    text-[#D4AF37]/30

    tracking-[0.25em]
  "
>
  THE CONCLUSION DAILY
</p>
  </div>

);

}