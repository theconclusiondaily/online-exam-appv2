"use client";

import { Pencil, Eye, Copy, Rocket, Archive, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  paperId: string;
  status: string;
  onDelete: () => void;
  onDuplicate: () => void;
  onPublish: () => void;
  onArchive: () => void;
}

export default function PaperActions({
  paperId,
  status,
  onDelete,
  onDuplicate,
  onPublish,
  onArchive,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">

      <Link
        href={`/admin/papers/${paperId}`}
        className="px-3 py-2 rounded-lg border flex items-center gap-2 hover:bg-slate-50"
      >
        <Pencil size={16} />
        Edit
      </Link>

      <Link
        href={`/admin/papers/preview/${paperId}`}
        className="px-3 py-2 rounded-lg border flex items-center gap-2 hover:bg-slate-50"
      >
        <Eye size={16} />
        Preview
      </Link>

      <button
        onClick={onDuplicate}
        className="px-3 py-2 rounded-lg border flex items-center gap-2 hover:bg-slate-50"
      >
        <Copy size={16} />
        Duplicate
      </button>

      {status !== "Published" && (
        <button
          onClick={onPublish}
          className="px-3 py-2 rounded-lg bg-green-600 text-white flex items-center gap-2"
        >
          <Rocket size={16} />
          Publish
        </button>
      )}

      {status !== "Archived" && (
        <button
          onClick={onArchive}
          className="px-3 py-2 rounded-lg bg-yellow-500 text-white flex items-center gap-2"
        >
          <Archive size={16} />
          Archive
        </button>
      )}

      <button
        onClick={onDelete}
        className="px-3 py-2 rounded-lg bg-red-600 text-white flex items-center gap-2"
      >
        <Trash2 size={16} />
        Delete
      </button>

    </div>
  );
}