import Header from "@/components/Header";
import FavoritesView from "@/components/FavoritesView";
import { getAllCards } from "@/lib/cards";

export default function FavoritesPage() {
  const cards = getAllCards();
  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Favorites</h2>
        <div className="small">Saved on this device (no account required).</div>
        <div className="hr" />
        <FavoritesView cards={cards} />
      </div>
    </div>
  );
}
