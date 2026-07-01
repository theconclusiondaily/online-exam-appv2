"use client";

import { DuplicateResult } from "./services/duplicateChecker";

interface Props {
  duplicates: DuplicateResult[];
}

export default function DuplicateDetection({
  duplicates,
}: Props) {

  if (duplicates.length === 0) return null;

  const excelDuplicates =
    duplicates.filter(
      d => d.duplicateInExcel
    ).length;

  const dbDuplicates =
    duplicates.filter(
      d => d.duplicateInDatabase
    ).length;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">

            Duplicate Detection

          </h2>

          <p className="text-brand mt-2">

            Detect duplicates before import.

          </p>

        </div>

        <div className="flex gap-4">

          <div className="bg-yellow-50 rounded-xl px-4 py-2">

            <div className="text-sm">

              Excel

            </div>

            <div className="text-xl font-black text-yellow-600">

              {excelDuplicates}

            </div>

          </div>

          <div className="bg-red-50 rounded-xl px-4 py-2">

            <div className="text-sm">

              Database

            </div>

            <div className="text-xl font-black text-red-600">

              {dbDuplicates}

            </div>

          </div>

        </div>

      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">

        {duplicates.map((item) => (

          <div
            key={item.row}
            className="border rounded-xl p-4 flex justify-between"
          >

            <div>

              Row {item.row}

            </div>

            <div className="flex gap-3">

              {item.duplicateInExcel && (

                <span className="text-yellow-600 font-bold">

                  Excel Duplicate

                </span>

              )}

              {item.duplicateInDatabase && (

                <span className="text-red-600 font-bold">

                  Already Exists

                </span>

              )}

              {!item.duplicateInExcel &&
               !item.duplicateInDatabase && (

                <span className="text-green-600 font-bold">

                  Unique

                </span>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}