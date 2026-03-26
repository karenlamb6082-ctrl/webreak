# Design System: Editorial Serenity

## 1. Overview & Creative North Star: "The Mindful Dialogue"
This design system is built to facilitate human connection through a lens of "The Mindful Dialogue." Unlike traditional social tools that prioritize dopamine-driven urgency, this system is an exercise in restraint, breath, and digital hospitality. 

The **Creative North Star** is to move away from "software" and toward "stationery." We achieve this through **Intentional Asymmetry**—placing elements off-center to mimic the natural layout of a handwritten letter—and **High-Scale Contrast**, where oversized display type meets generous white space. This breaks the "SaaS template" feel by creating an environment that feels curated and quiet, allowing the nuance of Chinese typography and social interaction to take center stage.

---

## 2. Color Strategy: Misty Atmosphere
Our palette is not merely decorative; it simulates a physical environment of mist and soft light.

- **The "No-Line" Rule:** Standard 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface_container_low` section sitting on a `surface` background creates a clear but soft distinction without the "boxed-in" feel of a grid.
- **Surface Hierarchy & Nesting:** Treat the UI as layers of fine paper. Use `surface_container_lowest` (#ffffff) for primary interactive cards, nested within `surface_container` (#e8eff1) page sections. This creates a tactile sense of depth where the most important information "floats" to the top through lightness, not shadows.
- **The "Glass & Gradient" Rule:** To provide a signature "human" touch, use Glassmorphism for floating navigation bars or modal headers. Utilize `surface` with a 70% opacity and a `20px` backdrop-blur. 
- **Signature Textures:** For primary CTAs, do not use flat fills. Use a subtle linear gradient from `primary` (#48626e) to `primary_dim` (#3c5662) at a 135-degree angle. This adds a "soulful" weight that feels premium and intentional.

---

## 3. Typography: The Humanist Script
The system pairs the approachable geometry of **Plus Jakarta Sans** with the clean, rhythmic legibility of **Be Vietnam Pro** (serving as a proxy for high-quality Sans-Serif Chinese typefaces like *Noto Sans SC* or *PingFang SC*).

- **Display & Headlines:** Use `display-lg` and `headline-md` in `on_surface` (#2a3437) to anchor the page. These should be set with a slightly tighter letter-spacing (-0.02em) to feel like editorial titling.
- **Body & Chinese Optimization:** For Chinese characters, the `body-lg` (1rem) is the gold standard. To ensure readability and "airiness," set the line-height for all Chinese body text to **1.7x or 1.8x**. This prevents the dense blocks of characters common in standard apps and allows the reader's eye to glide through conversations.
- **Hierarchy of Intent:** Use `label-md` in `on_surface_variant` (#566164) for metadata. The contrast between the bold, dark headlines and the soft, gray-blue metadata creates a sophisticated "human-designed" hierarchy.

---

## 4. Elevation & Depth: Tonal Layering
We reject the heavy drop-shadows of the early 2010s. Depth is achieved through light and atmospheric layering.

- **The Layering Principle:** Stacking is our primary tool. Place a `surface_container_lowest` card (White) on a `surface` background (#f8fafb). The 2% shift in brightness is enough for the human eye to perceive a "lift."
- **Ambient Shadows:** When an element must float (e.g., a floating action button), use an extra-diffused shadow: `box-shadow: 0 12px 32px -4px rgba(42, 52, 55, 0.06)`. Note the use of `on_surface` as the shadow tint rather than pure black; this ensures the shadow feels like a natural part of the "Misty Blue" environment.
- **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in high-contrast modes), use a "Ghost Border" using `outline_variant` at **20% opacity**. It should be felt, not seen.
- **Corner Radii:** Use the `lg` (1rem) radius for primary cards to feel soft but professional. Use `DEFAULT` (0.5rem) for smaller nested elements like input fields. Avoid "pill" shapes for large containers, as they feel too "playful" and lose the premium editorial edge.

---

## 5. Components: The Social Primitives

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_dim`), `on_primary` text. Radius: `md`.
- **Secondary:** `surface_container_high` background with `on_secondary_container` text. No border.
- **Tertiary:** Pure ghost style. `on_surface` text with no background. Interaction state uses a 5% `primary` tint.

### Input Fields
- **Refined Inputs:** Forgo the 4-sided box. Use a `surface_container_low` background with a subtle bottom-stroke of `outline_variant` (20% opacity). This creates an "underline" feel reminiscent of physical forms.
- **Chinese Labels:** Labels should use `label-md` and be placed *inside* the container top-left to maximize vertical space on mobile.

### Cards & Lists
- **No Dividers:** Forbid the use of 1px lines between list items. Instead, use a `1.4rem` (`spacing.4`) vertical gap. 
- **The "Icebreaker" Card:** Use a `surface_container_lowest` background, `xl` corner radius, and an asymmetric layout—text aligned left, with a small decorative "dot" using `primary_fixed_dim` in the top right to break the symmetry.

### Chips
- **Status Chips:** Use `secondary_container` with `on_secondary_container` text. Keep the radius to `full` for these small elements to distinguish them from interactive buttons.

---

## 6. Do’s and Don'ts

### Do:
- **Embrace White Space:** Use `spacing.8` (2.75rem) between major sections. If it feels too empty, you are doing it right.
- **Use "Human" Layouts:** Align headers to the left, but place supporting imagery or icons slightly off-grid to the right.
- **Optimize for Reading:** Ensure Chinese characters never exceed 20-25 characters per line for maximum comfort.

### Don’t:
- **Don't use pure black:** Use `on_surface` (#2a3437) for text to maintain the misty, soft-contrast aesthetic.
- **Don't use "SaaS Blue":** Avoid vibrant, electric blues. Stick strictly to the `primary` (#48626e) muted gray-blue.
- **Don't box everything:** Avoid putting every piece of content in a card. Let some text sit "naked" on the `surface` background to create rhythm.