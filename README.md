# Incodet Local Ai Studio

Build PHASE 1 of the new Incodet website (incodet.com): the design system, layout shell and homepage hero. Later phases will add the rest of the pages, so build clean reusable components.

## 1. Who Incodet is (context)
Incodet builds websites, AI agents and custom software for businesses of every size. Main offer: AI website chatbots and 24/7 AI phone agents for local service businesses (roofing, epoxy flooring, salons, barber shops). Secondary offer: custom software and SaaS. Voice: clear, confident, plain English, "we" not "I", no hype. Never use em dashes anywhere in the copy.

## 2. Visual reference
Match the UI of https://www.orbix.studio as closely as possible: layout, type scale, spacing, pill shapes, soft shadows, section rhythm, motion. Do NOT copy any of their text, images, logos, illustrations, videos or brand names. Use only the Incodet content in this prompt.

## 3. Design tokens (put in Tailwind config + CSS variables)
Colors:
- --bg: #FFFFFF
- --bg-soft: #F7F8F8 (alternate sections)
- --ink: #0A0A0A (headings, primary buttons)
- --body: #4D4D4D (body text, must pass WCAG AA)
- --muted: #6B6B6B (small labels only)
- --border: #E8E8E8
- --dark: #000000 (dark sections), --dark-card: #111111
- --accent-from: #3B6CF6, --accent-to: #8B5CF6 (one accent gradient, used sparingly; keep as variables because the brand color may change later)
- Panel colors for future service panels (white text on all, AA compliant): violet #5B3FD9, blue #0B5F8F, orange #C2410C, teal #0F5C55, black #000000

Typography:
- Font: General Sans (Fontshare: https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap), fallback Arial, sans-serif
- H1: 64px / 1.1, weight 500, letter-spacing -0.02em (mobile 40px)
- H2: 52px / 1.2, weight 500, letter-spacing -0.01em (mobile 34px)
- H3: 28px / 1.25, weight 500
- Body: 18px / 1.45, weight 400, color --body
- Small: 14px

Shapes and depth:
- Buttons fully pill shaped
- Cards radius 28px, small cards 16px
- Primary black buttons have a soft drop shadow: 0 18px 30px -10px rgba(0,0,0,.35)
- Container max width 1280px, side gutter 16px on mobile, 32px on desktop
- Generous vertical spacing between sections (120px desktop, 72px mobile)

Motion:
- Easing cubic-bezier(.22,1,.36,1), 600 to 800ms
- Elements fade up once when they enter the viewport (opacity 0 to 1, y 24px to 0)
- Respect prefers-reduced-motion everywhere (no zoom, no parallax, instant reveals)
- NO custom cursor

## 4. Site config (one file, used everywhere)
Create src/config/site.ts. Every component must read contact details from here. Never hardcode them elsewhere.
- name: "Incodet"
- logoUrl: "" (empty for now)
- email: "hello@incodet.com"
- phoneDisplay: "+61 451 526 342", phoneHref: "tel:+61451526342"
- whatsapp: "https://wa.me/61451526342?text=Hi%20Incodet%2C%20I%27d%20like%20to%20discuss%20a%20project."
- address: "Camberwarra Drive, Craigie WA 6025, Australia"
- mapsUrl: "https://www.google.com/maps/search/?api=1&query=Camberwarra+Drive+Craigie+WA+6025+Australia"
- socials: linkedin "https://www.linkedin.com/company/incodet/", facebook "", instagram "", tiktok "". A social icon renders ONLY when its URL is non-empty. Never link to "#".
- heroVideo: { src: "/videos/hero.mp4", poster: "/videos/hero-poster.webp" }

## 5. Logo (placeholder, must be easy to swap)
Create one <Logo /> component used in the header, floating nav, menu overlay and footer. If site.logoUrl is empty, render the text wordmark "Incodet" in General Sans weight 600, letter-spacing -0.02em (ink on light, white on dark). If logoUrl is set, render that image instead everywhere. Favicon: a simple "I" monogram SVG, black rounded square with white letter.

## 6. Layout shell (Orbix style)
Top bar (not sticky): Logo on the left, black pill button "Book a Free Call" on the right linking to /book. Transparent over the hero.

Floating bottom pill nav (like Orbix):
- Fixed, bottom center, black pill (about 360px wide desktop, full width minus 32px on mobile)
- Left: small logo mark. Middle: page scroll percentage (0% to 100%). Right: a divider then a "Menu" button with a hamburger icon
- When it sits over a section marked data-theme="dark", it inverts to a white pill with black text
- "Menu" opens a full-screen overlay menu: large links (Home, Pricing, Industries: Roofing, Epoxy Flooring, Salons, Barber Shops, Custom Software, Case Studies, Book a Call, Client Portal), email, WhatsApp, phone, configured socials, and a black "Book a Free Call" pill. Closes with Escape, a close button, and on link click. Focus trapped while open.

Footer (Orbix style, white background):
- Left: large statement "Pay for what you use. Nothing more." then "Drop us a line" with email link, "Call us" with tap-to-call phone, WhatsApp link, and a black "Book a Free Call" pill
- Link columns: Pages (Home, Pricing, Custom Software, Case Studies, Book a Call, Client Portal), Industries (Roofing, Epoxy Flooring, Salons, Barber Shops), Follow Us (only socials that have URLs)
- "Our location": Perth, Western Australia, with the address linking to mapsUrl in a new tab
- Bottom row: "© 2026 Incodet. All rights reserved." plus Privacy Policy (/privacy) and Terms (/terms)
- Show only this one address. Mention no other country or office.

Routes: create these routes now so every link works. Except the homepage, each shows only the shared layout with its page name as the H1; real content comes in later phases: /, /pricing, /custom-software, /industries/roofing, /industries/epoxy-flooring, /industries/salons, /industries/barber-shops, /case-studies, /book, /portal, /privacy, /terms. Add a branded 404 page with a link back home.

## 7. Homepage hero (build now, exact copy)
- Small white pill badge above the H1 with a location pin icon: "Perth, Western Australia"
- H1: "Websites, AI Agents & Software That Grow With Your Business"
- Subheadline: "AI that answers calls, books appointments and replies to customers while you work, so your business never stops. Built for businesses of every size."
- Buttons: "Book a Free Call" (black pill, links to /book) and "See Plans" (white pill, links to /pricing)
- Below the buttons, a small line with a check icon: "No lock-in contracts"
- Everything centered, like the Orbix hero

Hero background video:
- Choose a free-license stock video (Pexels or Pixabay) with the same feel as the orbix.studio hero: a bright, calm sky or open landscape (soft clouds, gentle light, grass or horizon), slow movement. No animals, no people, no buildings, no text or logos.
- The top two thirds must be bright and low contrast so the black H1 stays readable (WCAG AA).
- Muted, autoplay, loop, playsinline. Read the src and poster from site.heroVideo. If you cannot store the file in /public/videos, use a direct stock video URL for now, keep it in site.heroVideo only, and tell me which clip (page URL) you used so we can download and self-host it later.
- Show the poster immediately; load the video after the page has loaded. On mobile and with reduced motion, show only the poster.

Hero scroll effect (like Orbix):
- The hero stays pinned for about one screen of scrolling
- During that scroll the video slowly zooms (scale 1 to about 1.08) and fades into --bg-soft via a gradient overlay rising from the bottom
- The H1 changes from solid ink to a soft top-to-bottom gradient (ink to light grey); the badge, subheadline, buttons and "No lock-in contracts" line fade out and move up slightly
- After the pin, a placeholder section with background --bg-soft slides up (Phase 2 fills it)

## 8. Reusable components (build them, show them on /styleguide)
Create /styleguide (noindex, not linked anywhere) showing every component:
- Button: primary (black pill + shadow), secondary (white pill with border), inverted versions for dark sections
- PillBadge (small white pill, optional icon)
- Section wrapper with themes: light, soft, dark (dark sets data-theme="dark")
- SectionHeading: centered H2 + supporting paragraph
- Card (radius 28px)
- RevealText: a paragraph whose words fill from light grey to ink (or the accent gradient) as the user scrolls. The DOM must keep normal readable text with real spaces between words (no letter splitting without a readable fallback)
- Accordion (FAQ style, "+" icon that rotates, one open at a time, keyboard accessible)
- SegmentedTabs (white pill tabs on a soft background, like the Orbix process tabs)
- StackedPanels: full-width colored panels that stick and stack on scroll, each with a large "/01" style number top right
- HorizontalScrollCards: a section that scrolls cards horizontally while the page scrolls vertically (falls back to a normal swipe row on mobile)

## 9. Rules (must follow)
- No fake reviews, stats, client logos, people, team photos or blog posts. No stock photos of people.
- No "#" links. Every link goes to a real route or URL, or is hidden.
- No GitHub links.
- No AI attribution anywhere ("made with AI", "Edit with Lovable" badge, "powered by" text). Hide the Lovable badge.
- Mobile-first: perfect at 375px, 768px and 1280px+, no horizontal scroll.
- Performance: under 2 MB loaded before scroll. Images in WebP, lazy-loaded below the fold.
- Accessibility: WCAG AA contrast, visible focus states, full keyboard navigation, alt text, one H1 per page, semantic landmarks.
- No console errors or hydration errors.
- Page title: "Incodet | Websites, AI Agents & Custom Software". Meta description: "Booking websites, 24/7 AI chatbots and calling agents, and custom software for small, growing and established businesses. Pay only for what you use."

## 10. Confirm this checklist in your reply
1. Design tokens and General Sans set up as specified
2. src/config/site.ts exists and every contact detail reads from it
3. <Logo /> renders the text wordmark and swaps to an image when logoUrl is set
4. Top bar, floating bottom pill nav (scroll %, Menu, inverts on dark sections), menu overlay and footer work
5. All routes listed exist, the 404 page works, and there are no "#" links
6. Hero uses the exact copy above
7. Hero video: which clip you chose (page URL), whether it is self-hosted or linked, and that the poster shows first
8. Hero scroll effect works and is disabled with reduced motion
9. /styleguide shows every component from section 8
10. Checked at 375px, 768px and 1280px with no horizontal scroll
11. No custom cursor, no AI attribution, no fake content, no console errors

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ac30251d-e1bb-44e4-935d-7f7b5392f597).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
