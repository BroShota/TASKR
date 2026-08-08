---
name: Emerald Nocturne
colors:
  surface: '#121413'
  surface-dim: '#121413'
  surface-bright: '#383a39'
  surface-container-lowest: '#0c0f0e'
  surface-container-low: '#1a1c1b'
  surface-container: '#1e201f'
  surface-container-high: '#282a29'
  surface-container-highest: '#333534'
  on-surface: '#e2e3e1'
  on-surface-variant: '#c0c8c5'
  inverse-surface: '#e2e3e1'
  inverse-on-surface: '#2f3130'
  outline: '#8a928f'
  outline-variant: '#414846'
  surface-tint: '#a5cfc4'
  primary: '#a5cfc4'
  on-primary: '#0c372f'
  primary-container: '#1e463e'
  on-primary-container: '#8ab3a9'
  inverse-primary: '#3e665d'
  secondary: '#fabc4d'
  on-secondary: '#432c00'
  secondary-container: '#bd8718'
  on-secondary-container: '#3a2600'
  tertiary: '#f3b9ac'
  on-tertiary: '#4b271e'
  tertiary-container: '#5c352c'
  on-tertiary-container: '#d49e92'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c1ebe0'
  primary-fixed-dim: '#a5cfc4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#264e45'
  secondary-fixed: '#ffdead'
  secondary-fixed-dim: '#fabc4d'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#f3b9ac'
  on-tertiary-fixed: '#31120b'
  on-tertiary-fixed-variant: '#653c33'
  background: '#121413'
  on-background: '#e2e3e1'
  surface-variant: '#333534'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system embodies a premium, minimalist, and organic aesthetic tailored for high-end SaaS or professional environmental sectors. The personality is grounded and authoritative yet approachable, evoking a sense of stability and curated quality. 

The visual style is a blend of **Modern Minimalism** and **Tonal Layering**. It prioritizes heavy whitespace (or "darkspace"), precise typography, and a sophisticated use of color where the deep emerald green provides a sense of growth and the mustard accent adds a warm, human touch. The interface should feel like a high-end physical object—substantial, quiet, and meticulously crafted.

## Colors
The palette is optimized for a sophisticated dark mode experience. The primary **Deep Emerald Green** is used sparingly for high-impact brand moments and primary actions, while the **Soft Mustard** serves as a strategic accent for notifications, highlights, and secondary interactions.

- **Surface Levels:** Use the near-black background for the base and the surface-container for cards, modals, and navigation bars to create a subtle sense of depth.
- **Typography Contrast:** Use Off-white (#E1E1E1) for primary headings and body text to ensure maximum readability. Use the lower-contrast variant for metadata and placeholder text.
- **Emerald Tints:** For interactive states (hover/active), use a 10-15% lightened version of the primary emerald green.

## Typography
The typography system uses a tri-font pairing to distinguish hierarchy and function. **Manrope** provides a modern, balanced feel for headings. **Inter** handles high-legibility body copy. **Geist** is used for labels and technical data, providing a clean, developer-friendly precision to functional elements.

Maintain generous line heights to preserve the "premium" feel. On mobile, headlines should scale down to prevent excessive wrapping while maintaining weight to preserve brand impact.

## Layout & Spacing
The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is based on an 8px base unit.

- **Desktop:** 64px outer margins with 24px gutters. Use large vertical padding (80px+) between major sections to emphasize the minimalist aesthetic.
- **Mobile:** 16px outer margins with 16px gutters.
- **Alignment:** Content should generally be left-aligned to maintain a structured, professional feel, with the exception of marketing "hero" sections which may be centered.

## Elevation & Depth
In this dark mode environment, depth is communicated through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows.

- **Level 0 (Base):** Deep Charcoal (#121212) for the canvas.
- **Level 1 (Cards/Surface):** Dark Grey (#1E1E1E) with a subtle 1px solid border (#2C2C2C).
- **Interactions:** When an element is lifted (e.g., hovering over a card), increase the surface brightness slightly rather than adding a shadow.
- **Glassmorphism:** Use sparingly for navigation overlays. Apply a `backdrop-filter: blur(12px)` with a 70% opacity fill of the surface color to maintain focus on the content beneath.

## Shapes
The shape language is **Soft**. This subtle rounding (0.25rem - 0.75rem) provides a modern, organic touch that prevents the UI from feeling too industrial or sharp. 

- Use **0.25rem (4px)** for small components like checkboxes and tags.
- Use **0.5rem (8px)** for buttons and input fields.
- Use **0.75rem (12px)** for larger containers and cards.

## Components
Consistent component styling reinforces the premium aesthetic:

- **Buttons:** 
  - *Primary:* Deep Emerald Green background with Off-white text. No border.
  - *Secondary:* Transparent background with a 1px border of Mustard and Mustard text.
- **Input Fields:** Dark grey background (#1E1E1E) with a 1px border (#2C2C2C). On focus, the border transitions to Deep Emerald.
- **Chips/Tags:** Small, Geist-font labels with a subtle background (Emerald at 10% opacity) and Emerald text for a sophisticated "organic" highlight.
- **Lists:** Clean separators using the `outline` color (#2C2C2C). High vertical padding (16px) per list item.
- **Cards:** No shadow; defined by their #1E1E1E background and subtle 1px border.
- **Checkboxes:** Square with a 4px corner radius. When checked, use the Mustard accent color for high visibility against the dark background.