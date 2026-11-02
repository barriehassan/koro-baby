# Koro Baby

A Sierra Leonean social bluffing web game by NOMOLI FORGE. Relive Koro Baby with friends through secret paper draws, investigations, and playful accusations—featuring illustrated local settings and responsive Together and Remote play.

## Task 01 — local discussion prototype

React + TypeScript + Vite. Ten simulated players, consistent illustrated avatar presets, courtyard/table and responsive grid views, Together/Remote layouts, local demo chat, own-paper overlay, private suspect selection and accusation acknowledgement. No backend, live players, accounts, actual rounds or scoring.

### Open the included preview without installing packages

Requires Node.js 22.12+ (Node 24 LTS recommended). Extract the entire ZIP, open a terminal in this folder, then:

```sh
node scripts/preview.mjs
```

Open http://localhost:4173 in your browser. The downloadable Task 01 ZIP includes a `dist/` build requiring no npm install and no internet. Git checkouts exclude generated `dist/`; run the Develop and build steps first. Windows users can also run `start_preview_windows.bat`; if Windows blocks the batch file, use the terminal command above. Stop the server with Ctrl+C. Do not open `dist/index.html` directly with a file URL.

### Develop

```sh
npm ci
npm run dev
```

Open the local URL Vite prints. Install packages once; later source changes can be made offline while dependencies remain installed.

### Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

### Review flow

1. You are Mariama, Police 90. Hassan is Master 100; neither can be accused.
2. Select Mohamed or another suspect. Switch Table/Grid and Together/Remote: selection stays.
3. On phones, switch Discussion/Players. Type a draft, switch back and confirm the draft remains.
4. Open View my paper; only Police 90 appears. Escape or Hide restores focus.
5. Review accusation. The selected player's avatar must match their table and chat avatar. Cancel preserves selection.
6. Lock accusation produces a local acknowledgement. It never invents a result or score. Reset starts again.
7. Try reduced motion, lighter graphics and the optional confirmation tone in Settings.

All messages and selections are transient React state and reset on reload. No data is sent to a game service. Names/avatars are simulated saved choices; this is not the full avatar customiser. Both layout modes have the same rules.

## Files

- `src/App.tsx`: discussion interface and reusable avatar/modal/player patterns.
- `src/model.ts`: simulated saved avatar configurations and public role data. No suspect paper values are present.
- `src/styles.css`: shared tokens, responsive layouts and motion preferences.
- `src/App.test.tsx`: behavioural interaction checks.
- `docs/TASK01_REVIEW.md`: implementation decisions, checks and limits.
- `docs/ASSET_MANIFEST.md`: illustration provenance and generation briefs.
- `docs/previews/`: captured browser previews.
- `qa.html`: development-only responsive viewport harness. Available with Vite at `/qa.html?w=390&h=844`; not part of the production build.

Repository inspected: https://github.com/barriehassan/koro-baby (main contained README.md and LICENSE at inspection). This project preserves the repository introduction and licence. Task 01 is maintained on `kb-v1`; no public deployment is included.
