"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("tcd_demo", "true");
    router.replace("/dashboard");
  }, [router]);

  return <div>Loading Demo...</div>;
}