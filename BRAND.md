# Peerforum — Brand Guidelines

Quick reference for developers. Full brand book: `brand/Peerforum-Brand-Book.pdf`

---

## Colors

| Name             | Hex       | CSS Variable              | Usage                              |
|------------------|-----------|---------------------------|------------------------------------|
| Base Background  | `#F6F8F6` | `--color-bg-base`         | Main page background               |
| Alt Background   | `#EBF0EC` | `--color-bg-alt`          | Alternate section backgrounds      |
| Primary Text     | `#0A1C12` | `--color-text-main`       | Headings, body text, dark sections |
| Muted Text       | `#526656` | `--color-text-muted`      | Secondary text, captions           |
| Accent Sage      | `#225430` | `--color-accent-sage`     | Links, highlights, active states   |
| Accent Light     | `#326B42` | `--color-accent-sage-light` | Hover states, secondary accent   |
| Border Soft      | `#D3DCD4` | `--color-border-soft`     | Borders, dividers, separators      |
| Surface Light    | `#FAFAFA` | `--color-surface-light`   | Cards, elevated surfaces           |
| Surface Dark     | `#0A1C12` | `--color-surface-dark`    | Footer, dark sections              |

### Usage Rules

- **Primary backgrounds:** Use `#F6F8F6` (base) and `#EBF0EC` (alt) for alternating sections
- **Dark sections:** Use `#0A1C12` background with `#F6F8F6` text
- **Accent color:** `#225430` for interactive elements, `#326B42` for hover states
- **Never** use pure white (`#FFFFFF`) or pure black (`#000000`)

---

## Typography

### Font Families

| Font     | Type       | Weights       | Styles          | Variable         | Usage                    |
|----------|------------|---------------|-----------------|------------------|--------------------------|
| Lora     | Serif      | 400, 500, 600 | normal, italic  | `--font-lora`    | Headings, logo, emphasis |
| DM Sans  | Sans-serif | 300, 400, 500, 600 | normal    | `--font-dm-sans` | Body, UI, navigation     |

### Type Scale

| Element        | Font    | Weight | Size             | Other                       |
|----------------|---------|--------|------------------|-----------------------------|
| Logo           | Lora    | 500    | 2xl (28px)       | tracking-tight              |
| H1 (Hero)      | Lora    | 500    | 5xl–7xl (48–84px)| tracking-tight, leading-tight |
| H2 (Section)   | Lora    | 500    | 3xl–4xl (32–44px)| tracking-tight              |
| H3 (Card)      | Lora    | 500    | 2xl–3xl (24–32px)| —                           |
| Section Label   | DM Sans | 500–600| xs (12px)        | uppercase, tracking-widest  |
| Body           | DM Sans | 300–400| base–lg (16–18px)| leading-relaxed             |
| Nav Links      | DM Sans | 500    | 15px             | —                           |
| Button Text    | DM Sans | 500    | sm (14px)        | tracking-wide               |

### Import

```css
/* next/font/google — already configured in layout.tsx */
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
```

---

## Logo

### Wordmark

- **Text:** `Peerforum.` (with trailing period)
- **Font:** Lora, serif, font-weight 500
- **Color on light:** `#0A1C12`
- **Color on dark:** `#F6F8F6`
- **The wordmark must not be recreated** — it renders as styled text in the codebase

### Isotipo (Dot Circle)

- A circle composed of ~60–80 dots of varying sizes representing peer diversity
- Larger dots concentrated center-right, smaller dots on periphery
- See `brand/assets/` for SVG files

### Rules

- Minimum clear space around logo: 1x the height of the "P"
- Minimum size: 100px wide (digital), 25mm (print)
- Never distort, rotate, or change colors outside the approved palette

---

## Tokens

### CSS Custom Properties

```css
:root {
  --color-bg-base: #F6F8F6;
  --color-bg-alt: #EBF0EC;
  --color-text-main: #0A1C12;
  --color-text-muted: #526656;
  --color-accent-sage: #225430;
  --color-accent-sage-light: #326B42;
  --color-border-soft: #D3DCD4;
  --color-surface-light: #FAFAFA;
  --color-surface-dark: #0A1C12;
}
```

### Tailwind Config (globals.css @theme)

```css
@theme {
  --font-sans: var(--font-dm-sans), "DM Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-lora), "Lora", ui-serif, Georgia, serif;

  --color-bg-base: #F6F8F6;
  --color-bg-alt: #EBF0EC;
  --color-text-main: #0A1C12;
  --color-text-muted: #526656;
  --color-accent-sage: #225430;
  --color-accent-sage-light: #326B42;
  --color-border-soft: #D3DCD4;
  --color-surface-light: #FAFAFA;
  --color-surface-dark: #0A1C12;
}
```

### Button Variants

| Variant   | Background    | Text      | Border    | Hover                         |
|-----------|---------------|-----------|-----------|-------------------------------|
| Primary   | `#0A1C12`     | `#F6F8F6` | `#0A1C12` | bg → `#225430`, scale 1.02    |
| Secondary | transparent   | `#0A1C12` | `#0A1C12` | bg → `#0A1C12`, text → `#F6F8F6` |
| Tertiary  | `#F6F8F6`     | `#0A1C12` | `#F6F8F6` | bg → `#D3DCD4`, scale 1.02    |

### Spacing & Radius

| Pattern         | Value                  |
|-----------------|------------------------|
| Section padding | `py-24` / `py-32`      |
| Card padding    | `p-10` to `p-20`       |
| Button padding  | `px-6 py-3` (default)  |
| Card radius     | `rounded-[2rem]` (32px)|
| Button radius   | `rounded-full`         |
| Input radius    | `rounded-xl` (12px)    |
| Dropdown radius | `rounded-2xl` (16px)   |
