"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  getQuestions,
  getQuestion,
  deleteQuestion,
} from "@/components/question-builder/services/questionService";
import QuestionStats from "@/components/question-builder/QuestionStats";
import QuestionFilters from "@/components/question-builder/QuestionFilters";
import QuestionTable from "@/components/question-builder/question-bank/QuestionTable";
import BulkToolbar from "@/components/question-builder/question-bank/BulkToolbar";
import QuestionPreviewDrawer from "@/components/question-builder/question-bank/QuestionPreviewDrawer";
import { deleteQuestions } from "@/components/question-builder/services/deleteQuestions";
import {
  bulkDelete,
  bulkPublish,
  bulkArchive,
} from "@/components/question-builder/services/bulkQuestionService";
import AddToPaperDialog from "@/components/question-builder/question-bank/AddToPaperDialog";
interface Question {
  id: string;
  question: string;
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  marks: number;
  language: string;
  question_type: string;
  created_at: string;
}

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("");
const [selected, setSelected] = useState<string[]>([]);
const [previewOpen, setPreviewOpen] = useState(false);
const [previewQuestion, setPreviewQuestion] = useState<any>(null);
  async function loadQuestions() {
    try {
      setLoading(true);

      const data = await getQuestions();

      setQuestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
async function handlePreview(id: string) {
  try {
    const question = await getQuestion(id);

    setPreviewQuestion(question);

    setPreviewOpen(true);
  } catch (err) {
    console.error(err);
    alert("Failed to load preview.");
  }
}
  useEffect(() => {
    loadQuestions();
  }, []);
const [paperDialogOpen, setPaperDialogOpen] =
    useState(false);
  const filtered = questions.filter((q) => {
    const matchesSearch = q.question
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesSubject =
      !subject || q.subject === subject;

    const matchesDifficulty =
      !difficulty || q.difficulty === difficulty;

    const matchesLanguage =
      !language || q.language === language;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesDifficulty &&
      matchesLanguage
    );
  });
async function handleDelete(id: string) {

  if (!confirm("Delete this question?")) {
    return;
  }

  try {

    await deleteQuestion(id);

    await loadQuestions();

  } catch (err) {

    console.error(err);

    alert("Failed to delete question.");

  }

}
async function handleBulkDelete() {

  if (selected.length === 0) return;

  const ok = confirm(
    `Delete ${selected.length} selected questions?`
  );

  if (!ok) return;

  try {

    await deleteQuestions(selected);

    setSelected([]);

    await loadQuestions();

    alert("Questions deleted successfully.");

  } catch (err) {

    console.error(err);

    alert("Failed to delete questions.");

  }

}

async function handleBulkPublish() {

  if (!selected.length) return;

  await bulkPublish(selected);

  setSelected([]);

  await loadQuestions();
}
async function handleBulkArchive() {

  if (!selected.length) return;

  await bulkArchive(selected);

  setSelected([]);

  await loadQuestions();
}

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-[#0F3D91]">
            Question Bank
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all questions in TCD
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={loadQuestions}
            className="border rounded-xl px-4 py-3 flex items-center gap-2 hover:bg-slate-50"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <Link
            href="/admin/questions/new"
            className="bg-[#0F3D91] text-white rounded-xl px-5 py-3 flex items-center gap-2 hover:bg-[#0c3278]"
          >
            <Plus size={18} />
            New Question
          </Link>
<Link
  href="/admin/questions/import"
  className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-5
    py-3
    rounded-2xl
    font-bold
  "
>
  Bulk Import
</Link>
        </div>

      </div>

      {/* Statistics */}

      <QuestionStats
        total={questions.length}
        physics={
          questions.filter(
            (q) => q.subject === "Physics"
          ).length
        }
        chemistry={
          questions.filter(
            (q) => q.subject === "Chemistry"
          ).length
        }
        biology={
          questions.filter(
            (q) =>
              q.subject === "Biology" ||
              q.subject === "Math"
          ).length
        }
      />

      {/* Filters */}

      <QuestionFilters
        search={search}
        setSearch={setSearch}
        subject={subject}
        setSubject={setSubject}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        language={language}
        setLanguage={setLanguage}
      />
<BulkToolbar
  selectedCount={selected.length}
  onClear={() => setSelected([])}
  onDelete={handleBulkDelete}
  onPublish={handleBulkPublish}
  onArchive={handleBulkArchive}
  onAddToPaper={() => setPaperDialogOpen(true)}
  onAddToExam={() => console.log(selected)}
/>
      {/* Table */}

    <QuestionTable
  questions={filtered}
  loading={loading}
  selected={selected}
  setSelected={setSelected}
  onDelete={handleDelete}
  onPreview={handlePreview}
/>
<QuestionPreviewDrawer
  open={previewOpen}
  question={previewQuestion}
  onClose={() => {
    setPreviewOpen(false);
    setPreviewQuestion(null);
  }}
/>
<AddToPaperDialog
    open={paperDialogOpen}
    selectedIds={selected}
    onClose={() => setPaperDialogOpen(false)}
    onSuccess={async () => {
        setSelected([]);
        await loadQuestions();
    }}
/>
    </div>
  );
}