export type MaadhavProvider =
  | "openai"
  | "gemini"
  | "anthropic"
  | "local";

export type MaadhavRole =
  | "user"
  | "assistant";

export interface MaadhavImage {
  /**
   * Base64 data URL for an image.
   *
   * Example:
   * data:image/png;base64,...
   */
  dataUrl: string;

  /**
   * Original MIME type.
   *
   * Example:
   * image/png
   */
  mimeType: string;

  /**
   * Optional original filename.
   */
  name?: string;
}

export interface MaadhavMessage {
  role: MaadhavRole;

  /**
   * Text content of the message.
   */
  content: string;

  /**
   * Optional image attached to the message.
   *
   * Text-only messages continue to work
   * exactly as before.
   */
  image?: MaadhavImage;
}

export interface MaadhavRequest {
  /**
   * Current user message.
   */
  message: string;

  /**
   * Previous conversation messages.
   */
  conversation?: MaadhavMessage[];

  /**
   * Optional image attached to the current
   * user message.
   */
  image?: MaadhavImage;

  /**
   * Optional provider override.
   *
   * Normally the orchestrator should decide
   * which provider to use.
   */
  provider?: MaadhavProvider;
}

export interface MaadhavResponse {
  /**
   * Final response shown to the student.
   */
  content: string;

  /**
   * Provider that generated the response.
   */
  provider: MaadhavProvider;

  /**
   * Actual model used.
   */
  model: string;
}