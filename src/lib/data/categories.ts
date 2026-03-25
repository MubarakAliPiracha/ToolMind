// Helper to build a Google favicon URL — reliable, no auth needed
function gfav(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export const categories = {
  writing: {
    name: "Writing",
    description: "Tools that write, edit, and polish content.",
    subcategories: ["Copywriting", "Long-form", "Email", "SEO", "Ad Copy"],
    tools: [
      { name: "ChatGPT",   pricing: "freemium", bestFor: "General writing",  logoUrl: gfav("chat.openai.com") },
      { name: "Jasper",    pricing: "paid",      bestFor: "Marketing copy",   logoUrl: gfav("jasper.ai") },
      { name: "Copy.ai",   pricing: "freemium", bestFor: "Ad copy",           logoUrl: gfav("copy.ai") },
      { name: "Grammarly", pricing: "freemium", bestFor: "Editing",           logoUrl: gfav("grammarly.com") },
      { name: "Notion AI", pricing: "paid",      bestFor: "Documents",        logoUrl: gfav("notion.so") },
    ],
  },
  coding: {
    name: "Coding",
    description: "Tools that write, debug, and ship code.",
    subcategories: ["Code Gen", "Code Review", "Debugging", "Docs", "Testing"],
    tools: [
      { name: "GitHub Copilot", pricing: "paid",      bestFor: "Code completion", logoUrl: gfav("github.com") },
      { name: "Cursor",         pricing: "freemium", bestFor: "Full IDE",          logoUrl: gfav("cursor.com") },
      { name: "Claude",         pricing: "freemium", bestFor: "Complex reasoning", logoUrl: gfav("claude.ai") },
      { name: "Tabnine",        pricing: "freemium", bestFor: "Autocomplete",      logoUrl: gfav("tabnine.com") },
      { name: "Codeium",        pricing: "free",      bestFor: "Free alternative", logoUrl: gfav("codeium.com") },
    ],
  },
  image: {
    name: "Image",
    description: "Tools that generate, edit, and enhance images.",
    subcategories: ["Generation", "Editing", "Upscaling", "Background", "Avatars"],
    tools: [
      { name: "Midjourney",       pricing: "paid",      bestFor: "Art generation",   logoUrl: gfav("midjourney.com") },
      { name: "DALL-E 3",         pricing: "freemium", bestFor: "Photorealism",       logoUrl: gfav("openai.com") },
      { name: "Stable Diffusion", pricing: "free",      bestFor: "Open source",       logoUrl: gfav("stability.ai") },
      { name: "Adobe Firefly",    pricing: "freemium", bestFor: "Commercial safe",    logoUrl: gfav("adobe.com") },
      { name: "Canva AI",         pricing: "freemium", bestFor: "Design",             logoUrl: gfav("canva.com") },
    ],
  },
  video: {
    name: "Video",
    description: "Tools that generate, edit, and enhance video.",
    subcategories: ["Generation", "Editing", "Avatars", "Subtitles", "Clips"],
    tools: [
      { name: "Runway",  pricing: "freemium", bestFor: "Video generation", logoUrl: gfav("runwayml.com") },
      { name: "Pika",    pricing: "freemium", bestFor: "Short clips",       logoUrl: gfav("pika.art") },
      { name: "HeyGen",  pricing: "paid",      bestFor: "AI avatars",       logoUrl: gfav("heygen.com") },
      { name: "Descript",pricing: "freemium", bestFor: "Editing",           logoUrl: gfav("descript.com") },
      { name: "Kling",   pricing: "freemium", bestFor: "Realistic video",   logoUrl: gfav("klingai.com") },
    ],
  },
  audio: {
    name: "Audio",
    description: "Tools that transcribe, clone, and generate audio.",
    subcategories: ["Transcription", "Voice Clone", "Music", "Podcast", "TTS"],
    tools: [
      { name: "ElevenLabs", pricing: "freemium", bestFor: "Voice cloning",     logoUrl: gfav("elevenlabs.io") },
      { name: "Whisper",    pricing: "free",      bestFor: "Transcription",     logoUrl: gfav("openai.com") },
      { name: "Otter.ai",   pricing: "freemium", bestFor: "Meeting notes",      logoUrl: gfav("otter.ai") },
      { name: "Suno",       pricing: "freemium", bestFor: "Music generation",   logoUrl: gfav("suno.com") },
      { name: "Murf",       pricing: "paid",      bestFor: "TTS voiceover",     logoUrl: gfav("murf.ai") },
    ],
  },
  research: {
    name: "Research",
    description: "Tools that search, summarize, and extract data.",
    subcategories: ["Web Search", "Summarization", "Citation", "Data Extract"],
    tools: [
      { name: "Perplexity", pricing: "freemium", bestFor: "AI search",          logoUrl: gfav("perplexity.ai") },
      { name: "Elicit",     pricing: "freemium", bestFor: "Academic research",  logoUrl: gfav("elicit.org") },
      { name: "Consensus",  pricing: "freemium", bestFor: "Scientific papers",  logoUrl: gfav("consensus.app") },
      { name: "Tavily",     pricing: "freemium", bestFor: "API search",         logoUrl: gfav("tavily.com") },
      { name: "You.com",    pricing: "freemium", bestFor: "Search + chat",      logoUrl: gfav("you.com") },
    ],
  },
  productivity: {
    name: "Productivity",
    description: "Tools that automate tasks and manage your work.",
    subcategories: ["Scheduling", "Email", "Notes", "Automation", "Meetings"],
    tools: [
      { name: "Notion AI",   pricing: "paid",      bestFor: "Notes + docs", logoUrl: gfav("notion.so") },
      { name: "Zapier AI",   pricing: "freemium", bestFor: "Automation",    logoUrl: gfav("zapier.com") },
      { name: "Motion",      pricing: "paid",      bestFor: "Scheduling",   logoUrl: gfav("usemotion.com") },
      { name: "Reclaim.ai",  pricing: "freemium", bestFor: "Calendar",      logoUrl: gfav("reclaim.ai") },
      { name: "Superhuman",  pricing: "paid",      bestFor: "Email",        logoUrl: gfav("superhuman.com") },
    ],
  },
  data: {
    name: "Data",
    description: "Tools that visualize, query, and analyze data.",
    subcategories: ["Visualization", "SQL", "Reporting", "Scraping", "BI"],
    tools: [
      { name: "Julius AI",    pricing: "freemium", bestFor: "Data analysis",   logoUrl: gfav("julius.ai") },
      { name: "Rows.com",     pricing: "freemium", bestFor: "AI spreadsheets", logoUrl: gfav("rows.com") },
      { name: "Akkio",        pricing: "paid",      bestFor: "No-code ML",     logoUrl: gfav("akkio.com") },
      { name: "Obviously AI", pricing: "paid",      bestFor: "Predictions",    logoUrl: gfav("obviously.ai") },
      { name: "Tableau AI",   pricing: "paid",      bestFor: "Visualization",  logoUrl: gfav("tableau.com") },
    ],
  },
  marketing: {
    name: "Marketing",
    description: "Tools that grow, convert, and retain audiences.",
    subcategories: ["SEO", "Social", "Ad Creative", "Analytics", "Email"],
    tools: [
      { name: "Surfer SEO",    pricing: "paid",      bestFor: "SEO content",    logoUrl: gfav("surferseo.com") },
      { name: "AdCreative.ai", pricing: "paid",      bestFor: "Ad images",      logoUrl: gfav("adcreative.ai") },
      { name: "Predis.ai",     pricing: "freemium", bestFor: "Social posts",    logoUrl: gfav("predis.ai") },
      { name: "Klaviyo AI",    pricing: "paid",      bestFor: "Email marketing", logoUrl: gfav("klaviyo.com") },
      { name: "Semrush AI",    pricing: "paid",      bestFor: "SEO research",   logoUrl: gfav("semrush.com") },
    ],
  },
  support: {
    name: "Support",
    description: "Tools that handle, route, and resolve customer issues.",
    subcategories: ["Chatbots", "Ticket Routing", "Sentiment", "FAQ", "Live Chat"],
    tools: [
      { name: "Intercom AI",  pricing: "paid",      bestFor: "Customer chat",  logoUrl: gfav("intercom.com") },
      { name: "Zendesk AI",   pricing: "paid",      bestFor: "Ticket routing", logoUrl: gfav("zendesk.com") },
      { name: "Freshdesk AI", pricing: "freemium", bestFor: "Support desk",    logoUrl: gfav("freshdesk.com") },
      { name: "Tidio",        pricing: "freemium", bestFor: "Live chat",       logoUrl: gfav("tidio.com") },
      { name: "Forethought",  pricing: "paid",      bestFor: "AI triage",      logoUrl: gfav("forethought.ai") },
    ],
  },
} as const;

export type CategoryKey = keyof typeof categories;

export type CategoryData = (typeof categories)[CategoryKey];
