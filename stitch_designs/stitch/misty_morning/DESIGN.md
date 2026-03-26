# Design System Specification: The Ethereal Connection

## 1. Overview & Creative North Star
**Creative North Star: The Breathable Interface**

This design system rejects the rigid, high-contrast density of traditional productivity software. Instead, it embraces a "Breathable" philosophy—where the UI acts as a calm, unobtrusive host for human connection. We move beyond the "SaaS look" by prioritizing negative space over borders and tonal layering over drop shadows. 

The experience should feel like a soft morning mist: light, layered, and gently diffused. We break the "template" look through intentional asymmetry in layout, generous vertical rhythm, and a sophisticated interplay between two distinct sans-serifs that balance editorial authority with approachable warmth.

---

## 2. Colors & Surface Philosophy
The palette is rooted in low-chroma blues and warm neutrals to reduce cognitive load and evoke a sense of psychological safety.

### The Palette
*   **Background (`#f7f9fb`):** The canvas. Always use this as the base to keep the experience feeling "airy."
*   **Primary (`#3d637e`) & Primary Container (`#b3d9f9`):** Our misty blue accents. Use the Container for large interactive surfaces and the Primary for high-contrast labels.
*   **Surface Tiers:** 
    *   `surface_container_lowest` (#ffffff): Use for floating cards and primary content blocks.
    *   `surface_container_low` (#f0f4f7): Use for subtle sectional grouping.

### The "No-Line" Rule
Strictly prohibit 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. To separate a card from the background, rely on the transition from `surface` to `surface_container_lowest`. 

### The "Glass & Gradient" Rule
To add a premium "soul," use subtle linear gradients on CTAs.
*   **CTA Gradient:** `primary` to `primary_dim`.
*   **Glassmorphism:** For floating navigation or modal overlays, use `surface_bright` at 80% opacity with a `24px` backdrop-blur. This ensures the interface feels integrated and "liquid" rather than static.

---

## 3. Typography
We utilize a dual-typeface system to create a sophisticated, editorial rhythm.

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its wide apertures and modern geometric shapes. Use `display-lg` (3.5rem) with `-0.02em` letter spacing to create a bold, confident entry point.
*   **Body & Titles (Manrope):** A highly rounded functional sans-serif. Manrope’s organic curves mirror our "pill" shape language.
*   **Hierarchy as Identity:** Use `headline-lg` for icebreaker questions to give them weight and importance. Use `label-md` in all-caps with `0.05em` tracking for category tags to provide a "curated" feel.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering**, not structural reinforcement.

*   **The Layering Principle:** Stacking is the primary way to show hierarchy.
    *   *Level 0:* `surface` (Background)
    *   *Level 1:* `surface_container_low` (Sectional grouping)
    *   *Level 2:* `surface_container_lowest` (Interactive Cards)
*   **Ambient Shadows:** If a card requires a "lift" (e.g., during a drag interaction), use a custom shadow: `0px 20px 40px rgba(61, 99, 126, 0.08)`. The shadow must be tinted with the `primary` hue to maintain the misty atmosphere.
*   **The Ghost Border:** For accessibility on white surfaces, use `outline_variant` (#acb3b7) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons & Interaction
*   **Primary Button:** Pill-shaped (`rounded-full`). Use the `primary` gradient. Minimum height of `3.5rem` (Spacing 10) to ensure a "soft" touch target.
*   **Secondary/Ghost:** No container. Use `primary` text with a `title-md` weight.

### Cards & Icebreaker Containers
*   **The Question Card:** Use `surface_container_lowest` with a `2rem` (xl) corner radius. 
*   **Constraint:** Forbid the use of divider lines. Separate the "Category" from the "Question" using a `1.4rem` (Spacing 4) vertical gap.

### Chips & Tags
*   **Selection Chips:** Use `secondary_container` for inactive states and `primary_fixed` for active. Shapes must always be `rounded-full`.

### Input Fields
*   **Text Inputs:** Use `surface_container_high` as a filled background rather than an outlined box. Corner radius: `1rem` (DEFAULT). 

### Custom Component: The "Breath" Indicator
*   A soft, pulsating `primary_container` glow behind active icebreaker questions to subtly nudge the user into a calm state.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical padding. A card can have `2.75rem` (8) top padding and `2rem` (6) bottom padding to feel more organic.
*   **Do** embrace "Wasted Space." If a screen feels empty, it is likely working. Let the misty blue background breathe.
*   **Do** use `plusJakartaSans` for numbers. It creates a beautiful, custom-type feel for timers or counters.

### Don't
*   **Don't** use pure black (#000000) for text. Always use `on_surface` (#2c3437) to maintain the soft, human-centric contrast.
*   **Don't** use standard Material Design 8dp grids. Use our Spacing Scale (based on 0.35rem increments) to create a custom, rhythmic flow.
*   **Don't** use "hard" animations. All transitions should be `cubic-bezier(0.23, 1, 0.32, 1)` (Ease Out Quint) to mimic natural, fluid movement.