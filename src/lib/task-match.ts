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
  const taskWords = taskLower.split(/\s+/).filter((w) => w.length > 2);
  const bestForLower = tool.bestFor.toLowerCase();
  // Split bestFor into individual words and phrases for reverse matching
  const bestForWords = bestForLower.split(/[\s,]+/).filter((w) => w.length > 3);

  // Category keyword matching — broad intent detection, capped low so it
  // doesn't swamp the per-tool bestFor signal
  let catScore = 0;
  for (const kw of catKws) {
    if (taskLower.includes(kw)) {
      catScore += kw.length > 8 ? 8 : kw.length > 5 ? 5 : 3;
    }
  }
  catScore = Math.min(25, catScore);

  // Forward match: task words found in bestFor
  // e.g. task "write a blog post" → "blog" hits bestFor → +8 per match
  let forwardScore = 0;
  for (const tw of taskWords) {
    if (bestForLower.includes(tw)) forwardScore += 8;
  }
  forwardScore = Math.min(55, forwardScore);

  // Reverse match: bestFor words found in task
  // e.g. bestFor has "marketing copy" → "marketing" in task → +5 per match
  let reverseScore = 0;
  for (const bw of bestForWords) {
    if (taskLower.includes(bw)) reverseScore += 5;
  }
  reverseScore = Math.min(20, reverseScore);

  const nameScore = taskLower.includes(tool.name.toLowerCase()) ? 10 : 0;
  const catNameScore = taskLower.includes(tool.categoryName.toLowerCase()) ? 5 : 0;

  return Math.min(100, catScore + forwardScore + reverseScore + nameScore + catNameScore);
}

export const MINIMUM_MATCH_SCORE = 10;
