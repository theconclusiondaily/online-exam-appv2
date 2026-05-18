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

export default function TeacherCreateExamPage() {

  const router = useRouter();

  const [authorized,
    setAuthorized] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [rewardPool,
    setRewardPool] =
    useState("");
const [startTime,
  setStartTime] =
  useState("");

const [endTime,
  setEndTime] =
  useState("");
  const [userId,
    setUserId] =
    useState("");

  const [instituteId,
    setInstituteId] =
    useState("");

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
        .eq("email", user.email)
        .single();

      if (
        profile?.role !== "teacher" &&
        profile?.role !== "admin"
      ) {

        router.push("/dashboard");

        return;
      }

      setUserId(user.id);

      setInstituteId(
        profile.institute_id
      );

      setAuthorized(true);

      setLoading(false);
    }

    checkAuth();

  }, [router]);

  async function createExam() {

    const {
      error,
    } = await supabase
      .from("exams")
      .insert([
  {

  title,

  description,

  duration:
    Number(duration),

  reward_pool:
    Number(rewardPool),

  created_by:
    userId,

  institute_id:
    instituteId,

  status: "draft",

published: false,

cancelled: false,


  start_time:
    new Date(
      startTime
    ).toISOString(),

  end_time:
    new Date(
      endTime
    ).toISOString(),
}
]);

    if (error) {

      alert(error.message);

    } else {

      alert(
        "Exam Created Successfully"
      );

      setTitle("");
      setDescription("");
      setDuration("");
      setRewardPool("");
    }
  }

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

      <div className="max-w-4xl mx-auto">

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

        <div className="bg-white border rounded-3xl p-8 shadow-sm space-y-6">

          <input
            type="text"
            placeholder="Exam Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-4 rounded-xl w-full"
          />

          <textarea
            placeholder="Exam Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-4 rounded-xl w-full h-32"
          />

          <input
            type="number"
            placeholder="Duration (Minutes)"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="border p-4 rounded-xl w-full"
          />

          <input
            type="number"
            placeholder="Reward Pool"
            value={rewardPool}
            onChange={(e) =>
              setRewardPool(e.target.value)
            }
            className="border p-4 rounded-xl w-full"
          />
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
    className="border p-4 rounded-xl w-full"
  />

</div>

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
    className="border p-4 rounded-xl w-full"
  />

</div>
          <button
            onClick={createExam}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >

            Create Exam

          </button>

        </div>

      </div>

    </main>
  );
}