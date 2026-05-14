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
        .select("role")
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