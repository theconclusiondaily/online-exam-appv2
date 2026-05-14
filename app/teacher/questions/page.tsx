"use client";

import { useState } from "react";
import Link from "next/link";

export default function TeacherQuestionsPage() {

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

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">

            Upload Questions

          </h1>

          <Link
            href="/teacher"
            className="bg-black text-white px-5 py-2 rounded-xl"
          >

            Dashboard

          </Link>

        </div>

        {/* FORM */}

        <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6">

          <textarea
            placeholder="Enter Question"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            className="border p-4 rounded-xl w-full h-32"
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
            className="border p-4 rounded-xl w-full"
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
            className="border p-4 rounded-xl w-full"
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
            className="border p-4 rounded-xl w-full"
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
            className="border p-4 rounded-xl w-full"
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
            className="border p-4 rounded-xl w-full"
          />

          <button
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
          >

            Save Question

          </button>

        </div>

      </div>

    </main>
  );
}