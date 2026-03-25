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
      {
        name: "ChatGPT",
        pricing: "freemium",
        bestFor: "general writing assistant, blog post, article, essay, email drafting, creative writing, storytelling, content creation, social media posts, brainstorming, rewriting, summarization, cover letter, speech",
        logoUrl: gfav("chat.openai.com"),
      },
      {
        name: "Jasper",
        pricing: "paid",
        bestFor: "marketing copy, ad copy, product description, sales page, landing page copy, brand voice, campaign content, long form article, blog writing, conversion copy",
        logoUrl: gfav("jasper.ai"),
      },
      {
        name: "Copy.ai",
        pricing: "freemium",
        bestFor: "ad copy, social media captions, product descriptions, email campaigns, headlines, taglines, marketing content, Facebook ads, Instagram captions",
        logoUrl: gfav("copy.ai"),
      },
      {
        name: "Grammarly",
        pricing: "freemium",
        bestFor: "grammar check, spelling correction, proofreading, editing, writing clarity, tone adjustment, plagiarism detection, business writing, academic editing, English improvement",
        logoUrl: gfav("grammarly.com"),
      },
      {
        name: "Notion AI",
        pricing: "paid",
        bestFor: "documents, notes, wiki pages, project documentation, meeting notes, knowledge base, team writing, internal docs, SOPs, summaries",
        logoUrl: gfav("notion.so"),
      },
    ],
  },
  coding: {
    name: "Coding",
    description: "Tools that write, debug, and ship code.",
    subcategories: ["Code Gen", "Code Review", "Debugging", "Docs", "Testing"],
    tools: [
      {
        name: "GitHub Copilot",
        pricing: "paid",
        bestFor: "code completion, autocomplete, inline suggestions, pair programming, boilerplate generation, function implementation, unit test writing, GitHub integration, code snippets",
        logoUrl: gfav("github.com"),
      },
      {
        name: "Cursor",
        pricing: "freemium",
        bestFor: "full IDE with AI, code refactoring, debugging, chat with codebase, large project navigation, code explanation, code generation, multi-file editing, codebase Q&A",
        logoUrl: gfav("cursor.com"),
      },
      {
        name: "Claude",
        pricing: "freemium",
        bestFor: "complex code reasoning, code review, architecture design, algorithm explanation, technical writing, debugging logic, code documentation, system design, refactoring advice",
        logoUrl: gfav("claude.ai"),
      },
      {
        name: "Tabnine",
        pricing: "freemium",
        bestFor: "code autocomplete, local AI model, privacy focused coding, multi-language support, inline code suggestions, enterprise code completion",
        logoUrl: gfav("tabnine.com"),
      },
      {
        name: "Codeium",
        pricing: "free",
        bestFor: "free code completion, autocomplete, code generation, multi-IDE support, open source alternative, VS Code extension, fast suggestions",
        logoUrl: gfav("codeium.com"),
      },
    ],
  },
  image: {
    name: "Image",
    description: "Tools that generate, edit, and enhance images.",
    subcategories: ["Generation", "Editing", "Upscaling", "Background", "Avatars"],
    tools: [
      {
        name: "Midjourney",
        pricing: "paid",
        bestFor: "digital art, concept art, illustration, fantasy art, photorealistic rendering, stylized images, creative artwork, character design, environment art, high quality visuals",
        logoUrl: gfav("midjourney.com"),
      },
      {
        name: "DALL-E 3",
        pricing: "freemium",
        bestFor: "photorealistic image generation, accurate text in images, product visuals, creative illustrations, ChatGPT integration, brand images, conceptual art",
        logoUrl: gfav("openai.com"),
      },
      {
        name: "Stable Diffusion",
        pricing: "free",
        bestFor: "open source image generation, local image generation, custom model fine-tuning, inpainting, outpainting, image editing, ControlNet, free unlimited generation",
        logoUrl: gfav("stability.ai"),
      },
      {
        name: "Adobe Firefly",
        pricing: "freemium",
        bestFor: "commercial safe images, stock photo generation, design assets, Photoshop generative fill, Adobe Creative Cloud integration, professional image editing",
        logoUrl: gfav("adobe.com"),
      },
      {
        name: "Canva AI",
        pricing: "freemium",
        bestFor: "social media graphics, presentation design, marketing materials, non-designer templates, logo design, poster creation, Instagram graphics, drag and drop design",
        logoUrl: gfav("canva.com"),
      },
    ],
  },
  video: {
    name: "Video",
    description: "Tools that generate, edit, and enhance video.",
    subcategories: ["Generation", "Editing", "Avatars", "Subtitles", "Clips"],
    tools: [
      {
        name: "Runway",
        pricing: "freemium",
        bestFor: "text to video generation, video editing, AI film making, background removal, motion tracking, inpainting video, Gen-2 video, cinematic AI video",
        logoUrl: gfav("runwayml.com"),
      },
      {
        name: "Pika",
        pricing: "freemium",
        bestFor: "short video clips, text to video, image to video animation, quick video generation, social media video, animated content, TikTok videos",
        logoUrl: gfav("pika.art"),
      },
      {
        name: "HeyGen",
        pricing: "paid",
        bestFor: "AI avatar video, spokesperson video, video translation, lip sync, talking head video, corporate training videos, multilingual video, presenter cloning",
        logoUrl: gfav("heygen.com"),
      },
      {
        name: "Descript",
        pricing: "freemium",
        bestFor: "video editing by transcript, podcast editing, remove filler words, screen recording, overdub voice cloning, YouTube video editing, interview editing",
        logoUrl: gfav("descript.com"),
      },
      {
        name: "Kling",
        pricing: "freemium",
        bestFor: "realistic video generation, cinematic video, text to video, high quality video AI, motion video, scene generation, film quality output",
        logoUrl: gfav("klingai.com"),
      },
    ],
  },
  audio: {
    name: "Audio",
    description: "Tools that transcribe, clone, and generate audio.",
    subcategories: ["Transcription", "Voice Clone", "Music", "Podcast", "TTS"],
    tools: [
      {
        name: "ElevenLabs",
        pricing: "freemium",
        bestFor: "voice cloning, text to speech, custom voice creation, multilingual narration, realistic voice synthesis, audiobook narration, character voices, podcast voice",
        logoUrl: gfav("elevenlabs.io"),
      },
      {
        name: "Whisper",
        pricing: "free",
        bestFor: "audio transcription, speech to text, meeting transcription, multilingual transcription, accurate captions, subtitle generation, open source transcription",
        logoUrl: gfav("openai.com"),
      },
      {
        name: "Otter.ai",
        pricing: "freemium",
        bestFor: "meeting notes, live meeting transcription, conversation summary, team collaboration, Zoom transcription, Google Meet notes, action items from meetings",
        logoUrl: gfav("otter.ai"),
      },
      {
        name: "Suno",
        pricing: "freemium",
        bestFor: "AI music generation, song creation, lyrics writing, instrumental music, background music, full song with vocals, genre specific music",
        logoUrl: gfav("suno.com"),
      },
      {
        name: "Murf",
        pricing: "paid",
        bestFor: "professional voiceover, text to speech studio, e-learning narration, podcast narration, explainer video voice, high quality TTS, voice over production",
        logoUrl: gfav("murf.ai"),
      },
    ],
  },
  research: {
    name: "Research",
    description: "Tools that search, summarize, and extract data.",
    subcategories: ["Web Search", "Summarization", "Citation", "Data Extract"],
    tools: [
      {
        name: "Perplexity",
        pricing: "freemium",
        bestFor: "AI web search, real-time information, factual answers with citations, news research, current events, research assistant, source verification, question answering",
        logoUrl: gfav("perplexity.ai"),
      },
      {
        name: "Elicit",
        pricing: "freemium",
        bestFor: "academic research, paper summarization, literature review, research synthesis, scientific study analysis, hypothesis testing, evidence extraction",
        logoUrl: gfav("elicit.org"),
      },
      {
        name: "Consensus",
        pricing: "freemium",
        bestFor: "scientific paper search, peer reviewed research, evidence based answers, medical research, study findings, consensus among researchers, health claims",
        logoUrl: gfav("consensus.app"),
      },
      {
        name: "Tavily",
        pricing: "freemium",
        bestFor: "search API for developers, web scraping, automated research, data extraction, LLM search integration, research automation, news monitoring",
        logoUrl: gfav("tavily.com"),
      },
      {
        name: "You.com",
        pricing: "freemium",
        bestFor: "AI search engine, chat with web, shopping search, coding search, private browsing, customizable search, web browsing assistant",
        logoUrl: gfav("you.com"),
      },
    ],
  },
  productivity: {
    name: "Productivity",
    description: "Tools that automate tasks and manage your work.",
    subcategories: ["Scheduling", "Email", "Notes", "Automation", "Meetings"],
    tools: [
      {
        name: "Notion AI",
        pricing: "paid",
        bestFor: "notes and documents, project management, team wiki, knowledge base, meeting notes, task tracking, content calendar, team collaboration, SOPs",
        logoUrl: gfav("notion.so"),
      },
      {
        name: "Zapier AI",
        pricing: "freemium",
        bestFor: "workflow automation, app integration, no-code automation, trigger actions, connect apps, automate repetitive tasks, multi-step workflows, CRM automation",
        logoUrl: gfav("zapier.com"),
      },
      {
        name: "Motion",
        pricing: "paid",
        bestFor: "AI scheduling, calendar management, task prioritization, time blocking, focus time, automatic schedule planning, deadline management",
        logoUrl: gfav("usemotion.com"),
      },
      {
        name: "Reclaim.ai",
        pricing: "freemium",
        bestFor: "smart calendar, protect focus time, habit scheduling, automatic meeting scheduling, work-life balance, Google Calendar AI, block time for deep work",
        logoUrl: gfav("reclaim.ai"),
      },
      {
        name: "Superhuman",
        pricing: "paid",
        bestFor: "email productivity, fast inbox, inbox zero, email keyboard shortcuts, email triage, AI email replies, follow up reminders, Gmail speed",
        logoUrl: gfav("superhuman.com"),
      },
    ],
  },
  data: {
    name: "Data",
    description: "Tools that visualize, query, and analyze data.",
    subcategories: ["Visualization", "SQL", "Reporting", "Scraping", "BI"],
    tools: [
      {
        name: "Julius AI",
        pricing: "freemium",
        bestFor: "data analysis, CSV file analysis, chart generation, spreadsheet analysis, Python data visualization, statistical analysis, data insights, upload and analyze data",
        logoUrl: gfav("julius.ai"),
      },
      {
        name: "Rows.com",
        pricing: "freemium",
        bestFor: "AI spreadsheets, data manipulation, API integrations, formula suggestions, collaborative sheets, data import, business reporting, Google Sheets alternative",
        logoUrl: gfav("rows.com"),
      },
      {
        name: "Akkio",
        pricing: "paid",
        bestFor: "no-code machine learning, predictive analytics, business intelligence, churn prediction, lead scoring, sales forecasting, classification model",
        logoUrl: gfav("akkio.com"),
      },
      {
        name: "Obviously AI",
        pricing: "paid",
        bestFor: "predictive analytics, no-code AI predictions, business predictions, classification, regression, customer churn, revenue forecasting",
        logoUrl: gfav("obviously.ai"),
      },
      {
        name: "Tableau AI",
        pricing: "paid",
        bestFor: "data visualization, business intelligence dashboards, interactive charts, enterprise analytics, SQL analysis, executive reporting, KPI dashboards",
        logoUrl: gfav("tableau.com"),
      },
    ],
  },
  marketing: {
    name: "Marketing",
    description: "Tools that grow, convert, and retain audiences.",
    subcategories: ["SEO", "Social", "Ad Creative", "Analytics", "Email"],
    tools: [
      {
        name: "Surfer SEO",
        pricing: "paid",
        bestFor: "SEO content optimization, keyword research, content editor, SERP analysis, on-page SEO, content brief, rank higher on Google, content score",
        logoUrl: gfav("surferseo.com"),
      },
      {
        name: "AdCreative.ai",
        pricing: "paid",
        bestFor: "ad image generation, display ads, banner ads, social media ad creatives, Facebook ads, A/B testing ad images, conversion optimized ads",
        logoUrl: gfav("adcreative.ai"),
      },
      {
        name: "Predis.ai",
        pricing: "freemium",
        bestFor: "social media posts, Instagram content, TikTok videos, post scheduling, competitor analysis, social media captions, content calendar, carousel posts",
        logoUrl: gfav("predis.ai"),
      },
      {
        name: "Klaviyo AI",
        pricing: "paid",
        bestFor: "email marketing automation, email campaigns, customer segmentation, abandoned cart emails, e-commerce email, personalized emails, SMS marketing",
        logoUrl: gfav("klaviyo.com"),
      },
      {
        name: "Semrush AI",
        pricing: "paid",
        bestFor: "SEO research, keyword tracking, competitor analysis, backlink audit, content marketing, domain analysis, search visibility, organic traffic growth",
        logoUrl: gfav("semrush.com"),
      },
    ],
  },
  support: {
    name: "Support",
    description: "Tools that handle, route, and resolve customer issues.",
    subcategories: ["Chatbots", "Ticket Routing", "Sentiment", "FAQ", "Live Chat"],
    tools: [
      {
        name: "Intercom AI",
        pricing: "paid",
        bestFor: "customer chat, live chat automation, customer support bot, onboarding, in-app messaging, product tours, support ticket deflection, customer success",
        logoUrl: gfav("intercom.com"),
      },
      {
        name: "Zendesk AI",
        pricing: "paid",
        bestFor: "support ticket routing, help desk, customer service automation, knowledge base, SLA management, omnichannel support, enterprise support, agent assist",
        logoUrl: gfav("zendesk.com"),
      },
      {
        name: "Freshdesk AI",
        pricing: "freemium",
        bestFor: "helpdesk software, ticket management, multichannel support, small business customer support, email ticketing, customer portal, automated replies",
        logoUrl: gfav("freshdesk.com"),
      },
      {
        name: "Tidio",
        pricing: "freemium",
        bestFor: "live chat widget, e-commerce support, website chatbot, Shopify customer service, visitor engagement, chatbot builder, small business chat",
        logoUrl: gfav("tidio.com"),
      },
      {
        name: "Forethought",
        pricing: "paid",
        bestFor: "AI ticket triage, support automation, intent detection, ticket classification, HEDS model, reduce support volume, agent deflection, smart routing",
        logoUrl: gfav("forethought.ai"),
      },
    ],
  },
} as const;

export type CategoryKey = keyof typeof categories;

export type CategoryData = (typeof categories)[CategoryKey];
