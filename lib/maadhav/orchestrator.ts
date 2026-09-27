import { MAADHAV_SYSTEM_PROMPT } from "./prompts";
import { generateWithOpenAI } from "./model";
import type {
  MaadhavMessage,
  MaadhavRequest,
  MaadhavResponse,
} from "./types";

export async function askMaadhav(
  request: MaadhavRequest
): Promise<MaadhavResponse> {
  const messages: MaadhavMessage[] = [
    ...(request.conversation ?? []),
    {
      role: "user",
      content: request.message,
    },
  ];

  return generateWithOpenAI(
    messages,
    MAADHAV_SYSTEM_PROMPT
  );
}