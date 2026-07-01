"use client";

interface Props {
  loading: boolean;
  file: File | null;
  onSelect: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function UploadBox({
  loading,
  file,
  onSelect,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue">

        Upload Excel File

      </h2>

      <p className="text-brand mt-2">

        Select the official TCD Question Template.

      </p>

      <input
        type="file"
        accept=".xlsx,.xls"
        className="mt-6"
        onChange={onSelect}
      />

      {loading && (

        <div className="mt-6 bg-blue-50 rounded-xl p-4">

          Reading Excel...

        </div>

      )}

      {file && (

        <div className="mt-6 bg-green-50 rounded-xl p-4">

          <div className="font-bold">

            Selected File

          </div>

          <div className="mt-2">

            {file.name}

          </div>

        </div>

      )}

    </div>
  );
}