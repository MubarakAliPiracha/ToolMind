import type { CategoryKey } from "@/lib/data/categories";

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  writing: [
    "write", "writing", "copy", "copywriting", "content", "blog", "article",
    "email", "seo", "text", "draft", "edit", "proofread", "essay", "story",
    "caption", "description", "summarize", "newsletter", "report", "document",
  ],
  coding: [
    "code", "coding", "program", "debug", "develop", "software", "script",
    "function", "api", "test", "review", "python", "javascript", "typescript",
    "react", "app", "build", "deploy", "git", "refactor", "automate",
  ],
  image: [
    "image", "photo", "picture", "generate", "design", "art", "visual",
    "logo", "icon", "graphic", "illustration", "render", "background",
    "avatar", "portrait", "banner", "thumbnail", "creative",
  ],
  video: [
    "video", "clip", "film", "animate", "movie", "subtitle", "avatar",
    "reel", "tiktok", "youtube", "short", "explainer", "edit video",
  ],
  audio: [
    "audio", "voice", "speech", "transcribe", "podcast", "music", "sound",
    "record", "narrate", "tts", "voiceover", "meeting notes", "caption",
  ],
  research: [
    "research", "search", "find", "summarize", "analyze", "study", "paper",
    "academic", "facts", "information", "cite", "source", "literature",
    "browse", "web search", "knowledge",
  ],
  productivity: [
    "schedule", "meeting", "organize", "task", "calendar", "workflow",
    "automate", "project", "manage", "plan", "note", "todo", "reminder",
    "time", "email management",
  ],
  data: [
    "data", "analyze", "chart", "sql", "spreadsheet", "visualize", "report",
    "predict", "ml", "dataset", "csv", "excel", "bi", "dashboard", "insight",
    "query", "statistics",
  ],
  marketing: [
    "marketing", "seo", "social", "ad", "campaign", "grow", "audience",
    "convert", "brand", "analytics", "engagement", "reach", "promotion",
  ],
  support: [
    "customer", "support", "chat", "chatbot", "ticket", "help", "service",
    "faq", "resolve", "complaint", "helpdesk", "customer service",
  ],
};

export interface ToolMatchInput {
  categorySlug: CategoryKey;
  categoryName: string;
  name: string;
  bestFor: string;
}

export function scoreToolForTask(tool: ToolMatchInput, task: string): number {
  const taskLower = task.toLowerCase().trim();
  if (!taskLower) return 0;

  const catKws = CATEGORY_KEYWORDS[tool.categorySlug] ?? [];

  let catScore = 0;
  for (const kw of catKws) {
    if (taskLower.includes(kw)) {
      catScore += kw.length > 8 ? 14 : kw.length > 5 ? 9 : 6;
    }
  }
  catScore = Math.min(55, catScore);

  let bestForScore = 0;
  const taskWords = taskLower.split(/\s+/).filter((w) => w.length > 2);
  const bestForLower = tool.bestFor.toLowerCase();
  for (const tw of taskWords) {
    if (bestForLower.includes(tw)) bestForScore += 10;
  }
  bestForScore = Math.min(30, bestForScore);

  const nameScore = taskLower.includes(tool.name.toLowerCase()) ? 10 : 0;
  const catNameScore = taskLower.includes(tool.categoryName.toLowerCase()) ? 5 : 0;

  const total = catScore + bestForScore + nameScore + catNameScore;
  return Math.min(97, Math.max(12, total));
}
