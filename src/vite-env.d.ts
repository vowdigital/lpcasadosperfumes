/// <reference types="vite/client" />

interface Window {
  dataLayer?: Array<Record<string, unknown>>
  fbq?: (...args: unknown[]) => void
}
