# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Single source of truth for AI agents and contributors. Read this before touching any code.

---

## Tech Stack

| Layer         | Technology                     | Details                                       |
| ------------- | ------------------------------ | --------------------------------------------- |
| Framework     | **Next.js 16** (App Router)    | `src/app/` directory — check `node_modules/next/dist/docs/` for API details |
| Language      | **TypeScript 5** (strict)      | `@/*` path alias → `./src/*`                  |
| React         | **React 19**                   | Server Components by default                  |
| Styling       | **Tailwind CSS v4**            | `@import "tailwindcss"` — `@theme inline` syntax, no `tailwind.config.ts` |
| Class Merging | `clsx` + `tailwind-merge`      | Via `cn()` in `src/lib/utils.ts`              |
| Database      | **Supabase** (PostgreSQL)      | Typed client in `src/lib/supabase.ts`         |
| Animations    | **Framer Motion**              | Used throughout; `motion.div`, `motion.span`, `motion.nav` |
| 3D            | `@splinetool/react-spline`     | Lazy-loaded via `src/components/ui/splite.tsx` |
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

**Currently static, not Supabase.** All category and tool data lives in `src/lib/data/categories.ts` as a typed `as const` object. The Supabase schema/migrations exist (`supabase/migrations/`) and `src/types/supabase.ts` has the types, but pages currently read from the static data file.

- `CategoryKey` = union of valid slug strings (derived from the `categories` object keys)
- `CategoryData` = type of a single category entry
- Valid slugs: `writing`, `coding`, `image`, `video`, `audio`, `research`, `productivity`, `data`, `marketing`, `support`

### Pages → Components Pattern

Category pages use a **server + client split**:
- `app/category/[slug]/page.tsx` — server component, awaits `params`, validates slug, redirects to `/tools` on miss, passes typed data to client
- `src/components/ui/category-page-client.tsx` — client component with `useState` for subcategory filter pills

Tool detail pages (`app/tools/[slug]/page.tsx`) follow the same async params pattern.

### Navigation

`<Nav />` lives in `app/layout.tsx` and renders on every page. It is a dark glass pill fixed at the top — **do not add it to individual pages**.

### Dual-Theme Layout

The app uses two visual contexts:
- **Dark hero** (`bg-[#030712]`) — `HeroSection` and `ContainerScroll` sections on the home page use a dark background with white text. `FloatingPaths` requires a `.dark` ancestor class to show white paths.
- **Light body** (`bg-[#fafaf9]`) — all other pages and the bento section use the light theme.

Do not invert this. Keep hero dark, everything else light.

---

## Design System

### Fonts (all loaded in `app/layout.tsx`)

| CSS Variable          | Font            | Use                              |
| --------------------- | --------------- | -------------------------------- |
| `--font-geist-sans`   | Geist Sans      | `font-sans`, body copy           |
| `--font-geist-mono`   | Geist Mono      | `font-mono`, labels, badges      |
| `--font-epilogue`     | Epilogue        | `font-headline`, headings        |
| `--font-space-grotesk`| Space Grotesk   | `font-label`, UI labels, pills   |

`geistSans` and `geistMono` are imported from `src/lib/fonts.ts`. Epilogue and Space Grotesk are defined locally in `layout.tsx` with explicit weights — add weights there if new ones are needed.

### Color Tokens (`globals.css` `:root`)

| CSS Var                      | Value     | Usage                        |
| ---------------------------- | --------- | ---------------------------- |
| `--background`               | `#fafaf9` | Page background              |
| `--foreground`               | `#0f0f0e` | Body text                    |
| `--border`                   | `#e5e5e5` | Card borders                 |
| `--muted`                    | `#6b6b6b` | Secondary text               |
| `--color-on-surface`         | `#1a1c1c` | Primary text (used in-page)  |
| `--color-on-surface-variant` | `#474747` | Secondary paragraph text     |
| `--color-surface-container-low` | `#f3f4f3` | Section backgrounds        |

The `@theme inline` block in `globals.css` maps these to Tailwind utility classes (e.g. `bg-background`, `text-foreground`).

### Pricing Tier Accents

`ToolCard` applies accent gradients/borders by pricing tier:
- **Free / Open Source** → emerald (`from-emerald-500/20`)
- **Freemium** → blue (`from-blue-500/20`)
- **Paid** → violet (`from-violet-500/20`)

This same mapping is used in `pricing-badge.tsx` and `container-scroll.tsx`.

### Legacy CSS

`globals.css` contains a large block of legacy `.pill-nav`, `.hero-*`, `.tools-grid`, etc. classes. These are **not in active use** but kept for reference — do not add new legacy classes; use Tailwind utilities instead.

---

## Key Components

| Component | Path | Notes |
|-----------|------|-------|
| `Nav` | `components/ui/nav.tsx` | Fixed dark pill nav, Framer fade-down |
| `HeroSection` | `components/ui/hero-section.tsx` | Dark bg, FloatingPaths, Spline 3D (grayscale), letter-by-letter headline |
| `ContainerScroll` | `components/ui/container-scroll.tsx` | Perspective scroll animation, dark mock dashboard |
| `ToolCard` | `components/ui/tool-card.tsx` | Accent strip, logo circle, pricing badge, hover "View →" |
| `PricingBadge` | `components/ui/pricing-badge.tsx` | `free` / `freemium` / `paid` tiers |
| `CategoryPill` | `components/ui/category-pill.tsx` | Monospace, outlined / active states |
| `SearchBar` | `components/ui/search-bar.tsx` | Spring animation on focus, `onSearch` callback |
| `FloatingPaths` | `components/ui/background-paths.tsx` | 36 animated SVG paths — exported for reuse |
| `SplineScene` | `components/ui/splite.tsx` | Lazy-loads Spline scene via `@splinetool/react-spline` |
| `Footer` | `components/ui/footer.tsx` | Shared footer, imported in `page.tsx` |
| `Button` | `components/ui/button.tsx` | shadcn-style, `cva` + `@radix-ui/react-slot` |

---

## Tailwind v4 — Critical Rules

- **No `tailwind.config.ts`** — all theme tokens live in `globals.css` under `@theme inline { }`
- Import syntax is `@import "tailwindcss"` — not `@tailwind base/components/utilities`
- To add a new design token: add a CSS var to `:root`, then map it in the `@theme inline` block
- Arbitrary values like `bg-[#030712]` are fine for one-offs; add to theme only if reused

---

## TypeScript Rules

- Strict mode is on — no `any`, no implicit returns, explicit return types on exported functions
- `interface` for object shapes; `type` for unions/primitives
- No enums — use union literal types
- `unknown` + type narrowing instead of `any`
- No barrel files — import directly from source files

---

## Next.js Rules

- `params` in dynamic routes is `Promise<{ slug: string }>` — always `await params` in async server components
- Server Components by default — add `'use client'` only when using hooks or browser APIs
- Named exports for all components; default export only for `page.tsx` / `layout.tsx`
- Use `next/image` for images, `next/link` for navigation

---

## Supabase

- Typed client: `import { supabase } from '@/lib/supabase'`
- Types: `src/types/supabase.ts` — `Category`, `Tool`, `ToolWithCategory`, `Database`
- New tables: add migrations to `supabase/migrations/` with sequential prefix, mirror types in `supabase.ts`
- RLS enabled; public read-only policies on both tables

---

## Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Agent Behavior

- Execute immediately — never ask for permission or pause to confirm
- If ambiguous, make the best decision and proceed
- Only stop at a genuine blocker (missing env var, missing dependency, etc.)
- When done, show what was built — don't ask if it looks good
- Path alias: `@/` maps to `src/`
- Dark theme is the default for hero sections — test all dark-bg components on `#030712`
- Keep types in sync — update `src/types/supabase.ts` when changing the database schema
