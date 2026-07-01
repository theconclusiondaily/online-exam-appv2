"use client";

import QuestionRow from "./QuestionRow";
import { Question } from "./types";

interface Props {
  questions: Question[];
  loading: boolean;

  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;

  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function QuestionTable({
  questions,
  loading,
  selected,
  setSelected,
  onDelete,
  onPreview,
}: Props) {

  return (

    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4">
              <input
  type="checkbox"
  checked={selected.length === questions.length && questions.length > 0}
  onChange={(e) => {
    if (e.target.checked) {
      setSelected(questions.map((q) => q.id));
    } else {
      setSelected([]);
    }
  }}
/>
            </th>

            <th className="text-left p-4">Question</th>

            <th className="text-left p-4">Subject</th>

            <th className="text-left p-4">Chapter</th>

            <th className="text-left p-4">Difficulty</th>

            <th className="text-left p-4">Status</th>

            <th className="text-left p-4">Marks</th>

            <th className="text-left p-4">Language</th>

            <th className="text-left p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {loading && (

            <tr>

              <td
                colSpan={9}
                className="text-center p-12"
              >

                Loading...

              </td>

            </tr>

          )}

          {!loading &&
            questions.map((q) => (

             <QuestionRow
  key={q.id}
  question={q}
  selected={selected.includes(q.id)}
  toggleSelection={() => {
    setSelected((prev) =>
      prev.includes(q.id)
        ? prev.filter((id) => id !== q.id)
        : [...prev, q.id]
    );
  }}
  onDelete={onDelete}
  onPreview={onPreview}
/>

            ))}

        </tbody>

      </table>

    </div>

  );

}