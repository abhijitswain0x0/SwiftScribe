# AGENTS.md

## Repo state

- Greenfield project: `app_description.md` is the full product spec. Read it before building anything — it defines features, layout, shortcuts, and data model.
- Electron shell is wired up (window, native menus, IPC skeleton via `vite-plugin-electron`). Renderer is still a placeholder; storage/UI features not started.

## Commands

- `pnpm dev` — launches the full Electron app with HMR (Vite dev server + main-process hot restart)
- `pnpm build` — production build: renderer to `dist/`, main + preload to `dist-electron/`
- `pnpm typecheck` — checks both configs: renderer (`tsconfig.json`) and main process (`tsconfig.electron.json`)
- `pnpm check` — svelte-check (type diagnostics for `.svelte` files)

## Locked stack decisions (from the spec)

- Electron + Svelte + TypeScript (strict mode) + Vite
- **pnpm exclusively** — never npm or yarn
- IndexedDB for all note storage (LocalStorage fallback acceptable for MVP only)
- Markdown via **markdown-it** (decided over marked); highlight.js for code blocks
- electron-builder for packaging

## Toolchain gotchas

- TypeScript is pinned to `~6`: svelte-check does not support TS 7 (native/tsgo) yet.
- Electron's npm package no longer has a postinstall hook. After a fresh `pnpm install`, if `node_modules/electron/dist/electron.exe` is missing, run `node node_modules/electron/install.js`.
- Dependency build-script approvals live in `pnpm-workspace.yaml` under `allowBuilds` (pnpm 11 ignores the `pnpm` field in package.json).
- Vite uses `base: './'` — required for Electron `file://` loading; don't change it.
- Preload is emitted as ESM (`preload.mjs`), which requires `sandbox: false` in `webPreferences`. Keep `contextIsolation: true`.
- Renderer talks to the main process only via `window.swiftscribe` (exposed in `electron/preload.ts`, typed in `src/vite-env.d.ts`).

## Architecture rules

- `/electron` = main process only (window management, native menus, IPC). `/src` = Svelte renderer, organized as `components/ editor/ storage/ search/ ui/ utils/ styles/ assets`.
- All native work (file dialogs, filesystem import/export) goes through Electron IPC. Keep the renderer UI-only.
- Abstract the storage layer behind an interface so future sync providers (iCloud, Dropbox, WebDAV...) can be added without refactoring.
- Fully offline-first and local-only: no network calls, no server dependency.

## Product conventions

- Autosave on every edit — there is no Save button anywhere in the UI.
- Note titles auto-generate from the first heading/line unless renamed manually.
- Animations stay subtle (150–250 ms) and must respect `prefers-reduced-motion`.

## Git workflow

- Branch before starting any feature; never commit directly to the default branch (`main`).
- Commit in small, readable steps — one logical change per commit.
- Conventional commit messages: `feat:`, `fix:`, `style:`, `chore:`, `docs:`, `refactor:` (e.g. `feat: add note search`).
- Merge to the default branch via pull request only.
