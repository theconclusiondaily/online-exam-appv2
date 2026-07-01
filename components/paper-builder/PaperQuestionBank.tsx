"use client";

interface Props {
  loading: boolean;
  questions: any[];

  search: string;
  setSearch: (value: string) => void;

  subject: string;
  setSubject: (value: string) => void;

  difficulty: string;
  setDifficulty: (value: string) => void;

  language: string;
  setLanguage: (value: string) => void;

  selectedIds: string[];

 toggleSelection: (id: string) => void;

addSelectedQuestions: () => void;
}

export default function PaperQuestionBank({
  loading,
  questions,

  search,
  setSearch,

  subject,
  setSubject,

  difficulty,
  setDifficulty,

  language,
  setLanguage,

  selectedIds,

 toggleSelection,
addSelectedQuestions,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">
            Question Bank
          </h2>

          <p className="text-brand mt-1">
            Select questions for this paper
          </p>

        </div>

        <div className="bg-tcd-gold/10 text-tcd-gold px-4 py-2 rounded-xl font-bold">

          {questions.length} Questions

        </div>

      </div>

      {/* Search */}

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search Questions..."
        className="w-full border rounded-2xl p-3 mb-5"
      />

      {/* Filters */}

      <div className="grid grid-cols-3 gap-3 mb-6">

        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="border rounded-2xl p-3"
        >
          <option value="">
            All Subjects
          </option>

          <option>Physics</option>

          <option>Chemistry</option>

          <option>Biology</option>

          <option>Math</option>

        </select>

        <select
          value={difficulty}
          onChange={(e) =>
            setDifficulty(e.target.value)
          }
          className="border rounded-2xl p-3"
        >
          <option value="">
            Difficulty
          </option>

          <option>Easy</option>

          <option>Medium</option>

          <option>Hard</option>

          <option>Mixed</option>

        </select>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          className="border rounded-2xl p-3"
        >
          <option value="">
            Language
          </option>

          <option>English</option>

          <option>Hindi</option>

          <option>Bilingual</option>

        </select>

      </div>
{selectedIds.length > 0 && (

  <div className="mb-6 flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 p-4">

    <div className="font-semibold text-green-700">

      {selectedIds.length} Question(s) Selected

    </div>

    <button
      onClick={addSelectedQuestions}
      className="rounded-xl bg-green-600 px-5 py-2 font-bold text-white hover:bg-green-700"
    >
      Add Selected Questions →
    </button>

  </div>

)}
      {/* Question List */}

      <div className="space-y-4 max-h-[700px] overflow-y-auto">

        {loading && (

          <p className="text-center text-slate-500 py-8">

            Loading Questions...

          </p>

        )}

        {!loading &&
          questions.map((q) => (

            <div
              key={q.id}
              className="
                border
                rounded-2xl
                p-5

                hover:border-tcd-blue
                hover:shadow-md

                transition-all
              "
            >

              <div className="flex justify-between items-start gap-5">

                <div className="flex-1">

                  <div className="font-semibold text-lg line-clamp-2">

                    {q.question}

                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">

                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">

                      {q.subject}

                    </span>

                    <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">

                      {q.difficulty}

                    </span>

                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">

                      {q.language}

                    </span>

                  </div>

                </div>

                <input
                  type="checkbox"
                  checked={selectedIds.includes(q.id)}
                  onChange={() =>
                    toggleSelection(q.id)
                  }
                  className="h-6 w-6"
                />

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}