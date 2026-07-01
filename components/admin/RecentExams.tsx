"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { TCDIcons } from "@/components/ui/tcd-icons";

interface Props {
  exams: any[];
}

export default function RecentExams({
  exams,
}: Props) {

  const router = useRouter();

  async function publishExam(id: string) {

    const { error } = await supabase
      .from("exams")
      .update({
        published: true,
        status: "scheduled",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.reload();
  }

  async function cancelExam(
    id: string,
    endTime: string
  ) {

    if (new Date(endTime) < new Date()) {
      alert(
        "Completed exams cannot be cancelled."
      );
      return;
    }

    await supabase
      .from("exams")
      .update({
        status: "cancelled",
      })
      .eq("id", id);

    window.location.reload();
  }

  return (

    <div className="bg-white rounded-3xl shadow-sm border p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-tcd-gold/10
            text-tcd-gold
          "
          >
            {TCDIcons.achievement}

            Exam Command Center

          </div>

          <h2 className="text-3xl font-black text-tcd-blue mt-4">

            Exam Management

          </h2>

        </div>

        <div
          className="
          bg-tcd-blue
          text-white
          px-5
          py-3
          rounded-2xl
          font-black
        "
        >
          {exams.length} Exams
        </div>

      </div>

      <div className="space-y-5">

        {exams.map((exam) => (

          <div
            key={exam.id}
            className="
              border
              rounded-3xl
              p-6
              hover:shadow-xl
              transition
            "
          >

            <div className="flex justify-between">

              <div>

                <h3 className="text-2xl font-black text-tcd-blue">

                  {exam.title}

                </h3>

                <p className="text-brand mt-2">

                  Institute:
                  {" "}
                  {exam.institutes?.name ??
                    "Unknown"}

                </p>

                <div className="mt-3 font-bold text-tcd-gold">

                  ₹ {exam.reward_pool || 0}

                </div>

              </div>

              <div className="flex gap-3">

                {!exam.published && (

                  <button
                    onClick={() =>
                      router.push(
                        `/admin/create-exam?id=${exam.id}`
                      )
                    }
                    className="bg-amber-500 text-white px-4 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                )}

                {!exam.published && (

                  <button
                    onClick={() =>
                      publishExam(exam.id)
                    }
                    className="bg-tcd-blue text-white px-4 py-2 rounded-xl"
                  >
                    Publish
                  </button>

                )}

                {exam.status !==
                  "completed" && (

                  <button
                    onClick={() =>
                      cancelExam(
                        exam.id,
                        exam.end_time
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>

                )}

              </div>

            </div>

          </div>

        ))}

        {exams.length === 0 && (

          <div className="text-center py-12 text-brand">

            No Exams Found

          </div>

        )}

      </div>

    </div>

  );

}