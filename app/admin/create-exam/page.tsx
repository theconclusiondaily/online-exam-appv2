"use client";

import ExamBuilderContainer
from "@/components/exam-builder/ExamBuilderContainer";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
export default function CreateExamPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-7xl mx-auto">
<AdminPageHeader
  title="Create Exam"
  description="Create and publish competitive exams."
/>
        <ExamBuilderContainer />

      </div>

    </main>

  );

}