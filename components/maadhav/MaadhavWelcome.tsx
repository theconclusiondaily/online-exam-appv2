"use client";

import { TCDIcons } from "@/components/ui/tcd-icons";
import TCDLogo from "@/components/brand/TCDLogo";
interface MaadhavWelcomeProps {
  onPrompt: (prompt: string) => void;
}

const actions = [
  {
    title: "Explain a concept",
    description: "Understand difficult topics clearly",
    icon: TCDIcons.mastery,
    prompt: "Explain a concept to me",
  },
  {
    title: "Solve a problem",
    description: "Work through a question step by step",
    icon: TCDIcons.target,
    prompt: "Help me solve a problem",
  },
  {
    title: "Practice with me",
    description: "Test my understanding",
    icon: TCDIcons.journey,
    prompt: "Give me a practice question",
  },
  {
    title: "Learn from my mistakes",
    description: "Understand where I went wrong",
    icon: TCDIcons.achievement,
    prompt: "Help me understand my mistake",
  },
];

export default function MaadhavWelcome({
  onPrompt,
}: MaadhavWelcomeProps) {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#274472]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#E6C06E]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center px-4 pb-8 pt-10 sm:px-6 sm:pt-14">
        {/* Brand identity */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 scale-150 rounded-full bg-[#E6C06E]/10 blur-2xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-[#E6C06E]/30 bg-white shadow-[0_12px_40px_rgba(39,68,114,0.10)]">
              <TCDLogo size={32} />
            </div>
          </div>

          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E6C06E]">
            THE CONCLUSION DAILY
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#274472] sm:text-4xl">
            Meet Maadhav
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Your AI learning companion for understanding concepts,
            solving problems, practising smarter, and making progress.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {actions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => onPrompt(action.prompt)}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/90 p-4 text-left shadow-[0_4px_20px_rgba(39,68,114,0.04)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E6C06E]/70 hover:shadow-[0_12px_30px_rgba(39,68,114,0.09)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#274472]/[0.07] transition-colors group-hover:bg-[#E6C06E]/15">
                <div className="h-7 w-7">
                  {action.icon}
                </div>
              </div>

              <div className="min-w-0">
                <div className="font-semibold text-[#274472]">
                  {action.title}
                </div>

                <div className="mt-1 text-xs leading-5 text-slate-400">
                  {action.description}
                </div>
              </div>

              <div className="ml-auto text-lg text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#E6C06E]">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-xs text-slate-400">
            Ask naturally. Maadhav will help you learn, not just give you an answer.
          </p>
        </div>
      </div>
    </div>
  );
}