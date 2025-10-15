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
        const { image } = await getCloudflareContext().env.AI.run(
          "@cf/leonardo/lucid-origin",
          { prompt: prompt }, 
        );

        if (!image) {
          return { error: "No image generated" };
        }

        const dataUrl = `data:image/jpeg;base64,${image}`;

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

  const generateRecipe = {
    description: "Generate a detailed recipe for a meal. Use this when the user wants to see the recipe, ingredients, or cooking instructions for a specific meal.",
    inputSchema: z.object({
      mealName: z.string().describe("The name or description of the meal to generate a recipe for"),
    }),
    execute: async ({ mealName }: { mealName: string }) => {
      try {
        const recipePrompt = `Generate a detailed recipe for: ${mealName}

Include the following sections:
1. Recipe Title
2. Preparation Time and Cooking Time
3. Servings
4. Ingredients (with precise measurements)
5. Step-by-step Instructions
6. Tips or Variations

Format the recipe in a clear, structured way.`;

        const { generateText } = await import("ai");
        
        const { text } = await generateText({
          model: google("gemini-2.5-flash"),
          prompt: recipePrompt,
        });

        return {
          mealName,
          recipe: text || "Recipe generation failed",
        };
      } catch (error) {
        console.error("Recipe generation error:", error);
        return { 
          mealName,
          error: "Failed to generate recipe" 
        };
      }
    },
  };

  const allTools = {
    ...frontendTools(tools),
    generateMealImage,
    generateRecipe,
  };

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    system: `You are a helpful assistant. You are currently talking to ${getUserName(user)}.

When the user wants a recipe for a meal, use the generateRecipe tool with the meal name. The tool will generate a complete recipe automatically.`,
    tools: allTools,
  });

  return result.toUIMessageStreamResponse();
}
