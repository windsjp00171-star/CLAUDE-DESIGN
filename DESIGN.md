---
name: EMMARK 總布置圖
description: A portfolio drawn as the general arrangement of an ark, chalk linework on red-oxide primer with one window-yellow light.
colors:
  oxide: "#7a2616"
  hull: "#5a190d"
  hull-deep: "#44110a"
  chalk: "#f6ede1"
  chalk-soft: "#e6cfbf"
  window: "#ffc933"
  timber: "#d08a4a"
  verdigris: "#4fb3a2"
  sea: "#5aa7d6"
  deep-sea: "#0e3a47"
  ink-on-window: "#2a0d07"
typography:
  display:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 8.2vw, 6rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 4.4vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.15
  title:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.15rem to clamp(1.7rem, 3.4vw, 2.4rem)"
    fontWeight: 900
    lineHeight: 1.2
  body:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Noto Sans TC, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  wordmark:
    fontFamily: "Barlow Condensed, Noto Sans TC, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    letterSpacing: "0.08em"
  measure:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13px"
    letterSpacing: "0.04em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  cell: "16px"
  panel: "clamp(18px, 3vw, 36px)"
  section: "clamp(40px, 7vw, 88px)"
components:
  button-primary:
    backgroundColor: "{colors.window}"
    textColor: "{colors.ink-on-window}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.oxide}"
    rounded: "{rounded.none}"
    padding: "12px 22px"
  room:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    padding: "16px 16px 18px"
  room-open:
    backgroundColor: "{colors.window}"
    textColor: "{colors.ink-on-window}"
  panel:
    backgroundColor: "{colors.hull-deep}"
    textColor: "{colors.chalk}"
    padding: "{spacing.panel}"
  nav-course:
    backgroundColor: "{colors.oxide}"
    textColor: "{colors.chalk}"
    padding: "4px 12px"
---

# Design System: EMMARK 總布置圖

## Overview

**Creative North Star: "The General Arrangement Drawing"**

The whole page is one drafting sheet pinned to a red-oxide primer ground. Everything is chalk linework: hairline borders, ruled tables, dimension lines with arrowheads, a title block, section hatching, a scale bar. Projects are compartments on the decks of an ark, and a compartment's size is its rank. The tone is steady and plain-spoken: an engineer's sheet that happens to carry church work, with no neon, no cards, no glass.

The ground is committed, not a section color. Every surface is a step of the same red (oxide, hull, hull-deep), so depth comes from darker or lighter primer and from ruled lines. One accent exists, window yellow, and it is spent on the lit window of the ark, the active compartment, primary actions, and the final line of the closing quote.

**Key Characteristics:**
- Red-oxide ground across the whole page; chalk is the only ink.
- Borders and rules carry structure; there are no shadows and no rounded corners.
- Window yellow is rationed to the places where something is lit, open, or actionable.
- Black-weight (900) Chinese display type against quiet 400 body text; Latin drafting caps only in the wordmark.
- Size is rank: flex-weighted compartments, no badges or numbering.

## Colors

**Deck colors (added 2026-10).** Each deck carries one drafting-code color, and its compartments are filled with a darkened tone of it: timber (#d08a4a, fill #8c4d1f) for 上層甲板, verdigris (#4fb3a2, fill #1e6a5e) for 中層甲板, sea (#5aa7d6, fill #2b6396) for 下層甲板. Compartment text stays chalk (5.4:1 or better on every fill); the brighter deck color appears only as the 5px top band, the deck title rule and swatch, and the SVG deck labels, never as text. Private compartments add a faint hatch over the fill. The 水線以下 band is deep sea (#0e3a47) with sea-colored rules. Window yellow stays the only accent and the only fill that overrides a deck color (the open compartment).

A one-hue palette of burnt reds and warm chalks with a single yellow light.

### Primary
- **Window Yellow** (#ffc933): the lit window in the ark drawing, the open compartment fill, primary buttons, focus outline, selection, the panel's top rule, the faith column heading, and the second line of the closing quote. Hover lifts to #ffd966 and active drops to #f0b920 (literal values in the build).

### Neutral
- **Red-Oxide Primer** (#7a2616): page ground, sticky bar, faith box, label plates behind dimension text.
- **Hull Red** (#5a190d): hover fill for compartments, the right-hand "AI" split column, hatch ground.
- **Bilge Red** (#44110a): the open compartment panel, the "below the waterline" band, scrollbar track.
- **Chalk** (#f6ede1): all text and full-strength lines; secondary button fill. Line variants are chalk at 55% (rules) and 18% (inner dividers).
- **Soft Chalk** (#e6cfbf): secondary text, captions, table headers, labels.
- **Window Ink** (#2a0d07): text on any yellow surface.

### Named Rules
**The One Light Rule.** Window yellow marks what is lit: the ark's window, the open compartment, the primary action, focus. If two unrelated things on one screen are yellow, one of them is wrong.

**The Primer Rule.** Surfaces are only oxide, hull, or hull-deep. No white, grey, or new hue is introduced; depth is a darker red or a chalk rule.

## Typography

**Display Font:** Noto Sans TC (with system-ui)
**Body Font:** Noto Sans TC (with system-ui)
**Drafting Font:** Barlow Condensed (wordmark only, with Noto Sans TC)
**Measure Font:** JetBrains Mono (dimension text and small reference marks)

**Character:** Heavy CJK sans at weight 900 for headings reads like stencilled hull lettering; the body stays at 400 with generous leading. Condensed caps and mono appear only as drafting furniture.

### Hierarchy
- **Display** (900, clamp(2.6rem, 8.2vw, 6rem), 1.02): the sheet title h1, balanced wrap.
- **Headline** (900, clamp(1.8rem, 4.4vw, 3rem), 1.15): section h2.
- **Title** (900, 1.15rem / 1.45rem / clamp(1.7rem, 3.4vw, 2.4rem), 1.2): compartment names, stepped by compartment weight 1, 2, 3; panel h4 up to 2.2rem.
- **Body** (400, 18px, 1.75; 17px under 860px): running text, lede at clamp(1.1rem, 2.2vw, 1.35rem), measure about 34 to 38em.
- **Label** (400 to 700, 15px, 1.5): taglines, tags, title block, table cells, footers.
- **Wordmark** (Barlow Condensed 700, 24px, 0.08em): top bar only.
- **Measure** (JetBrains Mono 500, 13px in text; 14 to 15px inside the SVG): dimension lines and scale numerals.

### Named Rules
**The Stencil Rule.** Headings are 900 or nothing; there is no mid-weight heading. Contrast comes from 900 against 400.

**The Drafting-Caps Rule.** Barlow Condensed is reserved for the EMMARK wordmark. Mono is reserved for measurements.

## Layout

A single column on a 1240px wrap with a fluid gutter (16px to 56px). Sections stack with clamp(40px, 7vw, 88px) top spacing and are separated by space and rules, not boxes. The first sheet is a two-column grid (title and lede left, a 260 to 340px title block right) over a full-width SVG elevation. Compartments are a flex-wrap field: base flex 2 1 240px, weight 3 at 340px minimum with a taller 190px cell, weight 1 at 200px; the open panel breaks to a full-width row beneath them. Content columns (bridge, panel columns, bow list) are asymmetric two or three column grids that collapse to one at 860px. At 700px the desktop SVG swaps for a mobile elevation; at 520px compartments go full width.

## Elevation & Depth

Flat. There are no box-shadows anywhere. Depth is tonal: oxide is the sheet, hull is a pressed or hovered area, hull-deep is the interior (open panel, below-waterline band). The waterline is drawn as a dashed chalk strip above the hold. Open panels fade and rise 6px over 200ms; this is the only motion besides the ark's one-time draw-in (stroke draw plus window fade, 280ms) and 180 to 200ms background changes, all under `prefers-reduced-motion: no-preference`.

### Named Rules
**The Flat Sheet Rule.** No shadows, glows, or blur. A state change is a fill change or a rule change.

## Shapes

Square. Every border, button, tag, panel, and field is a rectangle with 0 radius; the only rounded element is the scrollbar thumb. Structure is 1px chalk rules at 55% opacity, 2px full chalk for headers and the deck title underline, and a 3px yellow top rule on the open panel. Private projects are marked by 135-degree chalk hatching at 10% opacity, the same section-hatch idiom as the drawing. Bullets are 9px hairline dashes.

## Components

### Buttons
- **Shape:** square, 52px minimum height, 17px bold label with a trailing 1.05em inline-SVG stroke icon.
- **Primary:** window yellow fill, window ink text, 14px 18px padding (the title block and contact variants widen to 28px sides). Hover #ffd966, active #f0b920, 200ms.
- **Secondary:** chalk fill with oxide text inside compartment panels (12px 22px), hover white. A plain underlined text link sits beside it.
- **Outline (nav course link, panel close):** transparent with 1px chalk (or chalk-line) border; nav hover fills chalk with oxide text. Close is 44px minimum height.
- **Focus:** 3px window outline offset 3px, site-wide.

### Compartments (signature)
A transparent button cell ruled on its right and bottom by chalk lines, name in 900, tagline in soft chalk below. Hover fills hull; open fills yellow with window ink text. Private projects carry diagonal hatching that disappears when open. Size by data weight is the only rank signal.

### Detail Panel
Full-row hull-deep block with a 1px chalk border and 3px yellow top rule. Two columns (1.15fr / 1fr): lists with dash bullets under soft-chalk h5 headings; the faith column is an oxide box with a yellow heading. Tags are 1px outlined rectangles.

### Navigation
Sticky oxide bar with a bottom chalk rule, wordmark left, text links right with a 2px transparent underline that turns chalk-line on hover. The course link is outlined to stay prominent.

### Title Block and Tables
Bordered definition list (soft-chalk terms, chalk values, faint inner rules) in the manner of a drawing title block. The equipment table is ruled rows with a 2px chalk header rule and soft-chalk 14px header cells.

### Drawing Furniture
Inline SVG elevation: 2px chalk outlines, 1px thin lines, mono dimension text on oxide plates, arrow markers, scale bar, a yellow window rectangle, and a yellow-hatched course hatch link on the hull that inverts to solid yellow on hover.

## Do's and Don'ts

### Do:
- **Do** keep the whole page on oxide, hull, or hull-deep with chalk ink (#f6ede1).
- **Do** spend window yellow (#ffc933) only on lit or actionable things, with window ink (#2a0d07) text on it.
- **Do** build structure from 1px chalk rules at 55% opacity and 2px full-chalk header rules.
- **Do** carry rank with compartment size alone, via the data weight.
- **Do** keep corners square (0 radius) and surfaces flat (no shadows).
- **Do** set headings at weight 900 and body at 400, with 17 to 18px body and 1.75 leading.
- **Do** gate all motion behind `prefers-reduced-motion: no-preference`, and keep targets clickable while it plays.

### Don't:
- **Don't** use a card grid, rounded containers, glass, or neon dark-mode developer styling.
- **Don't** add badges, numbers, or ranking labels to compartments.
- **Don't** introduce a new hue or a white/grey surface to the primer palette.
- **Don't** use Barlow Condensed or JetBrains Mono for running text.
- **Don't** hide required information behind hover or flip states.
