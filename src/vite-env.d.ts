/// <reference types="svelte" />
/// <reference types="vite/client" />

declare global {
  interface Window {
    swiftscribe: {
      getVersion(): Promise<string>
    }
  }
}

export {}
