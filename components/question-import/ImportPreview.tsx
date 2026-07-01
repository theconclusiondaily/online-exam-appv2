"use client";

import { useMemo, useState } from "react";

interface Props {
  rows: any[];
  selectedRows: number[];
  toggleRow: (index: number) => void;
}

export default function ImportPreview({
  rows,
  selectedRows,
  toggleRow,
}: Props) {

  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {

    if (!search) return rows;

    return rows.filter((row) =>

      JSON.stringify(row)
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [rows, search]);

  if (rows.length === 0) return null;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <div>

          <h2 className="text-2xl font-black text-tcd-blue">

            Import Preview

          </h2>

          <p className="text-brand mt-2">

            Review questions before importing.

          </p>

        </div>

        <input
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
          placeholder="Search Question..."
          className="border rounded-xl px-4 py-3 w-full md:w-80"
        />

      </div>

      <div className="overflow-auto max-h-[650px]">

        <table className="w-full border-collapse">

          <thead className="sticky top-0 bg-gray-100">

            <tr>

              <th className="p-3"></th>

              <th className="p-3 text-left">

                #

              </th>

              <th className="p-3 text-left">

                Subject

              </th>

              <th className="p-3 text-left">

                Chapter

              </th>

              <th className="p-3 text-left">

                Difficulty

              </th>

              <th className="p-3 text-left">

                Question

              </th>

              <th className="p-3 text-left">

                Answer

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredRows.map((row,index)=>(

              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >

                <td className="p-3">

                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={()=>
                      toggleRow(index)
                    }
                  />

                </td>

                <td className="p-3">

                  {index+1}

                </td>

                <td className="p-3">

                  {row.Subject}

                </td>

                <td className="p-3">

                  {row.Chapter}

                </td>

                <td className="p-3">

                  {row.Difficulty}

                </td>

                <td className="p-3 max-w-xl">

                  {row["Question (English)"]}

                </td>

                <td className="p-3 font-bold">

                  {row["Correct Answer"]}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-6 flex justify-between">

        <div className="font-bold">

          Total Questions

        </div>

        <div className="text-tcd-blue text-2xl font-black">

          {rows.length}

        </div>

      </div>

      <div className="mt-3 flex justify-between">

        <div className="font-bold">

          Selected

        </div>

        <div className="text-green-600 text-2xl font-black">

          {selectedRows.length}

        </div>

      </div>

    </div>

  );

}