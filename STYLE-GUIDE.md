# Style guide (inherited from the live site)

Extracted 2026-10-14 from the live Price Chopper "Scan an item" page. Code lives in `src/styles/tokens.css`. This is a starting point and will grow as we inspect more screens.

| Token | Value | Used for |
|---|---|---|
| brand | `#0d6efd` | primary buttons, page headings |
| brand-link | `#0b5acf` | inline links on the info bar |
| brand-deep | `#0a4fb6` | footer background |
| accent | `#ba121c` | nav pills, store info bar |
| badge | `#e5484d` | cart and list count badges |
| ink | `#262626` | body text, header text |
| muted | `#737373` | secondary text |
| field | `#efefef` | form field background |

**Type:** Inter (body, UI 13–16px, buttons 700) · IBM Plex Serif 500/600/700 (headings, H2 is 34px/700) · Cookie (script accent).
**Radii:** 8 (inputs/lookup button) · 10 (primary button) · 999 (pills).
**Layout:** content max width ~1136px; footer text 13px, links white at 86% opacity.
**Known gaps in the live UI** (candidates for refinement): inputs fall back to default browser styling (Arial 13px, no radius), the lookup button and input don't share a radius with the primary button, and a few nav labels are 12.5px.
