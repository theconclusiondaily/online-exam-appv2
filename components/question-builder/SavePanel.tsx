"use client";

import {
  Save,
  Eye,
  Send,
  FileText,
} from "lucide-react";

interface Props {
  completion: number;
  onSaveDraft: () => void;
  onPreview: () => void;
  onPublish: () => void;
}

export default function SavePanel({
  completion,
  onSaveDraft,
  onPreview,
  onPublish,
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-[#0F3D91] mb-6">
        Actions
      </h2>

      <div className="space-y-3">

        <button
          onClick={onSaveDraft}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition p-3 font-semibold"
        >
          <Save size={18} />
          Save Draft
        </button>

        <button
          onClick={onPreview}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-50 text-[#0F3D91] hover:bg-blue-100 transition p-3 font-semibold"
        >
          <Eye size={18} />
          Preview
        </button>

        <button
          onClick={onPublish}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0F3D91] text-white hover:bg-[#0B2F70] transition p-3 font-semibold"
        >
          <Send size={18} />
          Publish
        </button>

      </div>

      <div className="mt-8 border-t pt-6">

        <div className="flex justify-between mb-2">

          <span className="text-sm text-slate-500">
            Completion
          </span>

          <span className="font-bold">
            {completion}%
          </span>

        </div>

        <div className="h-3 rounded-full bg-slate-200">

          <div
            className="h-3 rounded-full bg-[#0F3D91] transition-all duration-500"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-4">

        <div className="flex items-center gap-2 mb-2">

          <FileText size={18} />

          <span className="font-semibold">
            Status
          </span>

        </div>

        <p className="text-sm text-slate-600">
          Draft
        </p>

      </div>

    </div>
  );
}