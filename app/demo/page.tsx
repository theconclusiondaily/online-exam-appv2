"use client";

import Link from "next/link";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        TCD Demo Mode
      </h1>

      <p className="text-zinc-400 mb-8">
        Experience The Conclusion Daily
      </p>

      <Link
        href="/demo/test"
        className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold"
      >
        Start Demo Test
      </Link>
    </div>
  );
}