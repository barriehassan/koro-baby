# KORO BABY — Task 01 review

Prepared 2 November 2026 for Hassan Barrie / NOMOLI FORGE.

## Delivered

A local React/TypeScript/Vite discussion prototype. Ten players share consistent simulated saved avatar presets across table, compact grid, chat and confirmation. Hassan is Master 100 and local user Mariama is Police 90. The other eight players are eligible suspects. Their paper values are not stored in browser data.

Together/Remote changes presentation without changing rules. On desktop the courtyard/table sits beside chat; Together enlarges the table. Phones switch Players/Discussion. All ten seats remain fixed through selection and layout changes. The optional two-column phone grid is scrollable and makes labels and portraits larger.

Private selection, chat draft, a local-only message log, private Police paper, confirmation/cancel, acknowledgement/reset, reduced motion, lighter graphics and optional confirmation tone are implemented. Paper automatically hides when the document becomes hidden. Dialogs use a product wrapper around Radix Dialog. Full-screen artwork is not used as a substitute for working controls.

## Verification actually completed

- Vitest: **6 tests passed**, 0 failed. Checks role eligibility and initial disabled action; selection/draft preservation across all presentation switches; nonempty chat validation and literal rendering of script text; own-paper visibility and Escape focus restoration; matching selected avatar, confirmation cancellation, acknowledgement lock and reset; keyboard selection and reduced-motion toggle.
- TypeScript strict compilation: passed as part of production build.
- ESLint: passed after adding the Node globals for the dependency-free preview script.
- Vite production build: passed.
- Cloud Chrome: desktop rendering, selected suspect, 390×844 viewport rendering, mobile chat/draft retention and accusation cancellation/focus observed. Responsive development iframe used because the available browser surface has no viewport-resize API.
- 360×640 and 320×640 responsive iframe checks: all ten cards present; no horizontal overflow. At a 320px outer frame, content width was 305px (15px desktop scrollbar), with minimum player-card width 49px. At 360px outer frame it was 345px, with minimum card width about 55px. 390px frame content width 375px, no overflow. These are browser viewport simulations, not physical-device tests.
- 320px grid: two columns of 118px, scrollable roster 690px high, no horizontal document overflow.
- Browser preview captures: desktop, 390px phone, and phone accusation confirmation in docs/previews.
- Dependency-free production preview server smoke test: / returned HTTP 200 with correct title, avatar asset returned HTTP 200 image/webp, missing path HTTP 404.

## Measured production payload

| File | Transfer size |
| --- | ---: |
| Avatar atlas WebP | 290,614 bytes |
| Courtyard WebP | 437,864 bytes |
| JavaScript (gzip) | 89,894 bytes |
| CSS (gzip) | 6,310 bytes |
| Total above | **824,682 bytes (~0.825 MB)** |

HTML adds less than 1 KB. Gzip figures are local measurements assuming compression by the eventual host; the included minimal preview script serves JS/CSS without gzip. Even uncompressed assets and code remain approximately 1.04 MB. Initial artwork is loaded eagerly in this bounded single-screen trial; further scene loading should be deferred in the full app. No timed network throttling or p95 measurements were performed.

## Limits and review decisions

- Fixed simulated saved avatar presets, not the full modular avatar builder or account persistence. No actual player has joined or saved data. Hair/outfit fields describe each preset; they cannot yet be mixed independently.
- Table uses consistent portrait cards over a separate table; avatars are not fully rigged seated bodies. Review this visual approach before spending on all poses.
- Original artwork matches the broad palette and cultural direction, but differs from the uploaded pictures. The wordmark is provisional text. Cultural review and final art approval remain open.
- Material Expressive-inspired custom tokens and Radix behaviour, not a complete official or third-party Expressive implementation. See COMPONENT_EVALUATION.md for evaluated alternatives and the scope of the evaluation.
- Demo clock is fixed at 00:42 and labelled simulated. No phase engine, random allocation, actual scoring, multiplayer, auth, database, voice or Detective tools.
- Small phones require vertical scrolling; grid mode provides more readable player labels. Native software keyboard, physical touch, screen readers, Safari/Firefox/Edge, Windows and real Android hardware remain unverified. No full WCAG compliance claim.
- Settings and messages are transient; reload resets the demo. The build includes only one daylight atmosphere.
- No repo commit, push or public deployment. Remote repository was inspected read-only and its README introduction and MIT licence were retained in this package.

## Suggested owner review

Open the offline preview and assess the avatar consistency, table/card arrangement, two-column grid, artwork and chat readability. If the visual approach is accepted, authorise repository commit/push separately. Continue to the pure Classic game engine only after Task 01 review; do not turn this mock into a public unauthenticated multiplayer service.
