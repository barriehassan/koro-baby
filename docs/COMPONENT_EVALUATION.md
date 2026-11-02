# Component foundation evaluation — Task 01

Reviewed official React/Vite guidance, Google's Material guidance, the independent Material 3 Expressive React project's documentation, and Radix Dialog documentation on 2 November 2026.

## Selected prototype foundation

React/TypeScript/Vite, product-specific CSS tokens and native controls, Radix Dialog behind a local Modal wrapper, and Lucide icons. Product wrappers cover Modal, Avatar and PlayerCard; shared button/segmented/panel styles supply the remaining patterns. No CSS-in-JS runtime, remote fonts or external image URLs.

Material Expressive informs hierarchy, tonal surfaces, rounded shapes, selected states and short feedback transitions. This is a custom Expressive-inspired interface, NOT an official Google implementation or a complete Material conformance claim.

## Alternatives considered

- Independent @language-lit/material3-expressive: its current documentation advertises React 18/19, typed tokens, component styles and reduced-motion support. The documented entry baseline is about 104.6 kB gzip JS + 50 kB gzip complete CSS; those are vendor numbers, not measurements here. The site identifies itself as an independent implementation and currently shows a release-candidate version. Did not install or runtime-benchmark it in this task. Re-evaluate before extending to all forms/screens.
- MUI: mature general Material component foundation, but not itself proof of Expressive fidelity; unnecessary general components for this narrow custom illustrated screen.
- Radix + product styles: selected for tested focus trapping, Escape dismissal and focus restoration without imposing a new visual language. It is not an Expressive component library. There is no complex menu/select or routing library in this prototype.

The trial verifies selection, a native chat form, settings checkboxes, modal confirmation and reduced motion. It does not constitute a runtime head-to-head benchmark of all candidates. React/Vite and actual dependency versions are pinned by package-lock.json.

References:
- https://react.dev/learn/typescript
- https://vite.dev/guide/
- https://m3.material.io/
- https://m3e.language-lit.com/
- https://www.radix-ui.com/primitives/docs/components/dialog
