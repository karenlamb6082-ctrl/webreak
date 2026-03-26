# Design System Specification: The Humanistic Editorial

## 1. Overview & Creative North Star
**Creative North Star: The Digital Stationery**
This design system rejects the "app-like" rigidity of modern SaaS interfaces in favor of the tactile, breathable quality of high-end editorial print. Designed specifically for a mobile-first WeChat icebreaker tool, the goal is to lower social anxiety through visual serenity. 

We move beyond the template by utilizing **intentional asymmetry** and **tonal depth**. Rather than using lines to box users in, we use "white space as a component." The experience should feel like a series of premium cards laid out on a clean linen desk—human-centric, calm, and profoundly intentional.

---

## 2. Colors & Surface Philosophy
The palette is rooted in "Misty Blue" and "Soft Slate," designed to eliminate optical fatigue.

### The Tonal Palette
- **Background (`#f7f9fb`):** A soft, expansive base that feels more organic than pure white.
- **Primary (`#466178`):** An authoritative but muted blue for key actions.
- **Surface Container Lowest (`#ffffff`):** Reserved for "Hero Cards" to create a natural "pop" against the off-white background.
- **Misty Accents (`primary_container` / `#cbe6ff`):** Used for soft highlights and subtle focus states.

### The "No-Line" Rule
**Borders are a failure of hierarchy.** In this system, 1px solid borders are strictly prohibited for sectioning. 
- **Method:** Define boundaries through background shifts. A `surface_container_low` section sitting on a `surface` background provides all the separation a user needs.
- **Glassmorphism:** For floating elements (like a navigation bar or a sticky CTA), use `surface` colors at 80% opacity with a `12px` backdrop-blur. This allows the content to "bleed" through, softening the interface.

---

## 3. Typography: The Editorial Scale
We use **Manrope** for its geometric yet warm character. Hierarchy is driven by **weight and letter-spacing** rather than aggressive scaling.

| Role | Token | Weight | Letter Spacing | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-md` | 600 (Semibold) | -0.02em | High-impact intro screens |
| **Headline** | `headline-sm` | 500 (Medium) | -0.01em | Section titles |
| **Title** | `title-md` | 600 (Semibold) | 0.01em | Card headers / Question text |
| **Body** | `body-lg` | 400 (Regular) | 0 | Primary reading text |
| **Label** | `label-md` | 700 (Bold) | 0.05em | Uppercase tags / Metadata |

*Director’s Note: When in doubt, increase the `line-height` (leading) to 1.6x for body text. We want the words to breathe.*

---

## 4. Elevation & Depth
Traditional drop shadows are too "digital." We use **Tonal Layering** to convey importance.

- **The Layering Principle:** 
  1. Base: `surface`
  2. Content Section: `surface_container_low`
  3. Interactive Card: `surface_container_lowest` (Pure White)
- **Ambient Shadows:** Only used for "floating" elements. Use a large spread (24px) at 4% opacity, tinted with the `on_surface` color (`#2a3439`). It should be felt, not seen.
- **The Ghost Border:** If a form field requires a container, use the `outline_variant` token at **15% opacity**. High-contrast outlines are forbidden.

---

## 5. Components & Interaction

### Buttons
- **Primary:** `primary` background with `on_primary` text. Use `xl` (3rem) rounding. No shadows.
- **Secondary:** `secondary_container` background. 
- **Interaction:** On press, scale the button to 98% rather than changing color. It feels more "tactile."

### Chips (Icebreaker Tags)
- **Style:** Pill-shaped (`full` rounding).
- **Unselected:** `surface_container_high` with `on_surface_variant` text.
- **Selected:** `primary_container` background with `on_primary_container` text.
- **Logic:** Chips should have generous horizontal padding (`spacing-4`).

### Input Fields
- **Minimalist Approach:** No box. Use a subtle bottom-border (`outline_variant` at 20%) or a `surface_container_low` rounded rectangle (`md`).
- **Focus State:** Transition the background to `primary_container` at 30% opacity.

### Cards & Lists
- **The "No-Divider" Rule:** Never use a horizontal line to separate list items. Use `spacing-3` or `spacing-4` vertical gaps.
- **Nesting:** Place a pure white card (`surface_container_lowest`) on a `surface_container_low` background for an effortless, premium look.

### Specific WeChat Context: "The Icebreaker Bubble"
For the primary interaction (e.g., a conversation prompt), use a custom component:
- Large `xl` (3rem) rounding on three corners, with one corner at `sm` rounding to mimic a speech bubble.
- Gradient: A very subtle linear gradient from `surface_container_lowest` to `primary_container` (at 10% opacity) to give it a "soul."

---

## 6. Do’s and Don’ts

### Do
- **Do** use asymmetrical margins. For example, a `headline-lg` might have a larger top margin than bottom margin to feel "placed" rather than "calculated."
- **Do** use the `spacing-12` (4rem) and `spacing-16` (5.5rem) values for top-of-page breathing room.
- **Do** ensure all touch targets are at least 48dp, even if they look "minimal."

### Don't
- **Don't** use pure black (`#000000`). Use `on_surface` (`#2a3439`) for all "dark" text.
- **Don't** use standard Material Design "elevated" cards with 10% black shadows.
- **Don't** use icons with varying stroke weights. Use a consistent 1.5px or 2px "Light" icon set to match the Manrope weight.
- **Don't** cram content. If a screen feels full, it needs a second page or a scrollable "sheet."