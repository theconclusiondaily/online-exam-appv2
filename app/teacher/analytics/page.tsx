"use client";

import Link from "next/link";

export default function TeacherAnalyticsPage() {

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold">

            Teacher Analytics

          </h1>

          <Link
            href="/teacher"
            className="bg-black text-white px-5 py-2 rounded-xl"
          >

            Dashboard

          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white border rounded-3xl p-8">

            <p className="text-gray-500 mb-2">

              Total Students

            </p>

            <h2 className="text-5xl font-bold">

              0

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-8">

            <p className="text-gray-500 mb-2">

              Exams Conducted

            </p>

            <h2 className="text-5xl font-bold text-blue-600">

              0

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-8">

            <p className="text-gray-500 mb-2">

              Total Attempts

            </p>

            <h2 className="text-5xl font-bold text-green-600">

              0

            </h2>

          </div>

        </div>

      </div>

    </main>
  );
}