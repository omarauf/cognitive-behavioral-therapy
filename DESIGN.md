# DESIGN.md — Visual Design System for the Arabic CBT Guide

> **Design direction:** A calm, editorial, interactive Arabic learning experience. Think *beautifully typeset illustrated field guide*, not a medical dashboard, an animated landing-page template, or a plain wall of text.
>
> This file complements `AGENTS.md`. `CBT.md` remains the content source of truth. When visual decisions conflict with readability, accuracy, accessibility, or reader control, prioritize those four.

## 1. Design principles

1. **Calm, not sterile.** Use a warm, slightly creamy off-white canvas, soft sage/teal accents, rich dark text, and generous—but not excessive—space.
2. **Minimal, not empty.** Make pages visually engaging through excellent Arabic typography, deliberate composition, elegant illustrations, highlighted examples, and meaningful interactions rather than decoration everywhere.
3. **Content first.** The complete guide spans five parts and 18 sections. Long-form reading must remain comfortable, navigable, and visually varied.
4. **Motion has a reason.** Animate feedback, changes in state, diagrams, and section transitions. Avoid perpetual floating, bouncing, rotating, glowing, or distracting parallax.
5. **Interactive learning, not gamification.** Exercises should clarify concepts; they should not appear to diagnose the reader or make therapeutic promises.
6. **Truly Arabic-first.** Design in RTL from the start. Arabic text is not a mirrored English layout.
7. **Distinctive but restrained.** Introduce a few memorable designed moments (chapter openings, annotated diagrams, a beautifully composed hero) instead of giving every element a special effect.

## 2. Visual identity and palette

### Core palette

Use these **starting design tokens** consistently; do not sprinkle arbitrary colors throughout the app.

| Token | Hex | Use |
|---|---|---|
| `--background` | `#FAF8F3` | Main page background: warm sugar-white / ivory |
| `--surface` | `#FFFEFB` | Cards, floating panels, reading surfaces |
| `--surface-muted` | `#F1F1E9` | Quiet section bands, diagram backgrounds |
| `--foreground` | `#26342F` | Headings and primary text: deep forest charcoal |
| `--muted-foreground` | `#64716B` | Secondary text and metadata |
| `--primary` | `#557E73` | Main brand accent: muted sage-teal |
| `--primary-hover` | `#45695F` | Hover / pressed emphasis |
| `--primary-soft` | `#E7EFEB` | Selected chips, soft backgrounds, diagrams |
| `--accent` | `#B88862` | Warm clay for sparse emphasis or contrast |
| `--accent-soft` | `#F5ECE3` | Examples, callouts, secondary highlights |
| `--border` | `#E4E5DC` | Fine borders and separators |
| `--focus` | `#346B60` | Visible keyboard focus indicator |
| `--danger` | `#A34B43` | Errors and actual caution states only |

**Color ratios:** approximately 75% background/neutral, 20% sage and tinted surfaces, at most 5% warm accent. These are visual heuristics, not strict pixel counts.

**Avoid:** pure white across all sections, cold hospital-blue, loud saturated purple, fluorescent gradients, dark blobs behind paragraphs, multiple competing accent colors, and muddy low-contrast gray text.

### Gradients

Gradients are **rare accents**, never the default treatment for cards or buttons.
- Use at most one subtle radial or linear gradient in the hero or a major chapter separator, e.g. `from-[#E7EFEB] via-[#FAF8F3] to-[#FAF8F3]` with low opacity.
- A quiet blurred sage wash behind a hero diagram is acceptable; never reduce text contrast.
- Prefer **flat color and fine borders** for 90% of surfaces.
- No shimmering gradients, gradient text on body content, or animated infinite gradients.

## 3. Arabic typography

### Fonts

- **Primary font:** **IBM Plex Sans Arabic**. Use it for body, headings, buttons, navigation, charts and forms. It is modern, dignified, and works well in educational interfaces.
- **Optional editorial display accent:** **Noto Naskh Arabic**, limited to *one* intentional quote, pull-quote, or oversized phrase per long page if the result genuinely improves visual contrast. This is optional; do not load it without using it.
- Use local/system fallbacks: `"IBM Plex Sans Arabic", "Noto Sans Arabic", Tahoma, sans-serif`.
- Load only actually used weights (suggest 400, 500, 600, 700). Self-host if the project supports it; otherwise prefer a reliable font provider. Define `font-display: swap`.
- **Do not force CSS `italic` on Arabic text.** Arabic italic rendering can be inconsistent or synthetic. Achieve expressive headers with size, semibold/bold weights, layout, occasional Naskh accents, and color instead. English scientific terms can be italicized sparingly.

### Type scale (responsive starting points)

| Role | Mobile | Desktop | Weight / line-height |
|---|---|---|---|
| Hero title | `clamp(2.25rem, 6vw, 4.4rem)` | same fluid rule | 700; `1.25–1.38` |
| Chapter title | `clamp(1.9rem, 4vw, 3rem)` | same fluid rule | 700; `1.3–1.45` |
| Section heading | `1.55rem` | `1.9rem` | 700; `1.4` |
| Subheading | `1.2rem` | `1.35rem` | 600; `1.5` |
| Body | `1rem` | `1.0625rem–1.125rem` | 400; `1.9–2.05` |
| Supporting text | `0.875rem` | `0.9375rem` | 400/500; `1.7` |
| Labels / eyebrow | `0.75rem–0.875rem` | same | 600; `1.5` |

- Use comfortable Arabic line-height: **do not apply standard tight Latin typography rules**.
- Limit article paragraphs to roughly **65–78 characters of readable width equivalent** (use `max-w-[70ch]` as a starting point, then assess with Arabic examples).
- Use bold to express hierarchy, **not** bold on entire paragraphs.
- Keep heading tracking normal (`tracking-normal`); negative letter-spacing can damage Arabic shaping.
- Never justify body text (`text-justify`); use natural `text-start` alignment.
- Display Latin acronyms (CBT, ABCDE, ERP, ACT) with correct directional isolation (`bdi` / `dir="ltr"`).

### Signature heading treatment

- A small uppercase-style (in meaning, not literal Arabic capitalization) chapter eyebrow such as `الفصل الثاني · الأسس النظرية` in muted sage.
- Strong Arabic heading with measured line wraps and one short accent line or small circular motif.
- A concise lead paragraph in slightly larger, softer text beneath major headings.
- Emphasize **one short key phrase** per major opening using sage or a subtle underlined accent; not rainbow-highlighted words.
- Optional large chapter number in the margin or background at very low contrast; ensure it is not confusing to screen readers.

## 4. Layout and composition

### Page frame

- `max-w-[1280px]` outer container with `px-4 sm:px-6 lg:px-10`.
- Long-form reading column around `max-w-[720px]` to `max-w-[780px]`.
- On desktop, use **reading column + restrained sticky table of contents** (TOC); supporting sidebar can show active section and progress. Avoid a three-column dashboard feel.
- Mobile: single column, sticky compact top navigation, TOC via shadcn `Sheet` or collapsible chapters.
- Give major sections rhythm with whitespace, illustrations, soft background panels, pull quotes and diagrams—not endless identical cards.
- Vertical spacing: approximately 64–96px between chapters, 36–56px between major sections, 16–24px between related text blocks. Tighten responsibly on small screens.
- Use `scroll-mt-*` to account for sticky navigation; avoid large blank areas.

### Hero

Aim for a confident editorial introduction, **not a SaaS conversion hero**.
- Left/right layout should be composed properly for RTL: substantial Arabic title and summary on the **right**, explanatory visual on the **left** at desktop widths; stack naturally on mobile.
- Small contextual eyebrow: `دليل تفاعلي مبسّط`.
- Headline explains the guide, not a marketing slogan.
- Small, useful CTA: `ابدأ القراءة` and a quieter `استكشف الفصول`.
- One unique, clean visual: an SVG illustration of the interconnection of thoughts, emotions, body responses and behavior, or an abstract conceptual diagram.
- Allow *one* gentle entrance animation on load; not a looping animated hero.
- Add a calm, very light sage halo/gradient behind the illustration if it benefits composition.

### Chapters and sections

- Treat the **five parts** as the primary navigation units and the **18 numbered sections** as meaningful destinations.
- Introduce each chapter with chapter number, title, one-line framing, and optionally a small custom icon/illustration.
- Use alternating **editorial text + SVG explanation** compositions where helpful. Do not alternate merely for visual novelty.
- Translate large tables into responsive cards on narrow screens when necessary, but do not omit comparisons or detail.
- For references and caveats, favor clear, calm treatments over alarmist banners.

## 5. Components and surfaces

Use **shadcn/ui + Tailwind CSS** as the implementation foundation. Override component styling centrally via design tokens instead of repeating long class strings.

- **Buttons:** slightly rounded (`rounded-xl`), medium weight, satisfying hover/press feedback. Primary sage fill with readable light text; secondary cream/outlined. No constant pulsing.
- **Cards:** ivory or muted neutral surfaces, `rounded-2xl` (rarely `rounded-3xl`), delicate 1px border, almost invisible shadow. Use hover lift only if clickable.
- **Callouts:** three intentional variants: `ملاحظة` (sage), `مثال` (clay/cream), `تنبيه` (restrained caution). Include text labels; color alone cannot carry meaning.
- **Tabs/accordions:** useful for related theories, cognitive distortions and exercises. Obvious selected state; preserve keyboard access.
- **Inputs:** large tap targets, clear labels, ample internal padding, visible focus ring. Right-aligned Arabic inputs, correct direction for numerical scales and Latin abbreviations.
- **Chips/badges:** compact, minimal, used only to distinguish a meaningful category (e.g., `تقنية`, `نموذج`, `تمرين`).
- **Icons:** Lucide outline icons with consistent stroke. 16–20px in controls, 24px for highlights; never use icons as mere filler.
- **Dividers:** fine neutral hairlines; avoid heavy boxed sections everywhere.
- **Tables:** high reading comfort, horizontal overflow only inside the table container if card conversion would harm clarity; preserve readable labels.
- **Illustrations:** use the eight existing `cbt_visuals/*.svg` when available; ensure their palette harmonizes with tokens without changing their educational meaning. If imported SVGs contain incompatible colors, wrap on a cohesive surface or carefully restyle them.

## 6. Animation and motion behavior

Animation should feel **quiet, deliberate and tactile**. Default to CSS transitions; add Framer Motion / Motion only if already installed or a specific interaction requires it.

| Interaction | Recommended motion |
|---|---|
| Initial hero appearance | Once: fade + translateY 12–18px; 400–550ms |
| Scroll reveal | Once per element where useful; fade + translateY 8–14px; 300–450ms; no overuse |
| Button hover | Background/border transition 150–200ms; optional translateY -1px |
| Interactive card hover | Border/surface emphasis; up to translateY -2px; 180–220ms |
| Accordion | Smooth expand/collapse around 200–280ms |
| Tabs / step changes | Brief 150–250ms fade; content stays readable |
| Diagram highlighting | 180–280ms opacity/fill/stroke change |
| Progress state | 200–350ms; avoid drawing attention away from reading |

**Strict motion rules:**
- No infinite animations, bouncing arrows, floating cards, auto-scrolling carousels, rotating ornaments, autoplay background videos, or persistent parallax.
- No animated scroll reveals on every paragraph; reserve them for meaningful section openings or diagrams.
- Avoid simultaneous staggered animations across dozens of items.
- Any motion must respect `prefers-reduced-motion: reduce`: disable transforms/entrances and minimize durations.
- Never gate article visibility on JavaScript animation completion; content must always remain available.
- Motion must not prevent reading or cause layout shifts.

## 7. Interactions worth designing beautifully

Aim for **3–5 exceptional interactive learning experiences**, not an interaction on every heading. Each must have a clear educational purpose and an accessible noninteractive explanation.

1. **Interactive cognitive model:** select `الموقف`, `الفكرة`, `المشاعر`, `الجسم`, `السلوك` to highlight relationships and show the same linked example.
2. **ABCDE explainer:** step through the event → belief → consequence → dispute → effective alternative. Provide brief explanatory content and visible step controls; do not imply the event has one fixed interpretation.
3. **Avoidance loop:** tap segments of `توقع الفشل → القلق → التجنب → راحة مؤقتة → استمرار الخوف` to see the short-term benefit versus long-term cost.
4. **Cognitive distortions browser:** easy-to-scan cards or accessible tabs with concise definitions and relatable examples.
5. **Optional private practice tool:** fill in a thought record or plan a small behavioral activation activity. Make it explicitly optional, local-only by default, easy to reset, and not a diagnostic service. Do not store sensitive entries remotely.

For diagrams: use accessible SVG or semantic HTML; focus states, buttons, arrows, and labels must be meaningful in RTL. Avoid making hover the only way to discover information; tap and keyboard must work.

## 8. Reading experience and responsive rules

- **Mobile-first** across ~320px, 375px, 768px, 1024px and wide desktop.
- Minimum interactive target generally **44×44 CSS px**.
- Do not rely on hover on mobile. Prefer click/tap interactions, clear disclosure controls, and readable diagrams.
- Provide a simple progress indicator (optional) and clear previous/next chapter links.
- On desktop: slim sticky TOC with active chapter indication; never obscure article text.
- On phones: compact header with a `الفصول` menu. Avoid bottom drawers that trap long content unless needed.
- Avoid overly wide paragraphs, clipped SVG text, awkward Arabic line breaks, small tables, and left-to-right numbering errors.
- Ensure adequate contrast: body text should meet WCAG AA (4.5:1 normal text); decorative accents may be lighter but should never encode necessary information alone.
- Support system text scaling, keyboard navigation, visible focus, logical heading order, and semantic links/buttons.

## 9. Example Tailwind / CSS design foundations

Adapt these to the project's Tailwind version and existing shadcn tokens; **do not blindly override a working configuration**. These are the aesthetic source of truth, not a requirement to recreate an entire theme implementation.

```css
:root {
  --cbt-bg: #FAF8F3;
  --cbt-surface: #FFFEFB;
  --cbt-surface-muted: #F1F1E9;
  --cbt-ink: #26342F;
  --cbt-muted: #64716B;
  --cbt-sage: #557E73;
  --cbt-sage-hover: #45695F;
  --cbt-sage-soft: #E7EFEB;
  --cbt-clay: #B88862;
  --cbt-clay-soft: #F5ECE3;
  --cbt-border: #E4E5DC;
}

body {
  background: var(--cbt-bg);
  color: var(--cbt-ink);
  font-family: "IBM Plex Sans Arabic", "Noto Sans Arabic", Tahoma, sans-serif;
  line-height: 1.95;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Example utility patterns:

```tsx
// Main reading surface
<main dir="rtl" className="min-h-screen bg-[#FAF8F3] text-[#26342F]">
  <article className="mx-auto max-w-[760px] px-4 py-12 sm:px-6 lg:py-20">
    {/* Arabic-first content */}
  </article>
</main>

// Calm interactive card
<div className="rounded-2xl border border-[#E4E5DC] bg-[#FFFEFB] p-5 transition-[border-color,transform] duration-200 hover:border-[#A7C0B5] motion-safe:hover:-translate-y-0.5">
  {/* Diagram or explanation */}
</div>
```

Use shadcn theme tokens (`background`, `foreground`, `card`, `primary`, `muted`, `border`, `ring`) mapped to the palette rather than hardcoding these values in production components. The snippets above simply communicate the intended appearance.

## 10. Visual quality checklist / acceptance criteria

Before considering the design finished, verify:

- [ ] The site feels warm, quiet, premium, and distinctly Arabic; not like a generic AI-generated landing page.
- [ ] Primary background reads as **sugar-white/off-white**, with sage-teal as the calm secondary color.
- [ ] Arabic typography is beautiful and readable; headlines are bold and distinctive without faux Arabic italics.
- [ ] Content is not an uninterrupted text wall, but also not fragmented into hundreds of cards.
- [ ] All five parts and 18 sections remain accessible and comfortable to read.
- [ ] At least a few key CBT concepts are meaningfully interactive on touch, mouse, and keyboard.
- [ ] Gradients are rare, gentle, and intentional.
- [ ] Motion is subtle, mostly one-shot, and disabled/reduced when requested by the OS.
- [ ] Mobile has no horizontal overflow, clipped diagrams, oversized gaps, or tiny controls.
- [ ] Primary, hover, focus, disabled, selected, expanded, and error states are visually distinguishable.
- [ ] SVG charts and exercises have accessible descriptions and fallback explanations.
- [ ] Source content and clinical safety caveats have not been omitted for aesthetics.

## 11. Avoid list

**Do not use:** neon colors; heavy glassmorphism; pill-shaped everything; exaggerated drop shadows; rainbow gradients; large decorative 3D blobs; continuous motion; carousel-heavy structure; giant center-aligned paragraphs; ultra-light body text; generic brain stock photos; dozens of visually identical tiles; dense dashboard charts; arbitrary shadcn colors; tiny Arabic text; decorative faux italic Arabic; animations that obscure text; design decisions that imply therapy, diagnosis, or measurable treatment outcomes.

**Desired end result:** a refined, responsive, content-rich Arabic CBT guide with gentle visual character, superb typographic hierarchy, clean conceptual SVGs, and a small number of memorable educational interactions.
