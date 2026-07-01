"use client";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

import { GripVertical } from "lucide-react";

interface Props {
  question: any;
  index: number;
  onRemove: (id: string) => void;
}

export default function SortableQuestion({
  question,
  index,
  onRemove,
}: Props) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: question.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-xl p-4 mb-3 bg-white flex justify-between items-center"
    >

      <div className="flex items-center gap-4">

        <button
          {...attributes}
          {...listeners}
          className="cursor-grab"
        >
          <GripVertical size={20} />
        </button>

        <div>

          <div className="font-medium">

            {index + 1}. {question.question}

          </div>

          <div className="text-sm text-slate-500">

            {question.subject}

          </div>

        </div>

      </div>

      <button
        onClick={() => onRemove(question.id)}
        className="text-red-600"
      >
        Remove
      </button>

    </div>
  );
}