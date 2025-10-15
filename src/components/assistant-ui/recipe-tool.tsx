import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { motion } from "motion/react";
import { ChefHatIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export const RecipeTool: ToolCallMessagePartComponent = ({
  result,
}) => {
  if (!result) {
    return (
      <div className="aui-recipe-loading mb-4 flex items-center gap-3 rounded-lg border border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-red-500/10 p-4">
        <motion.div
          className="h-5 w-5 rounded-full border-2 border-orange-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm font-semibold">👨‍🍳 Preparing your recipe...</p>
      </div>
    );
  }

  const resultData = typeof result === "string" ? JSON.parse(result) : result;

  if (resultData.error) {
    return (
      <div className="aui-recipe-error mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
        <p className="text-sm font-semibold text-red-500">
          ❌ Failed to generate recipe: {resultData.error}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="aui-recipe-result mb-4 overflow-hidden rounded-lg border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 p-4 shadow-md dark:from-orange-950/30 dark:to-red-950/30"
    >
      <div className="flex items-center gap-2 mb-3">
        <ChefHatIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100">
          Recipe: {resultData.mealName}
        </h3>
      </div>
      {resultData.recipe && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-orange-900 dark:text-orange-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {resultData.recipe}
          </ReactMarkdown>
        </div>
      )}
    </motion.div>
  );
};
