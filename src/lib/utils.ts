import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch (_) {
    return false
  }
}

export function formatUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`
  }
  return url
}