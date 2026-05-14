"use client";

import Link from "next/link";

export default function TeacherQuestionsPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

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

        <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6">

          <textarea
            placeholder="Enter Question"
            className="border p-4 rounded-xl w-full h-32"
          />

          <input
            type="text"
            placeholder="Option A"
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="text"
            placeholder="Option B"
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="text"
            placeholder="Option C"
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="text"
            placeholder="Option D"
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="text"
            placeholder="Correct Answer"
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