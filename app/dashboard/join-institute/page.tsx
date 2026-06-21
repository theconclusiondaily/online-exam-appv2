"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function JoinInstitutePage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinInstitute() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please login again");
        return;
      }

      const {
        data: institute,
        error: instituteError,
      } = await supabase
        .from("institutes")
        .select("*")
        .eq(
          "join_code",
          code.trim().toUpperCase()
        )
        .single();

      if (
        instituteError ||
        !institute
      ) {
        toast.error(
          "Invalid institute code"
        );
        return;
      }

      const {
        error: membershipError,
      } = await supabase
        .from("user_institutes")
        .insert({
          user_id: user.id,
          institute_id:
            institute.id,
        });

      if (
        membershipError &&
        !membershipError.message
          .toLowerCase()
          .includes("duplicate")
      ) {
        toast.error(
          "Unable to join institute"
        );
        return;
      }

      const {
        error: updateError,
      } = await supabase
        .from("users")
        .update({
          institute_id:
            institute.id,
        })
        .eq("id", user.id);

      if (updateError) {
        toast.error(
          "Failed to update profile"
        );
        return;
      }

      toast.success(
        `Joined ${institute.name}`
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F9FC] p-6">
      <div className="max-w-xl mx-auto">
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            border
            border-gray-100
            p-8
          "
        >
          <div className="text-center">
            <img
              src="/icons/banyan-tree.svg"
              alt="Institute"
              className="
                w-20
                h-20
                mx-auto
                mb-4
              "
            />

            <h1
              className="
                text-3xl
                font-black
                text-tcd-blue
              "
            >
              Join Institute
            </h1>

            <p
              className="
                text-tcd-primary
                mt-3
              "
            >
              Unlock institute exams,
              assessments and mock
              tests using your
              institute code.
            </p>
          </div>

          <div className="mt-8">
            <label
              className="
                block
                mb-2
                font-semibold
                text-tcd-blue
              "
            >
              Institute Code
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="ABC2026"
              className="
                w-full
                p-4
                rounded-xl
                border
                border-[#D8E1F0]
                bg-[#F7F9FC]
                text-[#274472]
                placeholder:text-tcd-primary
                focus:outline-none
                focus:border-[#D4AF37]
                focus:ring-2
                focus:ring-[#D4AF37]/30
              "
            />

            <button
              onClick={
                joinInstitute
              }
              disabled={
                loading || !code
              }
              className="
                w-full
                mt-6
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-[#D4AF37]
                to-[#F2D27A]
                text-tcd-blue
                font-black
                shadow-lg
                hover:scale-[1.02]
                transition-all
                disabled:opacity-50
              "
            >
              {loading
                ? "Joining..."
                : "Join Institute"}
            </button>
          </div>

          <div
            className="
              mt-8
              p-5
              rounded-2xl
              bg-[#F7F9FC]
              border
              border-[#D8E1F0]
            "
          >
            <div className="flex gap-4">
              <img
                src="/icons/learning-journey.svg"
                alt="Journey"
                className="w-10 h-10"
              />

              <div>
                <h3
                  className="
                    font-bold
                    text-tcd-blue
                  "
                >
                  Your TCD Profile
                </h3>

                <p
                  className="
                    text-sm
                    text-tcd-primary
                    mt-1
                  "
                >
                  Joining an institute
                  does not affect your
                  XP, Prestige,
                  Credits,
                  Achievements,
                  Certificates or
                  Rankings. Your TCD
                  journey always stays
                  with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}