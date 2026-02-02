import Link from "next/link";
import { getAllCards, getCard, getAdjacentSlugs } from "@/lib/cards";
import FavoriteButton from "@/components/FavoriteButton";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllCards().map((c) => ({ slug: c.slug }));
}

export default function CardPage({ params }: { params: { slug: string } }) {
  const card = getCard(params.slug);
  if (!card) return notFound();

  const { prev, next } = getAdjacentSlugs(card.slug);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <Link href="/" className="small">← Back to guide</Link>
        <span className="badge">{card.suit}</span>
      </div>

      <div style={{ marginTop: 12 }} className="card">
        <h1 style={{ marginTop: 0, marginBottom: 8 }}>{card.title}</h1>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div className="small">
            {card.voice ? <>Featuring: <b>{card.voice}</b></> : <>First Edition • {card.year ?? 2026}</>}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <FavoriteButton slug={card.slug} />
            <button
              className="pillButton"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard?.writeText(url);
              }}
              type="button"
            >
              Copy link
            </button>
          </div>
        </div>

        {card.pullQuote && (
          <p style={{ marginTop: 16, fontStyle: "italic" }}>
            “{card.pullQuote}”
          </p>
        )}

        <p style={{ marginTop: 14, marginBottom: 0 }}>
          {card.meaning}
        </p>

        <div className="hr" />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          {prev ? <Link className="pillButton" href={`/cards/${prev}`}>← Previous</Link> : <span />}
          {next ? <Link className="pillButton" href={`/cards/${next}`}>Next →</Link> : <span />}
        </div>
      </div>
    </div>
  );
}
