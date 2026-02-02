import fs from "node:fs";
import path from "node:path";

const csvPath = path.join(process.cwd(), "data", "cards.csv");
const outPath = path.join(process.cwd(), "data", "cards.json");

const raw = fs.readFileSync(csvPath, "utf8").trim();
const lines = raw.split(/\r?\n/);
const headers = lines[0].split(",");

function parseCSVLine(line) {
  // Minimal CSV parser to handle quoted values with commas.
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' ) {
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; continue; }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out;
}

const cards = lines.slice(1).filter(Boolean).map((line) => {
  const cols = parseCSVLine(line);
  const obj = {};
  headers.forEach((h, i) => obj[h] = cols[i] ?? "");
  if (obj.year) obj.year = Number(obj.year);
  return obj;
});

fs.writeFileSync(outPath, JSON.stringify(cards, null, 2));
console.log(`Wrote ${cards.length} cards to data/cards.json`);
