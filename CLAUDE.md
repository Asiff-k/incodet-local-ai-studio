# Incodet website (incodet.com)

Agency site for Incodet: AI calling agents, AI chatbots, booking websites and custom software for local businesses.
Developed locally in VS Code with Claude Code.

## Stack

- TanStack Start (SSR + server functions), React 19, TypeScript, Tailwind 4, shadcn/ui
- Vite 8 + Nitro. Plain config in `vite.config.ts` (Nitro target defaults to Cloudflare; Vercel builds set `NITRO_PRESET=vercel`)
- Supabase (Postgres, Auth magic link, RLS). Schema in `drizzle/migrations/`
- Motion: GSAP ScrollTrigger + Lenis (off on touch and reduced motion)
- Package manager: bun. Tests: vitest
- Target hosting: Vercel (see docs/launch-guide.md)

## Where things live

- Contact details, socials, logo, team locations: `src/config/site.ts` (single source, never hardcode elsewhere)
- Booking rules (Perth timezone, 24/7, 30 min slots, 12h notice, 30 days ahead): `src/config/booking.ts`
- Payment details (placeholders until Asif provides them): `src/config/payments.ts`
- Content: `src/content/` (services, caseStudies, industries, plans, faq, process, deck, reviews)
- Server functions: `src/lib/*.functions.ts` (booking, contact, portal). Admin client: `src/integrations/supabase/client.server.ts`
- Routes: `src/routes/` (admin and portal dashboard under `_authenticated/`)
- History of what was built and why: `AGENTS.md`, `roadmap.md`, `docs/status.md`

## Rules (every change)

- Never use em dashes, in code comments shown to users or in site copy
- No fake reviews, stats, metrics, projects, people or blog posts. Reviews section stays hidden until real reviews exist
- No "#" links. Every link goes somewhere real or is hidden
- No AI attribution anywhere ("made with AI", "powered by" text, site-builder badges)
- No stock photos of people as the team. No custom cursor (the carousel DRAG ball is the only exception)
- Mobile-first: perfect at 375, 768, 1280+. No horizontal scroll
- First load under 2 MB before scroll, WebP images, lazy loading, self-hosted media only
- WCAG AA contrast, keyboard navigation, alt text, one H1 per page, unique title and description per page
- No console or hydration errors
- KI Training and Cipher Shield never appear anywhere
- Western Cars staff registration tool: screenshot only, never linked
- No founding year, "since" or "est." anywhere
- Team locations: Perth (head office, only street address shown), Dhaka, Sylhet, Montreal, Leeds, Birmingham
- All prices labelled USD. Timelines: Starter 1 to 2 weeks, Growth 2 to 3 weeks, Scale 4 to 8 weeks. Extra call minutes $0.20
- Voice: clear, plain English, "we" not "I", no buzzwords

## Working rules for Claude Code

- Never print, log or commit secret keys. Secrets live in `.env.local` (git-ignored) and Vercel env vars only
- Database changes: add a new file in `drizzle/migrations/` and apply it to Supabase. Never edit old migrations
- Run `bun run test` and `bun run build` before saying a change is done
- Work on a branch, commit with clear messages, ask before pushing to main or deploying to production
- Ask Asif before anything only he can do: logins, keys, DNS, payments
- Keep replies short and scannable
