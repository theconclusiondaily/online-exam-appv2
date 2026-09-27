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
  const [conversations, setConversations] = useState<Conversation[]>([]);
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

      setConversations(data?.conversations ?? []);
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
      className={`flex min-h-0 flex-col border-slate-200/80 bg-white/95 ${
        mobile
          ? "h-full w-full"
          : "h-full w-[280px] shrink-0 border-r"
      }`}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#274472]/[0.06]">
            <TCDLogo size={24} />
          </div>

          <div>
            <div className="text-sm font-bold text-[#274472]">
              Maadhav
            </div>

            <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
              Chat history
            </div>
          </div>
        </div>

        {mobile && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-[#274472]"
            aria-label="Close chat history"
          >
            ×
          </button>
        )}
      </div>

      {/* New chat */}
      <div className="shrink-0 px-3 pt-3">
        <button
          type="button"
          onClick={handleNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E6C06E]/40 bg-[#E6C06E]/10 px-4 py-2.5 text-sm font-semibold text-[#806519] transition hover:bg-[#E6C06E]/20"
        >
          <span className="text-lg leading-none">
            +
          </span>

          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#274472]/[0.06]">
              <TCDLogo size={30} />
            </div>

            <p className="text-sm font-medium text-[#274472]">
              No conversations yet
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Start chatting with Maadhav and your conversations
              will appear here.
            </p>
          </div>
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
                  className={`group w-full rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "border border-[#274472]/10 bg-[#274472]/[0.07]"
                      : "border border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`truncate text-sm font-medium ${
                      active
                        ? "text-[#274472]"
                        : "text-slate-600"
                    }`}
                  >
                    {conversation.title ||
                      "New conversation"}
                  </div>

                  <div className="mt-1 text-[10px] text-slate-400">
                    {formatConversationDate(
                      conversation.updated_at
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

function formatConversationDate(
  value: string
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "short",
  });
}