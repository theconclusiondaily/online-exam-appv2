"use client";

export default function ShareCertificateButton() {

  async function handleShare() {

    if (!navigator.share) {

      alert("Sharing is not supported on this device.");

      return;

    }

    await navigator.share({

      title: "My TCD Certificate",

      text: "I earned a certificate on THE CONCLUSION DAILY.",

      url: window.location.href,

    });

  }

  return (

    <button
      onClick={handleShare}
      className="
        w-full
        py-4
        rounded-2xl
        bg-[#0F3D91]
        text-white
        font-bold
      "
    >
      📤 Share Certificate
    </button>

  );

}