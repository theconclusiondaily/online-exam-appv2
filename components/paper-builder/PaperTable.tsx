"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Pencil,
  Eye,
  Copy,
  Rocket,
  Archive,
  Trash2,
} from "lucide-react";

import { QuestionPaper } from "./types";

import { deletePaper } from "./services/deletePaper";
import { duplicatePaper } from "./services/duplicatePaper";
import { publishPaper } from "./services/publishPaper";
import { archivePaper } from "./services/archivePaper";

interface Props {
  papers: QuestionPaper[];
  loading: boolean;
}

export default function PaperTable({
  papers,
  loading,
}: Props) {

  const router = useRouter();

  async function handleDelete(id: string) {

    if (
      !confirm(
        "Delete this paper permanently?"
      )
    )
      return;

    try {

      await deletePaper(id);

      router.refresh();

    } catch (err) {

      console.error(err);

      alert("Failed to delete.");

    }

  }

  async function handleDuplicate(id: string) {

    try {

      const paper =
        await duplicatePaper(id);

      router.push(
        `/admin/papers/${paper.id}`
      );

    } catch (err) {

      console.error(err);

      alert("Duplicate failed.");

    }

  }

  async function handlePublish(id: string) {

    try {

      await publishPaper(id);

      router.refresh();

    } catch (err) {

      console.error(err);

      alert("Publish failed.");

    }

  }

  async function handleArchive(id: string) {

    try {

      await archivePaper(id);

      router.refresh();

    } catch (err) {

      console.error(err);

      alert("Archive failed.");

    }

  }

  function statusBadge(status: string) {

    switch (status) {

      case "Published":

        return (
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            Published
          </span>
        );

      case "Archived":

        return (
          <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-sm">
            Archived
          </span>
        );

      default:

        return (
          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
            Draft
          </span>
        );

    }

  }

  return (

    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Subject</th>
            <th className="text-left p-4">Questions</th>
            <th className="text-left p-4">Duration</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {loading && (

            <tr>

              <td
                colSpan={6}
                className="text-center p-12"
              >

                Loading...

              </td>

            </tr>

          )}

          {!loading &&
            papers.map((paper) => (

              <tr
                key={paper.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4 font-medium">

                  {paper.title}

                </td>

                <td className="p-4">

                  {paper.subject}

                </td>

                <td className="p-4">

                  {paper.total_questions}

                </td>

                <td className="p-4">

                  {paper.duration} min

                </td>

                <td className="p-4">

                  {statusBadge(paper.status)}

                </td>

                <td className="p-4">

                  <div className="flex gap-2 flex-wrap">

                    <Link
                      href={`/admin/papers/${paper.id}`}
                      className="border rounded-lg p-2"
                    >
                      <Pencil size={16} />
                    </Link>

                    <Link
                      href={`/admin/papers/preview/${paper.id}`}
                      className="border rounded-lg p-2"
                    >
                      <Eye size={16} />
                    </Link>

                    <button
                      onClick={() =>
                        handleDuplicate(
                          paper.id
                        )
                      }
                      className="border rounded-lg p-2"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handlePublish(
                          paper.id
                        )
                      }
                      className="border rounded-lg p-2 text-green-600"
                    >
                      <Rocket size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handleArchive(
                          paper.id
                        )
                      }
                      className="border rounded-lg p-2 text-yellow-600"
                    >
                      <Archive size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          paper.id
                        )
                      }
                      className="border rounded-lg p-2 text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>

  );

}