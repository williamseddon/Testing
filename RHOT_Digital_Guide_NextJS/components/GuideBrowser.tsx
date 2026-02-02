"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Card } from "@/lib/cards";

const SUITS = ["All", "Major Arcana", "Wands", "Pentacles", "Swords", "Cups"];

export default function GuideBrowser({ cards }: { cards: Card[] }) {
  const [q, setQ] = useState("");
  const [suit, setSuit] = useState("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return cards.filter((c) => {
      const matchSuit = suit === "All" ? true : c.suit === suit;
      if (!matchSuit) return false;
      if (!query) return true;
      const haystack = `${c.title} ${c.voice ?? ""} ${c.pullQuote ?? ""} ${c.meaning}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [cards, q, suit]);

  return (
    <>
      <div className="controlRow">
        <input
          placeholder="Search a card, voice, quote, keyword…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          inputMode="search"
          aria-label="Search cards"
        />
        <select value={suit} onChange={(e) => setSuit(e.target.value)} aria-label="Filter by suit">
          {SUITS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid" role="list">
        {filtered.map((c) => (
          <Link key={c.slug} href={`/cards/${c.slug}`} role="listitem" aria-label={`Open ${c.title}`}>
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>{c.title}</div>
                <div className="badge">{c.suit}</div>
              </div>
              {c.voice && <div className="small" style={{ marginTop: 6 }}>{c.voice}</div>}
              {c.pullQuote && (
                <div className="small" style={{ marginTop: 10 }}>
                  “{c.pullQuote}”
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 12 }} className="small">
        Showing <b>{filtered.length}</b> of <b>{cards.length}</b> cards
      </div>
    </>
  );
}
