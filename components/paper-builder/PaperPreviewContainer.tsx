"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPaper } from "./services/getPaper";
import TCDLogo from "@/components/brand/TCDLogo";

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
    <>
      <style jsx global>{`
        @page {
          size: A4;
          margin: 12mm;
        }

        @media print {
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
            background: white !important;
          }

          body {
            overflow: visible !important;
          }

          /* Remove application-level screen layout effects */
          body * {
            box-sizing: border-box;
          }

          /* Hide only controls */
          .paper-print-button {
            display: none !important;
          }

          /* Actual printable paper */
          .paper-print-root {
            display: block !important;
            position: static !important;
            width: 100% !important;
            max-width: none !important;
            min-width: 0 !important;
            min-height: 0 !important;
            height: auto !important;

            margin: 0 !important;
            padding: 0 !important;

            background: white !important;
            box-shadow: none !important;
            border: 0 !important;

            overflow: visible !important;
            transform: none !important;
          }

          .paper-header {
            display: block !important;
            position: static !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;

            margin: 0 0 8mm 0 !important;
            padding: 0 0 5mm 0 !important;

            border-bottom: 1px solid #d1d5db !important;
          }

          .paper-meta {
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 4mm 8mm !important;
          }

          .paper-question {
            display: block !important;
            position: static !important;

            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;

            margin: 0 0 7mm 0 !important;
            padding: 0 !important;

            overflow: visible !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }

          .paper-question h2 {
            margin-top: 0 !important;
          }

          .paper-options {
            display: block !important;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
          }

          .paper-option {
            display: block !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0 !important;

            margin: 0 0 2mm 0 !important;
            padding: 0 !important;

            overflow: visible !important;
          }

          /* Never allow a question to be clipped */
          .paper-print-root,
          .paper-print-root * {
            max-height: none !important;
          }

          /* Keep long questions/options together where possible */
          .paper-question,
          .paper-option {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="paper-print-root max-w-5xl mx-auto p-10 bg-white">
        {/* PRINT BUTTON */}
        <div className="paper-print-button flex justify-end mb-8">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-[#0F3D91] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0c3278]"
          >
            Print Paper
          </button>
        </div>

        {/* PAPER HEADER */}
        <div className="paper-header border-b pb-8 mb-8">
          <div className="mb-5">
            <TCDLogo size={64} />
          </div>

          <h1 className="text-4xl font-bold">
            {paper.paper.title}
          </h1>

          <div className="paper-meta flex gap-8 mt-4 text-slate-600">
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

        {/* QUESTIONS */}
        {paper.questions.map(
          (item: any, index: number) => (
            <div
              key={item.questions.id}
              className="paper-question mb-10"
            >
              <h2 className="font-semibold mb-5">
                Q{index + 1}.{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: item.questions.question,
                  }}
                />
              </h2>

              <div className="paper-options space-y-3">
                <div className="paper-option">
                  A. {item.questions.option_a}
                </div>

                <div className="paper-option">
                  B. {item.questions.option_b}
                </div>

                <div className="paper-option">
                  C. {item.questions.option_c}
                </div>

                <div className="paper-option">
                  D. {item.questions.option_d}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}