import { contextBridge, ipcRenderer } from 'electron'

const api = {
  getVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
}

contextBridge.exposeInMainWorld('swiftscribe', api)

export type SwiftScribeApi = typeof api
