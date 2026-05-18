"use client";

import {
  useEffect,
  useRef,
} from "react";

type Props = {
  stream: MediaStream;
  studentName: string;
};

export default function
StudentVideoTile({

  stream,

  studentName,

}: Props) {

  const videoRef =
    useRef<HTMLVideoElement>(
      null
    );

  useEffect(() => {

    if (
      videoRef.current
    ) {

      videoRef.current.srcObject =
        stream;
    }

  }, [stream]);

  return (

    <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full bg-black"
      />

      <div className="p-4 font-bold text-lg">
        {studentName}
      </div>

    </div>
  );
}
