---
name: EMMARK 作品集
description: A clean product-grade portfolio where fourteen live systems are the page, on neutral grounds with one palm-green accent.
colors:
  bg: "#ffffff"
  bg-soft: "#f6f7f8"
  surface: "#ffffff"
  ink: "#0b0d10"
  ink-2: "#3d434c"
  muted: "#5d6470"
  line: "#e4e6ea"
  line-strong: "#cfd3da"
  accent: "#0f7a5c"
  accent-hover: "#0c6a4f"
  accent-ink: "#ffffff"
  accent-soft: "#e7f4ef"
  accent-text: "#0b6b50"
  bg-dark: "#0b0d10"
  bg-soft-dark: "#111418"
  surface-dark: "#13161b"
  ink-dark: "#eef0f3"
  ink-2-dark: "#c4c9d1"
  muted-dark: "#949ba6"
  line-dark: "#23272e"
  line-strong-dark: "#343a43"
  accent-dark: "#34d399"
  accent-hover-dark: "#5fe0ae"
  accent-ink-dark: "#04140e"
  accent-soft-dark: "#0f2a21"
  accent-text-dark: "#5fe0ae"
typography:
  display:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(2.15rem, 5vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1
  numeric:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.82em"
    fontWeight: 400
    letterSpacing: "0"
    fontFeature: "tnum"
rounded:
  sm: "6px"
  md: "8px"
  button: "10px"
  lg: "12px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  grid-gap: "14px"
  tile: "20px 20px 18px"
  panel: "clamp(20px, 3vw, 36px)"
  section: "clamp(72px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 18px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "{colors.bg-soft}"
  button-small:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "36px"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.tile}"
  panel:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.panel}"
  badge-public:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-text}"
    rounded: "{rounded.sm}"
    padding: "5px 8px"
  badge-private:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "5px 8px"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  nav-link:
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
---

# Design System: EMMARK 作品集

## Overview

**Creative North Star: "The Open Workbench"**

The category standard, played straight. The page is a product-grade index of fourteen live systems: neutral grounds, hairline borders, one palm-green accent, and type that never raises its voice. The work is the page; there is no themed costume and no metaphor between the visitor and the projects. The craft bar is the marketing surface of a careful developer tool: quiet at rest, precise on interaction.

Density is moderate and even. A three-column tile grid carries the work above the fold; a tile opens in place into a full-width detail row so reading never leaves the grid. Light is the default; dark follows the system preference with its own tuned token set rather than an inversion. Depth is earned by state: surfaces are flat at rest and lift only on hover.

**Key Characteristics:**
- White (light) or near-black (dark) grounds with one soft grey step for recessed areas.
- One palm-green accent for actions, focus, selection, and the open state.
- 1px hairline borders and a 12px radius carry all structure.
- Geist with Noto Sans TC for everything; Geist Mono only for dates and counts.
- Flat at rest; a soft offset shadow and a 2px lift appear only on hover.

## Colors

Cool neutrals with a single green, tuned separately for light and dark so each set holds its contrast.

### Primary
- **Palm Green** (accent; dark: accent-dark): filled buttons, focus outline, text selection, the open tile's border ring, the live-status dot. Hover steps to accent-hover (darker in light, brighter in dark). Text on it is accent-ink.
- **Palm Green Text** (accent-text; dark: accent-text-dark): green used as ink, where the fill value would be too weak as text. The faith column heading, the security icons, the second line of the closing statement, log link hover, tile name hover.
- **Palm Wash** (accent-soft; dark: accent-soft-dark): the public badge ground and the halo ring around the live dot.

### Neutral
- **Paper** (bg / bg-dark): page ground; also the text color on the active filter.
- **Soft Paper** (bg-soft / bg-soft-dark): recessed areas. The open detail panel, the security band, table headers, the second split column, ghost and nav hover fills, the private badge.
- **Surface** (surface / surface-dark): tiles, fact cards, the faith box and tags inside the panel. Equal to Paper in light; one step up in dark so tiles separate from the ground.
- **Ink** (ink / ink-dark): headings, primary text, the active filter fill.
- **Ink Two** (ink-2 / ink-2-dark): body copy, ledes, taglines, list items.
- **Muted** (muted / muted-dark): meta text, tile kind, filter labels, captions, footer.
- **Hairline** (line / line-dark): every resting border and divider.
- **Hairline Strong** (line-strong / line-strong-dark): hover borders, ghost button border, link underlines, bullets, scrollbar thumb.

### Named Rules
**The One Green Rule.** Palm green is the only hue. It marks what acts, what has focus, and what is open; everything else is a neutral. No second accent.

**The Paired Token Rule.** Every color is a token with a light and a dark value on `:root`. Components reference tokens, never literals, so dark mode needs no per-component overrides.

## Typography

**Display Font:** Geist (with Noto Sans TC for CJK, then system-ui)
**Body Font:** Geist (with Noto Sans TC)
**Numeric Font:** Geist Mono (with ui-monospace)

**Character:** A neutral grotesk paired with a matching CJK sans, set in two weights that do the work: 600 for every heading, 400 for reading. Tight negative tracking on large sizes keeps headings compact without going heavy.

### Hierarchy
- **Display** (600, clamp(2.15rem, 5vw, 3.6rem), 1.15, -0.025em): the intro h1 only, balanced wrap, max 18em.
- **Headline** (600, clamp(1.6rem, 3.2vw, 2.3rem), 1.25, -0.02em): section h2. The closing statement is the one larger exception (700, clamp(2.2rem, 6vw, 4.2rem), 1.2).
- **Title** (600, 1.2rem, 1.35, -0.01em): tile names, 1.4rem on weight-3 tiles. Panel h4 runs larger at clamp(1.4rem, 2.6vw, 1.9rem), 1.25, -0.02em.
- **Body** (400, 17px, 1.7; 16px under 600px): running text in ink-2, prose measure about 36em, lede at clamp(1.05rem, 1.6vw, 1.2rem) within 38em.
- **Label** (500, 14 to 15px, line-height 1): buttons, filters, close control. Small headings in the panel (h5) are 600 at 13px with 0.04em tracking in muted; they stay sentence case.
- **Numeric** (Geist Mono, 0.82em of context, tabular figures): dates, commit counts, filter counts.

### Named Rules
**The Mono-For-Numbers Rule.** Geist Mono sets dates and counts and nothing else. Words, labels, and tech names stay in Geist.

**The Two-Weight Rule.** Headings are 600, text is 400, controls are 500. Bold (700) is reserved for the wordmark and the closing statement.

## Layout

A single 1200px wrap with a fluid gutter (clamp(16px, 4vw, 40px)) under a sticky 60px header. The intro is compact so the filter row and the first row of tiles sit above the fold at 1440x900. The work grid is three equal columns with a 14px gap, two under 960px, one under 600px. An opened tile inserts a full-width detail row (grid-column 1 / -1) directly after the last tile of its visual row and is hash-addressable. Sections after the grid stack with clamp(72px, 10vw, 128px) between them; the security band is a full-bleed soft-paper strip with clamp(56px, 8vw, 96px) padding. Content splits (prose plus split box, panel columns) are asymmetric two-column grids (1.3fr / 1fr, 1.2fr / 1fr) that collapse to one column. Under 760px the header nav hides, the log and panel columns stack, and the comparison table becomes a list of bordered cards. Under 600px the filter row scrolls horizontally edge to edge.

## Elevation & Depth

Flat at rest, lifted on hover. Depth at rest comes from tone (soft paper recessed under white surfaces) and hairlines, never from shadow. A tile on hover gains the shadow token, a stronger hairline, and a 2px rise; the open tile drops the lift and takes a green ring instead. The header is the one translucent surface: 92% paper with a saturate and 10px blur backdrop where supported.

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 1px 2px rgba(11,13,16,.04), 0 8px 24px -12px rgba(11,13,16,.14)`; dark: `0 1px 2px rgba(0,0,0,.4), 0 12px 32px -16px rgba(0,0,0,.7)`): tile hover only.
- **Open Ring** (`box-shadow: 0 0 0 1px` accent, with an accent border): the expanded tile, reading as a 2px green outline.
- **Live Halo** (`box-shadow: 0 0 0 3px` accent-soft): the 8px status dot.

### Named Rules
**The Hover-Only Shadow Rule.** Nothing casts a shadow at rest. A shadow is a response to the pointer, soft and offset downward, and it disappears when the element is opened.

## Shapes

Gently rounded, one radius family. Containers (tiles, panel, split box, table frame, fact cards) are 12px; primary buttons 10px; small buttons, nav links, and the close control 8px; badges, tags, and the focus ring 6px. Filters are full pills, and dots and bullets are circles. Every border is 1px; the only dashed line is the divider above a tile's highlighted professional line. Icons are inline SVG strokes at 1em, 2px stroke, round caps and joins. The wordmark is a 24px rounded-square mark in ink with a green stroke glyph.

## Components

### Buttons
- **Shape:** gently rounded (10px), 44px minimum height, 500 weight 15px label with an optional trailing 1em stroke icon and 8px gap.
- **Primary:** palm green fill with accent-ink text, 0 18px padding. Hover to accent-hover; active nudges down 1px. 180ms on the house ease.
- **Ghost:** transparent with ink text and a hairline-strong border; hover fills soft paper and darkens the border to muted.
- **Sizes:** small (36px, 0 14px, 14px, 8px radius) for the header course link; large (52px, 0 24px, 17px) for the closing email action.
- **Focus:** 2px accent outline offset 3px with a 6px radius, site-wide.

### Filters (chips)
- **Style:** full pill, 36px, transparent with a hairline border, muted 14px label and a mono count.
- **State:** hover darkens text to ink and border to hairline strong. Pressed (`aria-pressed="true"`) inverts to an ink fill with paper text.

### Project Tile (signature)
A whole-tile button on the surface color with a hairline border and 12px radius, minimum 210px tall. Top row: title and a public (palm wash) or private (soft paper) badge. Then kind in muted 13px, tagline in ink-2 15px, and for weight-3 tiles one professional line under a dashed hairline. A meta row pinned to the bottom holds up to three tech names and the last-updated date in mono. Hover lifts per Elevation and tints the name green; open shows the green ring.

### Detail Row
Full-width soft-paper block, hairline border, 12px radius, clamp(20px, 3vw, 36px) padding, rising 6px over 320ms on open. Header: h4 name, tagline, and a bordered close control. Body: two columns, a 專業 list with small round bullets and a 信仰 box on surface with a green heading. Then tags (6px radius, bordered), a commit line with mono numbers above a hairline, and the links row.

### Navigation
Sticky translucent bar with a bottom hairline. Wordmark left (700, 16px, 0.06em), muted 15px text links with 8px-radius soft-paper hover, the small primary course button right. Links hide under 760px.

### Ruled Lists and Tables
The update log, split columns, security grid, and comparison table are hairline-ruled rows with no fills except soft-paper headers. Table header cells are 500 weight 13px muted.

## Do's and Don'ts

### Do:
- **Do** take every color from the paired `:root` tokens so light and dark stay in step.
- **Do** spend palm green only on actions, focus, selection, the open state, and the few marked green texts (faith heading, security icons, closing line).
- **Do** use accent-text, not the fill accent, whenever green is used as text.
- **Do** build structure from 1px hairlines and the 12px container radius.
- **Do** keep surfaces flat at rest; use the hover-lift shadow and 2px rise only on pointer hover, gated with transitions on the house ease (cubic-bezier(.16, 1, .3, 1)).
- **Do** set Geist Mono only on dates and counts, with tabular figures.
- **Do** open project detail in place as a full-width grid row, keeping the grid visible.

### Don't:
- **Don't** add a second accent hue or tint sections with color.
- **Don't** put shadows on resting surfaces or use hard, unblurred offset shadows.
- **Don't** set words, labels, or tech names in mono.
- **Don't** use uppercase tracked labels above headings; small headings stay sentence case.
- **Don't** reintroduce the retired ark metaphor or its red-oxide palette.
