"use client";

import Link from "next/link";
import { ChevronRight, House } from "lucide-react";

interface Props {
  current: string;
}

export default function AdminBreadcrumb({
  current,
}: Props) {
  return (
    <div className="flex items-center gap-2 text-sm mb-6">

      <Link
        href="/admin"
        className="
          flex
          items-center
          gap-2
          text-tcd-blue
          hover:text-blue-700
          font-semibold
        "
      >
        <House size={16} />
        Dashboard
      </Link>

      <ChevronRight
        size={16}
        className="text-gray-400"
      />

      <span className="text-gray-600 font-medium">
        {current}
      </span>

    </div>
  );
}