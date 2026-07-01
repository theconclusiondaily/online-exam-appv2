"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPaper } from "./services/getPaper";

export default function PaperPreviewContainer() {

  const params = useParams();

  const id = params.id as string;

  const [paper, setPaper] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data = await getPaper(id);

        setPaper(data);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, [id]);

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );

  }

  if (!paper) {

    return (
      <div className="p-10">
        Paper not found.
      </div>
    );

  }

  return (
<div
  className="
    max-w-5xl
    mx-auto
    p-10
    bg-white
    print:p-0
    print:max-w-none
    print:shadow-none
  "
>

      <div className="border-b pb-8 mb-8">
<div className="flex justify-end mb-8 print:hidden">

  <button
    onClick={() => window.print()}
    className="bg-[#0F3D91] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0c3278]"
  >
    Print Paper
  </button>

</div>
        <h1 className="text-4xl font-bold">

          {paper.paper.title}

        </h1>

        <div className="flex gap-8 mt-4 text-slate-600">

          <span>
            Subject: {paper.paper.subject}
          </span>

          <span>
            Duration: {paper.paper.duration} min
          </span>

          <span>
            Questions: {paper.paper.total_questions}
          </span>

          <span>
            Marks: {paper.paper.total_marks}
          </span>

        </div>

      </div>

      {paper.questions.map(
        (item: any, index: number) => (

          <div
            key={item.questions.id}
            className="mb-10"
          >

            <h2 className="font-semibold mb-5">

              Q{index + 1}.{" "}

              <span
                dangerouslySetInnerHTML={{
                  __html:
                    item.questions.question,
                }}
              />

            </h2>

            <div className="space-y-3">

              <div>

                A. {item.questions.option_a}

              </div>

              <div>

                B. {item.questions.option_b}

              </div>

              <div>

                C. {item.questions.option_c}

              </div>

              <div>

                D. {item.questions.option_d}

              </div>

            </div>

          </div>

        )
      )}

    </div>

  );

}