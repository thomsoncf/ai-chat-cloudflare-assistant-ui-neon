import { stackServerApp } from "@/lib/stack/server";
import { getUserName } from "@/lib/stack/utils";
import { google } from "@ai-sdk/google"
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";
import { z } from "zod";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const maxDuration = 30;

export async function POST(req: Request) {
  const user = await stackServerApp.getUser({ or: "redirect" });
  const { messages, tools } = (await req.json()) as any;

  // Define backend tool for image generation
  const generateMealImage = {
    description: "Generate a beautiful, appetizing image of a meal using AI. Use this when the user asks to create, generate, or visualize a meal image.",
    inputSchema: z.object({
      prompt: z.string().describe("A detailed description of the meal to generate an image for"),
    }),
    execute: async ({ prompt }: { prompt: string }) => {
      try {
        // Get Cloudflare context inside execute function
        const aibinding = getCloudflareContext().env.AI;
        
        if (!aibinding) {
          return { error: "AI binding is not configured in Cloudflare environment" };
        }

        const response = await aibinding.run(
          "@cf/leonardo/lucid-origin",
          {prompt: prompt}, 
        );

        // The response is a binary image (Response or ArrayBuffer)
        let arrayBuffer: ArrayBuffer;
        
        if (response instanceof Response) {
          const imageBlob = await response.blob();
          arrayBuffer = await imageBlob.arrayBuffer();
        } else if (response instanceof ArrayBuffer) {
          arrayBuffer = response;
        } else {
          // Handle as ReadableStream or convert to ArrayBuffer
          const blob = new Blob([response]);
          arrayBuffer = await blob.arrayBuffer();
        }
        
        const base64 = Buffer.from(arrayBuffer).toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64}`;

        return {
          imageUrl: dataUrl,
          prompt,
        };
      } catch (error) {
        console.error("Image generation error:", error);
        return { error: "Failed to generate image" };
      }
    },
  };

  const allTools = {
    ...frontendTools(tools),
    generateMealImage,
  };

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    system: `You are a helpful assistant. You are currently talking to ${getUserName(user)}`,
    tools: allTools,
  });

  return result.toUIMessageStreamResponse();
}
