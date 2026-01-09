# Basic Analytics Report Dashboard (Luxury UI)

## Wireframe (single screen)

- **Top Navbar (glass, sticky)**
  - Left: premium mark + **Analytics Report** title (serif, gold gradient)
  - Center/right: Time range filter (Week / Month / Year)
    - Desktop: segmented buttons
    - Mobile: dropdown select
  - Right: profile avatar + dropdown

- **KPI Strip (4 cards)**
  - Total Property Views
  - Monthly Leads
  - Conversion %
  - Bookings this month
  - Frosted glass cards with gold hover glow + animated counters

- **Primary Chart (left)**
  - Line chart (12 months)
  - Tabs: Views | Leads | Revenue
  - Gold gradient stroke + luxury tooltip
  - Executive takeaway strip: Momentum, Peak month, Avg, Latest

- **Secondary Charts (right column)**
  - Pie: Lead Source Share
  - Bar: Property Performance

- **Footer Actions (glass)**
  - Export PDF / Export CSV
  - Insight line (e.g., +24% lead velocity)

## Component structure

- `src/app/layout.tsx` – fonts + global metadata
- `src/app/page.tsx` – renders dashboard
- `src/app/globals.css` – luxury tokens + glass utilities

- `src/components/dashboard/dashboard-screen.tsx` – page composition + responsive grid
- `src/components/dashboard/navbar.tsx` – glass navbar + time filters + avatar menu
- `src/components/dashboard/kpi-card.tsx` – frosted KPI card
- `src/components/dashboard/animated-number.tsx` – KPI animated counters
- `src/components/dashboard/footer-actions.tsx` – export actions + insight

- `src/components/dashboard/charts/line-performance-card.tsx` – primary line chart + tabs
- `src/components/dashboard/charts/lead-source-pie-card.tsx` – pie chart
- `src/components/dashboard/charts/property-performance-bar-card.tsx` – bar chart
- `src/components/dashboard/charts/chart-tooltip.tsx` – luxury tooltip

- `src/store/dashboard-store.ts` – Zustand filter state (`timeRange`, `metric`)
- `src/lib/mock-data.ts` – static mock JSON + helpers
- `src/lib/motion/variants.ts` – Framer Motion variants

## Tailwind class planning (style primitives)

- **Matte background**: `bg-background` (mapped to `#0B0B0D` via CSS variables)
- **Glass cards**: `lux-glass` utility (border + blur + translucent fill)
- **Gold hover glow**: `lux-hover-glow` + `hover:border-[color:var(--lux-border-gold)]`
- **Serif headings**: `font-serif` (Playfair Display)
- **Body**: `font-sans` (Inter)

## Responsive grid strategy

- KPI grid: `grid-cols-2` with `max-[420px]:grid-cols-1` and `lg:grid-cols-4`
- Charts grid: `grid-cols-12`
  - Line chart: `col-span-12 xl:col-span-8`
  - Right column: `col-span-12 xl:col-span-4` with inner stack
- Filters:
  - `min-[520px]:flex` segmented buttons
  - `min-[520px]:hidden` dropdown select

## Recharts implementation notes

- Always wrap charts with `ResponsiveContainer` to prevent overflow.
- Use `defs` gradients for gold stroke/fill.
- Keep grid subtle: `stroke="rgba(255,255,255,0.08)"`.
- Animation: `animationDuration ~ 900ms`, `animationEasing="ease-out"`.

## Motion variants (Framer Motion)

- `fadeUp`: opacity + slight y + blur, luxury easing `[0.16, 1, 0.3, 1]`
- `stagger`: stagger children ~ `0.08s` for premium reveal cadence
- Navbar parallax: subtle `useScroll()` → title y transform

## Branding advice (luxury real estate)

- Treat gold as **accent only** (borders/lines/CTA) — avoid filling large surfaces.
- Keep card density low; prioritize whitespace and hierarchy.
- Use uppercase microcopy + wide tracking for “enterprise” feel.
- Use one signature gradient (gold1 → gold2) consistently across CTA and key lines.
