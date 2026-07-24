"use client";

import ImportHeader from "@/components/question-import/ImportHeader";
import TemplateDownload from "@/components/question-import/TemplateDownload";
import ExcelUploader from "@/components/question-import/ExcelUploader";
import TCDLogo from "@/components/brand/TCDLogo";
export default function QuestionImportPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-8">
<div className="max-w-7xl mx-auto mb-6">
  <TCDLogo size={64} />
</div>
      <div className="max-w-7xl mx-auto space-y-8">

        <ImportHeader />

        <TemplateDownload />

        <ExcelUploader />

      </div>

    </main>

  );

}