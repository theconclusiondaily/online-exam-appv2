"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase }
from "@/lib/supabase/client";

import {
  useRouter,
} from "next/navigation";

import AdminGuard from "@/components/AdminGuard";

export default function CreateExamPage() {

  const router =
    useRouter();

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [rewardPool,
    setRewardPool] =
    useState("");

  const [institutes,
    setInstitutes] =
    useState<any[]>([]);

  const [selectedInstitute,
    setSelectedInstitute] =
    useState("");

const [duration,
  setDuration] =
  useState("30");

  const [startTime,
    setStartTime] =
    useState("");

  const [endTime,
    setEndTime] =
    useState("");
  const [questions,
  setQuestions] =
  useState<any[]>([]);

const [selectedQuestions,
  setSelectedQuestions] =
  useState<string[]>([]);

const [subjectFilter,
  setSubjectFilter] =
  useState("");
useEffect(() => {

  async function fetchData() {

    // FETCH INSTITUTES

    const {
      data,
      error,
    } = await supabase

      .from("institutes")

      .select("*")

      .order(
        "name",
        {
          ascending: true,
        }
      );

    console.log(data);

    console.log(error);

    if (data) {

      setInstitutes(
        data
      );
    }

    // FETCH QUESTIONS

    const {
      data: questionData,
    } = await supabase

      .from("questions")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    setQuestions(
      questionData || []
    );
  }

  fetchData();

}, []);
  // CREATE EXAM

  async function createExam() {
const {
  data: { user },
} = await supabase.auth.getUser();
    if (
  !title ||
  !startTime ||
  !endTime ||
  !selectedInstitute ||
  !duration
) {

      alert(
        "Fill all required fields"
      );

      return;
    }

   const {
  data: createdExam,
  error,
} = await supabase

  .from("exams")

  .insert([
    {

      title,

      description,

      reward_pool:
        rewardPool,

      duration:
        Number(duration),

      institute_id:
        selectedInstitute,

      created_by:
        user?.id,

      start_time:
        new Date(
          startTime
        ).toISOString(),

      end_time:
        new Date(
          endTime
        ).toISOString(),

      status:
        "draft",

      published:
        false,

      cancelled:
        false,

    },
  ])

  .select()

  .single();

    if (error) {

      console.log(error);

      alert(
        "Failed to create exam"
      );

      return;
    }

    alert(
      "Exam created successfully"
    );

    router.push(
      "/admin"
    );
    if (
  selectedQuestions.length > 0
) {

  const mappings =
    selectedQuestions.map(
      (questionId) => ({

        exam_id:
          createdExam.id,

        question_id:
          questionId,

      })
    );

  await supabase

    .from(
      "exam_questions"
    )

    .insert(mappings);
}
  }

  return (

    <AdminGuard>

      <main className="min-h-screen p-8 bg-gray-50">

        <div className="max-w-2xl mx-auto bg-white border rounded-3xl p-8 shadow-sm">

          <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold">

    Create Exam

  </h1>

  <a
    href="/admin"
    className="bg-black text-white px-5 py-2 rounded-xl"
  >

    Dashboard

  </a>

</div>

          <div className="space-y-6">

            {/* TITLE */}

            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            {/* DESCRIPTION */}

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4 h-32"
            />

            {/* REWARD */}

            <input
              type="number"
              placeholder="Reward Pool"
              value={rewardPool}
              onChange={(e) =>
                setRewardPool(
                  e.target.value
                )
              }
              className="w-full border rounded-2xl p-4"
            />

            {/* INSTITUTE */}

            <div>

              <p className="font-semibold mb-2">

                Institute

              </p>

              <select
                value={
                  selectedInstitute
                }
                onChange={(e) =>
                  setSelectedInstitute(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              >

                <option value="">
                  Select Institute
                </option>

                {institutes.map(
                  (institute) => (

                    <option
                      key={institute.id}
                      value={institute.id}
                    >

                      {institute.name}

                    </option>

                  )
                )}

              </select>

            </div>
            {/* DURATION */}

<div>

  <p className="font-semibold mb-2">

    Duration (Minutes)

  </p>

  <input
    type="number"
    value={duration}
    onChange={(e) =>
      setDuration(
        e.target.value
      )
    }
    className="w-full border rounded-2xl p-4"
  />

</div>

            {/* START TIME */}

            <div>

              <p className="font-semibold mb-2">

                Start Time

              </p>

              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

            </div>

            {/* END TIME */}

            <div>

              <p className="font-semibold mb-2">

                End Time

              </p>

              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) =>
                  setEndTime(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl p-4"
              />

            </div>
{/* QUESTION BANK */}

<div className="border rounded-3xl p-5 bg-gray-50">

  <div className="flex items-center justify-between mb-5">

    <h2 className="text-2xl font-bold">

      Question Bank

    </h2>

    <div className="bg-black text-white px-4 py-2 rounded-xl font-bold">

      {
        selectedQuestions.length
      }
      {" "}
      Selected

    </div>

  </div>

  <input
    type="text"
    placeholder="Filter by Subject"
    value={subjectFilter}
    onChange={(e) =>
      setSubjectFilter(
        e.target.value
      )
    }
    className="w-full border rounded-2xl p-4 mb-5"
  />

  <div className="max-h-[400px] overflow-y-auto space-y-4">

    {questions

      .filter((q) =>

        !subjectFilter ||

        q.subject
          ?.toLowerCase()
          .includes(
            subjectFilter.toLowerCase()
          )
      )

      .map((q) => (

        <div
          key={q.id}
          className="border rounded-2xl p-4 bg-white"
        >

          <div className="flex justify-between gap-4">

            <div>

              <p className="font-bold mb-2">

                {q.question}

              </p>

              <div className="flex flex-wrap gap-2 text-sm">

                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-xl">

                  {q.subject}

                </div>

                <div
                  className={`
                    px-3 py-1 rounded-xl

                    ${
                      q.difficulty === "easy"
                        ? "bg-green-100 text-green-700"

                        : q.difficulty === "hard"

                        ? "bg-red-100 text-red-700"

                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {q.difficulty}

                </div>

              </div>

            </div>

            <input
              type="checkbox"

              checked={
                selectedQuestions.includes(
                  q.id
                )
              }

              onChange={(e) => {

                if (
                  e.target.checked
                ) {

                  setSelectedQuestions([
                    ...selectedQuestions,
                    q.id,
                  ]);

                } else {

                  setSelectedQuestions(

                    selectedQuestions.filter(
                      (id) =>
                        id !== q.id
                    )
                  );
                }
              }}

              className="w-6 h-6"
            />

          </div>

        </div>

      ))}

  </div>

</div>
            {/* BUTTON */}

            <button
              onClick={
                createExam
              }
              className="bg-black text-white w-full py-4 rounded-2xl font-bold"
            >

              Create Exam

            </button>

          </div>

        </div>

      </main>

    </AdminGuard>
  );
}