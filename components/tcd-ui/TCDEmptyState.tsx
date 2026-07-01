"use client";

interface Props {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function TCDEmptyState({
  title,
  description,
  action,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-16 text-center">

      <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl">

        📂

      </div>

      <h2 className="text-2xl font-bold mt-6">

        {title}

      </h2>

      <p className="text-slate-500 mt-3">

        {description}

      </p>

      {action && (

        <div className="mt-8">

          {action}

        </div>

      )}

    </div>
  );
}