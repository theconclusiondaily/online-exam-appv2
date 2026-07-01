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

          <input
            type="number"
            value={exam.reward_pool}
            onChange={(e)=>
              updateField(
                "reward_pool",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-2xl p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Scholarship Pool (₹)
          </label>

          <input
            type="number"
            value={exam.scholarship_pool}
            onChange={(e)=>
              updateField(
                "scholarship_pool",
                Number(e.target.value)
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

          <input
            type="number"
            value={exam.rank_1_amount}
            onChange={(e)=>
              updateField(
                "rank_1_amount",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-2xl p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Rank 2
          </label>

          <input
            type="number"
            value={exam.rank_2_amount}
            onChange={(e)=>
              updateField(
                "rank_2_amount",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-2xl p-3"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2">
            Rank 3
          </label>

          <input
            type="number"
            value={exam.rank_3_amount}
            onChange={(e)=>
              updateField(
                "rank_3_amount",
                Number(e.target.value)
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
            value={exam.tcd_reward_pool}
            onChange={(e)=>
              updateField(
                "tcd_reward_pool",
                Number(e.target.value)
              )
            }
            className="w-full border rounded-2xl p-3"
          />

        </div>

      )}

    </div>
  );
}