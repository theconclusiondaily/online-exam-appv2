"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { demoExam }
from "@/lib/demo/demoExam";
import { supabase } from "@/lib/supabase/client";
import { TCDIcons } from "@/components/ui/tcd-icons";

export default function ExamIntroPage() {
  const { id } = useParams();
  const router = useRouter();

  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    loadExam();
  }, []);

 async function loadExam() {

  if (id === "demo-exam") {

    setExam(
      demoExam
    );

    return;
  }

  const { data } =
    await supabase
      .from("exams")
      .select("*")
      .eq("id", id)
      .single();

  setExam(data);
}

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E1A33] text-white">
        Loading Challenge...
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1630] via-[#102248] to-[#1A2E5E] text-white">

      {/* GLOW EFFECTS */}

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-tcd-gold/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tcd-blue/30 blur-[180px] rounded-full" />

      {/* LOGO WATERMARK */}

      <img
        src="/logo.png"
        alt="TCD"
        className="
          absolute
          right-[-120px]
          bottom-[-120px]
          w-[700px]
          opacity-[0.05]
          pointer-events-none
          select-none
        "
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* LOGO */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex justify-center"
        >
          <img
            src="/logo.png"
            alt="TCD"
            className="w-32 h-32 md:w-40 md:h-40"
          />
        </motion.div>

        {/* BRAND */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
          className="
  text-center

  text-tcd-gold

  text-xl
  md:text-3xl

  font-black

  tracking-[10px]

  uppercase

  mt-4

  drop-shadow-[0_0_30px_rgba(255,215,0,0.35)]
"
        >
          THE CONCLUSION DAILY

         
        </motion.p>

 <p className="text-center mt-4 text-[#D4AF37] uppercase tracking-[0.25em] font-semibold">
   Hope • Faith • Excellence
   </p>
        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
          className="
            text-center
            text-4xl
            md:text-7xl
            font-black
            mt-6
            leading-tight
          "
        >
          {exam.title}
        </motion.h1>

        {/* TAGLINE */}

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1,
          }}
          className="
            text-center
            text-gray-700
            text-lg
            md:text-2xl
            mt-6
            max-w-4xl
            mx-auto
          "
        >
          Challenge Yourself. Compete Globally.
          Rise Through The Rankings.
        </motion.p>

        {/* EXAM STATS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
          }}
          className="
            grid
            md:grid-cols-4
            gap-4
            mt-16
          "
        >

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="mb-3 w-12 h-12">
  {TCDIcons.target}
</div>

            <p className="text-white/60 text-sm">
              Duration
            </p>

            <h3 className="text-3xl font-black mt-2">
              {exam.duration || 0} min
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="mb-3 w-12 h-12">
  {TCDIcons.coin}
</div>

            <p className="text-white/60 text-sm">
              Reward Pool
            </p>

            <h3 className="text-3xl font-black text-tcd-gold mt-2">
              ₹ {exam.reward_pool || 0}
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="mb-3 w-12 h-12">
  {TCDIcons.rank}
</div>

            <p className="text-white/60 text-sm">
              Rankings
            </p>

            <h3 className="text-3xl font-black mt-2">
              Global
            </h3>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <div className="mb-3 w-12 h-12">
  {TCDIcons.fire}
</div>

            <p className="text-white/60 text-sm">
              Status
            </p>

            <h3 className="text-3xl font-black text-green-400 mt-2">
              LIVE
            </h3>
          </div>

        </motion.div>

        {/* RULES */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.5,
          }}
          className="
  mt-14

  bg-black/20

  backdrop-blur-[2px]

  rounded-[32px]

  border
  border-white/10

  p-8
"
        >

          <h2 className="text-3xl font-black mb-6">
            Challenge Rules
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-white/80">

            <p>✓ Fullscreen Monitoring Enabled</p>

            <p>✓ Right Click Restricted</p>

            <p>✓ Auto Submission On Timeout</p>

            <p>✓ Activity Tracking Enabled</p>

            <p>✓ Global Ranking System</p>

            <p>✓ Accuracy Used As Tie Break</p>

          </div>

        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 2,
          }}
          className="
            flex
            justify-center
            mt-16
          "
        >

          <button
            onClick={() =>
              router.push(`/exam/${id}`)
            }
            className="
              px-12
              py-5

              rounded-[28px]

              bg-tcd-gold

              text-tcd-blue

              text-xl
              font-black

              shadow-2xl

              hover:scale-105
              hover:shadow-[0_0_40px_rgba(255,215,0,0.4)]

              transition-all
              duration-300
            "
          >
            <div className="mb-3 w-12 h-12">
  {TCDIcons.journey}
</div>
 BEGIN CHALLENGE
          </button>

        </motion.div>

      </div>

    </main>
  );
}