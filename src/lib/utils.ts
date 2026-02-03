import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}
