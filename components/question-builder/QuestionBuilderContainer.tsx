"use client";

import { useState } from "react";

import StudioLayout from "./StudioLayout";
import QuestionHeader from "./QuestionHeader";
import MetadataBar from "./MetadataBar";
import RichQuestionEditor from "./RichQuestionEditor";
import OptionEditor from "./OptionEditor";
import ValidationPanel from "./ValidationPanel";
import { useQuestionBuilder } from "./hooks/useQuestionBuilder";
import SavePanel from "./SavePanel";
import StudentPreview from "@/components/question-builder/StudentPreview";
import { useAutoSave } from "./hooks/useAutoSave";
import { useLoadQuestion } from "./hooks/useLoadQuestion";
import { saveQuestion } from "./services/questionService";
import ImageUploader from "./ImageUploader";
import ExplanationEditor from "./ExplanationEditor";
export default function QuestionBuilderContainer() {

  const qb = useQuestionBuilder();
useAutoSave(
  qb.question,
  async (question) => {
    await saveQuestion({
      ...question,
      id: qb.questionId,
    });
  },
  5000
);
useLoadQuestion(
  qb.loadQuestion
);
const [, setActiveField] = useState("");
async function handleSaveDraft() {
  try {
   
    const id = await saveQuestion({
      ...qb.question,
      id: qb.questionId,
    });

    qb.setQuestionId(id);

    alert("Question saved successfully.");
  } catch (err) {
    console.error(err);
    alert("Failed to save question.");
  }
}
  return (

    <StudioLayout

      header={<QuestionHeader />}

      metadata={<MetadataBar />}

     editor={
  <div className="space-y-6">

    <RichQuestionEditor
      title="Question (English)"
      value={qb.question.questionEn}
      onChange={qb.updateQuestionEn}
    />

    <RichQuestionEditor
      title="Question (Hindi)"
      value={qb.question.questionHi}
      onChange={qb.updateQuestionHi}
    />

  </div>
}

      preview={
  <StudentPreview
    questionEn={qb.question.questionEn}
    questionHi={qb.question.questionHi}
    optionsEn={qb.question.optionsEn}
    optionsHi={qb.question.optionsHi}
  />
}

      options={
      <OptionEditor
  optionsEn={qb.question.optionsEn}
  optionsHi={qb.question.optionsHi}
  updateOptionEn={qb.updateOptionEn}
  updateOptionHi={qb.updateOptionHi}
  correctAnswer={qb.question.correctAnswer}
  setCorrectAnswer={qb.setCorrectAnswer}
  setActiveField={setActiveField}
/>
      }

      explanation={
  <div className="space-y-6">

    <RichQuestionEditor
      title="Explanation (English)"
      value={qb.question.explanationEn}
      onChange={qb.updateExplanationEn}
    />

    <RichQuestionEditor
      title="Explanation (Hindi)"
      value={qb.question.explanationHi}
      onChange={qb.updateExplanationHi}
    />

  </div>
}

      validation={
       <ValidationPanel
    questionEn={qb.question.questionEn}
    questionHi={qb.question.questionHi}
    optionsEn={qb.question.optionsEn}
    optionsHi={qb.question.optionsHi}
    correctAnswer={qb.question.correctAnswer}
/>
      }

      images={
  <SavePanel
    completion={qb.completion}
    onSaveDraft={handleSaveDraft}
    onPreview={() => {
      console.log("Preview");
    }}
    onPublish={() => {
      console.log("Published");
    }}
  />
}

    />

  );

}