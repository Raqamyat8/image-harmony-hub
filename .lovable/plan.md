
# LuxEstate — Premium AI Real Estate Platform (Phase 1)

Portfolio-grade frontend. All mock data, no backend. Phase 2 (Seller Dashboard, Admin Panel) can follow.

## Brand & design system

Palette (defined in `src/styles.css` via `@theme`):
- `--navy` #0B1F3A (primary, deep)  ·  `--navy-ink` #06111F  ·  `--navy-soft` #17335A
- `--emerald` #0E7C5A (secondary)  ·  `--emerald-soft` #14A278
- `--gold` #C9A24B (accent)  ·  `--gold-soft` #E4C77B
- `--bg` #FAFAF7 (soft white)  ·  `--card` #FFFFFF  ·  `--ink` #0B1220  ·  `--muted` #6B7280  ·  `--hairline` #ECECE6
- Gradients: `--grad-hero: radial-gradient(1200px 600px at 20% 10%, rgba(14,124,90,.18), transparent), linear-gradient(180deg, #0B1F3A 0%, #06111F 100%)`; `--grad-gold: linear-gradient(135deg,#E4C77B,#C9A24B)`
- Shadows: `--shadow-card: 0 1px 2px rgba(11,31,58,.05), 0 20px 40px -20px rgba(11,31,58,.15)`
- Radii: `--radius: 20px` (cards), `28px` for hero panels, `999px` for pills

Typography (loaded via `<link>` in `__root.tsx`):
- Display: **Fraunces** (700, optical size) — hero + section titles
- UI/body: **Inter** (400/500/600)
- Numeric: `tabular-nums` for prices/stats

Motion: Framer Motion (`motion`). Reveal-on-scroll, image parallax, hover tilt on cards, animated counters, page transitions.

## Imagery strategy

- 4 uploads → CDN via `lovable-assets create` → `src/assets/{tower,interior,agent,terrace}.jpg.asset.json`. Featured everywhere as hero-quality anchors.
- Supplemental listings use curated Unsplash URLs (10–14 vetted luxury real estate photos) referenced directly by URL. No AI-generated imagery.
- `<img loading="lazy" decoding="async">` everywhere except hero; hero preloaded.

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx                header + footer + fonts + base meta
  index.tsx                 Home
  properties.tsx            Search + results (filters in URL search params)
  properties.$id.tsx        Property detail
  agents.tsx                Agent directory
  agents.$id.tsx            Agent profile
  book.$id.tsx              Booking flow
  auth.tsx                  Sign in / Sign up (UI only)
  about.tsx                 About + trust
```

Every route defines its own `head()` (title, description, og:title/description, canonical). No og:image on __root.

## Shared chrome

**Header** — transparent over hero, solid `bg/80 backdrop-blur` on scroll. Left: wordmark `LuxEstate` with gold serif "L" mark. Center: Home · Properties · Agents · About. Right: `Sign in` ghost + `List a Property` gold-gradient CTA.

**Mobile bottom nav** — 5 icons (Home, Search, Saved, Bookings, Profile) with glass background, active dot indicator.

**Footer** — 4-column: brand + tagline, Explore, Company, Legal. Newsletter input with gold submit. Thin gold hairline top border. Fine print with locale/currency selectors.

## Home page sections

1. **Hero** — full-viewport. Left 55%: eyebrow "AI-powered real estate", giant Fraunces headline "Find a home that answers back.", subtext, AI search bar (input with animated placeholder cycling: "Sunlit penthouse near Central Park…", "3BR villa under $2M with pool…"). Trust row: "Trusted by 12,000+ buyers · $4.2B closed". Right 45%: `tower.jpg` in 28px-radius panel, floating glass cards (price tag, "Just listed" pill, mini-stat card) with subtle float animation. Radial navy gradient background with soft grain.

2. **Advanced Search Panel** — elevated -80px into hero. Segmented Buy/Rent/New Developments. Row of inputs: City combobox, Property Type select, Beds stepper, Price range slider (dual handle), "More filters" opens sheet with Bathrooms, Area size, Parking, Pool, Garden, Furnished toggles. Instant-apply — result count animates in real time. "Search" gold gradient button.

3. **Featured Properties** — 3 large editorial cards. First card is the tower/interior/terrace uploads as covers. Card: image with corner "Featured" gold pill, price big, address, chips (beds/baths/sqft), heart favorite. Hover: image scales, gold border fades in, price nudges up. "View all →" link.

4. **Luxury Categories** — 6 pill cards in a soft grid: Penthouses, Villas, Waterfront, Historic, Sky Residences, Commercial. Each: monochrome navy illustration or image crop + count. Hover: card lifts, gold underline sweeps.

5. **Interactive Statistics** — dark navy band with grain. 4 counters animate on scroll: 12,480 Homes Sold · $4.2B Volume · 96 Cities · 4.9★ Client Rating. Subtle emerald data-viz lines behind.

6. **How It Works** — 3 steps horizontally, connected by an animated gold line that draws as you scroll. Step icons in circular gold-outline badges. Copy: Discover · Tour · Close.

7. **Mortgage Calculator Preview** — split layout. Left: inputs (Price, Down Payment %, Interest %, Years). Right: animated monthly payment (large tabular number), stacked bar (Principal vs Interest), Total Cost line. Uses Recharts.

8. **Testimonials** — carousel of 3 cards visible at once. Portrait avatar, quote in serif, name/role, gold 5-stars. Drag/swipe on touch.

9. **Trusted Partners** — grayscale wordmarks (Sotheby's, Compass, Knight Frank, Christie's, JLL, Savills) — text-only marks in tracked Inter to keep 100% frontend, no logos to license.

10. **FAQ** — accordion (shadcn Accordion). 6 Qs. Left column has section title + supporting copy, right column has the items.

11. **Newsletter** — full-width band with `terrace.jpg` blurred at 30% opacity behind navy overlay. Center: headline + email input + gold subscribe button. Success animation swaps to check + "You're in."

12. **Footer** — as above.

## Properties (`/properties`)

URL-synced search state via `validateSearch` + `zodValidator` + `fallback`. Left rail (desktop) / bottom sheet (mobile) filters:
- City, Area, Type, Sale/Rent segmented
- Beds/Baths steppers
- Price + Area dual-range sliders
- Toggle chips: Parking, Pool, Garden, Furnished

Header row: result count animates, Sort dropdown (Newest, Price ↑, Price ↓, Size), View toggle (Grid / Map).

Grid: 3-col cards. Skeletons on filter change (200ms). "Load more" button with soft fade-in.

Map view (mock): styled div with abstract navy street pattern SVG + gold pin markers positioned via CSS — no external map library. Click pin → floating property preview card. Genuinely functional-feeling without Mapbox.

Empty state: illustrated compass SVG + "No homes match. Try widening your search." with quick-reset chips.

## Property Detail (`/properties/$id`)

- **Gallery**: hero image + 4 thumbnails in a bento layout. Click opens full-screen lightbox slider with keyboard nav, counter, fade transitions.
- **Header**: title, address, chips (For Sale / Verified). Actions: Favorite (heart fills gold with pop), Share (copies link, toast), Compare.
- **Price band**: big price, price/sqft, est. monthly (links to calculator).
- **Highlights strip**: 4 icon-cards (Beds, Baths, Sqft, Year built) in glass tiles.
- **Description** + **Amenities grid** (12 items with lucide icons).
- **Interactive map (mock)**: styled tile with pin + Nearby list (schools, transit, restaurants) with walk-times.
- **Agent card**: `agent.jpg`, name, verified badge, response time, Message + Call buttons.
- **Mortgage calculator** (embedded).
- **Book viewing** CTA → `/book/$id`.
- **Related listings**: 3-card carousel at bottom.

## Booking (`/book/$id`)

3-step wizard with progress bar (gold fill):
1. **Choose date** — shadcn Calendar with `pointer-events-auto`. Available dates styled emerald; disabled muted.
2. **Choose time** — grid of time slots (9:00–17:00, 30-min). Selection scales + gold outline.
3. **Confirm** — summary card (property mini + date/time + agent), Name/Email/Phone form (react-hook-form + Zod), Notes textarea. Submit → celebratory confirmation screen with animated check, "We've sent a confirmation to your inbox," and Reschedule/Cancel/Add to Calendar buttons.

State kept in URL search params so refresh/back work.

## Auth (`/auth`)

Split screen. Left: `interior.jpg` full-bleed with navy 40% overlay + serif tagline "Your next chapter, curated." Right: card with tabbed Sign in / Create account, email + password, social buttons (Google/Apple — visual only), "Forgot password?" link. All forms use react-hook-form + Zod with inline validation.

## About (`/about`)

Editorial: mission statement in oversized serif, three-column values, team grid (uses `agent.jpg` + duplicated variants with different names — acceptable as demo), press mentions, offices list.

## Components (built once, reused)

`components/`
- `Header.tsx`, `Footer.tsx`, `MobileTabBar.tsx`
- `PropertyCard.tsx`, `PropertyCardFeatured.tsx`
- `SearchBar.tsx` (hero variant), `FilterPanel.tsx`, `PriceRange.tsx`, `Stepper.tsx`
- `Gallery.tsx`, `Lightbox.tsx`
- `MortgageCalculator.tsx` (uses Recharts)
- `Counter.tsx` (framer-motion animated number)
- `StatBand.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `Newsletter.tsx`
- `AgentCard.tsx`, `AmenityGrid.tsx`, `MapMock.tsx`
- `BookingWizard.tsx`, `CalendarStep.tsx`, `TimeSlots.tsx`
- `SectionHeading.tsx`, `Reveal.tsx` (framer scroll reveal wrapper)

## Data (mock)

`src/data/properties.ts` — 12 properties (title, slug, city, type, price, beds/baths/sqft, amenities, images[]). First 3 use uploaded images as primary; remainder use curated Unsplash URLs.
`src/data/agents.ts` — 6 agents. First uses `agent.jpg`.
`src/data/testimonials.ts`, `src/data/faq.ts`.

## Micro-interactions checklist

- Buttons: 200ms transform + shadow lift on hover; gold shimmer sweep on primary CTAs.
- Cards: 3D subtle tilt on cursor (framer `useMotionValue`) — disabled on touch.
- Inputs: label float, focus emerald ring, error shake.
- Nav: active link gold underline sweep (story-link).
- Page transitions: 200ms fade + 8px rise via router's default view transitions.
- Loaders: shimmer skeletons for cards.

## Accessibility & SEO

- Semantic landmarks, single H1 per page.
- All interactive elements keyboard reachable; focus rings gold on navy, navy on cream.
- `prefers-reduced-motion` disables parallax, tilt, autoplay carousel.
- Per-route meta (title <60, desc <160), JSON-LD `RealEstateAgent` on Home, `Product` on property detail (name, image, price).

## Out of scope for Phase 1

Seller Dashboard, Admin Panel, real Supabase persistence, real map, real booking backend, payments. Phase 2 spec on request.
