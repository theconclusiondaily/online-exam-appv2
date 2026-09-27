
"use client";

import { useEffect, useState } from "react";

import MaadhavInput from "./MaadhavInput";
import MaadhavMessage from "./MaadhavMessage";
import MaadhavWelcome from "./MaadhavWelcome";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function MaadhavChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
const [conversationId, setConversationId] = useState<string | null>(null);

 async function sendMessage(
  message: string,
  context?: string
) {
  const trimmedMessage = message.trim();

  if (!trimmedMessage || loading) {
    return;
  }

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: trimmedMessage,
  };

  const conversation = [...messages, userMessage];

  setMessages(conversation);
  setLoading(true);

  try {
    const response = await fetch("/api/maadhav/chat", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  message: trimmedMessage,
  conversationId,
}),
    });

    const data = await response.json();

if (!response.ok) {
  throw new Error(
    data?.error ||
      "Maadhav could not process your request."
  );
}

if (data?.conversationId) {
  setConversationId(data.conversationId);
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
  } catch (error) {
    console.error("Maadhav chat error:", error);

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
    <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-white/60 to-slate-50/40">
      {/* Conversation area */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <MaadhavWelcome onPrompt={sendMessage} />
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex flex-col gap-5">
              {messages.map((message) => (
                <MaadhavMessage
  key={message.id}
  role={message.role}
  content={message.content}
  onAction={(action, content) =>
    sendMessage(action, content)
  }
/>
              ))}

              {loading && <ThinkingIndicator />}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="shrink-0 border-t border-slate-200/70 bg-white/85 px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
        <div className="mx-auto w-full max-w-4xl">
          <MaadhavInput
            onSend={sendMessage}
            disabled={loading}
          />
        </div>
      </div>
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
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#274472]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#274472]"
            style={{ animationDelay: "300ms" }}
          />

          <span className="ml-1.5 text-xs text-slate-400">
            Maadhav is thinking
          </span>
        </div>
      </div>
    </div>
  );
}
