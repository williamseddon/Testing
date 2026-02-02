export const FAVORITES_KEY = "rhot_favorites_v1";

export function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeFavorites(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs));
}

export function toggleFavorite(slug: string): string[] {
  const cur = new Set(readFavorites());
  if (cur.has(slug)) cur.delete(slug);
  else cur.add(slug);
  const next = Array.from(cur);
  writeFavorites(next);
  return next;
}
