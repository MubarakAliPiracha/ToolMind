# ToolMind — production (Vercel + Supabase)

The app is static data–first today; Supabase is wired for when you move off `src/lib/data/categories.ts`.

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com/dashboard).
2. **SQL**: In the SQL Editor, run migrations in order:
   - `supabase/migrations/001_create_categories.sql`
   - `supabase/migrations/002_create_tools.sql`
   - `supabase/migrations/003_seed_data.sql`
3. **API keys**: Project Settings → API → copy **Project URL** and **anon public** key.

## 2. Vercel

1. Push this repo to GitHub ([github.com/MubarakAliPiracha](https://github.com/MubarakAliPiracha)).
2. [Vercel](https://vercel.com/new) → **Add New Project** → import the ToolMind repository.
3. Framework: **Next.js** (auto-detected). **Root directory**: repo root.
4. **Environment variables** (Production + Preview):

   | Name | Value |
   |------|--------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://<project-ref>.supabase.co` |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key from Supabase |

5. Deploy. Every push to the production branch redeploys.

Local reference: copy `.env.example` → `.env.local` and fill values.

## 3. Optional: GitHub Actions deploy

If you prefer CI instead of Vercel’s Git integration, add secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (see `.github/workflows/vercel-deploy.yml`).
