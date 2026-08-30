"use client";

import {
  Camera,
  CheckCircle2,
  Clock3,
  Flag,
  Maximize2,
  ShieldCheck,
} from "lucide-react";

export default function ExamPreview() {
  return (
    <div className="w-full bg-white p-6 sm:p-7">
      {/* ================================================================
          LIVE EXAMINATION
      ================================================================= */}

      <div
        className="
          rounded-[1.75rem]
          border
          border-slate-200
          bg-white
          px-6
          py-6
          shadow-[0_12px_32px_rgba(15,23,42,0.07)]
        "
      >
        {/* Label */}

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-brand-gold
            "
          >
            Live Examination
          </span>
        </div>

        {/* Main information */}

        <div className="mt-5">
          <h2
            className="
              text-[1.65rem]
              font-black
              leading-[1.12]
              tracking-tight
              text-brand
              sm:text-[1.8rem]
            "
          >
            NEET Physics
            <br />
            Grand Test
          </h2>

          <p
            className="
              mt-2
              max-w-[15rem]
              text-xs
              leading-5
              text-slate-500
            "
          >
            Computer-based examination environment
          </p>
        </div>

        {/* Status row */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-2
          "
        >
          {/* Timer */}

          <div
            className="
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-full
              border
              border-red-100
              bg-red-50
              px-3
              text-[10px]
              font-semibold
              text-red-500
            "
          >
            <Clock3 className="h-3 w-3" />
            24:18 Remaining
          </div>

          {/* Camera */}

          <div
            className="
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-100
              bg-emerald-50
              px-3
              text-[10px]
              font-semibold
              text-emerald-600
            "
          >
            <Camera className="h-3 w-3" />
            Camera Active
          </div>

          {/* Fullscreen */}

          <div
            className="
              inline-flex
              h-8
              items-center
              gap-1.5
              rounded-full
              border
              border-blue-100
              bg-blue-50
              px-3
              text-[10px]
              font-semibold
              text-blue-500
            "
          >
            <Maximize2 className="h-3 w-3" />
            Fullscreen
          </div>
        </div>

        {/* Security */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-2
            border-t
            border-slate-100
            pt-4
          "
        >
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-500" />

          <span className="text-[9px] font-medium text-slate-500">
            Secure examination session
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="text-[9px] font-medium text-slate-400">
            AI proctoring enabled
          </span>
        </div>
      </div>

      {/* ================================================================
          EXAM WORKSPACE
      ================================================================= */}

      <div
        className="
          mt-5
          grid
          gap-5
          lg:grid-cols-[1.18fr_0.82fr]
        "
      >
        {/* ==============================================================
            QUESTION
        ============================================================== */}

        <div
          className="
            rounded-[1.75rem]
            border
            border-slate-200
            bg-white
            p-5
            shadow-[0_10px_28px_rgba(15,23,42,0.06)]
          "
        >
          {/* Question controls */}

          <div className="flex items-center justify-between gap-2">
            <div
              className="
                rounded-full
                bg-brand
                px-3.5
                py-2
                text-[10px]
                font-bold
                leading-none
                text-white
              "
            >
              Question{" "}
              <span className="ml-1 opacity-70">
                14 of 45
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-xl
                border
                border-slate-200
                px-2.5
                py-2
                text-[9px]
                font-semibold
                text-slate-600
              "
            >
              <Flag className="h-3 w-3" />

              <span>Mark for Review</span>
            </div>
          </div>

          {/* Question text */}

          <div className="mt-7">
            <p
              className="
                text-[1.05rem]
                font-bold
                leading-[1.55]
                tracking-tight
                text-brand
                sm:text-[1.15rem]
              "
            >
              A particle moves along a straight line
              with constant acceleration. Which
              statement is always true?
            </p>
          </div>

          {/* Answers */}

          <div className="mt-6 space-y-2.5">
            <Answer
              letter="A"
              text="The acceleration remains constant."
            />

            <Answer
              letter="B"
              text="The velocity continuously increases."
              active
            />

            <Answer
              letter="C"
              text="The displacement remains constant."
            />

            <Answer
              letter="D"
              text="The particle moves with uniform velocity."
            />
          </div>
        </div>

        {/* ==============================================================
            SIDEBAR
        ============================================================== */}

        <div className="space-y-5">
          {/* AI Proctoring */}

          <div
            className="
              rounded-[1.75rem]
              border
              border-slate-200
              bg-white
              p-5
              shadow-[0_10px_28px_rgba(15,23,42,0.06)]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-emerald-100
                  bg-emerald-50
                  text-emerald-600
                "
              >
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>

              <div>
                <p className="text-[10px] text-slate-400">
                  AI Proctoring
                </p>

                <p className="text-xs font-bold text-emerald-600">
                  Secure
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <SecurityStatus text="Face Detected" />
              <SecurityStatus text="Camera Active" />
              <SecurityStatus text="Fullscreen Enabled" />
              <SecurityStatus text="No Violations" />
            </div>
          </div>

          {/* Question Palette */}

          <div
            className="
              rounded-[1.75rem]
              border
              border-slate-200
              bg-white
              p-5
              shadow-[0_10px_28px_rgba(15,23,42,0.06)]
            "
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-brand">
                Question Palette
              </h3>

              <span className="text-[8px] text-slate-400">
                45 Questions
              </span>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {Array.from({ length: 20 }, (_, index) => {
                const number = index + 1;

                const answered = number <= 10;
                const current = number === 14;

                return (
                  <div
                    key={number}
                    className={`
                      flex
                      h-8
                      items-center
                      justify-center
                      rounded-lg
                      text-[9px]
                      font-semibold
                      ${
                        current
                          ? "bg-brand text-white"
                          : answered
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   ANSWER
======================================================================== */

function Answer({
  letter,
  text,
  active = false,
}: {
  letter: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        border
        px-3
        py-3
        ${
          active
            ? "border-brand bg-brand/[0.035]"
            : "border-slate-200 bg-white"
        }
      `}
    >
      <div
        className={`
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          text-[10px]
          font-bold
          ${
            active
              ? "bg-brand text-white"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {letter}
      </div>

      <p
        className={`
          text-[10px]
          leading-4
          ${
            active
              ? "font-semibold text-brand"
              : "text-slate-600"
          }
        `}
      >
        {text}
      </p>
    </div>
  );
}

/* ========================================================================
   SECURITY STATUS
======================================================================== */

function SecurityStatus({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />

      <span className="text-[10px] font-medium text-slate-600">
        {text}
      </span>
    </div>
  );
}