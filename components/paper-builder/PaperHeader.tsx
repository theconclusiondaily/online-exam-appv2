"use client";
interface Props {
  onSave: () => void;
  onPublish: () => void;
}
import { Save, Send } from "lucide-react";

export default function PaperHeader({
  onSave,
  onPublish,
}: Props) {
  return (
    <div className="rounded-3xl bg-[#0F3D91] text-white p-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">

            Question Paper Builder

          </h1>

          <p className="opacity-80 mt-2">

            Build reusable papers for exams

          </p>

        </div>

        <div className="flex gap-4">

          <button 
           onClick={onSave}
          className="bg-white text-[#0F3D91] px-6 py-3 rounded-xl font-semibold flex items-center gap-2">

            <Save size={18} />

            Save

          </button>

         <button
  onClick={onPublish}
  className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
>
  <Send size={18} />
  Publish
</button>

        </div>

      </div>

    </div>
  );
}