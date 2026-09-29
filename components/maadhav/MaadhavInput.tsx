"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";
import {
  Image as ImageIcon,
  Mic,
  Paperclip,
  Send,
  X,
} from "lucide-react";

interface MaadhavInputProps {
  onSend: (
    message: string,
    image?: File
  ) => void | Promise<void>;
  disabled?: boolean;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEventLike {
  error: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult:
    | ((event: SpeechRecognitionEventLike) => void)
    | null;
  onerror:
    | ((event: SpeechRecognitionErrorEventLike) => void)
    | null;
  onend:
    | (() => void)
    | null;
}

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionInstance;

export default function MaadhavInput({
  onSend,
  disabled = false,
}: MaadhavInputProps) {
  const [message, setMessage] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [listening, setListening] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(
      null
    );

  function submitMessage() {
    const trimmedMessage =
      message.trim();

    if (
      (!trimmedMessage &&
        !selectedImage) ||
      disabled
    ) {
      return;
    }

    const image =
      selectedImage || undefined;

    onSend(trimmedMessage, image);

    setMessage("");
    clearImage();
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      submitMessage();
    }
  }

  function handleImageSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith("image/")
    ) {
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      alert(
        "Please select an image smaller than 10 MB."
      );

      event.target.value = "";
      return;
    }

    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    /*
     * Reset the input so the same image
     * can be selected again later.
     */
    event.target.value = "";
  }

  function clearImage() {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setSelectedImage(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function toggleVoice() {
    if (disabled) {
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const browserWindow =
      window as typeof window & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };

    const SpeechRecognition =
      browserWindow.SpeechRecognition ||
      browserWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice input is not supported in this browser. Please use Chrome or Edge."
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (
      event: SpeechRecognitionEventLike
    ) => {
      const result =
        event.results[
          event.resultIndex
        ];

      if (!result) {
        return;
      }

      const transcript =
        result[0]?.transcript?.trim();

      if (!transcript) {
        return;
      }

      setMessage((current) => {
        const existing =
          current.trim();

        if (!existing) {
          return transcript;
        }

        return `${existing} ${transcript}`;
      });
    };

    recognition.onerror = (
      event: SpeechRecognitionErrorEventLike
    ) => {
      console.error(
        "Maadhav speech recognition error:",
        event.error
      );

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);

      if (
        recognitionRef.current ===
        recognition
      ) {
        recognitionRef.current =
          null;
      }
    };

    recognitionRef.current =
      recognition;

    setListening(true);

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start speech recognition:",
        error
      );

      setListening(false);
      recognitionRef.current =
        null;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div
        className="
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
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-2 px-1">
            <div className="relative inline-block overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={imagePreview}
                alt="Selected image"
                className="max-h-32 max-w-[220px] object-contain"
              />

              <button
                type="button"
                onClick={clearImage}
                disabled={disabled}
                aria-label="Remove image"
                className="
                  absolute
                  right-1.5
                  top-1.5
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900/70
                  text-white
                  transition
                  hover:bg-slate-900
                  disabled:opacity-50
                "
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <div className="flex items-end gap-2">
          {/* Attachment */}
          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            disabled={disabled}
            aria-label="Attach image"
            title="Attach image"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[14px]
              text-slate-400
              transition
              hover:bg-[#274472]/[0.06]
              hover:text-[#274472]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Paperclip
              className="h-4 w-4"
              strokeWidth={2}
            />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={
              handleImageSelect
            }
            className="hidden"
          />

          {/* Text */}
          <textarea
            value={message}
            onChange={(event) =>
              setMessage(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            placeholder={
              selectedImage
                ? "Ask Maadhav about this image..."
                : "Ask Maadhav anything..."
            }
            disabled={disabled}
            rows={1}
            aria-label="Message Maadhav"
            className="
              min-h-[44px]
              max-h-32
              flex-1
              resize-none
              bg-transparent
              px-2
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

          {/* Voice */}
          <button
            type="button"
            onClick={toggleVoice}
            disabled={disabled}
            aria-label={
              listening
                ? "Stop voice input"
                : "Start voice input"
            }
            title={
              listening
                ? "Stop voice input"
                : "Voice input"
            }
            className={`
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-[14px]
              transition-all
              duration-200
              disabled:cursor-not-allowed
              disabled:opacity-40
              ${
                listening
                  ? "bg-[#E6C06E]/20 text-[#806519] ring-2 ring-[#E6C06E]/20"
                  : "text-slate-400 hover:bg-[#274472]/[0.06] hover:text-[#274472]"
              }
            `}
          >
            <Mic
              className={`h-4 w-4 ${
                listening
                  ? "animate-pulse"
                  : ""
              }`}
              strokeWidth={2}
            />
          </button>

          {/* Send */}
          <button
            type="submit"
            disabled={
              disabled ||
              (!message.trim() &&
                !selectedImage)
            }
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
            <Send
              className="h-4 w-4"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* Input hints */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        <span className="text-[11px] text-slate-400">
          Enter to send
        </span>

        <span className="text-[11px] text-slate-300">
          •
        </span>

        <span className="text-[11px] text-slate-400">
          Shift + Enter for a new line
        </span>

        <span className="text-[11px] text-slate-300">
          •
        </span>

        <span className="text-[11px] text-slate-400">
          Image & voice supported
        </span>
      </div>

      <p className="mt-1 text-center text-[10px] text-slate-300">
        Maadhav can make mistakes. Verify
        important information.
      </p>
    </form>
  );
}