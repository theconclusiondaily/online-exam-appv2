"use client";

import { useEffect, useRef } from "react";

export default function ProctoringCapture({
  stream,
  videoRef,
}: {
  stream: MediaStream | null;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {

  useEffect(() => {

    if (
      stream &&
      videoRef.current
    ) {
      videoRef.current.srcObject =
        stream;
    }

  }, [stream]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      className="hidden"
    />
  );
}