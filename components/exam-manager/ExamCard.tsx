"use client";

import Link from "next/link";
import { publishExam } from "./services/publishExam";
import { cancelExam } from "./services/cancelExam";
import { deleteExam } from "./services/deleteExam";
interface Props {
  exam: any;
}

export default function ExamCard({
  exam,
}: Props) {

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">

            {exam.title}

          </h2>

          <p className="text-brand mt-2">

            {exam.status}

          </p>

        </div>

        <div>

          <span
            className="
              px-4
              py-2
              rounded-full
              bg-tcd-gold/10
              text-tcd-gold
              font-bold
            "
          >

            {exam.total_questions} Questions

          </span>

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

  <Link
    href={`/admin/create-exam?id=${exam.id}`}
    className="bg-tcd-blue text-white px-4 py-2 rounded-xl"
  >
    Edit
  </Link>

  {exam.status === "draft" && (
    <button
      onClick={async () => {
        await publishExam(exam.id);
        window.location.reload();
      }}
      className="bg-green-600 text-white px-4 py-2 rounded-xl"
    >
      Publish
    </button>
  )}

  {exam.status !== "cancelled" &&
    exam.status !== "completed" && (
      <button
        onClick={async () => {
          await cancelExam(exam.id);
          window.location.reload();
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-xl"
      >
        Cancel
      </button>
  )}

  <button
    onClick={async () => {

      if (
        !confirm(
          "Delete this exam permanently?"
        )
      ) return;

      await deleteExam(exam.id);

      window.location.reload();

    }}
    className="bg-gray-800 text-white px-4 py-2 rounded-xl"
  >
    Delete
  </button>

</div>

    </div>

  );

}