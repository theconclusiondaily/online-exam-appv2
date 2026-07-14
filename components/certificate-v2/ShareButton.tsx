"use client";

import CertificateExporter from "./CertificateExporter";

interface Props {
  certificateNumber: string;
}

export default function ShareButton({
  certificateNumber,
}: Props) {

  async function handleShare() {

    try {

      // Browser doesn't support sharing
      if (!navigator.share) {

        alert("Sharing is not supported on this device.");

        return;

      }

      // Generate certificate image
      const root =
        document.getElementById(
          "certificate-root"
        );

      if (!root) {

        throw new Error(
          "Certificate not found."
        );

      }

      const dataUrl =
        await (CertificateExporter as any).renderPNG();

      const blob =
        await fetch(dataUrl)
          .then(r => r.blob());

      const file =
        new File(

          [blob],

          `TCD-Certificate-${certificateNumber}.png`,

          {
            type: "image/png",
          }

        );

      const verificationUrl =
        `https://www.theconclusiondaily.com/verify/${certificateNumber}`;

      // Share with image if supported
      if (

        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })

      ) {

        await navigator.share({

          title:
            "THE CONCLUSION DAILY",

          text:
            "🎉 I earned a certificate on THE CONCLUSION DAILY!",

          url:
            verificationUrl,

          files: [file],

        });

      } else {

        // Fallback

        await navigator.share({

          title:
            "THE CONCLUSION DAILY",

          text:
            `🎉 I earned a certificate on THE CONCLUSION DAILY.\n\nVerify here:\n${verificationUrl}`,

          url:
            verificationUrl,

        });

      }

    } catch (err) {

      console.error(
        "Share Failed:",
        err
      );

      alert(
        "Unable to share certificate."
      );

    }

  }

  return (

    <button

      onClick={handleShare}

      className="
        w-full

        rounded-2xl

        bg-[#0F3D91]

        py-4

        font-bold

        text-white

        transition

        hover:scale-[1.02]

        active:scale-100
      "

    >

      📤 Share Certificate

    </button>

  );

}