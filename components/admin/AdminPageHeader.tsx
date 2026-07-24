"use client";

import AdminBreadcrumb from "./AdminBreadcrumb";
import TCDLogo from "@/components/brand/TCDLogo";
interface Props {
  title: string;
  description: string;
}

export default function AdminPageHeader({
  title,
  description,
}: Props) {
 return (
  <div className="mb-8">

    <div className="flex items-center gap-4 mb-5">

      <TCDLogo size={64} />

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-tcd-gold">
          The Conclusion Daily
        </p>

        <p className="text-sm text-gray-500">
          Hope & Faith
        </p>
      </div>

    </div>

    <AdminBreadcrumb
      current={title}
    />

    <h1 className="text-4xl font-black text-tcd-blue">
      {title}
    </h1>

    <p className="mt-2 text-gray-600 text-lg">
      {description}
    </p>

  </div>
)
}