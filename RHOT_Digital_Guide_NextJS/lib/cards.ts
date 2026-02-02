import cards from "@/data/cards.json";

export type Card = {
  slug: string;
  suit: string;
  title: string;
  voice?: string;
  pullQuote?: string;
  meaning: string;
  edition?: string;
  year?: number;
};

export function getAllCards(): Card[] {
  return cards as Card[];
}

export function getCard(slug: string): Card | undefined {
  return getAllCards().find((c) => c.slug === slug);
}

export function getAdjacentSlugs(slug: string): { prev?: string; next?: string } {
  const all = getAllCards();
  const idx = all.findIndex((c) => c.slug === slug);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? all[idx - 1].slug : undefined,
    next: idx < all.length - 1 ? all[idx + 1].slug : undefined
  };
}
