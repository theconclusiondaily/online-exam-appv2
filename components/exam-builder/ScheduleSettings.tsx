"use client";

import { ExamForm } from "./types";

interface Props {
  exam: ExamForm;
  updateField: (
    field: keyof ExamForm,
    value: any
  ) => void;
}

export default function ScheduleSettings({
  exam,
  updateField,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-8">

        Schedule

      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="font-semibold block mb-2">

            Start Time

          </label>

          <input
            type="datetime-local"
            value={exam.start_time}
            onChange={(e) =>
              updateField(
                "start_time",
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-3"
          />

        </div>

        <div>

          <label className="font-semibold block mb-2">

            End Time

          </label>

          <input
            type="datetime-local"
            value={exam.end_time}
            onChange={(e) =>
              updateField(
                "end_time",
                e.target.value
              )
            }
            className="w-full border rounded-2xl p-3"
          />

        </div>

      </div>

      <div className="mt-6">

        <label className="font-semibold block mb-2">

          Review Delay (Minutes)

        </label>

        <input
          type="number"
          value={exam.review_delay_minutes}
          onChange={(e) =>
            updateField(
              "review_delay_minutes",
              Number(e.target.value)
            )
          }
          className="w-full border rounded-2xl p-3"
        />

      </div>

    </div>
  );
}