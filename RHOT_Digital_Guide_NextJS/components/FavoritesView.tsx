"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Card } from "@/lib/cards";
import { readFavorites } from "@/lib/favorites";

export default function FavoritesView({ cards }: { cards: Card[] }) {
  const [favSlugs, setFavSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavSlugs(readFavorites());
  }, []);

  const favCards = useMemo(() => {
    const set = new Set(favSlugs);
    return cards.filter((c) => set.has(c.slug));
  }, [cards, favSlugs]);

  if (favCards.length === 0) {
    return (
      <div className="small">
        No favorites yet. Save cards from any card page, then come back here.
      </div>
    );
  }

  return (
    <div className="grid" role="list">
      {favCards.map((c) => (
        <Link key={c.slug} href={`/cards/${c.slug}`} role="listitem">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div className="badge">{c.suit}</div>
            </div>
            {c.voice && <div className="small" style={{ marginTop: 6 }}>{c.voice}</div>}
            {c.pullQuote && <div className="small" style={{ marginTop: 10 }}>“{c.pullQuote}”</div>}
          </div>
        </Link>
      ))}
    </div>
  );
}
