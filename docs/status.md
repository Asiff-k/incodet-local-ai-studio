# Incodet website: build status (7 Nov 2026)

Lovable project: https://lovable.dev/projects/ac30251d-e1bb-44e4-935d-7f7b5392f597
Preview: https://id-preview--ac30251d-e1bb-44e4-935d-7f7b5392f597.lovable.app
Not published yet. Note: the plain preview link can show an older cached build until you publish. Open the project in the Lovable editor and use its "open in new tab" button to see the latest version.

## Done
- Phase 1: Orbix-style design system, floating pill nav, footer, site config (src/config/site.ts), swappable text logo
- Phase 2: homepage (hero video + scroll effect, industries, who we are, AI agent cards, service panels, process, case studies, plans, FAQ)
- Phase 3: pricing, custom software, industry pages, case study index + detail pages, privacy, terms, 404
- Phase 4: Lovable Cloud, contact form (spam protection, rate limit), /book page
- Phase 5: client portal (magic link), DEMO mode, guided tour, invoice PDF, pay modal, "I've paid" flow, admin panel (admin = hello@incodet.com only)
- Phase 6: SEO (titles, canonical, OG image, JSON-LD, sitemap, robots), consent-gated analytics, performance (under 2 MB before scroll), axe 0 serious issues
- Round 2: thunderstorm hero, arc drag carousel, client portal section on homepage, new menu, social icons, grey demo banner, invoice alignment, 11 industries, every project its own case study with month-range period and story
- Round 3 (from Asif's Orbix videos), all verified in the browser:
  - C: floating projects burst effect; DRAG cursor on top of carousel cards; "Who we are" colour wave with pills popping in; scroll-driven "How it works" with generated floating images; sticky stacking featured case study cards; smooth scrolling
  - D: 8 Orbix-style service panels with "Get Started" (max 2 placeholder tiles each); 7 service pages + /services index + restyled /custom-software, each with unique title and FAQ JSON-LD
  - E: own 24/7 booking calendar (opens on current month, today highlighted, visitor time zone, Morning/Afternoon/Evening/Night tabs) + project form (name, company, email, phone, project type, budget, delivery time, message); team locations in footer, hero pill, menu, privacy, JSON-LD; no founding year anywhere
  - F: Company Deck at /deck (23 slides: cover, problems, AI agent, services, process, 5 case studies + more work, industries, teams map, plans, add-ons, portal, next steps, contact). Arrows, dots, swipe, shareable #links, "Download PDF" prints one slide per page. Linked in footer and menu, in sitemap
- Full-site test: every sitemap page returns 200 with one H1; no em dashes, no "#" links, no staff tool links, no broken internal links

## Decisions
- Calls and bookings available 24/7
- Team locations shown by city; only Perth shows a street address
- No founding year on the site for now
- 2025 work counts as Incodet work; client names may be shown
- Western Cars staff registration tool: screenshot only, never linked

## Waiting on Asif
1. Email notifications: Resend key, verify incodet.com, Lovable Project Settings > Secrets > RESEND_API_KEY (booking and contact emails stay off until then; bookings still save to the database)
2. Payment details: src/config/payments.ts (Payoneer, Wise, PayPal, bank)
3. Sign in once at /portal with hello@incodet.com, open /admin, check Bookings and test with a dummy client
4. Real Vapi cost per minute (overage currently $0.20/min)
5. Logo file (set logoUrl in site config), Perth street number, social URLs, analytics provider
6. FAQ answers still hidden: website ownership, agent languages
7. Read the case study stories and service page copy and correct any detail
8. Legal pages: liability cap (3 months of fees) and retention periods need a qualified review
9. Tell Western Cars the staff registration form is publicly reachable; fix typos and 2021 footers on the Crawley, East Grinstead, Horley and Horsham sites
10. Update the project brief: other team locations are now allowed, founding year not shown, Cal.com replaced by own calendar
11. Replace "Image coming soon" tiles (app development, social media, a few others) with real work when available
12. Publish in Lovable, then GitHub export for Monir > Vercel, point incodet.com
