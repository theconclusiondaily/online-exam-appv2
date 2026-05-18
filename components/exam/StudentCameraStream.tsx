"use client";

import {
  useEffect,
  useRef,
} from "react";

type Props = {
  stream: MediaStream | null;
};

export default function
StudentCameraStream({
  stream,
}: Props) {

  const videoRef =
    useRef<HTMLVideoElement>(
      null
    );

  useEffect(() => {

    if (
      videoRef.current &&
      stream
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
      className="w-full rounded-2xl border bg-black"
    />
  );
}
