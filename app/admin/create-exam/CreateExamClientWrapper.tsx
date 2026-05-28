"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const CreateExamClient = dynamic(
  () => import("./CreateExamClient"),
  {
    ssr: false,
  }
);

export default function CreateExamClientWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateExamClient />
    </Suspense>
  );
}