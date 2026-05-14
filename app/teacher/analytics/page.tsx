"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function TeacherAnalyticsPage() {

  const router = useRouter();

  const [authorized,
    setAuthorized] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [students,
    setStudents] =
    useState(0);

  const [exams,
    setExams] =
    useState(0);

  const [attempts,
    setAttempts] =
    useState(0);

  useEffect(() => {

    async function checkAuth() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/login");

        return;
      }

      const {
        data: profile,
      } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (
        profile?.role !==
        "teacher"
      ) {

        router.push("/dashboard");

        return;
      }

      setAuthorized(true);

      // STUDENTS

      const {
        data: studentsData,
      } = await supabase
        .from("users")
        .select("*")
        .eq(
          "institute_id",
          profile.institute_id
        )
        .eq(
          "role",
          "student"
        );

      setStudents(
        studentsData?.length || 0
      );

      // EXAMS

      const {
        data: examsData,
      } = await supabase
        .from("exams")
        .select("*")
        .eq(
          "institute_id",
          profile.institute_id
        );

      setExams(
        examsData?.length || 0
      );

      // ATTEMPTS

      const examIds =
        examsData?.map(
          (exam) => exam.id
        ) || [];

      if (
        examIds.length > 0
      ) {

        const {
          data: attemptsData,
        } = await supabase
          .from("exam_attempts")
          .select("*")
          .in(
            "exam_id",
            examIds
          );

        setAttempts(
          attemptsData?.length || 0
        );
      }

      setLoading(false);
    }

    checkAuth();

  }, [router]);

  if (loading) {

    return (
      <main className="p-10">
        Loading...
      </main>
    );
  }

  if (!authorized) {
    return null;
  }

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

              {students}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-8">

            <p className="text-gray-500 mb-2">

              Exams Conducted

            </p>

            <h2 className="text-5xl font-bold text-blue-600">

              {exams}

            </h2>

          </div>

          <div className="bg-white border rounded-3xl p-8">

            <p className="text-gray-500 mb-2">

              Total Attempts

            </p>

            <h2 className="text-5xl font-bold text-green-600">

              {attempts}

            </h2>

          </div>

        </div>

      </div>

    </main>
  );
}