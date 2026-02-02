import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RHOT Tarot — Digital Meaning Guide",
  description: "Scan your card. Get the meaning. Start the storyline.",
  manifest: "/site.webmanifest"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
