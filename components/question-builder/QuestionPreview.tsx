"use client";

import { MathJax } from "better-react-mathjax";

interface Props {
  questionEn: string;
  questionHi: string;
}

export default function QuestionPreview({
  questionEn,
  questionHi,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6 mb-6">

      <h2 className="text-2xl font-bold text-tcd-blue mb-6">
        👁 Live Preview
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <h3 className="font-semibold mb-3">
            English
          </h3>

          <div className="border rounded-2xl p-5 min-h-[180px]">

            <MathJax dynamic>

              {questionEn || "Preview..."}

            </MathJax>

          </div>

        </div>

        <div>

          <h3 className="font-semibold mb-3">
            हिन्दी
          </h3>

          <div className="border rounded-2xl p-5 min-h-[180px]">

            <MathJax dynamic>

              {questionHi || "पूर्वावलोकन..."}

            </MathJax>

          </div>

        </div>

      </div>

    </div>
  );
}