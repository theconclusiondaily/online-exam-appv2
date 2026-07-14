"use client";

import { CertificateData } from "./types";
import {
  fitName,
  getNameClass,
  formatDate,
} from "./utils";

interface Props {
  data: CertificateData;
}

export default function CertificateBody({
  data,
}: Props) {

  return (

    <section className="px-20 text-center">

      {/* Intro */}

      <p
        className="
          text-xl
          text-white/70
        "
      >
        This Certificate is proudly presented to
      </p>

      {/* Student Name */}

      <h2
        className={`
          mt-8
          font-black
          leading-tight
          text-[#E6C15A]
          break-words
          ${getNameClass(data.studentName)}
        `}
      >
        {fitName(data.studentName)}
      </h2>

      {/* Achievement Card */}

      <div
        className="
          mt-12

          rounded-3xl

          border

          border-[#D4AF37]/30

          bg-white/10

          backdrop-blur-md

          p-8
        "
      >

        <p
          className="
            uppercase

            tracking-[0.3em]

            text-sm

            text-white/60
          "
        >
          Successfully Completed
        </p>

        <h3
          className="
            mt-5

            text-4xl

            font-black

            text-[#E6C15A]

            break-words
          "
        >
          {data.examTitle}
        </h3>

        <p
          className="
            mt-6

            text-lg

            text-white/70
          "
        >
          Issued on{" "}
          <span className="font-semibold text-white">
            {formatDate(data.issuedAt)}
          </span>
        </p>

      </div>

      {/* Quote */}

      <div className="mt-10">

        <p
          className="
            italic

            text-lg

            text-[#E6C15A]/90
          "
        >
          "Knowledge, Consistency and Integrity
          build true excellence."
        </p>

        <p
          className="
            mt-3

            text-white/60

            text-sm
          "
        >
          — THE CONCLUSION DAILY
        </p>

      </div>

    </section>

  );

}