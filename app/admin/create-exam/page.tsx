"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

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

  // FETCH INSTITUTES

  useEffect(() => {

    async function fetchInstitutes() {

      const {
        data,
        error,
      } = await supabase
        .from("institutes")
        .select("*")
        .order("name", {
          ascending: true,
        });

      console.log(data);
      console.log(error);

      if (data) {

        setInstitutes(
          data
        );
      }
    }

    fetchInstitutes();

  }, []);

  // CREATE EXAM

  async function createExam() {

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

    const { error } =
      await supabase
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

            start_time:
              new Date(
                startTime
              ).toISOString(),

            end_time:
              new Date(
                endTime
              ).toISOString(),
          },
        ]);

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