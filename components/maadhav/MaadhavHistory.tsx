"use client";

import { useEffect, useState } from "react";
import TCDLogo from "@/components/brand/TCDLogo";

interface Conversation {
  id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

interface MaadhavHistoryProps {
  activeConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewChat: () => void;
  mobile?: boolean;
  onClose?: () => void;
  refreshKey?: number;
}

export default function MaadhavHistory({
  activeConversationId,
  onSelectConversation,
  onNewChat,
  mobile = false,
  onClose,
  refreshKey = 0,
}: MaadhavHistoryProps) {
  const [conversations, setConversations] = useState<Conversation[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  async function loadConversations() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/maadhav/conversations",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Could not load conversations."
        );
      }

      setConversations(
        Array.isArray(data?.conversations)
          ? data.conversations
          : []
      );
    } catch (error) {
      console.error(
        "Maadhav history error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConversations();
  }, [refreshKey]);

  function handleSelect(id: string) {
    onSelectConversation(id);
    onClose?.();
  }

  function handleNewChat() {
    onNewChat();
    onClose?.();
  }

  return (
    <aside
      className={`flex min-h-0 flex-col bg-white/95 ${
        mobile
          ? "h-full w-full"
          : "h-full w-[285px] shrink-0 border-r border-slate-200/80"
      }`}
    >
      {/* Header */}
      <div className="shrink-0 border-b border-slate-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#274472]/[0.06]">
              <TCDLogo size={27} />
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-bold text-[#274472]">
                Maadhav
              </div>

              <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Learning companion
              </div>
            </div>
          </div>

          {mobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat history"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xl leading-none text-slate-400 transition hover:bg-slate-100 hover:text-[#274472]"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* New Chat */}
      <div className="shrink-0 px-3 pt-3">
        <button
          type="button"
          onClick={handleNewChat}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#E6C06E]/40 bg-[#E6C06E]/10 px-4 py-2.5 text-sm font-semibold text-[#806519] transition-all duration-200 hover:border-[#E6C06E]/60 hover:bg-[#E6C06E]/20 hover:shadow-[0_6px_18px_rgba(230,192,110,0.15)]"
        >
          <span className="text-lg font-normal leading-none transition-transform duration-200 group-hover:rotate-90">
            +
          </span>

          New Chat
        </button>
      </div>

      {/* History heading */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-2 pt-5">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Recent conversations
        </span>

        {conversations.length > 0 && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-400">
            {conversations.length}
          </span>
        )}
      </div>

      {/* Conversations */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[66px] animate-pulse rounded-xl bg-slate-100/80"
              />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="space-y-1.5">
            {conversations.map((conversation) => {
              const active =
                conversation.id === activeConversationId;

              return (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() =>
                    handleSelect(conversation.id)
                  }
                  className={`group relative w-full rounded-xl border px-3 py-3 text-left transition-all duration-200 ${
                    active
                      ? "border-[#274472]/10 bg-[#274472]/[0.07] shadow-[0_4px_14px_rgba(39,68,114,0.05)]"
                      : "border-transparent hover:border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-[#E6C06E]" />
                  )}

                  <div className="flex min-w-0 items-start gap-2">
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-[#274472]/10"
                          : "bg-slate-100 group-hover:bg-[#274472]/[0.06]"
                      }`}
                    >
                      <span
                        className={`text-xs ${
                          active
                            ? "text-[#274472]"
                            : "text-slate-400"
                        }`}
                      >
                        ✦
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-[13px] font-medium leading-5 ${
                          active
                            ? "text-[#274472]"
                            : "text-slate-600"
                        }`}
                        title={
                          conversation.title ||
                          "New conversation"
                        }
                      >
                        {formatTitle(
                          conversation.title
                        )}
                      </div>

                      <div className="mt-1 text-[10px] text-slate-400">
                        {formatConversationDate(
                          conversation.updated_at
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-slate-100 px-4 py-3">
        <p className="text-center text-[10px] leading-4 text-slate-400">
          Your conversations are saved to your Maadhav learning history.
        </p>
      </div>
    </aside>
  );
}

function EmptyHistory() {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#274472]/10 bg-[#274472]/[0.05]">
        <TCDLogo size={30} />
      </div>

      <p className="text-sm font-semibold text-[#274472]">
        No conversations yet
      </p>

      <p className="mt-1.5 max-w-[210px] text-xs leading-5 text-slate-400">
        Start learning with Maadhav and your conversations
        will appear here.
      </p>
    </div>
  );
}

function formatTitle(title: string | null) {
  if (!title?.trim()) {
    return "New conversation";
  }

  const cleanTitle = title
    .replace(/\s+/g, " ")
    .trim();

  if (cleanTitle.length <= 58) {
    return cleanTitle;
  }

  return `${cleanTitle.slice(0, 55).trim()}...`;
}

function formatConversationDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const today =
    date.toDateString() === now.toDateString();

  if (today) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (
    date.toDateString() ===
    yesterday.toDateString()
  ) {
    return "Yesterday";
  }

  const sameYear =
    date.getFullYear() === now.getFullYear();

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
}