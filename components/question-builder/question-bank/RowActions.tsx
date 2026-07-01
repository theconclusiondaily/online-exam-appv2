"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Copy,
  Trash2,
  MoreVertical,
} from "lucide-react";

interface Props {
  id: string;

  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function RowActions({
  id,
  onDelete,
  onDuplicate,
  onPreview,
}: Props) {

  return (

    <div className="flex items-center gap-2">

      <button
  onClick={() => onPreview?.(id)}
  className="p-2 rounded-lg hover:bg-slate-100"
  title="Preview"
>
  <Eye size={18} />
</button>

      <Link
        href={`/admin/questions/${id}`}
        className="p-2 rounded-lg hover:bg-slate-100"
        title="Edit"
      >
        <Pencil size={18} />
      </Link>

      <button
        onClick={() => onDuplicate?.(id)}
        className="p-2 rounded-lg hover:bg-slate-100"
        title="Duplicate"
      >
        <Copy size={18} />
      </button>

      <button
        onClick={() => onDelete?.(id)}
        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

    </div>

  );

}