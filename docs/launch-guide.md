# Incodet website: launch guide for Monir (Vercel)

Decision (8 Nov 2026): Asif hosts on Vercel. Lovable stays the editor and staging preview.
Lovable project: https://lovable.dev/projects/ac30251d-e1bb-44e4-935d-7f7b5392f597

## Pre-launch test results (7 Nov)
- 48 pages tested at 375px: no horizontal scroll, one H1 each
- Homepage first load 1.62 MB, ready in about 0.9 s, no console errors
- /deck: 23 slides, navigation, share links and PDF print work

## What this app is
- TanStack Start (SSR + server functions), built with Vite + Nitro. Not a static site, so no "rewrite everything to index.html".
- Lovable's build config defaults Nitro to the **Cloudflare** target. Vercel needs the **vercel** target.
- Database and login: Supabase. Right now it is Lovable Cloud's Supabase (project zgbvufcjlwyeqrfzvfti). Server code needs `SUPABASE_SERVICE_ROLE_KEY`, which Lovable Cloud does not hand out. So production needs **our own Supabase project**.
- Server functions using the service role key: booking (create booking, taken slots), contact form, client portal, admin.

## Step 1: GitHub (Asif, 5 min)
1. Lovable editor > GitHub > Connect > Incodet GitHub account/org > create a **private** repo.
2. Add Monir as a collaborator.
3. Lovable keeps pushing every change to `main`. Do not commit to `main` from outside Lovable, or the two conflict.

## Step 2: own Supabase project (Monir, 30 min)
1. supabase.com > New project (region close to users, e.g. Sydney or London). Free tier is enough to start.
2. SQL editor: run the files in `drizzle/migrations/` **in order** (0000, 0001, 0002, 0003). Then check tables, RLS policies and the unique booking slot index exist.
3. Auth settings:
   - Site URL `https://incodet.com`, redirect URLs `https://incodet.com/**` and the Vercel preview domain
   - Enable email magic link
   - **Custom SMTP (Resend)**: Supabase's built-in email is rate-limited to a few emails per hour, too low for portal logins
4. Copy: Project URL, publishable (anon) key, secret (service role) key, project ref.
5. There is no real data in Lovable Cloud yet (no real clients or bookings), so nothing needs migrating. Do this before launch, not after.

## Step 3: Vercel project (Monir, 20 min)
1. Vercel > Add New Project > import the GitHub repo. Framework preset: Other (Nitro handles output).
2. Install command `bun install` (repo uses bun.lock), build command `bun run build`.
3. Environment variables (Production + Preview):
   - `NITRO_PRESET=vercel` (switches the build target from Cloudflare to Vercel)
   - `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_PROJECT_ID`
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` (same values, for the browser)
   - `SUPABASE_SERVICE_ROLE_KEY` (secret, server only)
   - `RESEND_API_KEY` (after verifying incodet.com in Resend; booking and contact emails skip silently without it)
4. Test the build locally first: `NITRO_PRESET=vercel bun run build`. It should create `.vercel/output`. If the Lovable config ignores `NITRO_PRESET`, ask Asif to send Lovable: "Let the Nitro preset be set by the NITRO_PRESET env var, keep cloudflare as the default."
5. Important: the repo's `.env` holds the **Lovable Cloud** values. Vercel env vars must override them. Check the deployed site talks to our Supabase (Supabase dashboard > logs).

## Step 4: test on the Vercel URL before the domain switch
- Homepage, /book, /deck, /portal, /pricing, a case study, a service page, the 404
- Make one real booking, check it appears in Supabase, then delete it
- Send the contact form once
- Sign in at /portal with hello@incodet.com (magic link arrives), then make that user admin in Supabase and open /admin
- Type DEMO on /portal and check the sample project opens

## Step 5: domain (Asif's registrar account)
1. Vercel > Project > Domains > add `incodet.com` and `www.incodet.com` (redirect www to root).
2. At the registrar: set the A / CNAME records Vercel shows. Remove old A/CNAME records for `@` and `www`. **Keep MX records** so hello@incodet.com email keeps working.
3. Wait for Vercel to show Valid and SSL issued.
4. Submit https://incodet.com/sitemap.xml in Google Search Console.

## Ongoing workflow
- Asif edits in Lovable > Lovable pushes to GitHub > Vercel redeploys automatically.
- **Database changes**: when Lovable adds a new file in `drizzle/migrations/`, Monir must run it on our Supabase too. Lovable only updates its own Cloud database.
- Old site: keep its hosting 2 weeks as fallback, then cancel. Make sure the old public /dashboard ("letmein" password) is gone.

## Known risks
- If the Nitro preset switch does not work, one small Lovable prompt fixes it (about 1 to 3 credits).
- Lovable preview keeps using Lovable Cloud data, production uses our Supabase. Test data in one does not show in the other.
