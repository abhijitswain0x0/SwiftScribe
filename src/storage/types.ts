export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
  pinned: boolean
  favorite: boolean
  archived: boolean
  tags: string[]
  color?: string
  /** Set once the user renames the note manually; disables auto-titling. */
  titleManual?: boolean
}

/**
 * Persistence boundary for notes. Implementations must keep the renderer
 * free of storage details so future sync providers (iCloud, Dropbox, WebDAV...)
 * can be swapped in without touching UI code.
 */
export interface NoteStorageProvider {
  init(): Promise<void>
  listNotes(): Promise<Note[]>
  getNote(id: string): Promise<Note | undefined>
  saveNote(note: Note): Promise<void>
  deleteNote(id: string): Promise<void>
}
