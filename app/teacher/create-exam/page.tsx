"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import TCDLoader from "@/components/common/TCDLoader";
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
const [examScope,
  setExamScope] =
  useState("INSTITUTE");

const [challengeType,
  setChallengeType] =
  useState("DAILY");
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
exam_scope:
  examScope,

challenge_type:
  challengeType,
  duration:
    Number(duration),

  reward_pool:
    Number(rewardPool),

  created_by:
    userId,

  institute_id:

  examScope === "PUBLIC"

    ? "da8cf1d6-9415-42f0-8336-c8586885cd6a"

    : instituteId,

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
  return <TCDLoader text="Preparing Exam Builder" />;
}

  if (!authorized) {
    return null;
  }

  return (

    <main className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-2xl font-bold">

            Create Exam

          </h1>

          <Link
            href="/teacher"
            className="bg-black text-white px-4 py-2 rounded-xl"
          >

            Dashboard

          </Link>

        </div>

        <div className="bg-white border rounded-3xl p-5 shadow-sm space-y-6">

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
<div>

  <p className="font-semibold mb-3">
    Exam Type
  </p>

  <div className="grid md:grid-cols-2 gap-4">

    <button
      type="button"
      onClick={() =>
        setExamScope(
          "PUBLIC"
        )
      }
      className={`
        border-2
        rounded-2xl
        p-4

        ${
          examScope === "PUBLIC"
            ? "border-tcd-gold bg-[#FFF8EA]"
            : "border-gray-200"
        }
      `}
    >

      <div className="flex items-center gap-3">

        <img
          src="/icons/mastery-star.svg"
          alt="Arena"
          className="w-10 h-10"
        />

        <div className="text-left">

          <p className="font-bold text-tcd-blue">
            TCD Arena Exam
          </p>

          <p className="text-sm text-gray-700">
            Public Competitive Challenge
          </p>

        </div>

      </div>

    </button>

    <button
      type="button"
      onClick={() =>
        setExamScope(
          "INSTITUTE"
        )
      }
      className={`
        border-2
        rounded-2xl
        p-4

        ${
          examScope === "INSTITUTE"
            ? "border-tcd-gold bg-[#FFF8EA]"
            : "border-gray-200"
        }
      `}
    >

      <div className="flex items-center gap-3">

        <img
          src="/icons/banyan-tree.svg"
          alt="Institute"
          className="w-10 h-10"
        />

        <div className="text-left">

          <p className="font-bold text-tcd-blue">
            Institute Exam
          </p>

          <p className="text-sm text-gray-700">
            Institute Restricted Exam
          </p>

        </div>

      </div>

    </button>

  </div>

</div>
{examScope === "PUBLIC" && (

  <div>

    <p className="font-semibold mb-3">
      Challenge Type
    </p>

    <div className="grid md:grid-cols-2 gap-4">

      {/* Daily */}

      <button
        type="button"
        onClick={() =>
          setChallengeType("DAILY")
        }
        className={`
          border-2 rounded-2xl p-4

          ${
            challengeType === "DAILY"
              ? "border-tcd-gold bg-[#FFF8EA]"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <img
            src="/icons/precision-target.svg"
            alt="Daily Challenge"
            className="w-10 h-10"
          />

          <div className="text-left">

            <p className="font-bold text-tcd-blue">
              Daily Challenge
            </p>

            <p className="text-sm text-gray-700">
              Daily competitive challenge
            </p>

          </div>

        </div>

      </button>

      {/* Weekly */}

      <button
        type="button"
        onClick={() =>
          setChallengeType("WEEKLY")
        }
        className={`
          border-2 rounded-2xl p-4

          ${
            challengeType === "WEEKLY"
              ? "border-tcd-gold bg-[#FFF8EA]"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <img
            src="/icons/mastery-star.svg"
            alt="Weekly Challenge"
            className="w-10 h-10"
          />

          <div className="text-left">

            <p className="font-bold text-tcd-blue">
              Weekly Challenge
            </p>

            <p className="text-sm text-gray-700">
              Weekly arena competition
            </p>

          </div>

        </div>

      </button>

      {/* Monthly */}

      <button
        type="button"
        onClick={() =>
          setChallengeType("MONTHLY")
        }
        className={`
          border-2 rounded-2xl p-4

          ${
            challengeType === "MONTHLY"
              ? "border-tcd-gold bg-[#FFF8EA]"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <img
            src="/icons/achievement-medal.svg"
            alt="Monthly Challenge"
            className="w-10 h-10"
          />

          <div className="text-left">

            <p className="font-bold text-tcd-blue">
              Monthly Challenge
            </p>

            <p className="text-sm text-gray-700">
              Long-format competitive challenge
            </p>

          </div>

        </div>

      </button>

      {/* Current Affairs */}

      <button
        type="button"
        onClick={() =>
          setChallengeType(
            "CURRENT_AFFAIRS"
          )
        }
        className={`
          border-2 rounded-2xl p-4

          ${
            challengeType ===
            "CURRENT_AFFAIRS"
              ? "border-tcd-gold bg-[#FFF8EA]"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <img
            src="/icons/learning-journey.svg"
            alt="Current Affairs"
            className="w-10 h-10"
          />

          <div className="text-left">

            <p className="font-bold text-tcd-blue">
              Current Affairs Challenge
            </p>

            <p className="text-sm text-gray-700">
              News & current events challenge
            </p>

          </div>

        </div>

      </button>

      {/* Scholarship */}

      <button
        type="button"
        onClick={() =>
          setChallengeType(
            "SCHOLARSHIP"
          )
        }
        className={`
          border-2 rounded-2xl p-4

          ${
            challengeType ===
            "SCHOLARSHIP"
              ? "border-tcd-gold bg-[#FFF8EA]"
              : "border-gray-200"
          }
        `}
      >

        <div className="flex items-center gap-3">

          <img
            src="/icons/rank.svg"
            alt="Scholarship"
            className="w-10 h-10"
          />

          <div className="text-left">

            <p className="font-bold text-tcd-blue">
              Scholarship Challenge
            </p>

            <p className="text-sm text-gray-700">
              Scholarship-oriented competition
            </p>

          </div>

        </div>

      </button>

    </div>

  </div>

)}
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
            className="bg-tcd-blue
hover:bg-tcd-blue-light text-white px-6 py-3 rounded-xl font-bold"
          >

            Create Exam

          </button>

        </div>

      </div>

    </main>
  );
}