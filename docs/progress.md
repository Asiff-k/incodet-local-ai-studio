# Progress: time zone picker + responsive pass

Branch `improvements`. Started 9 Nov 2026 after main was fast-forwarded to `7024e71`.
Update this file after each item so work can be resumed.

## Part 1: searchable time zone picker on /book

- [x] Zone to country data generated from tzdb `zone.tab` + `backward` by `scripts/timezones/build.mjs` into
      `src/content/timezones.ts` (518 names incl. 100 old ones; covers all 418 browser zones; no dependency)
- [x] Search in `src/lib/timezones.ts`: city, country name, code, zone name, aliases; accent-free; main zones of
      multi-zone countries ranked first (New York before Adak)
- [x] `TimeZonePicker` (cmdk + Radix Popover from 640px, full-screen Radix Dialog sheet on phones with search focused,
      safe-area padding); groups: Your time zone, Quick picks, then continents
- [x] Wired into BookingWidget: slot kept on zone change; offsets and label only after mount (no hydration risk)
- [x] Tests: `src/test/timezones.test.ts` + quick picks in `booking.test.ts` (77 tests pass)
- [x] Browser check (dev): Finland, Portugal, UK, USA, India, Lisbon found; Enter selects; Esc closes and returns
      focus; phone sheet full screen with input focused; tap selects; no console errors

## Part 2: responsive pass

- [x] Baseline audit (build `7024e71`): every page at 320, 360, 375, 390, 414, 430, 768, 820, 1024 (landscape),
      1280, 1440, 1920 and 844x390. Audit script: scratchpad `pw/audit.mjs` (Playwright)
- [x] Pinned/sticky effects need 768px width AND 600px height (`PIN_QUERY` in `src/hooks/use-motion.ts`, same
      in CSS). Phone landscape (844x390) gets the stacked layout; tablets keep the effects. Verified order and
      no blank frames at 844x390, 768x1024, 1024x768, 375x812
- [x] iOS safe areas: `viewport-fit=cover`; menu pill, menu overlay, cookie banner, deck chrome/controls and page
      side padding use `env(safe-area-inset-*)`
- [x] Touch targets: 44px minimum on touch screens (`pointer: coarse` rule in `styles.css`); footer/header links
      made inline-flex so the rule applies; desktop with a mouse unchanged
- [x] Body text 16px on phones: `type-small-body` utility in 7 places
- [x] Reduced motion: global rule stops CSS animations/transitions and smooth scrolling
- [x] Component checks at 320px: menu, booking calendar + picker, portal demo (tables stack as cards), pricing
      (comparison table hidden on phones, plan cards stack), deck (controls grow by the home-bar inset)
- [x] Headings that broke one word per line: industry pain cards 2 columns from 768px (3 from 1024px); service
      panel and deck titles smaller below 360px
- [x] Case study detail hero: `sizes` now full width, so the 1600px mockup loads (was blurry 800px)
- [x] Mouse desktops: text links in footer/menu/portal/tour grown to 24px hit areas without layout change
- [x] Fanned work carousel marked `data-overlap-ok` (cards overlap on purpose; opaque)
- [x] Image sizes: carousel mockups get a 1600px srcset; service page heroes, `/services` cards and the
      before/after slider declare their real displayed widths
- [x] Final audit (49 pages x 13 viewports = 637 checks): 0 horizontal scroll, 0 overlaps, 0 small body
      text, 0 touch targets under 44px (touch) / 24px (mouse), 0 broken headings, 0 console or hydration errors
- [ ] Known limits (source files, not layout): process illustrations are 512px (soft on 3x phones);
      hero poster is 1600px (under a dark overlay, replaced by the video)
- [x] Approved and committed on `improvements`

| Page group                                 | Issues found (page x viewport checks)                                         | Fix                                                                                   | Status              |
| ------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------------------- |
| Home                                       | 13 overlaps (fanned carousel), 6 small text, 13 targets, 1 heading, 13 images | carousel marked intentional, 16px body, touch rule, smaller title under 360px, srcset | Fixed               |
| Services (9)                               | 54 small text, 117 targets, 24 images                                         | 16px body, touch rule, hero/card `sizes`                                              | Fixed               |
| Industries (12)                            | 12 small text, 156 targets, 4 headings                                        | 16px body, touch rule, 2-column cards on tablets                                      | Fixed               |
| Case studies (19)                          | 247 targets, 108 blurry heroes                                                | touch rule, breadcrumb hit area, full-width `sizes`                                   | Fixed               |
| Pricing, Book, Portal, Privacy, Terms, 404 | 13 targets each (header/footer links)                                         | touch rule, inline-flex links                                                         | Fixed               |
| Portal demo                                | 6 small text, 13 targets                                                      | 16px body, touch rule, Exit demo/Skip hit areas                                       | Fixed               |
| Deck                                       | 10 targets, 1 heading, image notes                                            | touch rule, smaller titles under 360px; images are source limits                      | Fixed / known limit |
| Landscape phones (844x390)                 | Pinned sections inside a 390px-tall screen                                    | Static layout below 600px height                                                      | Fixed               |

| Page | Issue | Fix | Status |
| ---- | ----- | --- | ------ |
