# AGENTS.md — Arabic CBT Educational Website

## 1. Mission
Build a polished, interactive, responsive **Arabic-first educational website** that turns `CBT.md` into an approachable, comprehensive introduction to psychotherapy and cognitive behavioral therapy (CBT). The website is a **reading and learning experience**, not a therapy, diagnosis, or treatment service.

**Primary goal:** Make every major concept and example in `CBT.md` easy to discover, understand, and remember through excellent typography, thoughtful diagrams, and purposeful interactions.

**Audience:** Arabic-speaking readers without a psychology background. Keep the language clear, respectful, and educational; retain English technical terms in parentheses where the report does.

## 2. Source of truth and content fidelity
- **`CBT.md` is the canonical source** for the site's subject matter, scope, examples, terminology, and references. Read the entire file before implementing content.
- Cover **all five parts and all 18 numbered sections**, including their subsections, examples, tables, exercises, limitations, and references. Do not reduce the website to a landing page or a few highlight cards.
- You may reorganize presentation into navigable chapters, tabs, cards, diagrams, and exercises, but **do not silently omit, change, or invent psychological claims**. Keep meaningful distinctions and nuances from the report.
- Preserve the difference between approaches, theories, case formulations, models, interventions, and practical tools; do not treat them as interchangeable.
- Keep the safety caveats: CBT is not compulsory positive thinking; pain is not always caused by thoughts; ERP/exposure are not instructions to ignore real risks; some activities require professional guidance; content is educational and not a substitute for qualified care.
- Preserve the references section with working links; do not manufacture citations or efficacy statistics.
- Keep real-world scenarios consistent with the report, especially the unanswered message, public-speaking anxiety, and job-interview examples.
- Do not add a backend, accounts, AI therapist, symptom diagnosis, or user profiling unless explicitly requested.

## 3. Technology and existing project
- Use **React + TypeScript + Tailwind CSS + shadcn/ui**. If the repository already has an app/framework/toolchain, **follow its existing conventions** instead of migrating it. If starting fresh, prefer **Vite + React + TypeScript** for this static educational site.
- Use shadcn/ui primitives for UI controls: Button, Card, Tabs, Accordion, Tooltip, Dialog, Sheet, Slider, Progress, etc. Use Lucide icons where they add meaning.
- Keep dependencies minimal; use CSS/Tailwind for most animations and add a motion library only where it provides a measurable benefit.
- Keep content structured and maintainable: reusable section layouts, navigation metadata, shared diagram components, and isolated interactive examples. Avoid repeating large blocks of text in component files.
- Reuse the provided SVG assets in `cbt_visuals/` when available (see asset map below). Prefer SVG for diagrams and avoid substituting decorative stock photos for explanatory visuals.
- Before coding, inspect the repository, installed dependencies, existing design system, and actual asset paths. Do not assume the starter project structure.

## 4. Language, typography, and direction
- **All website-facing copy is Arabic**: labels, navigation, buttons, tooltips, instructions, empty states, and accessible names. Use English only for standard scientific terms/acronyms as in the source.
- Set document `<html lang="ar" dir="rtl">` and use RTL-aware layouts throughout.
- Use a readable Arabic font (e.g. **IBM Plex Sans Arabic** or **Tajawal**) with sensible system fallbacks. Avoid excessive font weights and cramped line heights.
- Handle mixed RTL/LTR content carefully: isolate English acronyms, identifiers, URLs, and ABC/ABCDE letters with `dir="ltr"` / `bdi` where necessary.
- Prefer Tailwind logical utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `text-start`, `text-end`) over left/right assumptions. Verify icons, arrows, ordered flows, and breadcrumb direction visually.
- Treat mobile first; support narrow phones (approximately 320px) through wide desktop layouts without horizontal scrolling.

## 5. Look and feel
- Design direction: **clean, modern, calm, editorial, approachable, trustworthy** — a thoughtful learning resource, not a medical dashboard or flashy marketing site.
- Use a restrained palette (neutral/off-white surfaces, dark legible text, one primary accent and a small number of semantic colors). Consistent design tokens for light/dark themes if a theme toggle is added.
- Use generous whitespace, a comfortable reading width, strong heading hierarchy, subtle borders, and concise cards. Long text remains readable; avoid placing every paragraph inside a card.
- Build a beautiful opening hero that explains CBT and provides clear paths to **ابدأ القراءة** and **استكشف النماذج**.
- Keep diagrams visually coherent: consistent colors, rounded forms, spacing, labels, and icon style.
- Avoid endless/infinite loops, parallax-heavy effects, giant background blobs, excessive gradients, animated everything, or animations that distract from reading.

## 6. Motion principles
- Animations should be **subtle, infrequent, and meaningful**: small fades/translations on entry, accordion expansion, tab changes, hover/focus feedback, and diagram-step transitions.
- Typical durations: **150–300ms** for UI feedback, up to **450ms** for a meaningful staged explanation. Avoid delaying content availability for animation.
- **No continuous/infinite animations** and no auto-playing carousels. Prefer user-triggered transitions.
- Support `prefers-reduced-motion: reduce` and ensure all information remains available with animations disabled.
- Do not make scrolling depend on JavaScript animation; no scroll hijacking.

## 7. Information architecture — full coverage required
the information are under `docs\CBT.md` file and there are some assets under `docs\assets` Don't include SVG directly read the SVG to understand how they are. for image don't place it read it and understand and converted to HTML component. Don't use the design from these assets just take the inspiration from these assets. 


Include the **original reference list** and the educational/not-medical-advice disclaimer at the end and, where useful, near interactive exercises.

## 8. Recommended page structure and navigation
- A compact, clear home/hero followed by a chapter-based learning experience. Either a well-structured single-page guide with section anchors or chapter routes is acceptable; choose what is best for readability and navigation in the existing project.
- Desktop: persistent, unobtrusive table of contents/sidebar with nested sections and active-section indication.
- Mobile: header with a **Sheet** navigation drawer, large-enough tap targets, and an obvious route back to the contents.
- Display chapter progress and current position without gamification pressure. Preserve reading location in the URL via hashes/routes so sections can be shared.
- Add a glossary or inline definitions for important terms (CBT, REBT, ERP, beliefs, distortions, exposure), without hiding core explanations behind hover-only tooltips.
- Include in-page search only if implemented well; coverage, clarity, and reliable navigation take priority.

## 9. Meaningful interactions to build
Create small, **optional, client-side learning demonstrations**, not diagnostic tools:

1. **Interactive cognitive model** — select a situation or element to see how thought, emotion, bodily response, and behavior influence each other; emphasize that the relationship is not a rigid one-way chain.
2. **ABCDE walkthrough** — move through A→B→C→D→E using the unanswered-message example; optionally let readers enter a fictional example and compare alternative interpretations. Never imply a single mandatory "correct" thought.
3. **Belief layers / cognitive distortions** — expand each level or distortion to reveal the report's definition and example; preserve all ten distortions.
4. **Avoidance cycle** — click through trigger → prediction → anxiety → avoidance → short-term relief → persistent fear; reveal where an alternative response might interrupt the cycle.
5. **Behavioral activation mini-planner** — select a few sample activities and place them in a simple week view; describe it as an illustration, not a treatment prescription.
6. **Exposure ladder** — show graduated, low-to-high public-speaking example steps; interaction is explanatory only, not a personalized exposure-treatment plan.
7. **Thought record** — optional editable fields mirroring the source's record. Use locally held state by default and a clear reset; do not submit or silently store sensitive entries.
8. **Integrated case exploration** — select a part of the public-speaking case to see its related CBT technique and expected learning goal.

Do not force interaction to read the full content. All key explanations must also work in a straightforward, accessible reading mode. Prefer a handful of strong interactions to dozens of shallow gimmicks.

## 10. Visual asset map
If the `docs/assets/` directory exists, reuse these files and ensure the website includes appropriate Arabic alt text and nearby explanations:

| Existing SVG | Relevant sections |
|---|---|
| `01-cbt-waves.svg` | 3 — historical waves |
| `02-cognitive-model.svg` | 4 — cognitive model |
| `03-belief-levels.svg` | 4.1 — belief levels |
| `04-avoidance-cycle.svg` | 6 — avoidance cycle |
| `05-abcde-model.svg` | 7 — ABCDE |
| `06-exposure-ladder.svg` | 9.2 / 13 — graduated exposure |
| `07-behavioral-activation.svg` | 9.1 — behavioral activation |
| `08-case-formulation.svg` | 13 / 14 — case formulation |

Prefer enhancing these with surrounding interactive UI instead of injecting click handlers into an opaque SVG. If a diagram must be genuinely interactive, create a separate accessible React-based visualization using semantic controls. Do not assume the SVG files alone implement keyboard-accessible interactions.

## 11. Responsive behavior and accessibility
- Semantic headings, sections, navigation landmarks, ordered lists, and accessible labels. Heading order must reflect the source hierarchy.
- Keyboard-accessible interactive controls; visible focus states; no information dependent solely on hover, motion, or color.
- Respect contrast requirements; support 200% text zoom and readable line lengths.
- Make tables accessible and responsive (scrollable table wrapper or well-labeled stacked mobile rendering) without losing information.
- Make SVGs responsive; provide alternative text and textual equivalents for instructional diagrams.
- Test actual RTL flow on phone, tablet, and desktop, especially mixed Arabic/English text and arrows.
- Don't Use `aria-*` attributes

## 12. Performance, privacy, and implementation standards
- Fast first load, no unnecessary heavy bundles; lazy-load complex visualizations only when helpful.
- No backend required for reading and demonstrations. No analytics or third-party trackers by default.
- Do not persist user's private mental-health-related inputs by default. If local persistence is later added, it must be explicit and transparent.
- TypeScript strictness and small reusable components; consistent formatting and naming.
- Implement clean loading/error/empty states only where actually relevant; avoid placeholder interactions that do nothing.
- Avoid gratuitous component abstractions and unnecessary architecture. Optimize for simple, understandable code.
- Where practical, add tests for logic-heavy interactions and ensure the project builds and lint/type checks pass.

## 13. Suggested implementation sequence
1. Audit repository, `CBT.md`, and SVG assets.
2. Establish typography, RTL foundations, design tokens, page shell, and responsive navigation.
3. Implement **complete written content coverage** and source-linked metadata first.
4. Integrate diagrams at their relevant sections.
5. Build the selected meaningful interactions and mobile adaptations.
6. Add restrained motion and reduced-motion support.
7. Validate content against the coverage checklist, then run build/type/lint checks and review small/mobile and desktop screens.

## 14. Definition of done
- [ ] Every part and all 18 sections of `CBT.md` are represented without substantive omissions.
- [ ] All 14 psychotherapy approaches, 10 cognitive distortions, key examples, exercises, six concept hierarchy levels, and source references are accessible.
- [ ] The full website is Arabic-first and reads correctly in RTL, including mixed-script technical terms.
- [ ] Existing CBT diagrams are meaningfully integrated, responsive, and explained.
- [ ] Interactive exercises teach concepts clearly, work with mouse/touch/keyboard, and do not claim to provide therapy or diagnosis.
- [ ] Layout works well on narrow phones, tablets, and desktops.
- [ ] Motion is deliberate, short, non-looping, and disabled/reduced for users requesting reduced motion.
- [ ] No broken navigation, dead buttons, missing content, invented medical claims, or unnecessary user-data collection.
- [ ] Project passes available build, type-check, and lint steps.

## 15. Working principle
**Prioritize clarity over cleverness, learning over decoration, and completeness over superficial polish.** Make the site feel like an illustrated interactive Arabic textbook: engaging but calm, comprehensive but navigable, and practical without presenting itself as professional mental-health care.
