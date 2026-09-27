"use client";

import { TCDIcons } from "@/components/ui/tcd-icons";

interface MaadhavMessageProps {
  role: "user" | "assistant";
  content: string;
  onAction?: (action: string, content: string) => void;
}

function renderContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-2" />;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      return (
        <div key={index} className="flex gap-2">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E6C06E]" />
          <span>{formatInlineText(trimmed.slice(2))}</span>
        </div>
      );
    }

    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);

    if (numberedMatch) {
      return (
        <div key={index} className="flex gap-2">
          <span className="font-semibold text-[#274472]">
            {numberedMatch[1]}.
          </span>
          <span>{formatInlineText(numberedMatch[2])}</span>
        </div>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mt-2 text-sm font-bold text-[#274472]"
        >
          {formatInlineText(trimmed.replace(/^###\s+/, ""))}
        </h3>
      );
    }

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mt-2 text-base font-bold text-[#274472]"
        >
          {formatInlineText(trimmed.replace(/^##\s+/, ""))}
        </h2>
      );
    }

    return (
      <p key={index} className="leading-7">
        {formatInlineText(trimmed)}
      </p>
    );
  });
}

function formatInlineText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-[#274472]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={index}>{part}</span>;
  });
}

export default function MaadhavMessage({
  role,
  content,
  onAction,
}: MaadhavMessageProps) {
  const isAssistant = role === "assistant";

  function handleAction(action: string) {
    onAction?.(action, content);
  }

  return (
    <div
      className={`flex w-full ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[94%] gap-3 sm:max-w-[82%] ${
          isAssistant ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            isAssistant
              ? "border border-[#274472]/10 bg-[#274472]/[0.06]"
              : "border border-[#E6C06E]/20 bg-[#E6C06E]/15"
          }`}
        >
          <div className="h-6 w-6">
            {isAssistant ? TCDIcons.mastery : TCDIcons.profile}
          </div>
        </div>

        <div
          className={`min-w-0 rounded-2xl px-4 py-3.5 text-sm ${
            isAssistant
              ? "rounded-tl-md border border-slate-100 bg-white text-slate-600 shadow-[0_4px_18px_rgba(39,68,114,0.05)]"
              : "rounded-tr-md bg-[#274472] text-white shadow-[0_4px_15px_rgba(39,68,114,0.15)]"
          }`}
        >
          <div className="space-y-1.5">
            {renderContent(content)}
          </div>

          {isAssistant && onAction && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Explain the previous answer in simpler language for a student."
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 transition hover:border-[#274472]/30 hover:text-[#274472]"
              >
                Explain simpler
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Give a clear practical example based on the previous answer."
                  )
                }
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 transition hover:border-[#274472]/30 hover:text-[#274472]"
              >
                Give an example
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAction(
                    "Create one appropriate practice question based on the concept in the previous answer. Do not give the answer immediately."
                  )
                }
                className="rounded-lg border border-[#E6C06E]/30 bg-[#E6C06E]/10 px-2.5 py-1.5 text-[11px] font-medium text-[#806519] transition hover:bg-[#E6C06E]/20"
              >
                Practice this
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}