"use client";

import { useRef } from "react";

interface Props {
  label: string;
  image?: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({
  label,
  image,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      onChange(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex justify-between items-center mb-5">

        <h3 className="text-xl font-black text-tcd-blue">

          {label}

        </h3>

        <button
          type="button"
          onClick={() =>
            inputRef.current?.click()
          }
          className="
            bg-tcd-blue
            text-white
            px-5
            py-2
            rounded-xl
            font-bold
          "
        >
          Upload
        </button>

      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFile}
      />

      {image ? (

        <div className="space-y-4">

          <img
            src={image}
            alt="Preview"
            className="
              w-full
              max-h-80
              object-contain
              rounded-2xl
              border
            "
          />

          <button
            type="button"
            onClick={() => onChange("")}
            className="
              bg-red-500
              text-white
              rounded-xl
              px-4
              py-2
              font-bold
            "
          >
            Remove Image
          </button>

        </div>

      ) : (

        <div
          className="
            h-48

            rounded-2xl

            border-2

            border-dashed

            flex

            items-center

            justify-center

            text-brand
          "
        >

          No Image Selected

        </div>

      )}

    </div>
  );
}