---
version: alpha
name: Memphis-geometric-design-analysis
description: "A reconstructive design system for the Memphis Group language — the 1981 Milan movement that treated design as provocation. A warm bone canvas carries hard 2px black outlines, clashing flat primaries (hot pink, cyan, yellow, cobalt), asymmetric geometric confetti (circles, triangles, zigzags, squiggles, dot grids), type set in a heavy geometric sans and deliberately tilted off-axis, and depth expressed as a hard offset shadow with zero blur. Nothing is glassy, nothing is soft, nothing is muted — every surface is opaque, every edge is drawn, and decoration is geometry rather than gradient. Intended for editorial, event, poster-like and playful product surfaces, not for dense enterprise utility screens."

colors:
  ink: "#111111"
  ink-soft: "#3a3630"
  muted: "#6b635a"
  canvas: "#f4efe6"
  surface: "#ffffff"
  surface-ink: "#111111"
  primary: "#ff3d9a"
  primary-deep: "#e01e7b"
  secondary: "#00c8d7"
  secondary-deep: "#00a3b0"
  accent-yellow: "#ffd21e"
  accent-blue: "#2f4bff"
  accent-mint: "#7ce8b0"
  accent-lilac: "#c9b6ff"
  danger: "#b3261e"
  on-primary: "#111111"
  on-dark: "#ffffff"
  border: "#111111"
  border-soft: "#d8cfc2"
  focus-ring: "#00818c"

typography:
  display-xl:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'ITC Avant Garde Gothic', 'Segoe UI', sans-serif"
    fontSize: 96px
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -2px
  display-lg:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -1.5px
  display-md:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -1px
  heading-xl:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.5px
  heading-md:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  subhead:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  body-lg:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  label:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.12em
  caption:
    fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.02em
  button:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  nav-link:
    fontFamily: "Poppins, Futura, 'Century Gothic', 'Segoe UI', sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-primary-active:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
    height: 48px
  button-secondary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 14px 28px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: 12px 26px
    height: 48px
  button-icon:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    size: 44px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 28px
  card-ink:
    backgroundColor: "{colors.surface-ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 28px
  card-pink:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 28px
  stat-tile:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.on-primary}"
    typography: "{typography.heading-xl}"
    rounded: "{rounded.none}"
    padding: 24px
  tag-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  tag-chip-active:
    backgroundColor: "{colors.accent-blue}"
    textColor: "{colors.on-dark}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  search-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xs}"
    padding: 12px 16px
    height: 48px
  search-input-focus:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xs}"
    padding: 12px 16px
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    height: 64px
    padding: 0 24px
  pattern-strip:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: 24px
  sticker-burst:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    size: 88px
  footer:
    backgroundColor: "{colors.surface-ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: 64px
---

# Design System Inspired by Memphis

## Overview

Memphis is not a style that asks for permission. The Memphis Group — founded in Milan in December 1981 by Ettore Sottsass, with Barbara Radice, Michele De Lucchi, Aldo Cibic, Matteo Thun, Marco Zanini, Martine Bedin, Shiro Kuramata and others — designed furniture and objects as a deliberate insult to good taste: plastic laminate instead of precious materials, primary colors instead of neutrals, asymmetry instead of balance, decoration instead of function. The name came from a Bob Dylan song played at the founding meeting.

Translated to a screen, the language has five load-bearing rules:

1. **Opaque, flat fills.** No gradients, no glass, no translucency, no blur. A color is a solid block of that color.
2. **Everything is drawn.** A 2px near-black outline separates every card, button, input and shape from its ground. The outline *is* the shape — outlines are never hairlines and never absent.
3. **Color clashes on purpose.** Three saturated hues per composition, chosen for tension rather than harmony. Warm bone or white canvas keeps the clash legible instead of muddy.
4. **Geometry is decoration.** Circles, semicircles, triangles, zigzags, squiggles, dot grids and terrazzo speckle replace illustration, photography and gradients as the decorative vocabulary — placed asymmetrically, overflowing edges, rotating independently of the grid.
5. **Depth is hard.** A shadow is a solid offset with zero blur, in ink or in a contrasting accent. Elements sit on the page like cut paper, not like frosted glass.

The mood is editorial, poster-like and confidently unserious: a design magazine spread, a record sleeve, a gallery invitation. It is the wrong system for a dense admin table, a financial dashboard, or anything that must whisper. It is the right system when the page itself is the statement.

## Colors

The palette is six saturated hues plus black and bone. Nothing is muted, nothing is tinted toward gray, and there is no gradient stop anywhere in the system.

### Brand & Accent

- **Hot Pink** (`{colors.primary}` — `#ff3d9a`): the primary action color. Filled buttons, the active navigation underline, the one shape that must win the composition. Hover does not change the fill — it changes the shadow offset (see Elevation).
- **Deep Pink** (`{colors.primary-deep}` — `#e01e7b`): pressed state and the second stop of a two-tone pink pairing. Never used for text on bone; it loses contrast at body sizes.
- **Cyan** (`{colors.secondary}` — `#00c8d7`): the secondary action color. A cyan outline or filled disc marks an element as interactive or newly active. It is deliberately not the focus indicator — a 2px cyan ring fails contrast against white, so focus uses the darker `{colors.focus-ring}` below.
- **Deep Cyan** (`{colors.secondary-deep}` — `#00a3b0`): pressed state, and the fill for shapes that sit behind white cards where cyan alone would vibrate.
- **Sun Yellow** (`{colors.accent-yellow}` — `#ffd21e`): attention without action — bursts, stickers, stat tiles, pattern strips, the marker behind a headline. Yellow usually carries ink-black text.
- **Cobalt** (`{colors.accent-blue}` — `#2f4bff`): the cool counterweight to pink. Links, selected chips, large flat panels. White text only.
- **Mint** (`{colors.accent-mint}` — `#7ce8b0`) and **Lilac** (`{colors.accent-lilac}` — `#c9b6ff`): confetti and pattern fills. They are never button colors and never text colors; they exist to fill geometric shapes and to soften a composition that has too much red-family energy.

### Surface

- **Bone** (`{colors.canvas}` — `#f4efe6`): the default page ground. Warm, slightly paper-colored, and the reason clashing primaries read as designed rather than as an error.
- **Surface** (`{colors.surface}` — `#ffffff`): cards, inputs, popovers. Pure white only on top of bone or on top of a colored block — never white page backgrounds, which flatten the system into a generic SaaS page.
- **Ink Surface** (`{colors.surface-ink}` — `#111111`): full-bleed dark bands, footers, and the inverted card. Inverted surfaces are the only place white text appears in quantity.

### Text

- **Ink** (`{colors.ink}` — `#111111`): all display type, all body copy on bone or white, and every outline.
- **Ink Soft** (`{colors.ink-soft}` — `#3a3630`): secondary body copy.
- **Muted** (`{colors.muted}` — `#6b635a`): metadata, captions, timestamps. The only low-contrast token, and still above 4.5:1 on bone.
- **On Primary** (`{colors.on-primary}` — `#111111`): text and icons on pink, cyan, yellow and mint. Memphis puts black on bright color; it does not put white on yellow.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): text on ink and cobalt surfaces.

### Outlines & Borders

- **Border** (`{colors.border}` — `#111111`): the 2px outline on every component. One token, one weight, everywhere.
- **Border Soft** (`{colors.border-soft}` — `#d8cfc2`): 1px interior rules only — table row separators, list dividers inside a card. Never a component boundary.

### Semantic & Accent

- **Danger** (`{colors.danger}` — `#b3261e`): validation and destructive actions, always paired with an icon or a label so the meaning is not carried by hue alone. It is a deliberately darkened red rather than the pink family: `#b3261e` clears 5.7:1 on bone and 6.5:1 on white, while `{colors.primary}` cannot carry error text.
- **Focus Ring** (`{colors.focus-ring}` — `#00818c`): a 3px teal ring at 2px offset. Because every component is already outlined, focus cannot be expressed by the border — it must be a separate ring outside it. The ring is a darkened teal, not `{colors.secondary}`: brand cyan measures only 2.05:1 against white, below the 3:1 a focus indicator needs, while `#00818c` measures 4.65:1 on white and 4.06:1 on bone.

### Pattern Palette

Pattern fills draw from `{colors.primary}`, `{colors.secondary}`, `{colors.accent-yellow}`, `{colors.accent-blue}`, `{colors.accent-mint}` and `{colors.accent-lilac}` on `{colors.canvas}` or `{colors.surface}`. Two rules keep patterns from becoming noise:

1. **At most three hues in any one pattern**, and one of them must be `{colors.ink}` or `{colors.canvas}` so the eye has a neutral to rest on.
2. **Patterns are geometry at a fixed scale**, not texture. Dots are 6px, zigzags have a 16px pitch, speckle is 1–4px irregular blobs. Scaling a pattern is a deliberate decision, not a responsive default.

## Typography

### Font Family

Memphis print work paired geometric sans display type with whatever grotesque the printer had. On the web that becomes a deliberate two-family system:

- **Display: Poppins** (weights 600–800). A geometric sans derived from Futura's circular skeleton, which is the closest open substitute for the ITC Avant Garde / Futura Extra Bold that Memphis covers used. Fallback chain: `Futura, 'Century Gothic', 'ITC Avant Garde Gothic', 'Segoe UI', sans-serif`.
- **Body: Inter** (weights 400–500). Neutral, screen-optimized, and deliberately boring — body copy must not compete with the display voice or the confetti. Fallback: `'Helvetica Neue', Helvetica, Arial, sans-serif`.

Two families, no serif, no monospace. A serif or a terminal face pulls the system toward "editorial magazine" or "developer tool" and away from "cut paper".

### Hierarchy

| Token | Size | Weight | Line | Tracking | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 96px | 800 | 0.95 | -2px | Poster hero, one per page |
| `{typography.display-lg}` | 72px | 800 | 0.98 | -1.5px | Section-opening statement |
| `{typography.display-md}` | 56px | 800 | 1.0 | -1px | Feature headline |
| `{typography.heading-xl}` | 40px | 700 | 1.08 | -0.5px | Card group title |
| `{typography.heading-md}` | 28px | 700 | 1.15 | 0 | Card title |
| `{typography.subhead}` | 22px | 600 | 1.25 | 0 | Lead paragraph, callout |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0 | Long-form intro |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Dense lists, captions in cards |
| `{typography.label}` | 12px | 700 | 1.2 | +0.12em | Eyebrows, chips, tags, uppercase |
| `{typography.caption}` | 12px | 500 | 1.4 | +0.02em | Metadata, footnotes |

### Principles

1. **Display type is huge or absent.** A headline below 40px is body type wearing a costume. If a screen has no room for `{typography.heading-xl}` or larger, it does not need a Memphis display moment — it needs more content or less decoration.
2. **Sentence case for display, uppercase only for labels.** Cover-style all-caps display reads as 1980s parody rather than 1980s design. Uppercase belongs to `{typography.label}`, with the +0.12em tracking that makes it legible at 12px.
3. **Negative tracking scales with size.** Display sizes run -1 to -2px; body runs at 0. Never apply positive tracking above 12px.
4. **One tilted element per viewport.** See Layout for the rotation tokens. If two things are rotated, a third must be dragged along and the page becomes a ransom note.
5. **A headline may sit inside a shape.** White space is not the only container — a display headline can be set on a pink or yellow block with `{spacing.lg}` of padding, as long as the block is opaque and outlined.

### Note on Font Substitutes

Poppins is free on Google Fonts and is the closest widely available geometric-heavy sans; it is slightly wider than Futura and about 15% rounder, so reduce display sizes by roughly one step when substituting. If Poppins is unavailable, **Archivo Black** (single weight, higher stroke contrast, more poster-like) or **Montserrat 800** (closer to Gotham than to Futura) both read acceptably but shift the mood — Archivo toward "protest poster", Montserrat toward "startup landing page". Neither is a neutral substitution.

Inter is free and needs no substitution. If a serif-free body is required by brand constraints, **DM Sans** at 400 is acceptable; **Helvetica** at 400 is historically accurate to Memphis printing but renders heavier on Windows.

## Layout

### Spacing System

A strict 4px base. Memphis compositions are busy, not tight — spacing is generous where geometry has to breathe.

| Token | Value | Use |
|---|---|---|
| `{spacing.xxs}` | 4px | Icon-to-label, outline-to-content inset |
| `{spacing.xs}` | 8px | Chip internals, tight stacks |
| `{spacing.sm}` | 12px | Button icon gap, label to field |
| `{spacing.md}` | 16px | Card internal paragraph rhythm |
| `{spacing.lg}` | 24px | Card padding floor, grid gutters |
| `{spacing.xl}` | 32px | Card padding default, block padding |
| `{spacing.xxl}` | 48px | Between card groups |
| `{spacing.section}` | 96px | Between page sections |

### Grid & Container

A 12-column grid with `{spacing.lg}` gutters, a `1200px` max content width, and `{spacing.section}` top and bottom rhythm between sections. Cards may span 4, 6, 8 or 12 columns; an odd span (5, 7) is permitted only when the card carries a shape that overflows its column into the gutter — asymmetry must be earned by geometry, not asserted by a grid violation.

Full-bleed bands break the container deliberately: a colored section runs edge to edge, while its content stays inside the 1200px measure. This edge-to-edge/interior contrast is the main structural rhythm of the system.

### Rotation & Off-Grid Placement

Rotation is a token, not a taste call:

| Token | Angle | Use |
|---|---|---|
| `tilt-xs` | -1° | A sticker pinned to a card corner |
| `tilt-sm` | -2° | A rotated card in a row of three |
| `tilt-md` | 3° | A hero shape or burst |
| `tilt-lg` | -4° | One display word inside a headline |

Rules:

- **Never rotate body copy, form fields, or navigation.** Rotate display type, cards, badges and shapes only.
- **Maximum one rotated element per viewport** at `tilt-md` or larger; two at `tilt-xs`/`tilt-sm` are allowed if they are in opposite quadrants.
- **Compensate the layout.** A rotated card needs `{spacing.md}` of extra margin on the axis it leans toward, or it will clip its neighbor.
- **Rotate around the element's own center**, except stickers, which rotate around a corner to read as "pinned".

```css
.tilt-sm { transform: rotate(-2deg); }
.tilt-lg { transform: rotate(-4deg); }
@media (prefers-reduced-motion: no-preference) {
  .tilt-hover:hover { transform: rotate(-2deg) translateY(-2px); }
}
```

### Whitespace Philosophy

Memphis is dense in decoration and generous in margins. The rule of thumb: **a shape needs at least `{spacing.lg}` of clear canvas on its outward-facing side**, and text needs at least `{spacing.xl}` from any pattern or confetti. Crowding a pattern against body copy is the single fastest way to make this language unreadable. Empty bone canvas is not wasted space — it is the neutral that makes six saturated hues survivable.

## Elevation & Depth

### Hard Offset Shadows

There is exactly one shadow in the system: a solid, zero-blur offset in a single color.

| Token | Value | Use |
|---|---|---|
| `shadow-xs` | `2px 2px 0 {colors.ink}` | Chips, tags, small buttons |
| `shadow-sm` | `4px 4px 0 {colors.ink}` | Cards, buttons — the default |
| `shadow-md` | `6px 6px 0 {colors.ink}` | Hero cards, modals, popovers |
| `shadow-color` | `6px 6px 0 {colors.primary}` | A card whose shadow is the accent color |

```css
.card {
  background: #fff;
  border: 2px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.card:hover { box-shadow: 6px 6px 0 #111; transform: translate(-2px, -2px); }
.card:active { box-shadow: 0 0 0 #111; transform: translate(4px, 4px); }
```

The hover/active pair above is the canonical interaction: **the element lifts toward the light on hover and presses flat on click**, with the shadow shrinking to zero. This replaces color-change hover states entirely — a Memphis button does not get darker, it gets further off the page.

### Layering & Anti-Depth

- **Shapes sit behind content, never in front.** A circle behind a card is offset 30–60% of its diameter from the card's corner, at full opacity or at 100% — never at 20% opacity, which would be a gradient by another name.
- **Two planes maximum.** Ink outline + hard shadow already separates foreground from ground; adding an inner shadow, a second border, or a tinted overlay makes the card read as a UI widget instead of a cut shape.
- **No blur, ever.** `filter: blur()`, `backdrop-filter`, `box-shadow` with a non-zero blur radius, and soft radials are all forbidden. If depth is needed, use a larger offset.

### Decorative Depth

The only other depth device is **overlap**: a shape or sticker that crosses a section boundary, a card edge, or another shape. Overlap is the Memphis equivalent of a drop shadow — it tells the eye which plane is nearer without simulating light.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Stat tiles, pattern strips, full-bleed bands, image frames |
| `{rounded.xs}` | 2px | Inputs, small chips, tags |
| `{rounded.sm}` | 4px | Cards, buttons, modals — the maximum for rectangles |
| `{rounded.full}` | 9999px | Circles, pills, icon buttons, bursts |

**No rectangle in this system rounds above 4px.** Soft 12–24px corners are the visual signature of the glassmorphic/generic-SaaS era this language is defined against. A "round" element in Memphis is a complete circle, not a softly-cornered box.

### Geometric Vocabulary

Decoration is assembled from a fixed kit. Each shape has a size range and a placement habit; inventing new shapes breaks the family resemblance.

| Shape | Form | Size | Placement |
|---|---|---|---|
| Circle | Solid disc, 2px outline optional | 48–240px | Overlapping a card corner or section edge |
| Semicircle | Half-disc, flat side on a grid line | 80–200px | Anchoring a band's edge |
| Triangle | Equilateral or right, solid or outlined | 40–120px | Cluster of two or three, never alone |
| Zigzag | Chevron strip, 16px pitch, 2px stroke | 24–32px tall | Section divider, full-bleed |
| Squiggle | Hand-cut wave, 3px stroke, 2px outline | 40–120px wide | Beside a headline or as a list bullet |
| Dot grid | 6px dots, 24px pitch | Tileable | Behind a card block at low density |
| Speckle | Irregular 1–4px blobs, 3 colors | Tileable | Inside a colored block, never over text |
| Burst | 8–12 point star or sticker badge | 64–96px | Pinned to a card corner, tilted |

Composition rules:

1. **At most three shapes per card**, and only one may be a "large" shape (≥120px).
2. **One shape may break the card's bounding box** — that overflow is what makes the composition feel cut by hand.
3. **Every shape is opaque.** A 30% opacity circle reads as a glow, which belongs to a different system.
4. **Shapes never carry information.** If removing a shape changes what the page means, it was doing a component's job.

## Components

### Buttons

- Height `48px`, `{rounded.sm}`, 2px `{colors.border}` outline, `{spacing.md}` horizontal padding minimum (`14px 28px` default).
- **Primary** — `{colors.primary}` fill, `{colors.on-primary}` label, `{shadow-sm}`. One per viewport.
- **Secondary** — `{colors.secondary}` fill with the same outline and shadow. Never place a primary and a secondary adjacent without `{spacing.lg}` between them.
- **Ghost** — transparent fill, 2px ink outline, ink label, `shadow-xs`. For tertiary actions inside dense areas.
- **Icon button** — 44px circle, `{colors.accent-yellow}` fill, 2px outline, `shadow-xs`. The circle is the only permitted non-rectangular button.
- **States** — default `shadow-sm`; hover `shadow-md` with `translate(-2px, -2px)`; active `shadow 0` with `translate(4px, 4px)`; focus adds a 3px `{colors.focus-ring}` ring at 2px offset; disabled drops to 45% opacity and `shadow-xs` and must keep its outline.
- **Never** change the fill color on hover. The offset carries the state.

### Cards & Containers

- `{colors.surface}` fill, 2px `{colors.border}` outline, `{spacing.xl}` padding, `{rounded.sm}`, `{shadow-sm}`.
- **Ink card** — `{colors.surface-ink}` fill with `{colors.on-dark}` text, same outline weight (the outline reads as a seam), `shadow-color` offset in `{colors.primary}` for the hero variant.
- **Color card** — a full card in `{colors.primary}`, `{colors.secondary}` or `{colors.accent-yellow}` with `{colors.on-primary}` text. At most one color card per row of three.
- **Card header** — `{typography.label}` uppercase eyebrow in `{colors.muted}`, then `{typography.heading-md}` title, `{spacing.sm}` apart.
- **Media inside a card** — `{rounded.none}`, flush to the card's inner edge, 2px outline on the media itself so it reads as a pasted image rather than a bleed.
- A card may carry **one geometric shape** in a corner, offset so it breaks the outline.

### Inputs & Forms

- Field: `{colors.surface}` fill, 2px `{colors.border}`, `{rounded.xs}`, `height: 48px`, `12px 16px` padding, `{typography.body-md}`.
- Focus: 3px `{colors.focus-ring}` ring at 2px offset plus the unchanged ink outline — the field must never lose its drawn edge.
- Error: outline becomes `{colors.danger}` at the same weight, with a `{typography.caption}` message below in `{colors.danger}` and an icon. Never signal error by color alone.
- Labels sit above the field in `{typography.label}`, uppercase, `{spacing.xs}` above the input.
- Checkboxes and radios are **drawn as circles/squares with a 2px outline**; the checked state fills with `{colors.primary}` and draws a white check. No native OS controls, no toggles — a Memphis toggle is a physical-looking switch with a hard shadow.

### Navigation

- Bar: `{colors.canvas}` fill, 2px `{colors.border}` bottom edge only, `height: 64px`, `{spacing.lg}` horizontal padding.
- Links: `{typography.nav-link}`, ink, `{spacing.lg}` apart. The active link carries a **4px `{colors.primary}` underline** sitting 6px below the text, extending 2px past each end of the word.
- The logo may be tilted `tilt-sm`; navigation links may not.
- Mobile: a full-screen opaque panel in `{colors.accent-yellow}` with 2px outlined links at `{typography.heading-md}`, each with `{spacing.md}` vertical padding. Never a translucent drawer.

### Tags & Chips

- `{rounded.full}`, 2px ink outline, `{typography.label}` uppercase, `6px 14px` padding, `{colors.surface}` fill by default.
- Selected: `{colors.accent-blue}` fill with `{colors.on-dark}` text and `shadow-xs`.
- Chips are the one place a pill shape is used for text; they never contain more than four words.

### Pattern Dividers

Three permitted dividers, each full-bleed and `24–32px` tall:

1. **Zigzag** — `{colors.ink}` 2px stroke on `{colors.accent-yellow}`, 16px pitch.
2. **Dot grid** — 6px `{colors.ink}` dots on `{colors.canvas}` at 24px pitch.
3. **Speckle band** — 1–4px blobs in two accents on `{colors.canvas}`.

A divider never contains text and never animates. Its job is to break the page rhythm without adding meaning.

```html
<svg viewBox="0 0 32 16" preserveAspectRatio="none" aria-hidden="true">
  <path d="M0 12 L8 4 L16 12 L24 4 L32 12" fill="none" stroke="#111" stroke-width="2" />
</svg>
```

### Stickers & Bursts

- 64–96px, `{rounded.full}` or an 8–12 point burst, `{colors.accent-yellow}` or `{colors.primary}` fill, 2px ink outline, `{typography.label}` text.
- Tilted `tilt-xs` or `tilt-sm`, pinned to a card corner, allowed to overflow the card by up to 40% of its own size.
- **At most one sticker per card** and never on a form control. A sticker communicates emphasis, not status.

## Do's and Don'ts

### Do

- Draw a 2px `{colors.border}` outline on every component boundary, without exception.
- Keep fills fully opaque; if two colors must relate, place them adjacent rather than blending them.
- Use exactly three saturated hues per composition, one of which is usually pink, yellow or cyan.
- Give cards a hard `shadow-sm` offset and answer hover with a larger offset plus a 2px translate.
- Rotate one display element per viewport, and compensate its margins.
- Let one shape per card break the card's outline.
- Set display type at 40px or larger, or drop to body scale entirely.
- Put black text on bright fills (`{colors.on-primary}`) and white text only on ink or cobalt.
- Use `{rounded.none}` or `{rounded.sm}` for rectangles and reserve circles for the full circle.
- Keep at least `{spacing.lg}` of clear canvas around any pattern or confetti.

### Don't

- Don't use gradients, mesh gradients, blurred backdrops, glassmorphism, or any `backdrop-filter`.
- Don't use soft shadows, ambient shadows, or multi-layer shadow stacks.
- Don't round a rectangle above 4px.
- Don't mute the palette toward gray, or pick "harmonious" neighbors instead of clashing ones.
- Don't rotate body copy, inputs, navigation, or more than one large element per viewport.
- Don't place confetti or patterns behind text without a clear `{spacing.xl}` buffer.
- Don't use a serif or monospace family; they import the wrong period.
- Don't replace the outline with a border-radius or a fill change.
- Don't animate color or opacity as a state change; animate transform and shadow offset.
- Don't let decoration carry meaning — if a shape is removed and the page loses information, it was a component.
- Don't use more than six hues including neutrals; the seventh makes the page read as "colorful" rather than "Memphis".

## Responsive Behavior

### Breakpoints

| Name | Range | Container |
|---|---|---|
| Mobile | 0–639px | 100% − `{spacing.lg}` each side |
| Tablet | 640–1023px | 720px |
| Desktop | 1024–1439px | 1080px |
| Wide | 1440px+ | 1200px |

### Touch Targets

Minimum 44×44px for every interactive element, including the icon button and chips (chips get `{spacing.xs}` of extra vertical padding on touch devices rather than growing their text). Stickers and decorative shapes are never interactive and must not intercept pointer events.

### Collapsing Strategy

- Display type scales with `clamp()` rather than stepping: `{typography.display-xl}` becomes `clamp(40px, 9vw, 96px)` with tracking easing from -2px to -0.5px.
- Three-up card rows collapse to two-up at tablet and one-up at mobile; a color card that was third in a row of three moves to first, so the page keeps one saturated anchor.
- Rotation reduces to zero below 640px — a tilted card on a 360px screen clips its own text.
- Shapes halve in size and their overflow is clipped to `{spacing.md}` at mobile.
- Pattern dividers keep their height but drop from three hues to two.

### Pattern Density

Confetti count is a per-breakpoint budget: three shapes per section at desktop, two at tablet, one at mobile. This keeps the language recognizable on a phone without turning the screen into a texture.

## Iteration Guide

1. Change one component at a time and reference its YAML key directly (`{component.card}`, `{component.button-primary}`).
2. Use `{token.refs}` everywhere. A literal hex outside the front matter is a bug.
3. State variants are separate entries (`-hover`, `-active`, `-focus`). Never document a hover fill change — the system changes offsets, not colors.
4. When a composition feels flat, add geometry before adding color: a circle, a burst, a zigzag. Color is already saturated; more color makes it muddy.
5. When it feels noisy, remove a shape rather than muting a color. The palette is fixed; the density is the variable.
6. If a rectangle needs rounding, it needs a different component, not a bigger radius.
7. Verify contrast before shipping: `{colors.ink}` on `{colors.primary}` measures 5.7:1, on `{colors.secondary}` 9.2:1 and on `{colors.accent-yellow}` 13.0:1, so all three pass for body text. `{colors.on-dark}` is valid only on `{colors.accent-blue}` (5.9:1) and `{colors.surface-ink}` (18.9:1). Never swap `{colors.danger}` or `{colors.focus-ring}` back to a brand hue for aesthetic reasons — those two tokens are darkened specifically to clear their minimums.

## Agent Prompt Guide

### Quick Color Reference

- Ink `{colors.ink}` `#111111` · Bone canvas `{colors.canvas}` `#f4efe6` · White surface `{colors.surface}` `#ffffff`
- Pink `{colors.primary}` `#ff3d9a` · Cyan `{colors.secondary}` `#00c8d7` · Yellow `{colors.accent-yellow}` `#ffd21e`
- Cobalt `{colors.accent-blue}` `#2f4bff` · Mint `{colors.accent-mint}` `#7ce8b0` · Lilac `{colors.accent-lilac}` `#c9b6ff`

### Example Component Prompts

1. *"Build a hero: `{colors.canvas}` ground, a 96px `{typography.display-xl}` headline in `{colors.ink}` with the second word on a tilted `{colors.primary}` block at `tilt-lg`, one 180px `{colors.secondary}` circle overflowing the right edge, and a 48px `{colors.primary}` primary button with `{shadow-sm}`."*
2. *"Build a card grid of three: `{colors.surface}` cards with 2px `{colors.border}` outlines, `{rounded.sm}`, `{spacing.xl}` padding and `{shadow-sm}`; make the middle card `{colors.accent-yellow}` with `{colors.on-primary}` text; pin a 64px `{colors.accent-blue}` burst tilted `tilt-xs` to the third card's top-right corner."*
3. *"Build a form: 48px inputs with `{colors.surface}` fill, 2px `{colors.border}`, `{rounded.xs}`, `{typography.label}` uppercase labels above, a 3px `{colors.focus-ring}` ring on focus, and a `{colors.danger}` outline plus caption for the invalid state — no soft shadows, no gradient."*
4. *"Build a section divider: a full-bleed 32px `{colors.accent-yellow}` band containing a 2px `{colors.ink}` zigzag at 16px pitch, with `{spacing.section}` above and below."*

## Known Gaps

- **No dark mode.** Memphis is a light, paper-and-laminate language; the warm bone ground and black outlines carry the mood, and inverting to a dark canvas turns the palette into a neon system with different rules. A dark variant is a design decision this document deliberately leaves open rather than a token flip.
- **No photography direction.** The original movement used bold graphics instead of photography; this system replaces imagery with geometry. If photography is required, it should be high-contrast cut-outs on flat color, never soft-focus or gradient-overlaid.
- **Pattern assets are described, not shipped.** The zigzag, dot grid, speckle and burst are specified by pitch, stroke weight and size instead of supplied as a file — they must be authored as inline SVG or CSS, which this document does not include beyond the one divider example.
- **Motion is unspecified.** Only the hover/active offset pair is defined. Any entrance or scroll motion needs its own decision; the safe default is none, because Memphis objects do not animate.
- **No data-visualization palette.** Charts need more than three hues at consistent luminance, which conflicts with the three-hue rule. Treat charts as a separate system and do not force the brand palette onto them.
- **Accessibility limits.** The palette's contrast depends on black-on-bright pairings: white text never works on `{colors.accent-yellow}` or `{colors.primary}`, which is why `{colors.on-primary}` is ink. `{colors.danger}` and `{colors.focus-ring}` are separately darkened to clear 4.5:1 text and 3:1 focus minimums and must not be replaced by the brand pink and cyan. The rotated display type must be flattened to 0° in any reduced-motion or high-contrast presentation.
