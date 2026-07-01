"use client";

import { EXAM_SCOPE, CHALLENGE_TYPES } from "./constants";
import { ExamForm } from "./types";
interface Props {
  exam: ExamForm;
  updateField: (
    field: keyof ExamForm,
    value: any
  ) => void;
}

export default function ExamSettings({
  exam,
  updateField,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-8">
        Exam Details
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold block mb-2">
            Exam Title
          </label>

          <input
            value={exam.title}
            onChange={(e) =>
              updateField(
                "title",
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-3"
            placeholder="JEE Mock Test 01"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Duration (Minutes)
          </label>

          <input
            type="number"
            value={exam.duration}
            onChange={(e) =>
              updateField(
                "duration",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-2xl p-3"
          />
        </div>

      </div>

      <div className="mt-6">

        <label className="font-semibold block mb-2">
          Description
        </label>

        <textarea
          rows={4}
          value={exam.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-3"
        />

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">

        <div>

          <label className="font-semibold block mb-2">
            Exam Scope
          </label>

          <select
            value={exam.exam_scope}
            onChange={(e) =>
              updateField(
                "exam_scope",
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-3"
          >
            {EXAM_SCOPE.map((scope) => (
              <option
                key={scope}
                value={scope}
              >
                {scope}
              </option>
            ))}
          </select>

        </div>

        <div>

          <label className="font-semibold block mb-2">
            Challenge Type
          </label>

          <select
            value={exam.challenge_type}
            onChange={(e) =>
              updateField(
                "challenge_type",
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-3"
          >
            {CHALLENGE_TYPES.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>

        </div>

      </div>

    </div>
  );
}