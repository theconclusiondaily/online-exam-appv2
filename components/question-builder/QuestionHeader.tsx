"use client";

import {
  Save,
  Upload,
  Sparkles,
  Eye,
  FileText,
  Send,
} from "lucide-react";

export default function QuestionHeader() {
  return (
    <div className="bg-gradient-to-r from-[#0F3D91] to-[#0B2E70] rounded-3xl shadow-xl text-white">

      <div className="flex items-center justify-between p-7">

        {/* Left */}

        <div className="flex items-center gap-5">

          <img
            src="/logo.png"
            alt="TCD"
            className="h-16 w-auto"
          />

          <div>

            <h1 className="text-4xl font-bold">
              Question Builder Studio
            </h1>

            <p className="text-blue-100 mt-2">
              Create professional bilingual questions
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex gap-3">

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">

            <FileText size={18}/>

            Drafts

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">

            <Upload size={18}/>

            Import Excel

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E5B94A] text-black font-semibold">

            <Sparkles size={18}/>

            AI Assistant

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20">

            <Eye size={18}/>

            Preview

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0F3D91] font-semibold">

            <Save size={18}/>

            Save Draft

          </button>

          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F4C542] text-black font-bold">

            <Send size={18}/>

            Publish

          </button>

        </div>

      </div>

    </div>
  );
}