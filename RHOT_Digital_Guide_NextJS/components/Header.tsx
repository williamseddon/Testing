import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <div className="brand">
        <h1>RHOT Digital Guide</h1>
        <div className="sub">Classic tarot, iconic voices. First Edition • 2026</div>
      </div>

      <div className="nav">
        <Link href="/">Guide</Link>
        <Link href="/daily">Daily Draw</Link>
        <Link href="/favorites">Favorites</Link>
        <span className="badge">First Edition • 2026</span>
      </div>
    </div>
  );
}
