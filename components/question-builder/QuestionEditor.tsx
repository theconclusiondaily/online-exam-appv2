"use client";

interface Props {
  questionEn: string;
  setQuestionEn: (value: string) => void;

  questionHi: string;
  setQuestionHi: (value: string) => void;

  setActiveField: (field: string) => void;
}

export default function QuestionEditor({
  questionEn,
  setQuestionEn,
  questionHi,
  setQuestionHi,
  setActiveField,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6 mb-6">

      <h2 className="text-2xl font-bold text-tcd-blue mb-6">
        📝 Question
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* English */}

        <div>

          <label className="font-semibold mb-2 block">
            English
          </label>

          <textarea
            rows={8}
            value={questionEn}
            onFocus={() => setActiveField("questionEn")}
            onChange={(e)=>
              setQuestionEn(e.target.value)
            }
            placeholder="Enter English Question..."
            className="
              w-full
              rounded-2xl
              border
              p-4
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

        </div>

        {/* Hindi */}

        <div>

          <label className="font-semibold mb-2 block">
            हिन्दी
          </label>

          <textarea
            rows={8}
            value={questionHi}
            onFocus={() => setActiveField("questionHi")}
            onChange={(e)=>
              setQuestionHi(e.target.value)
            }
            placeholder="हिन्दी प्रश्न लिखें..."
            className="
              w-full
              rounded-2xl
              border
              p-4
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-tcd-blue
            "
          />

        </div>

      </div>

    </div>
  );
}