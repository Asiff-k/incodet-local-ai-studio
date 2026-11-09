# Handover: incodet.com

For Monir. Last updated 9 Nov 2026. Read `CLAUDE.md` first for the site rules, then this file.
Launch steps in more detail: `docs/launch-guide.md`. Temporary content: `docs/temp-images.md`.
Latest round of work, item by item: `docs/progress.md`.

## 1. Where things stand

- All work so far is merged into `main` on GitHub (`Asiff-k/incodet-local-ai-studio`). The `improvements` branch is
  kept for further work; branch from `main` or `improvements` and open a pull request into `main`.
- The project no longer uses Lovable. It is a normal TanStack Start + Vite app developed locally with bun.
- Database and login run on our own Supabase project (London). Emails go through Resend.
- Not deployed yet. Vercel is the target. `incodet.com` still points at the old site.

## 2. What changed

| Area                  | What changed                                                                                                                                                                                                                                                                                                                                                                                      | Commits                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Setup                 | Moved off Lovable: plain `vite.config.ts` (same build output), Lovable packages, code and `.lovable/` removed, LF line endings via `.gitattributes`, README and launch guide rewritten                                                                                                                                                                                                            | `76bbd39`, `fe2e138`, `7935b40`            |
| Supabase              | Switched to our own project `wbgpeivoqaclxzlunmgk`. Migrations `0000` to `0004` applied (0004 creates the private `deliverables` storage bucket)                                                                                                                                                                                                                                                  | `461b619`, `9efd194`                       |
| Formatting            | Whole codebase formatted with Prettier (formatting only)                                                                                                                                                                                                                                                                                                                                          | `9e50961`                                  |
| Cleanup               | `/styleguide` is dev only (404 in production), social icons only when a URL is set, BRHEX "View Live Demo", "Who owns the website?" FAQ shown, unused images removed                                                                                                                                                                                                                              | `fff198a`                                  |
| Forms                 | Booking and contact log real errors; an email failure never blocks a saved message; contact emails sent from `Incodet <noreply@incodet.com>`; `validator()` instead of the deprecated `inputValidator()`                                                                                                                                                                                          | `baf4185`, `d8cf789`, `345f1d8`, `e04e8a0` |
| Visual fixes          | Smoother homepage scroll cards (right-sized images, no animated blur), no blur on carousel cards, "Who we are" pills never cover text, faster reveal, "Company Deck" button in the footer                                                                                                                                                                                                         | `1aa13d3`                                  |
| Temporary images      | 19 "Image coming soon" slots filled with self-hosted temporary images (listed in `docs/temp-images.md`)                                                                                                                                                                                                                                                                                           | `a90f43e`                                  |
| Scroll bug + features | Fixed "How it works" pinning in the middle of "What we build" (ScrollTrigger now refreshes when the page height changes). Reviews carousel (sample cards on the dev server only). CEO contact card in the footer                                                                                                                                                                                  | `e6d524d`                                  |
| Time zone picker      | `/book` has a searchable picker covering every IANA zone, grouped Continent > Country > City with live GMT offsets. Search by city, country, code or alias (UK, USA, UAE, India...). "Your time zone" and 8 quick picks at the top. Full-screen sheet on phones. The chosen slot is kept when the zone changes. Data: `src/content/timezones.ts`, generated by `node scripts/timezones/build.mjs` | `40a0028`                                  |
| Responsive pass       | Every page checked at 320 to 1920px and 844x390 (637 checks): no horizontal scroll, overlaps, small body text or console errors. 44px touch targets on touch screens, iOS safe areas, reduced motion respected, pinned sections only when the screen is at least 768px wide and 600px tall (`PIN_QUERY` in `src/hooks/use-motion.ts`), sharper images via correct `sizes`                         | `40a0028`                                  |

## 3. Local setup

```sh
git clone https://github.com/Asiff-k/incodet-local-ai-studio.git
cd incodet-local-ai-studio
bun install
bun run dev        # http://localhost:8080
```

Requirements: bun and Node.js 20.19+ or 22.12+. Before every commit: `bun run lint`, `bun run test`, `bun run build`.

## 4. Environment variables (names only)

Ask Asif for the values. Never commit secrets: they go in `.env.local` (git-ignored) and in Vercel.

| Name                            | Used by                                    | Secret  | Local file   | Vercel                     |
| ------------------------------- | ------------------------------------------ | ------- | ------------ | -------------------------- |
| `VITE_SUPABASE_URL`             | Browser                                    | No      | `.env`       | Yes                        |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser                                    | No      | `.env`       | Yes                        |
| `VITE_SUPABASE_PROJECT_ID`      | Not read by code (kept for reference)      | No      | `.env`       | Optional                   |
| `SUPABASE_URL`                  | Server                                     | No      | `.env`       | Yes                        |
| `SUPABASE_PUBLISHABLE_KEY`      | Server (booking availability)              | No      | `.env`       | Yes                        |
| `SUPABASE_PROJECT_ID`           | Not read by code                           | No      | `.env`       | Optional                   |
| `SUPABASE_SERVICE_ROLE_KEY`     | Server (bookings, contact, portal, admin)  | **Yes** | `.env.local` | Yes (Production + Preview) |
| `RESEND_API_KEY`                | Server (booking and contact emails)        | **Yes** | `.env.local` | Yes                        |
| `DATABASE_URL`                  | `drizzle-kit` only (Session pooler string) | **Yes** | `.env.local` | No                         |
| `NITRO_PRESET`                  | Build target, value `vercel`               | No      | Not needed   | **Yes**                    |

Notes:

- `SUPABASE_SERVICE_ROLE_KEY` is the `sb_secret_...` key. The Supabase CLI hides secret keys unless you add
  `--reveal` (`npx supabase projects api-keys --reveal`). A masked key causes "Invalid API key" and every booking fails.
- Without `RESEND_API_KEY`, bookings and messages still save; only the emails are skipped.

## 5. Supabase

- Project: `incodet-website`, ref `wbgpeivoqaclxzlunmgk`, region London (eu-west-2). Owned by Asif's Supabase account.
- Schema: `drizzle/migrations/0000` to `0004`, all applied. New changes: add the next numbered SQL file, then
  `npx supabase db query --remote -f drizzle/migrations/<file>.sql` (after `npx supabase login` and
  `npx supabase link --project-ref wbgpeivoqaclxzlunmgk`). Never edit an applied migration.
- Storage: private bucket `deliverables` (files at `<project_id>/<file>`; admins full access, clients read their own projects only).
- Admin access: Asif's email is in `public.admin_allowlist` (added by a one-off SQL run, deliberately not in git).
  The admin role is granted on first sign-in at `/portal`.
- Auth: email magic link. Custom SMTP is set to Resend (`smtp.resend.com`, sender `noreply@incodet.com`).
- Auth URL configuration (check before launch): Site URL `https://incodet.com`; redirect URLs
  `https://incodet.com/**`, the Vercel preview domain and `http://localhost:8080/**`.
- Preview and production deploys share this one project, so test bookings show in both. Delete test rows after testing.
- The old Lovable Cloud project (`zgbvufcjlwyeqrfzvfti`) is not in our account. It had no real data (0 active
  bookings), so nothing was migrated.

## 6. Resend

- Domain `incodet.com` verified (region Ireland). Its DNS records (DKIM, SPF and the `send` MX/TXT records) live at
  the registrar and **must stay** when the domain moves to Vercel, or all emails stop.
- Emails: booking sends one to `hello@incodet.com` (reply-to the visitor) and a confirmation to the visitor
  (reply-to `hello@incodet.com`); the contact form sends one to `hello@incodet.com` (reply-to the visitor).
  All from `Incodet <noreply@incodet.com>`. Portal magic links also go through Resend (Supabase custom SMTP).
- The API key is send-only, so delivery logs are only visible in the Resend dashboard (Emails).
- For tests, use `delivered@resend.dev` as the visitor email so no real person is emailed.

## 7. Vercel

1. Add New Project, import the GitHub repo. Framework preset: Other (Nitro writes the output).
2. Install command `bun install`, build command `bun run build`. Production branch: `main`.
3. Environment variables: everything marked Vercel "Yes" in section 4, for Production and Preview,
   including `NITRO_PRESET=vercel`. Without it the build targets Cloudflare and the deploy fails.
4. Check locally first: `NITRO_PRESET=vercel bun run build` must create `.vercel/output`.
5. The first deploy of `main` gets a `*.vercel.app` URL. Test there (section 9) before touching the domain.

## 8. Temporary content to replace before launch

Full table with file paths, sources and licences: `docs/temp-images.md`. In short:

| What                                                                 | Where                                         | Replace with                                                                      |
| -------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| 9 homepage service tiles (stock photos and screenshots of our demos) | Home, "What we build" panels                  | Real work per service                                                             |
| 2 page heroes + 2 `/services` cards                                  | App development, Social media growth          | Real app screens, real client posts                                               |
| 3 before/after pairs (wireframe vs our demo sites)                   | Web development, UI/UX, App development pages | Real client before/after pairs                                                    |
| 6 sample review cards                                                | Home carousel, dev server only                | Real reviews in `src/content/reviews.ts` (the section then appears in production) |
| CEO photo (initials "AK")                                            | Footer contact card                           | A real photo of Asif (WebP)                                                       |

Also from `docs/status.md`: payment details (`src/config/payments.ts`), logo file, Perth street number, more social URLs,
analytics provider, and the hidden FAQ about agent languages.
Image quality limits (need new source files, not code): process illustrations are 512px, the hero poster is 1600px.

## 9. Launch checklist

Before the switch (on the `*.vercel.app` URL):

- [ ] Real values for all variables in section 4 set in Vercel (Production and Preview), including `NITRO_PRESET=vercel`
- [ ] Supabase Auth URL configuration includes the Vercel domain and `https://incodet.com/**`
- [ ] Deploy of `main` builds and loads
- [ ] Homepage, `/book`, `/deck`, `/portal`, `/pricing`, a case study, a service page and the 404 load without console errors
- [ ] `/book`: time zone picker opens and searches (try "Finland", "USA"); one real booking: row appears in Supabase,
      both emails arrive; then delete the row
- [ ] One contact message: row appears, email arrives; then delete the row
- [ ] Portal: magic link arrives (custom SMTP), sign-in works, Asif's account opens `/admin`
- [ ] Portal `DEMO` mode opens the sample project
- [ ] Real phone check (iPhone and Android): menu, booking sheet, homepage in portrait and landscape
- [ ] Temporary content from section 8 replaced, or Asif has accepted it for launch
- [ ] `docs/temp-images.md` updated for anything replaced

Switching `incodet.com` from the old site (Asif's registrar account; Asif does the DNS changes):

- [ ] Before changing anything, write down (screenshot) every current DNS record at the registrar, so the change can be undone
- [ ] Lower the TTL of the `@` and `www` records to 300 seconds a day before the switch, so the change spreads fast
- [ ] List the old site's public URLs (Google Search Console > Pages, or a crawl). Any that do not exist on the new site
      get a 301 redirect to the closest new page, so links and search rankings are not lost
- [ ] Vercel > Project > Domains: add `incodet.com` and `www.incodet.com` (redirect www to root)
- [ ] Registrar: replace only the `@` A record and the `www` CNAME with the values Vercel shows.
      **Keep** the MX records (`hello@incodet.com` mail) and the Resend DKIM/SPF/`send` records (site emails)
- [ ] Wait until Vercel shows the domain as Valid and SSL issued, then open `https://incodet.com` and `https://www.incodet.com`
- [ ] Repeat the booking, contact and portal sign-in tests on `https://incodet.com`; send a test mail to `hello@incodet.com`
- [ ] Submit `https://incodet.com/sitemap.xml` in Google Search Console and request indexing of the homepage
- [ ] Old site: keep its hosting 2 weeks as a fallback (switch the DNS back if something breaks), then cancel it.
      Make sure its public `/dashboard` is gone

## 10. Good to know

- The homepage scroll effects use GSAP ScrollTrigger + Lenis. `src/lib/scroll-refresh.ts` refreshes all triggers
  whenever the page height changes, so pinned sections stay in the right place. Pins and sticky stacks only run on
  screens at least 768px wide and 600px tall; phones and landscape phones get a simple stacked layout.
- Touch targets: a `@media (pointer: coarse)` rule in `src/styles.css` gives links and buttons a 44px minimum on touch
  screens. New small links should be `inline-flex` so the rule applies.
- The time zone picker shows "Detecting your time zone…" until the page has loaded, to avoid hydration mismatches.
  To refresh the zone list after a tz database update, run `node scripts/timezones/build.mjs`.
- Vite ignores `.output/`, `.vercel/`, `.wrangler/` and `.tanstack/tmp/`, so running a build while the dev server
  runs no longer crashes it.
- The Bloom Studio demo site itself still shows "4.9 · 500+ Google reviews", "Est. 2014" and em dashes. They are
  cropped out of our images, but should be removed from the demo site too.
