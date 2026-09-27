
"use client";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { TCDIcons } from "@/components/ui/tcd-icons";

interface MaadhavMessageProps {
  role: "user" | "assistant";
  content: string;
  onAction?: (action: string, content: string) => void;
}
function normalizeMath(content: string) {
  return content
    // Convert $$ ... $$ to display math
    .replace(
      /\$\$([\s\S]*?)\$\$/g,
      (_, formula) => `\n\\[\n${formula.trim()}\n\\]\n`
    )
    // Convert single $...$ to inline math
    .replace(
      /(?<!\$)\$([^$\n]+?)\$(?!\$)/g,
      (_, formula) => `\\(${formula.trim()}\\)`
    );
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
        {/* Avatar */}
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

        {/* Message */}
        <div
          className={`min-w-0 rounded-2xl px-4 py-3.5 text-sm ${
            isAssistant
              ? "rounded-tl-md border border-slate-100 bg-white text-slate-600 shadow-[0_4px_18px_rgba(39,68,114,0.05)]"
              : "rounded-tr-md bg-[#274472] text-white shadow-[0_4px_15px_rgba(39,68,114,0.15)]"
          }`}
        >
          <div
            className={
              isAssistant
                ? "maadhav-markdown"
                : "maadhav-markdown maadhav-user-markdown"
            }
          >
            <ReactMarkdown
  remarkPlugins={[
    [remarkMath, { singleDollarTextMath: true }],
  ]}
  rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-3 mt-1 text-lg font-bold text-[#274472]">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="mb-2 mt-4 text-base font-bold text-[#274472]">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="mb-2 mt-3 text-sm font-bold text-[#274472]">
                    {children}
                  </h3>
                ),

                p: ({ children }) => (
                  <p className="mb-3 leading-7 last:mb-0">
                    {children}
                  </p>
                ),

                ul: ({ children }) => (
                  <ul className="mb-3 ml-1 space-y-2">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="mb-3 ml-5 list-decimal space-y-2">
                    {children}
                  </ol>
                ),

                li: ({ children }) => (
                  <li className="flex gap-2 leading-7">
                    <span
                      className={`mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full ${
                        isAssistant
                          ? "bg-[#E6C06E]"
                          : "bg-white/70"
                      }`}
                    />
                    <span>{children}</span>
                  </li>
                ),

                strong: ({ children }) => (
                  <strong
                    className={
                      isAssistant
                        ? "font-semibold text-[#274472]"
                        : "font-semibold text-white"
                    }
                  >
                    {children}
                  </strong>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-3 border-l-2 border-[#E6C06E] pl-4 italic text-slate-500">
                    {children}
                  </blockquote>
                ),

                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");

                  if (isBlock) {
                    return (
                      <pre className="my-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                        <code>{children}</code>
                      </pre>
                    );
                  }

                  return (
                    <code
                      className={`rounded-md px-1.5 py-0.5 text-[0.9em] ${
                        isAssistant
                          ? "bg-[#274472]/[0.07] text-[#274472]"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {children}
                    </code>
                  );
                },

                hr: () => (
                  <hr className="my-4 border-slate-200" />
                ),
              }}
            >
              {normalizeMath(content)}
            </ReactMarkdown>
          </div>

          {/* Assistant actions */}
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
