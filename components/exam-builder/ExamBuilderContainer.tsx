"use client";

import { useSearchParams } from "next/navigation";

import ExamHeader from "./ExamHeader";
import StepIndicator from "./StepIndicator";
import ExamSettings from "./ExamSettings";
import PaperSelector from "./PaperSelector";
import ScheduleSettings from "./ScheduleSettings";
import RewardSettings from "./RewardSettings";
import ExamPreview from "./ExamPreview";
import PublishPanel from "./PublishPanel";

import { useExamBuilder } from "./hooks/useExamBuilder";
import { usePublishedPapers } from "./hooks/usePublishedPapers";
import { useLoadExam } from "./hooks/useLoadExam";

import { saveExam } from "./services/saveExam";
import { updateExam } from "./services/updateExam";
import { publishExam } from "./services/publishExam";

export default function ExamBuilderContainer() {
  const searchParams = useSearchParams();

  const examId = searchParams.get("id") || undefined;

  const builder = useExamBuilder();

  const papers = usePublishedPapers();

  useLoadExam(
    examId,
    builder.loadExam
  );

  async function handleSave() {

  try {

    let exam;

    if (builder.exam.id) {

      exam = await updateExam(
        builder.exam.id,
        builder.exam
      );

    } else {

      exam = await saveExam(
        builder.exam
      );

      if (exam?.id) {

        builder.updateField(
          "id",
          exam.id
        );

      }

    }

    alert("Draft saved successfully.");

  } catch (error) {

    console.error(error);

    alert("Unable to save exam.");

  }

}

  async function handlePublish() {

  try {

    if (!builder.exam.title) {

      alert("Please enter Exam Title.");

      return;

    }

    if (!builder.exam.paper_id) {

      alert("Please select a Paper.");

      return;

    }

    let examId = builder.exam.id;

    if (!examId) {

      const saved =
        await saveExam(builder.exam);

      examId = saved.id;

    if (saved?.id) {
  builder.updateField("id", saved.id);
  examId = saved.id;
}

    }

   if (!examId) {
  throw new Error("Exam ID is missing.");
}

await publishExam(examId);

    alert("Exam Published Successfully.");

  } catch (error: any) {

  console.log("========== PUBLISH ERROR ==========");
  console.log(error);

  if (error instanceof Error) {
    console.log("Message:", error.message);
  }

  console.log("Keys:", Object.keys(error || {}));
  console.log("JSON:", JSON.stringify(error, null, 2));

  alert("Publish Failed.");
}

}

  return (
    <div className="space-y-8">

      <ExamHeader
        onSave={handleSave}
        onPublish={handlePublish}
      />

      <StepIndicator
        step={builder.step}
      />

      {builder.step === 1 && (
        <ExamSettings
          exam={builder.exam}
          updateField={builder.updateField}
        />
      )}

      {builder.step === 2 && (
        <PaperSelector
          papers={papers.papers}
          loading={papers.loading}
          paperId={builder.exam.paper_id}
          onSelect={(id) =>
            builder.updateField("paper_id", id)
          }
        />
      )}

      {builder.step === 3 && (
        <ScheduleSettings
          exam={builder.exam}
          updateField={builder.updateField}
        />
      )}

      {builder.step === 4 && (
        <RewardSettings
          exam={builder.exam}
          updateField={builder.updateField}
        />
      )}

      {builder.step === 5 && (
        <ExamPreview
          exam={builder.exam}
          paperTitle={
            papers.papers.find(
              (p) => p.id === builder.exam.paper_id
            )?.title
          }
        />
      )}

      {builder.step === 6 && (
        <PublishPanel
          exam={builder.exam}
          onSave={handleSave}
          onPublish={handlePublish}
        />
      )}

      <div className="flex justify-between">

        <button
          disabled={builder.step === 1}
          onClick={builder.previousStep}
          className="px-6 py-3 rounded-2xl border font-bold disabled:opacity-40"
        >
          Previous
        </button>

        {builder.step < 6 && (
          <button
            onClick={builder.nextStep}
            className="bg-tcd-blue text-white px-8 py-3 rounded-2xl font-bold"
          >
            Next
          </button>
        )}

      </div>

    </div>
  );
}