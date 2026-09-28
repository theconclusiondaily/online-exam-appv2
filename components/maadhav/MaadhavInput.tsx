"use client";

import {
  FormEvent,
  useRef,
  useState,
} from "react";

import {
  Image as ImageIcon,
  Mic,
  MicOff,
  Send,
  X,
} from "lucide-react";

/**
 * Browser Speech Recognition typings.
 *
 * SpeechRecognition is supported by Chrome/Edge,
 * but is not included in TypeScript's standard
 * Window definitions.
 */
interface MaadhavSpeechRecognitionResult {
  [index: number]: {
    transcript: string;
  };
}

interface MaadhavSpeechRecognitionResultList {
  [index: number]: MaadhavSpeechRecognitionResult;
  length: number;
}

interface MaadhavSpeechRecognitionEvent
  extends Event {
  resultIndex: number;
  results: MaadhavSpeechRecognitionResultList;
}

interface MaadhavSpeechRecognitionErrorEvent
  extends Event {
  error: string;
  message?: string;
}

interface MaadhavSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  start: () => void;
  stop: () => void;
  abort: () => void;

  onstart:
    | (() => void)
    | null;

  onresult:
    | ((
        event: MaadhavSpeechRecognitionEvent
      ) => void)
    | null;

  onerror:
    | ((
        event: MaadhavSpeechRecognitionErrorEvent
      ) => void)
    | null;

  onend:
    | (() => void)
    | null;
}

interface MaadhavSpeechRecognitionConstructor {
  new (): MaadhavSpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition?: MaadhavSpeechRecognitionConstructor;
    webkitSpeechRecognition?: MaadhavSpeechRecognitionConstructor;
  }
}

interface MaadhavInputProps {
  onSend: (
    message: string,
    image?: File
  ) => void;

  disabled?: boolean;
}

export default function MaadhavInput({
  onSend,
  disabled = false,
}: MaadhavInputProps) {
  const [message, setMessage] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [listening, setListening] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const recognitionRef =
    useRef<MaadhavSpeechRecognition | null>(
      null
    );

  function submitMessage() {
    const trimmedMessage =
      message.trim();

    /*
     * Allow:
     * - text only
     * - image only
     * - text + image
     */
    if (
      (!trimmedMessage && !image) ||
      disabled
    ) {
      return;
    }

    onSend(
      trimmedMessage,
      image || undefined
    );

    setMessage("");
    removeImage();
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

    if (!file.type.startsWith("image/")) {
      window.alert(
        "Please select an image file."
      );

      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      window.alert(
        "Please choose an image smaller than 10 MB."
      );

      event.target.value = "";
      return;
    }

    /*
     * Clean up any previous preview URL
     * before creating a new one.
     */
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);

    /*
     * Allow selecting the same file again.
     */
    event.target.value = "";
  }

  function removeImage() {
    if (imagePreview) {
      URL.revokeObjectURL(
        imagePreview
      );
    }

    setImage(null);
    setImagePreview(null);
  }

  function toggleVoice() {
    if (disabled) {
      return;
    }

    /*
     * Stop current recognition.
     */
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    /*
     * Browser support.
     *
     * Chrome generally exposes
     * webkitSpeechRecognition.
     */
    const SpeechRecognition =
      window.SpeechRecognition ??
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert(
        "Voice input is not supported in this browser. Please use Chrome or Edge."
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
    };

   recognition.onresult = (
  event: MaadhavSpeechRecognitionEvent
) => {
  const result =
    event.results[event.resultIndex];

  if (!result) {
    return;
  }

  const transcript =
    result[0]?.transcript?.trim();

  if (!transcript) {
    return;
  }

  setMessage((current) => {
    const existing = current.trim();

    if (!existing) {
      return transcript;
    }

    return `${existing} ${transcript}`;
  });
};

    recognition.onerror = (
      event: MaadhavSpeechRecognitionErrorEvent
    ) => {
      console.error(
        "Maadhav voice input error:",
        event.error
      );

      if (
        event.error ===
        "not-allowed"
      ) {
        window.alert(
          "Microphone permission was denied. Please allow microphone access and try again."
        );
      } else if (
        event.error ===
        "audio-capture"
      ) {
        window.alert(
          "No microphone was detected. Please check your microphone and try again."
        );
      }
    };

  recognition.onend = () => {
  setListening(false);

  if (
    recognitionRef.current === recognition
  ) {
    recognitionRef.current = null;
  }
};

    recognitionRef.current =
      recognition;

    try {
      recognition.start();
    } catch (error) {
      console.error(
        "Could not start voice input:",
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
          <div className="mb-2 flex items-start gap-2 px-1">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img
                src={imagePreview}
                alt="Selected image"
                className="h-20 w-20 object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                disabled={disabled}
                aria-label="Remove image"
                className="
                  absolute
                  right-1
                  top-1
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-black/60
                  text-white
                  transition
                  hover:bg-black/80
                  disabled:opacity-50
                "
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="pt-1">
              <div className="text-xs font-medium text-[#274472]">
                Image attached
              </div>

              <div className="mt-0.5 max-w-[220px] truncate text-[10px] text-slate-400">
                {image?.name}
              </div>
            </div>
          </div>
        )}

        {/* Composer */}
        <div className="flex items-end gap-1">
          {/* Image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={
              handleImageSelect
            }
            className="hidden"
          />

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
              transition-all
              hover:bg-[#274472]/[0.06]
              hover:text-[#274472]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ImageIcon
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />
          </button>

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
              listening
                ? "Listening..."
                : image
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
                : "Use voice input"
            }
            title={
              listening
                ? "Stop listening"
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
                  ? "bg-red-50 text-red-500 ring-1 ring-red-200"
                  : "text-slate-400 hover:bg-[#274472]/[0.06] hover:text-[#274472]"
              }
            `}
          >
            {listening ? (
              <MicOff
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            ) : (
              <Mic
                className="h-[18px] w-[18px]"
                strokeWidth={1.8}
              />
            )}
          </button>

          {/* Send */}
          <button
            type="submit"
            disabled={
              disabled ||
              (!message.trim() &&
                !image)
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

      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
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
        Maadhav can make mistakes.
        Verify important information.
      </p>
    </form>
  );
}