"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import { supabase }
from "@/lib/supabase/client";

export default function PapersPage() {

  const router = useRouter();

  const [title,
    setTitle] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [paperClass,
    setPaperClass] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [totalQuestions,
    setTotalQuestions] =
    useState("");

  const [papers,
    setPapers] =
    useState<any[]>([]);

  // FETCH PAPERS

  async function fetchPapers() {

    const {
      data,
      error,
    } = await supabase
      .from("question_papers")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    console.log(data);
    console.log(error);

    if (data) {
      setPapers(data);
    }
  }

  // ADMIN CHECK

  useEffect(() => {

    async function initializePage() {

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (!user) {

        router.push("/");

        return;
      }

      const adminEmails = [

        "admin@theconclusiondaily.com",

        "kumawat.rrahul@gmail.com",

        "theconclusiondaily@gmail.com",

      ];

      if (
        !adminEmails.includes(
          user.email || ""
        )
      ) {

        alert(
          "Access Denied"
        );

        router.push("/dashboard");

        return;
      }

      fetchPapers();
    }

    initializePage();

  }, []);

  // CREATE PAPER

  async function createPaper() {

    if (
      !title ||
      !subject ||
      !paperClass ||
      !duration ||
      !totalQuestions
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

    const {
      error,
    } = await supabase
      .from("question_papers")
      .insert([
        {
          title,
          subject,
          class: paperClass,
          duration:
            Number(duration),
          total_questions:
            Number(
              totalQuestions
            ),
        },
      ]);

    console.log(error);

    if (!error) {

      alert(
        "Question Paper Created"
      );

      setTitle("");
      setSubject("");
      setPaperClass("");
      setDuration("");
      setTotalQuestions("");

      fetchPapers();
    }
  }

  return (

    <main className="min-h-screen p-4 md:p-5 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* NAVBAR */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">

          <div className="flex justify-between items-center mb-4">

  <h1 className="text-2xl font-bold">

    Question Papers

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-4 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/admin"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/questions"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Questions
            </Link>

            <Link
              href="/admin/users"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Users
            </Link>

            <Link
              href="/admin/leaderboards"
              className="bg-white border px-4 py-2 rounded-xl"
            >
              Leaderboards
            </Link>

            <Link
              href="/admin/papers"
              className="bg-black text-white px-4 py-2 rounded-xl"
            >
              Question Papers
            </Link>

          </div>

        </div>

        {/* CREATE PAPER */}

        <div className="bg-white border rounded-2xl p-6 mb-10">

          <h2 className="text-2xl font-bold mb-3">
            Create Question Paper
          </h2>

          <div className="grid gap-2">

            <input
              type="text"
              placeholder="Paper Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              placeholder="Class"
              value={paperClass}
              onChange={(e) =>
                setPaperClass(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Duration (Minutes)"
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              placeholder="Total Questions"
              value={totalQuestions}
              onChange={(e) =>
                setTotalQuestions(
                  e.target.value
                )
              }
              className="border p-3 rounded-xl"
            />

            <button
              onClick={createPaper}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Create Paper
            </button>

          </div>

        </div>

        {/* PAPERS LIST */}

        <div className="space-y-4">

          {papers.map((paper) => (

            <div
              key={paper.id}
              className="bg-white border rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">

                <div>

                  <h2 className="text-2xl font-bold">
                    {paper.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Subject:
                    {" "}
                    {paper.subject}
                  </p>

                  <p className="text-gray-600">
                    Class:
                    {" "}
                    {paper.class}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-bold text-lg">
                    {paper.duration}
                    {" "}
                    mins
                  </p>

                  <p className="text-gray-700">
                    Duration
                  </p>

                  <p className="font-bold text-lg mt-3">
                    {paper.total_questions}
                  </p>

                  <p className="text-gray-700">
                    Questions
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}