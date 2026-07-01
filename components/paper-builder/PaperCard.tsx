"use client";

import Link from "next/link";

interface Props {
  paper: any;

  onDelete?: (id: string) => void;

  onDuplicate?: (id: string) => void;
}

export default function PaperCard({
  paper,
  onDelete,
  onDuplicate,
}: Props) {
  return (
    <div
      className="
        bg-white

        rounded-3xl

        border

        shadow-sm

        hover:shadow-xl

        transition-all

        p-6
      "
    >
      <div className="flex justify-between items-start">

        <div>

          <h2
            className="
              text-2xl

              font-black

              text-tcd-blue
            "
          >
            {paper.title}
          </h2>

          <p className="text-brand mt-2">

            {paper.subject}

            {" • "}

            {paper.class}

          </p>

        </div>

        <div>

          <span
            className={`
              px-4

              py-2

              rounded-full

              text-sm

              font-bold

              ${
                paper.status === "published"
                  ? "bg-green-100 text-green-700"

                  : "bg-yellow-100 text-yellow-700"
              }
            `}
          >
            {paper.status || "Draft"}
          </span>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-8">

        <div
          className="
            bg-blue-50

            rounded-2xl

            p-4

            text-center
          "
        >
          <div className="text-brand">

            Questions

          </div>

          <div className="text-2xl font-black text-tcd-blue">

            {paper.total_questions}

          </div>

        </div>

        <div
          className="
            bg-green-50

            rounded-2xl

            p-4

            text-center
          "
        >
          <div className="text-brand">

            Marks

          </div>

          <div className="text-2xl font-black text-green-600">

            {paper.total_marks}

          </div>

        </div>

        <div
          className="
            bg-yellow-50

            rounded-2xl

            p-4

            text-center
          "
        >
          <div className="text-brand">

            Difficulty

          </div>

          <div className="font-black text-yellow-700">

            {paper.difficulty}

          </div>

        </div>

      </div>

      <div className="flex flex-wrap gap-3 mt-8">

        <Link
          href={`/admin/paper-builder?id=${paper.id}`}
          className="
            bg-tcd-blue

            text-white

            px-5

            py-2

            rounded-2xl

            font-bold
          "
        >
          Edit
        </Link>

        <button
          onClick={() =>
            onDuplicate?.(paper.id)
          }
          className="
            bg-tcd-gold

            text-white

            px-5

            py-2

            rounded-2xl

            font-bold
          "
        >
          Duplicate
        </button>

        <button
          onClick={() =>
            onDelete?.(paper.id)
          }
          className="
            bg-red-500

            text-white

            px-5

            py-2

            rounded-2xl

            font-bold
          "
        >
          Delete
        </button>

      </div>

    </div>
  );
}