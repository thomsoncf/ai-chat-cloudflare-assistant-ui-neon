import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";
import { Route } from "./+types/chat";

export async function action({ request }: Route.ActionArgs) {
  const { messages, system, tools } = (await request.json()) as any;

  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    system,
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
  });

  return result.toUIMessageStreamResponse();
}
