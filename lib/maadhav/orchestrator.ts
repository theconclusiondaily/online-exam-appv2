import { generateWithOpenAI } from "./model";
import type {
  MaadhavMessage,
  MaadhavRequest,
  MaadhavResponse,
} from "./types";
import { MAADHAV_SYSTEM_PROMPT } from "./prompts";

export async function askMaadhav(
  request: MaadhavRequest
): Promise<MaadhavResponse> {
  const messages: MaadhavMessage[] = [
    ...(request.conversation ?? []),
    {
      role: "user",
      content: request.message,
      ...(request.image
        ? {
            image: request.image,
          }
        : {}),
    },
  ];

  /*
   * OpenAI is currently Maadhav's first provider.
   *
   * The application talks to the orchestrator,
   * not directly to OpenAI. This allows us to
   * add other providers later without changing
   * the student-facing Maadhav experience.
   */
  return generateWithOpenAI(
    messages,
    MAADHAV_SYSTEM_PROMPT
  );
}