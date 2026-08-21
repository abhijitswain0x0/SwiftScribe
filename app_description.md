Build a minimal, Apple Notes-inspired Markdown note-taking desktop app using Electron, Svelte, and TypeScript. The application should be fast, lightweight, offline-first, and store all data locally using IndexedDB (preferred) or LocalStorage (acceptable for an MVP). The primary goal is an elegant writing experience with clean architecture and excellent performance.

## Design Philosophy

- Inspired by Apple Notes
- Minimal, clean, and distraction-free
- Fast startup and instant interactions
- Native-feeling animations
- Plenty of whitespace
- Rounded corners
- Responsive desktop window with sensible minimum size
- Keyboard-first workflow
- No unnecessary UI clutter
- Accessibility built in

## Tech Stack

- Electron (desktop shell)
- Svelte + TypeScript
- Vite for build tooling and HMR
- pnpm for package management
- Markdown parser (Marked or markdown-it)
- highlight.js for syntax highlighting
- IndexedDB for storage
- electron-builder (or equivalent) for packaging and distribution

## Layout

Desktop:

+----------------------+--------------------------------------+
|                      |                                      |
| Sidebar              | Markdown Editor                      |
|                      |                                      |
| Search               | Toolbar                              |
| New Note             |                                      |
|                      |                                      |
| Note List            | Writing Area                         |
|                      |                                      |
|                      |                                      |
+----------------------+--------------------------------------+

Sidebar:
- Width: ~260px
- Collapsible
- Smooth animation

Editor:
- Full height
- Comfortable padding
- Large writing area
- Auto focus when opening notes

## Features

### Notes

- Create note
- Delete note
- Duplicate note
- Pin notes
- Favorite notes
- Archive notes
- Automatically generate title from first heading or first line
- Rename manually
- Drag to reorder
- Multi-select actions (optional)

Each note stores:

- id
- title
- content
- createdAt
- updatedAt
- pinned
- favorite
- archived
- tags
- color (optional)

Everything autosaves immediately.

No Save button.

## Editor

Support full Markdown including:

- Headings
- Bold
- Italics
- Strikethrough
- Lists
- Checklists
- Blockquotes
- Tables
- Code blocks
- Inline code
- Images
- Links
- Horizontal rules
- Task lists

Additional editor features:

- Autosave
- Undo / Redo
- Optional line numbers
- Tab indentation
- Smart list continuation
- Character count
- Word count
- Reading time estimate
- Auto pair brackets and quotes
- Restore cursor position

## Preview

Modes:

- Editor
- Preview
- Split View

Preview should resemble GitHub Markdown styling with:

- Syntax highlighting
- Responsive tables
- Beautiful typography
- Image scaling
- Copy code buttons

## Search

Instant full-text search across:

- Titles
- Content
- Tags

Highlight search matches.

Support fuzzy search.

## Sorting

Allow sorting by:

- Last edited
- Date created
- Alphabetical
- Pinned first

## Keyboard Shortcuts

Ctrl/Cmd + N → New Note
Ctrl/Cmd + F → Search
Ctrl/Cmd + P → Quick Switcher
Ctrl/Cmd + B → Bold
Ctrl/Cmd + I → Italic
Ctrl/Cmd + Shift + P → Toggle Preview
Ctrl/Cmd + / → Markdown Cheat Sheet
Ctrl/Cmd + D → Duplicate Note
Delete → Delete Selected Note

## User Experience

On startup:

- Restore previously opened note
- Restore scroll position
- Restore cursor position
- Restore sidebar state
- Restore theme

Autosave after every edit.

Deleting notes should show confirmation or move to Trash.

## Themes

Support:

- Light
- Dark
- Auto (System)

Remember user preference.

## Typography

Primary font:

- SF Pro Text
- Inter
- system-ui

Code font:

- JetBrains Mono
- Fira Code
- ui-monospace

Comfortable spacing and readable typography.

## Animations

Subtle animations only (150–250 ms):

- Sidebar collapse
- Note selection
- Hover effects
- Modal dialogs
- Search results
- Theme transitions

Respect prefers-reduced-motion.

## Export & Import

Support:

- Export note as .md
- Export all notes as ZIP
- Import Markdown files
- Import folders of Markdown files
- Backup/restore as JSON

## Offline Support

- Fully functional offline by default (native desktop app)
- No internet required
- All data stored locally on the user's machine

## Accessibility

- Full keyboard navigation
- Proper ARIA labels
- Screen reader support
- High contrast compatibility
- Visible focus indicators

## Performance

Optimize for:

- Thousands of notes
- Instant search
- Lazy rendering
- Fast IndexedDB queries
- Small bundle size
- Low memory usage

## Project Structure

/electron (main process: window management, native menus, IPC)
/src
  /components
  /editor
  /storage
  /search
  /ui
  /utils
  /styles
  /assets

Use TypeScript throughout. Use Electron IPC for any main-process work (native dialogs, file system access for import/export) and keep the Svelte renderer focused on UI. Manage dependencies exclusively with pnpm.

Separate logic into reusable modules.

Keep code clean, documented, and maintainable.

## Future-Proof Architecture

Design storage and data layers so future sync providers (iCloud, Dropbox, GitHub, WebDAV, Google Drive, etc.) can be added without major refactoring.

## Stretch Goals

- Command palette
- Slash commands
- Tags
- Wiki links ([[Page]])
- Backlinks
- Graph view
- Daily notes
- Templates
- Mermaid diagrams
- KaTeX math rendering
- Drag-and-drop image uploads
- File attachments
- Focus mode
- Zen mode
- Vim keybindings
- Multiple windows
- Multiple tabs
- Recently opened notes
- Version history
- Plugin system
- Custom CSS themes

## Code Quality

- Modular architecture
- Well-commented code
- Consistent naming
- Modern ES Modules
- Strict TypeScript
- No unnecessary dependencies
- Responsive design
- Graceful error handling

## Final Goal

Create a polished, production-quality Markdown note-taking desktop app with Electron, Svelte, and TypeScript that feels like Apple Notes while embracing Markdown as the primary editing format. The experience should be beautiful, intuitive, fast, offline-first, and entirely local with no server dependency. Prioritize simplicity, performance, clean architecture, and an exceptional writing experience over feature bloat.
