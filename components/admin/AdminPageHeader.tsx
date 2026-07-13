"use client";

import AdminBreadcrumb from "./AdminBreadcrumb";

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

      <AdminBreadcrumb current={title} />

      <h1 className="text-4xl font-black text-tcd-blue">
        {title}
      </h1>

      <p className="mt-2 text-gray-600 text-lg">
        {description}
      </p>

    </div>
  );
}