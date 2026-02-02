import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="container">
      <Header />
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Card not found</h2>
        <div className="small">That link doesn’t match a card in this edition.</div>
        <div className="hr" />
        <Link className="pillButton" href="/">Back to guide</Link>
      </div>
    </div>
  );
}
