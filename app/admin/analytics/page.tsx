"use client";

import {
  useEffect,
  useState,
} from "react";

import AdminGuard from "@/components/AdminGuard";

import { supabase }
from "@/lib/supabase/client";

export default function AnalyticsPage() {

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  const [analytics,
    setAnalytics] =
    useState<any[]>([]);

  useEffect(() => {

    async function loadAnalytics() {

      // FETCH INSTITUTES

      const {
        data: instituteData,
      } = await supabase
        .from("institutes")
        .select("*")
        .order("name", {
          ascending: true,
        });

      if (!instituteData) return;

      setInstitutes(
        instituteData
      );

      const analyticsData =
        await Promise.all(

          instituteData.map(
            async (
              institute
            ) => {

              // USERS

              const {
                data: users,
              } = await supabase
                .from("users")
                .select("*")
                .eq(
                  "institute_id",
                  institute.id
                );

              // EXAMS

              const {
                data: exams,
              } = await supabase
                .from("exams")
                .select("*")
                .eq(
                  "institute_id",
                  institute.id
                );

              const examIds =
                exams?.map(
                  (exam) =>
                    exam.id
                ) || [];

              // ATTEMPTS

              let attempts: any[] =
                [];

              if (
                examIds.length > 0
              ) {

                const {
                  data:
                    attemptsData,
                } = await supabase
                  .from(
                    "exam_attempts"
                  )
                  .select("*")
                  .in(
                    "exam_id",
                    examIds
                  );

                attempts =
                  attemptsData || [];
              }

              // AVERAGE SCORE

              const totalScore =
                attempts.reduce(
                  (
                    acc,
                    item
                  ) =>
                    acc +
                    (item.score ||
                      0),
                  0
                );

              const averageScore =
                attempts.length > 0

                  ? Math.round(
                      totalScore /
                        attempts.length
                    )

                  : 0;

              // TOPPER

              let topStudent =
                "No Attempts";

              let topScore = 0;

              attempts.forEach(
                (attempt) => {

                  if (
                    attempt.score >
                    topScore
                  ) {

                    topScore =
                      attempt.score;

                    topStudent =
                      attempt.user_id;
                  }
                }
              );

              return {

                instituteName:
                  institute.name,

                city:
                  institute.city,

                totalStudents:
                  users?.length ||
                  0,

                totalExams:
                  exams?.length ||
                  0,

                totalAttempts:
                  attempts.length,

                averageScore,

                topStudent,

                topScore,
              };
            }
          )
        );

      setAnalytics(
        analyticsData
      );
    }

    loadAnalytics();

  }, []);

  return (

    <AdminGuard>

      <main className="min-h-screen bg-gray-50 p-6 md:p-5">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center mb-4">

  <h1 className="text-2xl font-bold">

    Analytics

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-4 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          <div className="space-y-6">

            {analytics.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white border rounded-3xl p-6 shadow-sm"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                    {/* LEFT */}

                    <div>

                      <h2 className="text-3xl font-bold mb-2">

                        {item.instituteName}

                      </h2>

                      <p className="text-brand">

                        {item.city}

                      </p>

                    </div>

                    {/* STATS */}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">

                      <div>

                        <p className="text-tcd-primary text-sm mb-1">

                          Students

                        </p>

                        <h3 className="text-3xl font-bold">

                          {item.totalStudents}

                        </h3>

                      </div>

                      <div>

                        <p className="text-tcd-primary text-sm mb-1">

                          Exams

                        </p>

                        <h3 className="text-3xl font-bold">

                          {item.totalExams}

                        </h3>

                      </div>

                      <div>

                        <p className="text-tcd-primary text-sm mb-1">

                          Learning Journeys

                        </p>

                        <h3 className="text-3xl font-bold">

                          {item.totalAttempts}

                        </h3>

                      </div>

                      <div>

                        <p className="text-tcd-primary text-sm mb-1">

                          Avg Score

                        </p>

                        <h3 className="text-3xl font-bold text-blue-600">

                          {item.averageScore}

                        </h3>

                      </div>

                      <div>

                        <p className="text-tcd-primary text-sm mb-1">

                          Top Score

                        </p>

                        <h3 className="text-3xl font-bold text-green-600">

                          {item.topScore}

                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

            {analytics.length === 0 && (

              <div className="bg-white border rounded-3xl p-6 text-center text-tcd-primary">

                No analytics available yet

              </div>

            )}

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}