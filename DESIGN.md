---
name: Premium Artisan Service System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#414846'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#717976'
  outline-variant: '#c0c8c5'
  surface-tint: '#3e665d'
  primary: '#033028'
  on-primary: '#ffffff'
  primary-container: '#1e463e'
  on-primary-container: '#8ab3a9'
  inverse-primary: '#a5cfc4'
  secondary: '#7e5700'
  on-secondary: '#ffffff'
  secondary-container: '#fdbe50'
  on-secondary-container: '#714d00'
  tertiary: '#272a29'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d403f'
  on-tertiary-container: '#a9acaa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ebe0'
  primary-fixed-dim: '#a5cfc4'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#264e45'
  secondary-fixed: '#ffdead'
  secondary-fixed-dim: '#fabc4d'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#e1e3e1'
  tertiary-fixed-dim: '#c5c7c5'
  on-tertiary-fixed: '#191c1b'
  on-tertiary-fixed-variant: '#444746'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is engineered to evoke trust, reliability, and high-end craftsmanship for the Costa Rican luxury condominium market. The brand personality is "The Discerning Artisan"—expert, local, and impeccably organized. 

The visual style follows a **Modern Minimalist** approach with **Organic** influences. This is achieved through a spacious layout, a palette inspired by tropical architecture (Deep Emerald and Sand), and soft, approachable geometry. The goal is to provide a frictionless, "white-glove" digital experience that mirrors the premium nature of the physical services provided.

- **Primary Goal:** Transform the chore of home maintenance into a luxury service experience.
- **Tone:** Calm, professional, and sophisticated.
- **Visual Pillars:** High-density whitespace, subtle organic curves, and high-contrast typography.

## Colors

This design system utilizes a palette that balances professional stability with warm, service-oriented accents.

- **Deep Emerald Green (#1E463E):** Used for primary actions, headers, and branding elements to signify growth, stability, and premium quality.
- **Sand/Mustard (#E5A93C):** Reserved for high-intent accents like "Verified" badges, star ratings, and secondary call-to-actions.
- **Light Gray (#F4F6F4):** The foundational canvas color. It provides a softer, more sophisticated alternative to pure white, reducing eye strain.
- **Matte Black (#1A1A1A):** Used for all body copy and primary iconography to ensure maximum legibility and a grounded, modern feel.

## Typography

The design system uses **Plus Jakarta Sans** across all levels. This typeface was chosen for its soft, rounded terminals and contemporary geometric structure, which perfectly balances professionalism with a friendly, approachable tone.

- **Headlines:** Use a bold weight with slightly tighter letter spacing for a premium, editorial feel.
- **Body:** Maintain generous line heights to ensure readability for busy residents.
- **Labels:** Use medium or semi-bold weights to create clear hierarchy in metadata-heavy areas like ratings and service categories.

## Layout & Spacing

This design system employs a **Fluid Grid** model centered on an 8px spatial rhythm. 

- **Mobile:** Uses a 4-column layout with 20px side margins and 16px gutters. High-priority service categories should be displayed in a horizontal scroll or a 2x2 grid.
- **Desktop:** Transitions to a 12-column layout with a maximum container width of 1200px. Content is centered with 64px margins.
- **Spacing Philosophy:** Embrace "Breathable Luxury." Use `xl` (40px) spacing between major sections and `lg` (24px) within card internal groups to avoid a cluttered "utility" look.

## Elevation & Depth

To maintain the premium feel, depth is conveyed through **Tonal Layering** and **Soft Ambient Shadows** rather than harsh borders.

- **Level 0 (Background):** Light Gray (#F4F6F4).
- **Level 1 (Cards/Surfaces):** Pure White (#FFFFFF) with a very soft, diffused shadow (12% opacity of Primary Green) to give the illusion of floating elements.
- **Level 2 (Interactive/Floating):** Use a slightly larger shadow spread for active buttons or bottom sheets to indicate they are closer to the user.
- **Outlines:** Use 1px borders in a 10% opacity of the Matte Black for input fields and non-elevated containers.

## Shapes

The shape language is consistently **Rounded (0.5rem / 8px base)**. This geometric choice softens the professional aesthetic, making the app feel more human and "organic" in line with the Costa Rican environment.

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem).
- **Large Containers (Cards, Bottom Sheets):** 16px (1rem) for the top or all corners.
- **Badges/Chips:** Use a fully rounded (pill-shaped) radius to distinguish them from functional UI buttons.

## Components

### Navigation
- **Bottom Navigation Bar:** Use a white background with a subtle top border. Icons should be Matte Black when inactive and Deep Emerald when active. Use labels for all items to ensure clarity.
- **Search Bar:** Large, pill-shaped input with a Light Gray background and a subtle search icon. Placeholder text should be Matte Black at 50% opacity.

### Service Category Icons
- **Style:** Minimalist line art housed within a soft-square container (16px radius). The icon container uses a very light tint of the Primary Green (5% opacity).

### Handyman Cards
- **Structure:** White background with 16px corner radius.
- **Star Ratings:** Use Sand Yellow (#E5A93C) for filled stars.
- **Verified Badge:** A small Sand Yellow checkmark icon placed next to the provider's name to signify elite status.
- **Action:** A "View Profile" or "Book" button in Deep Emerald Green at the bottom right.

### Buttons & Inputs
- **Primary Button:** Deep Emerald Green background with white text. High-contrast and bold.
- **Secondary Button:** Outline style with 1px Deep Emerald border and text.
- **Inputs:** White background with an 8px radius. When focused, the border shifts to Deep Emerald.

### Interactive Sections
- **Profile/Settings:** Use a list-based layout with "chevron-right" icons for navigation. Group items into cards with 16px spacing between groups to maintain the "Luxury Hotel App" aesthetic.