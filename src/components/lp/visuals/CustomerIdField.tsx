/**
 * A faint field of customer IDs — used behind the two full-screen statements.
 * Static (no animation) and heavily masked, so it reads as depth, not noise.
 */
export default function CustomerIdField({ count = 120 }: { count?: number }) {
  const ids = Array.from({ length: count }, (_, i) => `לקוח ${String((i * 13 + 7) % 900).padStart(3, "0")}`);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_75%)]"
    >
      <div className="flex h-full flex-wrap content-center justify-center gap-x-8 gap-y-4 p-8 font-mono text-[11px] leading-none tracking-widest text-accent-bright/[0.07] sm:text-xs">
        {ids.map((id, i) => (
          <span key={i} className={i % 7 === 0 ? "text-accent-bright/[0.16]" : undefined}>
            {id}
          </span>
        ))}
      </div>
    </div>
  );
}
