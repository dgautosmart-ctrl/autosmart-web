/**
 * Section 5 visual — two paths.
 * New customer: פרסום → ליד → שיחה → אמון → רכישה
 * Existing customer: כבר מכיר אותך → כבר רכש → כבר נתן אמון → צריך רק לחזור לקשר
 * The existing-customer path is shorter, calmer and brighter.
 */

const NEW = ["פרסום", "ליד", "שיחה", "אמון", "רכישה"];
const EXISTING = ["כבר מכיר אותך", "כבר רכש", "כבר נתן אמון", "צריך רק לחזור לקשר"];

function Path({
  steps,
  lit,
}: {
  steps: string[];
  lit: boolean;
}) {
  return (
    <ol className="flex flex-col gap-2.5">
      {steps.map((step, i) => (
        <li key={step} className="flex flex-col items-center">
          <div
            className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-colors sm:text-base ${
              lit
                ? "border-accent-bright/45 bg-navy-2 text-text shadow-[0_0_30px_-10px_var(--accent-glow)]"
                : "border-hairline bg-surface text-text-dim"
            }`}
          >
            {step}
          </div>
          {i < steps.length - 1 && (
            <span
              className={`my-1 h-5 w-px ${lit ? "bg-accent-bright/45" : "bg-hairline"}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default function NewVsExistingFlows() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
      {/* צד אחד — לקוח חדש */}
      <div className="rounded-3xl border border-hairline bg-bg-2/60 p-5 sm:p-7">
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-text-faint">
          לקוח חדש
        </p>
        <Path steps={NEW} lit={false} />
      </div>

      {/* צד שני — לקוח קיים */}
      <div className="relative rounded-3xl border border-accent-bright/30 bg-gradient-to-b from-navy/70 to-bg-2/60 p-5 sm:p-7">
        <div
          aria-hidden
          className="absolute -inset-px -z-10 rounded-3xl bg-[radial-gradient(60%_50%_at_50%_0%,var(--accent-glow),transparent)] opacity-40 blur-lg"
        />
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-accent-bright">
          לקוח קיים
        </p>
        <Path steps={EXISTING} lit />
      </div>
    </div>
  );
}
