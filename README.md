# SwiftScribe

A minimal, Apple Notes-inspired markdown note-taking desktop app. Fast, lightweight, offline-first — all notes stay local in IndexedDB.

Built with Electron, Svelte 5, and TypeScript.

## Highlights

- **Distraction-free editor** — clean writing surface with plenty of whitespace, rounded corners, and native-feeling animations
- **Keyboard-first** — a workflow designed around the keyboard, no unnecessary UI clutter
- **Instant search** — find any note as you type
- **Offline-first** — notes are stored locally in IndexedDB; no account, no sync, no telemetry
- **Markdown with syntax highlighting** — powered by [marked](https://github.com/markedjs/marked) and [highlight.js](https://highlightjs.org)

## Tech stack

| Layer     | Choice                                |
| --------- | ------------------------------------- |
| Shell     | Electron                              |
| UI        | Svelte 5 + TypeScript                 |
| Build     | Vite + vite-plugin-electron           |
| Storage   | IndexedDB                             |
| Packaging | electron-builder                      |

## Getting started

Requires [Node.js](https://nodejs.org) and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev      # start the app in development mode
```

Other scripts:

```bash
pnpm build      # production build
pnpm typecheck  # typecheck app + electron code
pnpm check      # svelte-check
```

## Status

Early development. The storage layer (IndexedDB-backed notes store) is in place; editor, search, and UI components are being built out. See [`app_description.md`](app_description.md) for the full design spec.
