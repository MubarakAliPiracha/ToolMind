# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Single source of truth for AI agents and contributors. Read this before touching any code.

---

## Agent Behavior

- **Execute immediately — never ask for permission or pause to confirm**
- If ambiguous, make the best decision and proceed
- Only stop at a genuine blocker (missing env var, missing dependency, compile error)
- When done, show what was built — don't ask if it looks good
- Commit and push without asking when making changes
- Path alias: `@/` maps to `src/`

---

## Tech Stack

| Layer         | Technology                     | Details                                       |
| ------------- | ------------------------------ | --------------------------------------------- |
| Framework     | **Next.js 16** (App Router)    | `src/app/` directory                          |
| Language      | **TypeScript 5** (strict)      | `@/*` path alias → `./src/*`                  |
| React         | **React 19**                   | Server Components by default                  |
| Styling       | **Tailwind CSS v4**            | `@import "tailwindcss"` — `@theme inline` syntax, no `tailwind.config.ts` |
| Class Merging | `clsx` + `tailwind-merge`      | Via `cn()` in `src/lib/utils.ts`              |
| Database      | **Supabase** (PostgreSQL)      | Typed client in `src/lib/supabase.ts`         |
| Animations    | **Framer Motion**              | Used throughout; `motion.div`, `motion.span`  |
| AI Search     | **Gemini 2.0 Flash**           | `/api/search` route, key in `GEMINI_API_KEY`  |
| Package Mgr   | npm                            | Do NOT use yarn or pnpm                       |

---

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build + type check
npm run lint     # Run ESLint
npx tsc --noEmit # Type check without emitting
```

---

## Architecture

### Data Layer

**Currently static.** All tool data lives in `src/lib/data/categories.ts` — 90 tools across 10 categories. Supabase schema exists but pages read from the static file.

### Search

- `/api/search` — POST route, calls Gemini 2.0 Flash to semantically rank tools for a query
- `src/lib/task-match.ts` — client-side fallback scoring (QUERY_EXPANSIONS, bigram matching)
- Tools page uses API results when available, falls back to client-side instantly

### Pages → Components Pattern

- `app/category/[slug]/page.tsx` — server component
- `src/components/ui/category-page-client.tsx` — client component with filter pills

### Navigation

`<Nav />` lives in `app/layout.tsx` — do not add it to individual pages.

### Dual-Theme Layout

- **Dark hero** (`bg-[#030712]`) — HeroSection uses dark bg with white text
- **Light body** (`bg-[#fafaf9]`) — all other pages use light theme

---

## Design System

### Fonts

| CSS Variable          | Font            | Use                              |
| --------------------- | --------------- | -------------------------------- |
| `--font-geist-sans`   | Geist Sans      | `font-sans`, body copy           |
| `--font-geist-mono`   | Geist Mono      | `font-mono`, labels, badges      |
| `--font-epilogue`     | Epilogue        | `font-headline`, headings        |
| `--font-space-grotesk`| Space Grotesk   | `font-label`, UI labels, pills   |

### Pricing Tier Accents

- **Free / Open Source** → emerald
- **Freemium** → blue
- **Paid** → violet

---

## TypeScript Rules

- Strict mode — no `any`, explicit return types on exported functions
- `interface` for object shapes; `type` for unions/primitives
- No enums — use union literal types
- No barrel files — import directly from source files

---

## Next.js Rules

- `params` in dynamic routes is `Promise<{ slug: string }>` — always `await params`
- Server Components by default — add `'use client'` only when using hooks or browser APIs
- Named exports for all components; default export only for `page.tsx` / `layout.tsx`

---

## Environment Variables

```bash
GEMINI_API_KEY=          # Google AI Studio — free tier
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
