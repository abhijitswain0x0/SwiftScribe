import type { Note, NoteStorageProvider } from './types'

const DB_NAME = 'swiftscribe'
const DB_VERSION = 1
const NOTES_STORE = 'notes'

function requestAsPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
  })
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(DB_NAME, DB_VERSION)
    open.onupgradeneeded = () => {
      const db = open.result
      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        db.createObjectStore(NOTES_STORE, { keyPath: 'id' })
      }
    }
    open.onsuccess = () => resolve(open.result)
    open.onerror = () => reject(open.error ?? new Error('Failed to open IndexedDB'))
  })
}

export class IndexedDbProvider implements NoteStorageProvider {
  #db: IDBDatabase | null = null

  async init(): Promise<void> {
    if (!this.#db) this.#db = await openDatabase()
  }

  async listNotes(): Promise<Note[]> {
    const store = this.#store('readonly')
    return requestAsPromise(store.getAll()) as Promise<Note[]>
  }

  async getNote(id: string): Promise<Note | undefined> {
    const store = this.#store('readonly')
    return requestAsPromise(store.get(id)) as Promise<Note | undefined>
  }

  async saveNote(note: Note): Promise<void> {
    const store = this.#store('readwrite')
    await requestAsPromise(store.put(note))
  }

  async deleteNote(id: string): Promise<void> {
    const store = this.#store('readwrite')
    await requestAsPromise(store.delete(id))
  }

  #store(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.#db) throw new Error('Storage not initialized — call init() first')
    return this.#db.transaction(NOTES_STORE, mode).objectStore(NOTES_STORE)
  }
}
