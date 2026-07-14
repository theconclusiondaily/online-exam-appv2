"use client";

export default function CertificateHeader() {

  return (

    <header
      className="
        pt-14
        text-center
      "
    >

      {/* Logo */}

      <img
        src="/logo.png"
        alt="THE CONCLUSION DAILY"
        className="
          w-24
          h-24
          mx-auto
        "
      />

      {/* Brand */}

      <p
        className="
          mt-6

          text-sm

          font-bold

          tracking-[0.35em]

          text-[#E6C15A]
        "
      >
        THE CONCLUSION DAILY
      </p>

      {/* Divider */}

      <div
        className="
          w-40

          h-[2px]

          bg-[#D4AF37]

          mx-auto

          my-8
        "
      />

      {/* Certificate */}

      <h1
        className="
          text-6xl

          font-black

          text-white

          tracking-wide
        "
      >
        CERTIFICATE
      </h1>

      <h2
        className="
          mt-2

          text-3xl

          font-bold

          text-[#D4AF37]

          tracking-wide
        "
      >
        OF ACHIEVEMENT
      </h2>

      {/* Divider */}

      <div
        className="
          w-40

          h-[2px]

          bg-[#D4AF37]

          mx-auto

          my-8
        "
      />

    </header>

  );

}