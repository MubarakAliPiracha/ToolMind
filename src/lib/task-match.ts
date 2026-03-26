import type { CategoryKey } from "@/lib/data/categories";

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  writing: [
    "write", "writing", "copy", "copywriting", "content", "blog", "article",
    "email", "seo", "text", "draft", "proofread", "essay", "story",
    "caption", "description", "summarize", "newsletter", "report", "document",
    "pitch", "deck", "proposal", "memo", "brief",
  ],
  coding: [
    "code", "coding", "program", "debug", "develop", "software", "script",
    "function", "api", "test", "review", "python", "javascript", "typescript",
    "react", "app", "build", "deploy", "git", "refactor", "automate",
    "startup", "mvp", "prototype", "website", "web app", "mobile app",
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
    "song", "compose", "sing",
  ],
  research: [
    "research", "search", "find", "summarize", "analyze", "study", "paper",
    "academic", "facts", "information", "cite", "source", "literature",
    "browse", "web search", "knowledge",
  ],
  productivity: [
    "schedule", "meeting", "organize", "task", "calendar", "workflow",
    "automate", "project", "manage", "plan", "note", "todo", "reminder",
    "email management", "startup", "founder", "team", "okr", "operations",
    "business", "focus", "productivity",
  ],
  data: [
    "data", "analyze", "chart", "sql", "spreadsheet", "visualize", "report",
    "predict", "ml", "dataset", "csv", "excel", "bi", "dashboard", "insight",
    "query", "statistics", "analytics",
  ],
  marketing: [
    "marketing", "seo", "social", "ad", "campaign", "grow", "audience",
    "convert", "brand", "analytics", "engagement", "reach", "promotion",
    "startup", "founder", "business", "launch", "pitch", "mvp", "company",
    "saas", "go-to-market", "gtm", "instagram", "tiktok", "facebook",
  ],
  support: [
    "customer", "support", "chat", "chatbot", "ticket", "service",
    "faq", "resolve", "complaint", "helpdesk", "customer service",
  ],
};

/**
 * Maps intent words and goal phrases to concrete keywords present in tool bestFor strings.
 * When a key appears in the normalized query, the expansion terms are appended to
 * a synthetic search string for scoring — zero runtime overhead, no new packages.
 */
const QUERY_EXPANSIONS: Record<string, string[]> = {
  // Startup / building
  startup:        ["startup", "mvp", "launch", "product", "saas", "business", "founder", "build app"],
  build:          ["build", "develop", "create", "code", "app", "prototype", "software", "ship"],
  launch:         ["launch", "go-to-market", "marketing", "mvp", "product launch", "campaign"],
  create:         ["create", "generate", "make", "produce", "design", "write"],
  make:           ["create", "generate", "design", "produce", "build"],
  prototype:      ["mvp", "prototype", "build app", "develop", "code"],
  founder:        ["startup", "mvp", "business", "saas", "product", "founder"],
  company:        ["business", "startup", "brand", "marketing", "team"],
  product:        ["product", "mvp", "build app", "saas", "startup"],

  // Social / audience
  "social media": ["social media", "instagram", "tiktok", "facebook", "post scheduling", "content calendar"],
  audience:       ["audience", "followers", "engagement", "reach", "grow", "social"],
  grow:           ["grow", "audience", "marketing", "seo", "engagement", "reach", "scale"],
  followers:      ["audience", "social media", "instagram", "engagement"],
  instagram:      ["instagram", "social media", "post scheduling", "content calendar", "reels"],
  facebook:       ["facebook", "social media", "ad campaigns", "audience"],
  post:           ["social media", "content", "post scheduling", "blog", "article"],
  schedule:       ["schedule", "calendar", "post scheduling", "time blocking", "planning"],

  // Video
  youtube:        ["youtube", "video editing", "transcript", "shorts", "captions"],
  "edit video":   ["video editing", "transcript editing", "clips", "filler words"],
  tiktok:         ["tiktok", "short video", "social media video", "reels", "clips"],
  reels:          ["reels", "short video", "instagram", "tiktok"],
  film:           ["video", "film", "cinematic", "video generation"],
  clip:           ["video clip", "short video", "reel", "tiktok"],

  // Audio / podcast
  podcast:        ["podcast", "transcription", "audio editing", "voiceover", "episode", "narration"],
  transcribe:     ["transcription", "speech to text", "captions", "meeting notes", "audio"],
  transcript:     ["transcription", "speech to text", "captions", "audio"],
  voice:          ["voice cloning", "text to speech", "voiceover", "narration", "tts"],
  song:           ["music generation", "song creation", "lyrics", "instrumental"],
  music:          ["music", "song creation", "instrumental", "background music", "compose"],
  sing:           ["song creation", "lyrics", "music generation", "vocals"],
  narrate:        ["narration", "voiceover", "text to speech", "audiobook"],
  audiobook:      ["audiobook narration", "text to speech", "voiceover", "narration"],

  // Images
  photo:          ["photo", "image", "photograph", "edit photo", "photorealistic"],
  picture:        ["image", "photo", "illustration", "visual", "generate"],
  design:         ["design", "graphic", "logo", "visual", "template", "image"],
  logo:           ["logo", "brand", "graphic design", "icon", "visual identity"],
  thumbnail:      ["thumbnail", "banner", "image generation", "graphic", "youtube"],
  art:            ["art", "artwork", "illustration", "digital art", "creative"],
  icon:           ["icon", "logo", "graphic", "design", "visual"],
  banner:         ["banner", "thumbnail", "graphic", "social media graphics", "design"],
  illustration:   ["illustration", "digital art", "artwork", "character design"],

  // Writing / content
  blog:           ["blog", "article", "long-form", "content", "writing", "seo"],
  article:        ["article", "blog", "content", "writing", "long-form"],
  email:          ["email", "newsletter", "campaign", "inbox", "outreach"],
  copy:           ["copywriting", "ad copy", "marketing copy", "sales page", "conversion"],
  essay:          ["essay", "long-form", "academic", "writing"],
  content:        ["content", "writing", "blog", "article", "copy", "social media"],
  newsletter:     ["newsletter", "email", "campaign", "writing"],
  caption:        ["captions", "social media", "instagram", "subtitle"],
  script:         ["script", "writing", "voiceover", "video", "copy"],

  // Data / analytics
  analyze:        ["analyze", "data analysis", "chart", "visualization", "insights", "report"],
  analysis:       ["analysis", "data", "chart", "insights", "report", "statistics"],
  chart:          ["chart", "visualization", "dashboard", "data analysis"],
  dashboard:      ["dashboard", "visualization", "business intelligence", "reporting", "charts"],
  spreadsheet:    ["spreadsheet", "csv", "excel", "data analysis", "sheets"],
  report:         ["report", "dashboard", "analytics", "data visualization", "business intelligence"],
  predict:        ["predictive analytics", "machine learning", "forecast", "ml"],
  automate:       ["automation", "workflow", "no-code", "integrate", "trigger", "connect apps"],

  // Research
  research:       ["research", "search", "summarize", "paper", "academic", "literature"],
  find:           ["search", "research", "web search", "discover"],
  summarize:      ["summarize", "summary", "extract", "synopsis"],
  study:          ["research", "academic", "paper", "study", "literature"],

  // Customer / support
  customer:       ["customer support", "chat", "helpdesk", "ticket", "service"],
  chatbot:        ["chatbot", "chat", "bot", "automated replies", "customer service"],
  support:        ["support", "helpdesk", "ticket", "customer service", "faq"],

  // Coding-specific
  code:           ["code", "programming", "software", "development"],
  debug:          ["debug", "fix bugs", "error", "troubleshoot", "code review"],
  app:            ["app", "application", "software", "web app", "mobile app"],
  website:        ["website", "web app", "build", "develop", "deploy"],
  api:            ["api", "integration", "backend", "development", "code"],
};

export interface ToolMatchInput {
  categorySlug: CategoryKey;
  categoryName: string;
  name: string;
  bestFor: string;
}

/**
 * Strip natural-language filler from task queries so that intent keywords land
 * directly on the scoring logic.
 * e.g. "i want to build a startup" → "build a startup"
 */
export function normalizeTaskQuery(raw: string): string {
  const lower = raw.toLowerCase().trim();
  const fillerPrefixes = [
    "i want to ", "i need to ", "i'd like to ", "i would like to ",
    "help me ", "help me to ", "how do i ", "how to ", "how can i ",
    "i'm trying to ", "i am trying to ", "i'm looking to ", "i am looking to ",
    "i want ", "i need ", "can you help me ", "please help me ",
    "show me how to ", "show me ", "find me ",
  ];
  for (const prefix of fillerPrefixes) {
    if (lower.startsWith(prefix)) {
      return raw.slice(prefix.length).trim();
    }
  }
  return raw.trim();
}

/**
 * Expand a normalized query with synonym/intent keywords from QUERY_EXPANSIONS.
 * Returns a synthetic string combining the original query plus all matched expansion
 * terms — used as an additional surface for forward/reverse matching.
 */
function expandQuery(normalized: string): string {
  const lower = normalized.toLowerCase();
  const extra: string[] = [];
  for (const [key, terms] of Object.entries(QUERY_EXPANSIONS)) {
    if (lower.includes(key)) {
      extra.push(...terms);
    }
  }
  return extra.length > 0 ? `${normalized} ${extra.join(" ")}` : normalized;
}

export function scoreToolForTask(tool: ToolMatchInput, task: string): number {
  const normalized = normalizeTaskQuery(task);
  const taskLower = normalized.toLowerCase();
  if (!taskLower) return 0;

  const expanded = expandQuery(normalized).toLowerCase();
  const catKws = CATEGORY_KEYWORDS[tool.categorySlug] ?? [];
  const taskWords = taskLower.split(/\s+/).filter((w) => w.length > 2);
  const expandedWords = expanded.split(/\s+/).filter((w) => w.length > 2);
  const bestForLower = tool.bestFor.toLowerCase();
  const bestForWords = bestForLower.split(/[\s,]+/).filter((w) => w.length > 3);

  // Category keyword matching — confirms category intent
  let catScore = 0;
  for (const kw of catKws) {
    if (taskLower.includes(kw) || expanded.includes(kw)) {
      catScore += kw.length > 8 ? 8 : kw.length > 5 ? 5 : 3;
    }
  }
  catScore = Math.min(15, catScore); // lowered cap: category confirms direction, doesn't dominate
  const catBump = catScore > 0 ? 5 : 0; // reduced flat bump

  // Bigram phrase matching — two-word phrases score higher than individual words
  let phraseScore = 0;
  for (let i = 0; i < taskWords.length - 1; i++) {
    const bigram = `${taskWords[i]} ${taskWords[i + 1]}`;
    const bigramReverse = `${taskWords[i + 1]} ${taskWords[i]}`;
    if (bestForLower.includes(bigram)) phraseScore += 18;
    else if (bestForLower.includes(bigramReverse)) phraseScore += 12;
  }
  phraseScore = Math.min(35, phraseScore);

  // Forward match: task words (+ expanded synonyms) found in bestFor
  let forwardScore = 0;
  for (const tw of expandedWords) {
    if (bestForLower.includes(tw)) {
      // Original task words score more than expansion terms
      const isOriginal = taskWords.includes(tw);
      forwardScore += isOriginal ? 12 : 6;
    }
  }
  forwardScore = Math.min(70, forwardScore);

  // Reverse match: bestFor words found in task (or expanded)
  let reverseScore = 0;
  for (const bw of bestForWords) {
    if (taskLower.includes(bw) || expanded.includes(bw)) reverseScore += 5;
  }
  reverseScore = Math.min(20, reverseScore);

  const nameScore = taskLower.includes(tool.name.toLowerCase()) ? 10 : 0;
  const catNameScore = taskLower.includes(tool.categoryName.toLowerCase()) ? 5 : 0;

  const total = catScore + catBump + phraseScore + forwardScore + reverseScore + nameScore + catNameScore;
  return Math.min(100, total);
}

export const MINIMUM_MATCH_SCORE = 10;

/** Minimum for lexical fallback rows (stems can score slightly below strict threshold). */
export const MINIMUM_LEXICAL_SCORE = 5;

/** Stopwords for fuzzy fallback — intent verbs intentionally kept so they can match. */
const DIRECTORY_STOPWORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "all", "can", "was", "our", "out",
  "get", "has", "how", "its", "may", "new", "now", "see", "way", "who", "did",
  "any", "too", "try", "with", "have", "from", "they", "been", "into", "just", "more",
  "only", "some", "than", "that", "this", "what", "when", "your", "also", "here", "like",
  "most", "over", "such", "very", "will", "using",
  "about", "after", "again", "before", "being", "both", "each", "few", "other", "same",
  "their", "them", "then", "these", "those", "through", "while", "which", "without",
  "would", "could", "should", "must", "shall", "ought",
  // Intentionally NOT stopwords (carry real intent signal):
  // "make", "need", "want", "help", "use", "edit", "time"
]);

function wordVariants(word: string): string[] {
  const w = word.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (w.length < 3) return [];
  const variants = [w];
  if (w.length > 5 && w.endsWith("ing")) {
    const stem = w.slice(0, -3);
    if (stem.length >= 3) variants.push(stem);
  }
  if (w.length > 4 && w.endsWith("es")) {
    const stem = w.slice(0, -2);
    if (stem.length >= 3) variants.push(stem);
  }
  return variants;
}

/**
 * Softer match: significant task tokens (and simple stems) appear in name, category, or bestFor.
 * Used when {@link scoreToolForTask} yields no results above {@link MINIMUM_MATCH_SCORE}.
 */
export function lexicalMatchScore(tool: ToolMatchInput, task: string): number {
  const normalized = normalizeTaskQuery(task);
  const taskLower = normalized.toLowerCase();
  if (!taskLower) return 0;

  const expanded = expandQuery(normalized).toLowerCase();

  const words = taskLower
    .split(/\s+/)
    .map((x) => x.replace(/[^a-z0-9]/g, ""))
    .filter((x) => x.length >= 3 && !DIRECTORY_STOPWORDS.has(x));

  const hay = `${tool.name} ${tool.categoryName} ${tool.bestFor}`.toLowerCase();
  let score = 0;
  for (const w of words) {
    for (const v of wordVariants(w)) {
      if (hay.includes(v)) {
        score += v === w ? 14 : 9;
        break;
      }
    }
  }

  // Also score expansion terms against tool data
  const expandedExtra = expanded.replace(taskLower, "").trim();
  if (expandedExtra) {
    const expandedWords = expandedExtra
      .split(/\s+/)
      .map((x) => x.replace(/[^a-z0-9]/g, ""))
      .filter((x) => x.length >= 3 && !DIRECTORY_STOPWORDS.has(x));
    for (const w of expandedWords) {
      if (hay.includes(w)) score += 5;
    }
  }

  return Math.min(100, score);
}

/**
 * Single score for directory ranking: never weaker than either heuristic alone.
 * The directory always shows every tool in the current category, sorted by this (no empty grids).
 */
export function combinedDirectoryRelevanceScore(tool: ToolMatchInput, task: string): number {
  const t = task.trim();
  if (!t) return 0;
  return Math.max(scoreToolForTask(tool, t), lexicalMatchScore(tool, t));
}
