"use client";

import { CertificateData } from "./types";

interface Props {
  data: CertificateData;
}

export default function CertificateFooter({
  data,
}: Props) {

  return (
<footer
  className="
    mt-16

    px-20

    pb-12
  "
>

      {/* ====================================== */}
      {/* Signature + QR */}
      {/* ====================================== */}

      <div className="flex justify-between items-end">

        {/* Signature */}

        <div className="text-center">

          <img
            src="/signature.png"
            alt="Founder Signature"
            className="
              h-40
              object-contain
              mx-auto
            "
          />

          <div className="mt-3">

            <div className="w-48 h-px bg-[#D4AF37] mx-auto" />

            <p
              className="
                mt-3

                font-bold

                text-[#E6C15A]
              "
            >
              Authorized Digital Signature
            </p>

            <p className="text-white/70">

              THE CONCLUSION DAILY

            </p>

          </div>

        </div>

        {/* QR */}

        <div className="text-center">

          <div
            className="
              rounded-2xl

              bg-white

              p-3
            "
          >

            <img
              src={data.qrCode}
              alt="Certificate QR"

              className="
                w-40
                h-40
              "
            />

          </div>

          <p
            className="
              mt-3

              text-sm

              text-white/60
            "
          >
            Scan to Verify
          </p>

          <p
            className="
              mt-2

              text-xs

              text-[#E6C15A]
            "
          >
            www.theconclusiondaily.com
          </p>

        </div>

      </div>

      {/* ====================================== */}
      {/* Certificate Number */}
      {/* ====================================== */}

      <div
        className="
          mt-10

          rounded-3xl

          border

          border-[#D4AF37]/30

          bg-white/10

          backdrop-blur-md

          p-6

          text-center
        "
      >

        <p
          className="
            uppercase

            tracking-[0.3em]

            text-xs

            text-white/60
          "
        >
          Certificate Number
        </p>

        <h3
          className="
            mt-4

            font-mono

            text-xl

            font-bold

            text-[#E6C15A]

            break-all
          "
        >
          {data.certificateNumber}
        </h3>

      </div>

      {/* ====================================== */}
      {/* Bottom Gold Line */}
      {/* ====================================== */}

      <div
        className="
          mt-8

          h-[2px]

          bg-gradient-to-r

          from-transparent

          via-[#D4AF37]

          to-transparent
        "
      />

      {/* ====================================== */}
      {/* Copyright */}
      {/* ====================================== */}

      <p
        className="
          mt-4

          text-center

          text-xs

          text-white/40
        "
      >

        © {new Date().getFullYear()} THE CONCLUSION DAILY

        <br />

        Digitally Generated • Tamper Evident • QR Verifiable

      </p>

    </footer>

  );

}