"use client";

import { ImagePlus } from "lucide-react";
import { useRef } from "react";
import { useImageUpload } from "./hooks/useImageUpload";

interface Props {
  onSelect: (url: string) => void;
}

export default function ImageUploadButton({
  onSelect,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const { upload } = useImageUpload();

  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = await upload(file);

    if (url) {
      onSelect(url);
    }

    // Reset input so the same image can be selected again
    e.target.value = "";
  }

  return (
    <>
      <button
        type="button"
        className="p-2 rounded-lg hover:bg-slate-200 transition"
        onClick={() => ref.current?.click()}
      >
        <ImagePlus size={18} />
      </button>

      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
}