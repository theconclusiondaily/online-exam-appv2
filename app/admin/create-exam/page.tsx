import { Suspense } from "react";
import CreateExamClient from "./CreateExamClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateExamClient />
    </Suspense>
  );
}