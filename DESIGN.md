---
name: Executive Precision
colors:
  surface: '#faf8ff'
  surface-dim: '#dad9e1'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3fa'
  surface-container: '#eeedf4'
  surface-container-high: '#e9e7ef'
  surface-container-highest: '#e3e1e9'
  on-surface: '#1a1b21'
  on-surface-variant: '#444651'
  inverse-surface: '#2f3036'
  inverse-on-surface: '#f1f0f7'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#4b1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e2c00'
  on-tertiary-container: '#f39461'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#773205'
  background: '#faf8ff'
  on-background: '#1a1b21'
  surface-variant: '#e3e1e9'
typography:
  name-display:
    fontFamily: IBM Plex Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  section-title:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.05em
  entry-title:
    fontFamily: IBM Plex Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-main:
    fontFamily: IBM Plex Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  metadata:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 850px
  section-gap: 2.5rem
  entry-gap: 1.5rem
  inner-padding: 1.25rem
  gutter: 1rem
---

## Brand & Style
The design system is engineered for a professional, tech-forward resume that balances authority with modern accessibility. The target audience includes high-level recruiters and technical hiring managers who value clarity, structure, and attention to detail.

The aesthetic follows a **Modern Corporate** direction with **Minimalist** influences. It utilizes generous whitespace to reduce cognitive load while employing precise, technical details to signify competency. The interface feels intentional and grounded, prioritizing information density without sacrificing elegance. Every element serves a functional purpose, reflecting a "signal over noise" philosophy.

## Colors
The palette is rooted in a foundation of trust and technical precision.
- **Primary (#1e3a8a):** A deep Navy Blue used for headings, primary icons, and structural accents to establish authority.
- **Secondary (#64748b):** A balanced Slate Gray reserved for body text, metadata, and secondary descriptors to ensure a clear hierarchy.
- **Surface (#f8fafc):** A very light cool gray used for card backgrounds and section separators to distinguish content zones without the harshness of pure black-on-white.
- **Accent (#3b82f6):** A brighter blue used sparingly for interactive elements or high-impact technical skills.

## Typography
This design system utilizes a dual-font strategy optimized for bilingual (Arabic/English) legibility. 

**IBM Plex Sans (and IBM Plex Sans Arabic)** serves as the workhorse for the resume. It provides the necessary technical "mechanical" feel while remaining highly legible in both languages. For English text, **Geist** is introduced for metadata and labels to lean into the developer-centric, tech-focused aesthetic.

**RTL Support:** Alignment must flip globally when switching languages. In Arabic mode, `text-align: right` is the default. Section icons must be mirrored if they have a directional component.

## Layout & Spacing
The layout uses a **Fixed Grid** approach optimized for A4/Letter dimensions and digital PDF viewing. 

- **Structure:** A two-column asymmetrical layout. A narrow sidebar (approx. 33%) for contact info, skills, and languages; a wide main column (approx. 66%) for experience and education.
- **RTL Behavior:** In Arabic, the sidebar moves to the right and the main content to the left.
- **Rhythm:** Use a baseline of 4px. All margins and paddings should be multiples of 4 (8, 12, 16, 24, 32).
- **Responsive:** For mobile viewing, the columns stack vertically with the sidebar content (Contact/Summary) appearing first.

## Elevation & Depth
The design system avoids heavy shadows to maintain a "clean" professional look. Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines**.

- **Cards:** Use a background of `#ffffff` with a subtle 1px border of `#e2e8f0`. 
- **Shadows:** Apply a singular, very soft ambient shadow to the main container only to lift it from the background: `0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)`.
- **Dividers:** Use horizontal rules in `#f1f5f9` to separate entries within the same section.

## Shapes
The shape language is **Soft** but disciplined. 
- **Corners:** A base radius of `0.25rem` (4px) is applied to all cards, skill tags, and input fields.
- **Icon Enclosures:** Icons are placed within subtle `2rem` circular or slightly rounded square containers with a light tint of the primary color (`#1e3a8a10`).
- **Progress Bars:** For languages/skills, use linear bars with fully rounded ends (pill-shaped) to provide a visual break from the rectangular grid.

## Components

### Section Headers
Consist of a primary-colored icon, a title in `section-title` typography, and a 2px thick horizontal line that extends to the edge of the column to anchor the section.

### Experience Entries
Comprised of a bold `entry-title`, a metadata row (Company name in Primary color, Date range in Secondary), and a bulleted list for responsibilities. Bullets should be small squares rather than circles to reinforce the tech aesthetic.

### Skill Chips
Small, non-interactive tags with a `#f1f5f9` background and `#475569` text. They use the `label-caps` typography style for high scannability.

### Contact Information
A vertical list where each item features a small, high-contrast icon followed by the text. In RTL mode, the icon is placed to the right of the text.

### Progress Indicators
Used for "Languages" or "Technical Proficiency." A background track of `#f1f5f9` with a foreground fill of `#1e3a8a`. The fill width corresponds to the proficiency level.

### Cards
Used specifically to group "Courses" or "Certifications" to make them pop. These feature a white background and the subtle border defined in the Elevation section.