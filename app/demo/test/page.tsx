"use client";

import { demoTest } from "@/data/demo-test";

export default function DemoTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {demoTest.title}
      </h1>

      <p className="mt-4">
        Questions: {demoTest.questions.length}
      </p>

      <p>
        Duration: {demoTest.duration} mins
      </p>
    </div>
  );
}