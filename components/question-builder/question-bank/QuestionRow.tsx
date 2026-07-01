"use client";

import DifficultyBadge from "./DifficultyBadge";
import StatusBadge from "./StatusBadge";
import RowActions from "./RowActions";
import { Question } from "./types";

interface Props {
  question: Question;

  selected: boolean;
  toggleSelection: () => void;

  onDelete?: (id: string) => void;
  onPreview?: (id: string) => void;
}

export default function QuestionRow({
  question,
  selected,
  toggleSelection,
  onDelete,
  onPreview,
}: Props) {

  return (

    <tr className="border-b hover:bg-slate-50 transition">

      <td className="p-4">
        <input
  type="checkbox"
  checked={selected}
  onChange={toggleSelection}
/>
      </td>

      <td className="p-4 max-w-xl">

        <div className="line-clamp-2 font-medium">

          {question.question}

        </div>

      </td>

      <td className="p-4">

        {question.subject}

      </td>

      <td className="p-4">

        {question.chapter}

      </td>

      <td className="p-4">

        <DifficultyBadge
          difficulty={question.difficulty}
        />

      </td>

      <td className="p-4">

        <StatusBadge
          status={question.status}
        />

      </td>

      <td className="p-4">

        {question.marks}

      </td>

      <td className="p-4">

        {question.language}

      </td>

      <td className="p-4">

      <RowActions
  id={question.id}
  onDelete={onDelete}
  onPreview={onPreview}
/>

      </td>

    </tr>

  );

}