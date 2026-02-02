import Header from "@/components/Header";
import DailyDraw from "@/components/DailyDraw";
import { getAllCards } from "@/lib/cards";

export default function DailyPage() {
  const cards = getAllCards();
  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Daily Draw</h2>
        <div className="small">Tap to reveal today’s card. (You can also draw again for fun.)</div>
        <div className="hr" />
        <DailyDraw cards={cards} />
      </div>
    </div>
  );
}
