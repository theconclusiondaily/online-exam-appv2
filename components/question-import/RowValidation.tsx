"use client";

import { RowValidationResult } from "./services/rowValidator";

interface Props {
  results: RowValidationResult[];
}

export default function RowValidation({
  results,
}: Props) {

  if (results.length === 0) return null;

  const valid =
    results.filter(r => r.valid).length;

  const invalid =
    results.length - valid;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">

            Question Validation

          </h2>

          <p className="text-brand mt-2">

            Validate every imported question.

          </p>

        </div>

        <div className="flex gap-4">

          <div className="bg-green-50 px-4 py-2 rounded-xl">

            <div className="text-sm">

              Valid

            </div>

            <div className="text-xl font-black text-green-600">

              {valid}

            </div>

          </div>

          <div className="bg-red-50 px-4 py-2 rounded-xl">

            <div className="text-sm">

              Invalid

            </div>

            <div className="text-xl font-black text-red-600">

              {invalid}

            </div>

          </div>

        </div>

      </div>

      <div className="space-y-4 max-h-[450px] overflow-y-auto">

        {results.map((item) => (

          <div
            key={item.row}
            className="border rounded-2xl p-5"
          >

            <div className="flex justify-between">

              <div className="font-bold">

                Row {item.row}

              </div>

              <div
                className={
                  item.valid
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >

                {item.valid
                  ? "VALID"
                  : "INVALID"}

              </div>

            </div>

            {!item.valid && (

              <ul className="mt-4 list-disc ml-6 text-red-600">

                {item.errors.map(error => (

                  <li key={error}>

                    {error}

                  </li>

                ))}

              </ul>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}