# AGENTS.md

## Repo state

- Greenfield project: the only file is `app_description.md`, the full product spec. Read it before building anything — it defines features, layout, shortcuts, and data model.
- No package.json, build, lint, or test config exists yet. Scaffold first; add scripts and update this file as tooling lands.

## Locked stack decisions (from the spec)

- Electron + Svelte + TypeScript (strict mode) + Vite
- **pnpm exclusively** — never npm or yarn
- IndexedDB for all note storage (LocalStorage fallback acceptable for MVP only)
- Markdown via marked or markdown-it; highlight.js for code blocks
- electron-builder for packaging

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
