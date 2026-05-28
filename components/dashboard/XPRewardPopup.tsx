"use client";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { TCDIcons }
from "@/components/ui/tcd-icons";

export default function XPRewardPopup({

  show,
  xp,
  levelUp,

}: any) {

  return (

    <AnimatePresence>

      {show && (

        <motion.div

          initial={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}

          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          exit={{
            opacity: 0,
            scale: 0.7,
            y: 40,
          }}

          transition={{
            duration: 0.4,
          }}

          className="
            fixed
            inset-0

            z-[9999]

            flex
            items-center
            justify-center

            bg-black/50
            backdrop-blur-md
          "
        >

          <div
            className="
              relative
              overflow-hidden

              bg-gradient-to-br
              from-tcd-blue
              via-[#35548C]
              to-[#203B63]

              text-white

              rounded-[30px]

              p-12

              shadow-2xl

              border
              border-tcd-gold/20

              max-w-lg
              w-full

              text-center
            "
          >

            {/* GLOW */}

            <div
              className="
                absolute
                top-0
                right-0

                w-40
                h-40

                bg-tcd-gold/20

                rounded-full

                blur-3xl
              "
            />

            {/* WATERMARK */}

            <img
              src="/logo.png"
              alt="TCD"
              className="
                absolute
                right-[-30px]
                top-[-30px]

                w-56
                h-44

                opacity-10
              "
            />

            <div className="relative z-10">

              <div
                className="
                  flex
                  justify-center

                  mb-3
                "
              >

                {TCDIcons.wallet}

              </div>

              <h2
                className="
                  text-4xl
                  font-black

                  text-tcd-gold

                  mb-4
                "
              >

                +{xp} XP

              </h2>

              <p
                className="
                  text-2xl
                  text-white/80

                  mb-4
                "
              >

                Experience Earned

              </p>

              {levelUp && (

                <motion.div

                  initial={{
                    scale: 0.8,
                  }}

                  animate={{
                    scale: [
                      1,
                      1.08,
                      1,
                    ],
                  }}

                  transition={{
                    repeat:
                      Infinity,
                    duration: 1.5,
                  }}

                  className="
                    bg-tcd-gold/15

                    border
                    border-tcd-gold/20

                    rounded-3xl

                    p-6

                    mb-3
                  "
                >

                  <div
                    className="
                      flex
                      justify-center

                      mb-4
                    "
                  >

                    {TCDIcons.mastery}

                  </div>

                  <h3
                    className="
                      text-4xl
                      font-black

                      text-tcd-gold

                      mb-2
                    "
                  >

                    LEVEL UP!

                  </h3>

                  <p className="text-white/80">

                    Your mastery has increased.

                  </p>

                </motion.div>
              )}

              <div
                className="
                  inline-flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-full

                  bg-white/10

                  text-white/80

                  font-semibold
                "
              >

                TCD Growth Engine Active

              </div>

            </div>

          </div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}