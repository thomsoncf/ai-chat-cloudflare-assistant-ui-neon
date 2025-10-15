import { stackServerApp } from "@/lib/stack/server";
import { getUserName } from "@/lib/stack/utils";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google"
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const { messages, tools } = (await req.json()) as any;

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    system: `You are a helpful assistant. You are currently talking to ${getUserName(user)}`,
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
  });

  return result.toUIMessageStreamResponse();
}
