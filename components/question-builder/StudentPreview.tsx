"use client";

import parse from "html-react-parser";
import { MathJax } from "better-react-mathjax";

interface Props {
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
}

const letters = ["A", "B", "C", "D"];

export default function StudentPreview({
  questionEn,
  questionHi,
  optionsEn,
  optionsHi,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">

      <div className="border-b px-6 py-4 bg-slate-50">

        <h2 className="text-xl font-bold text-[#0F3D91]">
          Live Student Preview
        </h2>

      </div>

      <div className="p-6 space-y-8">

        <div>

          <h3 className="font-semibold mb-2">
            English
          </h3>

          <MathJax dynamic>
            <div className="prose max-w-none">
              {parse(questionEn || "<p>Question preview...</p>")}
            </div>
          </MathJax>

        </div>

        <div>

          <h3 className="font-semibold mb-2">
            हिन्दी
          </h3>

          <MathJax dynamic>
            <div className="prose max-w-none">
              {parse(questionHi || "<p>प्रश्न पूर्वावलोकन...</p>")}
            </div>
          </MathJax>

        </div>

        <div className="space-y-3">

          {letters.map((letter, index) => (

            <div
              key={letter}
              className="rounded-xl border border-slate-200 p-4"
            >

              <div className="font-semibold text-[#0F3D91] mb-2">
                {letter}
              </div>

              <MathJax dynamic>
                <div className="prose max-w-none">
                  {parse(optionsEn[index] || "-")}
                </div>
              </MathJax>

              <div className="mt-3 text-sm text-slate-600">
                {optionsHi[index]}
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}