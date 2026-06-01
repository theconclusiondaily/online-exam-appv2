
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function TCDIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [hide, setHide] =
    useState(false);

 
useEffect(() => {

  const timer =
    setTimeout(() => {

      sessionStorage.setItem(
        "tcd_intro_seen",
        "true"
      );

      setHide(true);

      setTimeout(
        onComplete,
        600
      );

    }, 2500);

  return () =>
    clearTimeout(timer);

}, [onComplete]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[9999]

        flex
        items-center
        justify-center

        bg-[#020812]

        transition-all
        duration-700

        ${
         hide
  ? "opacity-0 scale-110"
  : "opacity-100"
        }
      `}
    >

     
<div
  className="
    relative

    flex
    flex-col
    items-center
  "
>



        <div
  className="
    absolute

    w-[700px]
    h-[700px]

    rounded-full

    bg-[#D4AF37]/30

    blur-[120px]

    animate-[goldPulse_2.5s_ease-out_forwards]
  "
/>

{/* LEFT GOLD STREAK */}

<div
  className="
    absolute

    w-[1200px]
    h-[10px]

    bg-gradient-to-r
    from-transparent
    via-[#E6C06E]
    to-transparent

    blur-md

    animate-[streakLeft_2.5s_linear_forwards]
  "
/>

{/* RIGHT BLUE STREAK */}

<div
  className="
    absolute

    w-[1200px]
    h-[8px]

    bg-gradient-to-r
    from-transparent
    via-[#3D5F99]
    to-transparent

    blur-md

    animate-[streakRight_2.5s_linear_forwards]
  "
/>

{/* SCREEN FLASH */}


<div
  className="
    absolute

    w-[520px]
    h-[520px]

    rounded-full

    border
    border-[#E6C06E]/20

    animate-spin
  "
  style={{
    animationDuration: "18s",
  }}
/>
        <Image
  src="/logo.png"
  alt="TCD"
  width={400}
  height={400}
  priority
  className="
    relative

animate-[tcdLogo_3s_cubic-bezier(0.22,1,0.36,1)_forwards]

  "
/>

        <h1
          className="
            mt-6

            text-white

            text-5xl
md:text-6xl

            font-black

            tracking-wide
          "
        >
          THE CONCLUSION DAILY
        </h1>

        <p
          className="
            mt-3

            text-[#F2D27A]

            tracking-[0.2em]

            uppercase

            text-base
md:text-lg
          "
        >
          Hope • Faith • Excellence
        </p>

      </div>

    </div>
  );
}
