"use client";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableQuestion from "./SortableQuestion";

interface Props {
  questions: any[];
  moveQuestion: (
    activeId: string,
    overId: string
  ) => void;
  removeQuestion: (
    id: string
  ) => void;
}

export default function SortableQuestionList({
  questions,
  moveQuestion,
  removeQuestion,
}: Props) {
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={(event) => {

        const {
          active,
          over,
        } = event;

        if (!over) return;

        if (
          active.id === over.id
        )
          return;

        moveQuestion(
          active.id as string,
          over.id as string
        );

      }}
    >

      <SortableContext
        items={questions.map(
          (q) => q.id
        )}
        strategy={
          verticalListSortingStrategy
        }
      >

        <div className="space-y-4">

          {questions.map(
            (question, index) => (

              <SortableQuestion
                key={question.id}
                question={question}
                index={index}
                onRemove={
                  removeQuestion
                }
              />

            )
          )}

        </div>

      </SortableContext>

    </DndContext>
  );
}