import { IndexedDbProvider } from './indexeddb'
import type { NoteStorageProvider } from './types'

export function createStorageProvider(): NoteStorageProvider {
  return new IndexedDbProvider()
}

export const storage: NoteStorageProvider = createStorageProvider()

export type { Note, NoteStorageProvider } from './types'
