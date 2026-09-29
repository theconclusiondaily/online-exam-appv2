import OpenAI from "openai";

import type {
  MaadhavMessage,
  MaadhavProvider,
  MaadhavResponse,
} from "./types";

const MODEL =
  process.env.MAADHAV_MODEL || "gpt-5.5";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured."
    );
  }

  return new OpenAI({
    apiKey,
  });
}

/**
 * Convert a Maadhav message into a format
 * accepted by the OpenAI Responses API.
 */
function convertMessage(
  message: MaadhavMessage
): OpenAI.Responses.ResponseInputItem {
  if (!message.image) {
    return {
      role: message.role,
      content: message.content,
    };
  }

  const content: OpenAI.Responses.ResponseInputContent[] =
    [];

  if (message.content.trim()) {
    content.push({
      type: "input_text",
      text: message.content,
    });
  }

  content.push({
  type: "input_image",
  image_url: message.image.dataUrl,
  detail: "auto",
});
  return {
    role: message.role,
    content,
  };
}

/**
 * OpenAI provider for Maadhav.
 *
 * OpenAI is currently the first provider.
 * The rest of Maadhav does not need to know
 * which provider is being used.
 */
export async function generateWithOpenAI(
  messages: MaadhavMessage[],
  systemPrompt: string
): Promise<MaadhavResponse> {
  const openai = getOpenAIClient();

  const input: OpenAI.Responses.ResponseInput =
    messages.map(convertMessage);

  const response =
    await openai.responses.create({
      model: MODEL,

      instructions: systemPrompt,

      input,
    });

  return {
    content: response.output_text,

    provider:
      "openai" satisfies MaadhavProvider,

    model: MODEL,
  };
}