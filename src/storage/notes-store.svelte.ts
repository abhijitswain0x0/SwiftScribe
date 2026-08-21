import { storage } from './index'
import type { Note } from './types'

const AUTOSAVE_DELAY_MS = 300
const MAX_TITLE_LENGTH = 80

function generateId(): string {
  // crypto.randomUUID needs a secure context; fall back for file:// builds
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/** Derives the note title from the first heading, or the first non-empty line. */
export function extractTitle(content: string): string {
  const firstLine = content.split('\n').find((line) => line.trim().length > 0)?.trim() ?? ''
  const heading = /^#{1,6}\s+(.*)$/.exec(firstLine)
  const raw = heading ? heading[1] : firstLine
  const cleaned = raw.replace(/[*_`~[\]]/g, '').trim()
  if (cleaned.length <= MAX_TITLE_LENGTH) return cleaned
  return cleaned.slice(0, MAX_TITLE_LENGTH - 1).trimEnd() + '…'
}

function newNote(): Note {
  const now = Date.now()
  return {
    id: generateId(),
    title: '',
    content: '',
    createdAt: now,
    updatedAt: now,
    pinned: false,
    favorite: false,
    archived: false,
    tags: [],
  }
}

class NotesStore {
  notes = $state<Note[]>([])
  selectedId = $state<string | null>(null)

  #saveTimers = new Map<string, ReturnType<typeof setTimeout>>()

  get selected(): Note | undefined {
    return this.notes.find((note) => note.id === this.selectedId)
  }

  async load(): Promise<void> {
    await storage.init()
    this.notes = await storage.listNotes()
  }

  async createNote(): Promise<Note> {
    const note = newNote()
    this.notes.unshift(note)
    this.selectedId = note.id
    await storage.saveNote(note)
    return note
  }

  updateContent(id: string, content: string): void {
    const note = this.notes.find((n) => n.id === id)
    if (!note || note.content === content) return
    note.content = content
    note.updatedAt = Date.now()
    if (!note.titleManual) note.title = extractTitle(content)
    this.#scheduleSave(id)
  }

  renameNote(id: string, title: string): void {
    const note = this.notes.find((n) => n.id === id)
    if (!note) return
    note.title = title
    note.titleManual = true
    note.updatedAt = Date.now()
    this.#scheduleSave(id)
  }

  async duplicateNote(id: string): Promise<void> {
    const source = this.notes.find((n) => n.id === id)
    if (!source) return
    const now = Date.now()
    const copy: Note = {
      ...source,
      tags: [...source.tags],
      id: generateId(),
      title: source.title ? `${source.title} copy` : 'copy',
      createdAt: now,
      updatedAt: now,
    }
    this.notes.unshift(copy)
    this.selectedId = copy.id
    await storage.saveNote(copy)
  }

  async deleteNote(id: string): Promise<void> {
    this.#cancelScheduledSave(id)
    this.notes = this.notes.filter((note) => note.id !== id)
    if (this.selectedId === id) this.selectedId = this.notes[0]?.id ?? null
    await storage.deleteNote(id)
  }

  selectNote(id: string | null): void {
    if (this.selectedId !== null) void this.flushPendingSaves()
    this.selectedId = id
  }

  /** Persists any debounced edits immediately (note switch, window blur, quit). */
  async flushPendingSaves(): Promise<void> {
    const ids = [...this.#saveTimers.keys()]
    for (const id of ids) {
      this.#cancelScheduledSave(id)
      const note = this.notes.find((n) => n.id === id)
      if (note) await storage.saveNote({ ...note })
    }
  }

  #scheduleSave(id: string): void {
    this.#cancelScheduledSave(id)
    const timer = setTimeout(() => {
      this.#saveTimers.delete(id)
      const note = this.notes.find((n) => n.id === id)
      if (note) void storage.saveNote({ ...note })
    }, AUTOSAVE_DELAY_MS)
    this.#saveTimers.set(id, timer)
  }

  #cancelScheduledSave(id: string): void {
    const timer = this.#saveTimers.get(id)
    if (timer !== undefined) {
      clearTimeout(timer)
      this.#saveTimers.delete(id)
    }
  }
}

export const notesStore = new NotesStore()
