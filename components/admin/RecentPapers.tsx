"use client";

import Link from "next/link";
import { TCDIcons } from "@/components/ui/tcd-icons";

interface Props {
  papers: any[];
}

export default function RecentPapers({
  papers,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tcd-gold/10 text-tcd-gold">

            {TCDIcons.mastery}

            Question Papers

          </div>

          <h2 className="text-3xl font-black text-tcd-blue mt-4">

            Recent Papers

          </h2>

        </div>

        <Link
          href="/admin/papers"
          className="bg-tcd-blue text-white px-5 py-3 rounded-2xl font-bold"
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {papers.map((paper) => (

          <div
            key={paper.id}
            className="border rounded-2xl p-5 flex justify-between items-center hover:shadow-lg transition"
          >

            <div>

              <h3 className="font-black text-xl text-tcd-blue">

                {paper.title}

              </h3>

              <p className="text-brand mt-1">

                {paper.subject}

                {" • "}

                {paper.total_questions} Questions

              </p>

            </div>

            <Link
              href={`/admin/papers/${paper.id}`}
              className="bg-tcd-gold text-white px-4 py-2 rounded-xl font-semibold"
            >
              Open
            </Link>

          </div>

        ))}

        {papers.length === 0 && (

          <div className="text-center py-10 text-brand">

            No Question Papers Found

          </div>

        )}

      </div>

    </div>
  );
}