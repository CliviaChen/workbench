# Memphis Inspired Design System Analysis

Locally authored — not part of the upstream `awesome-design-md` collection, and no `getdesign.md` page exists for it.

`DESIGN.md` reconstructs the Memphis Group language (Milan, 1981) as an executable web design system: YAML design tokens in the same schema as the rest of this collection, followed by the same eleven body sections.

## Use it

Copy `DESIGN.md` into your project root and tell your AI coding agent to follow it, exactly as with any other file in this collection.

## What is documented

- A bone canvas with hard 2px black outlines, six saturated hues, and no gradients, blur, or translucent surfaces anywhere.
- Token scales for color (20), typography (13 roles), radius (4), spacing (8) and components (19).
- Hard offset shadows (`2px`/`4px`/`6px`, zero blur) as the only depth device, with the lift-on-hover / press-flat interaction.
- A geometric decoration kit (circle, semicircle, triangle, zigzag, squiggle, dot grid, speckle, burst) with size ranges and composition limits.
- Rotation tokens, responsive collapse rules, do's/don'ts, an iteration guide, ready-to-use agent prompts, and known gaps.

## Verified

- Front matter parses as YAML; all 251 `{token.refs}` resolve to defined tokens.
- Every stated contrast ratio was measured from the token values (ink on pink 5.74:1, on cyan 9.21:1, on yellow 13.03:1, white on cobalt 5.88:1, danger on bone 5.71:1, focus ring on white 4.65:1).
