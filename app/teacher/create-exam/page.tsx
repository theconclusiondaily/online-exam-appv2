"use client";

import Link from "next/link";

export default function TeacherCreateExamPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">

            Create Exam

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

          <input
            type="text"
            placeholder="Exam Title"
            className="border p-4 rounded-xl w-full"
          />

          <textarea
            placeholder="Exam Description"
            className="border p-4 rounded-xl w-full h-32"
          />

          <input
            type="number"
            placeholder="Duration (Minutes)"
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="number"
            placeholder="Reward Pool"
            className="border p-4 rounded-xl w-full"
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >

            Create Exam

          </button>

        </div>

      </div>

    </main>
  );
}