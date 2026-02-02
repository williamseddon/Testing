import Header from "@/components/Header";
import GuideBrowser from "@/components/GuideBrowser";
import { getAllCards } from "@/lib/cards";

export default function Page() {
  const cards = getAllCards();

  return (
    <div className="container">
      <Header />

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0 }}>Scan your card → get the meaning instantly</h2>
            <div className="small" style={{ marginTop: 6 }}>
              Search by card name, voice, quote, or keyword.
            </div>
          </div>
          <span className="badge">First Edition • 2026</span>
        </div>

        <div className="hr" />

        <GuideBrowser cards={cards} />

        <div className="hr" />
        <div className="small">
          Disclaimer: Independent product. Not affiliated with or endorsed by any television network, production company, or franchise.
        </div>
      </div>
    </div>
  );
}
