"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Card } from "@/lib/cards";

function hashToIndex(input: string, mod: number) {
  // simple deterministic hash
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % mod;
}

export default function DailyDraw({ cards }: { cards: Card[] }) {
  const [slug, setSlug] = useState<string | null>(null);

  const todaySlug = useMemo(() => {
    const d = new Date();
    const key = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    const idx = hashToIndex(key, cards.length);
    return cards[idx]?.slug ?? cards[0]?.slug ?? null;
  }, [cards]);

  useEffect(() => {
    setSlug(todaySlug);
  }, [todaySlug]);

  const card = useMemo(() => {
    if (!slug) return null;
    return cards.find((c) => c.slug === slug) ?? null;
  }, [cards, slug]);

  if (!card) return <div className="small">Loading…</div>;

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          className="primaryButton"
          onClick={() => setSlug(todaySlug)}
          type="button"
        >
          Reveal today’s card
        </button>

        <button
          className="pillButton"
          onClick={() => {
            const idx = Math.floor(Math.random() * cards.length);
            setSlug(cards[idx].slug);
          }}
          type="button"
        >
          Draw again
        </button>
      </div>

      <div style={{ marginTop: 14 }} className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div>
            <div className="badge">{card.suit}</div>
            <h3 style={{ marginTop: 10, marginBottom: 6 }}>{card.title}</h3>
            {card.voice && <div className="small">{card.voice}</div>}
          </div>
          <Link className="pillButton" href={`/cards/${card.slug}`}>
            Read full meaning →
          </Link>
        </div>

        {card.pullQuote && <div className="small" style={{ marginTop: 10 }}>“{card.pullQuote}”</div>}
        <p style={{ marginTop: 12, marginBottom: 0 }}>{card.meaning}</p>
      </div>
    </div>
  );
}
