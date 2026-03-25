-- ============================================================
-- Migration 003: Seed categories and tools
-- ============================================================

-- ─── Categories ──────────────────────────────────────────────

INSERT INTO categories (id, name, slug, description, icon) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'AI Writing',          'ai-writing',          'AI-powered writing assistants for content creation, copywriting, and editing.',       '✍️'),
  ('a1000000-0000-0000-0000-000000000002', 'AI Image Generation', 'ai-image-generation', 'Generate stunning visuals, illustrations, and artwork with AI.',                      '🎨'),
  ('a1000000-0000-0000-0000-000000000003', 'AI Video',            'ai-video',            'Create, edit, and enhance videos using artificial intelligence.',                     '🎬'),
  ('a1000000-0000-0000-0000-000000000004', 'AI Coding',           'ai-coding',           'Code assistants, auto-completion, and developer productivity tools.',                 '💻'),
  ('a1000000-0000-0000-0000-000000000005', 'AI Productivity',     'ai-productivity',     'Boost your workflow with AI-driven notes, search, presentations, and transcription.', '⚡');

-- ─── AI Writing Tools ────────────────────────────────────────

INSERT INTO tools (name, slug, description, long_description, url, image_url, category_id, pricing, is_featured, tags) VALUES
(
  'ChatGPT',
  'chatgpt',
  'Conversational AI assistant by OpenAI for writing, brainstorming, and research.',
  'ChatGPT is a large language model developed by OpenAI that excels at drafting articles, summarising documents, brainstorming ideas, and answering complex questions in natural language. It supports plugins, file uploads, and image generation through DALL·E integration.',
  'https://chat.openai.com',
  'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  'a1000000-0000-0000-0000-000000000001',
  'Freemium',
  true,
  ARRAY['chatbot', 'writing', 'research', 'brainstorming', 'openai']
),
(
  'Jasper',
  'jasper',
  'AI marketing co-pilot for creating on-brand content at scale.',
  'Jasper helps marketing teams produce blog posts, social media captions, ad copy, and email campaigns that match your brand voice. It offers templates, a brand knowledge base, and team collaboration features.',
  'https://www.jasper.ai',
  'https://www.jasper.ai/images/jasper-logo.svg',
  'a1000000-0000-0000-0000-000000000001',
  'Paid',
  false,
  ARRAY['marketing', 'copywriting', 'brand-voice', 'content']
),
(
  'Copy.ai',
  'copy-ai',
  'AI-powered copywriter for sales and marketing teams.',
  'Copy.ai generates high-converting sales copy, product descriptions, blog outlines, and social posts in seconds. Its workflow automation lets you chain multiple AI steps into repeatable content pipelines.',
  'https://www.copy.ai',
  'https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/62828f0e8f062e20f1a0b05b_logo-dark.svg',
  'a1000000-0000-0000-0000-000000000001',
  'Freemium',
  false,
  ARRAY['copywriting', 'sales', 'automation', 'marketing']
),
(
  'Writesonic',
  'writesonic',
  'AI writer for SEO-optimised articles, ads, and landing pages.',
  'Writesonic combines GPT-4 with real-time web search to produce factual, SEO-friendly long-form articles, Google and Facebook ads, and landing page copy. It includes Chatsonic, an AI chatbot with current knowledge.',
  'https://writesonic.com',
  'https://writesonic.com/logo.svg',
  'a1000000-0000-0000-0000-000000000001',
  'Freemium',
  false,
  ARRAY['seo', 'articles', 'ads', 'landing-pages']
),

-- ─── AI Image Generation Tools ──────────────────────────────

(
  'Midjourney',
  'midjourney',
  'Premier AI art generator known for stunning, stylised imagery.',
  'Midjourney creates breathtaking digital artwork from text prompts via its Discord-based interface. It excels at photorealistic renders, concept art, and fantastical illustrations with fine-grained style control.',
  'https://www.midjourney.com',
  'https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png',
  'a1000000-0000-0000-0000-000000000002',
  'Paid',
  true,
  ARRAY['art', 'image-generation', 'design', 'creative']
),
(
  'DALL·E 3',
  'dall-e-3',
  'OpenAI''s latest image generator with precise prompt understanding.',
  'DALL·E 3 is integrated into ChatGPT and the OpenAI API, generating high-quality images with excellent prompt adherence. It understands nuance, spatial relationships, and text rendering better than its predecessors.',
  'https://openai.com/dall-e-3',
  'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
  'a1000000-0000-0000-0000-000000000002',
  'Freemium',
  false,
  ARRAY['image-generation', 'openai', 'creative', 'api']
),
(
  'Stable Diffusion',
  'stable-diffusion',
  'Open-source image generation model you can run locally.',
  'Stable Diffusion by Stability AI is an open-source latent diffusion model that generates images from text prompts. It can be self-hosted, fine-tuned on custom datasets, and extended with ControlNet and LoRA adapters.',
  'https://stability.ai',
  'https://stability.ai/images/logo.svg',
  'a1000000-0000-0000-0000-000000000002',
  'Open Source',
  false,
  ARRAY['open-source', 'self-hosted', 'image-generation', 'customisable']
),
(
  'Leonardo AI',
  'leonardo-ai',
  'AI image platform for game assets, concept art, and design.',
  'Leonardo AI offers fine-tuned image generation models optimised for game assets, character design, and concept art. It provides model training, canvas editing, and texture generation with a generous free tier.',
  'https://leonardo.ai',
  'https://leonardo.ai/img/logo.svg',
  'a1000000-0000-0000-0000-000000000002',
  'Freemium',
  false,
  ARRAY['game-assets', 'concept-art', 'design', 'image-generation']
),

-- ─── AI Video Tools ──────────────────────────────────────────

(
  'Runway ML',
  'runway-ml',
  'Next-generation AI video creation and editing suite.',
  'Runway ML offers Gen-2 video generation from text and images, plus AI-powered green screen removal, motion tracking, inpainting, and super-resolution. It''s a full creative suite for filmmakers and content creators.',
  'https://runwayml.com',
  'https://runwayml.com/images/logo.svg',
  'a1000000-0000-0000-0000-000000000003',
  'Freemium',
  true,
  ARRAY['video-generation', 'editing', 'vfx', 'creative']
),
(
  'Synthesia',
  'synthesia',
  'Create AI avatar videos from text scripts — no camera needed.',
  'Synthesia generates professional talking-head videos with realistic AI avatars in 130+ languages. It''s used for corporate training, onboarding, product demos, and internal communications.',
  'https://www.synthesia.io',
  'https://www.synthesia.io/logo.svg',
  'a1000000-0000-0000-0000-000000000003',
  'Paid',
  false,
  ARRAY['avatars', 'training', 'enterprise', 'video-generation']
),
(
  'Pika',
  'pika',
  'AI-powered video generation and editing from text or images.',
  'Pika lets you generate and edit videos using simple text prompts or reference images. It supports scene modification, object addition/removal, and style transfer with an intuitive web interface.',
  'https://pika.art',
  'https://pika.art/logo.svg',
  'a1000000-0000-0000-0000-000000000003',
  'Freemium',
  false,
  ARRAY['video-generation', 'editing', 'creative', 'text-to-video']
),
(
  'HeyGen',
  'heygen',
  'AI video platform for personalised spokesperson videos at scale.',
  'HeyGen creates professional videos using customisable AI avatars and voice cloning. It supports batch personalisation, making it ideal for sales outreach, marketing campaigns, and multilingual content.',
  'https://www.heygen.com',
  'https://www.heygen.com/logo.svg',
  'a1000000-0000-0000-0000-000000000003',
  'Freemium',
  false,
  ARRAY['avatars', 'personalisation', 'sales', 'video-generation']
),

-- ─── AI Coding Tools ─────────────────────────────────────────

(
  'GitHub Copilot',
  'github-copilot',
  'AI pair programmer that suggests code completions in your editor.',
  'GitHub Copilot uses OpenAI Codex to provide real-time code suggestions, function completions, and documentation generation directly inside VS Code, JetBrains, and Neovim. It supports dozens of languages and frameworks.',
  'https://github.com/features/copilot',
  'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
  'a1000000-0000-0000-0000-000000000004',
  'Paid',
  true,
  ARRAY['code-completion', 'ide', 'developer-tools', 'github']
),
(
  'Cursor',
  'cursor',
  'AI-first code editor built for pair programming with AI.',
  'Cursor is a fork of VS Code with deep AI integration. It offers inline code generation, multi-file editing, codebase-aware chat, and natural language commands for refactoring — all powered by frontier models.',
  'https://cursor.com',
  'https://cursor.com/logo.svg',
  'a1000000-0000-0000-0000-000000000004',
  'Freemium',
  true,
  ARRAY['code-editor', 'ide', 'ai-assistant', 'developer-tools']
),
(
  'Tabnine',
  'tabnine',
  'AI code assistant with a focus on privacy and enterprise security.',
  'Tabnine provides AI-powered code completions that can run entirely on-premises or in a private cloud. It supports 30+ languages and integrates with all major IDEs, making it ideal for security-conscious teams.',
  'https://www.tabnine.com',
  'https://www.tabnine.com/logo.svg',
  'a1000000-0000-0000-0000-000000000004',
  'Freemium',
  false,
  ARRAY['code-completion', 'privacy', 'enterprise', 'on-premises']
),
(
  'Codeium',
  'codeium',
  'Free AI code completion and chat for 70+ languages.',
  'Codeium offers fast, context-aware code completions, an in-editor AI chat, and intelligent search across your codebase. The individual tier is free with no usage limits, supporting 40+ editor integrations.',
  'https://codeium.com',
  'https://codeium.com/logo.svg',
  'a1000000-0000-0000-0000-000000000004',
  'Free',
  false,
  ARRAY['code-completion', 'free', 'multi-language', 'developer-tools']
),

-- ─── AI Productivity Tools ───────────────────────────────────

(
  'Notion AI',
  'notion-ai',
  'AI assistant built into Notion for writing, summarising, and organising.',
  'Notion AI enhances the Notion workspace with AI-powered writing, summarisation, translation, and action item extraction. It works across pages, databases, and projects without leaving the app.',
  'https://www.notion.so/product/ai',
  'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  'a1000000-0000-0000-0000-000000000005',
  'Paid',
  false,
  ARRAY['notes', 'workspace', 'summarisation', 'organisation']
),
(
  'Otter.ai',
  'otter-ai',
  'AI meeting assistant that transcribes, summarises, and captures action items.',
  'Otter.ai joins your meetings on Zoom, Google Meet, and Teams to provide real-time transcription, automated summaries, and action item extraction. It integrates with Salesforce, HubSpot, and Slack.',
  'https://otter.ai',
  'https://otter.ai/logo.svg',
  'a1000000-0000-0000-0000-000000000005',
  'Freemium',
  false,
  ARRAY['transcription', 'meetings', 'notes', 'collaboration']
),
(
  'Gamma',
  'gamma',
  'AI-powered presentation and document builder.',
  'Gamma generates polished presentations, documents, and web pages from a brief text prompt. It offers beautiful templates, nested cards, analytics, and one-click restyling — replacing traditional slide tools.',
  'https://gamma.app',
  'https://gamma.app/logo.svg',
  'a1000000-0000-0000-0000-000000000005',
  'Freemium',
  true,
  ARRAY['presentations', 'documents', 'design', 'no-code']
),
(
  'Perplexity',
  'perplexity',
  'AI-powered answer engine with real-time web search and citations.',
  'Perplexity combines large language models with live web search to deliver concise, cited answers to any question. It supports follow-up queries, collection sharing, and a Pro mode with access to multiple models.',
  'https://www.perplexity.ai',
  'https://www.perplexity.ai/logo.svg',
  'a1000000-0000-0000-0000-000000000005',
  'Freemium',
  true,
  ARRAY['search', 'research', 'citations', 'answer-engine']
);
