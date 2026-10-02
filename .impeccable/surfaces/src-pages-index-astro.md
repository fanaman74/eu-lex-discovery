---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/cases/index.astro","src/layouts/Layout.astro"]
---

# Home page

Scope: `/` (home). Visitor mode: Persuade. Related: `/cases` list and case rows inherit the same world in Read mode; monitoring and settings in Operate mode.

Audience: general public and press arriving cold. Job: see what this tracks, trust it, open a recent ruling. Action: read the latest rulings, then browse all. Proof: the real cases, each with its official EUR-Lex link; no invented claims.

Pinned by the owner: top menu bar (no side menu), big photographic hero, the five latest cases, a view-all button. A plain or timid result is a failure. Build path: code-led (no image generation available).

Unresolved: how operator pages are protected on the public site.

## Direction contract

THESIS: Court Wire. Each ruling is filed like a dispatch from Luxembourg: dateline, headline, what it is about. Refuses the legal-portal arrangement of a centred headline on a dimmed photo above a table of links.

OWN-WORLD: Newsprint black, white, one wire-service red. A single grotesque family whose width axis does the hierarchy: condensed and heavy for headlines, normal for reading. Square corners, heavy black rules between dispatches, no cards, no serif, no monospace. Rows invert to black on hover with a red arrow.

STORY: The visitor understands these are real EU court decisions about rights at work, believes them because every row names its case number, court and date and leads to the official judgment, and opens one.

FIRST VIEWPORT: Black top bar with the wordmark left, three links and the last source-check time right. Below it the full-bleed photograph of the Court's entrance with its yellow canopy, filling most of the viewport. A solid black block sits over the lower left of the photo carrying the headline at front-page scale (up to 6rem, condensed, heavy), a two-sentence standfirst, and two actions: "Read the latest rulings" (red) and "Browse all". Photo credit bottom right.

FORM: News-agency wire dispatch front page; candidate 1 of 7 on the grounded list, chosen by the owner over the rolled direction; seed key dd66b801. Signature interaction: dispatch rows invert on hover and focus. Motion: the headline block wipes in once on load.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
