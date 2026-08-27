/**
 * Hand-drawn / doodle style upward arrow that draws itself on a loop:
 * a slightly wobbly line rises from lower-left to upper-right, then a small
 * arrowhead is sketched on. A faint "nib" dot travels along the line so it
 * reads as an invisible hand drawing it in real time. Purely decorative.
 *
 * The stroke paths use pathLength="1" so the draw-on animation lives in
 * 0..1 space (see .hd-line / .hd-head / .hd-nib in globals.css); the nib's
 * motion path is set inline here so it matches the drawn line exactly.
 */

const LINE = "M5 40C9 37 12 39 17 32c4-6 6-4 11-11 4-6 6-4 12-13";
const HEAD = "M32 9 L40 8 L39 16";

export default function HandDrawnArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 46 46"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block ${className}`}
    >
      <path className="hd-line" pathLength={1} d={LINE} />
      <path className="hd-head" pathLength={1} d={HEAD} />
      <circle
        className="hd-nib"
        r={1.7}
        cx={5}
        cy={40}
        stroke="none"
        fill="currentColor"
        style={{ offsetPath: `path('${LINE}')` }}
      />
    </svg>
  );
}
