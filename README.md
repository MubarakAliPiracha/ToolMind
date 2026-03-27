# ToolMind

**Find the right AI tool for any job — instantly.**

ToolMind is a curated, searchable directory of 90+ AI tools across 10 categories. Instead of trawling through listicles or asking "which AI is best for X?", you describe what you want to do and ToolMind surfaces the tools that actually fit — ranked by how well they match your intent.

Live at →(https://tool-mind.vercel.app/)

---

## What it does

### AI-powered semantic search
Type something like *"write a product description for my Shopify store"* or *"debug my Python code"* and ToolMind uses **Gemini 2.0 Flash** to semantically rank tools against your actual task — not just keyword matching. If the AI is slow or unavailable, a fast client-side fallback kicks in instantly.

### Browse by category
10 hand-curated categories covering the AI landscape:

| Category | What's in it |
|---|---|
| ✍️ Writing | Copywriting, long-form, email, SEO, ad copy |
| 💻 Coding | IDEs, code gen, review, debugging, docs |
| 🎨 Image & Design | Image generation, design tools, editing |
| 🎬 Video | Video generation, editing, avatars |
| 🎵 Audio & Music | Voice cloning, music generation, podcast tools |
| 📊 Productivity | Task management, note-taking, automation |
| 🤖 AI Agents | Autonomous agents, browser agents, AI workflows |
| 🏢 Business | CRM, sales AI, customer support, HR tools |
| 📚 Research | Literature review, citation, data extraction |
| 🎓 Education | Tutoring, language learning, course creation |

### Tool detail pages
Every tool gets its own page with pricing tier, best-use cases, and a direct link to get started.

### Side-by-side comparison
Pick any two tools and compare them head-to-head — pricing, strengths, and what each one is best at.

### Shareable results
Search results and comparisons generate a URL you can copy and share.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| AI Search | Google Gemini 2.0 Flash |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |

---

## Running locally

**1. Clone and install**
```bash
git clone https://github.com/MubarakAliPiracha/ToolMind.git
cd ToolMind
npm install
```

**2. Set up environment variables**
```bash
cp .env.example .env.local
# Fill in your keys — see .env.example for instructions
```

You need:
- `GEMINI_API_KEY` — free at [aistudio.google.com](https://aistudio.google.com/apikey)
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your [Supabase project](https://supabase.com/dashboard)

**3. Start the dev server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage (hero, marquee, bento grid)
│   ├── tools/              # /tools — full directory with filters
│   ├── category/[slug]/    # /category/writing — category pages
│   ├── compare/            # /compare — side-by-side tool comparison
│   └── api/search/         # POST /api/search — Gemini semantic ranking
├── components/ui/          # All React components
│   ├── hero-section.tsx    # Search bar + category pills
│   ├── bento-section.tsx   # Animated category grid
│   ├── tool-card.tsx       # Individual tool card
│   └── nav.tsx             # Top navigation
└── lib/
    ├── data/categories.ts  # All 90 tools — single source of truth
    ├── task-match.ts       # Client-side fallback scoring
    └── supabase.ts         # Typed Supabase client
```

---

## Deploying to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Add environment variables: `GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full guide including Supabase setup and GitHub Actions CI/CD.

---

## Scripts

```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build + type check
npm run lint       # ESLint
npx tsc --noEmit   # Type check only
```

---

## License

MIT
