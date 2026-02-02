"use client";

export default function ShareButton() {
  return (
    <button
      className="pillButton"
      onClick={async () => {
        try {
          const url = window.location.href;
          await navigator.clipboard.writeText(url);
          alert("Link copied!");
        } catch {
          // fallback: open prompt for manual copy
          window.prompt("Copy this link:", window.location.href);
        }
      }}
      type="button"
    >
      Copy link
    </button>
  );
}
