# Design System: The Misty Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system moves away from the "utility-first" aesthetic of standard mobile apps toward a high-end, editorial experience. For a WeChat Icebreaker generator, the interface must feel like a premium stationery set—quiet, intentional, and tactfully organized. We achieve this by rejecting the "boxed-in" layout of traditional apps. Instead, we use **intentional asymmetry, overlapping surfaces, and extreme whitespace** to create a sense of breathing room. The goal is "Effortless Sophistication": the UI should disappear, leaving only the content to shine.

---

## 2. Colors: The Misty Blue Palette
Our palette is rooted in low-saturation tones that mimic a morning fog over a lake. It is designed to reduce cognitive load and evoke a sense of calm.

### The Palette (Material Mapping)
*   **Primary (`#4b6173`):** Used for key actions and focus states. It provides the "anchor" for the eyes.
*   **Surface Lowest (`#ffffff`):** Reserved for the "Icebreaker Cards" themselves—pure, clean, and highlighted.
*   **Surface (`#f7f9fc`):** The standard canvas background.
*   **Surface Container Low (`#f0f4f8`):** Used for subtle sectioning.
*   **On-Surface (`#29343a`):** Our "Deep Grey-Blue" for maximum legibility without the harshness of pure black.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to separate sections. 1px lines create visual "noise" that disrupts the misty atmosphere.
*   **Boundaries:** Defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background is all the definition needed.
*   **Nesting:** To create depth, stack tiers. Place a `surface-container-lowest` card on top of a `surface-container-low` background. This creates a soft, natural lift.

### Glass & Texture
*   **Floating Elements:** Use Glassmorphism for floating action buttons or headers. Apply a semi-transparent `surface` color with a `backdrop-blur` of 20px.
*   **Subtle Polish:** While the base is flat, use a very faint gradient—`primary` to `primary_container`—only on the main "Generate" CTA to give it a "jewel" effect.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) with **Be Vietnam Pro** (Body/Labels) to balance modern geometry with high readability.

*   **Display-LG (3.5rem, Manrope):** Use for large numeric indicators or single-word impact statements.
*   **Headline-SM (1.5rem, Manrope):** The primary heading for card categories.
*   **Body-LG (1rem, Be Vietnam Pro):** The standard for "Icebreaker Questions." Large enough to feel premium; enough line-height (1.6) to feel breezy.
*   **Label-MD (0.75rem, Be Vietnam Pro):** Used for metadata (e.g., "Category: Career"). Should always be in `on_surface_variant` or `secondary` to maintain hierarchy.

**Design Note:** Use asymmetrical alignment. For example, a `Headline-SM` left-aligned with a 3.5rem margin, while the `Body-LG` text below it starts at a 5.5rem margin. This "staircase" effect breaks the grid and feels custom-designed.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are forbidden. We use the environment to create depth.

*   **The Layering Principle:** Use the `surface-container` tiers (Lowest to Highest) to define importance. The most interactive element (the Card) should always be `surface-container-lowest` (#FFFFFF).
*   **Ambient Shadows:** If a card must "float" during a drag interaction, use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(75, 97, 115, 0.08)`. Note the tint: the shadow is a soft blue-grey, not black.
*   **The Ghost Border Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Soft & Intentional

### The Card (The Hero)
*   **Style:** `surface-container-lowest` (#FFFFFF).
*   **Radius:** `xl` (3rem) for the outer container, `lg` (2rem) for inner content blocks.
*   **Interaction:** No borders. Content is separated by `spacing-8` (2.75rem) of vertical whitespace.

### Pill-Style Tags (The "Chips")
*   **Style:** `secondary-container` background with `on-secondary-container` text.
*   **Shape:** `full` (9999px).
*   **Context:** Used for "Tags" like #Funny, #Deep, or #Work. They should feel like soft pebbles on the screen.

### Buttons
*   **Primary:** `primary` background, `on-primary` text. No shadow. Large padding (`spacing-4` top/bottom).
*   **Secondary:** `surface-container-high` background. No border.
*   **Tertiary:** Text-only using `primary` color, bold weight.

### Input Fields
*   **Style:** Minimalist. No bottom line. Instead, use a `surface-container-low` rounded rectangle (`md`: 1.5rem) with a soft placeholder in `on-surface-variant`.

### Suggested Component: The "Mist" Transition
When scrolling between card categories, use a subtle fade-to-background gradient at the top and bottom of the list to simulate cards appearing and disappearing into the "mist."

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place labels in non-traditional spots (e.g., a vertical label on the far left) to give an editorial feel.
*   **Embrace Whitespace:** If you think there is enough space, add 20% more.
*   **Prioritize Chinese Typography:** When rendering in Simplified Chinese, increase line-height to `1.8` to ensure the complex characters don't feel "cluttered" in the misty aesthetic.

### Don’t:
*   **No Dividers:** Never use a horizontal line to separate list items. Use a `0.35rem` background color shift or `2rem` of empty space.
*   **No High Contrast:** Avoid using pure Black (#000000) or high-saturation colors. 
*   **No Sharp Corners:** Every corner must be at least `sm` (0.5rem), but ideally `lg` (2rem) or `xl` (3rem) for the core experience.
*   **No Heavy Motion:** Transitions should be slow and linear-out (e.g., 400ms "Slide & Fade"). Avoid "bouncy" or "elastic" animations that feel too "app-like."