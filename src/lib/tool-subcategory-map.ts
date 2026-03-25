import type { CategoryKey } from "@/lib/data/categories";

/** Maps tool display name → one of that category's `subcategories` labels. */
export const TOOL_SUBCATEGORY: Partial<
  Record<CategoryKey, Record<string, string>>
> = {
  writing: {
    ChatGPT: "Long-form",
    Jasper: "Copywriting",
    "Copy.ai": "Ad Copy",
    Grammarly: "Email",
    "Notion AI": "SEO",
  },
  coding: {
    "GitHub Copilot": "Code Gen",
    Cursor: "Code Review",
    Claude: "Debugging",
    Tabnine: "Code Gen",
    Codeium: "Testing",
  },
  image: {
    Midjourney: "Generation",
    "DALL-E 3": "Generation",
    "Stable Diffusion": "Generation",
    "Adobe Firefly": "Background",
    "Canva AI": "Editing",
  },
  video: {
    Runway: "Generation",
    Pika: "Clips",
    HeyGen: "Avatars",
    Descript: "Editing",
    Kling: "Generation",
  },
  audio: {
    ElevenLabs: "Voice Clone",
    Whisper: "Transcription",
    "Otter.ai": "Podcast",
    Suno: "Music",
    Murf: "TTS",
  },
  research: {
    Perplexity: "Web Search",
    Elicit: "Summarization",
    Consensus: "Citation",
    Tavily: "Data Extract",
    "You.com": "Web Search",
  },
  productivity: {
    "Notion AI": "Notes",
    "Zapier AI": "Automation",
    Motion: "Scheduling",
    "Reclaim.ai": "Meetings",
    Superhuman: "Email",
  },
  data: {
    "Julius AI": "Visualization",
    "Rows.com": "SQL",
    Akkio: "BI",
    "Obviously AI": "Reporting",
    "Tableau AI": "Visualization",
  },
  marketing: {
    "Surfer SEO": "SEO",
    "AdCreative.ai": "Ad Creative",
    "Predis.ai": "Social",
    "Klaviyo AI": "Email",
    "Semrush AI": "Analytics",
  },
  support: {
    "Intercom AI": "Live Chat",
    "Zendesk AI": "Ticket Routing",
    "Freshdesk AI": "FAQ",
    Tidio: "Chatbots",
    Forethought: "Sentiment",
  },
};

export function subcategoryForTool(
  categoryKey: CategoryKey,
  toolName: string,
  fallback: string
): string {
  const map = TOOL_SUBCATEGORY[categoryKey];
  const hit = map?.[toolName];
  return hit ?? fallback;
}
