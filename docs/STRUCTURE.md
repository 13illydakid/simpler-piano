# Project structure and naming guide

This repo is a Next.js app using the `pages` router. The UI is organized by features under `src/features` with page-level components in `src/features/pages/*` and shared UI in `src/components`.

## High-level layout

- `src/pages`: Next.js route entries, kept thin; they import page UIs from `src/features/pages/*`.
- `src/features`: Domain-specific code grouped by capability (player, midi, synth, data, visualization, etc.).
  - `src/features/pages/<PageName>`: Page UIs and subcomponents for that page.
  - `src/features/...`: Other features (e.g., `player`, `midi`, `synth`, `SongVisualization`).
- `src/components`: Reusable presentational components (AppBar, Modal, inputs, etc.).
- `src/hooks`: Shared React hooks.
- `src/utils`: Utilities and helpers.
- `public/music`: Built-in MIDI assets and backing tracks.

## Naming conventions

- Prefer descriptive file names over `index.tsx` where possible, to reduce editor ambiguity:
  - Example: `src/features/pages/SelectSong/SelectSongPage.tsx` (re-exported by `index.ts`).
  - Example: `src/features/pages/Freeplay/FreeplayPage.tsx` (re-exported by `index.ts`).
- Keep `index.ts` as a small barrel that re-exports from the descriptive file to preserve import paths.
- For complex components, name files after the component (e.g., `SongScrubBar.tsx`, `MidiModal.tsx`).
- Expose a stable barrel at `src/features/pages/index.ts` so pages can import `{ Home, SelectSong, PlaySong, ... }` consistently.

## API and assets

- Built-in MIDI: served via `/api/midi?id=...&source=builtin`.
- Procedural/Irish training MIDI: fetched via `/api/midi-static?path=music/irish/...mid` to ensure correct `Content-Type` in dev and prod.
- Soundfonts: loaded from `/soundfonts/FluidR3_GM/<instrument>-mp3.js` in `public/soundfonts`.

## Future improvements

- Continue renaming remaining page files to remove large `index.tsx` files (`Home`, `About`, `Training`, `PlaySong`).
- Add per-feature README files where helpful (e.g., `src/features/player/README.md`).
- Consider grouping shared atoms under `src/shared/{components,hooks,utils}` if the codebase grows further.
- Remove old commented-out fetch code in `src/pages/songs.tsx` or wire it to a real endpoint.
