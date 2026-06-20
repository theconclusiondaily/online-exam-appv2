"use client";

import {
  useEffect,
  useRef,
  memo,
} from "react";

type Props = {
  stream: MediaStream | null;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
};

function StudentCameraStream({
  stream,
  videoRef,
}: Props) {

  const internalVideoRef =
  useRef<HTMLVideoElement>(
    null
  );

const activeVideoRef =
  videoRef ||
  internalVideoRef;

  useEffect(() => {

   if (
  activeVideoRef.current &&
  stream
) {

  activeVideoRef.current.srcObject =
    stream;
}

  }, [stream]);

  return (

    <video
  ref={activeVideoRef}
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