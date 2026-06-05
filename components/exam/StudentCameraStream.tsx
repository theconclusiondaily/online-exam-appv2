"use client";

import {
  useEffect,
  useRef,
  memo,
} from "react";

type Props = {
  stream: MediaStream | null;
};

function StudentCameraStream({
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
      className="
        w-full
        h-full

        rounded-2xl

        border

        bg-black

        object-cover
      "
    />

  );
}

export default memo(
  StudentCameraStream
);