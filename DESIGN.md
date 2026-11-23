---
name: EMMARK 作品集
description: A launch page for a body of work, where real screens of live systems float on a dark aurora-lit stage and the reading body follows the system theme.
colors:
  stage: "#070a12"
  stage-2: "#0d1220"
  stage-ink: "#f4f6fb"
  stage-ink-2: "#aab2c5"
  stage-line: "rgba(255, 255, 255, .12)"
  aurora-emerald: "#10b981"
  aurora-cyan: "#22d3ee"
  aurora-violet: "#8b5cf6"
  accent: "#0f7a5c"
  accent-hover: "#0c6a4f"
  accent-ink: "#ffffff"
  bg: "#ffffff"
  bg-soft: "#f5f6f8"
  surface: "#ffffff"
  ink: "#0a0d14"
  ink-2: "#3b4250"
  muted: "#5b6373"
  line: "#e3e6eb"
  line-strong: "#cdd2da"
  cat-ministry: "#10b981"
  cat-ministry-text: "#047857"
  cat-tools: "#8b5cf6"
  cat-tools-text: "#6d28d9"
  cat-play: "#f59e0b"
  cat-play-text: "#b45309"
  accent-dark: "#34d399"
  accent-hover-dark: "#5fe0ae"
  accent-ink-dark: "#04140e"
  bg-dark: "#0a0d14"
  bg-soft-dark: "#0f131c"
  surface-dark: "#121722"
  ink-dark: "#eef1f6"
  ink-2-dark: "#c3c9d4"
  muted-dark: "#939bab"
  line-dark: "#222836"
  line-strong-dark: "#333a4a"
  cat-ministry-text-dark: "#34d399"
  cat-tools-text-dark: "#a78bfa"
  cat-play-text-dark: "#fbbf24"
typography:
  display:
    fontFamily: "Geist, Noto Sans TC, system-ui, -apple-system, PingFang TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(2.15rem, 5.2vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.8vw, 2.9rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 3vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, Noto Sans TC, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.4
  number:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.82em"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  shot: "10px"
  frame: "14px"
  card: "16px"
  panel: "20px"
  feature: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  grid-gap: "16px"
  section: "clamp(80px, 11vw, 144px)"
  stage-band: "clamp(96px, 12vw, 160px)"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.stage}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-glass:
    backgroundColor: "rgba(255, 255, 255, .06)"
    textColor: "{colors.stage-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  tile:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px 20px 18px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(20px, 3vw, 40px)"
  feature-row:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.feature}"
  badge:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "5px 9px"
---

# Design System: EMMARK 作品集

## Overview

**Creative North Star: "The Launch Stage"**

The work is staged the way a launch page stages one product: real screens of real systems, lit from behind on a deep ink stage, tilted in perspective at first and settling flat as the visitor scrolls. The stage opens the page and closes it; between them the reading body steps out of the dark and follows the visitor's system theme on quiet neutral grounds, so long reading happens in comfortable light or dark rather than inside a spotlight.

The system is product-grade and calm. Hairline borders, soft long shadows, pill buttons, and generous radii carry structure; color is spent in two places only: the aurora glow on the stage and one hue per project category. Every image is a sourced screenshot of a live system with a provenance sidecar. Where a private system has no shareable screen, the visual slot becomes a faith-decision card instead of a mock.

Neither a plain list portfolio nor a themed metaphor (no arks, palms, or parchment as decoration). The brand mark and the closing line carry the identity; the screens carry the proof.

**Key Characteristics:**
- A fixed dark stage (#070a12) for hero, the 分工 band, and the close, independent of theme.
- Soft emerald, cyan and violet aurora blurs plus a fading 64px hairline grid on every stage.
- Reading body on neutral grounds that follow `prefers-color-scheme` and a `[data-theme]` override.
- Real screenshots in thin browser frames are the only imagery.
- One color per category: emerald 教會事工, violet 工具與教學, amber 互動與遊戲.
- Geist with Noto Sans TC; Geist Mono only for numbers and dates.

## Colors

Neutral ink and paper for reading, a deep stage for the bookends, and color reserved for light and category.

### Primary
- **Palm Green** (accent, #0f7a5c; #34d399 in dark): the filled primary button inside the reading body (立即體驗, 進入課程) and nothing decorative. Its dark-mode tint (#34d399) is the same role, lifted for contrast.

### Secondary
- **Deep Ink Stage** (stage, #070a12): background of the hero, the 分工 band and the closing section, and of the sticky header glass. Never follows the theme. The no-shot card blends into it.
- **Stage Ink** (stage-ink, #f4f6fb) and **Stage Mist** (stage-ink-2, #aab2c5): text on the stage. Pure white is used for the stage headline and emphasized lede words.
- **Stage Hairline** (stage-line, white at 12%): borders, the background grid and glass edges on the stage.

### Tertiary
- **Aurora Emerald / Cyan / Violet** (#10b981, #22d3ee, #8b5cf6): only as heavily blurred light behind stage content (blur 90px, opacity .32 to .5), slowly drifting when motion is allowed. Emerald doubles as focus ring, selection and the live-status dot.
- **Category hues**: Ministry Emerald (#10b981), Tools Violet (#8b5cf6), Play Amber (#f59e0b) as fills, glows and dots; each has a darker text tone (#047857, #6d28d9, #b45309) for labels and checkmarks, lifted in dark mode (#34d399, #a78bfa, #fbbf24).

### Neutral
- **Paper** (bg, #ffffff) and **Soft Paper** (bg-soft, #f5f6f8): page ground and recessed areas (featured rows, table heads, badges).
- **Ink** (#0a0d14), **Ink 2** (#3b4250), **Muted** (#5b6373): headings, body copy, meta.
- **Hairline** (line, #e3e6eb) and **Strong Hairline** (line-strong, #cdd2da): every divider and card border; strong for ghost buttons and bullets.
- Dark theme swaps the neutral set to the `-dark` tokens (bg #0a0d14, surface #121722, ink #eef1f6).

### Named Rules
**The Light Not Paint Rule.** Aurora colors appear only as blurred light on the stage, never as flat fills, gradients on text, or backgrounds in the reading body.

**The One Hue Per Category Rule.** A project's color comes from its category through `data-deck` (`--cat`, `--cat-t`); never assign a color per project.

**The Fixed Stage Rule.** Stage tokens do not change with the theme. The bookends stay dark in light mode; the body follows the system.

## Typography

**Display Font:** Geist (with Noto Sans TC, system-ui, PingFang TC, Microsoft JhengHei)
**Body Font:** Geist with Noto Sans TC
**Label/Mono Font:** Geist Mono, numbers only

**Character:** One sans family at four weights (400 to 700), tight negative tracking on large sizes, relaxed 1.7 line height for Traditional Chinese body text with `word-break: auto-phrase` and balanced headings.

### Hierarchy
- **Display** (700, clamp(2.15rem, 5.2vw, 4.1rem), 1.12, -0.03em): the hero headline in white, second clause dimmed. The closing line uses the same voice larger (clamp(2.4rem, 7vw, 5.2rem), 1.15).
- **Headline** (600, clamp(1.8rem, 3.8vw, 2.9rem), 1.2, -0.025em): section heads, followed by a muted 1.05rem lede.
- **Title** (600, clamp(1.7rem, 3vw, 2.4rem), 1.2): featured project names; panel titles step down to clamp(1.4rem, 2.6vw, 1.9rem), tile names to 1.2rem.
- **Body** (400, 17px, 1.7; 16px under 600px): prose capped near 36em; lede capped at 34em.
- **Label** (500, 13px): category kind, tile meta, table heads, column headings in 600 with .06em tracking.
- **Number** (Geist Mono, .82em, tabular): commit counts, dates, update stamps.

### Named Rules
**The Mono Means Number Rule.** Geist Mono appears only on figures and dates (`.num`), never for labels or decoration.

## Layout

A 1200px container with a fluid gutter (clamp(16px, 4vw, 40px)). The hero is centered copy over a perspective stack of three framed screenshots (center frame 66% wide, side frames 64% at translateZ(-120px) and 12deg rotateY), bottom-faded into the page ground. Sections are separated by clamp(80px, 11vw, 144px); stage bands get clamp(96px, 12vw, 160px) of padding and margin.

Featured projects are full-width rows on soft paper: copy column against a 1.75fr screen column, alternating sides, the screen bleeding off the outer card edge. More work sits in a three-column grid (16px gap) where a tile with a screenshot spans two columns and two rows. Detail opens in place as a full-width panel inside the grid or after its featured row.

Breakpoints: 960px (rows stack with the screen at the bottom, grid to two columns), 760px (nav hides, comparison table becomes stacked cards, facts to one column), 600px (single column, body 16px).

## Elevation & Depth

Hybrid: flat hairline cards at rest, soft long shadows for lift, and real perspective on the stage. Depth on the stage comes from 3D transforms and blurred light; in the body it comes from tonal recess (bg-soft) and the shared `--shadow`.

### Shadow Vocabulary
- **Soft lift** (`box-shadow: 0 1px 2px rgba(10,13,20,.05), 0 18px 40px -20px rgba(10,13,20,.22)`; deeper black in dark): tile hover and open panels.
- **Stage frame** (`box-shadow: 0 50px 100px -30px rgba(0,0,0,.75), 0 0 0 1px rgba(0,0,0,.3)`): hero screenshots.
- **Category glow** (`box-shadow: 0 40px 80px -30px color-mix(in srgb, var(--cat) 55%, transparent)`): featured screens, tinted by category.

### Named Rules
**The Hover Lifts Rule.** Tiles are flat until hovered; hover raises 3px with the soft lift and a category-tinted border. An open tile drops the lift and takes a 1px category ring.

## Shapes

Generous, consistent curves: pills (999px) for every button, nav link, badge and tag; 14px browser frames with a 28px bar of three muted dots; 16px tiles and stage fact cards; 20px panels; 24px featured rows. Featured screens clip square on the edge where they bleed out of the row. Circles only for status and category dots.

## Components

### Buttons
- **Shape:** full pill (999px), 46px tall (36px small, 56px large), 500 weight 15px, trailing 1em stroke icon.
- **Primary:** palm green fill, white text; hover darkens to accent-hover; active nudges down 1px.
- **Light:** white on the stage (寫信給我, header course link); hover to #e9edf5 with a 4px white-12% halo.
- **Glass:** white-6% fill and stage hairline on the stage (GitHub).
- **Ghost:** transparent with strong hairline in the body (看完整介紹); when expanded, border and text take the category text tone.

### Chips and Badges
- **Category chip:** 14px, category text tone, preceded by an 8px category dot.
- **Badge:** 12px pill on soft paper with hairline; the public badge uses emerald at 14% with ministry text tone.
- **Tags:** 13px pills on soft paper, ink-2 text.

### Cards / Containers
- **Tile:** surface, hairline border, 16px radius, 20px padding, a 1px category gradient line across the top edge; screenshot inset with a 10px radius.
- **Panel:** surface, 20px radius, soft lift, two columns (專業 1.2fr / 信仰 1fr) split by a hairline, rises 8px on open.
- **Featured row:** soft paper, 24px radius, a blurred category glow in the far corner, checkmark bullets in category tones, a faith line under a hairline.

### Navigation
Sticky dark glass header (stage at 86% with 14px blur and saturate 1.6) in every theme. Wordmark plus five pill links in stage mist that brighten to white on a white-8% fill; the course button stays visible at every width while the links hide under 760px.

### Browser Frame (signature)
Every screenshot sits in a 14px frame with a 28px bar of three 9px dots, 16:10 image cropped from the top. On the stage the three frames form a perspective stack that tilts flat with scroll (22deg to 0) and leans up to 4deg toward the pointer; featured frames rotate in from 10deg and scale from .94 to full size as they near the viewport center. All of it runs only under `.motion`, which script adds when reduced motion is not requested; content is visible without it.

### Faith-Decision Card (signature)
For a private system without a shareable screen, the frame slot holds a card on a radial category glow fading into the stage: a 40px lock icon, the project's faith decision in 600 weight, and a small 「私有系統，不公開畫面」 note. It replaces the screenshot; it never imitates one.

## Do's and Don'ts

### Do:
- **Do** use only real, sourced screenshots of live or public demo systems (1280x800, WebP) and ship each with a `.webp.json` provenance sidecar stating how and when it was captured.
- **Do** use the faith-decision card for private systems with no shareable screen, and keep member and church identifying data out of every screenshot.
- **Do** keep the hero, 分工 band and close on the fixed stage with aurora and the fading grid, whatever the theme.
- **Do** color a project only through its category (`data-deck`), using the darker text tone for any colored text.
- **Do** gate every scroll or pointer transform behind `.motion` and keep content fully visible without it.
- **Do** set numbers and dates in Geist Mono with tabular figures.

### Don't:
- **Don't** use generated, illustrated, stock or mocked-up imagery in place of a screen.
- **Don't** use aurora colors as flat fills or gradient text in the reading body.
- **Don't** theme the stage to light mode or let the reading body go permanently dark.
- **Don't** add per-project colors beyond the three categories.
- **Don't** hide project facts behind hover, flips or animation; hover only lifts.
