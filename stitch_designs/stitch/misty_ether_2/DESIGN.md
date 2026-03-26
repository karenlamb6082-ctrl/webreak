```markdown
# Design System Specification: The Atmospheric Interface

This document defines a visual language centered on breathability, light, and soft transitions. It rejects the rigid, boxy constraints of traditional SaaS interfaces in favor of a "Misty Ether" aesthetic—an environment where utility is felt through spatial harmony rather than structural force.

---

## 1. Creative North Star: The Ethereal Canvas
The North Star for this design system is **"The Ethereal Canvas."** Unlike traditional interfaces that "stack" components on top of a background, this system treats the UI as a single, fluid atmosphere. 

To break the "template" look, we prioritize:
*   **Intentional Asymmetry:** Avoid perfectly centered grids. Use staggered layouts to create a sense of organic movement.
*   **Tonal Breathability:** Value is communicated through the space *between* objects rather than the objects themselves.
*   **Weight over Color:** Hierarchy is established by shifting font weights (e.g., SemiBold to Regular) and scale, maintaining a unified, low-contrast color palette to reduce cognitive load.

---

## 2. Color Strategy & Surface Logic

We move away from high-contrast "Dark Mode" or "Industrial Gray" palettes. Every hex code is chosen to mimic the soft light of an overcast morning.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or containment. 
*   Boundaries must be defined solely through background color shifts. 
*   A `surface-container-low` (#f0f4f7) section should sit directly against a `surface` (#f7f9fb) background. 
*   If separation is needed, use a `32px` (Spacing Scale 8) gap rather than a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine vellum.
1.  **Base Layer:** `surface` (#f7f9fb)
2.  **Interaction Layer:** `surface-container-low` (#f0f4f7) for secondary content.
3.  **Hero/Focus Layer:** `surface-container-lowest` (#ffffff) for primary cards and active focal points.

### The Glass & Gradient Rule
To provide "soul" to the layout, use subtle tonal transitions.
*   **CTAs:** Use a soft gradient from `primary` (#50606f) to `primary-container` (#d3e4f6) at a 135-degree angle.
*   **Floating Elements:** Use `backdrop-blur: 12px` combined with a semi-transparent `surface-container-lowest` (80% opacity) to create a "frosted glass" effect that allows background colors to bleed through.

---

## 3. Typography: The Editorial Voice

We use **Manrope** exclusively. Its geometric yet humanist curves provide the "human-designed" utility required.

*   **Display Scale (`display-lg` to `display-sm`):** Reserved for moments of reflection or section headers. Use `letter-spacing: -0.02em` and `font-weight: 500`.
*   **Headline Scale:** The workhorse of the system. Maintain generous `line-height: 1.4` to ensure the "Airy" aesthetic.
*   **The Weight Shift:** To distinguish a title from body text, move from `SemiBold (600)` to `Regular (400)`. Do not use a darker color; stay within the `on-surface-variant` (#566166) or `primary` (#50606f) range.
*   **Letter Spacing:** Increase letter spacing for `label-sm` and `label-md` by `0.05em` to ensure legibility despite the low-contrast palette.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "heavy" for this system. We convey depth through **Ambient Light**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on top of a `surface-container` section. The delta in brightness provides all the "lift" necessary.
*   **Ambient Shadows:** If a floating element (like a dropdown or modal) requires a shadow, it must use the `on-surface` color at 4% opacity with a `40px` blur and `12px` Y-offset. It should feel like a soft glow, not a shadow.
*   **The Ghost Border Fallback:** If a container lacks enough contrast against its background (e.g., accessibility requirements), use a "Ghost Border": `outline-variant` (#a9b4b9) at **15% opacity**.

---

## 5. Components & Primitive Styling

### Shapes (The Cloud Feel)
All interactive containers and cards must use the **xl (3rem/48px)** or **lg (2rem/32px)** corner radius. Small elements like buttons use the **full (9999px)** "pill" radius.

### Buttons
*   **Primary:** A pill-shaped container using `primary` (#50606f) with `on-primary` (#f3f8ff) text. No shadows.
*   **Secondary:** `surface-container-high` (#e1e9ee) background with `on-surface` text.
*   **Tertiary:** Ghost style. No background, only `label-md` typography with an active hover state of 5% opacity `primary`.

### Input Fields
*   **Form Logic:** Use `surface-container-lowest` (#ffffff) for the input area. 
*   **Focus State:** Do not use a heavy blue ring. Transition the background to `surface-container-highest` (#d9e4ea) or use a "Ghost Border."
*   **Error States:** Use `error` (#9f403d) for text, but the container should use `error_container` (#fe8983) at 20% opacity to maintain the soft aesthetic.

### Cards & Lists
*   **Zero-Divider Policy:** Forbid the use of horizontal rules (`<hr>`). 
*   **Separation:** Use a vertical spacing of `1.4rem` (Spacing Scale 4) between list items. Use a subtle background shift on hover to `surface-container-low` to indicate interactivity.

### Navigation (The Floating Dock)
Instead of a top bar, use a floating bottom dock or a sidebar with a **32px** radius. Use Glassmorphism (backdrop-blur) to ensure it feels integrated into the atmosphere.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use white space as a structural element. If a layout feels "busy," increase the padding to `5.5rem` (Spacing Scale 16).
*   **Do** use "Pill" shapes for almost all interactive elements.
*   **Do** rely on font weight (400 vs 600) to create hierarchy.

### Don’t
*   **Don't** use `#000000` or any dark charcoal. The darkest color in the system is `on-background` (#2a3439).
*   **Don't** use standard 1px borders. They "trap" the eye and break the misty effect.
*   **Don't** use "SaaS" iconography (heavy, filled icons). Use thin-stroke (1px or 1.5px) icons that match the `outline` (#717c82) color.
*   **Don't** use rigid 90-degree corners. Even "sharp" elements should have at least a `0.5rem` radius.

---

## 7. Spacing & Rhythm

Consistency in spacing is vital when lines are removed. 
*   **Outer Page Padding:** Always `8.5rem` (Spacing Scale 24) on desktop to create a centered, editorial feel.
*   **Card Internal Padding:** Always `2rem` (Spacing Scale 6) or `2.75rem` (Spacing Scale 8) to ensure content doesn't feel "choked" by the large corner radii. 
*   **Vertical Rhythm:** Use the **1.4rem (Scale 4)** increment as your base "breath" between related text elements.```