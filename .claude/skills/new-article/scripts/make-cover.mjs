#!/usr/bin/env node
// מחולל תמונת-נושא וקטורית למאמר AutoSmart.
// יוצר SVG סטטי 1200x630 בצבעי המותג, בלי אנשים/פנים (כלל האנונימיות של האתר).
// שימוש:
//   node .claude/skills/new-article/scripts/make-cover.mjs --slug "<slug>" --title "<כותרת>" [--category "<קטגוריה>"] [--out <path>]
// ברירת מחדל ל-out: public/articles/<slug>/cover.svg (יחסית ל-cwd, שהוא שורש הריפו).

import fs from "node:fs";
import path from "node:path";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key.startsWith("--")) {
      const name = key.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        args[name] = true;
      } else {
        args[name] = next;
        i++;
      }
    }
  }
  return args;
}

// PRNG דטרמיניסטי לפי ה-slug, כדי שכל מאמר יקבל מוטיב יציב ושונה.
function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// עטיפת שורות פשוטה לפי אורך תווים משוער.
function wrapTitle(title, maxCharsPerLine = 24, maxLines = 4) {
  const words = title.trim().split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s.,:;־-]*$/, "") + "…";
    return kept;
  }
  return lines;
}

const args = parseArgs(process.argv.slice(2));
const slug = args.slug;
const title = args.title;
const category = typeof args.category === "string" ? args.category : "";

if (!slug || !title) {
  console.error('שגיאה: חובה לספק --slug ו---title. דוגמה:\n  node .claude/skills/new-article/scripts/make-cover.mjs --slug "אוטומציה-בוואטסאפ" --title "אוטומציה בוואטסאפ לעסק קטן" --category "אוטומציה"');
  process.exit(1);
}

const outPath =
  typeof args.out === "string"
    ? args.out
    : path.join("public", "articles", slug, "cover.svg");

const W = 1200;
const H = 630;
const rand = mulberry32(hashString(slug));

// מוטיב רקע: רשת נקודות-וקווים עדינה ב-cyan (רמז ל"מערכות מחוברות", בלי דמויות).
const NODES = 14;
const nodes = Array.from({ length: NODES }, () => ({
  x: Math.round(rand() * W),
  y: Math.round(rand() * H),
  r: 2 + Math.round(rand() * 4),
}));

let links = "";
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dist = Math.hypot(dx, dy);
    if (dist < 300) {
      const op = (0.16 * (1 - dist / 300)).toFixed(3);
      links += `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[j].x}" y2="${nodes[j].y}" stroke="#6ec9e8" stroke-width="1.25" stroke-opacity="${op}"/>`;
    }
  }
}
const dots = nodes
  .map(
    (n) =>
      `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="#6ec9e8" fill-opacity="0.28"/>`,
  )
  .join("");

const titleLines = wrapTitle(title);
const fontSize = titleLines.length >= 4 ? 56 : titleLines.length === 3 ? 66 : 74;
const lineHeight = Math.round(fontSize * 1.24);
const blockHeight = (titleLines.length - 1) * lineHeight;
// baseline של השורה הראשונה, כך שכל בלוק הכותרת ממורכז אנכית.
const startY = Math.round((H - blockHeight) / 2 + fontSize * 0.34);

// עוטפים כל שורה ב-RLE/PDF (U+202B / U+202C) כדי שהיא תוצג בסדר RTL תקין
// גם כשמעורבים בה מספרים או תווים לטיניים (למשל "10" או "AI").
const titleTspans = titleLines
  .map(
    (line, idx) =>
      `<tspan x="1120" y="${startY + idx * lineHeight}">‫${escapeXml(line)}‬</tspan>`,
  )
  .join("");

const categoryChip = category
  ? `<g>
      <rect x="${1120 - (category.length * 20 + 44)}" y="86" rx="20" ry="20" width="${category.length * 20 + 44}" height="40" fill="#6ec9e8" fill-opacity="0.16"/>
      <text x="1098" y="112" text-anchor="end" font-family="'IBM Plex Sans Hebrew','Rubik','Segoe UI',Arial,sans-serif" font-size="22" fill="#dff2fb">${escapeXml(category)}</text>
    </g>`
  : "";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a2440"/>
      <stop offset="0.55" stop-color="#123a5c"/>
      <stop offset="1" stop-color="#2b93c9"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2b93c9"/>
      <stop offset="1" stop-color="#6ec9e8"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g>${links}${dots}</g>

  <rect x="80" y="${H - 132}" width="132" height="6" rx="3" fill="url(#accent)"/>

  <text x="80" y="82" font-family="'IBM Plex Sans Hebrew','Rubik','Segoe UI',Arial,sans-serif" font-size="30" font-weight="700" letter-spacing="0.5" fill="#ffffff">AutoSmart</text>

  ${categoryChip}

  <text text-anchor="end" font-family="'IBM Plex Sans Hebrew','Rubik','Segoe UI',Arial,sans-serif" font-size="${fontSize}" font-weight="700" fill="#ffffff">
    ${titleTspans}
  </text>
</svg>
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, svg, "utf8");
console.log(`נכתב: ${outPath}  (${titleLines.length} שורות כותרת)`);
