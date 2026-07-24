"use client";

import { ExamForm } from "./types";

interface Props {
  exam: ExamForm;
  updateField: (
    field: keyof ExamForm,
    value: any
  ) => void;
}

export default function RewardSettings({
  exam,
  updateField,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue mb-8">
        Rewards & Scholarships
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold block mb-2">
            Reward Pool (₹)
          </label>

        {/* Reward Pool */}
<input
  type="number"
  min={0}
  step={1}
  value={exam.reward_pool / 100}
  onChange={(e) =>
    updateField(
      "reward_pool",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Scholarship Pool (₹)
          </label>

          {/* Scholarship Pool */}
<input
  type="number"
  min={0}
  step={1}
  value={exam.scholarship_pool / 100}
  onChange={(e) =>
    updateField(
      "scholarship_pool",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div>
          <label className="font-semibold block mb-2">
            Rank 1
          </label>

         {/* Rank 1 */}
<input
  type="number"
  min={0}
  step={1}
  value={exam.rank_1_amount / 100}
  onChange={(e) =>
    updateField(
      "rank_1_amount",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Rank 2
          </label>

        {/* Rank 2 */}
<input
  type="number"
  min={0}
  step={1}
  value={exam.rank_2_amount / 100}
  onChange={(e) =>
    updateField(
      "rank_2_amount",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Rank 3
          </label>

         {/* Rank 3 */}
<input
  type="number"
  min={0}
  step={1}
  value={exam.rank_3_amount / 100}
  onChange={(e) =>
    updateField(
      "rank_3_amount",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>
        </div>

      </div>

      <div className="mt-8">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={exam.scholarship_enabled}
            onChange={(e)=>
              updateField(
                "scholarship_enabled",
                e.target.checked
              )
            }
          />

          Enable Scholarship
        </label>

      </div>

      <div className="mt-4">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={exam.tcd_enabled}
            onChange={(e)=>
              updateField(
                "tcd_enabled",
                e.target.checked
              )
            }
          />

          Enable TCD Rewards

        </label>

      </div>

      {exam.tcd_enabled && (

        <div className="mt-6">

          <label className="font-semibold block mb-2">

            TCD Reward Pool (₹)

          </label>

       <input
  type="number"
  min={0}
  step={1}
  value={exam.tcd_reward_pool / 100}
  onChange={(e) =>
    updateField(
      "tcd_reward_pool",
      Math.round(Number(e.target.value) * 100)
    )
  }
  className="w-full border rounded-2xl p-3"
/>

        </div>

      )}

    </div>
  );
}