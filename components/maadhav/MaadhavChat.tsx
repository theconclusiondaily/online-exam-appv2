"use client";

import { useState } from "react";

import MaadhavInput from "./MaadhavInput";
import MaadhavMessage from "./MaadhavMessage";
import MaadhavWelcome from "./MaadhavWelcome";
import MaadhavHistory from "./MaadhavHistory";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ImagePayload {
  dataUrl: string;
  mimeType: string;
  name?: string;
}

export default function MaadhavChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [conversationId, setConversationId] =
    useState<string | null>(null);

  const [historyOpen, setHistoryOpen] = useState(false);

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

  async function fileToDataUrl(
    file: File
  ): Promise<string> {
    return new Promise(
      (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (
            typeof reader.result !==
            "string"
          ) {
            reject(
              new Error(
                "Could not read the image."
              )
            );
            return;
          }

          resolve(reader.result);
        };

        reader.onerror = () => {
          reject(
            new Error(
              "Could not read the image."
            )
          );
        };

        reader.readAsDataURL(file);
      }
    );
  }

  async function sendMessage(
    message: string,
    image?: File
  ) {
    const trimmedMessage =
      message.trim();

    if (
      (!trimmedMessage && !image) ||
      loading
    ) {
      return;
    }

    let imagePayload:
      | ImagePayload
      | undefined;

    try {
      if (image) {
        if (
          !image.type.startsWith(
            "image/"
          )
        ) {
          throw new Error(
            "Please select a valid image."
          );
        }

        /*
         * Keep the initial implementation
         * conservative so very large images
         * are not accidentally sent.
         */
        if (
          image.size >
          10 * 1024 * 1024
        ) {
          throw new Error(
            "Image must be smaller than 10 MB."
          );
        }

        const dataUrl =
          await fileToDataUrl(image);

        imagePayload = {
          dataUrl,
          mimeType: image.type,
          name: image.name,
        };
      }

      const displayContent =
        trimmedMessage ||
        "Please analyze this image.";

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: image
          ? `${displayContent}\n\n📷 Image attached`
          : displayContent,
      };

      setMessages((current) => [
        ...current,
        userMessage,
      ]);

      setLoading(true);

      const response = await fetch(
        "/api/maadhav/chat",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            message: trimmedMessage,
            conversationId,
            image: imagePayload,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Maadhav could not process your request."
        );
      }

      if (data?.conversationId) {
        const isNewConversation =
          !conversationId;

        setConversationId(
          data.conversationId
        );

        if (isNewConversation) {
          setHistoryRefreshKey(
            (current) =>
              current + 1
          );
        }
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          typeof data?.content ===
            "string" &&
          data.content.trim()
            ? data.content
            : "I couldn't generate a response. Please try again.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
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
            error instanceof Error
              ? error.message
              : "I'm sorry, I couldn't process that right now. Please try again.",
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
          activeConversationId={
            conversationId
          }
          onSelectConversation={
            loadConversation
          }
          onNewChat={
            startNewChat
          }
          refreshKey={
            historyRefreshKey
          }
        />
      </div>

      {/* Main Maadhav area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">

        {/* Mobile history */}
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
            onClick={
              startNewChat
            }
            className="rounded-lg bg-[#E6C06E]/15 px-3 py-1.5 text-xs font-semibold text-[#806519] transition hover:bg-[#E6C06E]/25"
          >
            + New Chat
          </button>
        </div>

        {/* Conversation */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <MaadhavWelcome
              onPrompt={sendMessage}
            />
          ) : (
            <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6 sm:py-8">
              <div className="flex flex-col gap-5">
                {messages.map(
                  (message) => (
                    <MaadhavMessage
                      key={
                        message.id
                      }
                      role={
                        message.role
                      }
                      content={
                        message.content
                      }
                      onAction={(
                        action
                      ) =>
                        sendMessage(
                          action
                        )
                      }
                    />
                  )
                )}

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

          <button
            type="button"
            aria-label="Close history"
            onClick={() =>
              setHistoryOpen(false)
            }
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]"
          />

          <div className="relative z-10 h-full w-[88%] max-w-sm shadow-2xl">
            <MaadhavHistory
              mobile
              activeConversationId={
                conversationId
              }
              onSelectConversation={
                loadConversation
              }
              onNewChat={
                startNewChat
              }
              onClose={() =>
                setHistoryOpen(false)
              }
              refreshKey={
                historyRefreshKey
              }
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