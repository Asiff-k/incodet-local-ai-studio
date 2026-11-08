# Incodet website: launch guide (GitHub + Vercel)

Code lives on GitHub, production runs on Vercel, data and login run on our own Supabase project.

## What this app is

- TanStack Start (SSR and server functions), built with Vite and Nitro. Not a static site, so no "rewrite everything to index.html".
- Nitro builds for **Cloudflare** by default. Vercel needs `NITRO_PRESET=vercel`.
- Database and login: Supabase project `incodet-website` (ref `wbgpeivoqaclxzlunmgk`, London region). Migrations `0000` to `0003` in `drizzle/migrations/` are applied.
- Server functions that use the service role key: booking (create booking, taken slots), contact form, client portal, admin.

## Step 1: local setup (developer)

1. `git clone https://github.com/Asiff-k/incodet-local-ai-studio.git`, then `bun install`.
2. `.env` holds the public Supabase values and is in git. Create `.env.local` (git-ignored) with `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL` (Session pooler connection string). Ask Asif for the values.
3. `bun run dev` and open http://localhost:8080.
4. Test the Vercel build locally: `NITRO_PRESET=vercel bun run build`. It should create `.vercel/output`.

## Step 2: GitHub workflow

1. The repository is `Asiff-k/incodet-local-ai-studio` on GitHub. Keep it private and add each developer as a collaborator.
2. Work on a branch. Run `bun run test` and `bun run build` before each commit.
3. Open a pull request into `main`. Merging to `main` deploys to production.

## Step 3: Supabase settings (Asif or Monir)

1. Auth settings:
   - Site URL `https://incodet.com`, redirect URLs `https://incodet.com/**`, the Vercel preview domain and `http://localhost:8080/**`
   - Enable email magic link
   - **Custom SMTP (Resend)**: Supabase's built-in email is limited to a few emails per hour, too low for portal logins
2. Storage: create a private bucket named `deliverables` (the client portal file policies expect it).
3. New schema changes: add a numbered file in `drizzle/migrations/` and apply it with `npx supabase db query --remote -f <file>`. Never edit an applied migration.

## Step 4: Vercel project (Monir, 20 min)

1. Vercel > Add New Project > import the GitHub repo. Framework preset: Other (Nitro handles output).
2. Install command `bun install`, build command `bun run build`.
3. Environment variables (Production + Preview):
   - `NITRO_PRESET=vercel` (switches the build target from Cloudflare to Vercel)
   - `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (same values, for the browser)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret, server only)
   - `RESEND_API_KEY` (after verifying incodet.com in Resend; booking and contact emails skip silently without it)

## Step 5: test on the Vercel URL before the domain switch

- Homepage, /book, /deck, /portal, /pricing, a case study, a service page, the 404
- Make one real booking, check it appears in Supabase, then delete it
- Send the contact form once
- Sign in at /portal with hello@incodet.com (magic link arrives), then open /admin
- Type DEMO on /portal and check the sample project opens

## Step 6: domain (Asif's registrar account)

1. Vercel > Project > Domains > add `incodet.com` and `www.incodet.com` (redirect www to root).
2. At the registrar: set the A / CNAME records Vercel shows. Remove old A/CNAME records for `@` and `www`. **Keep MX records** so hello@incodet.com email keeps working.
3. Wait for Vercel to show Valid and SSL issued.
4. Submit https://incodet.com/sitemap.xml in Google Search Console.

## Ongoing workflow

- Edit locally > push a branch > pull request > merge to `main` > Vercel redeploys automatically.
- Old site: keep its hosting 2 weeks as fallback, then cancel. Make sure the old public /dashboard ("letmein" password) is gone.

## Known risks

- If `NITRO_PRESET=vercel` is missing in Vercel, the build targets Cloudflare and the deploy fails.
- Preview deployments use the same Supabase project as production unless a separate project is set up. Test data shows in both.
