import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { useThreadRuntime } from "@assistant-ui/react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ChefHatIcon } from "lucide-react";

export const MealImageTool: ToolCallMessagePartComponent = ({
  result,
}) => {
  const threadRuntime = useThreadRuntime();
  
  const handleGenerateRecipe = (mealName: string) => {
    threadRuntime.append({
      role: "user",
      content: [{ type: "text", text: `Use the generateRecipe tool to create a detailed recipe for: ${mealName}` }]
    });
  };

  if (!result) {
    return (
      <div className="aui-meal-image-loading mb-4 flex items-center gap-3 rounded-lg border border-yellow-400/50 bg-gradient-to-r from-yellow-400/10 to-red-500/10 p-4">
        <motion.div
          className="h-5 w-5 rounded-full border-2 border-yellow-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm font-semibold">🎨 Generating your meal image...</p>
      </div>
    );
  }

  const resultData = typeof result === "string" ? JSON.parse(result) : result;

  if (resultData.error) {
    return (
      <div className="aui-meal-image-error mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
        <p className="text-sm font-semibold text-red-500">
          ❌ Failed to generate image: {resultData.error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="aui-meal-image-result mb-4 overflow-hidden rounded-lg border-4 border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-red-500/20 p-2 shadow-lg"
    >
      <motion.div
        className="relative overflow-hidden rounded-md"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {resultData.imageUrl && (
          <img
            src={resultData.imageUrl}
            alt={resultData.prompt || "Generated meal"}
            className="h-auto w-full rounded-md"
          />
        )}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity hover:opacity-100"
        >
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-sm font-semibold text-white drop-shadow-lg">
              ✨ {resultData.prompt}
            </p>
          </div>
        </motion.div>
      </motion.div>
      <div className="mt-2 flex flex-col items-center gap-2">
        <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
          🍽️ AI-Generated Meal Image
        </p>
        <Button
          variant="default"
          size="sm"
          className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
          onClick={() => handleGenerateRecipe(resultData.prompt || "this meal")}
        >
          <ChefHatIcon className="h-4 w-4" />
          Generate Recipe
        </Button>
      </div>
    </motion.div>
  );
};
