import Skeleton
from "@/components/ui/Skeleton";

export default function ExamLoader() {

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="flex gap-4 mb-8">

          <Skeleton className="h-16 w-40" />

          <Skeleton className="h-16 w-40" />

          <Skeleton className="h-16 w-40" />

        </div>

        {/* QUESTION */}

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          <Skeleton className="h-8 w-64 mb-8" />

          <Skeleton className="h-32 w-full mb-8" />

          <div className="space-y-4">

            <Skeleton className="h-16 w-full" />

            <Skeleton className="h-16 w-full" />

            <Skeleton className="h-16 w-full" />

            <Skeleton className="h-16 w-full" />

          </div>

        </div>

      </div>

    </div>
  );
}