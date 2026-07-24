"use client";

import ExamManagerContainer
from "@/components/exam-manager/ExamManagerContainer";
import TCDLogo from "@/components/brand/TCDLogo";
export default function ExamsPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-7xl mx-auto">
<div className="mb-6">
  <TCDLogo size={64} />
</div>
        <ExamManagerContainer />

      </div>

    </main>

  );

}