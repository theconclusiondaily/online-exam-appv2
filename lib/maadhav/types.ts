export type MaadhavProvider = "openai";

export interface MaadhavMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MaadhavRequest {
  message: string;
  conversation?: MaadhavMessage[];
}

export interface MaadhavResponse {
  content: string;
  provider: MaadhavProvider;
  model: string;
}