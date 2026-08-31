import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

const COMMON = [
  "משקיעים בפרסום",
  "מביאים לידים",
  "עושים שיחות",
  "סוגרים לקוחות",
  "מסיימים לתת שירות",
  "ומתחילים שוב לחפש את הלקוח הבא",
];

const SMART = [
  "שומרים את הלקוחות במקום אחד",
  "נשארים איתם בקשר",
  "מחלקים אותם לקהלים",
  "שולחים תוכן והצעות רלוונטיות",
  "מפעילים אוטומציות",
  "ומייצרים הזדמנויות לרכישות נוספות",
];

function List({ items, lit }: { items: string[]; lit: boolean }) {
  return (
    <ul className="mt-8 space-y-4">
      {items.map((item, i) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
              lit ? "bg-accent-bright shadow-[0_0_10px_var(--accent-bright)]" : "bg-text-faint"
            }`}
          />
          <span
            className={`text-base sm:text-lg ${
              lit
                ? "text-text-soft"
                : i === items.length - 1
                  ? "text-text-faint"
                  : "text-text-dim"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Section 6 — Comparison, deliberately dramatic. */
export default function ComparisonSection() {
  return (
    <Section className="bg-bg-2">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-40" />
      <Container size="wide">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Marker />
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
            שתי דרכים לעבוד עם לקוחות.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* צד ראשון — הדרך שרוב העסקים עובדים בה */}
          <Reveal>
            <article className="relative h-full overflow-hidden rounded-3xl border border-hairline bg-surface/40 p-7 sm:p-9">
              <span
                aria-hidden
                className="absolute inset-y-9 right-0 w-px bg-gradient-to-b from-hairline-bright via-hairline to-transparent"
              />
              <h3 className="text-xl font-semibold text-text-dim sm:text-2xl">
                הדרך שרוב העסקים עובדים בה
              </h3>
              <List items={COMMON} lit={false} />
              <span
                aria-hidden
                className="mt-8 block h-8 w-px bg-gradient-to-b from-hairline to-transparent"
              />
            </article>
          </Reveal>

          {/* צד שני — הדרך החכמה יותר */}
          <Reveal delay={0.1}>
            <article className="relative h-full overflow-hidden rounded-3xl border border-accent-bright/35 bg-gradient-to-b from-navy/70 to-bg-2 p-7 shadow-[0_0_60px_-20px_var(--accent-glow)] sm:p-9">
              <div
                aria-hidden
                className="glow glow-strong anim-breathe absolute -right-24 -top-24 h-72 w-72 rounded-full"
              />
              <h3 className="text-xl font-semibold text-accent-bright sm:text-2xl">
                הדרך החכמה יותר
              </h3>
              <List items={SMART} lit />
              {/* a connection that loops back instead of ending */}
              <svg aria-hidden viewBox="0 0 60 90" className="mt-6 h-20 w-16 overflow-visible">
                <path
                  id="cmp-loop"
                  d="M30 0 V50 A18 18 0 1 1 12 68"
                  fill="none"
                  stroke="var(--accent-bright)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="dash-flow"
                  style={{ ["--dur" as string]: "6s" }}
                />
                <polygon points="12,60 6,72 18,72" fill="var(--accent-bright)" />
                <circle r="3" fill="#fff">
                  <animateMotion dur="4s" repeatCount="indefinite" path="M30 0 V50 A18 18 0 1 1 12 68" />
                </circle>
              </svg>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
