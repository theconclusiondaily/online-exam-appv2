"use client";

import { useEffect, useState } from "react";
import TCDIntro from "@/components/TCDIntro";

interface Props {
  children: React.ReactNode;
}

export default function TCDIntroWrapper({
  children,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("tcd_intro_seen");

    setShowIntro(!seen);
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (showIntro) {
    return (
      <TCDIntro
        onComplete={() => {
          setShowIntro(false);
        }}
      />
    );
  }

  return <>{children}</>;
}