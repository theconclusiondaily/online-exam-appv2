"use client";

import {
  useEffect,
  useState,
} from "react";
import AdminGuard from "@/components/AdminGuard";
import { supabase }
from "@/lib/supabase/client";
import Papa from "papaparse";
export default function QuestionsPage() {

  const [questions,
    setQuestions] =
    useState<any[]>([]);

  const [exams,
    setExams] =
    useState<any[]>([]);

  const [selectedExam,
    setSelectedExam] =
    useState("");

  const [question,
    setQuestion] =
    useState("");

  const [optionA,
    setOptionA] =
    useState("");

  const [optionB,
    setOptionB] =
    useState("");

  const [optionC,
    setOptionC] =
    useState("");

  const [optionD,
    setOptionD] =
    useState("");

  const [correctAnswer,
    setCorrectAnswer] =
    useState("");

  const [subject,
  setSubject] =
  useState("");

const [chapter,
  setChapter] =
  useState("");

const [topic,
  setTopic] =
  useState("");

const [difficulty,
  setDifficulty] =
  useState("medium");

const [tags,
  setTags] =
  useState("");

  async function fetchExams() {

    const { data } =
      await supabase
        .from("exams")
        .select("*")
        .order("id", {
  ascending: false,
});
       

    if (data) {

      setExams(data);
    }
  }

  async function fetchQuestions() {

    let query =
      supabase
        .from("questions")
        .select("*")
        .order("id", {
  ascending: false,
});

    if (selectedExam) {

      query = query.eq(
        "exam_id",
        selectedExam
      );
    }

    const {
      data,
      error,
    } = await query;

    console.log(data);
    console.log(error);

    if (data) {

      setQuestions(data);
    }
  }

  useEffect(() => {

    fetchExams();

  }, []);

  useEffect(() => {

   fetchQuestions();

  }, [selectedExam]);

  async function addQuestion() {

    if (
      !selectedExam ||
      !question ||
      !optionA ||
      !optionB ||
      !optionC ||
      !optionD ||
      !correctAnswer
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

   const {
  data: insertedQuestion,
  error,
} = await supabase

  .from("questions")

  .insert([
    {
      exam_id: selectedExam,

      question,

      option_a: optionA,
      option_b: optionB,
      option_c: optionC,
      option_d: optionD,

      correct_answer:
        correctAnswer,

      subject,
      chapter,
      topic,
      difficulty,

      tags:
        tags
          .split(",")
          .map((t) =>
            t.trim()
          ),
    },
  ])

  .select()

  .single();
    if (error) {

      console.log(error);

      alert(
        "Failed to add question"
      );

      return;
    }
await supabase

  .from("exam_questions")

  .insert({
    exam_id:
      selectedExam,

    question_id:
      insertedQuestion.id,
  });
    alert(
      "Question added"
    );

    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
    setSubject("");
    setChapter("");
    setTopic("");
    setDifficulty(
  "medium"
);
     setTags("");

    await fetchQuestions();

await fetchExams();
  }

  async function deleteQuestion(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Delete this question?"
      );

    if (!confirmDelete)
      return;

    const { error } =
      await supabase
        .from("questions")
        .delete()
        .eq("id", id);

    if (error) {

      console.log(error);

      alert(
        "Delete failed"
      );

      return;
    }

    await fetchQuestions();

await fetchExams();
  }
      async function handleCSVUpload(
  e: any
) {

  const file =
    e.target.files[0];

  if (!file) return;

  if (!selectedExam) {

    alert(
      "Select exam first"
    );

    return;
  }

  Papa.parse(file, {

    header: true,

    skipEmptyLines: true,

    complete: async (
      results: any
    ) => {
    console.log(
  "CSV DATA",
  results.data
);

alert(
  JSON.stringify(
    results.data
  )
);
      console.log(results.data);

      const formattedQuestions =
  results.data.map(
    (row: any) => ({

      exam_id:
        selectedExam,

      question:
        row.question?.trim(),

      option_a:
        row.option_a?.trim(),

      option_b:
        row.option_b?.trim(),

      option_c:
        row.option_c?.trim(),

      option_d:
        row.option_d?.trim(),

      correct_answer:
        row.correct_answer?.trim(),
    })
  );

      const {
  data: insertedQuestions,
  error,
} = await supabase

  .from("questions")

  .insert(
    formattedQuestions
  )

  .select("id");

  if (
  !error &&
  insertedQuestions
) {

  const mappings =
    insertedQuestions.map(
      (q) => ({
        exam_id:
          selectedExam,

        question_id:
          q.id,
      })
    );

  const {
    error: mappingError,
  } = await supabase

    .from(
      "exam_questions"
    )

    .insert(mappings);

  if (mappingError) {

    console.log(
      mappingError
    );

    alert(
      "Question mapping failed"
    );

    return;
  }
}
      if (error) {

        console.log(error);

        alert(
          "CSV upload failed"
        );

        return;
      }

      alert(
  "Questions uploaded successfully"
);

await fetchQuestions();

await fetchExams();
    },
  });
}

  return (

  <AdminGuard>

    <main className="min-h-screen p-6 md:p-5 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center mb-4">

  <h1 className="text-2xl font-bold">

    Question Paper Builder

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-4 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

        {/* ADD QUESTION */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm mb-10">

          <h2 className="text-2xl font-bold mb-3">
            Add Question
          </h2>

          <div className="space-y-5">
            <div className="border border-dashed border-gray-300 rounded-2xl p-5 bg-gray-50">

  <p className="font-bold mb-3">
    Upload CSV Questions
  </p>

  <input
    type="file"
    accept=".csv"
    onChange={handleCSVUpload}
    className="w-full"
  />

  <div className="mt-4 text-sm text-brand space-y-1">

    <p>
      CSV format:
    </p>

    <p>
      question,option_a,option_b,option_c,option_d,correct_answer
    </p>

  </div>

</div>

            <select
              value={selectedExam}
              onChange={(e) =>
                setSelectedExam(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            >

              <option value="">
                Select Exam
              </option>

              {exams.map((exam) => (

                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.title}
                </option>

              ))}

            </select>
<input
  type="text"
  placeholder="Subject"
  value={subject}
  onChange={(e) =>
    setSubject(
      e.target.value
    )
  }
  className="w-full border rounded-2xl p-4"
/>

<input
  type="text"
  placeholder="Chapter"
  value={chapter}
  onChange={(e) =>
    setChapter(
      e.target.value
    )
  }
  className="w-full border rounded-2xl p-4"
/>

<input
  type="text"
  placeholder="Topic"
  value={topic}
  onChange={(e) =>
    setTopic(
      e.target.value
    )
  }
  className="w-full border rounded-2xl p-4"
/>

<select
  value={difficulty}
  onChange={(e) =>
    setDifficulty(
      e.target.value
    )
  }
  className="w-full border rounded-2xl p-4"
>

  <option value="easy">

    Easy

  </option>

  <option value="medium">

    Medium

  </option>

  <option value="hard">

    Hard

  </option>

</select>

<input
  type="text"
  placeholder="Tags (comma separated)"
  value={tags}
  onChange={(e) =>
    setTags(
      e.target.value
    )
  }
  className="w-full border rounded-2xl p-4"
/>
            <textarea
              placeholder="Question"
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4 h-32"
            />

            <input
              type="text"
              placeholder="Option A"
              value={optionA}
              onChange={(e) =>
                setOptionA(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Option B"
              value={optionB}
              onChange={(e) =>
                setOptionB(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Option C"
              value={optionC}
              onChange={(e) =>
                setOptionC(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Option D"
              value={optionD}
              onChange={(e) =>
                setOptionD(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            <input
              type="text"
              placeholder="Correct Answer"
              value={correctAnswer}
              onChange={(e) =>
                setCorrectAnswer(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            <button
              onClick={addQuestion}
              className="bg-black text-white px-6 py-3 rounded-2xl font-bold w-full"
            >
              Add Question
            </button>

          </div>

        </div>

        {/* QUESTION LIST */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">

            <h2 className="text-2xl font-bold">
              Questions
            </h2>

            <select
              value={selectedExam}
              onChange={(e) =>
                setSelectedExam(
                  e.target.value
                )
              }
              className="border rounded-2xl p-3"
            >

              <option value="">
                All Exams
              </option>

              {exams.map((exam) => (

                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.title}
                </option>

              ))}

            </select>

          </div>

          <div className="space-y-6">

            {questions.map((q, index) => (

              <div
                key={q.id}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-2 mb-4">

                  <h3 className="font-bold text-lg leading-relaxed">
                    Q{index + 1}. {q.question}
                  </h3>

                  <button
                    onClick={() =>
                      deleteQuestion(q.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div className="border rounded-xl p-3">
                    A. {q.option_a}
                  </div>

                  <div className="border rounded-xl p-3">
                    B. {q.option_b}
                  </div>

                  <div className="border rounded-xl p-3">
                    C. {q.option_c}
                  </div>

                  <div className="border rounded-xl p-3">
                    D. {q.option_d}
                  </div>

                </div>
<div className="flex flex-wrap gap-3 mt-4 mb-4">

  <div className="bg-tcd-gold/20 text-tcd-blue px-3 py-1 rounded-xl text-sm font-bold">

    {q.subject || "General"}

  </div>

  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-xl text-sm font-bold">

    {q.chapter || "Chapter"}

  </div>

  <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-xl text-sm font-bold">

    {q.topic || "Topic"}

  </div>

  <div
    className={`
      px-3 py-1 rounded-xl text-sm font-bold

      ${
        q.difficulty === "easy"
          ? "bg-green-100 text-green-700"

          : q.difficulty === "hard"

          ? "bg-red-100 text-red-700"

          : "bg-yellow-100 text-yellow-700"
      }
    `}
  >

    {q.difficulty?.toUpperCase()}

  </div>

</div>
                <div className="mt-4 bg-green-100 text-green-700 border border-green-300 rounded-xl p-3 font-bold">
                  Correct Answer: {q.correct_answer}
                </div>

              </div>

            ))}

            {questions.length === 0 && (

              <div className="text-center text-tcd-primary py-10">
                No questions found
              </div>

            )}

          </div>

        </div>

      </div>

    </main>

</AdminGuard>
);
}
