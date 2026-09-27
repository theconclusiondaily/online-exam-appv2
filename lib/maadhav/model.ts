import OpenAI from "openai";
import type {
  MaadhavMessage,
  MaadhavResponse,
} from "./types";

const MODEL = process.env.MAADHAV_MODEL || "gpt-5.5";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  return new OpenAI({
    apiKey,
  });
}

export async function generateWithOpenAI(
  messages: MaadhavMessage[],
  systemPrompt: string
): Promise<MaadhavResponse> {
  const openai = getOpenAIClient();

  const response = await openai.responses.create({
    model: MODEL,
    instructions: systemPrompt,
    input: messages.map((message) => ({
      role: message.role,
      content: message.content,
    })),
  });

  return {
    content: response.output_text,
    provider: "openai",
    model: MODEL,
  };
}