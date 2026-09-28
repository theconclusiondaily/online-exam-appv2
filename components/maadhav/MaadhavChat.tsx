"use client";

import { useEffect, useState } from "react";

import MaadhavInput from "./MaadhavInput";
import MaadhavMessage from "./MaadhavMessage";
import MaadhavWelcome from "./MaadhavWelcome";
import MaadhavHistory from "./MaadhavHistory";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function MaadhavChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [conversationId, setConversationId] =
    useState<string | null>(null);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [historyRefreshKey, setHistoryRefreshKey] =
    useState(0);

  async function loadConversation(id: string) {
    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `/api/maadhav/conversations/${id}`,
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Could not load this conversation."
        );
      }

      setConversationId(data.conversation.id);

      setMessages(
        Array.isArray(data.messages)
          ? data.messages.map(
              (message: Message) => ({
                id: message.id,
                role: message.role,
                content: message.content,
              })
            )
          : []
      );

      setHistoryOpen(false);
    } catch (error) {
      console.error(
        "Maadhav conversation loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setConversationId(null);
    setMessages([]);
    setHistoryOpen(false);
  }

  async function sendMessage(
    message: string,
    image?: File
  ) {
    const trimmedMessage = message.trim();

    /*
     * Allow:
     * 1. Text only
     * 2. Image only
     * 3. Text + image
     */
    if (
      (!trimmedMessage && !image) ||
      loading
    ) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content:
        trimmedMessage ||
        "Please analyze this image.",
    };

    const conversation = [
      ...messages,
      userMessage,
    ];

    setMessages(conversation);
    setLoading(true);

    try {
      /*
       * Use FormData because the request may contain
       * an actual image file.
       */
      const formData = new FormData();

      formData.append(
        "message",
        trimmedMessage
      );

      if (conversationId) {
        formData.append(
          "conversationId",
          conversationId
        );
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(
        "/api/maadhav/chat",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Maadhav could not process your request."
        );
      }

      /*
       * Save the conversation ID returned by
       * the server.
       */
      if (data?.conversationId) {
        const isNewConversation =
          !conversationId;

        setConversationId(
          data.conversationId
        );

        /*
         * Refresh the history sidebar when
         * the first message creates a new
         * conversation.
         */
        if (isNewConversation) {
          setHistoryRefreshKey(
            (current) => current + 1
          );
        }
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          typeof data?.content === "string" &&
          data.content.trim()
            ? data.content
            : "I couldn't generate a response. Please try again.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      /*
       * Refresh history after every successful
       * message so updated_at/title stays current.
       */
      setHistoryRefreshKey(
        (current) => current + 1
      );
    } catch (error) {
      console.error(
        "Maadhav chat error:",
        error
      );

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm sorry, I couldn't process that right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-0 overflow-hidden bg-gradient-to-b from-white/60 to-slate-50/40">
      {/* Desktop history */}
      <div className="hidden h-full md:block">
        <MaadhavHistory
          activeConversationId={conversationId}
          onSelectConversation={loadConversation}
          onNewChat={startNewChat}
          refreshKey={historyRefreshKey}
        />
      </div>

      {/* Main Maadhav area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Mobile history button */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200/70 bg-white/80 px-4 py-2.5 backdrop-blur-xl md:hidden">
          <button
            type="button"
            onClick={() =>
              setHistoryOpen(true)
            }
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-[#274472] transition hover:bg-slate-100"
          >
            <span className="text-lg">
              ☰
            </span>

            History
          </button>

          <button
            type="button"
            onClick={startNewChat}
            className="rounded-lg bg-[#E6C06E]/15 px-3 py-1.5 text-xs font-semibold text-[#806519] transition hover:bg-[#E6C06E]/25"
          >
            + New Chat
          </button>
        </div>

        {/* Conversation area */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <MaadhavWelcome
              onPrompt={sendMessage}
            />
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 sm:py-8">
              <div className="flex flex-col gap-5">
                {messages.map((message) => (
                  <MaadhavMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    onAction={(action) =>
                      sendMessage(action)
                    }
                  />
                ))}

                {loading && (
                  <ThinkingIndicator />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Composer */}
        {messages.length > 0 && (
          <div className="shrink-0 border-t border-slate-200/70 bg-white/85 px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
            <div className="mx-auto w-full max-w-4xl">
              <MaadhavInput
                onSend={sendMessage}
                disabled={loading}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile history drawer */}
      {historyOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close history"
            onClick={() =>
              setHistoryOpen(false)
            }
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]"
          />

          {/* Drawer */}
          <div className="relative z-10 h-full w-[88%] max-w-sm shadow-2xl">
            <MaadhavHistory
              mobile
              activeConversationId={
                conversationId
              }
              onSelectConversation={
                loadConversation
              }
              onNewChat={startNewChat}
              onClose={() =>
                setHistoryOpen(false)
              }
              refreshKey={historyRefreshKey}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-2xl rounded-tl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#274472]"
            style={{
              animationDelay: "0ms",
            }}
          />

          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#274472]"
            style={{
              animationDelay: "150ms",
            }}
          />

          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#274472]"
            style={{
              animationDelay: "300ms",
            }}
          />

          <span className="ml-1.5 text-xs text-slate-400">
            Maadhav is thinking
          </span>
        </div>
      </div>
    </div>
  );
}