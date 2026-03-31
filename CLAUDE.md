# CLAUDE.md — Peerforum Website

## Project Overview

Peerforum is a full-service provider of peer coaching groups at scale for enterprise, education, and premium communities. This project is a marketing website built with Next.js, Tailwind CSS, and deployed on Vercel.

**Domain:** peerforum.com
**Repository:** GitHub (Nautom org)
**Primary editors:** Juancho (Nautom, via Claude Code) and Steve Brechner (CEO Peerforum, via Claude Code)

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router, full SSG with `output: 'export'` or static generation)
- **Styling:** Tailwind CSS v3+
- **Fonts:** Google Fonts — `Lora` (serif, headings) + `DM Sans` (sans-serif, body)
- **Icons:** Lucide React
- **Deployment:** Vercel
- **Language:** TypeScript

---

## Design System

The design replicates a reference React component (provided as `reference/design-source.jsx`). **Replicate the visual output as faithfully as possible.**

### Color Palette (use as Tailwind CSS custom colors)

```
bg-base:          #F6F8F6   (main background, off-white with green tint)
bg-alt:           #EBF0EC   (alternate section background, light sage)
text-main:        #0A1C12   (primary text, near-black green)
text-muted:       #526656   (secondary text, sage)
accent-sage:      #225430   (primary accent, forest green)
accent-sage-light:#326B42   (hover/secondary accent)
border-soft:      #D3DCD4   (borders, dividers)
surface-light:    #FAFAFA   (cards, elevated surfaces)
surface-dark:     #0A1C12   (dark sections, footer, dark cards)
```

### Typography

- **Headings (h1–h4):** `Lora`, serif. Use italic for emphasis phrases (e.g., "Without the pain.")
- **Body text:** `DM Sans`, sans-serif, font-weight 300–400 (light/regular)
- **Labels/uppercase tags:** `DM Sans`, font-weight 500–600, uppercase, tracking-widest, text-xs
- **Navigation:** `DM Sans`, 15px, font-weight 500
- **Logo:** "Peerforum." — `Lora`, serif, text-2xl, font-weight 500

### Component Patterns

- **Buttons primary:** `bg-[#0A1C12] text-[#F6F8F6] rounded-full px-6 py-3` with shimmer hover
- **Buttons secondary:** `bg-transparent border border-[#0A1C12] text-[#0A1C12] rounded-full`
- **Cards:** `rounded-[2rem] border border-[#D3DCD4]` with hover lift (`translateY(-6px)`)
- **Section labels:** Uppercase, tracking-widest, text-xs, color accent-sage, often with horizontal line decorators
- **Dark sections:** `bg-[#0A1C12]` with `text-[#F6F8F6]` and muted text `#D3DCD4`
- **Before/After comparisons:** Side-by-side split — left light, right dark, with rounded-3xl corners
- **Stat bars:** Full-width, grid of 4, divided by borders, with animated counters

### Animations (implement with CSS + Intersection Observer)

- Reveal on scroll: `translateY(40px) → 0` with `opacity: 0 → 1`, cubic-bezier(0.16, 1, 0.3, 1)
- Float animation: `translateY(0) → -12px → 0` over 6s, ease-in-out, infinite
- Staggered delays: 150ms increments for sequential items
- Counter animation: Animated number counting on scroll intersection

---

## Site Architecture

### Pages (7 total)

```
/                    → Home (hero + challenge + solution + how it works + facilitators preview + audiences)
/solutions/community → For Communities (before/after + stats + forum model benefits)
/solutions/education → For Executive Education (timeline + continuity comparison)
/solutions/enterprise→ For Enterprise (1:1 vs peer coaching + 12-touchpoint model)
/about               → About Us (letter on isolation — editorial/letter format)
/facilitators        → Our Facilitators (vetting process + coach profiles grid)
/case-studies        → Case Studies (SHRM featured — stats grid + testimonials)
```

### Shared Components

- `Navigation` — Fixed top, transparent → blur on scroll, logo left, links + CTA right, mobile hamburger
- `Footer` — Dark bg (#0A1C12), CTA headline, two-column link grid, copyright
- `StatBar` — Reusable 4-column stat section with animated counters
- `Button` — Primary / Secondary / Tertiary variants
- `Reveal` — Scroll-triggered animation wrapper (up/down/left/right/scale)
- `SEO` — Per-page meta tags + JSON-LD structured data

### Navigation Structure

```
Community | Education | Enterprise | About ▾ (About Us, Our Facilitators, Case Studies) | [Talk to Us]
```

---

## SEO Requirements

### Per-page meta tags
- Unique `<title>` and `<meta name="description">` for every page
- Open Graph tags (og:title, og:description, og:image, og:url)
- Canonical URLs

### Structured Data (JSON-LD)
- Organization schema on all pages
- WebPage schema per page
- FAQPage where applicable (enterprise comparison)

### Technical SEO
- Full SSG (static HTML output) — no client-side-only rendering for content
- Semantic HTML: proper heading hierarchy (h1 → h2 → h3), landmark elements (nav, main, section, article, footer)
- `<img>` tags with alt text, lazy loading
- `sitemap.xml` auto-generated
- `robots.txt` allowing all crawlers
- Clean URL structure with trailing slashes

---

## LLM Discoverability

### llms.txt
Create a `/public/llms.txt` file at the site root with:
- Company name and one-line description
- What Peerforum does (3-4 sentences, factual)
- Key services: Communities, Education, Enterprise
- Key differentiator: full-service (design + operations + facilitation)
- Notable client: SHRM Executive Network
- Contact method: website form

### Content Structure for LLMs
- Each page should have clear, self-contained sections that answer specific queries
- Use heading hierarchy that maps to questions (e.g., "How does peer coaching compare to 1:1 coaching?")
- Include factual claims with specifics (numbers, client names, process steps)
- Avoid vague marketing language in headings — be specific and queryable

---

## Contact Form ("Talk to Us")

Fields:
- First Name (required)
- Last Name (required)
- Email (required)
- Company (required)
- Phone Number (optional)
- Message (required, textarea)

Implementation: For MVP, use a simple form that POSTs to an API route or external service (Formspree, Resend, etc.). The specific backend can be decided later.

---

## Content Source

All page content is defined in `reference/content.md`. The React reference component in `reference/design-source.jsx` contains the exact copy used for each page. **Use the content from the reference component as the source of truth** — it has been edited and refined from the original markdown.

---

## File Organization

```
peerforum-website/
├── CLAUDE.md                    ← This file
├── reference/
│   ├── content.md               ← Original content document
│   └── design-source.jsx        ← React component from Gemini (visual reference)
├── src/
│   └── app/
│       ├── layout.tsx            ← Root layout with fonts, metadata
│       ├── page.tsx              ← Home page
│       ├── solutions/
│       │   ├── community/page.tsx
│       │   ├── education/page.tsx
│       │   └── enterprise/page.tsx
│       ├── about/page.tsx
│       ├── facilitators/page.tsx
│       ├── case-studies/page.tsx
│       └── contact/page.tsx      ← Talk to Us form page (or modal)
│   └── components/
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       ├── Button.tsx
│       ├── Reveal.tsx            ← Scroll animation wrapper
│       ├── StatBar.tsx
│       ├── AnimatedCounter.tsx
│       └── SEO.tsx               ← JSON-LD injection
├── public/
│   ├── llms.txt
│   ├── robots.txt
│   └── sitemap.xml
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Rules for Claude Code

1. **Replicate the visual design faithfully.** The reference JSX is the source of truth for layout, spacing, colors, typography, and component structure. When in doubt, match the reference.
2. **Use Next.js App Router with static generation.** Every page should be statically generated. No `'use client'` except for interactive components (navigation, animations, form).
3. **Tailwind only.** No CSS modules, no styled-components. Custom colors go in `tailwind.config.ts`.
4. **TypeScript throughout.**
5. **Semantic HTML first.** Proper heading levels, aria-labels, landmark elements.
6. **Never use `git rebase` or `git push --force` on open PRs.** Always use `git merge origin/main`.
7. **One component per file.** Keep components focused and reusable.
8. **Images:** Use Next.js `<Image>` component. For facilitator photos, use placeholder services (pravatar.cc) initially — real photos will be added later.
9. **Performance:** Target 95+ Lighthouse score. Optimize fonts (next/font), images, minimize JS bundle.
10. **Accessibility:** All interactive elements must be keyboard navigable. Color contrast must pass WCAG AA.
