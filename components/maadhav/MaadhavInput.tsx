"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

interface MaadhavInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MaadhavInput({
  onSend,
  disabled = false,
}: MaadhavInputProps) {
  const [message, setMessage] = useState("");

  function submitMessage() {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend(trimmedMessage);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    // Enter sends the message.
    // Shift + Enter creates a new line.
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="
          flex items-end gap-2
          rounded-[20px]
          border border-slate-200/90
          bg-white
          p-2
          shadow-[0_8px_30px_rgba(39,68,114,0.08)]
          transition-all duration-200
          focus-within:border-[#274472]/30
          focus-within:shadow-[0_10px_35px_rgba(39,68,114,0.12)]
        "
      >
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Maadhav anything..."
          disabled={disabled}
          rows={1}
          aria-label="Message Maadhav"
          className="
            min-h-[44px]
            max-h-32
            flex-1
            resize-none
            bg-transparent
            px-3
            py-2.5
            text-sm
            leading-6
            text-slate-700
            outline-none
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          aria-label="Send message"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            bg-[#274472]
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#1f385f]
            hover:shadow-md
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-35
            disabled:hover:translate-y-0
            disabled:hover:shadow-sm
          "
        >
          <Send className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1.5">
        <span className="text-[11px] text-slate-400">
          Press Enter to send
        </span>

        <span className="text-[11px] text-slate-300">
          •
        </span>

        <span className="text-[11px] text-slate-400">
          Shift + Enter for a new line
        </span>
      </div>

      <p className="mt-1 text-center text-[10px] text-slate-300">
        Maadhav can make mistakes. Verify important information.
      </p>
    </form>
  );
}
