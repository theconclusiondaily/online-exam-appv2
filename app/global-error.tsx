"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;

  reset: () => void;
}) {

  return (

    <html>

      <body className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center max-w-xl">

          <h1 className="text-2xl font-bold text-red-600 mb-4">

            Critical Error

          </h1>

          <p className="text-brand mb-4">

            {error.message}

          </p>

          <button
            onClick={reset}
            className="bg-black text-white px-6 py-3 rounded-2xl font-bold"
          >

            Reload App

          </button>

        </div>

      </body>

    </html>
  );
}