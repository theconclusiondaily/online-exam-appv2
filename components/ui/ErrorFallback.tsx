"use client";

export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error;

  reset: () => void;
}) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">

      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-xl w-full text-center">

        <h1 className="text-4xl font-bold text-red-600 mb-4">

          Something went wrong

        </h1>

        <p className="text-gray-600 mb-4">

          {error.message}

        </p>

        <button
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-2xl font-bold"
        >

          Try Again

        </button>

      </div>

    </div>
  );
}