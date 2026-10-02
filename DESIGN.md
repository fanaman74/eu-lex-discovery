---
name: EU Lex Discovery
description: EU court rulings on rights at work, filed like wire dispatches and each linked to the official judgment.
colors:
  ink: "#0e0e0e"
  paper: "#ffffff"
  wash: "#f1f1ef"
  line: "#d9d9d6"
  grey: "#5f5f5b"
  wire: "#e4002b"
  wire-deep: "#c20025"
  on-ink-muted: "#b9b9b5"
  ai-fg: "#7a4a00"
  ai-surface: "#fff4d6"
  success-fg: "#0b6b34"
  success-surface: "#e5f5ea"
  warning-fg: "#7a4a00"
  warning-surface: "#fff4d6"
  danger-fg: "#c20025"
  danger-surface: "#fde8ec"
typography:
  display:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.75rem, 1.2rem + 4.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 68"
  page-title:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 68"
  headline:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 68"
  panel-heading:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 68"
  title:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 68"
  dateline:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 0.9
    fontVariation: "'wdth' 68"
  lede:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.3
  label:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
  badge:
    fontFamily: "'Archivo', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "40px"
  space-7: "64px"
  space-8: "104px"
  gutter: "clamp(16px, 4vw, 56px)"
  control-height: "46px"
components:
  masthead:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink-muted}"
    height: "64px"
    padding: "0 clamp(16px, 4vw, 56px)"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.wire-deep}"
    textColor: "{colors.paper}"
  button-wire:
    backgroundColor: "{colors.wire-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-wire-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-ghost-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-danger:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.danger-fg}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 24px"
  button-danger-hover:
    backgroundColor: "{colors.danger-fg}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "{spacing.control-height}"
    padding: "0 12px"
  dispatch:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "24px 16px"
  dispatch-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  view-all:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "24px"
  view-all-hover:
    backgroundColor: "{colors.wire-deep}"
    textColor: "{colors.paper}"
  hero-block:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.display}"
    width: "min(58%, 900px)"
    padding: "40px 40px 40px clamp(16px, 4vw, 56px)"
  badge:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    typography: "{typography.badge}"
    padding: "2px 8px"
  badge-ai:
    backgroundColor: "{colors.ai-surface}"
    textColor: "{colors.ai-fg}"
  badge-success:
    backgroundColor: "{colors.success-surface}"
    textColor: "{colors.success-fg}"
  badge-danger:
    backgroundColor: "{colors.danger-surface}"
    textColor: "{colors.danger-fg}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.badge}"
    padding: "1px 8px"
  source-box:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "24px"
  panel-ai:
    backgroundColor: "{colors.ai-surface}"
    textColor: "{colors.ink}"
    padding: "24px"
---

# Design System: EU Lex Discovery

## Overview

**Creative North Star: "Court Wire"**

Every ruling is filed like a dispatch from Luxembourg: a dateline, a headline, what it is about, and the reference that proves it. The system is a news-agency front page rendered in newsprint black, white and one wire-service red. It is loud where a ruling is announced and plain where a ruling is read. The audience is the general public and press arriving cold, so trust is built by showing the case number, court and date on every row, not by decoration.

One grotesque family, Archivo, does all the work. Its width axis carries the hierarchy: headings are condensed to 68% and heavy, reading text sits at normal width and regular weight. Surfaces are flat, corners are square, and structure comes from heavy black rules and solid blocks of ink rather than boxes, shadows or tints. The photograph of the Court's entrance on the home page is shown undimmed; text sits on a solid black block beside it, never on a scrim over it.

This world replaces an earlier navy-and-gold sidebar design. Navigation is a black top bar; there is no side menu.

**Key Characteristics:**
- Black, white and one red; status colours appear only on status.
- One family, two widths: condensed heavy for headings, normal for reading.
- Square corners everywhere; no drop shadows.
- Heavy rules separate items; rule thickness signals rank.
- Rows and bars invert to solid ink or red on hover and focus.
- Every ruling shows case number, court and date; generated text is marked in amber.

## Colors

Newsprint contrast with a single alarm colour: near-black ink, pure white paper, a faint warm grey wash, and a wire-service red that is rationed.

### Primary
- **Wire Red** (`wire`): the signal colour used as line and mark, not as fill: the second word of the wordmark, the 8px rule on top of the hero block, the active-page bar under a nav link, every focus outline, the arrow on an inverted dispatch row, link underlines on hover, the text selection and caret.
- **Wire Red Deep** (`wire-deep`): the fill version of the red, used wherever white text sits on red or red text sits on white: the main hero action, the hover state of ink buttons and of the view-all bar, checkbox accent, the back link on hover. `danger-fg` is the same value.

### Neutral
- **Ink** (`ink`): body text, all structural rules, control borders, the masthead, hero block, footer, source box, view-all bar, and the hover state of dispatch rows.
- **Paper** (`paper`): the page background and the text colour on ink.
- **Wash** (`wash`): the one quiet tone: the method band, the filter bar, neutral badges, notices and inline code.
- **Line** (`line`): 1px hairlines between rows inside a data group (facts, tables, provider rows). Never between dispatches.
- **Grey** (`grey`): secondary text on paper or wash: subject lines, datelines' month and year, ledes, hints, table headers.
- **On-Ink Muted** (`on-ink-muted`): secondary text on ink: inactive nav links, the source-check time label, footer copy, muted text inside an inverted row.

### Status
- **AI Amber** (`ai-fg` on `ai-surface`): reserved for generated interpretation: the "AI summary" badge and the AI summary panel. `warning-fg` and `warning-surface` share these values for partial runs.
- **Success Green** (`success-fg` on `success-surface`): successful runs and confirmed saves.
- **Danger** (`danger-fg` on `danger-surface`): failed runs, error notices, destructive buttons.

### Named Rules
**The One Red Rule.** Red is the only chromatic colour in the brand layer. Amber, green and the pink danger surface exist solely to report status and never decorate.

**The Line-and-Fill Rule.** `wire` draws lines and marks; `wire-deep` carries fills and any red next to text. White text is never set on `wire` for running copy.

**The Amber Means Generated Rule.** Amber marks AI-generated text and nothing else on public pages. Court facts are never set on amber.

## Typography

**Display Font:** Archivo variable, condensed to 68% width (with 'Helvetica Neue', Arial, sans-serif)
**Body Font:** Archivo variable at normal width (same stack)
**Label/Mono Font:** none; labels are Archivo bold, and inline code inherits the family at weight 700 on wash.

**Character:** A single self-hosted grotesque (weights 400 to 900, width 62% to 125%). Tight, heavy, condensed headlines read like a wire-service front page; reading text is ordinary and calm so the legal content stays plain.

### Hierarchy
- **Display** (800, condensed, clamp(2.75rem, 1.2rem + 4.4vw, 5rem), 0.98, -0.015em): the home hero headline inside the ink block, held to 19ch. Capped at 5rem so the block does not cover the photograph.
- **Page title** (800, condensed, clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem), 0.98): the h1 of list, detail, monitoring and settings pages.
- **Headline** (800, condensed, clamp(2rem, 1.4rem + 2.4vw, 3.5rem), 0.98): section headings on the home page and the heading of the lead dispatch.
- **Panel heading** (800, condensed, clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)): section headings inside inner pages; the view-all bar uses a near-identical clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem).
- **Title** (800, condensed, 1.75rem, 1.05): dispatch headings; 1.5rem in the method band, 1.375rem inside prose and for the source link.
- **Dateline numeral** (800, condensed, 3rem, 0.9): the day of the month in a dispatch row, tabular figures; 2.5rem at 820px and 1.75rem inline at 600px.
- **Lede** (400, normal width, 1.1875rem, 1.55): hero standfirst, page ledes, the lead dispatch's subject line; 50 to 62ch.
- **Body** (400, normal width, 1.0625rem, 1.55): all reading text; prose is held to 70ch, row text to 72ch.
- **Small** (400, 0.9375rem): the reference column of a dispatch, footer copy, secondary notes.
- **Label** (700, 0.875rem, sentence case): field labels and table headers; hints and fact terms use the same size at 400 in grey.
- **Badge** (700, 0.8125rem, 1.5): badges and topic tags.

### Named Rules
**The Width Axis Rule.** Hierarchy is made by width and weight, not by a second typeface. Headings are 68% wide at 800; reading text is normal width at 400; emphasis in running text is 600 or 700 at normal width.

**The Sentence Case Rule.** Headings, labels, table headers and buttons are sentence case with no added tracking. Uppercase is reserved for the product name in the masthead and footer (weight 900).

**The Tabular Figures Rule.** Dates, counts and tables use tabular numerals.

## Layout

A full-width black masthead (64px, sticky) sits above everything. Content runs in a single column up to 1440px (1040px for the operator pages, 1328px inside the method band) with a fluid side gutter of clamp(16px, 4vw, 56px). Bands that carry colour (hero, method band, footer) are full-bleed; their content aligns to the same gutter.

Spacing is a named eight-step scale: 4, 8, 12, 16, 24, 40, 64, 104px. Inside a component the steps are 12 to 24px; between sections 64px; a home-page band opens with 104px. At 600px and below the two largest steps drop to 48px and 72px.

The home hero fills the viewport below the masthead (up to 940px tall). The photograph is anchored bottom-left and oversized so the canopy clears the headline block, which sits at the lower left at 58% width (maximum 900px, minimum 640px). The photo credit lives in the footer, not on the image.

The dispatch row is a three-column grid: a 130px dateline column, a fluid body, and a right-aligned reference column sized to its content. The case detail page is a fluid main column with a 320px sticky aside, 64px apart.

Responsive behaviour:
- **1100px and below:** the filter bar becomes three columns with search and actions full width; the detail aside drops below the main column and stops being sticky.
- **820px and below:** the hero stacks (photograph at 46svh, then a full-width ink block); dispatch rows drop to two columns (96px dateline) with the reference moved under the body, left aligned; the method band becomes one column.
- **600px and below:** the masthead wraps the nav to its own row and shortens the check label; dispatch rows become a single column with the day numeral inline; filter and form grids become one column; hero and page-head buttons go full width.

## Elevation & Depth

Flat. There are no drop shadows and no blur. Depth is expressed three ways: solid ink blocks laid over or beside lighter surfaces (the hero block on the photograph, the source box, the view-all bar), the wash tone for quiet grouping, and rule weight. The only `box-shadow` in the system is an inset 4px bar that marks the current page under a masthead link; it is an indicator, not elevation. Stacking is limited to the sticky masthead and the skip link.

### Named Rules
**The Solid Block Rule.** Text over the photograph sits on an opaque ink block. The photograph is never dimmed, tinted or covered with a gradient.

**The Inversion Rule.** Interaction is shown by flipping a surface to solid ink or red, not by lifting it. Dispatch rows turn ink with white text on hover and on keyboard focus within; bars and buttons swap fill.

## Shapes

Every corner is square (radius 0): buttons, inputs, badges, tags, blocks, the hero block. Form comes from rules, and their thickness is a ladder of rank:

- **8px, wire red:** the top edge of the hero block. Used once.
- **6px, ink:** the top of the dispatch list.
- **4px, ink:** the head of a data group: the fact list, table header, provider list, detail header, method columns. Also the active nav bar (wire red, inset).
- **3px, ink:** between dispatches; also the focus outline (wire red, 3px offset).
- **2px, ink:** control borders (buttons, inputs) and the dashed border of an empty state.
- **1.5px, ink:** topic tag outline.
- **1px, line grey:** hairlines between rows inside a data group. 1px ink separates stacked panels on operator pages.

Icons are outline SVGs on a 24px grid with a 2px stroke and round caps, drawn in `currentColor` at 14 to 28px.

## Components

### Buttons
Blunt and rectangular; state is a fill swap over 160ms.
- **Shape:** square (0 radius), 46px tall, 24px side padding, 2px border in the fill colour, weight 700, sentence case, no wrapping.
- **Primary:** ink fill, white text. Hover: wire-deep fill and border.
- **Wire:** wire-deep fill, white text; the one main action on an ink surface. Hover: white fill, ink text.
- **Ghost:** transparent with a white border, for ink surfaces only. Hover: white fill, ink text.
- **Secondary:** paper fill, ink text and border. Hover: ink fill, white text.
- **Danger:** paper fill, danger text and border. Hover: danger fill, white text.
- **Focus:** 3px wire outline, 3px offset (white outline inside ink surfaces). **Disabled:** 45% opacity, no pointer events.

### Badges and tags
- **Badge:** a small filled label (2px 8px, 0.8125rem bold, no border), wash by default; `ai`, `success`, `warning`, `danger` variants use the status pairs, with a 14px icon for run states.
- **Tag:** an outlined topic label (1px 8px, 1.5px ink border, no fill). Inside an inverted dispatch its border and text turn white.

### Blocks and containers
There are no cards. Grouping is by rule or by a solid fill with square corners and no border:
- **Panel:** a plain section under a panel heading; stacked panels are separated by 64px, a 1px ink rule and 40px.
- **AI panel:** amber surface, 24px padding, opening with an amber disclaimer line and an info icon.
- **Source box:** ink block, 24px padding, the official document link at 1.375rem condensed heavy with an external-link icon and a muted retrieval note.
- **Filter bar:** wash block, 24px padding, fields aligned to the bottom edge.
- **Notice:** wash block (12px 16px) with an icon; the error variant uses the danger pair.
- **Empty state:** 2px dashed ink border, 64px 24px padding, a heading, one grey sentence and at most one button, left aligned.

### Inputs / Fields
- **Style:** paper fill, 2px ink border, square, 46px tall, 12px side padding. Label above in 0.875rem bold; optional grey hint below in 0.875rem.
- **Focus:** 3px wire outline flush to the border (0 offset).
- **Checkbox:** 22px native box with wire-deep accent, bold label, 46px row height.
- **Status line:** grey by default; bold success green or danger red after an action.

### Navigation
- **Masthead:** ink bar, 64px, sticky. Wordmark at left: 1.625rem, weight 900, condensed, uppercase, with the second word in wire red. Three links at right (weight 600, 44px tall, 16px side padding) in on-ink muted; hover turns them white; the current page is white with a 4px wire bar along the bottom edge. After the links, separated by a 1px rule, the last source-check date with the date in white at 600.
- **Back link:** bold text with a 16px left arrow, 44px tall; wire-deep on hover.
- **Text links:** inherit colour, 2px underline offset 3px; the underline turns wire red on hover.
- **Mobile:** the nav wraps to a second row under the wordmark; the check time moves to the top right.

### Dispatch row (signature)
The unit of the whole site: one ruling as a wire dispatch. Left, the dateline: the day as a 3rem condensed numeral over month and year in grey. Centre, a condensed heavy heading that is the link, then the subject keywords in grey (two lines, joined by middle dots), an optional summary line led by the amber "AI summary" badge, then topic tags. Right, the case number in bold ink over the court name in grey, with a 22px arrow beneath. Rows are separated by 3px ink rules under a 6px top rule and bleed 16px beyond the column so the hover fill has room.

The whole row is the hit area. On hover or keyboard focus it inverts to ink over 180ms: text turns white, secondary text turns on-ink muted, the arrow turns wire red and slides 8px right. Keyboard focus draws a 3px wire outline inset around the row. The first row on the home page is the lead: its heading is set at headline size and its subject line at lede size, three lines.

### View-all bar
A full-width ink bar that closes a dispatch list: condensed heavy text at up to 2.25rem on the left, a 28px arrow on the right. Hover turns the bar wire-deep and slides the arrow 8px.

### Hero block
An opaque ink block over the lower left of the home photograph with an 8px wire rule on top, holding the display headline, a two-sentence standfirst and a wire and a ghost button. It wipes in once on load, left to right, over 900ms.

### Fact list and tables
- **Fact list:** a definition list under a 4px ink rule; each row is a grey 0.875rem term over a bold value, divided by 1px line hairlines. An inline variant sets three facts across.
- **Table:** grey bold 0.875rem headers over a 4px ink rule; rows divided by 1px hairlines; numbers right aligned in tabular figures; scrolls horizontally when narrow.

### Footer
An ink band in on-ink muted text at 0.9375rem: the product name (condensed, 900, uppercase, white), the standing verification disclaimer, and the photograph credit with licence. Links are white.

### Motion
One easing curve, cubic-bezier(0.16, 1, 0.3, 1). Colour swaps take 160 to 180ms, arrow slides 220ms, the hero wipe 900ms once. Reduced-motion preference removes all of it.

## Do's and Don'ts

### Do:
- **Do** show case number, court and judgment date on every ruling, with the official EUR-Lex link one step away.
- **Do** build hierarchy with Archivo's width axis: 68% width at weight 800 for headings, normal width at 400 for reading.
- **Do** separate items with ink rules and pick the thickness from the ladder (6, 4, 3, 2, 1px) by rank.
- **Do** keep every corner square.
- **Do** show hover and focus by inverting the surface to ink or wire-deep, and give keyboard focus the same inversion plus a 3px wire outline.
- **Do** use `wire-deep` for any red fill or red text, and `wire` for rules, marks and outlines.
- **Do** mark generated text with the amber AI badge or panel and keep it apart from the official record.
- **Do** keep interactive targets at least 44px tall and controls at 46px.
- **Do** credit sourced photographs in the footer with author and licence.

### Don't:
- **Don't** add a second typeface, a serif, or a monospace; code and figures stay in Archivo.
- **Don't** set headings, labels or buttons in uppercase or with added tracking; uppercase belongs to the product name only.
- **Don't** round corners or add drop shadows, glows or blur.
- **Don't** box content in bordered or shadowed cards; group with a rule, the wash tone, or a solid ink block.
- **Don't** dim, tint or gradient the hero photograph, and don't set text directly on it.
- **Don't** introduce another accent colour, or use amber, green or the pink danger surface for anything but status.
- **Don't** use amber for court facts or official metadata.
- **Don't** bring back the side menu or the navy-and-gold palette.
